/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

export { KnowledgeBaseBase } from './knowledge-base';
import { ArnFormat, Stack } from 'aws-cdk-lib';
import * as bedrock from 'aws-cdk-lib/aws-bedrock';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import {
  CommonKnowledgeBaseAttributes,
  CommonKnowledgeBaseProps,
  createKnowledgeBaseServiceRole,
  IKnowledgeBase,
  KnowledgeBaseType,
} from './knowledge-base';
import { VectorKnowledgeBaseBase, VectorStoreType } from './vector-knowledge-base';
import { generatePhysicalNameV2 } from '../../../common/helpers/utils';
import { INeptuneGraph, NeptuneGraph } from '../../neptune/graph';
import { NeptuneGraphNotebook } from '../../neptune/notebook';
import { BedrockFoundationModel } from '../models';

/******************************************************************************
 *                             COMMON INTERFACES
 *****************************************************************************/
export interface IGraphKnowledgeBase extends IKnowledgeBase {
  /**
   * The Neptune Analytics vector store
   */
  readonly graph: INeptuneGraph;
}

export interface VectorFieldMapping {
  /**
   * The name of the field in which Amazon Bedrock stores metadata about the vector store.
   * @default "AMAZON_BEDROCK_METADATA"
   */
  readonly metadataField: string;

  /**
   * The name of the field in which Amazon Bedrock stores the raw text from your data.
   * The text is split according to the chunking strategy you choose.
   * @default "AMAZON_BEDROCK_TEXT"
   */
  readonly textField: string;
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a Kendra Index Knowledge Base.
 */
export interface GraphKnowledgeBaseProps extends CommonKnowledgeBaseProps {
  /**
   * The embeddings model for the knowledge base.
   */
  readonly embeddingModel: BedrockFoundationModel;

  /**
   * The Neptune Analytics vector store
   * @default - A new Neptune Analytics vector store is created
   */
  readonly graph?: INeptuneGraph;

  /**
   * The vector field mapping configuration.
   * @default - { metadataField: "AMAZON_BEDROCK_METADATA", textField: "AMAZON_BEDROCK_TEXT" }
   */
  readonly fieldMapping?: VectorFieldMapping;
}

/******************************************************************************
 *                      ATTRS FOR IMPORTED CONSTRUCT
 *****************************************************************************/
/**
 * Properties for importing a knowledge base outside of this stack
 */
export interface GraphKnowledgeBaseAttributes extends CommonKnowledgeBaseAttributes {
  /**
   * The ID of the Neptune Analytics vector store
   */
  readonly graphId: string;

  /**
   * The vector field mapping configuration.
   * @default - { metadataField: "AMAZON_BEDROCK_METADATA", textField: "AMAZON_BEDROCK_TEXT" }
   */
  readonly fieldMapping: VectorFieldMapping;
}

/******************************************************************************
 *                              ABSTRACT CLASS
 *****************************************************************************/
export abstract class GraphKnowledgeBaseBase extends VectorKnowledgeBaseBase {
  public abstract readonly knowledgeBaseArn: string;
  public abstract readonly knowledgeBaseId: string;
  public abstract readonly role: iam.IRole;
  public abstract readonly graph: INeptuneGraph;
  public abstract readonly description?: string;
  public abstract readonly instruction?: string;
  public readonly type: KnowledgeBaseType = KnowledgeBaseType.VECTOR;
}

/******************************************************************************
 *                        		  CONSTRUCT
 *****************************************************************************/
/**
 * Creates a new Amazon Bedrock Knowledge Base using a Neptune Analytics vector store, this is also known as GraphRAG.
 *
 * GraphRAG is a capability that combines graph modeling with generative AI to enhance retrieval-augmented generation (RAG).
 * It automatically identifies and leverages relationships between entities and structural elements within documents,
 * enabling more comprehensive and contextually relevant responses from foundation models.
 *
 * Key benefits:
 * - More relevant responses by leveraging relationships between entities and structural elements across documents
 * - Enhanced search capabilities that connect content through multiple logical steps
 * - Better cross-document reasoning for more precise and contextually accurate answers
 * - Reduced hallucinations through improved information connectivity
 *
 * Limitations:
 * - AWS PrivateLink VPC endpoint connectivity is not supported
 * - Graph build configuration options are not customizable
 * - Autoscaling is not supported for Neptune Analytics graphs
 * - Only supports Amazon S3 as data source
 * - Uses Claude 3 Haiku model for automatic graph building with contextual enrichment
 * - Each data source limited to 1000 files (can be increased to max 10000 files)
 *
 * @see https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-graphs.html
 */
export class GraphKnowledgeBase extends GraphKnowledgeBaseBase {
  // ------------------------------------------------------
  // Import Methods
  // ------------------------------------------------------
  public static fromKnowledgeBaseAttributes(
    scope: Construct,
    id: string,
    attrs: GraphKnowledgeBaseAttributes,
  ): IGraphKnowledgeBase {
    const stack = Stack.of(scope);

    class Import extends GraphKnowledgeBaseBase {
      public readonly role = iam.Role.fromRoleArn(
        this,
        `kb-${attrs.knowledgeBaseId}-role`,
        attrs.executionRoleArn,
      );
      public readonly description = attrs.description;
      public readonly instruction = attrs.instruction;
      public readonly knowledgeBaseId = attrs.knowledgeBaseId;
      public readonly vectorStoreType = VectorStoreType.NEPTUNE_ANALYTICS;
      public readonly graph = NeptuneGraph.fromGraphId(scope, 'Graph', attrs.graphId);
      public readonly knowledgeBaseArn = stack.formatArn({
        service: 'bedrock',
        resource: 'knowledge-base',
        resourceName: attrs.knowledgeBaseId,
        arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
      });
    }
    return new Import(scope, id);
  }
  // ------------------------------------------------------
  // Attributes
  // ------------------------------------------------------
  // inherited
  public readonly knowledgeBaseArn: string;
  public readonly knowledgeBaseId: string;
  public readonly role: iam.IRole;
  public readonly description?: string;
  public readonly notebook?: NeptuneGraphNotebook;
  public readonly instruction?: string;
  public readonly graph: INeptuneGraph;
  public readonly vectorStoreType = VectorStoreType.NEPTUNE_ANALYTICS;

