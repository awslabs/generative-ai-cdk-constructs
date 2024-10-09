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
import {
  join,
//  resolve,
} from 'node:path';
import * as cdk from 'aws-cdk-lib';
import {
  Template,
//  Match,
} from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks } from 'cdk-nag';
import {
  LlamaIndexDataLoader,
  LlamaIndexDataLoaderProps,
} from '../../../../src/patterns/gen-ai/aws-llama-index-data-loader';

describe('LlamaIndex Data Loader Construct Default', () => {
  let app: cdk.App;
  let llamaIndexDataLoaderTemplate: Template;
  let llamaIndexDataLoaderTestConstruct: LlamaIndexDataLoader;

  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const llamaIndexDataLoaderTestStack = new cdk.Stack(app, 'llamaIndexDataLoaderTestStack', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });
    const props: LlamaIndexDataLoaderProps = {
    };

    llamaIndexDataLoaderTestConstruct = new LlamaIndexDataLoader(
      llamaIndexDataLoaderTestStack,
      'LlamaIndexDataLoader',
      props,
    );
    llamaIndexDataLoaderTemplate = Template.fromStack(llamaIndexDataLoaderTestStack);
  });

  test('S3 bucket count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::S3::Bucket', 3);
    expect(llamaIndexDataLoaderTestConstruct.outputBucket).not.toBeNull;
  });

  test('SNS count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::SNS::Topic', 1);
    expect(llamaIndexDataLoaderTestConstruct.snsTopic).not.toBeNull;
  });

  test('Subscription count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::SNS::Subscription', 1);
  });
  test('Parameter count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::SSM::Parameter', 1);
  });
  test('Cluster count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::ECS::Cluster', 1);
  });
  test('Service count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::ECS::Service', 1);
  });
  test('Task count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::ECS::TaskDefinition', 1);
  });
  test('AutoScaling target count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::ApplicationAutoScaling::ScalableTarget', 1);
  });
  test('AutoScaling policy count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::ApplicationAutoScaling::ScalingPolicy', 3);
  });
  test('Alarm count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::CloudWatch::Alarm', 2);
  });

  test('SQS count', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::SQS::Queue', 2);
    expect(llamaIndexDataLoaderTestConstruct.sqsQueue).not.toBeNull;
  });

});

describe('LlamaIndex Data Loader Construct Properties', () => {
  let app: cdk.App;
  let llamaIndexDataLoaderTemplate: Template;
  let llamaIndexDataLoaderTestConstruct: LlamaIndexDataLoader;

  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const llamaIndexDataLoaderTestStack = new cdk.Stack(app, 'llamaIndexDataLoaderTestStack', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });
    const props: LlamaIndexDataLoaderProps = {
      dockerImageAssetDirectory: join(
        //resolve(), '..', '..', '..', '..', 'resources', 'gen-ai', 'aws-llama-index-data-loader', 'docker',
        'resources', 'gen-ai', 'aws-llama-index-data-loader', 'docker',
      ),
      containerLoggingLevel: 'INFO',
      memoryLimitMiB: 1024,
      observability: false,
      stage: 'test',
    };

    llamaIndexDataLoaderTestConstruct = new LlamaIndexDataLoader(
      llamaIndexDataLoaderTestStack,
      'LlamaIndexDataLoader',
      props,
    );
    llamaIndexDataLoaderTemplate = Template.fromStack(llamaIndexDataLoaderTestStack);
  });

  test('Memory', () => {
    llamaIndexDataLoaderTemplate.resourceCountIs('AWS::SQS::Queue', 2);
    expect(llamaIndexDataLoaderTestConstruct.sqsQueue).not.toBeNull;
  });
});