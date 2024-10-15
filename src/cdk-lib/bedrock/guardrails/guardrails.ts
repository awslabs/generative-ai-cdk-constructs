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

import { Arn, ArnFormat, IResolvable, IResource, Lazy, Resource, Stack } from "aws-cdk-lib";
import { IKey } from "aws-cdk-lib/aws-kms";
import { Construct } from "constructs";
import { md5hash } from "aws-cdk-lib/core/lib/helpers-internal";
import * as bedrock from "aws-cdk-lib/aws-bedrock";
import * as filters from "./guardrail-filters";
import * as fs from "fs";

/******************************************************************************
 *                              COMMON
 *****************************************************************************/
/**
 * Represents a Guardrail, either created with CDK or imported.
 */
export interface IGuardrail extends IResource {
  /**
   * The ARN of the guardrail.
   * @example "arn:aws:bedrock:us-east-1:123456789012:guardrail/yympzo398ipq"
   */
  readonly guardrailArn: string;
  /**
   * The ID of the guardrail.
   * @example "yympzo398ipq"
   */
  readonly guardrailId: string;
}

/**
 * Abstract base class for a Guardrail.
 * Contains methods and attributes valid for Guardrails either created with CDK or imported.
 */
export abstract class GuardrailBase extends Resource implements IGuardrail {
  /**
   * The ARN of the guardrail.
   */
  public abstract readonly guardrailArn: string;
  /**
   * The ID of the guardrail.
   */
  public abstract readonly guardrailId: string;
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a Guardrail.
 */
export interface GuardrailProps {
  /**
   * The name of the guardrail.
   */
  readonly name: string;
  /**
   * The description of the guardrail.
   */
  readonly description?: string;
  /**
   * The message to return when the guardrail blocks a prompt.
   *
   * @default "Sorry, your query violates our usage policy."
   */
  readonly blockedInputMessaging?: string;
  /**
   * The message to return when the guardrail blocks a model response.
   *
   * @default "Sorry, I am unable to answer your question because of our usage policy."
   */
  readonly blockedOutputsMessaging?: string;
  /**
   * A custom KMS key to use for encrypting data.
   *
   * @default "Your data is encrypted by default with a key that AWS owns and manages for you."
   */
  readonly kmsKey?: IKey;
  /**
   * The content filters to apply to the guardrail.
   */
  readonly contentFilters?: filters.ContentFilter[];
  /**
   * Up to 30 denied topics to block user inputs or model responses associated with the topic.
   */
  readonly deniedTopics?: filters.DeniedTopic[];
  /**
   * The word filters to apply to the guardrail.
   */
  readonly wordFilters?: string[];
  /**
   * The managed word filters to apply to the guardrail.
   */
  readonly managedWordListFilters?: filters.ManagedWordFilterType[];
  /**
   * The PII filters to apply to the guardrail.
   */
  readonly piiFilters?: filters.PIIFilter[];
  /**
   * The regular expression (regex) filters to apply to the guardrail.
   */
  readonly regexFilters?: filters.RegexFilter[];
  /**
   * The contextual grounding filters to apply to the guardrail.
   */
  readonly contextualGroundingFilters?: filters.ContextualGroundingFilter[];
}

/******************************************************************************
 *                        NEW CONSTRUCT DEFINITION
 *****************************************************************************/
/**
 * Class to create a Guardrail with CDK.
 */
export class Guardrail extends GuardrailBase {
  /**
   * Import a guardrail given an ARN.
   */
  public static fromGuardrailArn(scope: Construct, id: string, guardrailArn: string): IGuardrail {
    class Import extends GuardrailBase {
      public readonly guardrailArn = guardrailArn;
      public readonly guardrailId = Arn.split(guardrailArn, ArnFormat.SLASH_RESOURCE_NAME).resourceName!;
    }

    return new Import(scope, id);
  }
  /**
   * Import a guardrail given an ID.
   */
  public static fromGuardrailId(scope: Construct, id: string, guardrailId: string): IGuardrail {
    class Import extends GuardrailBase {
      public readonly guardrailId = guardrailId;
      public readonly guardrailArn = Stack.of(scope).formatArn({
        service: "bedrock",
        resource: "guardrail",
        resourceName: guardrailId,
      });
    }

    return new Import(scope, id);
  }

