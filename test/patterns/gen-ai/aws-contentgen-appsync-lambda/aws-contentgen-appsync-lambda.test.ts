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
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import {
  ContentGenerationAppsyncLambda,
  ContentGenerationAppsyncLambdaProps,
} from '../../../../src/patterns/gen-ai/aws-contentgen-appsync-lambda';

describe('Image generation appsync lambda construct', () => {
  let imageTestTemplate: Template;
  let imageTestConstruct: ContentGenerationAppsyncLambda;
  const cognitoPoolId = 'region_XXXXX';

  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {
    const imageTestStack = new cdk.Stack(undefined, undefined, {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });


    const userPoolLoaded = cognito.UserPool.fromUserPoolId(
      imageTestStack,
      'testUserPool',
      cognitoPoolId,
    );

    const imageTestProps: ContentGenerationAppsyncLambdaProps = {
      cognitoUserPool: userPoolLoaded,
    };

    imageTestConstruct = new ContentGenerationAppsyncLambda(imageTestStack, 'test', imageTestProps);
    imageTestTemplate = Template.fromStack(imageTestStack);
  });

  test('Lambda properties', () => {
    imageTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler',
    });

    imageTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('lambda_generate_image'),
      Environment: {
        Variables: {
          GRAPHQL_URL: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('generateImageGraphqlApi'),
              'GraphQLUrl',
            ],
          },
          OUTPUT_BUCKET: {
            Ref: Match.stringLikeRegexp('generatedAssetsBucket'),
          },
        },
      },
    });
  });

  test('Lambda function count', () => {
    imageTestTemplate.resourceCountIs('AWS::Lambda::Function', 2);
  });

  test('Lambda Provisioned Concurrency count', () => {
    imageTestTemplate.resourceCountIs('AWS::Lambda::Version', 1);
  });

  test('Appsync Graphql Properties', () => {
    imageTestTemplate.hasResourceProperties('AWS::AppSync::GraphQLApi', {
      UserPoolConfig: {},
      AuthenticationType: 'AMAZON_COGNITO_USER_POOLS',
    });
  });

  test('Appsync resolver Properties', () => {
    imageTestTemplate.hasResourceProperties('AWS::AppSync::Resolver', {
      DataSourceName: Match.stringLikeRegexp(
        'generateImageEventBridgeDataSource',
      ),
      FieldName: 'generateImage',
      TypeName: 'Mutation',
    });

    imageTestTemplate.hasResourceProperties('AWS::AppSync::Resolver', {
      DataSourceName: Match.stringLikeRegexp('JobStatusDataSource'),
      FieldName: 'updateGenerateImageStatus',
      TypeName: 'Mutation',
    });
  });

  test('Appsync resolver Count', () => {
    imageTestTemplate.resourceCountIs('AWS::AppSync::Resolver', 2);
  });

  test('Appsync Graphql Count', () => {
    imageTestTemplate.resourceCountIs('AWS::AppSync::GraphQLApi', 1);
    expect(imageTestConstruct.graphqlApi.apiId).not.toBeNull;
  });

  test('Event Bus rule Target', () => {
    imageTestTemplate.hasResourceProperties(
      'AWS::Events::Rule',
      Match.objectEquals({
        Description: 'Rule to trigger textToImage function',
        EventBusName: {
          Ref: Match.stringLikeRegexp('testgenerateImageEventBusdev14B6940A'),
        },
        EventPattern: { source: ['textToImage'] },
        State: 'ENABLED',
        Targets: [
          {
            Arn: {
              'Fn::GetAtt': [
                Match.stringLikeRegexp('testlambdaquestionansweringdevF739B600'),
                'Arn',
              ],
            },
            Id: 'Target0',
          },
        ],
      }),
    );
  });

  test('S3 Bucket Properties', () => {
    imageTestTemplate.hasResourceProperties('AWS::S3::Bucket', {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          { ServerSideEncryptionByDefault: { SSEAlgorithm: 'AES256' } },
        ],
      },
    });
    expect(imageTestConstruct.s3GenerateAssetsBucket).not.toBeNull;
  });

  test('S3 Bucket Count', () => {
    imageTestTemplate.resourceCountIs('AWS::S3::Bucket', 2);
  });
});
