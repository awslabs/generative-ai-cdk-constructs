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

import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { buildCustomResourceProvider } from '../../../src/common/helpers/custom-resource-provider-helper';

const AOSSCRProvider = buildCustomResourceProvider({
  providerName: 'OpenSearchIndexCRProvider',
  codePath: path.join(
    __dirname, '../../../lambda/opensearch-serverless-custom-resources'),
  handler: 'custom_resources.on_event',
  runtime: lambda.Runtime.PYTHON_3_12,
});

describe('Custom Resource Provider', () => {
  test('Custom Resource Provider is created', () => {
    const stack = new cdk.Stack();
    AOSSCRProvider.getProvider(stack);
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'custom_resources.on_event',
      Runtime: 'python3.12',
    });
  });
});
