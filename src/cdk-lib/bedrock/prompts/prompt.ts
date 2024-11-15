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

import { Arn, ArnFormat, aws_kms as kms, Lazy, aws_bedrock as bedrock, Resource } from "aws-cdk-lib";
import { Grant, IGrantable } from "aws-cdk-lib/aws-iam";
import { IKey } from "aws-cdk-lib/aws-kms";
import { md5hash } from "aws-cdk-lib/core/lib/helpers-internal";
import { Construct } from "constructs";
import { IInvokable } from "../models";

export enum PromptTemplateType {
  TEXT = "TEXT",
}

export interface CommonPromptVariantProps {
  /**
   * The name of the prompt variant.
   */
  readonly variantName: string;
  /**
   * The model which is used to run the prompt. The model could be a foundation
   * model, a custom model, or a provisioned model.
   */
  readonly model: IInvokable;
}

export interface TextPromptVariantProps extends CommonPromptVariantProps {
  /**
   * Inference configuration for the Text Prompt
   */
  readonly inferenceConfiguration?: bedrock.CfnPrompt.PromptModelInferenceConfigurationProperty;
  /**
   * The variables in the prompt template that can be filled in at runtime.
   */
  readonly promptVariables: string[];
  /**
   * The text prompt. Variables are used by encolsing its name with double curly braces
   * as in `{{variable_name}}`.
   */
  readonly promptText: string;
}

/**
 * Variants are specific sets of inputs that guide FMs on Amazon Bedrock to
 * generate an appropriate response or output for a given task or instruction.
 * You can optimize the prompt for specific use cases and models.
 */
export abstract class PromptVariant {
  // ------------------------------------------------------
  // Static Methods
  // ------------------------------------------------------
  /**
   * Static method to create a text template
   */
  public static text(props: TextPromptVariantProps): PromptVariant {
    return {
      name: props.variantName,
      templateType: PromptTemplateType.TEXT,
      modelId: props.model.invokableArn,
      inferenceConfiguration: {
        text: { ...props.inferenceConfiguration },
      },
      templateConfiguration: {
        text: {
          inputVariables: props.promptVariables.flatMap((variable: string) => {
            return { name: variable };
          }),
          text: props.promptText,
        },
      },
    };
  }
  // ------------------------------------------------------
  // Properties
  // ------------------------------------------------------
  /**
   * The name of the prompt variant.
   */
  public abstract name: string;
  /**
   * The type of prompt template.
   */
  public abstract templateType: PromptTemplateType;
  /**
   * The inference configuration.
   */
  public abstract inferenceConfiguration?: bedrock.CfnPrompt.PromptInferenceConfigurationProperty;
  /**
   * The unique identifier of the model with which to run inference on the prompt.
   */
  public abstract modelId?: string;
  /**
   * The template configuration.
   */
  public abstract templateConfiguration: bedrock.CfnPrompt.PromptTemplateConfigurationProperty;

  // ------------------------------------------------------
  // Constructor
  // ------------------------------------------------------
  protected constructor() {}
}

/******************************************************************************
 *                              COMMON
 *****************************************************************************/
/**
 * Represents a Prompt, either created with CDK or imported.
 */
export interface IPrompt {
  /**
   * The ARN of the prompt.
   * @example "arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345"
   */
  readonly promptArn: string;
  /**
   * The ID of the prompt.
   * @example "PROMPT12345"
   */
  readonly promptId: string;
  /**
   * Optional KMS encryption key associated with this prompt.
   */
  readonly kmsKey?: IKey;
  /**
   * The version of the prompt.
   * @default - "DRAFT"
   */
  promptVersion: string;
}

/**
 * Abstract base class for a Prompt.
 * Contains methods and attributes valid for Promtps either created with CDK or imported.
 */
export abstract class PromptBase extends Resource implements IPrompt {
  public abstract readonly promptArn: string;
  public abstract readonly promptId: string;
  public abstract readonly kmsKey?: IKey;
  public abstract promptVersion: string;

