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


import { Stack } from 'aws-cdk-lib';
import { IModel } from 'aws-cdk-lib/aws-bedrock';
import { IConstruct } from 'constructs';

export interface BedrockFoundationModelProps {
  /**
   * Bedrock Agents can use this model.
   *
   * @default - false
   */
  readonly supportsAgents?: boolean;
  /**
   * Bedrock Knowledge Base can use this model.
   *
   * @default - false
   */
  readonly supportsKnowledgeBase?: boolean;
  /**
   * Embedding models have different vector dimensions.
   * Only applicable for embedding models.
   */
  readonly vectorDimensions?: number;
}

/**
 * Bedrock models.
 *
 * If you need to use a model name that doesn't exist as a static member, you
 * can instantiate a `BedrockFoundationModel` object, e.g: `new BedrockFoundationModel('my-model')`.
 */
export class BedrockFoundationModel {
  public static readonly ANTHROPIC_CLAUDE_V2 = new BedrockFoundationModel(
    'anthropic.claude-v2',
    { supportsAgents: true },
  );
  public static readonly ANTHROPIC_CLAUDE_V2_1 = new BedrockFoundationModel(
    'anthropic.claude-v2:1',
    { supportsAgents: true },
  );
  public static readonly ANTHROPIC_CLAUDE_INSTANT_V1_2 = new BedrockFoundationModel(
    'anthropic.claude-instant-v1',
    { supportsAgents: true },
  );
  public static readonly AMAZON_TITAN_TEXT_EXPRESS_V1 = new BedrockFoundationModel(
    'amazon.titan-text-express-v1',
    { supportsAgents: true },
  );
  public static readonly ANTHROPIC_CLAUDE_SONNET_V1_0 = new BedrockFoundationModel(
    'anthropic.claude-3-sonnet-20240229-v1:0',
    { supportsAgents: true },
  );
  public static readonly ANTHROPIC_CLAUDE_HAIKU_V1_0 = new BedrockFoundationModel(
    'anthropic.claude-3-haiku-20240307-v1:0',
    { supportsAgents: true },
  );
  public static readonly AMAZON_TITAN_PREMIER_V1_0 = new BedrockFoundationModel(
    'amazon.titan-text-premier-v1:0',
    { supportsAgents: true },
  );
  public static readonly TITAN_EMBED_TEXT_V1 = new BedrockFoundationModel(
    'amazon.titan-embed-text-v1',
    { supportsKnowledgeBase: true, vectorDimensions: 1536 },
  );
  public static readonly TITAN_EMBED_TEXT_V2_1024 = new BedrockFoundationModel(
    'amazon.titan-embed-text-v2:0',
    { supportsKnowledgeBase: true, vectorDimensions: 1024 },
  );
  public static readonly TITAN_EMBED_TEXT_V2_512 = new BedrockFoundationModel(
    'amazon.titan-embed-text-v2:0',
    { supportsKnowledgeBase: true, vectorDimensions: 512 },
  );
  public static readonly TITAN_EMBED_TEXT_V2_256 = new BedrockFoundationModel(
    'amazon.titan-embed-text-v2:0',
    { supportsKnowledgeBase: true, vectorDimensions: 256 },
  );
  public static readonly COHERE_EMBED_ENGLISH_V3 = new BedrockFoundationModel(
    'cohere.embed-english-v3',
    { supportsKnowledgeBase: true, vectorDimensions: 1024 },
  );
  public static readonly COHERE_EMBED_MULTILINGUAL_V3 = new BedrockFoundationModel(
    'cohere.embed-multilingual-v3',
    { supportsKnowledgeBase: true, vectorDimensions: 1024 },
  );

  public readonly modelId: string;
  public readonly supportsAgents: boolean;
  public readonly vectorDimensions?: number;
  public readonly supportsKnowledgeBase: boolean;
  constructor(value: string, props: BedrockFoundationModelProps = {}) {
    this.modelId = value;
    this.supportsAgents = props.supportsAgents ?? false;
    this.vectorDimensions = props.vectorDimensions;
    this.supportsKnowledgeBase = props.supportsKnowledgeBase ?? false;
  }

  toString(): string {
    return this.modelId;
  }

  /**
   * Returns the ARN of the foundation model in the following format:
   * `arn:${Partition}:bedrock:${Region}::foundation-model/${ResourceId}`
   */
  asArn(construct: IConstruct): string {
    const region = Stack.of(construct).region;
    return `arn:aws:bedrock:${region}::foundation-model/${this.modelId}`;
  }

  asIModel(construct: IConstruct): IModel {
    return { modelArn: this.asArn(construct) };
  }
}