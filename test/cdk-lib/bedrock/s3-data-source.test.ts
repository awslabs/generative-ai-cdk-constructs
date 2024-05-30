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
import { Template } from 'aws-cdk-lib/assertions';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as bedrock from '../../../src/cdk-lib/bedrock';

// mock lambda.Code.fromDockerBuild()
jest.mock('aws-cdk-lib/aws-lambda', () => {
  const actualLambda = jest.requireActual('aws-cdk-lib/aws-lambda');
  return {
    ...actualLambda,
    Code: {
      ...actualLambda.Code,
      fromDockerBuild: jest.fn(() => actualLambda.Code.fromInline('mockCode')),
      fromAsset: jest.fn(() => actualLambda.Code.fromInline('mockCode')),
    },
  };
});

describe('S3 Data Source', () => {
  let stack: cdk.Stack;
  let bucket: s3.Bucket;
  let kb: bedrock.KnowledgeBase;

  beforeEach(() => {
    const app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
    bucket = new s3.Bucket(stack, 'TestBucket');
    kb = new bedrock.KnowledgeBase(stack, 'KB', {
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
    });
  });

  test('Fixed size chunking', () => {
    new bedrock.S3DataSource(stack, 'TestDataSource', {
      bucket,
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
      maxTokens: 1024,
      overlapPercentage: 20,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {

      VectorIngestionConfiguration:
       {
         ChunkingConfiguration: {
           ChunkingStrategy: 'FIXED_SIZE',
           FixedSizeChunkingConfiguration: {
             MaxTokens: 1024,
             OverlapPercentage: 20,
           },
         },
       },
    });
  });

  test('Default chunking', () => {
    new bedrock.S3DataSource(stack, 'TestDataSource', {
      bucket,
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      chunkingStrategy: bedrock.ChunkingStrategy.DEFAULT,
      maxTokens: 1024,
      overlapPercentage: 20,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {

      VectorIngestionConfiguration:
       {
         ChunkingConfiguration: {
           ChunkingStrategy: 'FIXED_SIZE',
           FixedSizeChunkingConfiguration: {
             MaxTokens: 300,
             OverlapPercentage: 20,
           },
         },
       },
    });
  });

  test('No chunking', () => {
    new bedrock.S3DataSource(stack, 'TestDataSource', {
      bucket,
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      chunkingStrategy: bedrock.ChunkingStrategy.NONE,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      VectorIngestionConfiguration:
       {
         ChunkingConfiguration:
        { ChunkingStrategy: 'NONE' },
       },
    });
  });

});