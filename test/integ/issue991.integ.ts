import * as cdk from 'aws-cdk-lib';
import * as integ from '@aws-cdk/integ-tests-alpha';
import {
  BedrockFoundationModel,
  CrossRegionInferenceProfile,
  CrossRegionInferenceProfileRegion,
  Agent,
} from '../../src/cdk-lib/bedrock';

class TestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const modelId = 'anthropic.claude-3-7-sonnet-20250219-v1:0';
    const model = BedrockFoundationModel.fromCdkFoundationModelId(
      { modelId: modelId },
      {
        supportsAgents: true,
        supportsCrossRegion: true,
      }
    );

    const inferenceProfile = CrossRegionInferenceProfile.fromConfig({
      geoRegion: CrossRegionInferenceProfileRegion.US,
      model: model,
    });

    new Agent(this, 'Agent', {
      name: 'test-agent-claude37',
      instruction: "You're a nice agent saying Konnichiwa in Hiragana at the start of every interaction",
      description: 'Agent description.',
      foundationModel: inferenceProfile,
      shouldPrepareAgent: true,
    });
  }
}

// Integration test
const app = new cdk.App();
const stack = new TestStack(app, 'Claude37Test', {
  env: {
    region: 'us-east-1',
  },
});

new integ.IntegTest(app, 'Claude37Test-Integ', {
  testCases: [stack],
  cdkCommandOptions: {
    deploy: {
      args: {
        rollback: false,
      },
    },
  },
});

app.synth();
