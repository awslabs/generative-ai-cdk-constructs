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
import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { BedrockFoundationModel, KnowledgeBase, ChunkingStrategy, ParsingStategy, ConfluenceObjectType, SalesforceObjectType, SharePointObjectType, CrawlingScope, CustomTransformation } from '../../../../src/cdk-lib/bedrock';


const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-data-sources-integ-test');

const kb = new KnowledgeBase(stack, 'MyKnowledgeBase', {
  name: 'MyKnowledgeBase',
  embeddingsModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
});

const bucket = new Bucket(stack, 'Bucket', {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});
const bucket2 = new Bucket(stack, 'Bucket2', {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});
const secret = new Secret(stack, 'Secret');
const key = new Key(stack, 'Key');

const lambdaFunction = new Function(stack, 'LambdaFunction', {
  runtime: Runtime.NODEJS_18_X,
  code: Code.fromInline('exports.handler = function(event, context, callback) { callback(null, "Success"); }'),
  handler: 'index.handler',
});


kb.addS3DataSource({
  bucket,
  kmsKey: key,
  chunkingStrategy: ChunkingStrategy.SEMANTIC,
  parsingStrategy: ParsingStategy.foundationModel({
    parsingModel: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0.asIModel(stack),
  }),
  customTransformation: CustomTransformation.lambda({
    lambdaFunction,
    s3BucketUri: `s3://${bucket2.bucketName}/chunk-processor/`,
  }),
});

kb.addConfluenceDataSource({
  dataSourceName: 'TestDataSource',
  authSecret: secret,
  kmsKey: key,
  confluenceUrl: 'https://example.atlassian.net',
  filters: [
    {
      objectType: ConfluenceObjectType.ATTACHMENT,
      includePatterns: ['.*\\.pdf'],
      excludePatterns: ['.*private.*\\.pdf'],
    },
    {
      objectType: ConfluenceObjectType.PAGE,
      includePatterns: ['.*public.*\\.pdf'],
      excludePatterns: ['.*confidential.*\\.pdf'],
    },
  ],
});

kb.addWebCrawlerDataSource({
  sourceUrls: ['https://docs.aws.amazon.com/'],
  chunkingStrategy: ChunkingStrategy.HIERARCHICAL_COHERE,
  crawlingScope: CrawlingScope.DEFAULT,
});

kb.addSalesforceDataSource({
  authSecret: secret,
  endpoint: 'https://your-instance.my.salesforce.com',
  kmsKey: key,
  filters: [
    {
      objectType: SalesforceObjectType.ATTACHMENT,
      includePatterns: ['.*\\.pdf'],
      excludePatterns: ['.*private.*\\.pdf'],
    },
    {
      objectType: SalesforceObjectType.CONTRACT,
      includePatterns: ['.*public.*\\.pdf'],
      excludePatterns: ['.*confidential.*\\.pdf'],
    },
  ],
});

kb.addSharePointDataSource({
  dataSourceName: 'SharepointDataSource',
  authSecret: secret,
  kmsKey: key,
  domain: 'yourdomain',
  siteUrls: ['https://yourdomain.sharepoint.com/sites/mysite'],
  tenantId: '888d0b57-69f1-4fb8-957f-e1f0bedf64de',
  filters: [
    {
      objectType: SharePointObjectType.PAGE,
      includePatterns: ['.*\\.pdf'],
      excludePatterns: ['.*private.*\\.pdf'],
    },
    {
      objectType: SharePointObjectType.FILE,
      includePatterns: ['.*public.*\\.pdf'],
      excludePatterns: ['.*confidential.*\\.pdf'],
    },
  ],
});

new integ.IntegTest(app, 'ServiceTest', {
  testCases: [stack],
  cdkCommandOptions: {
    destroy: {
      args: {
        force: true,
      },
    },
  },
});

app.synth();