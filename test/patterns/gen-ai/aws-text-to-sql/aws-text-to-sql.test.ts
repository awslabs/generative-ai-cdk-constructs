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
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { AwsSolutionsChecks } from 'cdk-nag';
import {
  TextToSql,
  TextToSqlProps,
  DatabaseType,
  DbName,
  MetatdataSource,
} from '../../../../src/patterns/gen-ai/aws-text-to-sql';

describe('Text to SQL Construct', () => {
  let app: cdk.App;
  let texttoSqlTemplate: Template;
  let textToSqlTestConstruct: TextToSql;

  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const textToSqlTestStack = new cdk.Stack(app, 'textToSqlTestStack', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    const vpc = new ec2.Vpc(textToSqlTestStack, 'test-vpc', {
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
    });
    const props: TextToSqlProps = {
      databaseType: DatabaseType.AURORA,
      dbName: DbName.MYSQL,
      metadataSource: MetatdataSource.CONFIG_FILE,
      stage: 'dev',
      existingVpc: vpc,
    };

    textToSqlTestConstruct = new TextToSql(
      textToSqlTestStack,
      'TextToSql',
      props,
    );
    texttoSqlTemplate = Template.fromStack(textToSqlTestStack);
  });

  test('S3 bucket count', () => {
    texttoSqlTemplate.resourceCountIs('AWS::S3::Bucket', 2);
    expect(textToSqlTestConstruct.configAssetBucket).not.toBeNull;
  });
  test('Step function  count', () => {
    texttoSqlTemplate.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
    expect(textToSqlTestConstruct.stepFunction).not.toBeNull;
  });
  test('Event bridge   count', () => {
    texttoSqlTemplate.resourceCountIs('AWS::Events::EventBus', 1);
  });

  test('Lambda function count', () => {
    texttoSqlTemplate.resourceCountIs('AWS::Lambda::Function', 7);
  });

  test('refromulate lambda properties', () => {
    texttoSqlTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('reformulatequestionfunction'),
      Environment: {
        Variables: {
          DB_NAME: Match.stringLikeRegexp('MySQL'),
          METADATA_SOURCE: Match.stringLikeRegexp('config_file'),
          CONFIG_BUCKET: {
            Ref: Match.anyValue(),
          },
        },
      },
    });
  });

  test('refromulate lambda properties', () => {
    texttoSqlTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('reformulatequestionfunction'),
      Environment: {
        Variables: {
          DB_NAME: Match.stringLikeRegexp('MySQL'),
          METADATA_SOURCE: Match.stringLikeRegexp('config_file'),
          CONFIG_BUCKET: {
            Ref: Match.anyValue(),
          },
        },
      },
    });
  });

  test('query generator lambda properties', () => {
    texttoSqlTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('querygeneratorfunction'),
      Environment: {
        Variables: {
          DB_NAME: Match.stringLikeRegexp('MySQL'),
          CONFIG_BUCKET: {
            Ref: Match.anyValue(),
          },
          SECRET_ARN: {
            Ref: Match.stringLikeRegexp('TextToSqlAurora'),
          },
        },
      },
    });
  });

  test('query executor properties', () => {
    texttoSqlTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: Match.stringLikeRegexp('queryexecutorfunction'),
      Environment: {
        Variables: {
          DB_NAME: Match.stringLikeRegexp('MySQL'),
          CONFIG_BUCKET: {
            Ref: Match.anyValue(),
          },
          SECRET_ARN: {
            Ref: Match.stringLikeRegexp('TextToSqlAurora'),
          },
        },
      },
    });
  });
});
