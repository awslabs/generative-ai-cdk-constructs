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
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as oss from 'aws-cdk-lib/aws-opensearchserverless';
import { Construct } from 'constructs';
import { buildCustomResourceProvider } from '../../common/helpers/custom-resource-provider-helper';
import { generatePhysicalNameV2 } from '../../common/helpers/utils';
import { BedrockFoundationModel } from '../bedrock/models';
import { VectorCollection } from '../opensearchserverless';
import {
  CharacterFilterType,
  TokenFilterType,
  TokenizerType,
} from '../opensearchserverless/analysis-plugins';

/**
 * Metadata field definitions.
 */
export interface MetadataManagementFieldProps {
  /**
   * The name of the field.
   */
  readonly mappingField: string;
  /**
   * The data type of the field.
   */
  readonly dataType: string;
  /**
   * Whether the field is filterable.
   */
  readonly filterable: boolean;
}

/**
 * Metadata field definitions as the API expects them.
 *
 * @internal - JSII requires the exported interface to have camel camelCase properties,
 * but the API expect PascalCase properties
 */
type MetadataManagementField = {
  /**
   * The name of the field.
   */
  readonly MappingField: string;
  /**
   * The data type of the field.
   */
  readonly DataType: string;
  /**
   * Whether the field is filterable.
   */
  readonly Filterable: boolean;
};

/**
 * Properties for the Custom::OpenSearchIndex custom resource.
 *
 * @internal
 */
interface VectorIndexResourceProps {
  /**
   * The OpenSearch Endpoint.
   */
  readonly Endpoint: string;
  /**
   * The name of the index.
   */
  readonly IndexName: string;
  /**
   * The name of the vector field.
   */
  readonly VectorField: string;
  /**
   * The number of dimensions in the vector.
   */
  readonly Dimensions: number;
  /**
   * The metadata management fields.
   */
  readonly MetadataManagement: MetadataManagementField[];
  /**
   * The analyzer to use.
   */
  readonly Analyzer?: AnalyzerProps;
}

/**
 * Properties for the Analyzer used in Custom::OpenSearchIndex custom resource.
 *
 * @internal - JSII requires the exported interface to have camel camelCase properties
 */
interface AnalyzerProps {
  /**
   * The analyzers to use.
   */
  readonly CharacterFilters: CharacterFilterType[];
  /**
   * The tokenizer to use.
   */
  readonly Tokenizer: TokenizerType;
  /**
   * The token filters to use.
   */
  readonly TokenFilters: TokenFilterType[];
}

/**
 * Properties for the Analyzer.
 */
export interface Analyzer {
  /**
   * The analyzers to use.
   */
  readonly characterFilters: CharacterFilterType[];
  /**
   * The tokenizer to use.
   */
  readonly tokenizer: TokenizerType;
  /**
   * The token filters to use.
   */
  readonly tokenFilters: TokenFilterType[];
}

/**
 * Properties for the VectorIndex.
 */
export interface VectorIndexProps {
  /**
   * The OpenSearch Vector Collection.
   */
  readonly collection: VectorCollection;
  /**
   * The name of the index.
   */
  readonly indexName: string;
  /**
   * The name of the vector field.
   */
  readonly vectorField: string;
  /**
   * The number of dimensions in the vector.
   */
  readonly vectorDimensions: number;
  /**
   * The metadata management fields.
   */
  readonly mappings: MetadataManagementFieldProps[];
  /**
   * The analyzer to use.
   * @default - No analyzer.
   */
  readonly analyzer?: Analyzer;
}

/**
 * Attributes for the VectorIndex.
 */
export interface VectorIndexAttributes {
  /**
   * The collection to deploy the index on.
   */
  readonly collection: VectorCollection;
  /**
   * The model to use for the embeddings.
   *
   * @default - BedrockFoundationModel.TITAN_EMBED_TEXT_V1
   */
  readonly embeddingsModel?: BedrockFoundationModel;
  /**
   * The name of the index.
   *
   * @default - bedrock-knowledge-base-default-index
   */
  readonly indexName?: string;
  /**
   * The name of the vector field.
   *
   * @default - bedrock-knowledge-base-default-vector
   */
  readonly vectorField?: string;
  /**
   * The analyzer to use.
   *
   * @default - No analyzer.
   */
  readonly analyzer?: Analyzer;
}

/**
 * Deploy a vector index on the collection.
 */
export class VectorIndex extends cdk.Resource {
  /**
   * The name of the index.
   */
  public readonly indexName: string;
  /**
   * The name of the vector field.
   */
  public readonly vectorField: string;
  /**
   * The number of dimensions in the vector.
   */
  public readonly vectorDimensions: number;

