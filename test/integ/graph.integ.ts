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
import * as bedrock from "../../src/cdk-lib/bedrock";
import { NeptuneGraph } from "../../src/cdk-lib/neptune/graph";
import { GraphKnowledgeBase } from "../../src/cdk-lib/bedrock/knowledge-bases/graph-knowledge-base";

const app = new cdk.App();
const stack = new cdk.Stack(app, "aws-cdk-bedrock-graph-integ-test-2", {
  env: {
    region: "us-east-1",
  },
});

// const kb = new GraphKnowledgeBase(stack, "GraphKnowledgeBase", {
//   embeddingModel: bedrock.BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
// });

// kb.addS3DataSource({
//   bucket: dataBucket,
// });

const embeddingModel = bedrock.BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3;

const graph = new NeptuneGraph(stack, "NeptuneGraph", {
  vectorSearchDimension: embeddingModel.vectorDimensions!,
  notebook: true,
});

const kb = new GraphKnowledgeBase(stack, "GraphKnowledgeBase", {
  embeddingModel,
  graph,
});

// kb.addS3DataSource({
//   bucket: dataBucket,
// });

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
