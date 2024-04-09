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
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { AmazonAuroraDefaultVectorStore } from '../../../src/cdk-lib/amazonaurora';
import { BedrockFoundationModel } from '../../../src/cdk-lib/bedrock/models';

describe('Amazon Aurora Default Vector Store', () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  let template: Template;
  let model: BedrockFoundationModel;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
    model = BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3;
  });

  describe('Default Amazon Aurora Default Vector Store', () => {
    let auroraDefaultVectorStore: AmazonAuroraDefaultVectorStore;

    beforeAll(() => {
      auroraDefaultVectorStore = new AmazonAuroraDefaultVectorStore(stack, 'AuroraVectorStore', {
        embeddingsModelVectorDimension: model.vectorDimensions!,
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

    test('Should have correct properties', () => {
      expect(auroraDefaultVectorStore.databaseName).toEqual('bedrock_vector_db');
      expect(auroraDefaultVectorStore.tableName).toEqual('bedrock_integration.bedrock_kb');
      expect(auroraDefaultVectorStore.primaryKeyField).toEqual('id');
      expect(auroraDefaultVectorStore.clusterIdentifier).toEqual('aurora-serverless-vector-cluster');
      expect(auroraDefaultVectorStore.embeddingsModelVectorDimension).toEqual(model.vectorDimensions);
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });
});