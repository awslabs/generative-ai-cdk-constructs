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

import * as cdk from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import { AwsSolutionsChecks } from "cdk-nag";
import * as bedrock from "../../../../src/cdk-lib/bedrock";
import * as foundationModels from "../../../../src/cdk-lib/bedrock/models";

describe("S3 Data Source", () => {
  let stack: cdk.Stack;
  let bucket: s3.Bucket;
  let kb: bedrock.KnowledgeBase;

  beforeEach(() => {
    const app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, "TestStack");
    bucket = new s3.Bucket(stack, "TestBucket");
    kb = new bedrock.KnowledgeBase(stack, "KB", {
      embeddingsModel: foundationModels.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
    });
  });

  test("Method", () => {
    kb.addS3DataSource({
      bucket,
      dataSourceName: "TestDataSource",
    });

    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::DataSource", {
      KnowledgeBaseId: {
        "Fn::GetAtt": [Match.anyValue(), "KnowledgeBaseId"],
      },
      Name: "TestDataSource",
      DataSourceConfiguration: {
        S3Configuration: {
          BucketArn: {
            "Fn::GetAtt": [Match.anyValue(), "Arn"],
          },
        },
      },
    });
  });

  test("Default chunking", () => {
    new bedrock.S3DataSource(stack, "TestDataSource", {
      bucket,
      knowledgeBase: kb,
      dataSourceName: "TestDataSource",
      chunkingStrategy: bedrock.ChunkingStrategy.DEFAULT,
    });

    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::DataSource", {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: {
          ChunkingStrategy: "FIXED_SIZE",
          FixedSizeChunkingConfiguration: {
            MaxTokens: 300,
            OverlapPercentage: 20,
          },
        },
      },
    });
  });

  test("Fixed size chunking", () => {
    new bedrock.S3DataSource(stack, "TestDataSource", {
      bucket,
      knowledgeBase: kb,
      dataSourceName: "TestDataSource",
      chunkingStrategy: bedrock.ChunkingStrategy.fixedSize({
        maxTokens: 1024,
        overlapPercentage: 20,
      }),
    });

    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::DataSource", {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: {
          ChunkingStrategy: "FIXED_SIZE",
          FixedSizeChunkingConfiguration: {
            MaxTokens: 1024,
            OverlapPercentage: 20,
          },
        },
      },
    });
  });

  test("No chunking", () => {
    new bedrock.S3DataSource(stack, "TestDataSource", {
      bucket,
      knowledgeBase: kb,
      dataSourceName: "TestDataSource",
      chunkingStrategy: bedrock.ChunkingStrategy.NONE,
    });

    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::DataSource", {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: { ChunkingStrategy: "NONE" },
      },
    });
  });

  test("Semantic chunking - default", () => {
    new bedrock.S3DataSource(stack, "TestDataSource", {
      bucket,
      knowledgeBase: kb,
      dataSourceName: "TestDataSource",
      chunkingStrategy: bedrock.ChunkingStrategy.SEMANTIC,
    });

    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::DataSource", {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: {
          ChunkingStrategy: "SEMANTIC",
          SemanticChunkingConfiguration: {
            MaxTokens: 300,
            BufferSize: 0,
            BreakpointPercentileThreshold: 95,
          },
        },
      },
    });
  });

  test("Semantic chunking", () => {
    new bedrock.S3DataSource(stack, "TestDataSource", {
      bucket,
      knowledgeBase: kb,
      dataSourceName: "TestDataSource",
      chunkingStrategy: bedrock.ChunkingStrategy.semantic({
        maxTokens: 1024,
        bufferSize: 1,
        breakpointPercentileThreshold: 99,
      }),
    });

    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::DataSource", {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: {
          ChunkingStrategy: "SEMANTIC",
          SemanticChunkingConfiguration: {
            MaxTokens: 1024,
            BufferSize: 1,
            BreakpointPercentileThreshold: 99,
          },
        },
      },
    });
  });

  test("Hierarchical chunking - default", () => {
    new bedrock.S3DataSource(stack, "TestDataSource", {
      bucket,
      knowledgeBase: kb,
      dataSourceName: "TestDataSource",
      chunkingStrategy: bedrock.ChunkingStrategy.HIERARCHICAL_TITAN,
    });

    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::DataSource", {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: {
          ChunkingStrategy: "HIERARCHICAL",
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

  test("Hierarchical chunking - custom", () => {
    new bedrock.S3DataSource(stack, "TestDataSource", {
      bucket,
      knowledgeBase: kb,
      dataSourceName: "TestDataSource",
      chunkingStrategy: bedrock.ChunkingStrategy.hierarchical({
        maxParentTokenSize: 1024,
        maxChildTokenSize: 256,
        overlapTokens: 30,
      }),
    });

    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::DataSource", {
      VectorIngestionConfiguration: {
        ChunkingConfiguration: {
          ChunkingStrategy: "HIERARCHICAL",
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

  test("FM parsing", () => {
    new bedrock.S3DataSource(stack, "TestDataSource", {
      bucket,
      knowledgeBase: kb,
      dataSourceName: "TestDataSource",
      parsingStrategy: bedrock.ParsingStategy.foundationModel({
        parsingModel: foundationModels.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
      }),
    });

    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::DataSource", {
      VectorIngestionConfiguration: {
        ParsingConfiguration: {
          ParsingStrategy: "BEDROCK_FOUNDATION_MODEL",
          BedrockFoundationModelConfiguration: {
            ModelArn: Match.anyValue(),
            ParsingPrompt: {
              ParsingPromptText: Match.stringLikeRegexp("Transcribe the text content.*"),
            },
          },
        },
      },
    });
  });

  test("Lambda Transformation", () => {
    // WHEN
    const bucket2 = new s3.Bucket(stack, "mybucket", {
      bucketName: "mybucketname",
    });
    const lambdaFunction = new Function(stack, "myFunction", {
      code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hello"); }'),
      handler: "index.handler",
      runtime: Runtime.PYTHON_3_11,
    });
    new bedrock.S3DataSource(stack, "TestDataSource", {
      bucket,
      knowledgeBase: kb,
      dataSourceName: "TestDataSource",
      customTransformation: bedrock.CustomTransformation.lambda({
        lambdaFunction,
        s3BucketUri: `s3://${bucket2.bucketName}/chunkprocessor`,
      }),
    });

    // THEN
    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::DataSource", {
      VectorIngestionConfiguration: {
        CustomTransformationConfiguration: {
          Transformations: [
            {
              StepToApply: "POST_CHUNKING",
              TransformationFunction: {
                TransformationLambdaConfiguration: {
                  LambdaArn: {
                    "Fn::GetAtt": [Match.anyValue(), "Arn"],
                  },
                },
              },
            },
          ],
          IntermediateStorage: {
            S3Location: {
              URI: Match.anyValue(),
            },
          },
        },
      },
    });
  });
});
