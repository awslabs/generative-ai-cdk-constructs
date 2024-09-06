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

import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { IKey, Key } from 'aws-cdk-lib/aws-kms';
import { ISecret, Secret } from 'aws-cdk-lib/aws-secretsmanager';
import * as bedrock from '../../../../src/cdk-lib/bedrock';


describe('Data Source', () => {
  let stack: Stack;
  let kb: bedrock.KnowledgeBase;
  let key: IKey;

  beforeEach(() => {
    const app = new App();
    stack = new Stack(app, 'TestStack');
    kb = new bedrock.KnowledgeBase(stack, 'KB', {
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
    });
    const sampleKeyArn = 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418';
    key = Key.fromKeyArn(stack, 'TestKey', sampleKeyArn);

  });

  test('Basic Web Crawler', () => {
    new bedrock.WebCrawlerDataSource(stack, 'TestDataSource', {
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      sourceUrls: ['https://example.com'],
      crawlingScope: bedrock.CrawlingScope.SUBDOMAINS,
      kmsKey: key,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      Name: 'TestDataSource',
      ServerSideEncryptionConfiguration: {
        KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
      },
      DataSourceConfiguration: {
        Type: 'WEB',
        WebConfiguration: {
          CrawlerConfiguration: {
            CrawlerLimits: {
              RateLimit: 300,
            },
            Scope: 'SUBDOMAINS',
            ExclusionFilters: Match.absent(),
            InclusionFilters: Match.absent(),
          },
          SourceConfiguration: {
            UrlConfiguration: {
              SeedUrls: [{
                Url: 'https://example.com',
              }],
            },
          },
        },
      },
    });
  });
});

