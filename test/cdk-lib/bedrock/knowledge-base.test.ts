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

// eslint-disable-next-line import/no-extraneous-dependencies
import { ABSENT, expect as cdkExpect, haveResource, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { Annotations, Match, Template } from 'aws-cdk-lib/assertions';

import { AwsSolutionsChecks } from 'cdk-nag';
import { AmazonAuroraVectorStore } from '../../../src/cdk-lib/amazonaurora';
import { GraphKnowledgeBase } from '../../../src/cdk-lib/bedrock/knowledge-bases/graph-knowledge-base';
import {
  VideoSegmentation,
  AudioSegmentation,
} from '../../../src/cdk-lib/bedrock/knowledge-bases/multimodal-config';
import { SupplementalDataStorageLocation } from '../../../src/cdk-lib/bedrock/knowledge-bases/supplemental-data-storage';
import {
  VectorKnowledgeBase,
  VectorStoreType,
} from '../../../src/cdk-lib/bedrock/knowledge-bases/vector-knowledge-base';
import { BedrockFoundationModel, VectorType } from '../../../src/cdk-lib/bedrock/models';
import { MongoDBAtlasVectorStore } from '../../../src/cdk-lib/mongodb-atlas';
import { OpenSearchManagedClusterVectorStore } from '../../../src/cdk-lib/opensearchmanagedcluster';
import { VectorCollection } from '../../../src/cdk-lib/opensearchserverless';
import { PineconeVectorStore } from '../../../src/cdk-lib/pinecone';
import { VectorBucket, VectorIndex } from '../../../src/cdk-lib/s3vectors';

describe('VectorKnowledgeBase', () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  let vectorCollection: VectorCollection;
  let template: Template;
  let modelVectorDimension: number;

  beforeAll(() => {
    app = new cdk.App({
      context: {
        '@aws-cdk/core:stackResourceLimit': 0,
      },
    });
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
    vectorCollection = new VectorCollection(stack, 'TestVectorCollection');
    app.synth();
    template = Template.fromStack(stack);
  });

  test('Should correctly initialize with default props', () => {
    const vectorStore = new VectorCollection(stack, 'VectorCollection');
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    modelVectorDimension = 1024;
    const knowledgeBase = new VectorKnowledgeBase(stack, 'VectorKnowledgeBase', {
      embeddingsModel: model,
      vectorStore: vectorStore,
    });
    expect(knowledgeBase.instruction).toBeUndefined();
    expect(knowledgeBase.name).toBeDefined();
    expect(knowledgeBase.role).toBeDefined();
    expect(knowledgeBase.vectorStore).toBe(vectorStore);
  });

  test('Should have the correct resources', () => {
    template.resourceCountIs('AWS::OpenSearchServerless::Collection', 1);
    template.resourceCountIs('AWS::OpenSearchServerless::AccessPolicy', 1);
  });

  test('DataAccessPolicy should be empty', () => {
    const conditions = template.findConditions('*', {
      'Fn::Not': [
        {
          'Fn::Equals': [0, 0],
        },
      ],
    });
    expect(Object.keys(conditions)).toHaveLength(1);
    const condition = Object.keys(conditions)[0];
    template.hasResource('AWS::OpenSearchServerless::AccessPolicy', {
      Condition: condition,
      Properties: {
        Name: Match.stringLikeRegexp('^dataaccesspolicy[a-z0-9]+'),
        Policy: '[]',
        Type: 'data',
      },
    });
  });

  test('Should have correct properties', () => {
    expect(vectorCollection.collectionName).toBeDefined();
    expect(vectorCollection.collectionId).toBeDefined();
    expect(vectorCollection.collectionArn).toBeDefined();
    expect(vectorCollection.aossPolicy).toBeDefined();
    expect(vectorCollection.dataAccessPolicy).toBeDefined();
  });

  test('Should correctly initialize with custom props', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    const vectorStore = new AmazonAuroraVectorStore(stack, 'AuroraVectorStore6', {
      embeddingsModelVectorDimension: modelVectorDimension,
    });
    const knowledgeBase = new VectorKnowledgeBase(stack, 'AuroraDefaultKnowledgeBase', {
      embeddingsModel: model,
      vectorStore: vectorStore,
      instruction: 'Test instruction',
      name: 'TestKnowledgeBase',
    });

    expect(knowledgeBase.instruction).toBe('Test instruction');
    expect(knowledgeBase.name).toBeDefined();
    expect(knowledgeBase.role).toBeDefined();
    expect(knowledgeBase.vectorStore).toBe(vectorStore);
    expect(knowledgeBase.name).toBe('TestKnowledgeBase');
  });

  test('Should correctly initialize role with necessary permissions', () => {
    const vectorStore = new VectorCollection(stack, 'VectorCollection2');
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    new VectorKnowledgeBase(stack, 'VectorKnowledgeBase2', {
      embeddingsModel: model,
      vectorStore: vectorStore,
    });

    cdkExpect(stack).to(
      haveResourceLike('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Effect: 'Allow',
              Principal: {
                Service: 'bedrock.amazonaws.com',
              },
              Action: 'sts:AssumeRole',
              Condition: {
                StringEquals: {
                  'aws:SourceAccount': '123456789012',
                },
                ArnLike: {
                  'aws:SourceArn': {
                    'Fn::Join': [
                      '',
                      [
                        'arn:',
                        {
                          Ref: 'AWS::Partition',
                        },
                        ':bedrock:us-east-1:123456789012:knowledge-base/*',
                      ],
                    ],
                  },
                },
              },
            },
          ],
        },
      }),
    );
  });

  test('Should throw error when vectorStore is not VectorCollection and indexName is provided', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    const vectorStore = new AmazonAuroraVectorStore(stack, 'AmazonAuroraVectorStore6', {
      embeddingsModelVectorDimension: modelVectorDimension,
    });

    expect(() => {
      new VectorKnowledgeBase(stack, 'AuroraKnowledgeBase6', {
        embeddingsModel: model,
        vectorStore: vectorStore,
        indexName: 'Test index',
      });
    }).toThrow();
  });

  test('Should throw error when vectorStore is not VectorCollection and vectorField is provided', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    const vectorStore = new AmazonAuroraVectorStore(stack, 'AmazonAuroraVectorStore5', {
      embeddingsModelVectorDimension: modelVectorDimension,
    });

    expect(() => {
      new VectorKnowledgeBase(stack, 'AuroraKnowledgeBase5', {
        embeddingsModel: model,
        vectorStore: vectorStore,
        vectorField: 'Test vector field',
      });
    }).toThrow();
  });

  test('Should correctly initialize with different vectorStore types', () => {
    const vectorStores = [
      new VectorCollection(stack, 'VectorCollection3'),
      new AmazonAuroraVectorStore(stack, 'AmazonAuroraVectorStore', {
        embeddingsModelVectorDimension: modelVectorDimension,
      }),
      new PineconeVectorStore({
        connectionString: 'test-connection-string',
        credentialsSecretArn: 'test-secret-arn',
        textField: 'testextfield',
        metadataField: 'testmetadata',
      }),
      new MongoDBAtlasVectorStore({
        collectionName: 'test-collection',
        credentialsSecretArn: 'test-secret-arn',
        databaseName: 'test-database',
        endpoint: 'https://test-endpoint.mongodb.net',
        endpointServiceName: 'mongodb-atlas',
        fieldMapping: {
          vectorField: 'test-vector-field',
          textField: 'test-text-field',
          metadataField: 'test-metadata-field',
        },
        vectorIndexName: 'test-vector-index',
      }),
      new OpenSearchManagedClusterVectorStore({
        domainArn: 'arn:aws:es:us-east-1:123456789012:domain/test-domain',
        domainEndpoint: 'https://test-domain.us-east-1.es.amazonaws.com',
        vectorIndexName: 'test-vector-index',
        fieldMapping: {
          metadataField: 'test-metadata-field',
          textField: 'test-text-field',
          vectorField: 'test-vector-field',
        },
      }),
    ];
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;

    vectorStores.forEach((vectorStore, index) => {
      const knowledgeBase = new VectorKnowledgeBase(stack, `KnowledgeBase${index}`, {
        embeddingsModel: model,
        vectorStore: vectorStore,
      });

      expect(knowledgeBase.instruction).toBeUndefined();
      expect(knowledgeBase.name).toBeDefined();
      expect(knowledgeBase.role).toBeDefined();
      expect(knowledgeBase.vectorStore).toBe(vectorStore);
    });
  });

  test('Should correctly initialize with AmazonAuroraVectorStore and custom embeddingsModel', () => {
    const model = BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3;
    const vectorStore = new AmazonAuroraVectorStore(stack, 'AuroraVectorStore2', {
      embeddingsModelVectorDimension: modelVectorDimension,
    });

    const knowledgeBase = new VectorKnowledgeBase(stack, 'AuroraKnowledgeBase2', {
      embeddingsModel: model,
      vectorStore: vectorStore,
    });

    expect(knowledgeBase.vectorStore).toBe(vectorStore);
  });

  test('Vector store with unsupported vector type', () => {
    const model = BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3;
    const vectorStore = new AmazonAuroraVectorStore(stack, 'AuroraVectorStore22', {
      embeddingsModelVectorDimension: modelVectorDimension,
    });

    expect(() => {
      new VectorKnowledgeBase(stack, 'AuroraKnowledgeBase2', {
        embeddingsModel: model,
        vectorStore: vectorStore,
        vectorType: VectorType.BINARY,
      });
    }).toThrow();
  });

  test('Embedding model with unsupported vector type', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;

    expect(() => {
      new VectorKnowledgeBase(stack, 'OSS22', {
        embeddingsModel: model,
        vectorType: VectorType.BINARY,
      });
    }).toThrow();
  });

  test('No unsuppressed Errors', () => {
    const errors = Annotations.fromStack(stack).findError(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    const errorData = errors.map((error) => error.entry.data);
    expect(errorData).toHaveLength(2); // AwsSolutions-IAM4 and AwsSolutions-IAM5
  });

  test('Knowledge Base with Embedding Model NOT supporting Configurable Dimensions and floating point', () => {
    // GIVEN
    new VectorKnowledgeBase(stack, 'DefaultKnowledgeBaseTitan1024FP', {
      embeddingsModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
    });
    // THEN
    cdkExpect(stack).to(
      haveResourceLike('AWS::Bedrock::KnowledgeBase', {
        KnowledgeBaseConfiguration: {
          Type: 'VECTOR',
          VectorKnowledgeBaseConfiguration: {
            EmbeddingModelConfiguration: {
              BedrockEmbeddingModelConfiguration: {
                Dimensions: ABSENT,
                EmbeddingDataType: 'FLOAT32',
              },
            },
          },
        },
      }),
    );
  });

  test('Knowledge Base with Embedding Model NOT supporting Configurable Dimensions and binary', () => {
    // GIVEN
    new VectorKnowledgeBase(stack, 'AuroraDefaultKnowledgeBaseTitan1024Binary', {
      embeddingsModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
      vectorType: VectorType.BINARY,
    });
    // THEN
    cdkExpect(stack).to(
      haveResourceLike('AWS::Bedrock::KnowledgeBase', {
        KnowledgeBaseConfiguration: {
          Type: 'VECTOR',
          VectorKnowledgeBaseConfiguration: {
            EmbeddingModelConfiguration: {
              BedrockEmbeddingModelConfiguration: {
                Dimensions: ABSENT,
                EmbeddingDataType: 'BINARY',
              },
            },
          },
        },
      }),
    );
  });

  test('Knowledge Base with Embedding Model supporting Configurable Dimensions and floating point', () => {
    // GIVEN
    new VectorKnowledgeBase(stack, 'AuroraDefaultKnowledgeBaseTitan512FP', {
      embeddingsModel: BedrockFoundationModel.TITAN_EMBED_TEXT_V2_512,
    });
    // THEN
    cdkExpect(stack).to(
      haveResourceLike('AWS::Bedrock::KnowledgeBase', {
        KnowledgeBaseConfiguration: {
          Type: 'VECTOR',
          VectorKnowledgeBaseConfiguration: {
            EmbeddingModelConfiguration: {
              BedrockEmbeddingModelConfiguration: {
                Dimensions: 512,
                EmbeddingDataType: 'FLOAT32',
              },
            },
          },
        },
      }),
    );
  });

  test('Knowledge Base with Embedding Model supporting Configurable Dimensions and Binary', () => {
    // GIVEN
    new VectorKnowledgeBase(stack, 'AuroraDefaultKnowledgeBaseTitan512Binary', {
      embeddingsModel: BedrockFoundationModel.TITAN_EMBED_TEXT_V2_512,
      vectorType: VectorType.BINARY,
    });
    // THEN
    cdkExpect(stack).to(
      haveResourceLike('AWS::Bedrock::KnowledgeBase', {
        KnowledgeBaseConfiguration: {
          Type: 'VECTOR',
          VectorKnowledgeBaseConfiguration: {
            EmbeddingModelConfiguration: {
              BedrockEmbeddingModelConfiguration: {
                Dimensions: 512,
                EmbeddingDataType: 'BINARY',
              },
            },
          },
        },
      }),
    );
  });

  test('Imported Knowledge Base', () => {
    const kb = VectorKnowledgeBase.fromKnowledgeBaseAttributes(stack, 'ImportedKnowledgeBase', {
      knowledgeBaseId: 'OVGH4TEBDH',
      executionRoleArn:
        'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBaseawscdkbdgeBaseE9B1DDDC',
      vectorStoreType: VectorStoreType.OPENSEARCH_SERVERLESS,
    });

    expect(kb.knowledgeBaseId).toEqual('OVGH4TEBDH');
    expect(kb.role.roleArn).toEqual(
      'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBaseawscdkbdgeBaseE9B1DDDC',
    );
    expect(kb.role.roleName).toEqual(
      'AmazonBedrockExecutionRoleForKnowledgeBaseawscdkbdgeBaseE9B1DDDC',
    );
    expect(kb.knowledgeBaseArn).toMatch(
      new RegExp('arn:.*:bedrock:us-east-1:123456789012:knowledge-base/OVGH4TEBDH$'),
    );
  });

  test('Imported Knowledge Base - Data Source Method', () => {
    const kb2 = VectorKnowledgeBase.fromKnowledgeBaseAttributes(stack, 'ImportedKnowledgeBase2', {
      knowledgeBaseId: 'OVGH4TEBDH',
      executionRoleArn:
        'arn:aws:iam::123456789012:role/service-role/AmazonBedrockExecutionRoleForKnowledgeBase_9ivh2',
      vectorStoreType: VectorStoreType.OPENSEARCH_SERVERLESS,
    });
    const bucket = s3.Bucket.fromBucketArn(
      stack,
      's3-imported',
      'arn:aws:s3:::aws-cdk-bedrock-test-bucket-83908e77-cdxrc7lilg6v',
    );

    const s3datasource = kb2.addS3DataSource({
      bucket,
      dataSourceName: 'TestDataSourceS3',
    });

    expect(s3datasource.dataSourceType).toEqual('S3');
    expect(s3datasource.knowledgeBase.knowledgeBaseId).toEqual('OVGH4TEBDH');
    cdkExpect(stack).to(haveResource('AWS::Bedrock::DataSource'));
  });

  test('Should correctly initialize with MongoDBAtlasVectorStore', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    const vectorStore = new MongoDBAtlasVectorStore({
      collectionName: 'test-collection',
      credentialsSecretArn: 'test-secret-arn',
      databaseName: 'test-database',
      endpoint: 'https://test-endpoint.mongodb.net',
      endpointServiceName: 'mongodb-atlas',
      fieldMapping: {
        vectorField: 'test-vector-field',
        textField: 'test-text-field',
        metadataField: 'test-metadata-field',
      },
      vectorIndexName: 'test-vector-index',
    });

    const knowledgeBase = new VectorKnowledgeBase(stack, 'MongoDBAtlasKnowledgeBase', {
      embeddingsModel: model,
      vectorStore: vectorStore,
      instruction: 'Test instruction for MongoDB Atlas',
      name: 'TestMongoDBAtlasKnowledgeBase',
    });

    expect(knowledgeBase.instruction).toBe('Test instruction for MongoDB Atlas');
    expect(knowledgeBase.name).toBeDefined();
    expect(knowledgeBase.role).toBeDefined();
    expect(knowledgeBase.vectorStore).toBe(vectorStore);
    expect(knowledgeBase.name).toBe('TestMongoDBAtlasKnowledgeBase');
  });

  test('Should correctly initialize with OpenSearchManagedClusterVectorStore', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    const vectorStore = new OpenSearchManagedClusterVectorStore({
      domainArn: 'arn:aws:es:us-east-1:123456789012:domain/test-domain',
      domainEndpoint: 'https://test-domain.us-east-1.es.amazonaws.com',
      vectorIndexName: 'test-vector-index',
      fieldMapping: {
        metadataField: 'test-metadata-field',
        textField: 'test-text-field',
        vectorField: 'test-vector-field',
      },
    });

    const knowledgeBase = new VectorKnowledgeBase(stack, 'OpenSearchManagedClusterKnowledgeBase', {
      embeddingsModel: model,
      vectorStore: vectorStore,
      instruction: 'Test instruction for OpenSearch Managed Cluster',
      name: 'TestOpenSearchManagedClusterKnowledgeBase',
    });

    expect(knowledgeBase.instruction).toBe('Test instruction for OpenSearch Managed Cluster');
    expect(knowledgeBase.name).toBeDefined();
    expect(knowledgeBase.role).toBeDefined();
    expect(knowledgeBase.vectorStore).toBe(vectorStore);
    expect(knowledgeBase.name).toBe('TestOpenSearchManagedClusterKnowledgeBase');
  });

  test('Should correctly initialize with S3 Vectors (VectorIndex from s3vectors)', () => {
    const s3App = new cdk.App();
    const s3Stack = new cdk.Stack(s3App, 'S3VectorsTestStack', {
      env: { account: '123456789012', region: 'us-east-1' },
    });
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    const vectorBucket = new VectorBucket(s3Stack, 'S3VectorBucket');
    const vectorIndex = new VectorIndex(s3Stack, 'S3VectorIndex', {
      vectorBucket,
      dimension: model.vectorDimensions!,
    });

    const knowledgeBase = new VectorKnowledgeBase(s3Stack, 'S3VectorsKnowledgeBase', {
      embeddingsModel: model,
      vectorStore: vectorIndex,
      instruction: 'Test instruction for S3 Vectors',
      name: 'TestS3VectorsKnowledgeBase',
    });

    expect(knowledgeBase.instruction).toBe('Test instruction for S3 Vectors');
    expect(knowledgeBase.vectorStoreType).toBe(VectorStoreType.S3_VECTORS);
    expect(knowledgeBase.vectorStore).toBe(vectorIndex);
    expect(knowledgeBase.name).toBe('TestS3VectorsKnowledgeBase');

    const s3VectorsTemplate = Template.fromStack(s3Stack);
    s3VectorsTemplate.hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      StorageConfiguration: {
        Type: 'S3_VECTORS',
        S3VectorsConfiguration: {
          IndexArn: Match.anyValue(),
        },
      },
    });
  });

  test('Should throw when S3 VectorIndex dimension does not match embeddings model', () => {
    const s3App = new cdk.App();
    const s3Stack = new cdk.Stack(s3App, 'S3VectorsDimensionTestStack', {
      env: { account: '123456789012', region: 'us-east-1' },
    });
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1; // 1536 dimensions
    const vectorBucket = new VectorBucket(s3Stack, 'S3VectorBucket');
    const vectorIndex = new VectorIndex(s3Stack, 'S3VectorIndex', {
      vectorBucket,
      dimension: 1024, // Mismatch: model has 1536
    });

    expect(() => {
      new VectorKnowledgeBase(s3Stack, 'S3VectorsKnowledgeBase', {
        embeddingsModel: model,
        vectorStore: vectorIndex,
      });
    }).toThrow(
      /S3 vector index dimension \(1024\) must match the embeddings model dimension \(1536\)/,
    );
  });

  test('Should correctly initialize with SupplementalDataStorageLocation', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    const vectorStore = new VectorCollection(stack, 'VectorCollection4');

    // Create a supplemental data storage location
    const supplementalStorageS3 = SupplementalDataStorageLocation.s3({
      uri: 's3://test-bucket/supplemental-data/',
    });

    const knowledgeBase = new VectorKnowledgeBase(stack, 'SupplementalDataKnowledgeBase', {
      embeddingsModel: model,
      vectorStore: vectorStore,
      instruction: 'Test instruction with supplemental data storage',
      name: 'TestSupplementalDataKnowledgeBase',
      supplementalDataStorageLocations: [supplementalStorageS3],
    });

    expect(knowledgeBase.instruction).toBe('Test instruction with supplemental data storage');
    expect(knowledgeBase.name).toBeDefined();
    expect(knowledgeBase.role).toBeDefined();
    expect(knowledgeBase.vectorStore).toBe(vectorStore);
    expect(knowledgeBase.name).toBe('TestSupplementalDataKnowledgeBase');

    // Verify that the supplemental data storage location is correctly rendered
    cdkExpect(stack).to(
      haveResourceLike('AWS::Bedrock::KnowledgeBase', {
        KnowledgeBaseConfiguration: {
          Type: 'VECTOR',
          VectorKnowledgeBaseConfiguration: {
            SupplementalDataStorageConfiguration: {
              SupplementalDataStorageLocations: [
                {
                  S3Location: {
                    URI: 's3://test-bucket/supplemental-data/',
                  },
                  SupplementalDataStorageLocationType: 'S3',
                },
              ],
            },
          },
        },
      }),
    );
  });
});

