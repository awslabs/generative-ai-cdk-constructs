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
import { aws_bedrock as bedrock } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

import { AgentActionGroup } from './agent-action-group';
import { AgentAlias } from './agent-alias';
import { Guardrail } from './guardrails';
import { KnowledgeBase } from './knowledge-base';
import { BedrockFoundationModel } from './models';

import { generatePhysicalNameV2 } from '../../common/helpers/utils';


/**
 * The step in the agent sequence that this prompt configuration applies to.
 */
export enum PromptType {
  PRE_PROCESSING = 'PRE_PROCESSING',
  ORCHESTRATION = 'ORCHESTRATION',
  POST_PROCESSING = 'POST_PROCESSING',
  KNOWLEDGE_BASE_RESPONSE_GENERATION = 'KNOWLEDGE_BASE_RESPONSE_GENERATION'
}

/**
 * Specifies whether to override the default parser Lambda function when
 * parsing the raw foundation model output in the part of the agent sequence
 * defined by the promptType. If you set the field as OVERRIDEN, the
 * overrideLambda field in the PromptOverrideConfiguration must be specified
 * with the ARN of a Lambda function.
 */
export enum ParserMode {
  DEFAULT = 'DEFAULT',
  OVERRIDDEN = 'OVERRIDDEN'
}

/**
 * Specifies whether to override the default prompt template for this
 * promptType. Set this value to OVERRIDDEN to use the prompt that you
 * provide in the basePromptTemplate. If you leave it as DEFAULT, the agent
 * uses a default prompt template.
 */
export enum PromptCreationMode {
  DEFAULT = 'DEFAULT',
  OVERRIDDEN = 'OVERRIDDEN'
}

/**
 * Specifies whether to allow the agent to carry out the step specified in the
 * promptType. If you set this value to DISABLED, the agent skips that step.
 * The default state for each promptType is as follows.
 *
 *     PRE_PROCESSING – ENABLED
 *     ORCHESTRATION – ENABLED
 *     KNOWLEDGE_BASE_RESPONSE_GENERATION – ENABLED
 *     POST_PROCESSING – DISABLED
 */
export enum PromptState {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED'
}

/** Details about the guardrail associated with the agent. */
export interface GuardrailConfiguration {
  /*The version of the guardrail.*/
  readonly guardrailVersion?: string;
  /*The identified of the guardrail.*/
  readonly guardrailId?: string;
}

/**
 * LLM inference configuration
 */
export interface InferenceConfiguration {
  /**
   * The likelihood of the model selecting higher-probability options while
   * generating a response. A lower value makes the model more likely to choose
   * higher-probability options, while a higher value makes the model more
   * likely to choose lower-probability options.
   *
   * Floating point
   *
   * min 0
   * max 1
   */
  readonly temperature: number;
  /**
   * While generating a response, the model determines the probability of the
   * following token at each point of generation. The value that you set for
   * Top P determines the number of most-likely candidates from which the model
   * chooses the next token in the sequence. For example, if you set topP to
   * 80, the model only selects the next token from the top 80% of the
   * probability distribution of next tokens.
   *
   * Floating point
   *
   * min 0
   * max 1
   */
  readonly topP: number;
  /**
   * While generating a response, the model determines the probability of the
   * following token at each point of generation. The value that you set for
   * topK is the number of most-likely candidates from which the model chooses
   * the next token in the sequence. For example, if you set topK to 50, the
   * model selects the next token from among the top 50 most likely choices.
   *
   * Integer
   *
   * min 0
   * max 500
   */
  readonly topK: number;
  /**
   * A list of stop sequences. A stop sequence is a sequence of characters that
   * causes the model to stop generating the response.
   *
   * length 0-4
   */
  readonly stopSequences: string[];
  /**
   * The maximum number of tokens to generate in the response.
   *
   * Integer
   *
   * min 0
   * max 4096
   */
  readonly maximumLength: number;
}

/**
 * Contains configurations to override a prompt template in one part of an agent sequence.
 */
