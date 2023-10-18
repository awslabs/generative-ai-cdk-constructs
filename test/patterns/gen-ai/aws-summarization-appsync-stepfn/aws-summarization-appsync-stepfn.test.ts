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
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elasticache from 'aws-cdk-lib/aws-elasticache';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  SummarizationAppsyncStepfn,
  SummarizationAppsyncStepfnProps,
} from '../../../../src/patterns/gen-ai/aws-summarization-appsync-stepfn';


describe('Summarization Appsync Stepfn construct', () => {


  let summarizationTestTemplate: Template;
  let summarizationTestConstruct: SummarizationAppsyncStepfn;
  const cognitoPoolId = 'region_XXXXX';


  afterAll(() => {
    console.log('Test completed');
  });


  beforeAll(() => {
    const summarizationTestStack = new cdk.Stack(undefined, undefined, {
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
            subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
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

    const cfnCacheClusterProps: elasticache.CfnCacheClusterProps = {
      cacheNodeType: 'cache.r6g.xlarge',
      engine: 'redis',
      numCacheNodes: 1,
    };

    const props: SummarizationAppsyncStepfnProps = {
      userPoolId: cognitoPoolId,
      existingMergeApi: mergedapi,
      existingVpc: vpc,
      cfnCacheClusterProps: cfnCacheClusterProps,
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
          INPUT_ASSET_BUCKET: { Ref: Match.stringLikeRegexp('testinputAssetsBucketdev') },
          IS_FILE_TRANSFORMED: 'false',
          REDIS_HOST: { 'Fn::GetAtt': [Match.stringLikeRegexp('testredisCluster'), 'RedisEndpoint.Address'] },
          REDIS_PORT: { 'Fn::GetAtt': [Match.stringLikeRegexp('testredisCluster'), 'RedisEndpoint.Port'] },
          TRANSFORMED_ASSET_BUCKET: { Ref: Match.stringLikeRegexp('testprocessedAssetsBucket') },
        },
      },
    });
    summarizationTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('summary_generator-dev'),
      Environment: {
        Variables: {
          ASSET_BUCKET_NAME: { Ref: 'testprocessedAssetsBucketdevF293824A' },
          GRAPHQL_URL: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('summaryMergedapi'),
              'GraphQLUrl',
            ],
          },
          REDIS_HOST: { 'Fn::GetAtt': [Match.stringLikeRegexp('testredisCluster'), 'RedisEndpoint.Address'] },
          REDIS_PORT: { 'Fn::GetAtt': [Match.stringLikeRegexp('testredisCluster'), 'RedisEndpoint.Port'] },
          SUMMARY_LLM_CHAIN_TYPE: 'stuff',
        },
      },
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

  test('AWS elastic cache properties', () => {
    summarizationTestTemplate.resourceCountIs('AWS::ElastiCache::CacheCluster', 1);
    expect(summarizationTestConstruct.redisCluster.attrRedisEndpointPort).not.toBeNull;
    expect(summarizationTestConstruct.redisCluster.attrRedisEndpointAddress).not.toBeNull;
  });

  test('Step function count', () => {
    summarizationTestTemplate.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  test('S3 Bucket Count', () => {
    summarizationTestTemplate.resourceCountIs('AWS::S3::Bucket', 2);
    expect(summarizationTestConstruct.inputAssetBucket).not.toBeNull;
  });

  test('Step function defined ', () => {
    expect(summarizationTestConstruct.stateMachine).toBeDefined;
    expect(summarizationTestConstruct.stateMachine).not.toBeNull;
  });


});