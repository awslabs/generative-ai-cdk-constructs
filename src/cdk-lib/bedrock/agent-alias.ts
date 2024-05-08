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


import { aws_bedrock as bedrock } from 'aws-cdk-lib';
import { Construct } from 'constructs';


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

export class AgentAlias extends Construct {
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


  constructor(scope: Construct, id: string, props: AgentAliasProps) {
    super(scope, id);


    const alias = new bedrock.CfnAgentAlias(this, 'MyCfnAgentAlias', {
      agentAliasName: props.aliasName ?? 'latest',
      agentId: props.agentId,
      routingConfiguration: [{
        agentVersion: props.agentVersion || '',
      }],
      tags: props.tags,
    });


    this.aliasId = alias.attrAgentAliasId;
    this.aliasArn = alias.attrAgentAliasArn;
    this.aliasName = props.aliasName ?? 'latest';

  }
}