export interface PromptConfiguration {
  /**
   * The step in the agent sequence that this prompt configuration applies to.
   */
  readonly promptType: PromptType;
  /**
   * Contains inference parameters to use when the agent invokes a foundation
   * model in the part of the agent sequence defined by the promptType.
   */
  readonly inferenceConfiguration: InferenceConfiguration;
  /**
   * Defines the prompt template with which to replace the default prompt template.
   *
   * length 0-100000
   */
  readonly basePromptTemplate: string;
  /**
   * Specifies whether to override the default parser Lambda function when
   * parsing the raw foundation model output in the part of the agent sequence
   * defined by the promptType. If you set the field as OVERRIDEN, the
   * overrideLambda field in the PromptOverrideConfiguration must be specified
   * with the ARN of a Lambda function.
   */
  readonly parserMode?: ParserMode;
  /**
   * Specifies whether to override the default prompt template for this
   * promptType. Set this value to OVERRIDDEN to use the prompt that you
   * provide in the basePromptTemplate. If you leave it as DEFAULT, the agent
   * uses a default prompt template.
   */
  readonly promptCreationMode: PromptCreationMode;
  /**
   * Specifies whether to allow the agent to carry out the step specified in
   * the promptType. If you set this value to DISABLED, the agent skips that
   * step. The default state for each promptType is as follows.
   *
   *     PRE_PROCESSING – ENABLED
   *     ORCHESTRATION – ENABLED
   *     KNOWLEDGE_BASE_RESPONSE_GENERATION – ENABLED
   *     POST_PROCESSING – DISABLED
   */
  readonly promptState: PromptState;
}

/**
 * Contains configurations to override prompts in different parts of an agent sequence.
 */
export interface PromptOverrideConfiguration {
  /**
   * Contains configurations to override a prompt template in one part of an agent sequence.
   */
  readonly promptConfigurations: PromptConfiguration[];
  /**
   * The ARN of the Lambda function to use when parsing the raw foundation
   * model output in parts of the agent sequence. If you specify this field,
   * at least one of the promptConfigurations must contain a parserMode value
   * that is set to OVERRIDDEN.
   */
  readonly overrideLambda?: string;
}

/**
 * Properties for a Bedrock Agent.
 */
export interface AgentProps {
  /**
   * The Bedrock text foundation model for the agent to use.
   */
  readonly foundationModel: BedrockFoundationModel;
  /**
   * The name of the agent.
   *
   * @default - A name is automatically generated.
   */
  readonly name?: string;

  /**
   * The existing IAM Role for the agent with a trust policy that
   * allows the Bedrock service to assume the role.
   */
  readonly existingRole?: iam.Role;

  /**
   * A narrative instruction to provide the agent as context.
   */
  readonly instruction: string;
  /**
   * A description of the agent.
   *
   * @default - No description is provided.
   */
  readonly description?: string;
  /**
   * Knowledge Bases to make available to the agent.
   *
   * @default - No knowledge base is used.
   */
  readonly knowledgeBases?: KnowledgeBase[];
  /**
   * AgentActionGroup to make available to the agent.
   *
   * @default - No AgentActionGroup  is used.
   */
  readonly actionGroups?: AgentActionGroup[];

  /** Guardrail configuration
   *
   * Warning: If you provide a guardrail configuration through the constructor,
   * you will need to provide the correct permissions for your agent to access
   * the guardrails. If you want the permissions to be configured on your behalf,
   * use the addGuardrail method.
   * @default - No guardrails associated to the agent.
  */
  readonly guardrailConfiguration?: GuardrailConfiguration;
  /**
   * Select whether the agent can prompt additional
   * information from the user when it does not have
   * enough information to respond to an utterance
   *
   * @default - False
   */
  readonly enableUserInput?: boolean;

  /**
   * How long sessions should be kept open for the agent.
   *
   * @default - 1 hour
   */
  readonly idleSessionTTL?: cdk.Duration;
  /**
   * KMS encryption key to use for the agent.
   *
   * @default - An AWS managed key is used.
   */
  readonly encryptionKey?: kms.IKey;
  /**
   * Overrides for the agent.
   *
   * @default - No overrides are provided.
   */
  readonly promptOverrideConfiguration?: PromptOverrideConfiguration;
  /**
   * Name of the alias for the agent.
   *
   * @default - No alias is created.
   */
  readonly aliasName?: string;
  /**
   * Whether to prepare the agent for use.
   *
   * @default - false
   */
  readonly shouldPrepareAgent?: boolean;