  /**
   * The ARN of the guardrail.
   */
  public readonly guardrailArn: string;
  /**
   * The ID of the guardrail.
   */
  public readonly guardrailId: string;
  /**
   * The name of the guardrail.
   */
  public readonly name: string;
  /**
   * The version of the guardrail.
   * By default, this value will always be `DRAFT` unless an explicit version is created.
   *
   * @default - "DRAFT"
   */
  public guardrailVersion: string;
  /**
   * The KMS key used to encrypt data.
   *
   * @default undefined - "Data is encrypted by default with a key that AWS owns and manages for you"
   */
  public readonly kmsKey?: IKey;
  /**
   * The content filters applied by the guardrail.
   */
  public readonly contentFilters: filters.ContentFilter[];
  /**
   * The PII filters applied by the guardrail.
   */
  public readonly piiFilters: filters.PIIFilter[];
  /**
   * The regex filters applied by the guardrail.
   */
  public readonly regexFilters: filters.RegexFilter[];
  /**
   * The denied topic filters applied by the guardrail.
   */
  public readonly deniedTopics: filters.DeniedTopic[];
  /**
   * The contextual grounding filters applied by the guardrail.
   */
  public readonly contextualGroundingFilters: filters.ContextualGroundingFilter[];
  /**
   * The word filters applied by the guardrail.
   */
  public readonly wordFilters: string[];
  /**
   * The managed word list filters applied by the guardrail.
   */
  public readonly managedWordListFilters: filters.ManagedWordFilterType[];
  /**
   * The computed hash of the guardrail properties.
   */
  public readonly hash: string;
  /**
   * The L1 representation of the guardrail
   */
  private readonly __resource: bedrock.CfnGuardrail;

  constructor(scope: Construct, id: string, props: GuardrailProps) {
    super(scope, id, {
      physicalName: props.name,
    });

    // ------------------------------------------------------
    // Set properties or defaults
    // ------------------------------------------------------
    this.name = this.physicalName;
    this.contentFilters = props.contentFilters ?? [];
    this.piiFilters = props.piiFilters ?? [];
    this.regexFilters = props.regexFilters ?? [];
    this.deniedTopics = props.deniedTopics ?? [];
    this.contextualGroundingFilters = props.contextualGroundingFilters ?? [];
    this.wordFilters = props.wordFilters ?? [];
    this.managedWordListFilters = props.managedWordListFilters ?? [];

    const defaultBlockedInputMessaging = "Sorry, your query violates our usage policy.";
    const defaultBlockedOutputsMessaging = "Sorry, I am unable to answer your question because of our usage policy.";

    // ------------------------------------------------------
    // CFN Props - With Lazy support
    // ------------------------------------------------------
    let cfnProps: bedrock.CfnGuardrailProps = {
      name: this.name,
      description: props.description,
      kmsKeyArn: props.kmsKey?.keyArn,
      blockedInputMessaging: props.blockedInputMessaging ?? defaultBlockedInputMessaging,
      blockedOutputsMessaging: props.blockedOutputsMessaging ?? defaultBlockedOutputsMessaging,
      // Lazy props
      contentPolicyConfig: this.generateCfnContentPolicyConfig(),
      contextualGroundingPolicyConfig: this.generateCfnContextualPolicyConfig(),
      topicPolicyConfig: this.generateCfnTopicPolicy(),
      wordPolicyConfig: this.generateCfnWordPolicyConfig(),
      sensitiveInformationPolicyConfig: this.generateCfnSensitiveInformationPolicyConfig(),
    };

    // Hash calculation useful for versioning of the guardrail
    this.hash = md5hash(JSON.stringify(cfnProps));

    // ------------------------------------------------------
    // L1 Instantiation
    // ------------------------------------------------------
    this.__resource = new bedrock.CfnGuardrail(this, "MyGuardrail", cfnProps);

    this.guardrailId = this.__resource.attrGuardrailId;
    this.guardrailArn = this.__resource.attrGuardrailArn;
    this.guardrailVersion = this.__resource.attrVersion;
  }

