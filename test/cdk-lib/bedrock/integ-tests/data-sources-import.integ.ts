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
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { KnowledgeBase } from '../../../../src/cdk-lib/bedrock';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-data-sources-integ-test');

const kb2 = KnowledgeBase.fromKnowledgeBaseAttributes(stack, 'ImportedKnowledgeBase2', {
  knowledgeBaseId: 'J9DVDSYY5Y',
  executionRoleArn: 'arn:aws:iam::249522321342:role/service-role/AmazonBedrockExecutionRoleForKnowledgeBase_9ivh2',
});

const bucket2 = Bucket.fromBucketArn(stack, 's3-imported',
  'arn:aws:s3:::rafams-frankfurt-bucket',
);

kb2.addS3DataSource({
  bucket: bucket2,
  dataSourceName: 'TestDataSourceS3',
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