  /**
   * OPTIONAL: Tag (KEY-VALUE) bedrock agent resource
   *
   * @default - false
   */
  readonly tags?: Record<string, string>;
}

/**
 * Properties to add an Alias to an Agent
 */
export interface AddAgentAliasProps {
  /**
   * The name for the agent alias.
   */
  readonly aliasName: string;
  /**
   * The version of the agent to associate with the agent alias.
   *
   * @default - Creates a new version of the agent.
   */
  readonly agentVersion?: string;

  /**
   * Description for the agent alias.
   *
   */
  readonly description?: string;
}

/**
 * Deploy a Bedrock Agent.
 */
export class Agent extends Construct {
  /**
   * The name of the agent.
   */
  public readonly name: string;
  /**
   * The IAM role for the agent.
   */
  public readonly role: iam.Role;
  /**
   * The unique identifier of the agent.
   */
  public readonly agentId: string;
  /**
   * Instance of Agent
   */
  public readonly agentInstance: bedrock.CfnAgent;
  /**
   * The ARN of the agent.
   */
  public readonly agentArn: string;
  /**
   * The unique identifier of the agent alias.
   */
  public readonly aliasId?: string;
  /**
   * The ARN of the agent alias.
   */
  public readonly aliasArn?: string;
  /**
   * The name for the agent alias.
   */
  public readonly aliasName?: string;
  /**
   * The version for the agent
   */
  public readonly agentversion: string;
  /**
   * A list of values to indicate if PrepareAgent or an Alias needs to be updated.
   * @private
   */
  private resourceUpdates: string[] = [];

  /**
   * A list of action groups associated with the agent
   * @private
   */
  public actionGroups: bedrock.CfnAgent.AgentActionGroupProperty[]=[];
  /**
   * A list of KnowledgeBases associated with the agent.
   *
   * @default - No knowledge base is used.
   */
  public knowledgeBases: bedrock.CfnAgent.AgentKnowledgeBaseProperty []=[];


  constructor(scope: Construct, id: string, props: AgentProps) {
    super(scope, id);
    validatePromptOverrideConfiguration(props.promptOverrideConfiguration);

    validateModel(props.foundationModel);

    this.name = props.name ?? generatePhysicalNameV2(
      this,
      'bedrock-agent',
      { maxLength: 32, lower: true, separator: '-' });

    if (props.existingRole) {
      this.role = props.existingRole;
    } else {
      this.role = new iam.Role(this, 'Role', {
        assumedBy: new iam.ServicePrincipal('bedrock.amazonaws.com'),
        roleName: generatePhysicalNameV2(
          this,
          'AmazonBedrockExecutionRoleForAgents_',
          { maxLength: 64, lower: false }),
      });

      this.role.assumeRolePolicy!.addStatements(
        new iam.PolicyStatement({
          actions: ['sts:AssumeRole'],
          principals: [new iam.ServicePrincipal('bedrock.amazonaws.com')],
          conditions: {
            StringEquals: {
              'aws:SourceAccount': cdk.Stack.of(this).account,
            },
            ArnLike: {
              'aws:SourceArn': cdk.Stack.of(this).formatArn({
                service: 'bedrock',
                resource: 'agent',
                resourceName: '*',
                arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
              }),
            },
          },
        }),
      );

      new iam.Policy(this, 'AgentFMPolicy', {
        roles: [this.role],
        statements: [
          new iam.PolicyStatement({
            actions: ['bedrock:InvokeModel'],
            resources: [props.foundationModel.asArn(this)],
          }),
        ],
      });
    }

    const agent = new bedrock.CfnAgent(this, 'Agent', {

      agentName: this.name,

      foundationModel: String(props.foundationModel),
      instruction: props.instruction,
      description: props.description,
      idleSessionTtlInSeconds: props.idleSessionTTL?.toSeconds(),
      agentResourceRoleArn: this.role.roleArn,
      customerEncryptionKeyArn: props.encryptionKey?.keyArn,
      tags: props.tags,
      promptOverrideConfiguration: props.promptOverrideConfiguration,
      autoPrepare: props.shouldPrepareAgent,
    });

    this.agentInstance = agent;
    this.agentId = agent.attrAgentId;
    this.agentArn = agent.attrAgentArn;
    this.agentversion = agent.attrAgentVersion;

    if (props.guardrailConfiguration) {
      this.agentInstance.guardrailConfiguration = {
        guardrailIdentifier: props.guardrailConfiguration?.guardrailId,
        guardrailVersion: props.guardrailConfiguration?.guardrailVersion,
      };
    }

    this._addAliasDependency(agent.attrUpdatedAt);

    if (props.aliasName) {
      const alias = this.addAlias({
        aliasName: props.aliasName,
      });
      this.aliasId = alias.aliasId;
      this.aliasArn = alias.aliasArn;
      this.aliasName = alias.aliasName;
    }

    if (props.knowledgeBases) {
      this.addKnowledgeBases(props.knowledgeBases);
    }

    if (props.actionGroups) {
      this.addActionGroups(props.actionGroups);
    }
    // To allow your agent to request the user for additional information
    // when trying to complete a task , add this action group
    if (props.enableUserInput) {
      this.addActionGroup(new AgentActionGroup(this, 'userInputEnabledActionGroup', {
        actionGroupName: 'UserInputAction',
        parentActionGroupSignature: 'AMAZON.UserInput',
        actionGroupState: 'ENABLED',
      }));
    }
  }


