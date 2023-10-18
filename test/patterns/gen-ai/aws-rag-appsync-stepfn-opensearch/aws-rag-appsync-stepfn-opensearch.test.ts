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
  let stage = '-dev';
  let ragTestConstruct: RagAppsyncStepfnOpensearch;
  const cognitoPoolId = 'us-east-1_1RVagE46n';

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
      domainArn: 'arn:aws:es:us-east-1:383119320704:domain/whiskeyosmanagedcluster',
      domainEndpoint: 'https://vpc-whiskeyosmanagedcluster-4pkv5sj6vhoz5lrxn35wfidrie.us-east-1.es.amazonaws.com',
    });

    const osSecret = secret.Secret.fromSecretNameV2(ragTestStack, 'ossecret', 'OSSecret4A7B7484-NJb2Ppu2AmvJ');

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
      FunctionName: 'embeddings_job_docker'+stage,
      Environment: {
        Variables: {
          GRAPHQL_URL: { 'Fn::GetAtt': [Match.stringLikeRegexp('testingestionGraphqlApi'), 'GraphQLUrl'] },
          INPUT_BUCKET: { Ref: Match.stringLikeRegexp('testinputAssetsBucket') },
          OPENSEARCH_DOMAIN_ENDPOINT: Match.stringLikeRegexp('vpc-whiskeyosmanagedcluster-'),
          OPENSEARCH_INDEX: 'demoindex',
          OPENSEARCH_SECRET_ID: Match.stringLikeRegexp('OSSecret'),
          OUTPUT_BUCKET: { Ref: Match.stringLikeRegexp('testprocessedAssetsBucketdev') },
        },
      },
    });
    ragTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: 's3_file_transformer_docker'+stage,
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
      FunctionName: 'ingestion_input_validation_docker'+stage,
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

  test('Appsync Merge Graphql Properties', () => {
    ragTestTemplate.hasResourceProperties('AWS::AppSync::GraphQLApi', {
      UserPoolConfig: {},
      AuthenticationType: 'AMAZON_COGNITO_USER_POOLS',
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
    ragTestTemplate.resourceCountIs('AWS::S3::Bucket', 2);
  });

  test('Step function count', () => {
    ragTestTemplate.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  test('Step function defined ', () => {
    expect(ragTestConstruct.stateMachine).toBeDefined;
    expect(ragTestConstruct.stateMachine).not.toBeNull;
  });


});