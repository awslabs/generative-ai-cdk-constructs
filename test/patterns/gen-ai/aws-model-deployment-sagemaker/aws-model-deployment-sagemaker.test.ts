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
import {
  JumpStartSageMakerEndpoint,
  JumpStartModel,
  SageMakerInstanceType,
  HuggingFaceSageMakerEndpoint,
  DeepLearningContainerImage,
  CustomSageMakerEndpoint,
} from '../../../../src/patterns/gen-ai/aws-model-deployment-sagemaker';

describe('JumpStartSageMakerEndpoint construct', () => {

  let JmpStrtTestTemplate: Template;
  let JmpStrtTestConstruct: JumpStartSageMakerEndpoint;

  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {

    const JmpStrtTestStack = new cdk.Stack(undefined, undefined, {
      env: { account: cdk.Aws.ACCOUNT_ID, region: 'us-east-1' },
    });

    JmpStrtTestConstruct = new JumpStartSageMakerEndpoint(JmpStrtTestStack, 'test', {
      model: JumpStartModel.META_TEXTGENERATION_LLAMA_2_7B_F_2_0_2,
      instanceType: SageMakerInstanceType.ML_G5_2XLARGE,
    });
    JmpStrtTestTemplate = Template.fromStack(JmpStrtTestStack);

  });

  test('SageMaker endpoint count', () => {
    JmpStrtTestTemplate.resourceCountIs('AWS::SageMaker::Endpoint', 1);
    expect(JmpStrtTestConstruct.cfnEndpoint).not.toBeNull;
  });

  test('SageMaker endpoint config count', () => {
    JmpStrtTestTemplate.resourceCountIs('AWS::SageMaker::EndpointConfig', 1);
  });

  test('SageMaker endpoint config properties', () => {
    JmpStrtTestTemplate.hasResourceProperties('AWS::SageMaker::EndpointConfig', {
      ProductionVariants: [{
        ContainerStartupHealthCheckTimeoutInSeconds: 600,
        InitialInstanceCount: 1,
        InitialVariantWeight: 1,
        InstanceType: 'ml.g5.2xlarge',
      }],
    });
    expect(JmpStrtTestConstruct.cfnEndpointConfig).not.toBeNull;
  });

  test('SageMaker model count', () => {
    JmpStrtTestTemplate.resourceCountIs('AWS::SageMaker::Model', 1);
  });

  test('SageMaker model properties', () => {
    JmpStrtTestTemplate.hasResourceProperties('AWS::SageMaker::Model', {
      EnableNetworkIsolation: true,
      Tags: [{
        Key: 'modelId',
        Value: 'meta-textgeneration-llama-2-7b-f',
      }, {
        Key: 'modelVersion',
        Value: '2.0.2',
      }],
    });
    expect(JmpStrtTestConstruct.cfnModel).not.toBeNull;
  });
});

describe('HuggingFaceSageMakerEndpoint construct', () => {

  let HgngfcTestTemplate: Template;
  let HgngfcTestConstruct: HuggingFaceSageMakerEndpoint;

  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {

    const HgngfcTestStack = new cdk.Stack(undefined, undefined, {
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
    expect(HgngfcTestConstruct.cfnEndpoint).not.toBeNull;
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
    expect(HgngfcTestConstruct.cfnEndpointConfig).not.toBeNull;
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
    expect(HgngfcTestConstruct.cfnModel).not.toBeNull;
  });
});

describe('CustomSageMakerEndpoint construct', () => {

  let CstTestTemplate: Template;
  let CstTestConstruct: CustomSageMakerEndpoint;

  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {

    const CstTestStack = new cdk.Stack(undefined, undefined, {
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
    });
    CstTestTemplate = Template.fromStack(CstTestStack);

  });

  test('SageMaker endpoint count', () => {
    CstTestTemplate.resourceCountIs('AWS::SageMaker::Endpoint', 1);
    expect(CstTestConstruct.cfnEndpoint).not.toBeNull;
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
    expect(CstTestConstruct.cfnEndpointConfig).not.toBeNull;
  });

  test('SageMaker model count', () => {
    CstTestTemplate.resourceCountIs('AWS::SageMaker::Model', 1);
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
    expect(CstTestConstruct.cfnModel).not.toBeNull;
  });
});