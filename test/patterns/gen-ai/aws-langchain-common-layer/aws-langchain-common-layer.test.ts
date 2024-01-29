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
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {
  LangchainCommonLayer,
  LangchainCommonDepsLayer,
} from '../../../../src/patterns/gen-ai/aws-langchain-common-layer';

describe('LangchainCommonLayer construct', () => {

  let LangchainCommonLayerTestTemplate: Template;
  let LangchainCommonLayerTestConstruct: LangchainCommonLayer;

  afterAll(() => {
    console.log('Test completed');
    console.log(LangchainCommonLayerTestTemplate.toJSON());
  });

  beforeAll(() => {

    const LangchainCommonLayerTestStack = new cdk.Stack(undefined, undefined, {
      env: { account: cdk.Aws.ACCOUNT_ID, region: 'us-east-1' },
    });

    // Lambda layer
    const lambdaArchitecture = lambda.Architecture.ARM_64;
    const lambdaRuntime = lambda.Runtime.PYTHON_3_10;

    LangchainCommonLayerTestConstruct = new LangchainCommonLayer(LangchainCommonLayerTestStack, 'lambdagenaicommonlayer', {
      compatibleRuntimes: [lambdaRuntime],
      compatibleArchitectures: [lambdaArchitecture],
    });
    LangchainCommonLayerTestTemplate = Template.fromStack(LangchainCommonLayerTestStack);

  });

  test('LayerVersion count', () => {
    LangchainCommonLayerTestTemplate.resourceCountIs('AWS::Lambda::LayerVersion', 1);
    expect(LangchainCommonLayerTestConstruct.layer).not.toBeNull;
  });
});

describe('LangchainCommonDepsLayer construct', () => {

  let LangchainCommonLayerDepsTestTemplate: Template;
  let LangchainCommonLayerDepsTestConstruct: LangchainCommonDepsLayer;

  afterAll(() => {
    console.log('Test completed');
    console.log(LangchainCommonLayerDepsTestTemplate.toJSON());
  });

  beforeAll(() => {

    const LangchainCommonLayerDepsTestStack = new cdk.Stack(undefined, undefined, {
      env: { account: cdk.Aws.ACCOUNT_ID, region: 'us-east-1' },
    });

    // Lambda layer
    const lambdaArchitecture = lambda.Architecture.ARM_64;
    const lambdaRuntime = lambda.Runtime.PYTHON_3_10;

    LangchainCommonLayerDepsTestConstruct = new LangchainCommonDepsLayer(LangchainCommonLayerDepsTestStack, 'lambdagenaidepslayer', {
      runtime: lambdaRuntime,
      architecture: lambdaArchitecture,
      autoUpgrade: true,
    });
    LangchainCommonLayerDepsTestTemplate = Template.fromStack(LangchainCommonLayerDepsTestStack);

  });

  test('LayerVersionDeps count', () => {
    LangchainCommonLayerDepsTestTemplate.resourceCountIs('AWS::Lambda::LayerVersion', 1);
    expect(LangchainCommonLayerDepsTestConstruct.layer).not.toBeNull;
  });
});

