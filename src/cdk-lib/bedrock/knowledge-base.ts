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

import * as cdk from 'aws-cdk-lib';
import { aws_bedrock as bedrock } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { NagSuppressions } from 'cdk-nag/lib/nag-suppressions';
import { Construct } from 'constructs';
import { BedrockFoundationModel } from './models';
import { generatePhysicalNameV2 } from '../../common/helpers/utils';
import {
  AmazonAuroraDefaultVectorStore,
  AmazonAuroraVectorStore,
} from '../amazonaurora';

import { VectorIndex } from '../opensearch-vectorindex';
import { VectorCollection } from '../opensearchserverless';
import { PineconeVectorStore } from '../pinecone';
import { Agent } from './../bedrock/agent';

/**
 * Knowledge base can be backed by different vector databases.
 * This enum represents the different vector databases that can be used.
 *
 * `OPENSEARCH_SERVERLESS` is the default vector database.
 * `REDIS_ENTERPRISE_CLOUD` is the vector database for Redis Enterprise Cloud.
 * `PINECONE` is the vector database for Pinecone.
 * `AMAZON_AURORA` is the vector database for Amazon Aurora PostgreSQL.
 */
enum VectorStoreType {
  /**
   * `OPENSEARCH_SERVERLESS` is the vector store for OpenSearch Serverless.
   */
  OPENSEARCH_SERVERLESS = 'OPENSEARCH_SERVERLESS',
  /**
   * `PINECONE` is the vector store for Pinecone.
   */
  PINECONE = 'PINECONE',
  /**
   * `RDS` is the vector store for Amazon Aurora.
   */
  AMAZON_AURORA = 'RDS',
}

/**
 * Interface for the configuration of the storage for knowledge base.
 */
interface StorageConfiguration {
  /**
   * The vector store, which can be of `VectorCollection`, `PineconeVectorStore`,
   * `AmazonAuroraVectorStore` or `AmazonAuroraDefaultVectorStore`
   * types.
   */
  vectorStore: VectorCollection |
  PineconeVectorStore | AmazonAuroraDefaultVectorStore | AmazonAuroraVectorStore;

  /**
   * The type of the vector store.
   */
  vectorStoreType: VectorStoreType;

  /**
   * The name of the index.
   */
  indexName: string;

  /**
   * The field of the vector field for vector mapping.
   */
  vectorField: string;

  /**
   * The field of the text field for vector mapping.
   */
  textField: string;

  /**
   * The field of the metadata.
   */
  metadataField: string;
}

/**
 * Properties for a knowledge base
 */
export interface KnowledgeBaseProps {
  /**
   * The embeddings model for the knowledge base
   */
  readonly embeddingsModel: BedrockFoundationModel;

  /**
   * The description of the knowledge base.
   *
   * @default - No description provided.
   */
  readonly description?: string;

  /**
   * A narrative description of the knowledge base.
   *
   * A Bedrock Agent can use this instruction to determine if it should
   * query this Knowledge Base.
   *
   * @default - No description provided.
   */
  readonly instruction?: string;

  /**
   * The name of the vector index.
   * If vectorStore is not of type `VectorCollection`,
   * do not include this property as it will throw error.
   *
   * @default - 'bedrock-knowledge-base-default-index'
   */
  readonly indexName?: string;

  /**
   * The name of the field in the vector index.
   * If vectorStore is not of type `VectorCollection`,
   * do not include this property as it will throw error.
   *
   * @default - 'bedrock-knowledge-base-default-vector'
   */
  readonly vectorField?: string;

  /**
   * The vector store for the knowledge base. Must be either of
   * type `VectorCollection`, `RedisEnterpriseVectorStore`,
   * `PineconeVectorStore`, `AmazonAuroraVectorStore` or
   * `AmazonAuroraDefaultVectorStore`.
   *
   * @default - A new OpenSearch Serverless vector collection is created.
   */
  readonly vectorStore?: VectorCollection |
  PineconeVectorStore | AmazonAuroraVectorStore | AmazonAuroraDefaultVectorStore;