  // ------------------------------------------------------
  // METHODS
  // ------------------------------------------------------
  /**
   * Adds a content filter to the guardrail.
   * @param filter The content filter to add.
   */
  public addContentFilter(filter: filters.ContentFilter): void {
    this.contentFilters.push(filter);
  }

  /**
   * Adds a PII filter to the guardrail.
   * @param filter The PII filter to add.
   */
  public addPIIFilter(filter: filters.PIIFilter): void {
    this.piiFilters.push(filter);
  }

  /**
   * Adds a regex filter to the guardrail.
   * @param filter The regex filter to add.
   */
  public addRegexFilter(filter: filters.RegexFilter): void {
    this.regexFilters.push(filter);
  }

  /**
   * Adds a denied topic filter to the guardrail.
   * @param filter The denied topic filter to add.
   */
  public addDeniedTopicFilter(filter: filters.DeniedTopic): void {
    this.deniedTopics.push(filter);
  }

  /**
   * Adds a contextual grounding filter to the guardrail.
   * @param filter The contextual grounding filter to add.
   */
  public addContextualGroundingFilter(filter: filters.ContextualGroundingFilter): void {
    this.contextualGroundingFilters.push(filter);
  }

  /**
   * Adds a word filter to the guardrail.
   * @param filter The word filter to add.
   */
  public addWordFilter(filter: string): void {
    this.wordFilters.push(filter);
  }

  /**
   * Adds a word filter to the guardrail.
   * @param filePath The location of the word filter file.
   */
  public addWordFilterFromFile(filePath: string): void {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const words = fileContents.trim().split(",");
    for (const word of words) this.addWordFilter(word);
  }

  /**
   * Adds a managed word list filter to the guardrail.
   * @param filter The managed word list filter to add.
   */
  public addManagedWordListFilter(filter: filters.ManagedWordFilterType): void {
    this.managedWordListFilters.push(filter);
  }

  /**
   * Create a version for the guardrail.
   * @param description The description of the version.
   * @returns The guardrail version.
   */
  public createVersion(description?: string): string {
    const cfnVersion = new bedrock.CfnGuardrailVersion(this, `GuardrailVersion-${this.hash.slice(0, 16)}`, {
      description: description,
      guardrailIdentifier: this.guardrailId,
    });

    this.guardrailVersion = cfnVersion.attrVersion;
    return this.guardrailVersion;
  }

  // ------------------------------------------------------
  // CFN Generators
  // ------------------------------------------------------
  /**
   * Returns the content filters applied to the guardrail. This method defers the computation
   * to synth time.
   */
  private generateCfnContentPolicyConfig(): IResolvable {
    return Lazy.any({
      produce: () => {
        if (this.contentFilters.length > 0) {
          return { filtersConfig: this.contentFilters } as bedrock.CfnGuardrail.ContentPolicyConfigProperty;
        } else {
          return undefined;
        }
      },
    });
  }

  /**
   * Returns the topic filters applied to the guardrail. This method defers the computation
   * to synth time.
   */
  private generateCfnTopicPolicy(): IResolvable {
    return Lazy.any({
      produce: () => {
        if (this.deniedTopics.length > 0) {
          return {
            topicsConfig: this.deniedTopics.flatMap((topic: filters.DeniedTopic) => {
              return {
                definition: topic.definition,
                name: topic.name,
                examples: topic.examples,
                type: "DENY",
              } as bedrock.CfnGuardrail.TopicConfigProperty;
            }),
          };
        } else {
          return undefined;
        }
      },
    });
  }

