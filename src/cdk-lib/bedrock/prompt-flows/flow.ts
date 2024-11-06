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

import { Construct } from "constructs";
import { ArnFormat, aws_iam as iam, IResource, Resource, Stack } from "aws-cdk-lib";
import { IKey } from "aws-cdk-lib/aws-kms";
import { aws_bedrock as bedrock } from "aws-cdk-lib";
import * as fs from "fs";
import { FlowNode } from "./flow-nodes";
import { md5hash } from "aws-cdk-lib/core/lib/helpers-internal";
import { FlowVersion } from "./flow-version";

export enum ModelType {
  CUSTOM = "custom-model",
  FOUNDATIONAL = "foundation-model",
  PROVISIONED = "provisioned-model",
}

/******************************************************************************
 *                              COMMON
 *****************************************************************************/
/**
 * Represents a Prompt Flow, either created with CDK or imported.
 */
export interface IFlow extends IResource {
  /**
   * The service role used by the flow.
   */
  readonly executionRole: iam.IRole;
  /**
   * The ARN of the prompt flow.
   * @example "arn:aws:bedrock:us-east-1:123456789012:flow/EUTIGM37LX"
   */
  readonly flowArn: string;
  /**
   * The ID of the prompt flow.
   * @example "EUTIGM37LX"
   */
  readonly flowId: string;
  /**
   * The version of the flow.
   */
  flowVersion: string;
  /**
   * Method to create a Flow Version.
   */
  createVersion(description: string): string;
}

/**
 * Represents a Prompt Flow Definition.
 */
export class FlowDefinition {
  /**
   * The Amazon S3 location of the JSON flow definition. Appropriate Role permissions
   * need to be manually added from the console or with a custom role in CDK.
   */
  public static fromS3(location: bedrock.CfnFlow.S3LocationProperty) {
    return new FlowDefinition({ definitionS3Location: location });
  }

  /**
   * The definition of the flow must be provided as a JSON-formatted string.
   * Note that the string must match the format in
   * [FlowDefinition](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-bedrock-flow-flowdefinition.html) .
   */
  public static fromNodes(nodes: FlowNode[]) {
    return new FlowDefinition({
      definition: {
        nodes: nodes.map((item) => item.asNodeCfnProperty()),
        connections: nodes.flatMap((item) => item.connections.map((conn) => conn.asCfnProperty())),
      },
      nodes: nodes,
    });
  }

  /**
   * The definition of the flow provided as a local JSON file.
   *  Note that the file must match the format in
   * [FlowDefinition](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-bedrock-flow-flowdefinition.html) .
   */
  public static fromFile(path: string) {
    const definition = fs.readFileSync(path, "utf8");
    return new FlowDefinition({ definitionString: definition });
  }

  public readonly definition?: bedrock.CfnFlow.FlowDefinitionProperty;
  public readonly definitionS3Location?: bedrock.CfnFlow.S3LocationProperty;
  public readonly definitionString?: string;
  public readonly nodes?: FlowNode[];

