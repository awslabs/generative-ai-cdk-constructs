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

/**
 * Bedrock models.
 *
 * If you need to use a model name that doesn't exist as a static member, you
 * can instantiate a `BedrockFoundationModel` object, e.g: `new BedrockFoundationModel('my-model')`.
 */
export class BedrockFoundationModel {
  public static ANTHROPIC_CLAUDE_V2 = new BedrockFoundationModel('anthropic.claude-v2');
  public static ANTHROPIC_CLAUDE_V2_1 = new BedrockFoundationModel('anthropic.claude-v2:1');
  public static ANTHROPIC_CLAUDE_INSTANT_V1_2 = new BedrockFoundationModel('anthropic.claude-instant-v1');
  public static AMAZON_TITAN_TEXT_EXPRESS_V1 = new BedrockFoundationModel('amazon.titan-text-express-v1');

  public static TITAN_EMBED_TEXT_V1 = new BedrockFoundationModel('amazon.titan-embed-text-v1');
  public static COHERE_EMBED_ENGLISH_V3 = new BedrockFoundationModel('cohere.embed-english-v3');
  public static COHERE_EMBED_MULTILINGUAL_V3 = new BedrockFoundationModel('cohere.embed-multilingual-v3');

  constructor(public value: string) {}

  toString(): string {
    return this.value;
  }

  asArn(construct: IConstruct): string {
    const region = cdk.Stack.of(construct).region;
    return `arn:aws:bedrock:${region}::foundation-model/${this.value}`;
  }
}