describe('Graph KB - CDK Created', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('Should have Neptune Graph resource', () => {
    new GraphKnowledgeBase(stack, 'GraphKnowledgeBase', {
      embeddingModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::NeptuneGraph::Graph', {
      DeletionProtection: false,
      GraphName: Match.stringLikeRegexp('bedrock-kb-graph-.*'),
      ProvisionedMemory: 16,
      PublicConnectivity: true,
      ReplicaCount: 0,
      VectorSearchConfiguration: {
        VectorSearchDimension: 1024,
      },
    });
  });

  test('Should have SageMaker Notebook Instance', () => {
    const kb = new GraphKnowledgeBase(stack, 'GraphKnowledgeBase2', {
      embeddingModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
    });

    kb.graph.createNotebook();

    Template.fromStack(stack).hasResourceProperties('AWS::SageMaker::NotebookInstance', {
      DirectInternetAccess: 'Enabled',
      InstanceType: 'ml.t3.medium',
      NotebookInstanceName: Match.stringLikeRegexp('aws-neptune-notebook-.*'),
      PlatformIdentifier: 'notebook-al2-v2',
      RootAccess: 'Disabled',
      VolumeSizeInGB: 5,
    });
  });

  test('Should have Knowledge Base with Neptune Analytics configuration', () => {
    new GraphKnowledgeBase(stack, 'GraphKnowledgeBase3', {
      embeddingModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      KnowledgeBaseConfiguration: {
        Type: 'VECTOR',
        VectorKnowledgeBaseConfiguration: {
          EmbeddingModelConfiguration: Match.anyValue(),
        },
      },
      StorageConfiguration: {
        NeptuneAnalyticsConfiguration: {
          FieldMapping: {
            MetadataField: 'AMAZON_BEDROCK_METADATA',
            TextField: 'AMAZON_BEDROCK_TEXT',
          },
        },
        Type: 'NEPTUNE_ANALYTICS',
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'bedrock.amazonaws.com',
            },
            Condition: {
              ArnLike: {
                'aws:SourceArn': Match.anyValue(),
              },
            },
          },
        ],
      },
    });
  });

  test('Should have S3 Data Source', () => {
    const dataBucket = new cdk.aws_s3.Bucket(stack, 'SampleBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const kb = new GraphKnowledgeBase(stack, 'GraphKnowledgeBase', {
      embeddingModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
    });

    kb.addS3DataSource({ bucket: dataBucket });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      DataSourceConfiguration: {
        S3Configuration: {
          BucketArn: Match.objectLike({
            'Fn::GetAtt': [Match.anyValue(), 'Arn'],
          }),
        },
        Type: 'S3',
      },
      VectorIngestionConfiguration: {
        ContextEnrichmentConfiguration: {
          BedrockFoundationModelConfiguration: {
            EnrichmentStrategyConfiguration: {
              Method: 'CHUNK_ENTITY_EXTRACTION',
            },
          },
          Type: 'BEDROCK_FOUNDATION_MODEL',
        },
      },
    });
  });
});