  /**
   * The vector index for the OpenSearch Serverless backed knowledge base.
   * If vectorStore is not of type `VectorCollection`, do not include
   * this property as it will throw error.
   *
   * @default - A new vector index is created on the Vector Collection
   * if vector store is of `VectorCollection` type.
   */
  readonly vectorIndex?: VectorIndex;

  /**
   * Specifies whether to use the knowledge base or not when sending an InvokeAgent request.
   */
  readonly knowledgeBaseState?: string;

  /**
   * OPTIONAL: Tag (KEY-VALUE) bedrock agent resource
   *
   * @default - false
   */
  readonly tags?: Record<string, string>;
}

/**
 * Deploys a Bedrock Knowledge Base and configures a backend by OpenSearch Serverless,
 * Pinecone, Redis Enterprise Cloud or Amazon Aurora PostgreSQL.
 *
 */
export class KnowledgeBase extends Construct {
  /**
   * The name of the knowledge base.
   */
  public readonly name: string;

  /**
   * Instance of knowledge base.
   */
  public readonly knowledgeBase: bedrock.CfnKnowledgeBase;

  /**
   * The role the Knowledge Base uses to access the vector store and data source.
   */
  public readonly role: iam.Role;

  /**
   * The vector store for the knowledge base.
   */
  public readonly vectorStore: VectorCollection |
  PineconeVectorStore | AmazonAuroraVectorStore | AmazonAuroraDefaultVectorStore;

  /**
   * A narrative instruction of the knowledge base.
   */
  public readonly instruction?: string;

  /**
   * The ARN of the knowledge base.
   */
  public readonly knowledgeBaseArn: string;

  /**
   * The ID of the knowledge base.
   */
  public readonly knowledgeBaseId: string;


  /**
   * The OpenSearch vector index for the knowledge base.
   * @private
   */
  private vectorIndex?: VectorIndex;

  /**
   * The description knowledge base.
   */
  public readonly description: string;

  /**
   * Specifies whether to use the knowledge base or not when sending an InvokeAgent request.
   */
  public readonly knowledgeBaseState: string;


  /**
   * The type of the knowledge base.
   * @private
   */
  private vectorStoreType: VectorStoreType;

