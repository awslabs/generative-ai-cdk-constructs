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
import { Template } from 'aws-cdk-lib/assertions';
import {
  Dashboard,
} from 'aws-cdk-lib/aws-cloudwatch';
import { AwsSolutionsChecks } from 'cdk-nag';
import {
  BedrockCwDashboard,
} from '../../../../src/patterns/gen-ai/aws-bedrock-cw-dashboard';

describe('CloudWatch Dashboard with default settings', () => {
  let app: cdk.App;
  let cwDsTestTemplate: Template;
  let cwDsTestConstruct: BedrockCwDashboard;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const bdDshTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    cwDsTestConstruct = new BedrockCwDashboard(bdDshTestStack, 'test', {});
    cwDsTestTemplate = Template.fromStack(bdDshTestStack);
  });

  test('Dashboard is not null', () => {
    expect(cwDsTestConstruct.dashboard).not.toBeNull();
  });

  test('Dashboard count', () => {
    cwDsTestTemplate.resourceCountIs('AWS::CloudWatch::Dashboard', 1);
  });
});

describe('CloudWatch Dashboard with one model monitored', () => {
  let app: cdk.App;
  let cwDsTestTemplate: Template;
  let cwDsTestConstruct: BedrockCwDashboard;
  let modelName: string;
  let modelId: string;
  let defaultDashboardName: string;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const bdDshTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    modelName = 'claude3haiku';
    modelId = 'anthropic.claude-3-haiku-20240307-v1:0';
    defaultDashboardName = 'BedrockMetricsDashboard';

    cwDsTestConstruct = new BedrockCwDashboard(bdDshTestStack, 'test', {});
    cwDsTestConstruct.addModelMonitoring(
      modelName,
      modelId,
      {},
    );
    cwDsTestTemplate = Template.fromStack(bdDshTestStack);
  });

  test('Dashboard is not null', () => {
    expect(cwDsTestConstruct.dashboard).not.toBeNull();
  });

  test('Dashboard count', () => {
    cwDsTestTemplate.resourceCountIs('AWS::CloudWatch::Dashboard', 1);
  });

  test('Dashboard Properties', () => {
    cwDsTestTemplate.hasResourceProperties('AWS::CloudWatch::Dashboard', {
      DashboardName: defaultDashboardName,
    });
  });
});

describe('CloudWatch Dashboard with existing dashboard', () => {
  let app: cdk.App;
  let cwDsTestTemplate: Template;
  let cwDsTestConstruct: BedrockCwDashboard;
  let dashboardName: string;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const bdDshTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    dashboardName = 'mydashboardname';

    const existingDashboard = new Dashboard(bdDshTestStack, 'mydashboard', {
      dashboardName: dashboardName,
    });

    cwDsTestConstruct = new BedrockCwDashboard(bdDshTestStack, 'test', {
      existingDashboard: existingDashboard,
    });
    cwDsTestTemplate = Template.fromStack(bdDshTestStack);
  });

  test('Dashboard is not null', () => {
    expect(cwDsTestConstruct.dashboard).not.toBeNull();
  });

  test('Dashboard count', () => {
    cwDsTestTemplate.resourceCountIs('AWS::CloudWatch::Dashboard', 1);
  });

  test('Dashboard Properties', () => {
    cwDsTestTemplate.hasResourceProperties('AWS::CloudWatch::Dashboard', {
      DashboardName: dashboardName,
    });
  });
});
