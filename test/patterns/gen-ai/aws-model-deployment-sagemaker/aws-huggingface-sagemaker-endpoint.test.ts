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
import { AwsSolutionsChecks } from 'cdk-nag';
import {
  SageMakerInstanceType,
  HuggingFaceSageMakerEndpoint,
  DeepLearningContainerImage,
} from '../../../../src/patterns/gen-ai/aws-model-deployment-sagemaker';

describe('HuggingFaceSageMakerEndpoint construct', () => {
  let app: cdk.App;
  let HgngfcTestTemplate: Template;
  let HgngfcTestConstruct: HuggingFaceSageMakerEndpoint;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const HgngfcTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: 'us-east-1' },
    });

    HgngfcTestConstruct = new HuggingFaceSageMakerEndpoint(HgngfcTestStack, 'test2', {
      modelId: 'mistralai/Mistral-7B-Instruct-v0.1',
      instanceType: SageMakerInstanceType.ML_G5_2XLARGE,
      container:
            DeepLearningContainerImage.HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_0_1_TGI1_1_0_GPU_PY39_CU118_UBUNTU20_04,
      environment: {
        SM_NUM_GPUS: '1',
        MAX_INPUT_LENGTH: '2048',
        MAX_TOTAL_TOKENS: '4096',
      },
    });
    HgngfcTestTemplate = Template.fromStack(HgngfcTestStack);
  });

  test('SageMaker endpoint count', () => {
    HgngfcTestTemplate.resourceCountIs('AWS::SageMaker::Endpoint', 1);
    expect(HgngfcTestConstruct.cfnEndpoint).not.toBeNull();
  });

  test('SageMaker endpoint config count', () => {
    HgngfcTestTemplate.resourceCountIs('AWS::SageMaker::EndpointConfig', 1);
  });

  test('SageMaker endpoint config properties', () => {
    HgngfcTestTemplate.hasResourceProperties('AWS::SageMaker::EndpointConfig', {
      ProductionVariants: [{
        ContainerStartupHealthCheckTimeoutInSeconds: 600,
        InitialInstanceCount: 1,
        InitialVariantWeight: 1,
        InstanceType: 'ml.g5.2xlarge',
      }],
    });
    expect(HgngfcTestConstruct.cfnEndpointConfig).not.toBeNull();
  });

  test('SageMaker model count', () => {
    HgngfcTestTemplate.resourceCountIs('AWS::SageMaker::Model', 1);
  });

  test('SageMaker model properties', () => {
    HgngfcTestTemplate.hasResourceProperties('AWS::SageMaker::Model', {
      PrimaryContainer: {
        Environment: {
          SAGEMAKER_CONTAINER_LOG_LEVEL: '20',
          HF_MODEL_ID: 'mistralai/Mistral-7B-Instruct-v0.1',
          SM_NUM_GPUS: '1',
          MAX_INPUT_LENGTH: '2048',
          MAX_TOTAL_TOKENS: '4096',
        },
        Mode: 'SingleModel',
      },
      Tags: [{
        Key: 'modelId',
        Value: 'mistralai/Mistral-7B-Instruct-v0.1',
      }],
    });
    expect(HgngfcTestConstruct.cfnModel).not.toBeNull();
  });
});