  constructor(scope: Construct, id: string, props: KnowledgeBaseProps) {
    super(scope, id);
    this.instruction = props.instruction;
    const embeddingsModel = props.embeddingsModel;
    const indexName = props.indexName ?? 'bedrock-knowledge-base-default-index';
    const vectorField = props.vectorField ?? 'bedrock-knowledge-base-default-vector';
    const textField = 'AMAZON_BEDROCK_TEXT_CHUNK';
    const metadataField = 'AMAZON_BEDROCK_METADATA';

    this.description= props.description ?? '';
    this.knowledgeBaseState = props.knowledgeBaseState ?? 'ENABLED';


    validateModel(embeddingsModel);
    validateVectorIndex(props.vectorStore, props.vectorIndex, props.vectorField, props.indexName);
    if (props.vectorIndex) {
      validateIndexParameters(props.vectorIndex, indexName, vectorField);
    }

    this.name = generatePhysicalNameV2(
      this,
      'KB',
      { maxLength: 32 });
    const roleName = generatePhysicalNameV2(
      this,
      'AmazonBedrockExecutionRoleForKnowledgeBase',
      { maxLength: 64 });
    this.role = new iam.Role(this, 'Role', {
      roleName: roleName,
      assumedBy: new iam.ServicePrincipal('bedrock.amazonaws.com'),
    });
    this.role.assumeRolePolicy!.addStatements(
      new iam.PolicyStatement({
        actions: ['sts:AssumeRole'],
        principals: [new iam.ServicePrincipal('bedrock.amazonaws.com')],
        conditions: {
          StringEquals: {
            'aws:SourceAccount': cdk.Stack.of(this).account,
          },
          ArnLike: {
            'aws:SourceArn': cdk.Stack.of(this).formatArn({
              service: 'bedrock',
              resource: 'knowledge-base',
              resourceName: '*',
              arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
            }),
          },
        },
      }),
    );

    this.role.addToPolicy(new iam.PolicyStatement({
      actions: ['bedrock:InvokeModel'],
      resources: [embeddingsModel.asArn(this)],
    }));

    /**
     * Create the vector store if the vector store was provided by the user.
     * Otherwise check againts all possible vector datastores.
     * If none was provided create default OpenSearch Serverless Collection.
     */
    if (props.vectorStore instanceof VectorCollection) {
      ({
        vectorStore: this.vectorStore,
        vectorStoreType: this.vectorStoreType,
      } = this.handleOpenSearchCollection(props));

    } else if (props.vectorStore instanceof PineconeVectorStore) {
      ({
        vectorStore: this.vectorStore,
        vectorStoreType: this.vectorStoreType,
      } = this.handlePineconeVectorStore(props));

    } else if (props.vectorStore instanceof AmazonAuroraVectorStore) {
      ({
        vectorStore: this.vectorStore,
        vectorStoreType: this.vectorStoreType,
      } = this.handleAmazonAuroraVectorStore(props));

    } else if (props.vectorStore instanceof AmazonAuroraDefaultVectorStore) {
      ({
        vectorStore: this.vectorStore,
        vectorStoreType: this.vectorStoreType,
      } = this.handleAmazonAuroraDefaultVectorStore(props));

    } else {
      ({
        vectorStore: this.vectorStore,
        vectorStoreType: this.vectorStoreType,
      } = this.handleOpenSearchDefaultVectorCollection());
    }

    /**
     * We need to add `secretsmanager:GetSecretValue` to the role
     * of the knowledge base if we use data sources
     * other than OpenSearch Serverless.
     */
    if (!(this.vectorStore instanceof VectorCollection)) {
      this.role.addToPolicy(new iam.PolicyStatement({
        actions: ['secretsmanager:GetSecretValue'],
        resources: [
          this.vectorStore.credentialsSecretArn,
        ],
      }));
    }

    /**
     * We need to add `rds-data:ExecuteStatement`,
     * `rds-data:BatchExecuteStatement` and
     * `rds:DescribeDBClusters` to the role
     * of the knowledge base if we use Amazon Aurora as
     * a data source.
     */
    if (this.vectorStore instanceof AmazonAuroraDefaultVectorStore ||
      this.vectorStore instanceof AmazonAuroraVectorStore) {
      this.role.addToPolicy(new iam.PolicyStatement({
        actions: [
          'rds-data:ExecuteStatement',
          'rds-data:BatchExecuteStatement',
          'rds:DescribeDBClusters',
        ],
        resources: [
          this.vectorStore.resourceArn,
        ],
      }));
    }

    /**
     * Create the vector index if the vector store is OpenSearch Serverless
     * and it was not provided. Otherwise use the provided vector index.
     */
    if (this.vectorStoreType === VectorStoreType.OPENSEARCH_SERVERLESS) {
      if (!props.vectorIndex) {
        this.vectorIndex = new VectorIndex(this, 'KBIndex', {
          collection: this.vectorStore as VectorCollection,
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
        });

        this.vectorIndex.node.addDependency(this.vectorStore);
      } else {
        this.vectorIndex = props.vectorIndex;
      }
    }

    /**
     * Create storage configuraion. If it is of type of
     * `AmazonAuroraVectorStore` get textField, metadataField,
     * vectorField from the arguments. Otherwise use default values.
     */
    const storageConfiguration: StorageConfiguration = {
      indexName: indexName,
      vectorStore: this.vectorStore,
      vectorStoreType: this.vectorStoreType,
      vectorField: (this.vectorStore instanceof AmazonAuroraVectorStore) ?
        this.vectorStore.vectorField : vectorField,
      textField: (this.vectorStore instanceof AmazonAuroraVectorStore) ?
        this.vectorStore.textField : textField,
      metadataField: (this.vectorStore instanceof AmazonAuroraVectorStore) ?
        this.vectorStore.metadataField : metadataField,
    };


    const knowledgeBase = new bedrock.CfnKnowledgeBase(this, 'MyCfnKnowledgeBase', {
      knowledgeBaseConfiguration: {
        type: 'VECTOR',
        vectorKnowledgeBaseConfiguration: {
          embeddingModelArn: embeddingsModel.asArn(this),
        },
      },
      name: this.name,
      roleArn: this.role.roleArn,
      storageConfiguration: getStorageConfiguration(storageConfiguration),
      description: props.description,
      tags: props.tags,
    });

    this.knowledgeBase=knowledgeBase;

    const kbCRPolicy = new iam.Policy(this, 'KBCRPolicy', {
      // roles: [crProvider.role],
      roles: [this.role],
      statements: [
        new iam.PolicyStatement({
          actions: [
            'bedrock:CreateKnowledgeBase',
            /**
             * We need to add `bedrock:AssociateThirdPartyKnowledgeBase` if
             * we are deploying Redis or Pinecone data sources
             */
            //...(this.vectorStoreType === VectorStoreType.REDIS_ENTERPRISE_CLOUD ||
            ...(this.vectorStoreType === VectorStoreType.PINECONE ?
              ['bedrock:AssociateThirdPartyKnowledgeBase'] : []),
          ],
          resources: ['*'],
        }),
        new iam.PolicyStatement(
          {
            actions: [
              'bedrock:UpdateKnowledgeBase',
              'bedrock:DeleteKnowledgeBase',
              'bedrock:TagResource',
            ],
            resources: [
              cdk.Stack.of(this).formatArn({
                service: 'bedrock',
                resource: 'knowledge-base',
                resourceName: '*',
                arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
              }),
            ],
          },
        ),
        new iam.PolicyStatement(
          {
            actions: ['iam:PassRole'],
            resources: [this.role.roleArn],
          },
        ),
      ],
    });

    knowledgeBase.node.addDependency(this.role);
    knowledgeBase.node.addDependency(kbCRPolicy);
    if (this.vectorStoreType === VectorStoreType.OPENSEARCH_SERVERLESS &&
      this.vectorIndex) {
      knowledgeBase.node.addDependency(this.vectorIndex);
    }
    if (this.vectorStoreType === VectorStoreType.AMAZON_AURORA &&
      this.vectorStore instanceof AmazonAuroraDefaultVectorStore) {
      knowledgeBase.node.addDependency(this.vectorStore);
    }

    NagSuppressions.addResourceSuppressions(
      kbCRPolicy,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: "Bedrock CreateKnowledgeBase can't be restricted by resource.",
        },
      ],
      true,
    );

    this.knowledgeBaseArn = knowledgeBase.attrKnowledgeBaseArn;
    this.knowledgeBaseId = knowledgeBase.attrKnowledgeBaseId;

  }

  /**
   * Handle VectorCollection type of VectorStore.
   *
   * @param props - The properties of the KnowledgeBase.
   * @returns The instance of VectorCollection, VectorStoreType.
   * @internal This is an internal core function and should not be called directly.
   */
  private handleOpenSearchCollection(
    props: KnowledgeBaseProps,
  ): {
      vectorStore: VectorCollection;
      vectorStoreType: VectorStoreType;
    } {
    const vectorStore = props.vectorStore as VectorCollection;
    vectorStore.grantDataAccess(this.role);
    return {
      vectorStore: vectorStore,
      vectorStoreType: VectorStoreType.OPENSEARCH_SERVERLESS,
    };
  }


  /**
 * Handle PineconeVectorStore type of VectorStore.
 *
 * @param props - The properties of the KnowledgeBase.
 * @returns The instance of PineconeVectorStore, VectorStoreType.
 * @internal This is an internal core function and should not be called directly.
 */
  private handlePineconeVectorStore(
    props: KnowledgeBaseProps,
  ): {
      vectorStore: PineconeVectorStore;
      vectorStoreType: VectorStoreType;
    } {
    const vectorStore = props.vectorStore as PineconeVectorStore;
    return {
      vectorStore: vectorStore,
      vectorStoreType: VectorStoreType.PINECONE,
    };
  }

  /**
   * Handle AmazonAuroraVectorStore type of VectorStore.
   *
   * @param props - The properties of the KnowledgeBase.
   * @returns The instance of AmazonAuroraVectorStore, VectorStoreType.
   * @internal This is an internal core function and should not be called directly.
   */
  private handleAmazonAuroraVectorStore(
    props: KnowledgeBaseProps,
  ): {
      vectorStore: AmazonAuroraVectorStore;
      vectorStoreType: VectorStoreType;
    } {
    const vectorStore = props.vectorStore as AmazonAuroraVectorStore;
    return {
      vectorStore: vectorStore,
      vectorStoreType: VectorStoreType.AMAZON_AURORA,
    };
  }

  /**
   * Handle AmazonAuroraDefaultVectorStore type of VectorStore.
   *
   * @param props - The properties of the KnowledgeBase.
   * @returns The instance of AmazonAuroraDefaultVectorStore, VectorStoreType.
   * @internal This is an internal core function and should not be called directly.
   */
  private handleAmazonAuroraDefaultVectorStore(
    props: KnowledgeBaseProps,
  ): {
      vectorStore: AmazonAuroraDefaultVectorStore;
      vectorStoreType: VectorStoreType;
    } {
    const vectorStore = props.vectorStore as AmazonAuroraDefaultVectorStore;
    return {
      vectorStore: vectorStore,
      vectorStoreType: VectorStoreType.AMAZON_AURORA,
    };
  }

  
  /**
   * Handle the default VectorStore type.
   *
   * @returns The instance of VectorCollection, VectorStoreType.
   * @internal This is an internal core function and should not be called directly.
   */
  private handleOpenSearchDefaultVectorCollection():
  {
    vectorStore: VectorCollection;
    vectorStoreType: VectorStoreType;
  } {
    const vectorStore = new VectorCollection(this, 'KBVectors');
    vectorStore.grantDataAccess(this.role);
    return {
      vectorStore: vectorStore,
      vectorStoreType: VectorStoreType.OPENSEARCH_SERVERLESS,
    };
  }


 /**
 * Associate knowledge base with an agent
 */
  public  associateToAgent(agent: Agent){
    const agentKnowledgeBaseProperty: bedrock.CfnAgent.AgentKnowledgeBaseProperty = {
      description: this.description,
      knowledgeBaseId: this.knowledgeBaseId,
      knowledgeBaseState: this.knowledgeBaseState,
    };
    agent.knowledgeBases=[agentKnowledgeBaseProperty]
  }
}



