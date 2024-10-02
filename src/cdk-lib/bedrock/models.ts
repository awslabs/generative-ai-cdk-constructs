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

import { Stack } from "aws-cdk-lib";
import { IModel } from "aws-cdk-lib/aws-bedrock";
import { IConstruct } from "constructs";

/**
 * The type of Bedrock Invokable model.
 */
export enum BedrockInvokableModelType {
  FOUNDATION_MODEL = "foundation-model",
  INFERENCE_PROFILE = "inference-profile",
  CUSTOM_MODEL = "custom-model",
  PROVISIONED_MODEL = "provisioned-model",
  IMPORTED_MODEL = "imported-model",
}

/**
 * Properties common to all invokable models.
 */
export interface IInvokableModel {
  /**
   * The Identifier for this model.
   */
  readonly modelId: string;
  /**
   * The type of Bedrock Model.
   */
  readonly modelType: BedrockInvokableModelType;
  /**
   * Bedrock Agents can use this model.
   *
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/agents-supported.html
   */
  readonly supportsAgents: boolean;
  /**
   * Whether Bedrock Knowledge Bases can use this model.
   *
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html
   */
  readonly supportsKnowledgeBase: boolean;
  /**
   * Whether this model can be used for advanced data parsing techniques on data sources
   * for Knowledge Bases for Amazon Bedrock.
   *
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking-parsing.html#kb-advanced-parsing
   */
  readonly supportsDataParsing: boolean;

  /**
   * Method to retrieve the ARN
   */
  asArn(scope: IConstruct): string;
}

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
   * Whether this model supports inference profiles / cross-region inference.
   *
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference-support.html
   * @default - false
   */
  readonly supportsInferenceProfile?: boolean;
  /**
   * Whether this model can be used for advanced data parsing techniques on data sources
   * for Amazon Bedrock Knowledge Bases.
   */
  readonly supportsDataParsing?: boolean;
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
export class BedrockFoundationModel implements IInvokableModel {
  // ------------------------------------------------------
  // Text & Multimodal Models
  // ------------------------------------------------------
  // ANTHROPIC CLAUDE MODELS
  public static readonly ANTHROPIC_CLAUDE_V2 = new BedrockFoundationModel(
    "anthropic.claude-v2",
    { supportsAgents: true }
  );
  public static readonly ANTHROPIC_CLAUDE_V2_1 = new BedrockFoundationModel(
    "anthropic.claude-v2:1",
    { supportsAgents: true }
  );
  public static readonly ANTHROPIC_CLAUDE_INSTANT_V1_2 = new BedrockFoundationModel(
    "anthropic.claude-instant-v1",
    { supportsAgents: true }
  );
  public static readonly AMAZON_TITAN_TEXT_EXPRESS_V1 = new BedrockFoundationModel(
    "amazon.titan-text-express-v1",
    { supportsAgents: true }
  );
  public static readonly ANTHROPIC_CLAUDE_3_5_SONNET_V1_0 = new BedrockFoundationModel(
    "anthropic.claude-3-5-sonnet-20240620-v1:0",
    { supportsAgents: true, supportsInferenceProfile: true }
  );
  public static readonly ANTHROPIC_CLAUDE_OPUS_V1_0 = new BedrockFoundationModel(
    "anthropic.claude-3-opus-20240229-v1:0",
    { supportsAgents: true, supportsInferenceProfile: true }
  );
  public static readonly ANTHROPIC_CLAUDE_SONNET_V1_0 = new BedrockFoundationModel(
    "anthropic.claude-3-sonnet-20240229-v1:0",
    { supportsAgents: true, supportsInferenceProfile: true, supportsDataParsing: true }
  );
  public static readonly ANTHROPIC_CLAUDE_HAIKU_V1_0 = new BedrockFoundationModel(
    "anthropic.claude-3-haiku-20240307-v1:0",
    { supportsAgents: true, supportsInferenceProfile: true, supportsDataParsing: true }
  );
  // AMAZON TITAN MODELS
  public static readonly AMAZON_TITAN_PREMIER_V1_0 = new BedrockFoundationModel(
    "amazon.titan-text-premier-v1:0",
    { supportsAgents: true }
  );
  // META LLAMA
  public static readonly META_LLAMA_V3_2_1B_INSTRUCT = new BedrockFoundationModel(
    "meta.llama3-2-1b-instruct-v1:0",
    { supportsAgents: true, supportsInferenceProfile: true }
  );
  public static readonly META_LLAMA_V3_2_3B_INSTRUCT = new BedrockFoundationModel(
    "meta.llama3-2-3b-instruct-v1:0",
    { supportsAgents: true, supportsInferenceProfile: true }
  );
  public static readonly META_LLAMA_V3_2_11B_VISION_INSTRUCT = new BedrockFoundationModel(
    "meta.llama3-2-11b-instruct-v1:0",
    { supportsAgents: true, supportsInferenceProfile: true }
  );
  public static readonly META_LLAMA_V3_2_90B_VISION_INSTRUCT = new BedrockFoundationModel(
    "meta.llama3-2-90b-instruct-v1:0",
    { supportsAgents: true, supportsInferenceProfile: true }
  );

