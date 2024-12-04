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
import { ArnFormat, Duration, IResource, Lazy, Resource, Stack } from 'aws-cdk-lib';
import * as bedrock from 'aws-cdk-lib/aws-bedrock';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
import { AgentActionGroup } from './action-group';
import { AgentAlias, IAgentAlias } from './agent-alias';
import { PromptOverrideConfiguration } from './prompt-override';
import { generatePhysicalNameV2 } from '../../../common/helpers/utils';
import * as validation from '../../../common/helpers/validation-helpers';
import { IGuardrail } from '../guardrails/guardrails';
import { IKnowledgeBase } from '../knowledge-base';
import { IInvokable } from '../models';

/******************************************************************************
 *                              COMMON
 *****************************************************************************/
/**
 * Represents an Agent, either created with CDK or imported.
 */
export interface IAgent extends IResource {
  /**
   * The ARN of the agent.
   * @example "arn:aws:bedrock:us-east-1:123456789012:agent/OKDSJOGKMO"
   * @attribute
   */
  readonly agentArn: string;
  /**
   * The ID of the Agent.
   * @example "OKDSJOGKMO"
   * @attribute
   */
  readonly agentId: string;
  /**
   * The IAM role associated to the agent.
   */
  readonly role: iam.IRole;
  /**
   * Optional KMS encryption key associated with this agent
   */
  readonly kmsKey?: kms.IKey;
  /**
   * When this agent was last updated.
   */
  readonly lastUpdated?: string;
}
/******************************************************************************
 *                        ABSTRACT BASE CLASS
 *****************************************************************************/
/**
 * Abstract base class for an Agent.
 * Contains methods and attributes valid for Agents either created with CDK or imported.
 */