/**
 * Validate that Bedrock Knowledge Base can use the selected model.
 *
 * @internal This is an internal core function and should not be called directly.
 */
function validateModel(foundationModel: BedrockFoundationModel) {
  if (!foundationModel.supportsKnowledgeBase) {
    throw new Error(`The model ${foundationModel} is not supported by Bedrock Knowledge Base.`);
  }
}

/**
 * Validate if VectorIndex was provided for a VectorStore of type
 * other than `VectorCollection`.
 *
 * @internal This is an internal core function and should not be called directly.
 */
function validateVectorIndex(
  vectorStore: any,
  vectorIndex: any,
  vectorField: any,
  indexName: any,
) {
  if (!(vectorStore instanceof VectorCollection) && vectorIndex) {
    throw new Error('If vectorStore is not of type VectorCollection, vectorIndex should not be provided ' +
    'in KnowledgeBase construct.');
  }
  if (!(vectorStore instanceof VectorCollection) && indexName) {
    throw new Error('If vectorStore is not of type VectorCollection, indexName should not be provided ' +
    'in KnowledgeBase construct.');
  }
  if (!(vectorStore instanceof VectorCollection) && vectorField) {
    throw new Error('If vectorStore is not of type VectorCollection, vectorField should not be provided ' +
    'in KnowledgeBase construct.');
  }
}

