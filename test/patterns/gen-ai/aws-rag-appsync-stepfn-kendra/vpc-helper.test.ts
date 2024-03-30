import { App, Stack } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
// import { buildVpc, createDefaultIsolatedVpcProps, AddAwsServiceEndpoint } from './vpcUtils';
import {buildVpc} from "../../../../lib/common/helpers/vpc-helper";
import {AddAwsServiceEndpoint, createDefaultIsolatedVpcProps} from "../../../../lib/common/helpers/kendra-helper";
import {ServiceEndpointTypeEnum} from "../../../../lib/patterns/gen-ai/aws-rag-appsync-stepfn-kendra/types";
import {Match, Template} from "aws-cdk-lib/assertions";

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
        CidrBlock: '10.0.0.0/16'
      });

      // Assert subnets are created as expected
      template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: Match.stringLikeRegexp("^10\\.0\\.[0-9]+\\.0/24$"),
        MapPublicIpOnLaunch: false,
        VpcId: Match.anyValue(), // Use anyValue if you're not asserting the exact VPC ID
        // If you need to assert on Tags, ensure they match the expected structure
        Tags: Match.arrayWith([
          Match.objectLike({ Key: "aws-cdk:subnet-name", Value: "isolated" })
        ])
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
          'Fn::Join': ['', ['com.amazonaws.', { Ref: 'AWS::Region' }, '.dynamodb']]
        },
        VpcEndpointType: 'Gateway'
      });
    });
  });
});
