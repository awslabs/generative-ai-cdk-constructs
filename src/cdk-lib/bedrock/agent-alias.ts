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

import { Arn, ArnFormat, aws_bedrock as bedrock, Resource } from 'aws-cdk-lib';
import { Construct } from 'constructs';


/**
 * Interface for both Imported and CDK-created Agent Aliases.
 */
export interface IAgentAlias {
  /**
   * The unique identifier of the agent alias.
   * @example `TCLCITFZTN`
   */
  readonly aliasId: string;
  /**
   * The unique identifier of the agent.
   * @example `DNCJJYQKSU`
   */
  readonly agentId: string;
  /**
   * The ARN of the agent alias.
   * @example `arn:aws:bedrock:us-east-1:123456789012:agent-alias/DNCJJYQKSU/TCLCITFZTN`
   */
  readonly aliasArn: string;
}

/**
 * Interface to create a new Agent Alias.
 */
export interface AgentAliasProps {
  /**
   * The unique identifier of the agent.
   */
  readonly agentId: string;
  /**
   * The name for the agent alias.
   *
   * @default - 'latest'
   */
  readonly aliasName?: string;
  /**
   * Description for the agent alias.
   *
   */
  readonly description?: string;
  /**
   * The list of resource update timestamps to let CloudFormation determine when to update the alias.
   */
  readonly resourceUpdates?: string[];
  /**
   * The version of the agent to associate with the agent alias.
   *
   * @default - Creates a new version of the agent.
   */
  readonly agentVersion?: string;

  /**
   * OPTIONAL: Tag (KEY-VALUE) bedrock agent resource
   *
   * @default - false
   */
  readonly tags?: Record<string, string>;
}

export class AgentAlias extends Construct implements IAgentAlias {
  // ------------------------------------------------------
  // Imports
  // ------------------------------------------------------
  /**
   * Brings an Agent Alias from an existing one created outside of CDK.
   */
  public static fromAliasArn(scope: Construct, id: string, aliasArn: string): IAgentAlias {
    class Import extends Resource implements IAgentAlias {
      public readonly aliasArn = aliasArn;
      public readonly aliasId: string;
      public readonly agentId: string;

      constructor() {
        super(scope, id);
        [this.agentId, this.aliasId] = this.parseArnComponents(aliasArn);
      }

      private parseArnComponents(arn: string): [string, string] {
        const resourceName = Arn.split(arn, ArnFormat.SLASH_RESOURCE_SLASH_RESOURCE_NAME).resourceName!;
        const [agentId, aliasId] = resourceName.split('/');
        return [agentId, aliasId];
      }
    }
    return new Import();
  }

  // ------------------------------------------------------
  // CDK-created Agent Alias
  // ------------------------------------------------------
  /**
   * The unique identifier of the agent.
   */
  public readonly agentId: string;
  /**
   * The unique identifier of the agent alias.
   * @example `TCLCITFZTN`
   */
  public readonly aliasId: string;
  /**
   * The ARN of the agent alias.
   * @example `arn:aws:bedrock:us-east-1:123456789012:agent-alias/DNCJJYQKSU/TCLCITFZTN`
   */
  public readonly aliasArn: string;
  /**
   * The name for the agent alias.
   */
  public readonly aliasName: string;


  constructor(scope: Construct, id: string, props: AgentAliasProps) {
    super(scope, id);


    const alias = new bedrock.CfnAgentAlias(this, 'MyCfnAgentAlias', {
      agentAliasName: props.aliasName ?? 'latest',
      agentId: props.agentId,
      tags: props.tags,
      description: props.description,
    });

    if (props.agentVersion) {
      alias.routingConfiguration = [{
        agentVersion: props.agentVersion,
      }];
    }

    this.agentId = props.agentId;
    this.aliasId = alias.attrAgentAliasId;
    this.aliasArn = alias.attrAgentAliasArn;
    this.aliasName = props.aliasName ?? 'latest';

  }


}