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

import * as integ from "@aws-cdk/integ-tests-alpha";
import * as cdk from "aws-cdk-lib";

import {
  BedrockFoundationModel,
  ChunkingStrategy,
  VectorKnowledgeBase,
} from "../../src/cdk-lib/bedrock";
const app = new cdk.App();
const stack = new cdk.Stack(app, "aws-cdk-bedrock-chat-prompts-integ-test");

// Create a Vector Knowledge Base
const kb = new VectorKnowledgeBase(stack, "VectorKnowledgeBase", {
  embeddingsModel: BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
});

kb.addCustomDataSource({
  dataSourceName: "custom-test",
  chunkingStrategy: ChunkingStrategy.SEMANTIC,
});

// const integ_case =
new integ.IntegTest(app, "ServiceTest", {
  testCases: [stack],
  cdkCommandOptions: {
    destroy: {
      args: {
        force: true,
      },
    },
  },
});

app.synth();
