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

import { CfnFlow } from "aws-cdk-lib/aws-bedrock";
import { FlowNode } from "./flow-nodes";

export enum ConnectionType {
  DATA = "Data",
  CONDITIONAL = "Conditional",
}

/**
 * Properties require for all flow connections.
 */
export interface ConnectionCommonProps {
  /**
   * The name of the connection.
   */
  readonly name: string;
  /**
   * The node that the connection starts at.
   */
  readonly source: FlowNode;
  /**
   * The node that the connection ends at.
   */
  readonly target: FlowNode;
}

export interface DataConnectionProps extends ConnectionCommonProps {
  /**
   * The configuration of a connection originating from a simple node.
   */
  readonly config: DataConnectionConfiguration;
}

export interface ConditionalConnectionProps extends ConnectionCommonProps {
  /**
   * The name of the condition
   */
  readonly condition?: string;
}

export interface DataConnectionConfiguration {
  /**
   * The name of the output in the source node that the connection begins from.
   */
  readonly sourceOutput: string;
  /**
   * The name of the input in the target node that the connection ends at.
   */
  readonly targetInput: string;
}

/**
 *
 */
export class FlowConnection {
  // ------------------------------------------------------
  // Static Methods
  // ------------------------------------------------------
  /**
   * Static method to create a conditional connection.
   */
  public static conditional(props: ConditionalConnectionProps): FlowConnection {
    return new FlowConnection({
      name: props.name,
      source: props.source.name,
      target: props.target.name,
      type: ConnectionType.CONDITIONAL,
      configuration: {
        conditional: {
          condition: props.condition,
        },
      },
    });
  }
  /**
   * Static method to create a data connection.
   */
  public static data(props: DataConnectionProps): FlowConnection {
    return new FlowConnection({
      name: props.name,
      source: props.source.name,
      target: props.target.name,
      type: ConnectionType.DATA,
      configuration: {
        data: props.config,
      },
    });
  }

  // ------------------------------------------------------
  // Constructor
  // ------------------------------------------------------
  readonly name: string;
  readonly source: string;
  readonly target: string;
  readonly type: ConnectionType;
  readonly configuration: CfnFlow.FlowConnectionConfigurationProperty;

  protected constructor(props: any) {
    this.name = props.name;
    this.source = props.source;
    this.target = props.target;
    this.type = props.type;
    this.configuration = props.configuration;
  }

  asCfnProperty(): CfnFlow.FlowConnectionProperty {
    return {
      name: this.name,
      source: this.source,
      target: this.target,
      type: this.type,
      configuration: this.configuration,
    };
  }

  // ------------------------------------------------------
  // Properties
  // ------------------------------------------------------
}