/**
 * Validate that indexName and vectorField parameters are identical
 * in KnowledgeBase construct if VectorIndex was created manually.
 *
 * By default we assign `vectorIndex` to `bedrock-knowledge-base-default-index`
 * value and if user provides `vectorIndex` manually, we need to make sure
 * they also provide it in KnowledgeBase construct if the value is not
 * `bedrock-knowledge-base-default-index`. Same for vectorField.
 *
 * @internal This is an internal core function and should not be called directly.
 */
function validateIndexParameters(
  vectorIndex: VectorIndex,
  indexName: string,
  vectorField: string,
) {
  if (vectorIndex.indexName !== 'bedrock-knowledge-base-default-index') {
    if (vectorIndex.indexName !== indexName) {
      throw new Error('Default value of indexName is `bedrock-knowledge-base-default-index`.' +
      ' If you create VectorIndex manually and assign vectorIndex to value other than' +
      ' `bedrock-knowledge-base-default-index` then you must provide the same value in KnowledgeBase construct.' +
      ' If you created VectorIndex manually and set it to `bedrock-knowledge-base-default-index`' +
      ' then do not assign indexName in KnowledgeBase construct.');
    }
  }
  if (vectorIndex.vectorField !== 'bedrock-knowledge-base-default-vector') {
    if (vectorIndex.vectorField !== vectorField) {
      throw new Error('Default value of vectorField is `bedrock-knowledge-base-default-vector`.' +
      ' If you create VectorIndex manually and assign vectorField to value other than' +
      ' `bedrock-knowledge-base-default-field` then you must provide the same value in KnowledgeBase construct.' +
      ' If you created VectorIndex manually and set it to `bedrock-knowledge-base-default-vector`' +
      ' then do not assign vectorField in KnowledgeBase construct.');
    }
  }
}

