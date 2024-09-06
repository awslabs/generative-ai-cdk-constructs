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
import { FoundationModel, FoundationModelIdentifier } from 'aws-cdk-lib/aws-bedrock';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { AwsSolutionsChecks } from 'cdk-nag';
import * as bedrock from '../../../../src/cdk-lib/bedrock';


describe('S3 Data Source', () => {
  let stack: cdk.Stack;
  let bucket: s3.Bucket;
  let kb: bedrock.KnowledgeBase;

  beforeEach(() => {
    const app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'TestStack');
    bucket = new s3.Bucket(stack, 'TestBucket');
    kb = new bedrock.KnowledgeBase(stack, 'KB', {
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
    });
  });

  test('Default chunking', () => {
    new bedrock.S3DataSource(stack, 'TestDataSource', {
      bucket,
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      chunkingStrategy: bedrock.ChunkingStrategy.DEFAULT,
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

  test('Fixed size chunking', () => {
    new bedrock.S3DataSource(stack, 'TestDataSource', {
      bucket,
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      chunkingStrategy: bedrock.ChunkingStrategy.fixedSize({
        maxTokens: 1024,
        overlapPercentage: 20,
      }),
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

  test('Semantic chunking - default', () => {
    new bedrock.S3DataSource(stack, 'TestDataSource', {
      bucket,
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      chunkingStrategy: bedrock.ChunkingStrategy.SEMANTIC,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: {
          ChunkingStrategy: 'SEMANTIC',
          SemanticChunkingConfiguration: {
            MaxTokens: 300,
            BufferSize: 0,
            BreakpointPercentileThreshold: 95,
          },
        },
      },
    });
  });

  test('Semantic chunking', () => {
    new bedrock.S3DataSource(stack, 'TestDataSource', {
      bucket,
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      chunkingStrategy: bedrock.ChunkingStrategy.semantic({
        maxTokens: 1024,
        bufferSize: 1,
        breakpointPercentileThreshold: 99,
      }),
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: {
          ChunkingStrategy: 'SEMANTIC',
          SemanticChunkingConfiguration: {
            MaxTokens: 1024,
            BufferSize: 1,
            BreakpointPercentileThreshold: 99,
          },
        },
      },
    });
  });

  test('Hierarchical chunking - default', () => {
    new bedrock.S3DataSource(stack, 'TestDataSource', {
      bucket,
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      chunkingStrategy: bedrock.ChunkingStrategy.HIERARCHICAL_TITAN,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: {
          ChunkingStrategy: 'HIERARCHICAL',
          HierarchicalChunkingConfiguration: {
            LevelConfigurations: [
              { MaxTokens: 1500 }, // Parent max tokens
              { MaxTokens: 300 }, // Child max tokens
            ],
            OverlapTokens: 60,
          },
        },
      },
    });
  });

  test('Hierarchical chunking - custom', () => {
    new bedrock.S3DataSource(stack, 'TestDataSource', {
      bucket,
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      chunkingStrategy: bedrock.ChunkingStrategy.hierarchical({
        maxParentTokenSize: 1024,
        maxChildTokenSize: 256,
        overlapTokens: 30,
      }),
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: {
          ChunkingStrategy: 'HIERARCHICAL',
          HierarchicalChunkingConfiguration: {
            LevelConfigurations: [
              { MaxTokens: 1024 }, // Parent max tokens
              { MaxTokens: 256 }, // Child max tokens
            ],
            OverlapTokens: 30,
          },
        },
      },
    });
  });

  test('FM parsing', () => {

    new bedrock.S3DataSource(stack, 'TestDataSource', {
      bucket,
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      parsingStrategy: bedrock.ParsingStategy.foundationModel({
        parsingModel: FoundationModel.fromFoundationModelId(stack, 'model',
          FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_SONNET_20240229_V1_0,
        ),
      }),
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      VectorIngestionConfiguration: {
        ParsingConfiguration: {
          ParsingStrategy: 'BEDROCK_FOUNDATION_MODEL',
        },
      },
    });
  });


});