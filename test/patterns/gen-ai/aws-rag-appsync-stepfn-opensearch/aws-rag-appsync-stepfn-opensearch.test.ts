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
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as os from 'aws-cdk-lib/aws-opensearchservice';
import * as secret from 'aws-cdk-lib/aws-secretsmanager';
import { RagAppsyncStepfnOpensearch, RagAppsyncStepfnOpensearchProps } from '../../../../src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch';


describe('RAG Appsync Stepfn Open search construct', () => {

  let ragTestTemplate: Template;
  let ragTestConstruct: RagAppsyncStepfnOpensearch;
  const cognitoPoolId = 'region_XXXXX';

  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {
    const ragTestStack = new cdk.Stack(undefined, undefined, {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    const vpc = new ec2.Vpc(ragTestStack, 'test-vpc',
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

    const osDomain = os.Domain.fromDomainAttributes(ragTestStack, 'osdomain', {
      domainArn: 'arn:aws:es:region:account:domain/',
      domainEndpoint: 'https://osendppint.amazon.aws.com',
    });

    const osSecret = secret.Secret.fromSecretNameV2(ragTestStack, 'ossecret', 'OSSecretID');

    const userPoolLoaded = cognito.UserPool.fromUserPoolId(ragTestStack, 'testUserPool', cognitoPoolId);

    const ragTestprops: RagAppsyncStepfnOpensearchProps = {
      existingVpc: vpc,
      existingOpensearchDomain: osDomain,
      openSearchIndexName: 'demoindex',
      openSearchSecret: osSecret,
      cognitoUserPool: userPoolLoaded,
    };

    ragTestConstruct = new RagAppsyncStepfnOpensearch(ragTestStack, 'test', ragTestprops);
    ragTestTemplate = Template.fromStack(ragTestStack);
  });

  test('Lambda properties', () => {
    ragTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('embeddings_job_docker'),
      Environment: {
        Variables: {
          GRAPHQL_URL: { 'Fn::GetAtt': [Match.stringLikeRegexp('testingestionGraphqlApi'), 'GraphQLUrl'] },
          OPENSEARCH_DOMAIN_ENDPOINT: Match.stringLikeRegexp('osendppint.amazon.aws.com'),
          OPENSEARCH_INDEX: 'demoindex',
          OPENSEARCH_SECRET_ID: Match.stringLikeRegexp('OSSecret'),
          OUTPUT_BUCKET: { Ref: Match.stringLikeRegexp('testprocessedAssetsBucketdev') },
        },
      },
    });
    ragTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('s3_file_transformer_docker'),
      Environment: {
        Variables: {
          GRAPHQL_URL: { 'Fn::GetAtt': [Match.stringLikeRegexp('testingestionGraphqlApi'), 'GraphQLUrl'] },
          INPUT_BUCKET: { Ref: Match.stringLikeRegexp('testinputAssetsBucket') },
          OUTPUT_BUCKET: { Ref: Match.stringLikeRegexp('testprocessedAssetsBucket') },
        },
      },
    });
    ragTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('ingestion_input_validation_docker'),
      Environment: {
        Variables:
                         {
                           GRAPHQL_URL:
                            {
                              'Fn::GetAtt':
                                [Match.stringLikeRegexp('testingestionGraphqlApi'),
                                  'GraphQLUrl'],
                            },
                         },
      },
    });

  });

  test('Lambda function count', () => {
    ragTestTemplate.resourceCountIs('AWS::Lambda::Function', 4);
  });

  test('Appsync Graphql Properties', () => {
    ragTestTemplate.hasResourceProperties('AWS::AppSync::GraphQLApi', {
      UserPoolConfig: {},
      AuthenticationType: 'AMAZON_COGNITO_USER_POOLS',
    });
  });

  test('Appsync resolver Properties', () => {
    ragTestTemplate.hasResourceProperties('AWS::AppSync::Resolver', {
      DataSourceName: Match.stringLikeRegexp('ingestionEventBridgeDataSource'),
      FieldName: 'ingestDocuments',
      TypeName: 'Mutation',
    });

    ragTestTemplate.hasResourceProperties('AWS::AppSync::Resolver', {
      DataSourceName: Match.stringLikeRegexp('JobStatusDataSource'),
      FieldName: 'updateIngestionJobStatus',
      TypeName: 'Mutation',
    });
  });

  test('Appsync Graphql Count', () => {
    ragTestTemplate.resourceCountIs('AWS::AppSync::GraphQLApi', 1);
  });

  test('Event Bus rule Target', () => {
    ragTestTemplate.hasResourceProperties('AWS::Events::Rule',
      Match.objectEquals
      ({
        Description: 'Rule to trigger ingestion function',
        EventBusName: { Ref: Match.stringLikeRegexp('testingestionEventBus') },
        EventPattern: { source: ['ingestion'] },
        State: 'ENABLED',
        Targets:
                        [{
                          Arn:
                                { Ref: Match.stringLikeRegexp('estIngestionStateMachine') },
                          Id: 'Target0',
                          RoleArn: { 'Fn::GetAtt': [Match.stringLikeRegexp('testIngestionStateMachineEvent'), 'Arn'] },

                        }],
      },
      ));
  });

  test('S3 Bucket Properties', () => {
    ragTestTemplate.hasResourceProperties('AWS::S3::Bucket', {
      BucketEncryption: { ServerSideEncryptionConfiguration: [{ ServerSideEncryptionByDefault: { SSEAlgorithm: 'AES256' } }] },
    });
    expect(ragTestConstruct.s3InputAssetsBucket).not.toBeNull;
    expect(ragTestConstruct.s3ProcessedAssetsBucket).not.toBeNull;
  });

  test('S3 Bucket Count', () => {
    ragTestTemplate.resourceCountIs('AWS::S3::Bucket', 3);
  });

  test('Step function count', () => {
    ragTestTemplate.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  test('Step function defined ', () => {
    expect(ragTestConstruct.stateMachine).toBeDefined;
    expect(ragTestConstruct.stateMachine).not.toBeNull;
  });


});