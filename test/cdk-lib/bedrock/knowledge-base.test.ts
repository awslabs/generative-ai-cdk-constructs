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

import { ABSENT, expect as cdkExpect, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import { Annotations, Match, Template } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks } from 'cdk-nag';
import {
  AmazonAuroraDefaultVectorStore,
} from '../../../src/cdk-lib/amazonaurora';
import { KnowledgeBase } from '../../../src/cdk-lib/bedrock/knowledge-base';
import { BedrockFoundationModel } from '../../../src/cdk-lib/bedrock/models';
import { VectorCollection } from '../../../src/cdk-lib/opensearchserverless';
import { PineconeVectorStore } from '../../../src/cdk-lib/pinecone';

describe('KnowledgeBase', () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  let vectorCollection: VectorCollection;
  let template: Template;

  beforeAll(() => {
    app = new cdk.App();
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
    const knowledgeBase = new KnowledgeBase(stack, 'VectorKnowledgeBase', {
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
    const conditions = template.findConditions(
      '*',
      {
        'Fn::Not': [
          {
            'Fn::Equals': [
              0,
              0,
            ],
          },
        ],
      },
    );
    expect(Object.keys(conditions)).toHaveLength(1);
    const condition = Object.keys(conditions)[0];
    template.hasResource(
      'AWS::OpenSearchServerless::AccessPolicy', {
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
    const vectorStore = new AmazonAuroraDefaultVectorStore(stack, 'AuroraDefaultVectorStore6', {
      embeddingsModelVectorDimension: model.vectorDimensions!,
    });
    const knowledgeBase = new KnowledgeBase(stack, 'AuroraDefaultKnowledgeBase', {
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
    const knowledgeBase = new KnowledgeBase(stack, 'VectorKnowledgeBase2', {
      embeddingsModel: model,
      vectorStore: vectorStore,
    });

    const policyDocument = knowledgeBase.role.assumeRolePolicy?.toJSON();
    expect(policyDocument).toBeDefined();
    expect(policyDocument.Statement).toHaveLength(2);
    expect(policyDocument.Statement[0].Action).toContain('sts:AssumeRole');
    expect(policyDocument.Statement[0].Principal).toHaveProperty('Service');
    expect(policyDocument.Statement[0].Principal.Service).toContain('bedrock.amazonaws.com');
  });

  test('Should throw error when vectorStore is not VectorCollection and indexName is provided', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    const vectorStore = new AmazonAuroraDefaultVectorStore(stack, 'AmazonAuroraDefaultVectorStore6', {
      embeddingsModelVectorDimension: model.vectorDimensions!,
    });

    expect(() => {
      new KnowledgeBase(stack, 'AuroraDefaultKnowledgeBase6', {
        embeddingsModel: model,
        vectorStore: vectorStore,
        indexName: 'Test index',
      });
    }).toThrow();
  });

  test('Should throw error when vectorStore is not VectorCollection and vectorField is provided', () => {
    const model = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
    const vectorStore = new AmazonAuroraDefaultVectorStore(stack, 'AmazonAuroraDefaultVectorStore5', {
      embeddingsModelVectorDimension: model.vectorDimensions!,
    });

    expect(() => {
      new KnowledgeBase(stack, 'AuroraDefaultKnowledgeBase5', {
        embeddingsModel: model,
        vectorStore: vectorStore,
        vectorField: 'Test vector field',
      });
    }).toThrow();
  });

  test('Should correctly initialize with different vectorStore types', () => {
    const vectorStores = [
      new VectorCollection(stack, 'VectorCollection3'),
      new AmazonAuroraDefaultVectorStore(stack, 'AmazonAuroraDefaultVectorStore', {
        embeddingsModelVectorDimension: BedrockFoundationModel.TITAN_EMBED_TEXT_V1.vectorDimensions!,
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
      const knowledgeBase = new KnowledgeBase(stack, `KnowledgeBase${index}`, {
        embeddingsModel: model,
        vectorStore: vectorStore,
      });

      expect(knowledgeBase.instruction).toBeUndefined();
      expect(knowledgeBase.name).toBeDefined();
      expect(knowledgeBase.role).toBeDefined();
      expect(knowledgeBase.vectorStore).toBe(vectorStore);
    });
  });

  test('Should correctly initialize with AmazonAuroraDefaultVectorStore and custom embeddingsModel', () => {
    const model = BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3;
    const vectorStore = new AmazonAuroraDefaultVectorStore(stack, 'AuroraDefaultVectorStore2', {
      embeddingsModelVectorDimension: model.vectorDimensions!,
    });

    const knowledgeBase = new KnowledgeBase(stack, 'AuroraDefaultKnowledgeBase2', {
      embeddingsModel: model,
      vectorStore: vectorStore,
    });

    expect(knowledgeBase.vectorStore).toBe(vectorStore);
  });

  test('No unsuppressed Errors', () => {
    const errors = Annotations.fromStack(stack).findError(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    const errorData = errors.map(error => error.entry.data);
    expect(errorData).toHaveLength(2); // AwsSolutions-IAM4 and AwsSolutions-IAM5
  });

  test('Knowledge Base with Embedding Model NOT supporting Configurable Dimensions', () => {
    //GIVEN
    new KnowledgeBase(stack, 'AuroraDefaultKnowledgeBaseTitan1024', {
      embeddingsModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
    });
    //THEN
    cdkExpect(stack).to(
      haveResourceLike('AWS::Bedrock::KnowledgeBase', {
        KnowledgeBaseConfiguration: {
          Type: 'VECTOR',
          VectorKnowledgeBaseConfiguration: {
            EmbeddingModelConfiguration: ABSENT,
          },
        },
      }),
    );
  });

  test('Knowledge Base with Embedding Model supporting Configurable Dimensions', () => {
    //GIVEN
    new KnowledgeBase(stack, 'AuroraDefaultKnowledgeBaseTitan512', {
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
              },
            },
          },
        },
      }),
    );
  });

});