export abstract class AgentBase extends Resource implements IAgent {
  public abstract readonly agentArn: string;
  public abstract readonly agentId: string;
  public abstract readonly role: iam.IRole;
  public abstract readonly kmsKey?: kms.IKey;
  public abstract readonly lastUpdated?: string;
  public abstract agentVersion: string;
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a CDK managed Bedrock Agent.
 */
export interface AgentProps {
  /**
   * The name of the agent.
   *
   * @default - A name is generated by CDK.
   */
  readonly name?: string;
  /**
   * The instruction used by the agent.
   */
  readonly instruction: string;
  /**
   * The foundation model used for orchestration by the agent.
   */
  readonly foundationModel: IInvokable;
  /**
   * The existing IAM Role for the agent to use.
   * Ensure the role has a trust policy that allows the Bedrock service to assume the role.
   *
   * @default - A new role is created for you.
   */
  readonly existingRole?: iam.IRole;
  /**
   * Specifies whether to automatically update the `DRAFT` version of the agent after
   * making changes to the agent. The `DRAFT` version can be continually iterated
   * upon during internal development.
   *
   * @default - false
   */
  readonly shouldPrepareAgent?: boolean;
  /**
   * How long sessions should be kept open for the agent. If no conversation occurs
   * during this time, the session expires and Amazon Bedrock deletes any data
   * provided before the timeout.
   *
   * @default - 1 hour
   */
  readonly idleSessionTTL?: Duration;
  /**
   * The KMS key of the agent if custom encryption is configured.
   *
   * @default - An AWS managed key is used.
   */
  readonly kmsKey?: kms.IKey;
  /**
   * A description of the agent.
   *
   * @default - No description is provided.
   */
  readonly description?: string;
  /**
   * The KnowledgeBases associated with the agent.
   */
  readonly knowledgeBases?: IKnowledgeBase[];
  /**
   * The Action Groups associated with the agent.
   */
  readonly actionGroups?: AgentActionGroup[];
  /**
   * The guardrail that will be associated with the agent. This requires you to specify
   * the guardrail and version that you want to use. If you do not want to manage the versions
   * yourself, use the `yourGuardrail.defaultVersion` attribute.
   */
  readonly guardrail?: IGuardrail;
  /**
   * Overrides some prompt templates in different parts of an agent sequence configuration.
   *
   * @default - No overrides are provided.
   */
  readonly promptOverrideConfiguration?: PromptOverrideConfiguration;
  /**
   * Select whether the agent can prompt additional information from the user when it does not have
   * enough information to respond to an utterance
   *
   * @default - false
   */
  readonly userInputEnabled?: boolean;
  /**
   * Select whether the agent can generate, run, and troubleshoot code when trying to complete a task
   *
   * @default - false
   */
  readonly codeInterpreterEnabled?: boolean;
  /**
   * Whether to delete the resource even if it's in use.
   *
   * @default - false
   */
  readonly forceDelete?: boolean;
}
/******************************************************************************
 *                      ATTRS FOR IMPORTED CONSTRUCT
 *****************************************************************************/
/**
 * Attributes for specifying an imported Bedrock Agent.
 */

/******************************************************************************
 *                        NEW CONSTRUCT DEFINITION
 *****************************************************************************/
/**
 * Class to create (or import) an Agent with CDK.
 * @cloudformationResource AWS::Bedrock::Agent
 */
export class Agent extends AgentBase {
  // ------------------------------------------------------
  // Base attributes
  // ------------------------------------------------------
  /**
   * The unique identifier for the agent
   */
  public readonly agentId: string;
  /**
   * The ARN of the agent.
   */
  public readonly agentArn: string;
  /**
   * The version of the agent.
   */
  public readonly agentVersion: string;
  /**
   * The IAM role associated to the agent.
   */
  public readonly role: iam.IRole;
  /**
   * Optional KMS encryption key associated with this agent
   */
  public readonly kmsKey?: kms.IKey;
  /**
   * When this agent was last updated.
   */
  public readonly lastUpdated?: string;
  // ------------------------------------------------------
  // CDK-only attributes
  // ------------------------------------------------------
  /**
   * The name of the agent.
   */
  public readonly name: string;
  /**
   * The description for the agent.
   */
  public readonly description?: string;
  /**
   * The instruction used by the agent.
   */
  public readonly instruction?: string;
  /**
   * Overrides some prompt templates in different parts of an agent sequence configuration.
   *
   * @default - No overrides are provided.
   */
  readonly promptOverrideConfiguration?: PromptOverrideConfiguration;
  /**
   * Whether the agent will automatically update the DRAFT version of the agent after
   * making changes to the agent.
   */
  public readonly shouldPrepareAgent: boolean;
  /**
   * How long sessions should be kept open for the agent.
   */
  public readonly idleSessionTTL: Duration;
  /**
   * The foundation model used for orchestration by the agent.
   */
  public readonly foundationModel: IInvokable;
  /**
   * The default test alias for this agent. This corresponds to the test alias
   * (`TSTALIASID`) that points to the working (`DRAFT`) version.
   */
  public readonly testAlias: IAgentAlias;
  /**
   * Whether the agent can prompt additional information from the user when it does not have
   * enough information to respond to an utterance
   */
  public readonly userInputEnabled: boolean;
  /**
   * Whether the agent can generate, run, and troubleshoot code when trying to complete a task.
   */
  public readonly codeInterpreterEnabled: boolean;
  /**
   * Whether the resource will be deleted even if it's in use.
   */
  public readonly forceDelete: boolean;
  // ------------------------------------------------------
  // Lazy Attributes
  // ------------------------------------------------------
  /**
   * The action groups associated with the agent.
   */
  public actionGroups: AgentActionGroup[];
  /**
   * The KnowledgeBases associated with the agent.
   */
  public knowledgeBases: IKnowledgeBase[];
  /**
   * The guardrail associated with the agent.
   */
  public guardrail?: IGuardrail;
  // ------------------------------------------------------
  // Internal Only
  // ------------------------------------------------------
  /**
   * The L1 representation of the agent
   */
  private readonly __resource: bedrock.CfnAgent;