describe('Confluence Data Source', () => {
  let stack: Stack;
  let kb: bedrock.KnowledgeBase;
  let key: IKey;
  let secret: ISecret;

  beforeEach(() => {
    const app = new App();
    stack = new Stack(app, 'TestStack');
    kb = new bedrock.KnowledgeBase(stack, 'KB', {
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
    });
    const sampleKeyArn = 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418';
    const sampleSecretArn = 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:AmazonBedrock-auth-tW8BY1';
    key = Key.fromKeyArn(stack, 'TestKey', sampleKeyArn);
    secret = Secret.fromSecretCompleteArn(stack, 'TestSecret', sampleSecretArn);
  });

  test('Basic Confluence Setup - Class', () => {
    new bedrock.ConfluenceDataSource(stack, 'TestDataSource', {
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      authSecret: secret,
      kmsKey: key,
      confluenceUrl: 'https://example.atlassian.net',
      filters: [
        {
          objectType: bedrock.ConfluenceObjectType.ATTACHMENT,
          includePatterns: ['.*\\.pdf'],
          excludePatterns: ['.*private.*\\.pdf'],
        },
        {
          objectType: bedrock.ConfluenceObjectType.PAGE,
          includePatterns: ['.*public.*\\.pdf'],
          excludePatterns: ['.*confidential.*\\.pdf'],
        },
      ],
    });

    console.log(Template.fromStack(stack));
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      Name: 'TestDataSource',
      ServerSideEncryptionConfiguration: {
        KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
      },
      DataSourceConfiguration: {
        Type: 'CONFLUENCE',
        ConfluenceConfiguration: {
          SourceConfiguration: {
            HostUrl: 'https://example.atlassian.net',
            HostType: 'SAAS',
            AuthType: 'OAUTH2_CLIENT_CREDENTIALS',
            CredentialsSecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:AmazonBedrock-auth-tW8BY1',
          },
          CrawlerConfiguration: {
            FilterConfiguration: {
              Type: 'PATTERN',
              PatternObjectFilter: {
                Filters: [
                  {
                    ObjectType: 'Attachment',
                    InclusionFilters: [
                      '.*\\.pdf',
                    ],
                    ExclusionFilters: [
                      '.*private.*\\.pdf',
                    ],
                  },
                  {
                    ObjectType: 'Page',
                    InclusionFilters: [
                      '.*public.*\\.pdf',
                    ],
                    ExclusionFilters: [
                      '.*confidential.*\\.pdf',
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    });

  });

  test('Basic Confluence Setup - Method', () => {
    kb.addConfluenceDataSource({
      dataSourceName: 'TestDataSource',
      authSecret: secret,
      kmsKey: key,
      confluenceUrl: 'https://example.atlassian.net',
      filters: [
        {
          objectType: bedrock.ConfluenceObjectType.ATTACHMENT,
          includePatterns: ['.*\\.pdf'],
          excludePatterns: ['.*private.*\\.pdf'],
        },
        {
          objectType: bedrock.ConfluenceObjectType.PAGE,
          includePatterns: ['.*public.*\\.pdf'],
          excludePatterns: ['.*confidential.*\\.pdf'],
        },
      ],
    });

    console.log(Template.fromStack(stack));
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      Name: 'TestDataSource',
      ServerSideEncryptionConfiguration: {
        KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
      },
      DataSourceConfiguration: {
        Type: 'CONFLUENCE',
        ConfluenceConfiguration: {
          SourceConfiguration: {
            HostUrl: 'https://example.atlassian.net',
            HostType: 'SAAS',
            AuthType: 'OAUTH2_CLIENT_CREDENTIALS',
            CredentialsSecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:AmazonBedrock-auth-tW8BY1',
          },
          CrawlerConfiguration: {
            FilterConfiguration: {
              Type: 'PATTERN',
              PatternObjectFilter: {
                Filters: [
                  {
                    ObjectType: 'Attachment',
                    InclusionFilters: [
                      '.*\\.pdf',
                    ],
                    ExclusionFilters: [
                      '.*private.*\\.pdf',
                    ],
                  },
                  {
                    ObjectType: 'Page',
                    InclusionFilters: [
                      '.*public.*\\.pdf',
                    ],
                    ExclusionFilters: [
                      '.*confidential.*\\.pdf',
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    });

  });
});

describe('Sharepoint Data Source', () => {
  let stack: Stack;
  let kb: bedrock.KnowledgeBase;
  let key: IKey;
  let secret: ISecret;

  beforeEach(() => {
    const app = new App();
    stack = new Stack(app, 'TestStack');
    kb = new bedrock.KnowledgeBase(stack, 'KB', {
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
    });
    const sampleKeyArn = 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418';
    const sampleSecretArn = 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:AmazonBedrock-auth-tW8BY1';
    key = Key.fromKeyArn(stack, 'TestKey', sampleKeyArn);
    secret = Secret.fromSecretCompleteArn(stack, 'TestSecret', sampleSecretArn);
  });

  test('Basic Sharepoint Setup - Class', () => {
    new bedrock.SharepointDataSource(stack, 'TestDataSource', {
      knowledgeBase: kb,
      dataSourceName: 'TestDataSource',
      authSecret: secret,
      kmsKey: key,
      domain: 'https://example.atlassian.net',
      siteUrls: [],
      tenantId: @
        filters: [
          {
            objectType: bedrock.SharepointObjectType.PAGE,
            includePatterns: ['.*\\.pdf'],
            excludePatterns: ['.*private.*\\.pdf'],
          },
          {
            objectType: bedrock.SharepointObjectType.FILE,
            includePatterns: ['.*public.*\\.pdf'],
            excludePatterns: ['.*confidential.*\\.pdf'],
          },
      ],
    });

    console.log(Template.fromStack(stack));
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      Name: 'TestDataSource',
      ServerSideEncryptionConfiguration: {
        KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
      },
      SharepointConfiguration: {
        Type: 'CONFLUENCE',
        SharepointConfiguration: {
          SourceConfiguration: {
            HostUrl: 'https://your-instance.my.salesforce.com',
            HostType: 'SAAS',
            AuthType: 'OAUTH2_CLIENT_CREDENTIALS',
            CredentialsSecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:AmazonBedrock-auth-tW8BY1',
          },
          CrawlerConfiguration: {
            FilterConfiguration: {
              Type: 'PATTERN',
              PatternObjectFilter: {
                Filters: [
                  {
                    ObjectType: 'Attachment',
                    InclusionFilters: [
                      '.*\\.pdf',
                    ],
                    ExclusionFilters: [
                      '.*private.*\\.pdf',
                    ],
                  },
                  {
                    ObjectType: 'Page',
                    InclusionFilters: [
                      '.*public.*\\.pdf',
                    ],
                    ExclusionFilters: [
                      '.*confidential.*\\.pdf',
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    });

  });

  test('Basic Confluence Setup - Method', () => {
    kb.addConfluenceDataSource({
      dataSourceName: 'TestDataSource',
      authSecret: secret,
      kmsKey: key,
      confluenceUrl: 'https://example.atlassian.net',
      filters: [
        {
          objectType: bedrock.ConfluenceObjectType.ATTACHMENT,
          includePatterns: ['.*\\.pdf'],
          excludePatterns: ['.*private.*\\.pdf'],
        },
        {
          objectType: bedrock.ConfluenceObjectType.PAGE,
          includePatterns: ['.*public.*\\.pdf'],
          excludePatterns: ['.*confidential.*\\.pdf'],
        },
      ],
    });

    console.log(Template.fromStack(stack));
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      Name: 'TestDataSource',
      ServerSideEncryptionConfiguration: {
        KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
      },
      DataSourceConfiguration: {
        Type: 'CONFLUENCE',
        ConfluenceConfiguration: {
          SourceConfiguration: {
            HostUrl: 'https://example.atlassian.net',
            HostType: 'SAAS',
            AuthType: 'OAUTH2_CLIENT_CREDENTIALS',
            CredentialsSecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:AmazonBedrock-auth-tW8BY1',
          },
          CrawlerConfiguration: {
            FilterConfiguration: {
              Type: 'PATTERN',
              PatternObjectFilter: {
                Filters: [
                  {
                    ObjectType: 'Attachment',
                    InclusionFilters: [
                      '.*\\.pdf',
                    ],
                    ExclusionFilters: [
                      '.*private.*\\.pdf',
                    ],
                  },
                  {
                    ObjectType: 'Page',
                    InclusionFilters: [
                      '.*public.*\\.pdf',
                    ],
                    ExclusionFilters: [
                      '.*confidential.*\\.pdf',
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    });

  });
});