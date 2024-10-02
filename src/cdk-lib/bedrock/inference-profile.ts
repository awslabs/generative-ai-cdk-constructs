import { Arn, ArnFormat, Stack } from "aws-cdk-lib";
import {
  BedrockFoundationModel,
  BedrockInvokableModelType,
  IInvokableModel,
} from "./models";
import { IConstruct } from "constructs";

export enum InferenceProfileRegion {
  /**
   * EU: Frankfurt (eu-central-1), Ireland (eu-west-1), Paris (eu-west-3)
   */
  EU = "eu",
  /**
   * US: N. Virginia (us-east-1), Oregon (us-west-2)
   */
  US = "us",
}

export interface InferenceProfileProps {
  /**
   * The geo region where the traffic is going to be distributed.
   */
  readonly region: InferenceProfileRegion;
  /**
   * A model supporting cross-region inference.
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference-support.html
   */
  readonly model: BedrockFoundationModel;
}

/**
 * Represents an inference profile.
 * NOTE: You must have enabled the model in all the regions
 */
export class InferenceProfile implements IInvokableModel {
  /**
   * @example 'us.anthropic.claude-3-5-sonnet-20240620-v1:0'
   */
  public readonly modelId: string;
  public readonly modelType: BedrockInvokableModelType;
  public readonly supportsAgents: boolean;
  public readonly supportsKnowledgeBase: boolean;
  public readonly region: InferenceProfileRegion;
  public readonly supportsDataParsing: boolean;

  constructor(props: InferenceProfileProps) {
    // Check if inference profile is supported.
    if (!props.model.supportsInferenceProfile) {
      throw new Error(
        `Selected model ${props.model.modelId} does not support inference profiles.`
      );
    }
    this.modelId = `${props.region}.${props.model.modelId}`;
    this.modelType = BedrockInvokableModelType.INFERENCE_PROFILE;
    this.region = props.region;
    this.supportsAgents = props.model.supportsAgents;
    this.supportsKnowledgeBase = props.model.supportsKnowledgeBase;
    this.supportsDataParsing = props.model.supportsDataParsing;
  }

  /**
   * Returns the ARN of the inference profile.
   * @example 'arn:aws:bedrock:us-east-1:123456789012:inference-profile/us.anthropic.claude-3-5-sonnet-20240620-v1:0'
   */
  asArn(scope: IConstruct): string {
    return Arn.format(
      {
        service: "bedrock",
        resource: "inference-profile",
        resourceName: this.modelId,
        arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
      },
      Stack.of(scope)
    );
  }
}
