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
import {
  WebCrawler,
  WebCrawlerProps,
} from '../../../../src/patterns/gen-ai/aws-web-crawler';

describe('Web Crawler construct', () => {
  let wcTestTemplate: Template;
  let wcTestConstruct: WebCrawler;

  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {
    const wcTestStack = new cdk.Stack(undefined, undefined, {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    const wcTestProps: WebCrawlerProps = {
      enableLambdaCrawler: true,
    };

    wcTestConstruct = new WebCrawler(wcTestStack, 'test', wcTestProps);
    wcTestTemplate = Template.fromStack(wcTestStack);

    console.log(wcTestTemplate);
  });

  test('Lambda properties', () => {
    wcTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      FunctionName: Match.stringLikeRegexp('lambda_crawler_scheduler-dev'),
    });

    wcTestTemplate.hasResourceProperties('AWS::Lambda::Function', {
      FunctionName: Match.stringLikeRegexp('lambda_crawler_scheduler'),
    });
  });

  test('Lambda function count', () => {
    wcTestTemplate.resourceCountIs('AWS::Lambda::Function', 2);
  });

  test('S3 Bucket Properties', () => {
    wcTestTemplate.hasResourceProperties('AWS::S3::Bucket', {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          { ServerSideEncryptionByDefault: { SSEAlgorithm: 'AES256' } },
        ],
      },
    });
    expect(wcTestConstruct.dataBucket).not.toBeNull;
  });

  test('S3 Bucket Count', () => {
    wcTestTemplate.resourceCountIs('AWS::S3::Bucket', 2);
  });

  test('Event Bus rule Target', () => {
    wcTestTemplate.hasResourceProperties(
      'AWS::Events::Rule',
      Match.objectEquals({
        ScheduleExpression: 'cron(0/15 * * * ? *)',
        State: 'ENABLED',
        Targets: [
          {
            Arn: {
              'Fn::GetAtt': [
                Match.stringLikeRegexp('testwebCrawlerSchedulerFunction'),
                'Arn',
              ],
            },
            Id: 'Target0',
          },
        ],
      }),
    );
  });
});