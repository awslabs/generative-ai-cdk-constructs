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
import { AwsSolutionsChecks } from 'cdk-nag';
import { Construct } from 'constructs';
import { BedrockFoundationModel } from '../../../src/cdk-lib/bedrock/models';

describe('BedrockFoundationModel', () => {
  test('returns string', () => {
    expect(String(BedrockFoundationModel.TITAN_EMBED_TEXT_V1))
      .toBe('amazon.titan-embed-text-v1');
  });

  test('returns ARN', () => {
    const app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
    const construct = new Construct(stack, 'test-construct');
    expect(BedrockFoundationModel.TITAN_EMBED_TEXT_V1.asArn(construct))
      .toBe('arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1');

  });


});