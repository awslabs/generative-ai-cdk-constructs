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
import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { KnowledgeBase } from '../../../../src/cdk-lib/bedrock/knowledge-base';
import { BedrockFoundationModel } from '../../../../src/cdk-lib/bedrock/models';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-knowledge-base-integ-test');

// const kb1 =
new KnowledgeBase(stack, 'kb1', {
  name: 'kb1',
  embeddingsModel: BedrockFoundationModel.TITAN_EMBED_TEXT_V2_512,
});

new KnowledgeBase(stack, 'kb2', {
  name: 'kb2',
  embeddingsModel: BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
});

new KnowledgeBase(stack, 'kb3', {
  name: 'kb3',
  embeddingsModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
});


new integ.IntegTest(app, 'ServiceTest', {
  testCases: [stack],
  cdkCommandOptions: {
    destroy: {
      args: {
        force: true,
      },
    },
  },
});

// const apiCall =
// integ_case.assertions.awsApiCall('bedrock-agent', 'GetKnowledgeBase', {
//   knowledgeBaseId: kb1.knowledgeBaseId,
// });


// integ_case.assertions.expect(
//   'custom-size-embedding-kb',
//   integ.ExpectedResult.objectLike({
//     knowledgeBase: {
//       knowledgeBaseConfiguration: {
//         vectorKnowledgeBaseConfiguration: {
//           embeddingModelConfiguration: {
//             bedrockEmbeddingModelConfiguration: {
//               dimensions: "512"
//             }
//           }
//         }
//       }
//     }
//   }),
//   integ.ActualResult.fromAwsApiCall(apiCall, 'Body')
// )

app.synth();