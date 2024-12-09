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

import { IAlias, IFunction } from "aws-cdk-lib/aws-lambda";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { FlowNode } from "./flow-nodes";
import { Prompt } from "../prompts/prompt";
import { IKnowledgeBase } from "../knowledge-base";
import { BedrockFoundationModel } from "../models";
import { IAgentAlias } from "../agent-alias";

/******************************************************************************
 *                              COMMON
 *****************************************************************************/
/**
 * The type of flow node.
 */
export enum FlowNodeType {
  INPUT = "Input",
  OUTPUT = "Output",
  KNOWLEDGE_BASE = "KnowledgeBase",
  CONDITION = "Condition",
  LEX = "Lex",
  PROMPT = "Prompt",
  LAMBDA = "LambdaFunction",
  AGENT = "Agent",
  STORAGE = "Storage",
  RETRIEVAL = "Retrieval",
  ITERATOR = "Iterator",
  COLLECTOR = "Collector",
}

/**
 * The data type of the input. If the input doesn't match this type at runtime,
 * a validation error will be thrown.
 */
export enum FlowNodeDataType {
  STRING = "String",
  NUMBER = "Number",
  BOOLEAN = "Boolean",
  OBJECT = "Object",
  ARRAY = "Array",
}

export interface FlowNodeInputSource {
  /**
   * The flow node to use as source.
   */
  readonly sourceNode: FlowNode;
  /**
   * The name of the output to use as source.
   * @default "Inferred if single output from source node"
   */
  readonly sourceOutputName?: string;
  /**
   * The expression to use for the output.
   * @default "$.data"
   */
  readonly expression?: string;
}

export interface UntypedFlowNodeInput {
  /**
   * Where the data from this input will be taken from.
   */
  readonly valueFrom: FlowNodeInputSource;
}

export interface TypedFlowNodeInput extends UntypedFlowNodeInput {
  /**
   * The flow node data type to use for the input.
   * @default FlowNodeDataType.STRING
   */
  readonly type?: FlowNodeDataType;
}

export interface NamedTypedFlowNodeInput extends TypedFlowNodeInput {
  /**
   * The name for the input.
   */
  readonly name: string;
}

export interface NamedFlowNodeOutput {
  /**
   * The name for the output.
   */
  readonly name: string;
  /**
   * The flow node data type to use for the output.
   * @default FlowNodeDataType.STRING
   */
  readonly type?: FlowNodeDataType;
}

/******************************************************************************
 *                              INPUT / OUTPUT
 *****************************************************************************/
/**
 * Properties common to all node types
 */
export interface BaseNodeProps {
  /**
   * The name of the node.
   */
  readonly name: string;
}

// ------------------------------------------------------------------
// INPUT Node
// ------------------------------------------------------------------
/**
 * The properties for an Input Data node.
 */
export interface InputDataNodeProps extends BaseNodeProps {
  /**
   * The input data type to use.
   * @default FlowNodeDataType.STRING
   */
  readonly inputDataType?: FlowNodeDataType;
}

// ------------------------------------------------------------------
// OUTPUT Node
// ------------------------------------------------------------------
/**
 * The properties for an Output Data node.
 */
export interface OutputDataNodeProps extends BaseNodeProps {
  /**
   * The output data to use.
   */
  readonly outputData: TypedFlowNodeInput;
}

/******************************************************************************
 *                             	PROCESSING
 *****************************************************************************/
// ------------------------------------------------------------------
// LAMBDA Node
// ------------------------------------------------------------------
/**
 * The properties for a Lambda Function Node.
 */
export interface LambdaFunctionNodeProps extends BaseNodeProps {
  /**
   * The Lambda function to use.
   */
  readonly lambdaFunction: IFunction;
  /**
   * The Lambda function alias to use in the node
   *
   * @default "$LATEST"
   */
  readonly functionAlias?: IAlias;
  /**
   * The inputs to use.
   */
  readonly inputs: NamedTypedFlowNodeInput[];
  /**
   * The output type to use for the `functionResponse` output.
   * @default FlowNodeDataType.STRING
   */
  readonly functionResponseType?: FlowNodeDataType;
}

// ------------------------------------------------------------------
// AGENT Node
// ------------------------------------------------------------------
/**
 * The properties for an Agent Node.
 */
export interface AgentNodeProps extends BaseNodeProps {
  /**
   * The Agent Alias this node refers to.
   */
  readonly agentAlias: IAgentAlias;
  /**
   * The prompt to send to the agent.
   */
  readonly agentInput: TypedFlowNodeInput;
  /**
   * Any prompt attributes to send alongside the prompt.
   *
   * @default - No prompt attributes.
   */
  readonly promptAttributes?: TypedFlowNodeInput;
  /**
   * Any session attributes to send alongside the prompt.
   *
   * @default - No session attributes.
   */
  readonly sessionAttributes?: TypedFlowNodeInput;
}

// ------------------------------------------------------------------
// PROMPT Node
// ------------------------------------------------------------------
/**
 * The properties for a Prompt Node.
 */
export interface PromptNodeProps extends BaseNodeProps {
  /**
   * The prompt to use.
   */
  readonly prompt: Prompt;
  /**
   * The inputs for the prompt.
   * @default - No input
   */
  readonly inputs?: NamedTypedFlowNodeInput[];
}

