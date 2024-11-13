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
import { IResource, Resource, CfnTag } from 'aws-cdk-lib';
import * as bedrock from 'aws-cdk-lib/aws-bedrock';
import { Construct } from 'constructs';

/******************************************************************************
 *                              COMMON
 *****************************************************************************/
/**
 * Represents a ApplicationInferenceProfile, either created with CDK or imported.
 */
export interface IApplicationInferenceProfile extends IResource {
  /**
   * The ARN of the application inference profile.
   */
  readonly inferenceProfileArn: string;
  /**
     * The unique identifier of the inference profile.
     */
  readonly inferenceProfileId: string;
  /**
     * The ID or Amazon Resource Name (ARN) of the inference profile.
     */
  readonly inferenceProfileIdentifier: string;
}

/**
 * Abstract base class for a ApplicationInferenceProfile.
 * Contains methods and attributes valid for ApplicationInferenceProfiles either created with CDK or imported.
 */
export abstract class ApplicationInferenceProfileBase extends Resource implements IApplicationInferenceProfile {
  /**
   * The ARN of the application inference profile.
   */
  public abstract readonly inferenceProfileArn: string;
  /**
     * The unique identifier of the inference profile.
     */
  public abstract readonly inferenceProfileId: string;
  /**
     * The ID or Amazon Resource Name (ARN) of the inference profile.
     */
  public abstract readonly inferenceProfileIdentifier: string;
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a ApplicationInferenceProfile.
 */
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
  /**
   * A list of tags associated with the inference profile.
   * */
  readonly tags?: Array<CfnTag>;
}

/******************************************************************************
 *                      ATTRS FOR IMPORTED CONSTRUCT
 *****************************************************************************/
export interface ApplicationInferenceApplicationAttributes {
  /**
   * The ARN of the application inference profile.
   */
  readonly inferenceProfileArn: string;
  /**
     * The unique identifier of the inference profile.
     */
  readonly inferenceProfileId: string;
  /**
     * The ID or Amazon Resource Name (ARN) of the inference profile.
     */
  readonly inferenceProfileIdentifier: string;
}

/******************************************************************************
 *                        NEW CONSTRUCT DEFINITION
 *****************************************************************************/
/**
 * Class to create a ApplicationInferenceProfile with CDK.
 * These are inference profiles created by users (user defined).
 * This helps to track costs and model usage.
 * @resource AWS::Bedrock::ApplicationInferenceProfile
 * @see https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-create.html
 */
export class ApplicationInferenceProfile extends ApplicationInferenceProfileBase {
  /**
   * Import a ApplicationInferenceProfile given its attributes
   */
  public static fromApplicationInferenceProfileAttributes(
    scope: Construct,
    id: string,
    attrs: ApplicationInferenceApplicationAttributes,
  ): IApplicationInferenceProfile {
    class Import extends ApplicationInferenceProfileBase {
      public readonly inferenceProfileArn = attrs.inferenceProfileArn;
      public readonly inferenceProfileId = attrs.inferenceProfileId;
      public readonly inferenceProfileIdentifier = attrs.inferenceProfileIdentifier;
    }

    return new Import(scope, id);
  }
  /**
  * Import a low-level L1 Cfn ApplicationInferenceProfile
  */
  public static fromCfnApplicationInferenceProfile(
    CfnApplicationInferenceProfile: bedrock.CfnApplicationInferenceProfile,
  ): IApplicationInferenceProfile {
    return new (class extends ApplicationInferenceProfileBase {
      public readonly inferenceProfileArn = CfnApplicationInferenceProfile.attrInferenceProfileArn;
      public readonly inferenceProfileId = CfnApplicationInferenceProfile.attrInferenceProfileId;
      public readonly inferenceProfileIdentifier = CfnApplicationInferenceProfile.attrInferenceProfileIdentifier;
    })(CfnApplicationInferenceProfile, '@FromCfnApplicationInferenceProfile');
  }
  /**
     * The ARN of the application inference profile.
     */
  public readonly inferenceProfileArn: string;
  /**
     * The unique identifier of the inference profile.
     */
  public readonly inferenceProfileId: string;
  /**
     * The ID or Amazon Resource Name (ARN) of the inference profile.
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
       * Time Stamp for ApplicationInferenceProfile creation.
       */
  public readonly createdAt: string;
  /**
       * Time Stamp for ApplicationInferenceProfile update.
       */
  public readonly updatedAt: string;
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
      tags: props.tags,
    });

    // build attributes
    this.inferenceProfileArn = this._resource.attrInferenceProfileArn;
    this.inferenceProfileId = this._resource.attrInferenceProfileId;
    this.inferenceProfileIdentifier = this._resource.attrInferenceProfileIdentifier;
    this.status = this._resource.attrStatus;
    this.type = this._resource.attrType;
    this.createdAt = this._resource.attrCreatedAt;
    this.updatedAt = this._resource.attrUpdatedAt;
  }
}