/**
 * Determine storage configuration based on vector store type.
 *
 * @internal This is an internal core function and should not be called directly.
 */
function getStorageConfiguration(params: StorageConfiguration): any {
  switch (params.vectorStoreType) {
    case VectorStoreType.OPENSEARCH_SERVERLESS:
      params.vectorStore = params.vectorStore as VectorCollection;
      return {
        type: VectorStoreType.OPENSEARCH_SERVERLESS,
        opensearchServerlessConfiguration: {
          collectionArn: params.vectorStore.collectionArn,
          fieldMapping: {
            vectorField: params.vectorField,
            textField: params.textField,
            metadataField: params.metadataField,
          },
          vectorIndexName: params.indexName,
        },
      };
    case VectorStoreType.PINECONE:
      params.vectorStore = params.vectorStore as PineconeVectorStore;
      return {
        type: VectorStoreType.PINECONE,
        pineconeConfiguration: {
          namespace: params.vectorStore.namespace || undefined,
          connectionString: params.vectorStore.connectionString,
          credentialsSecretArn: params.vectorStore.credentialsSecretArn,
          fieldMapping: {
            textField: params.textField,
            metadataField: params.metadataField,
          },
        },
      };
    case VectorStoreType.AMAZON_AURORA:
      params.vectorStore = params.vectorStore instanceof AmazonAuroraVectorStore ?
        params.vectorStore as AmazonAuroraVectorStore :
        params.vectorStore as AmazonAuroraDefaultVectorStore;
      return {
        type: VectorStoreType.AMAZON_AURORA,
        rdsConfiguration: {
          credentialsSecretArn: params.vectorStore.credentialsSecretArn,
          databaseName: params.vectorStore.databaseName,
          resourceArn: params.vectorStore.resourceArn,
          tableName: params.vectorStore.tableName,
          fieldMapping: {
            vectorField: params.vectorField.replace(/-/g, '_'),
            primaryKeyField: params.vectorStore.primaryKeyField,
            textField: params.textField.toLowerCase(),
            metadataField: params.metadataField.toLowerCase(),
          },
        },
      };
    default:
      throw new Error(`Unsupported vector store type: ${params.vectorStoreType}`);
  }
}