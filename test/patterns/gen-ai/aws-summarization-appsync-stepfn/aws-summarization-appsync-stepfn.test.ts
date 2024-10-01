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
import { aws_appsync as appsync } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { AwsSolutionsChecks } from 'cdk-nag';
import {
  SummarizationAppsyncStepfn,
  SummarizationAppsyncStepfnProps,
} from '../../../../src/patterns/gen-ai/aws-summarization-appsync-stepfn';


describe('Summarization Appsync Stepfn construct', () => {

  let app: cdk.App;
  let summarizationTestTemplate: Template;
  let summarizationTestConstruct: SummarizationAppsyncStepfn;
  const cognitoPoolId = 'region_XXXXX';


  afterAll(() => {
    console.log('Test completed');
  });


  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const summarizationTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    const vpc = new ec2.Vpc(summarizationTestStack, 'test-vpc',
      {
        ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
        enableDnsHostnames: true,
        enableDnsSupport: true,
        subnetConfiguration: [
          {
            name: 'public',
            subnetType: ec2.SubnetType.PUBLIC,
            cidrMask: 24,
          },
          {
            name: 'private',
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            cidrMask: 24,
          },
        ],
      },
    );
    const mergedapiRole = new iam.Role(
      summarizationTestStack, 'summaryMergedapirole',
      {
        assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
      },
    );

    const mergedapi = new appsync.CfnGraphQLApi(
      summarizationTestStack, 'summaryMergedapi',
      {
        apiType: 'MERGED',
        name: 'summaryMergedapi',
        authenticationType: 'AMAZON_COGNITO_USER_POOLS',
        userPoolConfig: {
          awsRegion: cdk.Aws.REGION,
          userPoolId: cognitoPoolId,
          defaultAction: 'ALLOW',
        },
        additionalAuthenticationProviders: [{
          authenticationType: 'AWS_IAM',
        }],
        mergedApiExecutionRoleArn: mergedapiRole.roleArn,
      },
    );


    const userPoolLoaded = cognito.UserPool.fromUserPoolId(summarizationTestStack, 'testUserPool', cognitoPoolId);

    const props: SummarizationAppsyncStepfnProps = {
      cognitoUserPool: userPoolLoaded,
      existingMergedApi: mergedapi,
      existingVpc: vpc,
    };


    summarizationTestConstruct = new SummarizationAppsyncStepfn(summarizationTestStack, 'test', props);
    summarizationTestTemplate = Template.fromStack(summarizationTestStack);
  });

  test('Lambda properties', () => {
    summarizationTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('summary_input_validator'),
      Environment: {
        Variables: {
          GRAPHQL_URL: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('summaryMergedapi'),
              'GraphQLUrl',
            ],
          },
        },
      },

    });
    summarizationTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('summary_document_reader'),
      Environment: {
        Variables: {
          GRAPHQL_URL: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('summaryMergedapi'),
              'GraphQLUrl',
            ],
          },
          INPUT_ASSET_BUCKET: { Ref: Match.stringLikeRegexp('testinputassetsbucket') },
          IS_FILE_TRANSFORMED: 'false',
          TRANSFORMED_ASSET_BUCKET: { Ref: Match.stringLikeRegexp('testprocessedassetsbucket') },
        },
      },
    });
    summarizationTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('summary_generator-dev'),
      Environment: {
        Variables: {
          ASSET_BUCKET_NAME: {
            Ref: Match.stringLikeRegexp
            ('testprocessedassetsbucket'),
          },
          GRAPHQL_URL: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('summaryMergedapi'),
              'GraphQLUrl',
            ],
          },
          SUMMARY_LLM_CHAIN_TYPE: 'stuff',
        },
      },
    });

  });

  test('Lambda function count', () => {
    summarizationTestTemplate.resourceCountIs('AWS::Lambda::Function', 4);
  });

  test('Appsync Merge Graphql Properties', () => {
    summarizationTestTemplate.hasResourceProperties('AWS::AppSync::GraphQLApi', {
      ApiType: 'MERGED',
      AuthenticationType: 'AMAZON_COGNITO_USER_POOLS',
    });
  });

  test('Appsync Summary Graphql Properties', () => {
    summarizationTestTemplate.hasResourceProperties('AWS::AppSync::GraphQLApi', {
      AuthenticationType: 'AMAZON_COGNITO_USER_POOLS',

    });
  });

  test('Appsync resolver Properties', () => {
    summarizationTestTemplate.hasResourceProperties('AWS::AppSync::Resolver', {
      DataSourceName: Match.stringLikeRegexp('eventBridgeDataSource'),
      FieldName: 'generateSummary',
      TypeName: 'Mutation',
    });

    summarizationTestTemplate.hasResourceProperties('AWS::AppSync::Resolver', {
      DataSourceName: Match.stringLikeRegexp('SummaryStatusDataSource'),
      FieldName: 'updateSummaryJobStatus',
      TypeName: 'Mutation',
    });
  });

  test('Appsync Graphql Count', () => {
    summarizationTestTemplate.resourceCountIs('AWS::AppSync::GraphQLApi', 2);
  });


  test('Event Bus rule Target', () => {
    summarizationTestTemplate.hasResourceProperties('AWS::Events::Rule',
      Match.objectEquals
      ({
        Description: 'Summary Mutation Rule',
        EventBusName: { Ref: Match.stringLikeRegexp('testcustomEventBus') },
        EventPattern: { source: ['summary'] },
        State: 'ENABLED',
        Targets:
                        [{
                          Arn:
                                { Ref: Match.stringLikeRegexp('testsummarizationStepFunction') },
                          DeadLetterConfig: {
                            Arn: { 'Fn::GetAtt': [Match.stringLikeRegexp('testdlq'), 'Arn'] },
                          },
                          Id: 'Target0',
                          RetryPolicy: {
                            MaximumRetryAttempts: 1,
                          },
                          RoleArn: { 'Fn::GetAtt': [Match.stringLikeRegexp('testsummarizationStepFunctionEventsRole'), 'Arn'] },

                        }],
      },
      ));
  });


  test('Step function count', () => {
    summarizationTestTemplate.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  test('S3 Bucket Count', () => {
    summarizationTestTemplate.resourceCountIs('AWS::S3::Bucket', 3);
    expect(summarizationTestConstruct.inputAssetBucket).not.toBeNull;
  });

  test('Step function defined ', () => {
    expect(summarizationTestConstruct.stateMachine).toBeDefined;
    expect(summarizationTestConstruct.stateMachine).not.toBeNull;
  });


});