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

import { AgentDescriptor } from './agent-descriptor';

/**
 * Enum for collaborator's relay conversation history types.
 */
export enum AgentCollaboratorType {
  /**
     * Supervisor agent.
     */
  SUPERVISOR = 'SUPERVISOR',

  /**
     * Disabling collaboration.
     */
  DISABLED = 'DISABLED',

  /**
     * supervisor router.
     */
  SUPERVISOR_ROUTER = 'SUPERVISOR_ROUTER'
}

/**
 * Enum for collaborator's relay conversation history types.
 */
export enum RelayConversationHistoryType {
  /**
     * Sending to the collaborator.
     */
  TO_COLLABORATOR = 'TO_COLLABORATOR',

  /**
     * Disabling relay of conversation history to the collaborator.
     */
  DISABLED = 'DISABLED'
}

/**
 * Settings for agent collaboration with other agents.
 */
export interface AgentCollaborator {
  /**
     * Descriptor for the collaborating agent.
     */
  readonly agentDescriptor: AgentDescriptor;

  /**
     * Instructions on how this agent should collaborate with the main agent.
     */
  readonly collaborationInstruction: string;

  /**
     * A friendly name for the collaborator.
     */
  readonly collaboratorName: string;

  /**
     * Whether to relay conversation history to this collaborator.
     *
     * @default - undefined (uses service default)
     */
  readonly relayConversationHistory?: RelayConversationHistoryType;
}
