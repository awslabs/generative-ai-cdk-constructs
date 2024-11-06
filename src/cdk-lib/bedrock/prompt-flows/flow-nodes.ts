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

import { Aws, aws_bedrock as bedrock, IResolvable, Lazy } from "aws-cdk-lib";
import { CfnFlow } from "aws-cdk-lib/aws-bedrock";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { FlowConnection } from "./flow-connections";
import {
  AgentNodeProps,
  CollectorNodeProps,
  ConditionNodeProps,
  FlowNodeDataType,
  FlowNodeType,
  InputDataNodeProps,
  IteratorNodeProps,
  KnowledgeBaseRetrieveAndGenerateNodeProps,
  KnowledgeBaseRetrieveNodeProps,
  LambdaFunctionNodeProps,
  LexBotNodeProps,
  NamedFlowCondition,
  NamedFlowNodeOutput,
  NamedTypedFlowNodeInput,
  OutputDataNodeProps,
  PredefinedCondition,
  PromptNodeProps,
  S3RetrievalNodeProps,
  S3StorageNodeProps,
} from "./flow-node-props";
import { PromptVariant } from "../prompts/prompt";

/******************************************************************************
 *                           CONSTRUCT PROPS
 *****************************************************************************/
/**
 * Defines the properties to create a Flow Node
 * Not exported as its use is internal-only.
 */
interface FlowNodeProps {
  /**
   * The name of the flow node.
   */
  readonly name: string;
  /**
   * The configurations for the node.
   */
  readonly configuration: bedrock.CfnFlow.FlowNodeConfigurationProperty;
  /**
   * The type of node.
   */
  readonly type: FlowNodeType;
  /**
   * The inputs to the node.
   */
  readonly inputs: NamedTypedFlowNodeInput[];
  /**
   * The outputs of the node.
   */
  readonly outputs: NamedFlowNodeOutput[];
  /**
   * The needed IAM policy statements needed to add to a Prompt Flow Execution Role in order
   * to use this node correctly within a Prompt Flow.
   * @default No Statements
   */
  readonly neededPolicyStatements?: PolicyStatement[];
  /**
   * The data connections established for this node.
   */
  readonly dataConnections?: FlowConnection[];
}

/******************************************************************************
 *                              CONSTRUCT
 *****************************************************************************/
/**
 * Class to create a new managed Flow Node.
 */
