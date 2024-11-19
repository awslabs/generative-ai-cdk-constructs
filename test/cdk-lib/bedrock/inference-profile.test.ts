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
import { Match, Template } from 'aws-cdk-lib/assertions';
import { CfnApplicationInferenceProfile } from 'aws-cdk-lib/aws-bedrock';
import { AwsSolutionsChecks } from 'cdk-nag';
import * as bedrock from '../../../src/cdk-lib/bedrock';

describe('CDK-Created-Cross-Region-Inference-Profile', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('Basic Creation', () => {
    const cris = bedrock.CrossRegionInferenceProfile.fromConfig({
      geoRegion: bedrock.CrossRegionInferenceProfileRegion.EU,
      model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
    });

    expect(cris.inferenceProfileArn).toBe('cew2pa5r8hog');
  });

  test('Basic Creation with a system defined inference profile', () => {
    new bedrock.ApplicationInferenceProfile(stack, 'TestAIPSystem', {
      inferenceProfileName: 'TestAIPSystem',
      modelSource: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::ApplicationInferenceProfile', {
      InferenceProfileName: 'TestAIPSystem',
      Description: Match.absent(),
      ModelSource: {
        CopyFrom: 'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20241022-v2:0',
      },
    });
  });

  test('Basic Creation', () => {
    new bedrock.ApplicationInferenceProfile(stack, 'TestAIPSystem', {
      inferenceProfileName: 'TestAIPSystem',
      modelSource: bedrock.CrossRegionInferenceProfile.fromConfig({
        model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0,
        geoRegion: bedrock.CrossRegionInferenceProfileRegion.EU,
      }),
      tags: [{ key: 'project', value: 'test' }],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::ApplicationInferenceProfile', {
      InferenceProfileName: 'TestAIPSystem',
      Description: Match.absent(),
      ModelSource: {
        CopyFrom: 'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20241022-v2:0',
      },
    });
  });
});

describe('CDK-Created-Application-Inference-Profile', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('Basic Creation with a foundation model', () => {
    new bedrock.ApplicationInferenceProfile(stack, 'TestAIP', {
      inferenceProfileName: 'TestAIP',
      description: 'This is a test application inf profile',
      modelSource: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
      tags: [{ key: 'test-key', value: 'test-value' }],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::ApplicationInferenceProfile', {
      InferenceProfileName: 'TestAIP',
      Description: 'This is a test application inf profile',
      ModelSource: {
        CopyFrom: {
          'Fn::Join': [
            '',
            [
              'arn:aws:bedrock:',
              {
                Ref: 'AWS::Region',
              },
              '::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0',
            ],
          ],
        },
      },
      Tags: [
        {
          Key: 'test-key',
          Value: 'test-value',
        },
      ],
    });
  });

  test('Basic Creation with a system defined inference profile', () => {
    new bedrock.ApplicationInferenceProfile(stack, 'TestAIPSystem', {
      inferenceProfileName: 'TestAIPSystem',
      modelSource: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::ApplicationInferenceProfile', {
      InferenceProfileName: 'TestAIPSystem',
      Description: Match.absent(),
      ModelSource: {
        CopyFrom: 'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20241022-v2:0',
      },
    });
  });

  test('Basic Creation', () => {
    new bedrock.ApplicationInferenceProfile(stack, 'TestAIPSystem', {
      inferenceProfileName: 'TestAIPSystem',
      modelSource: bedrock.CrossRegionInferenceProfile.fromConfig({
        model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0,
        geoRegion: bedrock.CrossRegionInferenceProfileRegion.EU,
      }),
      tags: [{ key: 'project', value: 'test' }],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::ApplicationInferenceProfile', {
      InferenceProfileName: 'TestAIPSystem',
      Description: Match.absent(),
      ModelSource: {
        CopyFrom: 'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20241022-v2:0',
      },
    });
  });
});

describe('Imported-ApplicationInferenceProfile', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'TestStack2', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
  });

  test('Basic Import - from attributes', () => {
    const aip = bedrock.ApplicationInferenceProfile.fromApplicationInferenceProfileAttributes(stack, 'TestAIP', {
      inferenceProfileArn: 'arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/cew2pa5r8hog',
      inferenceProfileIdentifier: 'arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/cew2pa5r8hog',
    });

    expect(aip.inferenceProfileArn).toBe(
      'arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/cew2pa5r8hog',
    );
    expect(aip.inferenceProfileId).toBe('cew2pa5r8hog');
  });

  test('Basic Import - from cfn', () => {
    const cfnapp = new CfnApplicationInferenceProfile(stack, 'mytest', {
      inferenceProfileName: 'mytest',
      modelSource: {
        copyFrom: 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0',
      },
    });

    const aip2 = bedrock.ApplicationInferenceProfile.fromCfnApplicationInferenceProfile(cfnapp);

    expect(aip2.inferenceProfileArn).toBe(cfnapp.attrInferenceProfileArn);
    expect(aip2.inferenceProfileId).toBe(cfnapp.attrInferenceProfileId);
  });
});
