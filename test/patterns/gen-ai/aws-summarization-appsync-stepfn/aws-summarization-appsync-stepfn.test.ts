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
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  SummarizationAppsyncStepfn,
  SummarizationAppsyncStepfnProps,
} from '../../../../src/patterns/gen-ai/aws-summarization-appsync-stepfn';


describe('Summarization Appsync Stepfn construct', () => {


  let summarizationTestTemplate: Template;
  let summarizationTestConstruct: SummarizationAppsyncStepfn;
  const cognitoPoolId = 'us-east-1_1RVagE46n';


  afterAll(() => {
    console.log('Test completed');
  });


  beforeAll(() => {
    const summarizationTestStack = new cdk.Stack(undefined, undefined, {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });
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

    const props: SummarizationAppsyncStepfnProps = {
      userPoolId: cognitoPoolId,
      existingMergeApi: mergedapi,
    };

    summarizationTestConstruct = new SummarizationAppsyncStepfn(summarizationTestStack, 'test', props);
    summarizationTestTemplate = Template.fromStack(summarizationTestStack);
  });

  test('Lambda properties', () => {
    summarizationTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: 'summary_input_validator-dev',
    });
    summarizationTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: 'summary_document_reader-dev',
    });
    summarizationTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: 'summary_generator-dev',
    });

  });

  test('Lambda function count', () => {
    summarizationTestTemplate.resourceCountIs('AWS::Lambda::Function', 3);
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

  test('Step function defined ', () => {
    expect(summarizationTestConstruct.stateMachine).toBeDefined;
    expect(summarizationTestConstruct.stateMachine).not.toBeNull;
  });


});