export class FlowNode {
  // ------------------------------------------------------
  // Basic Nodes
  // ------------------------------------------------------
  /**
   * Creates an input node. This can only be the first node in the flow.
   *
   * Outputs:
   * - `document` (User-defined type)
   */
  public static input(props: InputDataNodeProps): FlowNode {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.INPUT,
      configuration: { input: {} },
      inputs: [],
      outputs: [
        {
          name: "document",
          type: props.inputDataType,
        },
      ],
    });
  }

  /**
   * Creates an output node. This will be the last node in the flow.
   * You can specify multiple output nodes, one for every possible
   * execution branch.
   *
   * Inputs:
   * - `document` (User-defined type)
   */
  public static output(props: OutputDataNodeProps): FlowNode {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.OUTPUT,
      configuration: { output: {} },
      inputs: [
        {
          name: "document",
          type: props.outputData?.type,
          valueFrom: {
            sourceNode: props.outputData.valueFrom.sourceNode,
            sourceOutputName: props.outputData.valueFrom.sourceOutputName,
            expression: props.outputData.valueFrom.expression,
          },
        },
      ],
      outputs: [],
    });
  }

  // ------------------------------------------------------
  // Code Nodes
  // ------------------------------------------------------
  /**
   * Creates a Lambda Function node which lets you call a Lambda function
   * in which you can define code to carry out business logic.
   *
   * Inputs:
   * - User defined inputs.
   *
   * Outputs:
   * - `functionResponse` (User-defined type)
   */
  public static lambdaFunction(props: LambdaFunctionNodeProps) {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.LAMBDA,
      configuration: {
        lambdaFunction: {
          lambdaArn: props.lambdaFunction.functionArn,
        },
      },
      inputs: props.inputs,
      outputs: [
        {
          name: "functionResponse",
          type: props.functionResponseType,
        },
      ],
      neededPolicyStatements: [
        new PolicyStatement({
          actions: ["lambda:InvokeFunction"],
          resources: [props.lambdaFunction.functionArn, `${props.lambdaFunction.functionArn}:*`],
          conditions: {
            StringEquals: {
              "aws:ResourceAccount": Aws.ACCOUNT_ID,
            },
          },
        }),
      ],
    });
  }

  // ------------------------------------------------------
  // Orchestration Nodes
  // ------------------------------------------------------
  /**
   * Creates an Agent node that allows you to run an agent.
   *
   * Inputs:
   * - `agentInputText` (String)
   * - `promptAttributes` (Optional - User defined - defaults to Object)
   * - `sessionAttributes` (Optional - User defined - defaults to Object)
   *
   * Outputs:
   * - `agentResponse` (String)
   */
  public static agent(props: AgentNodeProps) {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.AGENT,
      configuration: {
        agent: {
          agentAliasArn: props.agentAlias.aliasArn,
        },
      },
      inputs: [
        {
          name: "agentInputText",
          type: props.agentInput?.type,
          valueFrom: {
            sourceNode: props.agentInput.valueFrom.sourceNode,
            sourceOutputName: props.agentInput.valueFrom.sourceOutputName,
            expression: props.agentInput.valueFrom.expression,
          },
        },
        ...(props.promptAttributes
          ? [
              {
                name: "promptAttributes",
                type: props.promptAttributes.type ?? FlowNodeDataType.OBJECT,
                valueFrom: props.promptAttributes.valueFrom,
              },
            ]
          : []),
        ...(props.sessionAttributes
          ? [
              {
                name: "sessionAttributes",
                type: props.sessionAttributes.type ?? FlowNodeDataType.OBJECT,
                valueFrom: props.sessionAttributes.valueFrom,
              },
            ]
          : []),
      ],
      outputs: [
        {
          name: "agentResponse",
          type: FlowNodeDataType.STRING,
        },
      ],
      neededPolicyStatements: [
        new PolicyStatement({
          actions: ["bedrock:InvokeAgent"],
          resources: [props.agentAlias.aliasArn],
        }),
      ],
    });
  }

  /**
   * Creates a prompt node that allows you to run a prompt.
   *
   * Inputs:
   * - User defined inputs. The amount of inputs must be equal to the defined variables in the prompt.
   *
   * Outputs:
   * - `modelCompletion` (String)
   */
  public static prompt(props: PromptNodeProps) {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.PROMPT,
      configuration: {
        prompt: {
          sourceConfiguration: {
            resource: {
              promptArn: props.prompt.promptArn,
            },
          },
        },
      },
      inputs: props.inputs ?? [],
      outputs: [
        {
          name: "modelCompletion",
          type: FlowNodeDataType.STRING,
        },
      ],
      neededPolicyStatements: [
        new PolicyStatement({
          actions: ["bedrock:GetPrompt"],
          resources: [props.prompt.promptArn],
        }),
        // For those variants that have model ID, grant ability to invoke model
        ...props.prompt.variants
          .filter((variant: PromptVariant) => variant.modelId)
          .map(
            (variant: PromptVariant) =>
              new PolicyStatement({
                actions: ["bedrock:InvokeModel"],
                resources: [variant.modelId!],
              })
          ),
      ],
    });
  }

  // ------------------------------------------------------
  // Data Nodes
  // ------------------------------------------------------
  /**
   * Creates a Knowledge base node that returns retrieved results.
   *
   * Inputs:
   * - `retrievalQuery` (String)
   *
   * Outputs:
   * - `retrievalResults` (Array)
   */
  public static knowledgeBaseRetrieve(props: KnowledgeBaseRetrieveNodeProps): FlowNode {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.KNOWLEDGE_BASE,
      configuration: {
        knowledgeBase: {
          knowledgeBaseId: props.knowledgeBase.knowledgeBaseId,
        },
      },
      inputs: [
        {
          name: "retrievalQuery",
          type: FlowNodeDataType.STRING,
          valueFrom: props.retrievalQuery.valueFrom,
        },
      ],
      outputs: [
        {
          name: "retrievalResults",
          type: FlowNodeDataType.ARRAY,
        },
      ],
      neededPolicyStatements: [
        new PolicyStatement({
          actions: ["bedrock:Retrieve"],
          resources: [props.knowledgeBase.knowledgeBaseArn],
        }),
      ],
    });
  }

  /**
   * Creates a Knowledge base node that returns generates a response based on
   * retrieved results.
   *
   * Inputs:
   * - `retrievalQuery` (String)
   *
   * Outputs:
   * - `outputText` (String)
   */
  public static knowledgeBaseRetrieveAndGenerate(props: KnowledgeBaseRetrieveAndGenerateNodeProps) {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.KNOWLEDGE_BASE,
      configuration: {
        knowledgeBase: {
          knowledgeBaseId: props.knowledgeBase.knowledgeBaseId,
          modelId: props.model.modelId,
        },
      },
      inputs: [
        {
          name: "retrievalQuery",
          type: FlowNodeDataType.STRING,
          valueFrom: props.retrievalQuery.valueFrom,
        },
      ],
      outputs: [
        {
          name: "outputText",
          type: FlowNodeDataType.STRING,
        },
      ],
      neededPolicyStatements: [
        new PolicyStatement({
          actions: ["bedrock:RetrieveAndGenerate"],
          resources: [props.knowledgeBase.knowledgeBaseArn],
        }),
      ],
    });
  }

  /**
   * Creates an S3 retrieval node.
   *
   * Inputs:
   * - `objectKey` (String)
   *
   * Outputs:
   * - `s3Content` (String)
   */
  public static s3Retrieval(props: S3RetrievalNodeProps) {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.RETRIEVAL,
      configuration: {
        retrieval: {
          serviceConfiguration: {
            s3: {
              bucketName: props.bucket.bucketName,
            },
          },
        },
      },
      inputs: [
        {
          name: "objectKey",
          type: FlowNodeDataType.STRING,
          valueFrom: props.objectKeyInput.valueFrom,
        },
      ],
      outputs: [
        {
          name: "s3Content",
          type: FlowNodeDataType.STRING,
        },
      ],
      neededPolicyStatements: [
        new PolicyStatement({
          actions: ["s3:GetObject"],
          resources: [props.bucket.arnForObjects("*")],
          conditions: {
            StringEquals: {
              "aws:ResourceAccount": Aws.ACCOUNT_ID,
            },
          },
        }),
      ],
    });
  }

  /**
   * Creates an S3 storage node.
   *
   * Inputs:
   * - `content` (User-defined type)
   * - `objectKey` (String)
   *
   * Outputs:
   * - `s3Uri` (String)
   */
  public static s3Storage(props: S3StorageNodeProps) {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.STORAGE,
      configuration: {
        storage: {
          serviceConfiguration: {
            s3: {
              bucketName: props.bucket.bucketName,
            },
          },
        },
      },
      inputs: [
        {
          name: "content",
          type: props.contentInput.type,
          valueFrom: props.contentInput.valueFrom,
        },
        {
          name: "objectKey",
          type: FlowNodeDataType.STRING,
          valueFrom: props.objectKeyInput.valueFrom,
        },
      ],
      outputs: [
        {
          name: "s3Uri",
          type: FlowNodeDataType.STRING,
        },
      ],
      neededPolicyStatements: [
        new PolicyStatement({
          actions: ["s3:PutObject"],
          resources: [props.bucket.bucketArn, props.bucket.arnForObjects("*")],
          conditions: {
            StringEquals: {
              "aws:ResourceAccount": Aws.ACCOUNT_ID,
            },
          },
        }),
      ],
    });
  }
  // ------------------------------------------------------
  // AI Nodes
  // ------------------------------------------------------
  /**
   * Creates a Lex Node
   *
   * Inputs:
   * - `content` (User-defined type)
   * - `objectKey` (String)
   *
   * Outputs:
   * - `s3Uri` (String)
   */
  public static lexBot(props: LexBotNodeProps) {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.LEX,
      configuration: {
        lex: {
          botAliasArn: props.botAliasArn,
          localeId: props.localeId ?? "en_US",
        },
      },
      inputs: [
        {
          name: "inputText",
          type: props.inputText?.type ?? FlowNodeDataType.STRING,
          valueFrom: props.inputText.valueFrom,
        },
        ...(props.requestAttributes
          ? [
              {
                name: "requestAttributes",
                type: props.requestAttributes?.type ?? FlowNodeDataType.OBJECT,
                valueFrom: props.requestAttributes.valueFrom,
              },
            ]
          : []),
        ...(props.sessionAttributes
          ? [
              {
                name: "sessionAttributes",
                type: props.sessionAttributes?.type ?? FlowNodeDataType.OBJECT,
                valueFrom: props.sessionAttributes.valueFrom,
              },
            ]
          : []),
      ],
      outputs: [
        {
          name: "predictedIntent",
          type: FlowNodeDataType.STRING,
        },
      ],
      neededPolicyStatements: [
        new PolicyStatement({
          actions: ["lex:RecognizeUtterance"],
          resources: [props.botAliasArn],
          conditions: {
            StringEquals: {
              "aws:ResourceAccount": Aws.ACCOUNT_ID,
            },
          },
        }),
      ],
    });
  }

  // ------------------------------------------------------
  // Logic Nodes
  // ------------------------------------------------------
  /**
   * Creates a condition node that allows you to conditionally execute a flow.
   */
  public static conditionNode(props: ConditionNodeProps) {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.CONDITION,
      configuration: {},
      inputs: props.inputs,
      outputs: [],
    });
  }

  /**
   * Creates an iterator node that allows you to iterate over an array.
   *
   * This node takes an input array and iteratively sends each item of the array
   * as an output to the following node in the flow. It also returns the size of
   * the array in the output.
   *
   * The output flow node at the end of the flow iteration will return a response
   * for each member of the array. If you want to return only one consolidated
   * response, you can include a collector node downstream from this iterator node.
   *
   * Inputs:
   * - `array` (Array)
   *
   * Outputs:
   * - `arrayItem` (User-defined type - defaults to String)
   * - `arraySize` (Number)
   */
  public static iteratorNode(props: IteratorNodeProps) {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.ITERATOR,
      configuration: { iterator: undefined },
      inputs: [
        {
          name: "array",
          type: FlowNodeDataType.ARRAY,
          valueFrom: props.arrayInput.valueFrom,
        },
      ],
      outputs: [
        {
          name: "arrayItem",
          type: props.arrayItemDataType ?? FlowNodeDataType.STRING,
        },
        {
          name: "arraySize",
          type: FlowNodeDataType.NUMBER,
        },
      ],
    });
  }

  /**
   * Creates a collector node that allows you to collect results from an iterator.
   * Inputs:
   * - `arraySize` (Number)
   * - `arrayItem` (User-defined type - defaults to String)
   *
   * Outputs:
   * - `collectedArray` (Array)
   */
  public static collectorNode(props: CollectorNodeProps) {
    return new FlowNode({
      name: props.name,
      type: FlowNodeType.COLLECTOR,
      configuration: {
        collector: undefined,
      },
      inputs: [
        {
          name: "arraySize",
          type: FlowNodeDataType.NUMBER,
          valueFrom: props.arraySizeInput.valueFrom,
        },
        {
          name: "arrayItem",
          type: props.arrayItemInput.type ?? FlowNodeDataType.STRING,
          valueFrom: props.arrayItemInput.valueFrom,
        },
      ],
      outputs: [
        {
          name: "collectedArray",
          type: FlowNodeDataType.ARRAY,
        },
      ],
    });
  }
  // ------------------------------------------------------
  // Properties
  // ------------------------------------------------------
  /**
   * The name of the flow node.
   */
  public readonly name: string;
  /**
   * The type of node.
   */
  public readonly type: FlowNodeType;
  /**
   * The inputs to the node.
   */
  public readonly inputs: NamedTypedFlowNodeInput[];
  /**
   * The outputs of the node.
   */
  public readonly outputs: NamedFlowNodeOutput[];
  /**
   * The needed policy statements in order to use this node correctly within
   * a Prompt Flow.
   */
  public readonly neededPolicyStatements?: PolicyStatement[];
  /**
   * The configurations for the node.
   */
  public readonly connections: FlowConnection[];
  /**
   * The configurations for the node.
   */
  protected configuration: bedrock.CfnFlow.FlowNodeConfigurationProperty;
  /**
   * The configurations for the node.
   */
  protected readonly conditions: NamedFlowCondition[];

  // ------------------------------------------------------
  // Constructor
  // ------------------------------------------------------
  protected constructor(props: FlowNodeProps) {
    this.name = props.name;
    this.configuration = props.configuration;
    this.type = props.type;
    this.inputs = props.inputs;
    this.outputs = props.outputs;
    this.neededPolicyStatements = props.neededPolicyStatements;
    this.connections = this._computeConnections();
    this.conditions = [];
  }

  // ------------------------------------------------------
  // Methods
  // ------------------------------------------------------
  // /**
  //  * Returns the CloudFormation representation of this Flow node.
  //  */
  asNodeCfnProperty(): bedrock.CfnFlow.FlowNodeProperty | IResolvable {
    if (this.type == FlowNodeType.CONDITION) {
      return {
        name: this.name,
        configuration: {
          condition: {
            conditions: this._computeConditions(),
          },
        },
        type: this.type,
        inputs: this.inputs?.flatMap((item) => {
          return {
            name: item.name,
            type: item.type ?? FlowNodeDataType.STRING,
            expression: item.valueFrom.expression ?? "$.data",
          } as CfnFlow.FlowNodeInputProperty;
        }),
        outputs: this.outputs?.flatMap((item) => {
          return {
            name: item.name,
            type: item.type ?? FlowNodeDataType.STRING,
          } as CfnFlow.FlowNodeOutputProperty;
        }),
      };
    } else {
      return {
        name: this.name,
        configuration: this.configuration,
        type: this.type,
        inputs: this.inputs?.flatMap((item) => {
          return {
            name: item.name,
            type: item.type ?? FlowNodeDataType.STRING,
            expression: item.valueFrom.expression ?? "$.data",
          } as CfnFlow.FlowNodeInputProperty;
        }),
        outputs: this.outputs?.flatMap((item) => {
          return {
            name: item.name,
            type: item.type ?? FlowNodeDataType.STRING,
          } as CfnFlow.FlowNodeOutputProperty;
        }),
      };
    }
  }

  /**
   *
   * @internal
   */
  _computeConnections() {
    return this.inputs?.flatMap((input) => {
      return FlowConnection.data({
        name: `${this.name}_${input.name}`,
        source: input.valueFrom.sourceNode,
        target: this,
        config: {
          sourceOutput: input.valueFrom.sourceOutputName ?? input.valueFrom.sourceNode.outputs[0].name,
          targetInput: input.name,
        },
      });
    });
  }
  /**
   *
   * @internal
   */
  _computeDataConnections(): FlowConnection[] {
    return this.inputs?.flatMap((input) => {
      return FlowConnection.data({
        name: `${this.name}_${input.name}`,
        source: input.valueFrom.sourceNode,
        target: this,
        config: {
          sourceOutput: input.valueFrom.sourceOutputName ?? input.valueFrom.sourceNode.outputs[0].name,
          targetInput: input.name,
        },
      });
    });
  }

  /**
   *
   * @internal
   */
  _computeConditionalConnections(): FlowConnection[] {
    if (this.type != FlowNodeType.CONDITION) {
      return [];
    } else {
      if (this.conditions.length < 2) {
        throw new Error(
          "Condition nodes must have configured at least a condition, and a default transition. Use the appropriate methods"
        );
      } else {
        return this.conditions.flatMap((condition) => {
          return FlowConnection.conditional({
            name: `${this.name}_${condition.name}`,
            source: this,
            target: condition.transitionTo,
            condition: condition.conditionExpression,
          });
        });
      }
    }
  }

  /**
   *
   * @internal
   */
  _computeConditions(): IResolvable {
    if (this.conditions.length < 2) {
      throw new Error(
        "Condition nodes must have configured at least a condition, and a default transition. Use the appropriate methods"
      );
    } else {
      return Lazy.any(
        {
          produce: () => {
            return this.conditions.flatMap((item: NamedFlowCondition) => {
              return {
                name: item.name,
                expression: item.conditionExpression,
              } as bedrock.CfnFlow.FlowConditionProperty;
            });
          },
        },
        { omitEmptyArray: true }
      );
    }
  }

  addCondition(config: NamedFlowCondition) {
    if (this.type != FlowNodeType.CONDITION) {
      throw new Error("Only condition nodes can have conditions");
    } else {
      this.conditions.push(config);
      this.connections.push(
        FlowConnection.conditional({
          name: `${this.name}_${config.name}`,
          source: this,
          target: config.transitionTo,
          condition: config.name,
        })
      );
    }
  }

  addDefaultTransition(config: PredefinedCondition) {
    this.addCondition({ name: "default", ...config });
  }
}
