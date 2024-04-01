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
import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { buildVpc, AddAwsServiceEndpoint, createDefaultIsolatedVpcProps } from '../../../../src/common/helpers/vpc-helper';
import { ServiceEndpointTypeEnum } from '../../../../src/patterns/gen-ai/aws-rag-appsync-stepfn-kendra/types';

describe('VPC Utilities', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });

  describe('buildVpc', () => {
    it('creates a VPC with default isolated configuration', () => {
      buildVpc(stack, { defaultVpcProps: createDefaultIsolatedVpcProps() });

      // Assert VPC is created with expected properties
      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::EC2::VPC', 1);
      template.hasResourceProperties('AWS::EC2::VPC', {
        CidrBlock: '10.0.0.0/16',
      });

      // Assert subnets are created as expected
      template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: Match.stringLikeRegexp('^10\\.0\\.[0-9]+\\.0/24$'),
        MapPublicIpOnLaunch: false,
        VpcId: Match.anyValue(), // Use anyValue if you're not asserting the exact VPC ID
        // If you need to assert on Tags, ensure they match the expected structure
        Tags: Match.arrayWith([
          Match.objectLike({ Key: 'aws-cdk:subnet-name', Value: 'isolated' }),
        ]),
      });
    });

  });

  describe('AddAwsServiceEndpoint', () => {
    it('adds a DynamoDB gateway endpoint to the VPC', () => {
      const vpc = new Vpc(stack, 'TestVpc');
      AddAwsServiceEndpoint(stack, vpc, ServiceEndpointTypeEnum.DYNAMODB);

      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::EC2::VPCEndpoint', {
        VpcId: {},
        ServiceName: {
          'Fn::Join': ['', ['com.amazonaws.', { Ref: 'AWS::Region' }, '.dynamodb']],
        },
        VpcEndpointType: 'Gateway',
      });
    });
  });
});