  // ------------------------------------------------------
  // CONSTRUCTOR
  // ------------------------------------------------------
  constructor(scope: Construct, id: string, props: AgentProps) {
    super(scope, id);

    // ------------------------------------------------------
    // Set properties and defaults
    // ------------------------------------------------------
    this.name =
      props.name ?? generatePhysicalNameV2(this, 'bedrock-agent', { maxLength: 64, lower: true, separator: '-' });
    this.idleSessionTTL = props.idleSessionTTL ?? Duration.hours(1);
    this.shouldPrepareAgent = props.shouldPrepareAgent ?? false;
    this.userInputEnabled = props.userInputEnabled ?? false;
    this.codeInterpreterEnabled = props.codeInterpreterEnabled ?? false;
    this.foundationModel = props.foundationModel;
    this.forceDelete = props.forceDelete ?? false;
    // Optional
    this.description = props.description;
    this.instruction = props.instruction;
    this.promptOverrideConfiguration = props.promptOverrideConfiguration;
    this.kmsKey = props.kmsKey;

    // ------------------------------------------------------
    // Role
    // ------------------------------------------------------
    // If existing role is provided, use it.
    if (props.existingRole) {
      this.role = props.existingRole;
      // Otherwise, create a new one
    } else {
      this.role = new iam.Role(this, 'Role', {
        // generate a role name
        roleName: generatePhysicalNameV2(this, 'AmazonBedrockExecutionRoleForAgents_', { maxLength: 64, lower: false }),
        // ensure the role has a trust policy that allows the Bedrock service to assume the role
        assumedBy: new iam.ServicePrincipal('bedrock.amazonaws.com').withConditions({
          StringEquals: {
            'aws:SourceAccount': Stack.of(this).account,
          },
          ArnLike: {
            'aws:SourceArn': Stack.of(this).formatArn({
              service: 'bedrock',
              resource: 'agent',
              resourceName: '*',
              arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
            }),
          },
        }),
      });
      // add the appropriate permissions to use the FM
      this.foundationModel.grantInvoke(this.role);
    }

    // ------------------------------------------------------
    // Set Lazy Props initial values
    // ------------------------------------------------------
    this.knowledgeBases = [];
    this.actionGroups = [];
    // Add Default Action Groups
    this.addActionGroup(AgentActionGroup.userInput(this.userInputEnabled));
    this.addActionGroup(AgentActionGroup.codeInterpreter(this.codeInterpreterEnabled));

    // Add specified elems through methods to handle permissions
    // this needs to happen after role creation / assignment
    props.knowledgeBases?.forEach(kb => {
      this.addKnowledgeBase(kb);
    });
    props.actionGroups?.forEach(ag => {
      this.addActionGroup(ag);
    });
    if (props.guardrail) {
      this.addGuardrail(props.guardrail);
    }

    // ------------------------------------------------------
    // Set Lazy Validations
    // ------------------------------------------------------
    this.node.addValidation({
      validate: () => this.validateKnowledgeBaseAssocations(),
    });

    // ------------------------------------------------------
    // CFN Props - With Lazy support
    // ------------------------------------------------------
    const cfnProps: bedrock.CfnAgentProps = {
      actionGroups: Lazy.any({ produce: () => this.renderActionGroups() }, { omitEmptyArray: true }),
      agentName: this.name,
      agentResourceRoleArn: this.role.roleArn,
      autoPrepare: this.shouldPrepareAgent,
      customerEncryptionKeyArn: props.kmsKey?.keyArn,
      description: props.description,
      foundationModel: this.foundationModel.invokableArn,
      guardrailConfiguration: Lazy.any({ produce: () => this.renderGuardrail() }),
      idleSessionTtlInSeconds: this.idleSessionTTL.toSeconds(),
      instruction: props.instruction,
      knowledgeBases: Lazy.any({ produce: () => this.renderKnowledgeBases() }, { omitEmptyArray: true }),
      promptOverrideConfiguration: this.promptOverrideConfiguration?._render(),
      skipResourceInUseCheckOnDelete: this.forceDelete,
    };

    // ------------------------------------------------------
    // L1 Instantiation
    // ------------------------------------------------------
    this.__resource = new bedrock.CfnAgent(this, 'AgentResource', cfnProps);

    this.agentId = this.__resource.attrAgentArn;
    this.agentArn = this.__resource.attrAgentId;
    this.agentVersion = this.__resource.attrAgentVersion;
    this.lastUpdated = this.__resource.attrUpdatedAt;
    this.testAlias = AgentAlias.fromAttibutes(this, 'DefaultAlias', {
      aliasId: 'TSTALIASID',
      aliasName: 'AgentTestAlias',
      agentVersion: 'DRAFT',
      agent: this,
    });
  }

  // ------------------------------------------------------
  // HELPER METHODS - addX()
  // ------------------------------------------------------
  /**
   * Add knowledge base to the agent.
   */
  public addKnowledgeBase(knowledgeBase: IKnowledgeBase) {
    // Do some checks
    validation.throwIfInvalid(this.validateKnowledgeBase, knowledgeBase);
    // Add it to the array
    this.knowledgeBases.push(knowledgeBase);
    // Add the appropriate Permissions to query the Knowledge Base
    knowledgeBase.grantQuery(this.role);
  }

  /**
   * Add guardrail to the agent.
   */
  public addGuardrail(guardrail: IGuardrail) {
    // Do some checks
    validation.throwIfInvalid(this.validateGuardrail, guardrail);
    // Add it to the construct
    this.guardrail = guardrail;
    // Handle permissions
    guardrail.grantApply(this.role);
  }

  /**
   * Add an action group to the agent.
   */
  public addActionGroup(actionGroup: AgentActionGroup) {
    // Do some checks
    validation.throwIfInvalid(this.validateActionGroup, actionGroup);
    // Add it to the array
    this.actionGroups.push(actionGroup);
    // Handle permissions to invoke the lambda function
    actionGroup.executor?.lambdaFunction?.grantInvoke(this.role);
    actionGroup.executor?.lambdaFunction?.addPermission(`BedrockAgentLambdaInvocationPolicy-${this.node.addr}`, {
      principal: new iam.ServicePrincipal('bedrock.amazonaws.com'),
      sourceArn: this.agentArn,
      sourceAccount: Stack.of(this).account,
    });
  }

