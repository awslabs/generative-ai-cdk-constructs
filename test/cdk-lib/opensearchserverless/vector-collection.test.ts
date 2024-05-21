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
import { VectorCollection, VectorCollectionStandbyReplicas } from '../../../src/cdk-lib/opensearchserverless';


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
});