  /**
   * Grant the given identity permissions to get the prompt.
   */
  public grantGet(grantee: IGrantable): Grant {
    return Grant.addToPrincipal({
      grantee,
      resourceArns: [this.promptArn],
      actions: ["bedrock:GetPrompt"],
      scope: this,
    });
  }
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/

export interface PromptProps {
  /**
   * The name of the prompt.
   */
  readonly promptName: string;
  /**
   * A description of what the prompt does.
   * @default - No description provided.
   */
  readonly description?: string;
  /**
   * The KMS key that the prompt is encrypted with.
   * @default - AWS owned and managed key.
   */
  readonly kmsKey?: kms.IKey;
  /**
   * The Prompt Variant that will be used by default.
   * @default - No default variant provided.
   */
  readonly defaultVariant?: PromptVariant;
  /**
   * The variants of your prompt. Variants can use different messages, models,
   * or configurations so that you can compare their outputs to decide the best
   * variant for your use case. Maximum of 3 variants.
   */
  readonly variants?: PromptVariant[];
}

/******************************************************************************
 *                      ATTRS FOR IMPORTED CONSTRUCT
 *****************************************************************************/
export interface PromptAttributes {
  /**
   * The ARN of the prompt.
   * @example "arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345"
   */
  readonly promptArn: string;
  /**
   * Optional KMS encryption key associated with this prompt.
   */
  readonly kmsKey?: IKey;
  /**
   * The version of the prompt.
   * @default - "DRAFT"
   */
  readonly promptVersion?: string;
}

/******************************************************************************
 *                        NEW CONSTRUCT DEFINITION
 *****************************************************************************/
/**
 * Prompts are a specific set of inputs that guide FMs on Amazon Bedrock to
 * generate an appropriate response or output for a given task or instruction.
 * You can optimize the prompt for specific use cases and models.
 * @resource AWS::Bedrock::Prompt
 * @see https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html
 */
export class Prompt extends Construct implements IPrompt {
  // ------------------------------------------------------
  // Import Methods
  // ------------------------------------------------------
  public static fromPromptAttributes(scope: Construct, id: string, attrs: PromptAttributes): IPrompt {
    const formattedArn = Arn.split(attrs.promptArn, ArnFormat.SLASH_RESOURCE_NAME);
    class Import extends PromptBase {
      public readonly promptArn = attrs.promptArn;
      public readonly promptId = formattedArn.resourceName!;
      public readonly promptVersion = attrs.promptVersion ?? "DRAFT";
      public readonly kmsKey = attrs.kmsKey;
    }

    return new Import(scope, id);
  }
  // ------------------------------------------------------
  // Attributes
  // ------------------------------------------------------
  /**
   * The name of the prompt.
   */
  public readonly promptName: string;
  /**
   * The KMS key that the prompt is encrypted with.
   */
  public readonly kmsKey?: IKey;
  /**
   * The ARN of the prompt.
   * @example "arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345"
   */
  public readonly promptArn: string;
  /**
   * The ID of the prompt.
   * @example "PROMPT12345"
   */
  public readonly promptId: string;
  /**
   * The version of the prompt.
   */
  public promptVersion: string;
  /**
   * The variants of the prompt.
   */
  readonly variants: PromptVariant[];
  /**
   * The computed hash of the prompt properties.
   * @internal
   */
  protected readonly _hash: string;
  /**
   * L1 resource
   */
  private readonly _resource: bedrock.CfnPrompt;

  // ------------------------------------------------------
  // Constructor
  // ------------------------------------------------------
  constructor(scope: Construct, id: string, props: PromptProps) {
    super(scope, id);
    // ------------------------------------------------------
    // Set properties or defaults
    // ------------------------------------------------------
    this.promptName = props.promptName;
    this.kmsKey = props.kmsKey;
    this.variants = props.variants ?? [];

    // ------------------------------------------------------
    // Validation
    // ------------------------------------------------------
    this.node.addValidation({ validate: () => this.validatePromptName() });
    this.node.addValidation({ validate: () => this.validatePromptVariants() });

    // ------------------------------------------------------
    // CFN Props - With Lazy support
    // ------------------------------------------------------
    let cfnProps: bedrock.CfnPromptProps = {
      customerEncryptionKeyArn: this.kmsKey?.keyArn,
      defaultVariant: props.defaultVariant?.name,
      description: props.description,
      name: props.promptName,
      variants: Lazy.any({
        produce: () => this.variants,
      }),
    };

    // Hash calculation useful for versioning of the guardrail
    this._hash = md5hash(JSON.stringify(cfnProps));

    // ------------------------------------------------------
    // L1 Instantiation
    // ------------------------------------------------------
    this._resource = new bedrock.CfnPrompt(this, "Prompt", cfnProps);

    this.promptArn = this._resource.attrArn;
    this.promptId = this._resource.attrId;
    this.promptVersion = this._resource.attrVersion;
  }

  // ------------------------------------------------------
  // Validation Methods
  // ------------------------------------------------------
  /**
   * Validates whether the prompt name is valid according to the specification.
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-prompt.html#cfn-bedrock-prompt-name
   */
  private validatePromptName() {
    const errors: string[] = [];

    const matchesPattern = /^([0-9a-zA-Z][_-]?){1,100}$/.test(this.promptName);
    if (!matchesPattern) {
      errors.push(
        "Valid characters are a-z, A-Z, 0-9, _ (underscore) and - (hyphen). And must not begin with a hyphen"
      );
    }
    if (errors.length > 0) {
      errors.unshift(`Invalid prompt name (value: ${this.promptName})`);
    }
    return errors;
  }

  /**
   * Validates whether the number of prompt variants is respected.
   */
  private validatePromptVariants() {
    const errors: string[] = [];
    if (this.variants.length > 3) {
      errors.push(
        `Error: Too many variants specified. The maximum allowed is 3, but you have provided ${this.variants.length} variants.`
      );
    }
    return errors;
  }

  // ------------------------------------------------------
  // Helper Methods
  // ------------------------------------------------------
  /**
   * Creates a prompt version, a static snapshot of your prompt that can be
   * deployed to production.
   */
  public createVersion(description?: string): string {
    const version = new bedrock.CfnPromptVersion(this, `PromptVersion-${this._hash}`, {
      promptArn: this.promptArn,
      description,
    });
    this.promptVersion = version.attrVersion;
    return this.promptVersion;
  }

  /**
   * Adds a prompt variant.
   */
  public addVariant(variant: PromptVariant) {
    this.variants.push(variant);
  }
}