  /**
   * Returns the contectual filters applied to the guardrail. This method defers the computation
   * to synth time.
   */
  private generateCfnContextualPolicyConfig(): IResolvable {
    return Lazy.any({
      produce: () => {
        if (this.contextualGroundingFilters.length > 0) {
          return {
            filtersConfig: this.contextualGroundingFilters.flatMap((filter: filters.ContextualGroundingFilter) => {
              return {
                type: filter.type,
                threshold: filter.threshold,
              } as bedrock.CfnGuardrail.ContextualGroundingFilterConfigProperty;
            }),
          };
        } else {
          return undefined;
        }
      },
    });
  }

  /**
   * Returns the word config applied to the guardrail. This method defers the computation
   * to synth time.
   */
  private generateCfnWordPolicyConfig(): IResolvable {
    return Lazy.any({
      produce: () => {
        if (this.wordFilters.length > 0 || this.managedWordListFilters.length > 0) {
          return {
            wordsConfig: this.generateCfnWordConfig(),
            managedWordListsConfig: this.generateCfnManagedWordListsConfig(),
          } as bedrock.CfnGuardrail.WordPolicyConfigProperty;
        } else {
          return undefined;
        }
      },
    });
  }

  /**
   * Returns the word filters applied to the guardrail. This method defers the computation
   * to synth time.
   */
  private generateCfnWordConfig(): IResolvable {
    return Lazy.any(
      {
        produce: () => {
          return this.wordFilters.flatMap((word: string) => {
            return {
              text: word,
            } as bedrock.CfnGuardrail.WordConfigProperty;
          });
        },
      },
      { omitEmptyArray: true }
    );
  }

  /**
   * Returns the word filters applied to the guardrail. This method defers the computation
   * to synth time.
   */
  private generateCfnManagedWordListsConfig(): IResolvable {
    return Lazy.any(
      {
        produce: () => {
          return this.managedWordListFilters.flatMap((filter: filters.ManagedWordFilterType) => {
            return {
              type: filter.toString(),
            } as bedrock.CfnGuardrail.ManagedWordsConfigProperty;
          });
        },
      },
      { omitEmptyArray: true }
    );
  }

  /**
   * Returns the sensitive information config applied to the guardrail. This method defers the computation
   * to synth time.
   */
  private generateCfnSensitiveInformationPolicyConfig(): IResolvable {
    return Lazy.any(
      {
        produce: () => {
          if (this.regexFilters.length > 0 || this.piiFilters.length > 0) {
            return {
              regexesConfig: this.generateCfnRegexesConfig(),
              piiEntitiesConfig: this.generateCfnPiiEntitiesConfig(),
            };
          } else {
            return undefined;
          }
        },
      },
      { omitEmptyArray: true }
    );
  }

  /**
   * Returns the regex filters applied to the guardrail. This method defers the computation
   * to synth time.
   */
  private generateCfnRegexesConfig(): IResolvable {
    return Lazy.any(
      {
        produce: () => {
          return this.regexFilters.flatMap((regex: filters.RegexFilter) => {
            return {
              name: regex.name,
              description: regex.description,
              pattern: regex.pattern,
              action: regex.action,
            } as bedrock.CfnGuardrail.RegexConfigProperty;
          });
        },
      },
      { omitEmptyArray: true }
    );
  }

  /**
   * Returns the Pii filters applied to the guardrail. This method defers the computation
   * to synth time.
   */
  private generateCfnPiiEntitiesConfig(): IResolvable {
    return Lazy.any(
      {
        produce: () => {
          return this.piiFilters.flatMap((filter: filters.PIIFilter) => {
            return {
              type: filter.type,
              action: filter.action,
            } as bedrock.CfnGuardrail.PiiEntityConfigProperty;
          });
        },
      },
      { omitEmptyArray: true }
    );
  }
}
