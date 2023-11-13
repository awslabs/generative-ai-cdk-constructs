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
import * as os from 'aws-cdk-lib/aws-opensearchservice';
import * as secret from 'aws-cdk-lib/aws-secretsmanager';
import { QaAppsyncOpensearch, QaAppsyncOpensearchProps } from '../../../../src/patterns/gen-ai/aws-qa-appsync-opensearch';


describe('QA Appsync Open search construct', () => {

  let qaTestTemplate: Template;
  let qaTestConstruct: QaAppsyncOpensearch;
  const cognitoPoolId = 'region_XXXXX';


  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {

    const qaTestStack = new cdk.Stack(undefined, undefined, {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    const osDomain = os.Domain.fromDomainAttributes(qaTestStack, 'osdomain', {
      domainArn: 'arn:aws:es:region:account:domain/',
      domainEndpoint: 'https://osendppint.amazon.aws.com',
    });


    const osSecret = secret.Secret.fromSecretNameV2(qaTestStack, 'ossecret', 'OSSecretId');
    const userPoolLoaded = cognito.UserPool.fromUserPoolId(qaTestStack, 'testUserPool', cognitoPoolId);


    const qaTestProps: QaAppsyncOpensearchProps =
        {
          existingOpensearchDomain: osDomain,
          openSearchIndexName: 'demoindex',
          openSearchSecret: osSecret,
          cognitoUserPool: userPoolLoaded,
        };

    qaTestConstruct = new QaAppsyncOpensearch(qaTestStack, 'test', qaTestProps);
    qaTestTemplate = Template.fromStack(qaTestStack);

  });

  test('Lambda properties', () => {
    qaTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler',
    });

    qaTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('lambda_question_answering'),
      Environment: {
        Variables: {
          GRAPHQL_URL: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('testquestionAnsweringGraphqlApi'),
              'GraphQLUrl',
            ],
          },
          INPUT_BUCKET: { Ref: Match.stringLikeRegexp('testinputAssetsQABucketdev') },
          OPENSEARCH_DOMAIN_ENDPOINT: 'osendppint.amazon.aws.com',
          OPENSEARCH_INDEX: 'demoindex',
          OPENSEARCH_SECRET_ID: 'OSSecretId',
        },
      },
    });
  });


  test('Lambda function count', () => {
    qaTestTemplate.resourceCountIs('AWS::Lambda::Function', 2);
  });

  test('Appsync Graphql Properties', () => {
    qaTestTemplate.hasResourceProperties('AWS::AppSync::GraphQLApi', {
      UserPoolConfig: {},
      AuthenticationType: 'AMAZON_COGNITO_USER_POOLS',
    });
  });

  test('Appsync resolver Properties', () => {
    qaTestTemplate.hasResourceProperties('AWS::AppSync::Resolver', {
      DataSourceName: Match.stringLikeRegexp('questionAnsweringEventBridgeDataSource'),
      FieldName: 'postQuestion',
      TypeName: 'Mutation',
    });

    qaTestTemplate.hasResourceProperties('AWS::AppSync::Resolver', {
      DataSourceName: Match.stringLikeRegexp('JobStatusDataSource'),
      FieldName: 'updateQAJobStatus',
      TypeName: 'Mutation',
    });
  });

  test('Appsync resolver Count', () => {
    qaTestTemplate.resourceCountIs('AWS::AppSync::Resolver', 2);
  },
  );

  test('Appsync Graphql Count', () => {
    qaTestTemplate.resourceCountIs('AWS::AppSync::GraphQLApi', 1);
    expect(qaTestConstruct.graphqlApi.apiId).not.toBeNull;
  },
  );

  test('Event Bus rule Target', () => {
    qaTestTemplate.hasResourceProperties('AWS::Events::Rule',
      Match.objectEquals
      ({
        Description: 'Rule to trigger question answering function',
        EventBusName: { Ref: Match.stringLikeRegexp('testquestionAnsweringEventBus') },
        EventPattern: { source: ['questionanswering'] },
        State: 'ENABLED',
        Targets:
                        [{
                          Arn:
                                {
                                  'Fn::GetAtt': [Match.stringLikeRegexp('testlambdaquestionanswering'), 'Arn'],
                                },
                          Id: 'Target0',

                        }],
      },
      ));
  });

  test('S3 Bucket Properties', () => {
    qaTestTemplate.hasResourceProperties('AWS::S3::Bucket', {
      BucketEncryption: { ServerSideEncryptionConfiguration: [{ ServerSideEncryptionByDefault: { SSEAlgorithm: 'AES256' } }] },
    });
    expect(qaTestConstruct.s3InputAssetsBucket).not.toBeNull;
  });

  test('S3 Bucket Count', () => {
    qaTestTemplate.resourceCountIs('AWS::S3::Bucket', 1);
  });

});
