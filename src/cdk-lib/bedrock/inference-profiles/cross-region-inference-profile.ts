import { Arn, ArnFormat, Aws } from "aws-cdk-lib";
import { BedrockFoundationModel, IInvokable } from "../models";
import { IInferenceProfile, InferenceProfileType } from "./common";
import { Grant, IGrantable } from "aws-cdk-lib/aws-iam";

export enum CrossRegionInferenceProfileRegion {
  /**
   * EU: Frankfurt (eu-central-1), Ireland (eu-west-1), Paris (eu-west-3)
   */
  EU = "eu",
  /**
   * US: N. Virginia (us-east-1), Oregon (us-west-2)
   */
  US = "us",
  /**
   * This might include: ap-northeast-1, ap-northeast-2, ap-south-1, ap-southeast-1, and ap-southeast-2
   */
  APAC = "apac",
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
export interface CrossRegionInferenceProfileProps {
  /**
   * The geographic region where the traffic is going to be distributed. Routing
   * factors in user traffic, demand and utilization of resources.
   */
  readonly geoRegion: CrossRegionInferenceProfileRegion;
  /**
   * A model supporting cross-region inference.
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference-support.html
   */
  readonly model: BedrockFoundationModel;
}

/******************************************************************************
 *                        NEW CONSTRUCT DEFINITION
 *****************************************************************************/
/**
 * Cross-region inference enables you to seamlessly manage unplanned traffic
 * bursts by utilizing compute across different AWS Regions. With cross-region
 * inference, you can distribute traffic across multiple AWS Regions, enabling
 * higher throughput and enhanced resilience during periods of peak demands.
 * @see https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html
 */
export class CrossRegionInferenceProfile implements IInvokable, IInferenceProfile {
  public static fromConfig(config: CrossRegionInferenceProfileProps): CrossRegionInferenceProfile {
    return new CrossRegionInferenceProfile(config);
  }
  /**
   * @example 'us.anthropic.claude-3-5-sonnet-20240620-v1:0'
   */
  public readonly inferenceProfileId: string;
  /**
   * @example 'arn:aws:bedrock:us-east-1:123456789012:inference-profile/us.anthropic.claude-3-5-sonnet-20240620-v1:0'
   */
  public readonly inferenceProfileArn: string;
  public readonly type: InferenceProfileType;
  public readonly inferenceProfileModel: BedrockFoundationModel;
  /** This equals to the inferenceProfileArn property, useful just to implement IInvokable interface*/
  public readonly invokableArn: string;

  private constructor(props: CrossRegionInferenceProfileProps) {
    if (!props.model.supportsCrossRegion) {
      throw new Error(`Model ${props.model.modelId} does not support cross-region inference`);
    }
    this.type = InferenceProfileType.SYSTEM_DEFINED;
    this.inferenceProfileModel = props.model;
    this.inferenceProfileId = `${props.geoRegion}.${props.model.modelId}`;
    this.inferenceProfileArn = Arn.format({
      partition: Aws.PARTITION,
      service: "bedrock",
      account: Aws.ACCOUNT_ID,
      region: Aws.REGION,
      resource: "inference-profile",
      resourceName: this.inferenceProfileId,
      arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
    });
    // Needed to Implement IInvokable
    this.invokableArn = this.inferenceProfileArn;
  }
  /**
   * Grants appropriate permissions to use the cross-region inference profile.
   * Does not grant permissions to use the model in the profile.
   */
  grantProfileUsage(grantee: IGrantable): Grant {
    const grant = Grant.addToPrincipal({
      grantee: grantee,
      actions: ["bedrock:GetInferenceProfile", "bedrock:ListInferenceProfiles"],
      resourceArns: [this.inferenceProfileArn],
    });
    return grant;
  }
}