  // ------------------------------------------------------
  // Lazy Renderers
  // ------------------------------------------------------
  /**
   * Render the guardrail configuration.
   *
   * @internal This is an internal core function and should not be called directly.
   */
  private renderGuardrail(): bedrock.CfnAgent.GuardrailConfigurationProperty | undefined {
    return this.guardrail
      ? {
        guardrailIdentifier: this.guardrail.guardrailId,
        guardrailVersion: this.guardrail.guardrailVersion,
      }
      : undefined;
  }

  /**
   * Render the knowledge base associations.
   *
   * @internal This is an internal core function and should not be called directly.
   */
  private renderKnowledgeBases(): bedrock.CfnAgent.AgentKnowledgeBaseProperty[] {
    const knowledgeBaseAssociationsCfn: bedrock.CfnAgent.AgentKnowledgeBaseProperty[] = [];
    // Build the associations in the CFN format
    this.knowledgeBases.forEach(kb => {
      knowledgeBaseAssociationsCfn.push({
        knowledgeBaseId: kb.knowledgeBaseId,
        knowledgeBaseState: 'ENABLED',
        // at least one is defined as it has been validated when adding the kb
        description: kb.instructionForAgents ?? kb.description!,
      });
    });
    return knowledgeBaseAssociationsCfn;
  }

  /**
   * Render the action groups
   *
   * @internal This is an internal core function and should not be called directly.
   */
  private renderActionGroups(): bedrock.CfnAgent.AgentActionGroupProperty[] {
    const actionGroupsCfn: bedrock.CfnAgent.AgentActionGroupProperty[] = [];
    // Build the associations in the CFN format
    this.actionGroups.forEach(ag => {
      actionGroupsCfn.push(ag._render());
    });
    return actionGroupsCfn;
  }

  // ------------------------------------------------------
  // Validators
  // ------------------------------------------------------
  /**
   * Checks if the KB Association is valid
   *
   * @internal This is an internal core function and should not be called directly.
   */
  private validateKnowledgeBase = (knowledgeBase: IKnowledgeBase): string[] => {
    const MAX_LENGTH = 200;
    const description = knowledgeBase.instructionForAgents ?? knowledgeBase.description;
    const errors: string[] = [];
    // If at least one of the previous has been defined
    if (description) {
      errors.push(
        ...validation.validateStringFieldLength({
          value: description,
          fieldName: 'description',
          minLength: 0,
          maxLength: MAX_LENGTH,
        }),
      );
    } else {
      errors.push(
        'If instructionForAgents is not provided, the description property of the KnowledgeBase ' +
          `${knowledgeBase.knowledgeBaseId} must be provided.`,
      );
    }
    return errors;
  };
  /**
   * Checks if the KB Associations are valid
   *
   * @internal This is an internal core function and should not be called directly.
   */
  private validateKnowledgeBaseAssocations = (): string[] => {
    const MAX_KB_ASSOCIATIONS = 10;
    const errors: string[] = [];
    if (this.knowledgeBases.length > MAX_KB_ASSOCIATIONS) {
      errors.push(`The maximum number of knowledge bases associations is ${MAX_KB_ASSOCIATIONS}.`);
    }
    for (const kb of this.knowledgeBases) {
      this.validateKnowledgeBase(kb);
    }
    return errors;
  };
  /**
   * Checks if the Guardrail is valid
   *
   * @internal This is an internal core function and should not be called directly.
   */
  private validateGuardrail = (guardrail: IGuardrail): string[] => {
    const errors: string[] = [];
    if (this.guardrail) {
      errors.push(
        `Cannot add Guardrail ${guardrail.guardrailId}. ` +
          `Guardrail ${this.guardrail.guardrailId} has already been specified for this agent.`,
      );
    }
    errors.push(...validation.validateFieldPattern(guardrail.guardrailVersion, 'version', /^(([0-9]{1,8})|(DRAFT))$/));
    return errors;
  };
  /**
   * Check if the action group is valid
   */
  private validateActionGroup = (actionGroup: AgentActionGroup) => {
    console.log('Validating action group: ', actionGroup.name);
    let errors: string[] = [];
    // Find if there is a conflicting action group name
    if (this.actionGroups?.find(ag => ag.name === actionGroup.name)) {
      errors.push(`An action group with name: ${actionGroup.name} has already been defined`);
    }
    return errors;
  };
}
