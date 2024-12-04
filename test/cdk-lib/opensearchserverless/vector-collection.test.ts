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
import { Annotations, Match, Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { AwsSolutionsChecks } from 'cdk-nag';
import { VectorCollection, VectorCollectionStandbyReplicas, VectorCollectionType } from '../../../src/cdk-lib/opensearchserverless';


function setupStack() {
  const app = new cdk.App();
  cdk.Aspects.of(app).add(new AwsSolutionsChecks());
  const stack = new cdk.Stack(app, 'test-stack', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  });

  const collectionName = 'test-aoss-collection';
  const standbyReplicas = VectorCollectionStandbyReplicas.DISABLED;

  const aossVector = new VectorCollection(stack, 'test-aoss-vector', {
    collectionName: collectionName,
    standbyReplicas: standbyReplicas,
  });

  return { app, stack, aossVector, collectionName, standbyReplicas };
}

describe('OpenSearch Serverless Vector Store', () => {
  describe('No data access policies', () => {
    let app: cdk.App;
    let stack: cdk.Stack;
    let template: Template;

    beforeAll(() => {
      const s = setupStack();
      app = s.app;
      stack = s.stack;
      app.synth();
      template = Template.fromStack(stack);
    });


    test('Should have the correct resources', () => {
      template.resourceCountIs('AWS::OpenSearchServerless::Collection', 1);
      template.resourceCountIs('AWS::OpenSearchServerless::AccessPolicy', 1);
    });

    test('DataAccessPolicy should be empty', () => {
      const conditions = template.findConditions(
        '*',
        {
          'Fn::Not': [
            {
              'Fn::Equals': [
                0,
                0,
              ],
            },
          ],
        },
      );
      expect(Object.keys(conditions)).toHaveLength(1);
      const condition = Object.keys(conditions)[0];
      template.hasResource(
        'AWS::OpenSearchServerless::AccessPolicy', {
          Condition: condition,
          Properties: {
            Name: Match.stringLikeRegexp('^dataaccesspolicy[a-z0-9]+'),
            Policy: '[]',
            Type: 'data',
          },
        });
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });


  describe('With data access policies', () => {
    let template: Template;
    let app: cdk.App;
    let stack: cdk.Stack;
    let aossVector: VectorCollection;
    let testRole: iam.Role;
    let collectionName: string;
    let standbyReplicas: VectorCollectionStandbyReplicas;

    beforeAll(() => {
      const s = setupStack();
      app = s.app;
      stack = s.stack;
      aossVector = s.aossVector;
      collectionName = s.collectionName;
      standbyReplicas = s.standbyReplicas;

      testRole = new iam.Role(stack, 'TestRole', {
        assumedBy: new iam.AccountRootPrincipal(),
      });

      aossVector.grantDataAccess(testRole);

      app.synth();
      template = Template.fromStack(stack);
    });


    test('Should have the correct resources', () => {
      template.resourceCountIs('AWS::OpenSearchServerless::Collection', 1);
      template.resourceCountIs('AWS::OpenSearchServerless::AccessPolicy', 1);
    });

    test('Should correctly initialize with custom props', () => {
      expect(aossVector.collectionName).toBe(collectionName);
      expect(aossVector.standbyReplicas).toBe(standbyReplicas);
    });

    test('DataAccessPolicy should allow testRole', () => {
      const testRoleLogicalId = stack.getLogicalId(testRole.node.defaultChild as iam.CfnRole);

      const conditions = template.findConditions(
        '*',
        {
          'Fn::Not': [
            {
              'Fn::Equals': [
                0,
                1,
              ],
            },
          ],
        },
      );
      expect(Object.keys(conditions)).toHaveLength(1);
      const condition = Object.keys(conditions)[0];
      template.hasResource('AWS::OpenSearchServerless::AccessPolicy', {
        Condition: condition,
        Properties: {
          Name: Match.stringLikeRegexp('^dataaccesspolicy[a-z0-9]+'),
          Policy: {
            'Fn::Join': Match.arrayWith([
              Match.arrayWith([
                Match.objectEquals({
                  'Fn::GetAtt': Match.arrayWith([
                    testRoleLogicalId,
                  ]),
                }),
              ]),
            ]),
          },
          Type: 'data',
        },
      });
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });

  describe('Static Methods', () => {
    let app: cdk.App;
    let stack: cdk.Stack;
    let template: Template;

    beforeEach(() => {
      app = new cdk.App();
      cdk.Aspects.of(app).add(new AwsSolutionsChecks());
      stack = new cdk.Stack(app, 'test-stack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      VectorCollection.fromCollectionAttributes(stack, 'ImportedAttributes', {
        collectionName: 'test-collection-2',
        collectionId: 'test-id',
        collectionArn: 'arn:aws:aoss:us-east-1:123456789012:collection/test-collection-2',
        standbyReplicas: VectorCollectionStandbyReplicas.DISABLED,
        collectionType: VectorCollectionType.VECTORSEARCH,
      });

      app.synth();
      template = Template.fromStack(stack);
    });

    test('Should have the correct resources for imported collections', () => {
      template.resourceCountIs('AWS::IAM::ManagedPolicy', 1);
      template.resourceCountIs('AWS::OpenSearchServerless::AccessPolicy', 1);
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });

  describe('Network and Encryption Policies', () => {
    let app: cdk.App;
    let stack: cdk.Stack;

    beforeEach(() => {
      app = new cdk.App();
      cdk.Aspects.of(app).add(new AwsSolutionsChecks());
      stack = new cdk.Stack(app, 'test-stack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      app.synth();
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });

  describe('Validation and Defaults', () => {
    let stack: cdk.Stack;

    beforeEach(() => {
      const app = new cdk.App();
      cdk.Aspects.of(app).add(new AwsSolutionsChecks());
      stack = new cdk.Stack(app, 'test-stack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
    });

    test('Should validate collection name length', () => {
      // Testing short name
      const shortNameCollection = new VectorCollection(stack, 'TestShortName', {
        collectionName: 'ab',
      });

      expect(() => {
        const errors = shortNameCollection.node.validate();
        if (errors.length > 0) {
          throw new Error(errors[0]);
        }
      }).toThrow(/Collection name must be between 3 and 32 characters/);

      // Testing long name
      const longNameCollection = new VectorCollection(stack, 'TestLongName', {
        collectionName: 'a'.repeat(33),
      });

      expect(() => {
        const errors = longNameCollection.node.validate();
        if (errors.length > 0) {
          throw new Error(errors[0]);
        }
      }).toThrow(/Collection name must be between 3 and 32 characters/);
    });

    test('Should validate collection name characters', () => {
      const invalidCharsCollection = new VectorCollection(stack, 'TestInvalidChars', {
        collectionName: 'Invalid_Name',
      });

      expect(() => {
        const errors = invalidCharsCollection.node.validate();
        if (errors.length > 0) {
          throw new Error(errors[0]);
        }
      }).toThrow(/Collection name must contain only lowercase letters, numbers, and hyphens/);
    });

    test('Should use default values when props are not provided', () => {
      // Create a fresh app and stack for this test to avoid validation errors from other tests
      const app = new cdk.App();
      const testStack = new cdk.Stack(app, 'test-defaults-stack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      const defaultVector = new VectorCollection(testStack, 'TestDefaultsVector');

      expect(defaultVector.standbyReplicas).toBe(VectorCollectionStandbyReplicas.ENABLED);
      expect(defaultVector.collectionName).toMatch(/^vectorstore[a-z0-9]+$/);

      const template = Template.fromStack(testStack);

      template.hasResourceProperties('AWS::OpenSearchServerless::Collection', {
        Type: 'VECTORSEARCH',
        StandbyReplicas: 'ENABLED',
      });

      // Verify security policies are created
      template.resourceCountIs('AWS::OpenSearchServerless::SecurityPolicy', 2);
      template.hasResourceProperties('AWS::OpenSearchServerless::SecurityPolicy', {
        Type: 'network',
      });
      template.hasResourceProperties('AWS::OpenSearchServerless::SecurityPolicy', {
        Type: 'encryption',
      });
    });
  });

  describe('Alarms and Metrics', () => {
    let app: cdk.App;
    let stack: cdk.Stack;

    beforeEach(() => {
      app = new cdk.App();
      cdk.Aspects.of(app).add(new AwsSolutionsChecks());
      stack = new cdk.Stack(app, 'test-stack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      app.synth();
    });

    test('Should create static metrics with correct properties', () => {
      const customMetric = VectorCollection.metricAll('CustomMetric', {
        statistic: 'Maximum',
        period: cdk.Duration.minutes(5),
      });

      expect(customMetric.namespace).toBe('AWS/AOSS');
      expect(customMetric.metricName).toBe('CustomMetric');
      expect(customMetric.statistic).toBe('Maximum');
      expect(customMetric.period!.toMinutes()).toBe(5);

      const searchRequestMetric = VectorCollection.metricAllSearchRequestCount({
        period: cdk.Duration.minutes(1),
      });

      expect(searchRequestMetric.namespace).toBe('AWS/AOSS');
      expect(searchRequestMetric.metricName).toBe('SearchRequestCount');
      expect(searchRequestMetric.statistic).toBe('Sum');
      expect(searchRequestMetric.period!.toMinutes()).toBe(1);

      const indexRequestMetric = VectorCollection.metricAllIndexRequestCount({
        period: cdk.Duration.minutes(1),
      });

      expect(indexRequestMetric.namespace).toBe('AWS/AOSS');
      expect(indexRequestMetric.metricName).toBe('IndexRequestCount');
      expect(indexRequestMetric.statistic).toBe('Sum');
      expect(indexRequestMetric.period!.toMinutes()).toBe(1);

      const searchLatencyMetric = VectorCollection.metricAllSearchLatency({
        period: cdk.Duration.minutes(1),
      });

      expect(searchLatencyMetric.namespace).toBe('AWS/AOSS');
      expect(searchLatencyMetric.metricName).toBe('SearchLatency');
      expect(searchLatencyMetric.statistic).toBe('Average');
      expect(searchLatencyMetric.period!.toMinutes()).toBe(1);
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });
});

describe('OpenSearch Serverless optional props', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('Basic Creation with type TIMESERIES', () => {

    const collectionName = 'test-aoss-collection';
    const standbyReplicas = VectorCollectionStandbyReplicas.DISABLED;
    const collectionType = VectorCollectionType.TIMESERIES;

    new VectorCollection(stack, 'test-aoss-vector', {
      collectionName: collectionName,
      standbyReplicas: standbyReplicas,
      description: 'Test description',
      collectionType: collectionType,
      tags: [{ key: 'test-key', value: 'test-value' }],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::OpenSearchServerless::Collection', {
      StandbyReplicas: 'DISABLED',
      Description: 'Test description',
      Tags: [
        {
          Key: 'Name', // added by the construct
          Value: collectionName,
        },
        {
          Key: 'test-key', // custom added
          Value: 'test-value',
        },
        {
          Key: 'Type', // added by the construct
          Value: 'VectorCollection',
        },
      ],
      Type: 'TIMESERIES',
    });
  });

  test('Basic Creation with type SEARCH', () => {

    const collectionName = 'test-aoss-collection';
    const standbyReplicas = VectorCollectionStandbyReplicas.ENABLED;
    const collectionType = VectorCollectionType.SEARCH;

    new VectorCollection(stack, 'test-aoss-vector', {
      collectionName: collectionName,
      standbyReplicas: standbyReplicas,
      collectionType: collectionType,
      tags: [{ key: 'test-key', value: 'test-value' }],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::OpenSearchServerless::Collection', {
      StandbyReplicas: 'ENABLED',
      Description: Match.absent(),
      Tags: [
        {
          Key: 'Name', // added by the construct
          Value: collectionName,
        },
        {
          Key: 'test-key', // custom added
          Value: 'test-value',
        },
        {
          Key: 'Type', // added by the construct
          Value: 'VectorCollection',
        },
      ],
      Type: 'SEARCH',
    });
  });
});