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
  public static readonly META_LLAMA_70B_INSTRUCT = new BedrockFoundationModel(
    'meta.llama3-70b-instruct-v1:0',
    { supportsAgents: false },
  );
  public static readonly MISTRAL_AI_LARGE = new BedrockFoundationModel(
    'mistral.mistral-large-2402-v1:0',
    { supportsAgents: false },
  );
  public static readonly STABILITY_AI_STABLE_DIFFUSION_XL_V1 = new BedrockFoundationModel(
    'stability.stable-diffusion-xl-v1',
    { supportsAgents: false },
  );

  public static readonly TITAN_EMBED_TEXT_V1 = new BedrockFoundationModel(
    'amazon.titan-embed-text-v1',
    { supportsKnowledgeBase: true, vectorDimensions: 1536 },
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
    this.supportsKnowledgeBase = props.supportsKnowledgeBase ?? false;
    this.vectorDimensions = props.vectorDimensions;
  }

  toString(): string {
    return this.modelId;
  }

  asArn(construct: IConstruct): string {
    const region = cdk.Stack.of(construct).region;
    return `arn:aws:bedrock:${region}::foundation-model/${this.modelId}`;
  }
}