  protected constructor(config: {
    definition?: bedrock.CfnFlow.FlowDefinitionProperty;
    definitionS3Location?: bedrock.CfnFlow.S3LocationProperty;
    definitionString?: string;
    nodes?: FlowNode[];
  }) {
    this.definition = config.definition;
    this.definitionS3Location = config.definitionS3Location;
    this.definitionString = config.definitionString;
    this.nodes = config.nodes;
  }
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
export interface FlowProps {
  /**
   * The name of the prompt flow.
   */
  readonly name: string;
  /**
   * The prompt flow content definition.
   */
  readonly definition: FlowDefinition;
  /**
   * A map that specifies the mappings for placeholder variables in the prompt flow definition.
   */
  readonly substitutions?: { [key: string]: any };
  /**
   * The description of what the prompt flow does.
   * @default - No description provided.
   */
  readonly description?: string;
  /**
   * The KMS key that the prompt is encrypted with.
   * @default - AWS owned and managed key
   */
  readonly encryptionKey?: IKey;
}

/******************************************************************************
 *                        NEW CONSTRUCT DEFINITION
 *****************************************************************************/
/**
 * Creates a prompt flow that you can use to send an input through various
 * steps to yield an output.
 * @see https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html
 * @resource AWS::Bedrock::Flow
 */
export class Flow extends Resource implements IFlow {
  /**
   * The service role used by the flow.
   */
  public readonly executionRole: iam.Role;
  /**
   * The ARN of the prompt flow.
   * @example "arn:aws:bedrock:us-east-1:123456789012:flow/EUTIGM37LX"
   */
  public readonly flowArn: string;
  /**
   * The ID of the prompt flow.
   * @example "EUTIGM37LX"
   */
  public readonly flowId: string;
  /**
   * The version of the prompt flow.
   * Defaults to "DRAFT" if no explicit version is created.
   */
  public flowVersion: string;
  /**
   * The computed hash of the flow properties.
   * @internal
   */
  public readonly _hash: string;
  /**
   * The L1 Flow resource
   */
  private readonly _resource: bedrock.CfnFlow;

  constructor(scope: Construct, id: string, props: FlowProps) {
    super(scope, id);

    // ------------------------------------------------------
    // Execution Role
    // ------------------------------------------------------
    // Create base execution role
    this.executionRole = new iam.Role(this, "AmazonBedrockExecutionRoleForFlows_", {
      assumedBy: new iam.ServicePrincipal("bedrock.amazonaws.com").withConditions({
        StringEquals: {
          "aws:SourceAccount": Stack.of(this).account,
        },
        ArnLike: {
          "aws:SourceArn": [
            Stack.of(this).formatArn({
              service: "bedrock",
              resource: "flow",
              resourceName: "*",
              arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
            }),
          ],
        },
      }),
    });

    // ------------------------------------------------------
    // CFN Props
    // ------------------------------------------------------
    const { definition, definitionS3Location, definitionString } = props.definition;
    const cfnProps: bedrock.CfnFlowProps = {
      name: props.name,
      executionRoleArn: this.executionRole.roleArn,
      description: props.description,
      definition,
      definitionS3Location,
      definitionString,
    };

    this._hash = md5hash(JSON.stringify(cfnProps));

    // ------------------------------------------------------
    // L1 Instance
    // ------------------------------------------------------
    this._resource = new bedrock.CfnFlow(this, "Resource", cfnProps);

    this.flowArn = this._resource.attrArn;
    this.flowId = this._resource.attrId;
    this.flowVersion = this._resource.attrVersion;

    // ------------------------------------------------------
    // Add appropriate permissions to the role
    // ------------------------------------------------------
    // Grant Get Flow Permissions
    this.executionRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ["bedrock:GetFlow"],
        resources: [this.flowArn],
      })
    );

    // If data must be encrypted with custom KMS key, add appropriate permissions
    if (props.encryptionKey) {
      props.encryptionKey.grantEncryptDecrypt(this.executionRole);
    }

    // If definition is provided as objects, inspect it, and add appropriate
    // permissions to the execution role
    if (props?.definition) {
      for (const node of props.definition.nodes!) {
        if (node.neededPolicyStatements) {
          for (const statement of node.neededPolicyStatements) {
            this.executionRole.addToPrincipalPolicy(statement);
          }
        }
      }
    }
  }

  // // ------------------------------------------------------
  // // Define via Method
  // // ------------------------------------------------------
  // public fromDefinition(definition: FlowDefinition){
  //   this.
  // }
  // ------------------------------------------------------
  // Create Version
  // ------------------------------------------------------
  /**
   * Create a version for the guardrail.
   * @param description The description of the version.
   * @returns The guardrail version.
   */
  public createVersion(description?: string): string {
    const flowVersion = new FlowVersion(this, `FlowVersion-${this._hash.slice(0, 16)}`, {
      flow: this,
      description: description,
    });

    this.flowVersion = flowVersion.version;
    return this.flowVersion;
  }
}
