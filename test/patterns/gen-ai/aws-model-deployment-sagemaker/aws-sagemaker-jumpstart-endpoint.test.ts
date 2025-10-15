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
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { AwsSolutionsChecks } from 'cdk-nag';
import {
  JumpStartSageMakerEndpoint,
  JumpStartModel,
  SageMakerInstanceType,
} from '../../../../src/patterns/gen-ai/aws-model-deployment-sagemaker';

describe('JumpStartSageMakerEndpoint construct', () => {
  let app: cdk.App;
  let JmpStrtTestTemplate: Template;
  let JmpStrtTestConstruct: JumpStartSageMakerEndpoint;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const JmpStrtTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: 'us-east-1' },
    });

    JmpStrtTestConstruct = new JumpStartSageMakerEndpoint(JmpStrtTestStack, 'test', {
      model: JumpStartModel.META_TEXTGENERATION_LLAMA_2_7B_F_2_0_2,
      acceptEula: true,
      instanceType: SageMakerInstanceType.ML_G5_2XLARGE,
      endpointName: 'testendpoint',
    });
    JmpStrtTestTemplate = Template.fromStack(JmpStrtTestStack);
  });

  test('SageMaker endpoint count', () => {
    JmpStrtTestTemplate.resourceCountIs('AWS::SageMaker::Endpoint', 1);
    expect(JmpStrtTestConstruct.cfnEndpoint).not.toBeNull();
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
    expect(JmpStrtTestConstruct.cfnEndpointConfig).not.toBeNull();
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
    expect(JmpStrtTestConstruct.cfnModel).not.toBeNull();
  });

  test('SageMaker network properties', () => {
    JmpStrtTestTemplate.resourceCountIs('AWS::EC2::VPC', 0);
    JmpStrtTestTemplate.resourceCountIs('AWS::EC2::SecurityGroup', 0);
  });
});

describe('JumpStartSageMakerEndpoint eula validation', () => {
  let app: cdk.App;
  let JmpStrtTestStack: cdk.Stack;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    JmpStrtTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: 'us-east-1' },
    });
  });

  test('SageMaker endpoint fails to synth', () => {
    // wrapping code in a function, otherwise the error will not be caught and the assertion will fail.
    const t = () => {
      new JumpStartSageMakerEndpoint(JmpStrtTestStack, 'test', {
        model: JumpStartModel.META_TEXTGENERATION_LLAMA_2_7B_F_2_0_2,
        acceptEula: false, // should fail synth
        instanceType: SageMakerInstanceType.ML_G5_2XLARGE,
        endpointName: 'testendpoint',
      });
    };

    expect(t).toThrow('The AcceptEula value must be explicitly defined as True in order to accept the EULA for the model meta-textgeneration-llama-2-7b-f. You are responsible for reviewing and complying with any applicable license terms and making sure they are acceptable for your use case before downloading or using a model.');
  });

  test('SageMaker endpoint succeeds to synth', () => {
    // wrapping code in a function, otherwise the error will not be caught and the assertion will fail.
    const t = () => {
      new JumpStartSageMakerEndpoint(JmpStrtTestStack, 'test2', {
        model: JumpStartModel.META_TEXTGENERATION_LLAMA_2_7B_F_2_0_2,
        acceptEula: true, // should succeed synth
        instanceType: SageMakerInstanceType.ML_G5_2XLARGE,
        endpointName: 'testendpoint',
      });
    };

    expect(t).not.toThrow();
  });

  test('SageMaker endpoint doesnt require eula succeeds to synth', () => {
    // wrapping code in a function, otherwise the error will not be caught and the assertion will fail.
    const t = () => {
      new JumpStartSageMakerEndpoint(JmpStrtTestStack, 'test3', {
        model: JumpStartModel.MODEL_DEPTH2IMG_STABLE_DIFFUSION_V1_5_CONTROLNET_1_0_0, // eula not defined
        instanceType: SageMakerInstanceType.ML_G5_2XLARGE,
        endpointName: 'testendpoint',
      });
    };

    expect(t).not.toThrow();
  });
});

describe('JumpStartSageMakerEndpoint VPC construct', () => {
  let app: cdk.App;
  let JmpStrtTestTemplate: Template;
  let JmpStrtTestConstruct: JumpStartSageMakerEndpoint;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const JmpStrtTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: 'us-east-1' },
    });

    const vpc = new ec2.Vpc(JmpStrtTestStack, 'VPC', {
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
          mapPublicIpOnLaunch: false,
        },
        {
          name: 'private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24,
        },
        {
          name: 'isolated',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
    });

    const securityGroups = [
      new ec2.SecurityGroup(JmpStrtTestStack, 'LambdaSecurityGroup', {
        vpc: vpc,
        allowAllOutbound: true,
        description: 'security group for lambda',
        securityGroupName: 'lambdaSecurityGroup',
      }),
    ];
    securityGroups[0].addIngressRule(securityGroups[0], ec2.Port.tcp(443), 'allow https within sg');

    JmpStrtTestConstruct = new JumpStartSageMakerEndpoint(JmpStrtTestStack, 'test', {
      model: JumpStartModel.META_TEXTGENERATION_LLAMA_2_7B_F_2_0_2,
      instanceType: SageMakerInstanceType.ML_G5_2XLARGE,
      acceptEula: true,
      endpointName: 'testendpoint',
      vpcConfig: {
        securityGroupIds: securityGroups.map(s => s.securityGroupId),
        subnets: vpc.privateSubnets.map((subnet) => subnet.subnetId),
      },
    });
    JmpStrtTestTemplate = Template.fromStack(JmpStrtTestStack);
  });

  test('SageMaker endpoint count', () => {
    JmpStrtTestTemplate.resourceCountIs('AWS::SageMaker::Endpoint', 1);
    expect(JmpStrtTestConstruct.cfnEndpoint).not.toBeNull();
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
    expect(JmpStrtTestConstruct.cfnEndpointConfig).not.toBeNull();
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
    expect(JmpStrtTestConstruct.cfnModel).not.toBeNull();
  });

  test('SageMaker network properties', () => {
    JmpStrtTestTemplate.hasResourceProperties('AWS::EC2::SecurityGroup', Match.not({
      GroupDescription: 'Default/Model/SecurityGroup',
    }));

    JmpStrtTestTemplate.hasResourceProperties('AWS::EC2::VPC', Match.not({
      GroupDescription: 'Default/Model/Vpc',
    }));
  });
});
