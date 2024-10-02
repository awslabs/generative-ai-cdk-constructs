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
import {
  Agent,
  BedrockFoundationModel,
  InferenceProfile,
  InferenceProfileRegion,
} from "../../../src/cdk-lib/bedrock";
import { Match, Template } from "aws-cdk-lib/assertions";

describe("Inference Profile", () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, "TestStack", { env: { region: "us-west-2" } });
  });

  test("Inference Profile is created", () => {
    const inferenceProfileEU = new InferenceProfile({
      model: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
      region: InferenceProfileRegion.EU,
    });
    const inferenceProfileUS = new InferenceProfile({
      model: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
      region: InferenceProfileRegion.US,
    });

    expect(inferenceProfileEU.modelType).toEqual("inference-profile");
    expect(inferenceProfileEU.modelId).toEqual(
      "eu.anthropic.claude-3-5-sonnet-20240620-v1:0"
    );
    expect(inferenceProfileUS.modelId).toEqual(
      "us.anthropic.claude-3-5-sonnet-20240620-v1:0"
    );
  });

  test("Inference Profile - Agent", () => {
    const inferenceProfileEU = new InferenceProfile({
      model: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
      region: InferenceProfileRegion.EU,
    });

    new Agent(stack, "id", {
      model: inferenceProfileEU,
      instruction: "You provide support for developers working with CDK constructs.",
    });

    Template.fromStack(stack).hasResourceProperties("AWS::Bedrock::Agent", {
      Instruction: "You provide support for developers working with CDK constructs.",
    });

    Template.fromStack(stack).hasResourceProperties("AWS::IAM::Policy", {
      PolicyDocument: {
        Statement: [
          {
            Action: "bedrock:InvokeModel",
            Effect: "Allow",
            Resource: [
              "arn:aws:bedrock:us-west-2::inference-profile/anthropic.claude-3-5-sonnet-20240620-v1:0",
            ],
          },
        ],
      },
    });
  });
});
