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
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';

import { BedrockCRProvider } from './custom-resource-provider';

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
   * The list of change ids to let CloudFormation determine when to update the alias.
   * A changeId is a hash of the properties of an agent, an agent/knowledge base association, or an action group.
   */
  readonly changeIds: string[];
  /**
   * The version of the agent to associate with the agent alias.
   *
   * @default - Creates a new version of the agent.
   */
  readonly agentVersion?: string;
}

export class AgentAlias extends Construct implements cdk.ITaggableV2 {
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
    new cdk.TagManager(cdk.TagType.MAP, 'Custom::Bedrock-AgentAlias');

  constructor(scope: Construct, id: string, props: AgentAliasProps) {
    super(scope, id);
    const crProvider = BedrockCRProvider.getProvider(this);

    const alias = new cdk.CustomResource(
      this,
      'Alias',
      {
        serviceToken: crProvider.serviceToken,
        resourceType: 'Custom::Bedrock-AgentAlias',
        properties: {
          agentId: props.agentId,
          aliasName: props.aliasName ?? 'latest',
          changeIds: props.changeIds,
          agentVersion: props.agentVersion,
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
            'bedrock:ListAgentAliases',
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

    alias.node.addDependency(aliasCRPolicy);
    alias.node.addDependency(crProvider);

    this.aliasId = alias.getAttString('agentAliasId');
    this.aliasArn = alias.getAttString('agentAliasArn');
    this.aliasName = alias.getAttString('agentAliasName');

  }
}