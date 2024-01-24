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
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';

import { BedrockCRProvider } from './custom-resources';
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
   * @min 0
   * @max 1
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
   * @min 0
   * @max 1
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
   * @min 0
   * @max 500
   */
  readonly topK: number;
  /**
   * A list of stop sequences. A stop sequence is a sequence of characters that
   * causes the model to stop generating the response.
   *
   * @length 0-4
   */
  readonly stopSequences: string[];
  /**
   * The maximum number of tokens to generate in the response.
   *
   * Integer
   *
   * @min 0
   * @max 4096
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
   * @length 0-100000
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
   * A narrative instruction to provide the agent as context.
   *
   * @default - No instruction is provided.
   */
  readonly instruction?: string;
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
   * @default - 'prod'
   */
  readonly aliasName?: string;
}

/**
 * Deploy a Bedrock Agent and Alias.
 */
export class Agent extends Construct implements cdk.ITaggableV2 {
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
   * The ARN of the agent.
   */
  public readonly agentArn: string;
  /**
   * The CFN custom resource for the agent alias.
   */
  public readonly alias: cdk.CustomResource;
  /**
   * The unique identifier of the agent alias.
   */
  public readonly aliasId: string;
  /**
   * The ARN of the agent alias.
   */
  public readonly aliasArn: string;
  /**
   * The name for the agent alias.
   */
  public readonly aliasName: string;
  /**
   * TagManager facilitates a common implementation of tagging for Constructs
   */
  public readonly cdkTagManager =
    new cdk.TagManager(cdk.TagType.MAP, 'Custom::Bedrock-Agent');

  constructor(scope: Construct, id: string, props: AgentProps) {
    super(scope, id);
    validatePromptOverrideConfiguration(props.promptOverrideConfiguration);

    validateModel(props.foundationModel);

    this.name = props.name ?? generatePhysicalNameV2(
      this,
      'bedrock-agent',
      { maxLength: 32, lower: true, separator: '-' });

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

    if (props.knowledgeBases && props.knowledgeBases.length > 0) {
      new iam.Policy(this, 'AgentKBPolicy', {
        roles: [this.role],
        statements: [
          new iam.PolicyStatement({
            actions: [
              'bedrock:UpdateKnowledgeBase',
              'bedrock:Retrieve',
            ],
            resources: props.knowledgeBases.map(kb => kb.knowledgeBaseArn),
          }),
        ],
      });
    }

    const crProvider = BedrockCRProvider.getProvider(this);

    const agent = new cdk.CustomResource(this, 'Agent', {
      serviceToken: crProvider.serviceToken,
      resourceType: 'Custom::Bedrock-Agent',
      properties: {
        agentName: this.name,
        foundationModel: String(props.foundationModel),
        instruction: props.instruction,
        description: props.description,
        idleSessionTTLInSeconds: props.idleSessionTTL?.toSeconds(),
        agentResourceRoleArn: this.role.roleArn,
        customerEncryptionKeyArn: props.encryptionKey?.keyArn,
        tags: this.cdkTagManager.renderedTags,
        promptOverrideConfiguration: props.promptOverrideConfiguration,
      },
    });

    this.agentId = agent.getAttString('agentId');
    this.agentArn = agent.getAttString('agentArn');


    const agentCRPolicy = new iam.Policy(this, 'AgentCRPolicy', {
      roles: [crProvider.role],
      statements: [
        new iam.PolicyStatement({
          actions: ['iam:PassRole'],
          resources: [this.role.roleArn],
        }),
        new iam.PolicyStatement({
          actions: ['bedrock:CreateAgent'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: [
            'bedrock:DeleteAgent',
            'bedrock:UpdateAgent',
            'bedrock:TagResource',
          ],
          resources: [
            cdk.Stack.of(this).formatArn({
              service: 'bedrock',
              resource: 'agent',
              resourceName: '*',
              arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
            }),
          ],
        }),
      ],
    });

    agent.node.addDependency(agentCRPolicy);
    agent.node.addDependency(crProvider);

    NagSuppressions.addResourceSuppressions(
      agentCRPolicy,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: "Bedrock CreateAgent can't be restricted by resource.",
        },
      ],
      true,
    );