describe('Graph KB - Imported', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeAll(() => {
    app = new cdk.App({});
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
  });

  test('Standard Import', () => {
    const kb = GraphKnowledgeBase.fromKnowledgeBaseAttributes(stack, 'ImportedGraphKnowledgeBase', {
      knowledgeBaseId: 'OVGH4TEBDH',
      executionRoleArn:
        'arn:aws:iam::123456789012:role/service-role/AmazonBedrockExecutionRoleForKnowledgeBase_9ivh2',
      graphId: 'g-t3l7bd29k2',
      fieldMapping: {
        textField: 'AMAZON_BEDROCK_TEXT',
        metadataField: 'AMAZON_BEDROCK_METADATA',
      },
    });

    expect(kb.knowledgeBaseId).toEqual('OVGH4TEBDH');
    expect(kb.graph.graphId).toEqual('g-t3l7bd29k2');
    expect(kb.role.roleArn).toEqual(
      'arn:aws:iam::123456789012:role/service-role/AmazonBedrockExecutionRoleForKnowledgeBase_9ivh2',
    );
    expect(kb.knowledgeBaseArn).toMatch(
      new RegExp('arn:.*:bedrock:us-east-1:123456789012:knowledge-base/OVGH4TEBDH$'),
    );
  });
});

describe('Multimodal Configuration', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();
    stack = new cdk.Stack(app, 'MultimodalTestStack', {
      env: { account: '123456789012', region: 'us-east-1' },
    });
  });

  test('Should throw error when multimodal config is provided for non-multimodal model', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;

    expect(() => {
      new VectorKnowledgeBase(stack, 'NonMultimodalKB', {
        embeddingsModel: model,
        multimodalConfig: {
          audio: { segmentation: AudioSegmentation.seconds(5) },
          video: { segmentation: VideoSegmentation.seconds(5) },
        },
      });
    }).toThrow(
      'Multimodal configuration can only be specified when using a multimodal embedding model.',
    );
  });

  test('Should throw error when supplemental data storage is not provided for multimodal model', () => {
    const model = BedrockFoundationModel.AMAZON_NOVA2_MULTIMODAL_V1_1024;

    expect(() => {
      new VectorKnowledgeBase(stack, 'MultimodalKBNoStorage', {
        embeddingsModel: model,
      });
    }).toThrow(
      'Supplemental data storage locations are required when using multimodal embedding models',
    );
  });

  test('Should automatically add default multimodal config for multimodal model', () => {
    const model = BedrockFoundationModel.AMAZON_NOVA2_MULTIMODAL_V1_1024;
    const supplementalStorage = SupplementalDataStorageLocation.s3({
      uri: 's3://test-bucket/multimodal/',
    });

    new VectorKnowledgeBase(stack, 'MultimodalKB', {
      embeddingsModel: model,
      supplementalDataStorageLocations: [supplementalStorage],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      KnowledgeBaseConfiguration: {
        VectorKnowledgeBaseConfiguration: {
          EmbeddingModelConfiguration: {
            BedrockEmbeddingModelConfiguration: {
              Audio: [{ SegmentationConfiguration: { FixedLengthDuration: 5 } }],
              Video: [{ SegmentationConfiguration: { FixedLengthDuration: 5 } }],
            },
          },
        },
      },
    });
  });

  test('Should use provided audio config and default video config', () => {
    const model = BedrockFoundationModel.AMAZON_NOVA2_MULTIMODAL_V1_1024;
    const supplementalStorage = SupplementalDataStorageLocation.s3({
      uri: 's3://test-bucket/multimodal/',
    });

    new VectorKnowledgeBase(stack, 'PartialMultimodalKB', {
      embeddingsModel: model,
      supplementalDataStorageLocations: [supplementalStorage],
      multimodalConfig: {
        audio: {
          segmentation: AudioSegmentation.seconds(10),
        },
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      KnowledgeBaseConfiguration: {
        VectorKnowledgeBaseConfiguration: {
          EmbeddingModelConfiguration: {
            BedrockEmbeddingModelConfiguration: {
              Audio: [{ SegmentationConfiguration: { FixedLengthDuration: 10 } }],
              Video: [{ SegmentationConfiguration: { FixedLengthDuration: 5 } }],
            },
          },
        },
      },
    });
  });

  test('Should use provided video config and default audio config', () => {
    const model = BedrockFoundationModel.AMAZON_NOVA2_MULTIMODAL_V1_1024;
    const supplementalStorage = SupplementalDataStorageLocation.s3({
      uri: 's3://test-bucket/multimodal/',
    });

    new VectorKnowledgeBase(stack, 'PartialMultimodalKB2', {
      embeddingsModel: model,
      supplementalDataStorageLocations: [supplementalStorage],
      multimodalConfig: {
        video: {
          segmentation: VideoSegmentation.seconds(15),
        },
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      KnowledgeBaseConfiguration: {
        VectorKnowledgeBaseConfiguration: {
          EmbeddingModelConfiguration: {
            BedrockEmbeddingModelConfiguration: {
              Audio: [{ SegmentationConfiguration: { FixedLengthDuration: 5 } }],
              Video: [{ SegmentationConfiguration: { FixedLengthDuration: 15 } }],
            },
          },
        },
      },
    });
  });

  test('Should not add multimodal config for non-multimodal model even if not provided', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;

    new VectorKnowledgeBase(stack, 'NonMultimodalKB2', {
      embeddingsModel: model,
    });

    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::Bedrock::KnowledgeBase');
    const kbConfig = Object.values(resources)[0].Properties.KnowledgeBaseConfiguration;
    const bedrockConfig =
      kbConfig.VectorKnowledgeBaseConfiguration.EmbeddingModelConfiguration
        .BedrockEmbeddingModelConfiguration;

    expect(bedrockConfig.Audio).toBeUndefined();
    expect(bedrockConfig.Video).toBeUndefined();
  });
});
