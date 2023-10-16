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
import { aws_appsync as appsync } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  SummarizationAppsyncStepfn,
  SummarizationAppsyncStepfnProps,
} from '../../../../src/patterns/gen-ai/aws-summarization-appsync-stepfn';


describe('Summarization Appsync Stepfn construct', () => {

  // pass it from console


  test('Summarization Appsync Stepfn', () => {

    const testStack = new cdk.Stack(undefined, undefined, {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });

    const cognitoPoolId = 'us-east-1_1RVagE46n';

    const mergedapiRole = new iam.Role(
      testStack, 'summaryMergedapirole',
      {
        assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
      },
    );
    const mergedapi = new appsync.CfnGraphQLApi(
      testStack, 'summaryMergedapi',
      {
        apiType: 'MERGED',
        name: 'summaryMergedapi',
        authenticationType: 'AMAZON_COGNITO_USER_POOLS',
        userPoolConfig: {
          awsRegion: cdk.Aws.REGION,
          userPoolId: cognitoPoolId,
          defaultAction: 'ALLOW',
        },
        additionalAuthenticationProviders: [{
          authenticationType: 'AWS_IAM',
        }],

        mergedApiExecutionRoleArn: mergedapiRole.roleArn,
      },
    );


    const props: SummarizationAppsyncStepfnProps = {
      userPoolId: cognitoPoolId,
      existingMergeApi: mergedapi,

    };
    new SummarizationAppsyncStepfn(testStack, 'test-one', props);

    const monitorTemplate = Template.fromStack(testStack);

    monitorTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: 'summary_input_validator-dev',

    });
    monitorTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: 'summary_document_reader-dev',

    });
    monitorTemplate.hasResourceProperties('AWS::Lambda::Function', {
      PackageType: 'Image',
      FunctionName: 'summary_generator-dev',

    });


  });

});

// test('Simple test', () => {
//     const app = new cdk.App();
//     const stack = new cdk.Stack(app, 'TestStack');

//     new SummarizationAppsyncStepfn

//     expectCDK(stack).to(countResources('AWS::Lambda::Function', 5));
//   });