  constructor(scope: Construct, id: string, props: VectorIndexProps) {
    super(scope, id);

    this.indexName = props.indexName;
    this.vectorField = props.vectorField;
    this.vectorDimensions = props.vectorDimensions;
    const crProvider = OpenSearchIndexCRProvider.getProvider(this);
    crProvider.role.addManagedPolicy(props.collection.aossPolicy);

    const manageIndexPolicyName = generatePhysicalNameV2(
      this,
      'ManageIndexPolicy',
      { maxLength: 32, lower: true }
    );
    const manageIndexPolicy = new oss.CfnAccessPolicy(
      this,
      'ManageIndexPolicy',
      {
        name: manageIndexPolicyName,
        type: 'data',
        policy: JSON.stringify([
          {
            Rules: [
              {
                Resource: [`index/${props.collection.collectionName}/*`],
                Permission: [
                  'aoss:DescribeIndex',
                  'aoss:CreateIndex',
                  'aoss:DeleteIndex',
                  'aoss:UpdateIndex',
                ],
                ResourceType: 'index',
              },
              {
                Resource: [`collection/${props.collection.collectionName}`],
                Permission: ['aoss:DescribeCollectionItems'],
                ResourceType: 'collection',
              },
            ],
            Principal: [crProvider.role.roleArn],
            Description: '',
          },
        ]),
      }
    );

    const analyzerProps = props.analyzer
      ? {
          CharacterFilters: props.analyzer.characterFilters,
          Tokenizer: props.analyzer.tokenizer,
          TokenFilters: props.analyzer.tokenFilters,
        }
      : undefined;
    const vectorIndex = new cdk.CustomResource(this, 'VectorIndex', {
      serviceToken: crProvider.serviceToken,
      properties: {
        Endpoint: `${props.collection.collectionId}.${
          cdk.Stack.of(this).region
        }.aoss.amazonaws.com`,
        IndexName: props.indexName,
        VectorField: props.vectorField,
        Dimensions: props.vectorDimensions,
        MetadataManagement: props.mappings.map((m) => {
          return {
            MappingField: m.mappingField,
            DataType: m.dataType,
            Filterable: m.filterable,
          };
        }),
        Analyzer: analyzerProps,
      } as VectorIndexResourceProps,
      resourceType: 'Custom::OpenSearchIndex',
    });

    vectorIndex.node.addDependency(manageIndexPolicy);
    vectorIndex.node.addDependency(props.collection);
    vectorIndex.node.addDependency(props.collection.dataAccessPolicy);
  }

  /**
   * Create a VectorIndex from an VectorCollection.
   */
  public static fromVectorIndexAttributes(
    scope: Construct,
    id: string,
    attr: VectorIndexAttributes
  ): VectorIndex {
    const embeddingsModel =
      attr.embeddingsModel ?? BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    validateModel(embeddingsModel);
    const indexName = attr.indexName ?? 'bedrock-knowledge-base-default-index';
    const vectorField =
      attr.vectorField ?? 'bedrock-knowledge-base-default-vector';

    const vectorIndex = new VectorIndex(scope, id, {
      collection: attr.collection,
      indexName,
      vectorField,
      vectorDimensions: embeddingsModel.vectorDimensions!,
      mappings: [
        {
          mappingField: 'AMAZON_BEDROCK_TEXT_CHUNK',
          dataType: 'text',
          filterable: true,
        },
        {
          mappingField: 'AMAZON_BEDROCK_METADATA',
          dataType: 'text',
          filterable: false,
        },
      ],
      analyzer: attr.analyzer,
    });
    return vectorIndex;
  }
}

/**
 * Validate that Bedrock Knowledge Base can use the selected model.
 *
 * @internal This is an internal core function and should not be called directly.
 */
function validateModel(foundationModel: BedrockFoundationModel) {
  if (!foundationModel.supportsKnowledgeBase) {
    throw new Error(
      `The model ${foundationModel} is not supported by Bedrock Knowledge Base.`
    );
  }
}

/**
 * Custom Resource provider for OpenSearch Index operations.
 *
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 */
export const OpenSearchIndexCRProvider = buildCustomResourceProvider({
  providerName: 'OpenSearchIndexCRProvider',
  codePath: path.join(
    __dirname,
    '../../../lambda/opensearch-serverless-custom-resources'
  ),
  handler: 'custom_resources.on_event',
  runtime: lambda.Runtime.PYTHON_3_12,
});
