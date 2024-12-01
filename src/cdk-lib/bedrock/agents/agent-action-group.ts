import { CfnAgent } from "aws-cdk-lib/aws-bedrock";
import { ApiSchemaConfig } from "./api-schema";
import { ActionGroupExecutor } from "./api-executor";
import { Construct } from "constructs";

/******************************************************************************
 *                           SIgnatures
 *****************************************************************************/
/**
 * AWS Defined signatures for enabling certain capabilities in your agent.
 */
export class ParentActionGroupSignature {
  /**
   * Signature that allows your agent to request the user for additional information when trying to complete a task.
   */
  public static readonly USER_INPUT = new ParentActionGroupSignature("AMAZON.UserInput");
  /**
   * Signature that allows your agent to generate, run, and troubleshoot code when trying to complete a task.
   */
  public static readonly CODE_INTERPRETER = new ParentActionGroupSignature("AMAZON.CodeInterpreter");
  /**
   * Constructor should be used as a temporary solution when a new signature is supported
   * but its implementation in CDK hasn't been added yet.
   */
  constructor(public readonly value: string) {}
  public toString() {
    return this.value;
  }
}
/******************************************************************************
 *                         PROPS - Action Group Class
 *****************************************************************************/
export interface AgentActionGroupProps {
  /**
   * The name of the action group.
   */
  readonly name: string;

  /**
   * A description of the action group.
   *
   * @default - No description
   */
  readonly description?: string;

  /**
   * The API Schema
   *
   * @default - No API Schema
   */
  readonly apiSchema?: ApiSchemaConfig;

  /**
   * The action group executor.
   *
   * @default - No executor
   */
  readonly executor?: ActionGroupExecutor;

  /**
   * Specifies whether the action group is available for the agent to invoke or
   * not when sending an InvokeAgent request.
   *
   * @default true
   */
  readonly enabled?: boolean;

  /**
   * Specifies whether to delete the resource even if it's in use.
   *
   * @default false
   */
  readonly forceDelete?: boolean;

  /**
   * Defines functions that each define parameters that the agent needs to invoke from the user.
   * NO L2 as this doesn't make much sense IMHO
   */
  readonly functionSchema?: CfnAgent.FunctionSchemaProperty;

  /**
   * The AWS Defined signature for enabling certain capabilities in your agent.
   * When this property is specified, you must leave the description, apiSchema,
   * and actionGroupExecutor fields blank for this action group
   */
  readonly parentActionGroupSignature?: ParentActionGroupSignature;
}

/******************************************************************************
 *                         DEF - Action Group Class
 *****************************************************************************/

export class AgentActionGroup {
  // ------------------------------------------------------
  // Static Constructors
  // ------------------------------------------------------
  /**
   * Defines an action group that allows your agent to request the user for
   * additional information when trying to complete a task.
   * @param enabled Specifies whether the action group is available for the agent
   */
  public static userInput(enabled: boolean): AgentActionGroup {
    return new AgentActionGroup({
      name: "UserInput",
      enabled: enabled,
      parentActionGroupSignature: ParentActionGroupSignature.USER_INPUT,
    });
  }

  /**
   * Defines an action group that allows your agent to request the user for
   * additional information when trying to complete a task.
   * @param enabled Specifies whether the action group is available for the agent
   */
  public static codeInterpreter(enabled: boolean): AgentActionGroup {
    return new AgentActionGroup({
      name: "CodeInterpreter",
      enabled: enabled,
      parentActionGroupSignature: ParentActionGroupSignature.CODE_INTERPRETER,
    });
  }

  // ------------------------------------------------------
  // Attributes
  // ------------------------------------------------------
  /**
   * The name of the action group.
   */
  public readonly name: string;
  /**
   * A description of the action group.
   */
  public readonly description?: string;
  /**
   * Whether this action group is available for the agent to invoke or not.
   */
  public readonly enabled: boolean;
  /**
   * The api schema for this action group (if defined).
   */
  public readonly apiSchema?: ApiSchemaConfig;
  /**
   * The action group executor for this action group (if defined).
   */
  public readonly executor?: ActionGroupExecutor;
  /**
   * Whether to delete the resource even if it's in use.
   */
  public readonly forceDelete?: boolean;
  /**
   * The function schema for this action group (if defined).
   */
  public readonly functionSchema?: CfnAgent.FunctionSchemaProperty;
  /**
   * The AWS Defined signature (if defined).
   */
  public readonly parentActionGroupSignature?: ParentActionGroupSignature;

  public constructor(props: AgentActionGroupProps) {
    // Validate Props
    this.validateProps(props);

    // ------------------------------------------------------
    // Set attributes or defaults
    // ------------------------------------------------------
    this.name = props.name;
    this.description = props.description;
    this.apiSchema = props.apiSchema;
    this.executor = props.executor;
    this.enabled = props.enabled ?? true;
    this.forceDelete = props.forceDelete ?? false;
    this.functionSchema = props.functionSchema;
    this.parentActionGroupSignature = props.parentActionGroupSignature;
  }

  private validateProps(props: AgentActionGroupProps) {
    if (props.parentActionGroupSignature && (props.description || props.apiSchema || props.executor)) {
      throw new Error(
        "When parentActionGroupSignature is specified, you must leave the description, " +
          "apiSchema, and actionGroupExecutor fields blank for this action group"
      );
    }
  }

  public bind(_scope: Construct): CfnAgent.AgentActionGroupProperty {
    return {
      actionGroupExecutor: this.executor,
      actionGroupName: this.name,
      actionGroupState: this.enabled ? "ENABLED" : "DISABLED",
      apiSchema: this.apiSchema,
      description: this.description,
      functionSchema: this.functionSchema,
      parentActionGroupSignature: this.parentActionGroupSignature?.toString(),
      skipResourceInUseCheckOnDelete: this.forceDelete,
    };
  }
}