  /**
   * Add an alias to the agent.
   */
  public addAlias(props: AddAgentAliasProps): AgentAlias {
    const alias = new AgentAlias(this, `AgentAlias-${props.aliasName}`, {
      agentId: this.agentId,
      agentVersion: props.agentVersion,
      resourceUpdates: cdk.Lazy.list({ produce: () => this.resourceUpdates }),
      aliasName: props.aliasName,
      description: props.description,
    });
    return alias;
  }

  /**
   * Add knowledge bases to the agent.
   */
  public addKnowledgeBases(knowledgeBases: KnowledgeBase []) {
    for (const kb of knowledgeBases) {
      this.addKnowledgeBase(kb);
    }
  }

  /**
   * Add knowledge base to the agent.
   */
  public addKnowledgeBase(knowledgeBase: KnowledgeBase) {
    if (!knowledgeBase.instruction) {
      throw new Error('Agent Knowledge Bases require instructions.');
    }
    new iam.Policy(this, `AgentKBPolicy-${knowledgeBase.name}`, {
      roles: [this.role],
      statements: [
        new iam.PolicyStatement({
          actions: [
            'bedrock:UpdateKnowledgeBase',
            'bedrock:Retrieve',
          ],
          resources: [knowledgeBase.knowledgeBaseArn],
        }),
      ],
    });
    const agentKnowledgeBaseProperty: bedrock.CfnAgent.AgentKnowledgeBaseProperty = {
      description: knowledgeBase.instruction, // known issue: wrong parameter mapping in Cfn. Workaround: pass instruction through description
      knowledgeBaseId: knowledgeBase.knowledgeBaseId,
      knowledgeBaseState: knowledgeBase.knowledgeBaseState,
    };

    if (!this.agentInstance.knowledgeBases || !Array.isArray(this.agentInstance.knowledgeBases)) {
      this.agentInstance.knowledgeBases = [agentKnowledgeBaseProperty];
    } else {
      (this.agentInstance.knowledgeBases as any).push(agentKnowledgeBaseProperty);
    }
  }


  /**
   * Add action group to the agent.
   */
  public addActionGroup(actionGroup: AgentActionGroup) {
    actionGroup.actionGroupExecutor?.lambda?.addPermission('AgentLambdaInvocationPolicy', {
      principal: new iam.ServicePrincipal('bedrock.amazonaws.com'),
      sourceArn: this.agentArn,
      sourceAccount: cdk.Stack.of(this).account,
    });

    if (!this.agentInstance.actionGroups || !Array.isArray(this.agentInstance.actionGroups)) {
      this.agentInstance.actionGroups = [actionGroup.actionGroupProperty];
    } else {
      (this.agentInstance.actionGroups as any).push(actionGroup.actionGroupProperty);
    }
  }

  /**
   * Add action groups to the agent.
   */
  public addActionGroups(actionGroups: AgentActionGroup[]) {
    for (const actionGroup of actionGroups) {
      this.addActionGroup(actionGroup);
    }
  }

