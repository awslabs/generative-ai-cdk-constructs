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


import { CfnTag, aws_bedrock as bedrock } from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

import { ContentPolicyConfig, ContentPolicyConfigProps } from './content-policy';
import { SensitiveInformationPolicyConfig, SensitiveInformationPolicyConfigProps } from './pii-list';
import { Topic } from './topic-list';
import { generatePhysicalNameV2 } from '../../common/helpers/utils';


/**
 * Bedrock guardrail props
 */
export interface GuardrailProps {
  /**
   * The message to return when the guardrail blocks a prompt.
   */
  readonly blockedInputMessaging: string;
  /**
   * The message to return when the guardrail blocks a model response.
   */
  readonly blockedOutputsMessaging	: string;
  /**
   * The name of the guardrail.
   */
  readonly name	?: string;

  /**
    * List of content filter configs in content policy.
    */
  readonly filtersConfig?: ContentPolicyConfigProps[];

  /**
    * PII fields which needs to be masked.
    */
  readonly piiConfig?: SensitiveInformationPolicyConfigProps[];

  // /**
  //  *  PII fields which needs to be masked.
  //  */
  // readonly guardrailPiiEntityConfig?: PersonalIdentifiableInformation[];

  // /**
  //  * List of regex.

  //  */
  // readonly guardrailRegexesConfig?: bedrock.CfnGuardrail.RegexConfigProperty;

  /**
   *  Topic policy config for a guardrail.
   */
  // readonly topic?: Topic;

  /**
   *  List of words to filter from prompt and output response.
   */
  readonly wordsFilter?: bedrock.CfnGuardrail.WordConfigProperty[];

  /**
   * The description of the guardrail.
   */
  readonly description?	: string;

  /**
   * The ARN of the AWS KMS key used to encrypt the guardrail.
   */
  readonly kmsKeyArn?	: string;

  /**
   * Metadata that you can assign to a guardrail as key-value pairs
   *
   */
  readonly tags?: Array<CfnTag>;
}

/**
 * Deploy bedrock guardrail .
 */
export class Guardrail extends Construct {

  /**
   * The name of the guardrail.
   */
  public readonly name: string;

  /**
   * The ARN of the AWS KMS key used to encrypt the guardrail.
   *
   * @default
   */
  public readonly kmsKeyArn	: string;


  /**
   * Instance of guardrail
   */
  public readonly guardrailInstance: bedrock.CfnGuardrail;

  constructor(scope: Construct, id: string, props: GuardrailProps) {
    super(scope, id);

    this.name = props.name ?? generatePhysicalNameV2(
      this,
      'bedrock-guardrail',
      { maxLength: 32, lower: true, separator: '-' });

    this.kmsKeyArn = props.kmsKeyArn ?? new kms.Key(scope, `'${id}Key'`, {
      enableKeyRotation: true,
    }).keyArn;

    this.guardrailInstance = new bedrock.CfnGuardrail(this, 'MyGuardrail', {
      blockedInputMessaging: props.blockedInputMessaging,
      blockedOutputsMessaging: props.blockedOutputsMessaging,
      name: this.name,
      description: props.description,
      kmsKeyArn: this.kmsKeyArn,
      contentPolicyConfig: {
        filtersConfig: new ContentPolicyConfig(this, `'CP${id}'`, props.filtersConfig).contentPolicyConfigList,
      },
    });
  }

  public addSensitiveInformationPolicyConfig(
    props: SensitiveInformationPolicyConfigProps[],
    guardrailRegexesConfig : bedrock.CfnGuardrail.RegexConfigProperty) {

    if (props) {
      this.guardrailInstance.sensitiveInformationPolicyConfig=
    {
      piiEntitiesConfig: new SensitiveInformationPolicyConfig(this, 'PII', props).piiConfigList,
      regexesConfig: [guardrailRegexesConfig],
    };
    } else {
      throw new Error('No guardrailPiiEntityConfig or guardrailRegexesConfig is set in GuardrailProps.');

    }
  }


  public addWordcPolicyConfig(props: GuardrailProps) {
    if (props.wordsFilter && props.wordsFilter .length >0 ) {
      this.guardrailInstance.wordPolicyConfig=
    {
      managedWordListsConfig: [{
        type: 'PROFANITY',
      }],
      wordsConfig: props.wordsFilter,
    };
    } else {
      throw new Error('props.wordsFilter is empty or undefined in GuardrailProps.');

    }
  }

  public addTopicPolicyConfig(topic: Topic) {
    if (topic ) {
      this.guardrailInstance.topicPolicyConfig=
    {
      topicsConfig: topic.topicConfigPropertyList(),

    };
    } else {
      throw new Error('topic.topicConfigPropertylist is empty or undefined in GuardrailProps.');

    }
  }
  public addTags(props: GuardrailProps) {
    if (props && props.tags) {
      this.guardrailInstance.tags =props.tags;
    }
  }


}