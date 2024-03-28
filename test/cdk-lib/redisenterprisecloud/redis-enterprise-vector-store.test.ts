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
import { Annotations, Match, Template } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks } from 'cdk-nag';
import { RedisEnterpriseVectorStore } from '../../../src/cdk-lib/redisenterprisecloud';

describe('Redis Enterprise Vector Store', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'TestStack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
  });

  describe('Default Redis Enterprise Vector Store', () => {
    let redisVectorStore: RedisEnterpriseVectorStore;

    beforeAll(() => {
      redisVectorStore = new RedisEnterpriseVectorStore({
        endpoint: 'test-endpoint',
        credentialsSecretArn: 'test-secret-arn',
        vectorIndexName: 'test-index-name',
      });

      app.synth();
      Template.fromStack(stack);
    });

    test('Should have correct properties', () => {
      expect(redisVectorStore.endpoint).toEqual('test-endpoint');
      expect(redisVectorStore.credentialsSecretArn).toEqual('test-secret-arn');
      expect(redisVectorStore.vectorIndexName).toEqual('test-index-name');
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });
});