  /**
   * Add guardrail to the agent.
   */
  public addGuardrail(guardrail: Guardrail) {
    new iam.Policy(this, `AgentGuardrailPolicy-${guardrail.name}`, {
      roles: [this.role],
      statements: [
        new iam.PolicyStatement({
          actions: [
            'bedrock:ApplyGuardrail',
          ],
          resources: [`arn:${cdk.Aws.PARTITION}:bedrock:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:guardrail/${guardrail.guardrailId}`],
        }),
        new iam.PolicyStatement({
          actions: [
            'kms:Decrypt',
          ],
          resources: [guardrail.kmsKeyArn],
          conditions: {
            StringEquals: {
              'aws:ResourceAccount': cdk.Aws.ACCOUNT_ID,
            },
          },
        }),
      ],
    });

    this.agentInstance.guardrailConfiguration = {
      guardrailIdentifier: guardrail.guardrailId,
      guardrailVersion: guardrail.guardrailVersion,
    };
  }

  /**
   * Register a dependency for aliases.
   *
   * @param updatedAt - The updatedAt of the resource that will be registered as a dependency.
   *
   * @internal This is an internal core function and should not be called directly.
   */
  public _addAliasDependency(updatedAt: string) {
    if (updatedAt) {
      this.resourceUpdates.push(updatedAt);
    }
  }
}

/**
 * Validate that Bedrock Agents can use the selected model.
 *
 * @internal This is an internal core function and should not be called directly.
 */
function validateModel(foundationModel: BedrockFoundationModel) {
  if (!foundationModel.supportsAgents) {
    throw new Error(`The model ${foundationModel} is not supported by Bedrock Agents.`);
  }
}

/**
 * Validate the inferenceConfiguration of a prompt override.
 *
 * @internal This is an internal core function and should not be called directly.
 */
export function validateInferenceConfiguration(inferenceConfiguration: InferenceConfiguration) {
  if (inferenceConfiguration.topK < 0 || inferenceConfiguration.topK > 500) {
    throw new Error('topK must be between 0 and 500');
  }

  if (!Number.isInteger(inferenceConfiguration.topK)) {
    throw new Error('topK must be an integer');
  }

  if (inferenceConfiguration.stopSequences.length > 4) {
    throw new Error('stopSequences cannot contain more than 4 elements');
  }

  if (inferenceConfiguration.maximumLength < 0 || inferenceConfiguration.maximumLength > 4096) {
    throw new Error('maximumLength must be between 0 and 4096');
  }

  if (!Number.isInteger(inferenceConfiguration.maximumLength)) {
    throw new Error('maximumLength must be an integer');
  }

  if (inferenceConfiguration.topP < 0 || inferenceConfiguration.topP > 1) {
    throw new Error('topP must be between 0 and 1');
  }

  if (inferenceConfiguration.temperature < 0 || inferenceConfiguration.temperature > 1) {
    throw new Error('temperature must be between 0 and 1');
  }
}

/**
 * Validate the promptOverrideConfiguration.
 *
 * @internal This is an internal core function and should not be called directly.
 */
export function validatePromptOverrideConfiguration(promptOverrideConfiguration: PromptOverrideConfiguration|undefined) {
  if (!promptOverrideConfiguration) {
    return;
  }

  if (
    promptOverrideConfiguration.overrideLambda &&
    promptOverrideConfiguration.promptConfigurations.some(
      pc => pc.parserMode !== ParserMode.OVERRIDDEN,
    )) {
    throw new Error('overrideLambda can only be used if all promptConfigurations have a parserMode value of OVERRIDDEN');
  }

  if (
    !promptOverrideConfiguration.overrideLambda &&
    promptOverrideConfiguration.promptConfigurations.some(
      pc => pc.parserMode === ParserMode.OVERRIDDEN,
    )) {
    throw new Error('At least one promptConfiguration has a parserMode value of OVERRIDDEN, but no overrideLambda is specified');
  }

  // check inferenceConfiguration number types
  Object.values(promptOverrideConfiguration.promptConfigurations).forEach(pc => {
    validateInferenceConfiguration(pc.inferenceConfiguration);
  });

  return;
}