    const kbAssocCRPolicy = new iam.Policy(this, 'KBAssocCRPolicy', {
      roles: [crProvider.role],
      statements: [
        new iam.PolicyStatement({
          actions: [
            'bedrock:AssociateAgentKnowledgeBase',
            'bedrock:UpdateAgentKnowledgeBase',
            'bedrock:DisassociateAgentKnowledgeBase',
          ],
          resources: [
            cdk.Stack.of(this).formatArn({
              service: 'bedrock',
              resource: 'agent',
              resourceName: '*',
              arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
            }),
            cdk.Stack.of(this).formatArn({
              service: 'bedrock',
              resource: 'knowledge-base',
              resourceName: '*',
              arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
            }),
          ],
        }),
      ],
    });

    NagSuppressions.addResourceSuppressions(
      kbAssocCRPolicy,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'Bedrock Agent/KB associations have wildcards restricted to agents and kbs in the account.',
        },
      ],
      true,
    );

    const kbAssociations: string[] = [];
    for (let kb of props.knowledgeBases ?? []) {
      const kbAssoc = new cdk.CustomResource(
        this,
        `KBAssoc-${kb.name}`,
        {
          serviceToken: crProvider.serviceToken,
          resourceType: 'Custom::Bedrock-AgentKnowledgeBase',
          properties: {
            agentId: this.agentId,
            knowledgeBaseId: kb.knowledgeBaseId,
            description: kb.description,
          },
        },
      );
      kbAssoc.node.addDependency(kbAssocCRPolicy);
      kbAssoc.node.addDependency(crProvider);
      kbAssociations.push(kbAssoc.getAttString('changeId'));
    }

    const changeIds: string[] = [agent.getAttString('changeId')];

    changeIds.push(...kbAssociations);

    this.alias = new cdk.CustomResource(
      this,
      'Alias',
      {
        serviceToken: crProvider.serviceToken,
        resourceType: 'Custom::Bedrock-AgentAlias',
        properties: {
          agentId: this.agentId,
          aliasName: props.aliasName ?? 'prod',
          changeIds: changeIds,
          tags: this.cdkTagManager.renderedTags,
        },
      },
    );

    const aliasCRPolicy = new iam.Policy(this, 'AliasCRPolicy', {
      roles: [crProvider.role],
      statements: [

        new iam.PolicyStatement({
          actions: [
            'bedrock:CreateAgentAlias',
            'bedrock:UpdateAgentAlias',
            'bedrock:DeleteAgentAlias',
            'bedrock:PrepareAgent',
            'bedrock:ListAgentVersions',
            'bedrock:DeleteAgentVersion',
            'bedrock:GetAgent',
            'bedrock:TagResource',
          ],
          resources: [
            cdk.Stack.of(this).formatArn({
              service: 'bedrock',
              resource: 'agent-alias',
              resourceName: '*',
              arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
            }),
            cdk.Stack.of(this).formatArn({
              service: 'bedrock',
              resource: 'agent',
              resourceName: '*',
              arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
            }),
          ],
        }),
      ],
    });

    NagSuppressions.addResourceSuppressions(
      aliasCRPolicy,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'Bedrock Agent/Alias associations have wildcards restricted to agents and aliases in the account.',
        },
      ],
      true,
    );

    this.alias.node.addDependency(aliasCRPolicy);
    this.alias.node.addDependency(crProvider);

    this.aliasId = this.alias.getAttString('agentAliasId');
    this.aliasArn = this.alias.getAttString('agentAliasArn');
    this.aliasName = this.alias.getAttString('agentAliasName');

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