  // ------------------------------------------------------
  // Embedding Models
  // ------------------------------------------------------
  // TITAN TEXT EMBEDDINGS V1
  public static readonly TITAN_EMBED_TEXT_V1 = new BedrockFoundationModel(
    "amazon.titan-embed-text-v1",
    { supportsKnowledgeBase: true, vectorDimensions: 1536 }
  );
  // TITAN TEXT EMBEDDINGS V2
  public static readonly TITAN_EMBED_TEXT_V2_256 = new BedrockFoundationModel(
    "amazon.titan-embed-text-v2:0",
    { supportsKnowledgeBase: true, vectorDimensions: 256 }
  );
  public static readonly TITAN_EMBED_TEXT_V2_512 = new BedrockFoundationModel(
    "amazon.titan-embed-text-v2:0",
    { supportsKnowledgeBase: true, vectorDimensions: 512 }
  );
  public static readonly TITAN_EMBED_TEXT_V2_1024 = new BedrockFoundationModel(
    "amazon.titan-embed-text-v2:0",
    { supportsKnowledgeBase: true, vectorDimensions: 1024 }
  );
  // COHERE EMBED V3
  public static readonly COHERE_EMBED_ENGLISH_V3 = new BedrockFoundationModel(
    "cohere.embed-english-v3",
    { supportsKnowledgeBase: true, vectorDimensions: 1024 }
  );
  public static readonly COHERE_EMBED_MULTILINGUAL_V3 = new BedrockFoundationModel(
    "cohere.embed-multilingual-v3",
    { supportsKnowledgeBase: true, vectorDimensions: 1024 }
  );

  // ------------------------------------------------------
  // Embedding Models
  // ------------------------------------------------------
  public readonly modelId: string;
  public readonly supportsAgents: boolean;
  public readonly vectorDimensions?: number;
  public readonly supportsKnowledgeBase: boolean;
  public readonly supportsInferenceProfile: boolean;
  public readonly supportsDataParsing: boolean;
  public readonly modelType: BedrockInvokableModelType;

  constructor(value: string, props: BedrockFoundationModelProps = {}) {
    this.modelId = value;
    this.supportsAgents = props.supportsAgents ?? false;
    this.vectorDimensions = props.vectorDimensions;
    this.supportsKnowledgeBase = props.supportsKnowledgeBase ?? false;
    this.supportsInferenceProfile = props.supportsInferenceProfile ?? false;
    this.supportsDataParsing = props.supportsDataParsing ?? false;
    this.modelType = BedrockInvokableModelType.FOUNDATION_MODEL;
  }

  // ------------------------------------------------------
  // Methods
  // ------------------------------------------------------
  /** Returns the modelId of this Model */
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

  /** Returns this class as an IModel */
  asIModel(construct: IConstruct): IModel {
    return { modelArn: this.asArn(construct) };
  }
}