  /**
   * The name of the knowledge base.
   */
  public readonly name: string;

  /**
   * The embeddings model for the knowledge base.
   */
  public readonly embeddingModel: BedrockFoundationModel;

  /**
   * The vector field mapping configuration.
   */
  public readonly fieldMapping: VectorFieldMapping;

  private readonly _resource: bedrock.CfnKnowledgeBase;

  constructor(scope: Construct, id: string, props: GraphKnowledgeBaseProps) {
    super(scope, id);
    // ------------------------------------------------------
    // Set properties or defaults
    // ------------------------------------------------------
    // Create a new graph if not specified.
    this.graph =
      props.graph ??
      new NeptuneGraph(this, 'Graph', {
        vectorSearchDimension: props.embeddingModel.vectorDimensions!,
      });

    this.name =
      props.name ?? generatePhysicalNameV2(this, 'graph-kb', { maxLength: 32, separator: '-' });
    this.instruction = props.instruction;
    this.description = props.description;
    this.fieldMapping = {
      metadataField: props.fieldMapping?.metadataField ?? 'AMAZON_BEDROCK_METADATA',
      textField: props.fieldMapping?.textField ?? 'AMAZON_BEDROCK_TEXT',
    };
    this.embeddingModel = props.embeddingModel;

    // ------------------------------------------------------
    // Role
    // ------------------------------------------------------
    // Use existing role if provided, otherwise create a new one
    this.role = props.existingRole ?? createKnowledgeBaseServiceRole(this);

    // ------------------------------------------------------
    // L1 Instantiation
    // ------------------------------------------------------
    this._resource = new bedrock.CfnKnowledgeBase(this, 'MyCfnKnowledgeBase', {
      name: this.name,
      roleArn: this.role.roleArn,
      description: props.description,
      knowledgeBaseConfiguration: {
        type: KnowledgeBaseType.VECTOR,
        vectorKnowledgeBaseConfiguration: {
          embeddingModelArn: props.embeddingModel.modelArn,
          // Used this approach as if property is specified on models that do not
          // support configurable dimensions CloudFormation throws an error at runtime
          embeddingModelConfiguration: {
            bedrockEmbeddingModelConfiguration:
              props.embeddingModel.modelId ===
              bedrock.FoundationModelIdentifier.AMAZON_TITAN_EMBED_TEXT_V2_0.modelId
                ? {
                  dimensions: props.embeddingModel.vectorDimensions,
                }
                : undefined,
          },
        },
      },
      storageConfiguration: {
        type: VectorStoreType.NEPTUNE_ANALYTICS,
        neptuneAnalyticsConfiguration: {
          graphArn: this.graph.graphArn,
          fieldMapping: this.fieldMapping,
        },
      },
    });

    // ------------------------------------------------------
    // Grant permissions
    // ------------------------------------------------------
    // Add permissions only if it is a newly created role
    if (!props.existingRole) {
      let grant = this.graph.grantQuery(this.role);
      // Allow KB to create embeddings when ingesting data
      grant = grant.combine(this.embeddingModel.grantInvoke(this.role));
      // Ensure the permissions are in place before KB creation
      grant.applyBefore(this._resource);
    }

    // ------------------------------------------------------
    // Attribute assignments
    // ------------------------------------------------------
    this.knowledgeBaseArn = this._resource.attrKnowledgeBaseArn;
    this.knowledgeBaseId = this._resource.attrKnowledgeBaseId;
  }
}
