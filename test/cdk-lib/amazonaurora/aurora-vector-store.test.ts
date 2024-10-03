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
import { Annotations, Match, Template } from 'aws-cdk-lib/assertions';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { AmazonAuroraVectorStore, ExistingAmazonAuroraVectorStore } from '../../../src/cdk-lib/amazonaurora';

describe('Amazon Aurora Vector Store', () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  let template: Template;
  let modelVectorDimension: number;
  let existingVpc: Vpc;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
    modelVectorDimension = 1024;
    existingVpc = new Vpc(stack, 'Vpc', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 18,
          name: 'isolated',
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });
  });

  describe('Amazon Aurora Default Vector Store', () => {
    let auroraVectorStore: AmazonAuroraVectorStore;

    beforeAll(() => {
      auroraVectorStore = new AmazonAuroraVectorStore(stack, 'AuroraVectorStore', {
        embeddingsModelVectorDimension: modelVectorDimension,
        vpc: existingVpc,
      });

      NagSuppressions.addResourceSuppressionsByPath(
        stack,
        '/test-stack/LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8a/ServiceRole',
        [
          {
            id: 'AwsSolutions-IAM4',
            reason: 'CDK CustomResource LogRetention Lambda uses the AWSLambdaBasicExecutionRole AWS Managed Policy. Managed by CDK.',
          },
          {
            id: 'AwsSolutions-IAM5',
            reason: 'CDK CustomResource LogRetention Lambda uses a wildcard to manage log streams created at runtime. Managed by CDK.',
          },
        ],
        true,
      );

      app.synth();
      template = Template.fromStack(stack);
    });

    test('Should create AmazonAuroraDefaultVectorStore resources', () => {
      template.resourceCountIs('AWS::RDS::DBCluster', 1);
      template.resourceCountIs('Custom::AmazonAuroraPgVector', 1);
    });

    test('Should use existing VPC', () => {
      expect(auroraVectorStore.vpc).toEqual(existingVpc);
    });

    test('Should have correct properties', () => {
      expect(auroraVectorStore.databaseName).toEqual('bedrock_vector_db');
      expect(auroraVectorStore.tableName).toEqual('bedrock_kb');
      expect(auroraVectorStore.primaryKeyField).toEqual('id');
      expect(auroraVectorStore.embeddingsModelVectorDimension).toEqual(modelVectorDimension);
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });

  describe('fromExistingAuroraVectorStore', () => {
    let existingAuroraVectorStore: ExistingAmazonAuroraVectorStore;
    let vpc: cdk.aws_ec2.Vpc;
    let secret: cdk.aws_secretsmanager.Secret;

    beforeAll(() => {

      vpc = new cdk.aws_ec2.Vpc(stack, 'TestVpc', {
        maxAzs: 2,
        subnetConfiguration: [
          {
            cidrMask: 24,
            name: 'Public',
            subnetType: cdk.aws_ec2.SubnetType.PUBLIC,
          },
          {
            cidrMask: 24,
            name: 'Private with Egress',
            subnetType: cdk.aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
          },
          {
            cidrMask: 24,
            name: 'Isolated',
            subnetType: cdk.aws_ec2.SubnetType.PRIVATE_ISOLATED,
          },
        ],
      });

      secret = new cdk.aws_secretsmanager.Secret(stack, 'TestSecret', {
        secretObjectValue: {
          username: cdk.SecretValue.unsafePlainText('foo'),
          password: cdk.SecretValue.unsafePlainText('bar'),
        },
      });

      existingAuroraVectorStore = AmazonAuroraVectorStore.fromExistingAuroraVectorStore(stack, 'ExistingAuroraVectorStore',
        {
          clusterIdentifier: 'test-cluster-identifier',
          databaseName: 'test-database-name',
          tableName: 'test-table-name',
          primaryKeyField: 'test-primary-key-id',
          embeddingsModelVectorDimension: modelVectorDimension,
          vpc: vpc,
          secret: secret,
          auroraSecurityGroupId: 'sg-12345678',
        });
    });

    test('Should create an instance of AmazonAuroraVectorStore', () => {
      expect(existingAuroraVectorStore).toBeInstanceOf(ExistingAmazonAuroraVectorStore);
    });

    test('Should have the correct databaseName', () => {
      expect(existingAuroraVectorStore.databaseName).toEqual('test-database-name');
    });

    test('Should have the correct tableName', () => {
      expect(existingAuroraVectorStore.tableName).toEqual('test-table-name');
    });

    test('Should have the correct primaryKeyField', () => {
      expect(existingAuroraVectorStore.primaryKeyField).toEqual('test-primary-key-id');
    });

    test('Should have the correct embeddingsModel', () => {
      expect(existingAuroraVectorStore.embeddingsModelVectorDimension).toEqual(modelVectorDimension);
    });
  });
});