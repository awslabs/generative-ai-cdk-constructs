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
import * as bedrock from 'aws-cdk-lib/aws-bedrock';
import { Construct } from 'constructs';

export interface ApplicationInferenceProfileProps {
  /**
     * Description of the inference profile.
     * @see http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-applicationinferenceprofile.html#cfn-bedrock-applicationinferenceprofile-description
     */
  readonly description?: string;
  /**
     * The name of the inference profile.
     * @see http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-applicationinferenceprofile.html#cfn-bedrock-applicationinferenceprofile-inferenceprofilename
     */
  readonly inferenceProfileName: string;
  /**
     * To create an application inference profile for one Region, specify a foundation model.
     * Usage and costs for requests made to that Region with that model will be tracked.
     *
     * To create an application inference profile for multiple Regions,
     * specify a cross region (system-defined) inference profile.
     * The inference profile will route requests to the Regions defined in
     * the cross region (system-defined) inference profile that you choose.
     * Usage and costs for requests made to the Regions in the inference profile will be tracked.
     */
  readonly modelSource: string;
}

/**
 * Creates an application inference profile.
 *
 * These are inference profiles created by users (user defined).
 * This helps to track costs and model usage.
 * @resource AWS::Bedrock::ApplicationInferenceProfile
 * @see https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-create.html
 */
export class ApplicationInferenceProfile extends Construct {
  /**
     * The ARN of the application inference profile.
     */
  public readonly inferenceProfileArn: string;

  /**
     * The ARN of the application inference profile.
     */
  public readonly inferenceProfileId: string;

  /**
     * The unique identifier of the inference profile.
     */
  public readonly inferenceProfileIdentifier: string;

  /**
     * The status of the inference profile. ACTIVE means that the inference profile is ready to be used.
     */
  public readonly status: string;

  /**
     * The type of the inference profile. The following types are possible:
     * SYSTEM_DEFINED – The inference profile is defined by Amazon Bedrock.
     * You can route inference requests across regions with these inference profiles.
     * APPLICATION – The inference profile was created by a user.
     * This type of inference profile can track metrics and costs when invoking the model in it.
     * The inference profile may route requests to one or multiple regions.
     */
  public readonly type: string;

  /**
     * Instance of CfnApplicationInferenceProfile.
     */
  private readonly _resource: bedrock.CfnApplicationInferenceProfile;

  constructor(scope: Construct, id: string, props: ApplicationInferenceProfileProps) {
    super(scope, id);

    // L1 instantiation
    this._resource = new bedrock.CfnApplicationInferenceProfile(this, id, {
      description: props.description,
      inferenceProfileName: props.inferenceProfileName,
      modelSource: {
        copyFrom: props.modelSource,
      },
    });

    this.inferenceProfileArn = this._resource.attrInferenceProfileArn;
    this.inferenceProfileId = this._resource.attrInferenceProfileId;
    this.inferenceProfileIdentifier = this._resource.attrInferenceProfileIdentifier;
    this.status = this._resource.attrStatus;
    this.type = this._resource.attrType;
  }

}