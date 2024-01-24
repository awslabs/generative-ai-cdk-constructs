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
import * as iam from 'aws-cdk-lib/aws-iam';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { OpenSearchIndexCRProvider, VectorIndex } from '../../../src/cdk-lib/opensearch-vectorindex';
import { VectorCollection } from '../../../src/cdk-lib/opensearchserverless';

// mock lambda.Code.fromDockerBuild()
jest.mock('aws-cdk-lib/aws-lambda', () => {
  const actualLambda = jest.requireActual('aws-cdk-lib/aws-lambda');
  return {
    ...actualLambda,
    Code: {
      ...actualLambda.Code,
      fromDockerBuild: jest.fn(() => actualLambda.Code.fromInline('mockCode')),
      fromAsset: jest.fn(() => actualLambda.Code.fromInline('mockCode')),
    },
  };
});

describe('OpenSearch Serverless Vector Index', () => {
  let template: Template;
  let app: cdk.App;
  let stack: cdk.Stack;
  let aossVector: VectorCollection;
  let aossVectorIndex: VectorIndex;
  let testRole: iam.Role;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });

    aossVector = new VectorCollection(stack, 'test-aoss-vector');

    aossVectorIndex = new VectorIndex(stack, 'test-aoss-vector-index', {
      collection: aossVector,
      indexName: 'test-index',
      vectorField: 'vector',
      vectorDimensions: 1536,
      mappings: [
        {
          MappingField: 'AMAZON_BEDROCK_TEXT_CHUNK',
          DataType: 'text',
          Filterable: true,
        },
      ],
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


    aossVectorIndex.node.addDependency(aossVector.dataAccessPolicy);

    testRole = new iam.Role(stack, 'TestRole', {
      assumedBy: new iam.AccountRootPrincipal(),
    });

    aossVector.grantDataAccess(testRole);

    app.synth();
    template = Template.fromStack(stack);
  });


  test('Should have the correct resources', () => {
    template.resourceCountIs('AWS::OpenSearchServerless::Collection', 1);
    template.resourceCountIs('Custom::OpenSearchIndex', 1);
    template.resourceCountIs('AWS::OpenSearchServerless::AccessPolicy', 2);
    template.resourceCountIs('AWS::Lambda::Function', 3);
  });

  test('ManageIndexPolicy should allow CRProvider', () => {
    const crProvider = OpenSearchIndexCRProvider.getProvider(stack);
    const crRoleLogicalId = stack.getLogicalId(crProvider.role.node.defaultChild as iam.CfnRole);

    template.hasResource('AWS::OpenSearchServerless::AccessPolicy', {
      Properties: {
        Name: Match.stringLikeRegexp('^manageindexpolicy[a-z0-9]+'),
        Policy: {
          'Fn::Join': Match.arrayWith([
            Match.arrayWith([
              Match.objectEquals({
                'Fn::GetAtt': Match.arrayWith([
                  crRoleLogicalId,
                ]),
              }),
            ]),
          ]),
        },
        Type: 'data',
      },
    });
  });

  test('No unsuppressed Errors', () => {
    const errors = Annotations.fromStack(stack).findError(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    expect(errors).toHaveLength(0);
  });
});
