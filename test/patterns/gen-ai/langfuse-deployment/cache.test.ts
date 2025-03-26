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

// External Dependencies:
import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { AwsSolutionsChecks } from 'cdk-nag';

// Local Dependencies:
import { CacheCluster } from '../../../../src/patterns/gen-ai/langfuse-deployment/cache';

describe('CacheCluster construct', () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  let vpc: ec2.Vpc;

  beforeEach(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'TestStack', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });
    vpc = new ec2.Vpc(stack, 'TestVPC');
  });

  test('applies expected default props', () => {
    new CacheCluster(stack, 'TestCache', { vpc });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ElastiCache::ReplicationGroup', {
      CacheNodeType: 'cache.t3.small',
      NumCacheClusters: 2,
      MultiAZEnabled: true,
      Port: 6379,
    });
  });

  test('overrides cluster settings from props', () => {
    new CacheCluster(stack, 'TestCache', {
      cacheNodeType: 'cache.t3.large',
      numCacheClusters: 3,
      port: 1234,
      tags: [new cdk.Tag('TestTagKey', 'TestTagValue')],
      vpc,
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ElastiCache::ReplicationGroup', {
      CacheNodeType: 'cache.t3.large',
      NumCacheClusters: 3,
      MultiAZEnabled: true,
      Port: 1234,
      Tags: Match.arrayWith([{ Key: 'TestTagKey', Value: 'TestTagValue' }]),
    });

    template.hasResourceProperties('AWS::ElastiCache::ParameterGroup', {
      Tags: Match.arrayWith([{ Key: 'TestTagKey', Value: 'TestTagValue' }]),
    });
  });
});
