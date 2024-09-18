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
import {
  AossCwDashboard,
} from '../../../../../src/patterns/gen-ai/aws-aoss-cw-dashboard';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-aoss-dashboard-integ-test');

const collectionName = 'mycollection';
const collectionId = 'mycollectionid';
const indexId = 'myindexid';
const dataSourceId = 'mydatasourceid';

const cwDsTestConstruct = new AossCwDashboard(stack, 'test', {});
cwDsTestConstruct.addCollectionMonitoringbyAttributes(
  collectionName,
  collectionId,
  {},
);
cwDsTestConstruct.addIndexMonitoringByAtributes(
  collectionName,
  collectionId,
  indexId,
  dataSourceId,
  {},
);

// const integ_case =
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
