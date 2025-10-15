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
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks } from 'cdk-nag';
import {
  SageMakerInstanceType,
  DeepLearningContainerImage,
  CustomSageMakerEndpoint,
} from '../../../../src/patterns/gen-ai/aws-model-deployment-sagemaker';

describe('CustomSageMakerEndpoint construct no async', () => {
  let app: cdk.App;
  let CstTestTemplate: Template;
  let CstTestConstruct: CustomSageMakerEndpoint;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const CstTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: 'us-east-1' },
    });

    CstTestConstruct = new CustomSageMakerEndpoint(CstTestStack, 'test3', {
      modelId: 'bgeinf2',
      instanceType: SageMakerInstanceType.ML_INF2_XLARGE,
      container: DeepLearningContainerImage.fromDeepLearningContainerImage('huggingface-pytorch-inference-neuronx', '1.13.1-transformers4.34.1-neuronx-py310-sdk2.15.0-ubuntu20.04'),
      modelDataUrl: 's3://mybucket/mykey/model.tar.gz',
      environment: {
        SAGEMAKER_CONTAINER_LOG_LEVEL: '20',
        SAGEMAKER_MODEL_SERVER_WORKERS: '2',
        SAGEMAKER_REGION: 'us-east-2',
      },
      endpointName: 'testbgebase',
      instanceCount: 1,
      volumeSizeInGb: 100,
      minCapacity: 1,
      maxCapacity: 2,
    });
    CstTestTemplate = Template.fromStack(CstTestStack);
  });

  test('SageMaker endpoint count', () => {
    CstTestTemplate.resourceCountIs('AWS::SageMaker::Endpoint', 1);
    expect(CstTestConstruct.cfnEndpoint).not.toBeNull();
  });

  test('SageMaker endpoint config count', () => {
    CstTestTemplate.resourceCountIs('AWS::SageMaker::EndpointConfig', 1);
  });

  test('SageMaker endpoint config properties', () => {
    CstTestTemplate.hasResourceProperties('AWS::SageMaker::EndpointConfig', {
      ProductionVariants: [{
        ContainerStartupHealthCheckTimeoutInSeconds: 600,
        ModelDataDownloadTimeoutInSeconds: 600,
        InitialInstanceCount: 1,
        InitialVariantWeight: 1,
        InstanceType: 'ml.inf2.xlarge',
        VariantName: 'AllTraffic',
        VolumeSizeInGB: 100,
      }],
    });
    expect(CstTestConstruct.cfnEndpointConfig).not.toBeNull();
  });

  test('SageMaker model count', () => {
    CstTestTemplate.resourceCountIs('AWS::SageMaker::Model', 1);
  });

  test('SageMaker model no async config', () => {
    expect(CstTestConstruct.successTopic).toBeUndefined();
    expect(CstTestConstruct.errorTopic).toBeUndefined();
  });

  test('SageMaker model properties', () => {
    CstTestTemplate.hasResourceProperties('AWS::SageMaker::Model', {
      PrimaryContainer: {
        Environment: {
          SAGEMAKER_CONTAINER_LOG_LEVEL: '20',
          SAGEMAKER_MODEL_SERVER_WORKERS: '2',
          SAGEMAKER_REGION: 'us-east-2',
        },
        Mode: 'SingleModel',
        ModelDataUrl: 's3://mybucket/mykey/model.tar.gz',
      },
      Tags: [{
        Key: 'modelId',
        Value: 'bgeinf2',
      }],
    });
    expect(CstTestConstruct.cfnModel).not.toBeNull();
  });
});

describe('CustomSageMakerEndpoint construct async endpoint', () => {
  let app: cdk.App;
  let CstTestTemplate: Template;
  let CstTestConstruct: CustomSageMakerEndpoint;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const CstTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: 'us-east-1' },
    });

    CstTestConstruct = new CustomSageMakerEndpoint(CstTestStack, 'test3', {
      modelId: 'bgeinf2',
      instanceType: SageMakerInstanceType.ML_INF2_XLARGE,
      container: DeepLearningContainerImage.fromDeepLearningContainerImage('huggingface-pytorch-inference-neuronx', '1.13.1-transformers4.34.1-neuronx-py310-sdk2.15.0-ubuntu20.04'),
      modelDataUrl: 's3://mybucket/mykey/model.tar.gz',
      environment: {
        SAGEMAKER_CONTAINER_LOG_LEVEL: '20',
        SAGEMAKER_MODEL_SERVER_WORKERS: '2',
        SAGEMAKER_REGION: 'us-east-2',
      },
      endpointName: 'testbgebase',
      instanceCount: 1,
      volumeSizeInGb: 100,
      asyncInference: {
        maxConcurrentInvocationsPerInstance: 25,
        failurePath: 'failure',
        outputPath: 'success',
      },
    });
    CstTestTemplate = Template.fromStack(CstTestStack);
  });

  test('SageMaker endpoint count', () => {
    CstTestTemplate.resourceCountIs('AWS::SageMaker::Endpoint', 1);
    expect(CstTestConstruct.cfnEndpoint).not.toBeNull();
  });

  test('SageMaker endpoint config count', () => {
    CstTestTemplate.resourceCountIs('AWS::SageMaker::EndpointConfig', 1);
  });

  test('SageMaker endpoint config properties', () => {
    CstTestTemplate.hasResourceProperties('AWS::SageMaker::EndpointConfig', {
      ProductionVariants: [{
        ContainerStartupHealthCheckTimeoutInSeconds: 600,
        ModelDataDownloadTimeoutInSeconds: 600,
        InitialInstanceCount: 1,
        InitialVariantWeight: 1,
        InstanceType: 'ml.inf2.xlarge',
        VariantName: 'AllTraffic',
        VolumeSizeInGB: 100,
      }],
      AsyncInferenceConfig: {
        OutputConfig: {
          S3OutputPath: 'success',
          S3FailurePath: 'failure',
          NotificationConfig: {
            SuccessTopic: {
              Ref: Match.stringLikeRegexp('test3successtopictest'),
            },
            ErrorTopic: {
              Ref: Match.stringLikeRegexp('test3failuretopictest'),
            },
          },
        },
        ClientConfig: {
          MaxConcurrentInvocationsPerInstance: 25,
        },
      },
    });
    expect(CstTestConstruct.cfnEndpointConfig).not.toBeNull();
  });

  test('SageMaker model count', () => {
    CstTestTemplate.resourceCountIs('AWS::SageMaker::Model', 1);
  });

  test('SageMaker model async config', () => {
    expect(CstTestConstruct.successTopic).not.toBeNull();
    expect(CstTestConstruct.errorTopic).not.toBeNull();
  });

  test('SageMaker model properties', () => {
    CstTestTemplate.hasResourceProperties('AWS::SageMaker::Model', {
      PrimaryContainer: {
        Environment: {
          SAGEMAKER_CONTAINER_LOG_LEVEL: '20',
          SAGEMAKER_MODEL_SERVER_WORKERS: '2',
          SAGEMAKER_REGION: 'us-east-2',
        },
        Mode: 'SingleModel',
        ModelDataUrl: 's3://mybucket/mykey/model.tar.gz',
      },
      Tags: [{
        Key: 'modelId',
        Value: 'bgeinf2',
      }],
    });
    expect(CstTestConstruct.cfnModel).not.toBeNull();
  });
});
