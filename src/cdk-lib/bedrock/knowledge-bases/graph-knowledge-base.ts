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

export { KnowledgeBaseBase } from "./knowledge-base";
import { ArnFormat, Stack } from "aws-cdk-lib";
import * as bedrock from "aws-cdk-lib/aws-bedrock";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import {
  CommonKnowledgeBaseAttributes,
  CommonKnowledgeBaseProps,
  createKnowledgeBaseServiceRole,
  IKnowledgeBase,
  KnowledgeBaseType,
} from "./knowledge-base";
import { generatePhysicalNameV2 } from "../../../common/helpers/utils";
import { INeptuneGraph, NeptuneGraph } from "../../neptune/graph";
import { VectorKnowledgeBaseBase } from "./vector-knowledge-base";
import { BedrockFoundationModel } from "../models";

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
export class GraphKnowledgeBase extends GraphKnowledgeBaseBase {
  // ------------------------------------------------------
  // Import Methods
  // ------------------------------------------------------
  public static fromKnowledgeBaseAttributes(
    scope: Construct,
    id: string,
    attrs: GraphKnowledgeBaseAttributes
  ): IGraphKnowledgeBase {
    const stack = Stack.of(scope);

    class Import extends GraphKnowledgeBaseBase {
      public readonly role = iam.Role.fromRoleArn(
        this,
        `kb-${attrs.knowledgeBaseId}-role`,
        attrs.executionRoleArn
      );
      public readonly description = attrs.description;
      public readonly instruction = attrs.instruction;
      public readonly knowledgeBaseId = attrs.knowledgeBaseId;
      public readonly graph = NeptuneGraph.fromGraphId(scope, "Graph", attrs.graphId);
      public readonly knowledgeBaseArn = stack.formatArn({
        service: "bedrock",
        resource: "knowledge-base",
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
  public readonly instruction?: string;
  public readonly graph: INeptuneGraph;

  /**
   * The name of the knowledge base.
   */
  public readonly name: string;

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
    this.graph =
      props.graph ??
      new NeptuneGraph(this, "Graph", {
        embeddingModel: props.embeddingModel,
      });
    this.name =
      props.name ?? generatePhysicalNameV2(this, "graph-kb", { maxLength: 32, separator: "-" });
    this.instruction = props.instruction;
    this.description = props.description;
    this.fieldMapping = {
      metadataField: props.fieldMapping?.metadataField ?? "AMAZON_BEDROCK_METADATA",
      textField: props.fieldMapping?.textField ?? "AMAZON_BEDROCK_TEXT",
    };

    // ------------------------------------------------------
    // Role
    // ------------------------------------------------------
    // Use existing role if provided, otherwise create a new one
    this.role = props.existingRole ?? createKnowledgeBaseServiceRole(this);

    // ------------------------------------------------------
    // Grant permissions
    // ------------------------------------------------------
    // Grant the service role permissions to query the Neptune Analytics vector store
    if (!props.existingRole) {
      const grant = this.graph.grantQuery(this.role);
      grant.applyBefore(this._resource);
    }

    // ------------------------------------------------------
    // L1 Instantiation
    // ------------------------------------------------------
    this._resource = new bedrock.CfnKnowledgeBase(this, "MyCfnKnowledgeBase", {
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
        type: "NEPTUNE",
        neptuneAnalyticsConfiguration: {
          graphArn: this.graph.graphArn,
          fieldMapping: this.fieldMapping,
        },
      },
    });

    // ------------------------------------------------------
    // Attribute assignments
    // ------------------------------------------------------
    this.knowledgeBaseArn = this._resource.attrKnowledgeBaseArn;
    this.knowledgeBaseId = this._resource.attrKnowledgeBaseId;
  }
}