/******************************************************************************
 *                              STORAGE
 *****************************************************************************/
// ------------------------------------------------------------------
// Knowledge Base Node - Retrieve
// ------------------------------------------------------------------
/**
 * The properties for a Knowledge Base with retrieve functionality node.
 * @see https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_Retrieve.html
 */
export interface KnowledgeBaseRetrieveNodeProps extends BaseNodeProps {
  /**
   * The Knowledge base to use.
   */
  readonly knowledgeBase: IKnowledgeBase;
  /**
   * The input expression to use for the retrieval query.
   */
  readonly retrievalQuery: UntypedFlowNodeInput;
}

// ------------------------------------------------------------------
// Knowledge Base Node - RetrieveAndGenerate
// ------------------------------------------------------------------
/**
 * The properties for a Knowledge Base with retrieve and generate functionality node.
 * @see https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_RetrieveAndGenerate.html
 */
export interface KnowledgeBaseRetrieveAndGenerateNodeProps extends KnowledgeBaseRetrieveNodeProps {
  /**
   * The FM model to use to generate responses from the information it retrieves.
   */
  readonly model: BedrockFoundationModel;
}

// ------------------------------------------------------------------
// S3 Retieval Node
// ------------------------------------------------------------------
/**
 * The properties for an S3 Retrieval Data node.
 */
export interface S3RetrievalNodeProps extends BaseNodeProps {
  /**
   * The S3 bucket to use.
   */
  readonly bucket: IBucket;
  /**
   * The object key input to use.
   */
  readonly objectKeyInput: UntypedFlowNodeInput;
}

// ------------------------------------------------------------------
// S3 Storage Node
// ------------------------------------------------------------------
/**
 * The properties for an S3 Storage Data node.
 */
export interface S3StorageNodeProps extends BaseNodeProps {
  /**
   * The S3 bucket to use.
   */
  readonly bucket: IBucket;
  /**
   * The content input to use.
   */
  readonly contentInput: TypedFlowNodeInput;
  /**
   * The object key input to use.
   */
  readonly objectKeyInput: UntypedFlowNodeInput;
}

/******************************************************************************
 *                             	  AI
 *****************************************************************************/
// ------------------------------------------------------------------
// LEX Node
// ------------------------------------------------------------------
/**
 * The properties for a Lex Node.
 */
export interface LexBotNodeProps extends BaseNodeProps {
  /**
   * The Lex bot alias to use.
   */
  readonly botAliasArn: string;
  /**
   * The locale to use.
   * @default "en_US"
   */
  readonly localeId?: string;
  /**
   * The utterance to send to the bot.
   */
  readonly inputText: TypedFlowNodeInput;
  /**
   * Any request attributes to send alongside the prompt.
   * @see https://docs.aws.amazon.com/lexv2/latest/dg/context-mgmt-request-attribs.html
   */
  readonly requestAttributes?: TypedFlowNodeInput;
  /**
   * Any session attributes to send alongside the prompt.
   * @see https://docs.aws.amazon.com/lexv2/latest/dg/context-mgmt-session-attribs.html
   */
  readonly sessionAttributes?: TypedFlowNodeInput;
}

/******************************************************************************
 *                               LOGIC
 *****************************************************************************/
// ------------------------------------------------------------------
// CONDITION Node
// ------------------------------------------------------------------
/**
 * The properties for a Condition Node.
 */
export interface ConditionNodeProps extends BaseNodeProps {
  /**
   * The inputs to use for the node.
   */
  readonly inputs: NamedTypedFlowNodeInput[];
}

// ------------------------------------------------------------------
// ITERATOR Node
// ------------------------------------------------------------------
/**
 * The properties for an Iterator Node.
 */
export interface IteratorNodeProps extends BaseNodeProps {
  /**
   * The configuration to use for the `array` input.
   */
  readonly arrayInput: UntypedFlowNodeInput;
  /**
   * The array item data type to use.
   * @default FlowNodeDataType.STRING
   */
  readonly arrayItemDataType?: FlowNodeDataType;
}

// ------------------------------------------------------------------
// COLLECTOR Node
// ------------------------------------------------------------------
/**
 * The properties for a Collector Node.
 */
export interface CollectorNodeProps extends BaseNodeProps {
  /**
   * The configuration for the `arrayItem` input.
   */
  readonly arrayItemInput: TypedFlowNodeInput;

  /**
   * The configuration for the `arraySize` input.
   */
  readonly arraySizeInput: UntypedFlowNodeInput;
}

// ------------------------------------------------------------------
// Condition Logic
// ------------------------------------------------------------------
/**
 * The configuration for a predefined condition (condition and name already set).
 */
export interface PredefinedCondition {
  /**
   * Where to go next in case the condition is satisfied
   */
  readonly transitionTo: FlowNode;
}

/**
 * The configuration for a condition whose name has already been set.
 */
export interface FlowCondition extends PredefinedCondition {
  /**
   * The condition to use.
   */
  readonly conditionExpression?: string;
}

/**
 * The configuration for a condition whose name, condition, and transition needs to be specified..
 */
export interface NamedFlowCondition extends FlowCondition {
  /**
   * A name for the condition that you can reference.
   */
  readonly name: string;
}
