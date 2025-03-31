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
import * as kms from 'aws-cdk-lib/aws-kms';
import { KendraKnowledgeBase } from '../../src/cdk-lib/bedrock';
import { KendraGenAiIndex } from '../../src/cdk-lib/kendra';

const app = new cdk.App();
const region = 'us-east-1';
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-prompt-kendra-integ-test', {
  env: {
    region,
  },
});

const cmk = new kms.Key(stack, 'cmk', {});

const index = new KendraGenAiIndex(stack, 'index', {
  name: 'kendra-index-cdk',
  kmsKey: cmk,
  documentCapacityUnits: 1,
  queryCapacityUnits: 1,
});

new KendraKnowledgeBase(stack, 'kb', {
  name: 'kendra-kb-cdk',
  kendraIndex: index,
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

app.synth();
