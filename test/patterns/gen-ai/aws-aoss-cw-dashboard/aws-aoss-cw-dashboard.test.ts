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
  AossCwDashboard,
} from '../../../../src/patterns/gen-ai/aws-aoss-cw-dashboard';

describe('CloudWatch Aoss Dashboard with default settings', () => {
  let app: cdk.App;
  let cwDsTestTemplate: Template;
  let cwDsTestConstruct: AossCwDashboard;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const aossDshTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    cwDsTestConstruct = new AossCwDashboard(aossDshTestStack, 'test', {});
    cwDsTestTemplate = Template.fromStack(aossDshTestStack);
  });

  test('Dashboard is not null', () => {
    expect(cwDsTestConstruct.dashboard).not.toBeNull();
  });

  test('Dashboard count', () => {
    cwDsTestTemplate.resourceCountIs('AWS::CloudWatch::Dashboard', 1);
  });
});

describe('CloudWatch Aoss Dashboard with one collection monitored', () => {
  let app: cdk.App;
  let cwDsTestTemplate: Template;
  let cwDsTestConstruct: AossCwDashboard;
  let collectionName: string;
  let collectionId: string;
  let defaultDashboardName: string;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const aossDshTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    collectionName = 'mycollection';
    collectionId = 'mycollectionid';
    defaultDashboardName = 'AossMetricsDashboard';

    cwDsTestConstruct = new AossCwDashboard(aossDshTestStack, 'test', {});
    cwDsTestConstruct.addCollectionMonitoringbyAttributes(
      collectionName,
      collectionId,
      {},
    );
    cwDsTestTemplate = Template.fromStack(aossDshTestStack);
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

describe('CloudWatch Aoss Dashboard with existing dashboard', () => {
  let app: cdk.App;
  let cwDsTestTemplate: Template;
  let cwDsTestConstruct: AossCwDashboard;
  let dashboardName: string;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const aossDshTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    dashboardName = 'mydashboardname';

    const existingDashboard = new Dashboard(aossDshTestStack, 'mydashboard', {
      dashboardName: dashboardName,
    });

    cwDsTestConstruct = new AossCwDashboard(aossDshTestStack, 'test', {
      existingDashboard: existingDashboard,
    });
    cwDsTestTemplate = Template.fromStack(aossDshTestStack);
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
