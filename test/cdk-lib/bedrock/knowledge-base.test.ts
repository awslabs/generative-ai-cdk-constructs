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
import { VectorKnowledgeBase, VectorStoreType } from '../../../src/cdk-lib/bedrock/knowledge-bases/vector-knowledge-base';
import { BedrockFoundationModel, VectorType } from '../../../src/cdk-lib/bedrock/models';
import { VectorCollection } from '../../../src/cdk-lib/opensearchserverless';
import { PineconeVectorStore } from '../../../src/cdk-lib/pinecone';

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
    const errors = Annotations.fromStack(stack).findError('*', Match.stringLikeRegexp('AwsSolutions-.*'));
    const errorData = errors.map(error => error.entry.data);
    expect(errorData).toHaveLength(2); // AwsSolutions-IAM4 and AwsSolutions-IAM5
  });

  test('Knowledge Base with Embedding Model NOT supporting Configurable Dimensions and floating point', () => {
    //GIVEN
    new VectorKnowledgeBase(stack, 'DefaultKnowledgeBaseTitan1024FP', {
      embeddingsModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
    });
    //THEN
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
    //GIVEN
    new VectorKnowledgeBase(stack, 'AuroraDefaultKnowledgeBaseTitan1024Binary', {
      embeddingsModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
      vectorType: VectorType.BINARY,
    });
    //THEN
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
    //GIVEN
    new VectorKnowledgeBase(stack, 'AuroraDefaultKnowledgeBaseTitan512FP', {
      embeddingsModel: BedrockFoundationModel.TITAN_EMBED_TEXT_V2_512,
    });
    //THEN
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
    //GIVEN
    new VectorKnowledgeBase(stack, 'AuroraDefaultKnowledgeBaseTitan512Binary', {
      embeddingsModel: BedrockFoundationModel.TITAN_EMBED_TEXT_V2_512,
      vectorType: VectorType.BINARY,
    });
    console.log(stack.toJsonString);
    //THEN
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
    expect(kb.role.roleName).toEqual('AmazonBedrockExecutionRoleForKnowledgeBaseawscdkbdgeBaseE9B1DDDC');
    expect(kb.knowledgeBaseArn).toMatch(new RegExp('arn:.*:bedrock:us-east-1:123456789012:knowledge-base/OVGH4TEBDH$'));
  });

  test('Imported Knowledge Base - Data Source Method', () => {
    const kb2 = VectorKnowledgeBase.fromKnowledgeBaseAttributes(stack, 'ImportedKnowledgeBase2', {
      knowledgeBaseId: 'OVGH4TEBDH',
      executionRoleArn: 'arn:aws:iam::123456789012:role/service-role/AmazonBedrockExecutionRoleForKnowledgeBase_9ivh2',
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
});
