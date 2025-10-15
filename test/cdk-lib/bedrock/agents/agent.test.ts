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
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Role } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Function, IFunction } from 'aws-cdk-lib/aws-lambda';
import * as bedrock from '../../../../src/cdk-lib/bedrock';
import { Memory } from '../../../../src/cdk-lib/bedrock/agents/memory';

describe('CDK-Agent', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });
  /*******************************************************
   *               Core tests for Agents				 *
   *******************************************************/
  describe('Core Tests', () => {
    test('Core Creation', () => {
      new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        description: 'This is a test agent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        Instruction: 'This is a test instruction',
      });
    });

    test('Core Properties - Defaults', () => {
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        description: 'This is a test agent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });

      expect(agent.name).toBe('TestAgent');
      expect(agent.description).toBe('This is a test agent');
      expect(agent.instruction).toBe('This is a test instruction');
      expect(agent.foundationModel).toBe(bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0);
      // Default User input and code interpreter
      expect(agent.actionGroups).toHaveLength(2);
      expect(agent.userInputEnabled).toBe(false);
      expect(agent.codeInterpreterEnabled).toBe(false);
      // Default Properties
      expect(agent.idleSessionTTL.toHours()).toBe(1);
      expect(agent.forceDelete).toBe(false);
      expect(agent.shouldPrepareAgent).toBe(false);
      expect(agent.lastUpdated).toBeDefined();
      expect(agent.agentArn).toBeDefined();
      expect(agent.agentId).toBeDefined();
      expect(agent.agentVersion).toBeDefined();
      expect(agent.testAlias).toBeDefined();
      // Role Created
      expect(agent.role).toBeDefined();
      // Other properties should be undefined or empty
      expect(agent.guardrail).toBeUndefined();
      expect(agent.knowledgeBases).toHaveLength(0);
      expect(agent.kmsKey).toBeUndefined();
    });

    test('Core Properties - Custom', () => {
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        description: 'This is a test agent',
        instruction: 'This is a test instruction',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        // Custom below
        idleSessionTTL: cdk.Duration.hours(2),
        forceDelete: true,
        shouldPrepareAgent: true,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        AutoPrepare: true,
        IdleSessionTTLInSeconds: 7200,
        SkipResourceInUseCheckOnDelete: true,
      });

      expect(agent.idleSessionTTL.toHours()).toBe(2);
      expect(agent.forceDelete).toBe(true);
      expect(agent.shouldPrepareAgent).toBe(true);
    });

    test('Core Creation + Custom KMS Key', () => {
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        description: 'This is a test agent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        kmsKey: Key.fromKeyArn(
          stack,
          'importedKey',
          'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
        ),
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        CustomerEncryptionKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
      });

      expect(agent.kmsKey!.keyArn).toBe(
        'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
      );
    });

    test('Core Creation + Custom Role', () => {
      const myRole = Role.fromRoleArn(
        stack,
        'myRole',
        'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForAgent_12345678',
      );
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        description: 'This is a test agent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        existingRole: myRole,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        AgentResourceRoleArn: 'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForAgent_12345678',
      });

      expect(agent.role).toEqual(myRole);
    });
  });

  /*******************************************************
   *               AGENT COLLABORATION                  *
   *******************************************************/
  describe('w/ Agent Collaboration', () => {
    test('Agent with SUPERVISOR_ROUTER collaboration mode', () => {
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        agentCollaboration: bedrock.AgentCollaboratorType.SUPERVISOR_ROUTER,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        AgentCollaboration: 'SUPERVISOR_ROUTER',
      });

      expect(agent.agentCollaboration).toBe(bedrock.AgentCollaboratorType.SUPERVISOR_ROUTER);
    });

    test('Agent with collaborator', () => {
      // Create a collaborator agent first
      const collaboratorAgent = new bedrock.Agent(stack, 'CollaboratorAgent', {
        name: 'CollaboratorAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'You are a specialized agent',
      });

      const collaboratorAlias = new bedrock.AgentAlias(stack, 'CollaboratorAlias', {
        agent: collaboratorAgent,
      });

      const mainAgent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        agentCollaboration: bedrock.AgentCollaboratorType.SUPERVISOR_ROUTER,
        agentCollaborators: [
          new bedrock.AgentCollaborator({
            agentAlias: collaboratorAlias,
            collaborationInstruction: 'Route specialized questions to this agent.',
            collaboratorName: 'SpecializedAgent',
            relayConversationHistory: true,
          }),
        ],
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        AgentCollaboration: 'SUPERVISOR_ROUTER',
        AgentCollaborators: Match.arrayEquals([
          {
            AgentDescriptor: {
              AliasArn: {
                'Fn::GetAtt': [
                  Match.stringLikeRegexp('CollaboratorAlias.*'),
                  'AgentAliasArn',
                ],
              },
            },
            CollaborationInstruction: 'Route specialized questions to this agent.',
            CollaboratorName: 'SpecializedAgent',
            RelayConversationHistory: 'TO_COLLABORATOR',
          },
        ]),
      });

      expect(mainAgent.agentCollaboration).toBe(bedrock.AgentCollaboratorType.SUPERVISOR_ROUTER);
      expect(mainAgent.agentCollaborators).toHaveLength(1);
      expect(mainAgent.agentCollaborators![0].collaboratorName).toBe('SpecializedAgent');
    });

    test('Agent with multiple collaborators', () => {
      // Create first collaborator agent
      const collaborator1Agent = new bedrock.Agent(stack, 'Collaborator1Agent', {
        name: 'Collaborator1Agent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'You are specialized agent 1',
      });

      const collaborator1Alias = new bedrock.AgentAlias(stack, 'Collaborator1Alias', {
        agent: collaborator1Agent,
      });

      // Create second collaborator agent
      const collaborator2Agent = new bedrock.Agent(stack, 'Collaborator2Agent', {
        name: 'Collaborator2Agent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'You are specialized agent 2',
      });

      const collaborator2Alias = new bedrock.AgentAlias(stack, 'Collaborator2Alias', {
        agent: collaborator2Agent,
      });

      const mainAgent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        agentCollaboration: bedrock.AgentCollaboratorType.SUPERVISOR_ROUTER,
        agentCollaborators: [
          new bedrock.AgentCollaborator({
            agentAlias: collaborator1Alias,
            collaborationInstruction: 'Route type 1 questions to this agent.',
            collaboratorName: 'SpecializedAgent1',
            relayConversationHistory: true,
          }),
          new bedrock.AgentCollaborator({
            agentAlias: collaborator2Alias,
            collaborationInstruction: 'Route type 2 questions to this agent.',
            collaboratorName: 'SpecializedAgent2',
            relayConversationHistory: false,
          }),
        ],
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        AgentCollaboration: 'SUPERVISOR_ROUTER',
        AgentCollaborators: Match.arrayWith([
          {
            AgentDescriptor: {
              AliasArn: {
                'Fn::GetAtt': [
                  Match.stringLikeRegexp('Collaborator1Alias.*'),
                  'AgentAliasArn',
                ],
              },
            },
            CollaborationInstruction: 'Route type 1 questions to this agent.',
            CollaboratorName: 'SpecializedAgent1',
            RelayConversationHistory: 'TO_COLLABORATOR',
          },
          {
            AgentDescriptor: {
              AliasArn: {
                'Fn::GetAtt': [
                  Match.stringLikeRegexp('Collaborator2Alias.*'),
                  'AgentAliasArn',
                ],
              },
            },
            CollaborationInstruction: 'Route type 2 questions to this agent.',
            CollaboratorName: 'SpecializedAgent2',
            RelayConversationHistory: 'DISABLED',
          },
        ]),
      });

      expect(mainAgent.agentCollaboration).toBe(bedrock.AgentCollaboratorType.SUPERVISOR_ROUTER);
      expect(mainAgent.agentCollaborators).toHaveLength(2);
      expect(mainAgent.agentCollaborators![0].collaboratorName).toBe('SpecializedAgent1');
      expect(mainAgent.agentCollaborators![1].collaboratorName).toBe('SpecializedAgent2');
    });
  });

  /*******************************************************
   *               ACTION GROUPS in Agents				 *
   *******************************************************/
  describe('w/ Action Group', () => {
    let myLambda: IFunction;
    let validActionGroup: bedrock.AgentActionGroup;

    beforeEach(() => {
      myLambda = Function.fromFunctionAttributes(stack, 'myLambda', {
        functionArn: 'arn:aws:lambda:us-east-1:123456789012:function:BedrockAgents-ActionGroup-zx7xWhBeRC0Z',
        sameEnvironment: true,
      });

      validActionGroup = new bedrock.AgentActionGroup({
        name: 'TestActionGroup',
        description: 'This is a test action group',
        executor: bedrock.ActionGroupExecutor.fromlambdaFunction(myLambda),
        // Load from local file
        apiSchema: bedrock.ApiSchema.fromLocalAsset(__dirname + '/api-schema.yaml'),
      });
    });

    test('Action Group - Props', () => {
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        actionGroups: [validActionGroup],
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        ActionGroups: Match.arrayEquals([
          // Default
          {
            ActionGroupName: 'UserInputAction',
            ActionGroupState: 'DISABLED',
            ParentActionGroupSignature: 'AMAZON.UserInput',
            SkipResourceInUseCheckOnDelete: false,
          },
          {
            ActionGroupName: 'CodeInterpreterAction',
            ActionGroupState: 'DISABLED',
            ParentActionGroupSignature: 'AMAZON.CodeInterpreter',
            SkipResourceInUseCheckOnDelete: false,
          },
          // User Defined
          {
            ActionGroupName: 'TestActionGroup',
            ActionGroupExecutor: {
              Lambda: 'arn:aws:lambda:us-east-1:123456789012:function:BedrockAgents-ActionGroup-zx7xWhBeRC0Z',
            },
            ActionGroupState: 'ENABLED',
            ApiSchema: {
              Payload: Match.stringLikeRegexp('openapi: 3.0.3.*'),
            },
            Description: 'This is a test action group',
            SkipResourceInUseCheckOnDelete: false,
          },
        ]),
      });

      expect(agent.actionGroups).toHaveLength(3);
    });

    test('Action Group - Method', () => {
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });

      agent.addActionGroup(validActionGroup);

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        ActionGroups: Match.arrayEquals([
          // Default
          {
            ActionGroupName: 'UserInputAction',
            ActionGroupState: 'DISABLED',
            ParentActionGroupSignature: 'AMAZON.UserInput',
            SkipResourceInUseCheckOnDelete: false,
          },
          {
            ActionGroupName: 'CodeInterpreterAction',
            ActionGroupState: 'DISABLED',
            ParentActionGroupSignature: 'AMAZON.CodeInterpreter',
            SkipResourceInUseCheckOnDelete: false,
          },
          // User Defined
          {
            ActionGroupName: 'TestActionGroup',
            ActionGroupExecutor: {
              Lambda: 'arn:aws:lambda:us-east-1:123456789012:function:BedrockAgents-ActionGroup-zx7xWhBeRC0Z',
            },
            ActionGroupState: 'ENABLED',
            ApiSchema: {
              Payload: Match.stringLikeRegexp('openapi: 3.0.3.*'),
            },
            Description: 'This is a test action group',
            SkipResourceInUseCheckOnDelete: false,
          },
        ]),
      });

      expect(agent.actionGroups).toHaveLength(3);
    });

    test('Action Group - Validation 1', () => {
      // Build path relative to this file
      const invalidActionGroup = new bedrock.AgentActionGroup({
        name: 'UserInputAction', // Same name as reserved
        description: 'This is a test action group with the same name for reserved Action Groups',
        executor: bedrock.ActionGroupExecutor.fromlambdaFunction(myLambda),
        // Load from local file
        apiSchema: bedrock.ApiSchema.fromLocalAsset(__dirname + '/api-schema.yaml'),
      });

      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });

      expect(() => agent.addActionGroup(invalidActionGroup)).toThrow();
    });
  });

  /*******************************************************
   *                GUARDRAIL in Agents				     *
   *******************************************************/
  describe('w/ Guardrail', () => {
    let myGuardrail: bedrock.IGuardrail;

    beforeEach(() => {
      myGuardrail = bedrock.Guardrail.fromGuardrailAttributes(stack, 'myGuardrail', {
        guardrailArn: 'arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl',
        guardrailVersion: 'DRAFT',
      });
    });

    test('Guardrail - Props', () => {
      // WHEN
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        guardrail: myGuardrail,
      });

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        GuardrailConfiguration: {
          GuardrailIdentifier: 'oygh3o8g7rtl',
          GuardrailVersion: 'DRAFT',
        },
      });

      expect(agent.guardrail).toBe(myGuardrail);
    });

    test('Guardrail - Method', () => {
      // WHEN
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });

      agent.addGuardrail(myGuardrail);

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        GuardrailConfiguration: {
          GuardrailIdentifier: 'oygh3o8g7rtl',
          GuardrailVersion: 'DRAFT',
        },
      });

      expect(agent.guardrail).toBe(myGuardrail);
    });

    test('Guardrail - Validation 1', () => {
      // WHEN
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        guardrail: myGuardrail,
      });

      const anotherGuardrail = bedrock.Guardrail.fromGuardrailAttributes(stack, 'anotherGuardrail', {
        guardrailArn: 'arn:aws:bedrock:us-east-1:123456789012:guardrail/yib23y5g23b2wf',
        guardrailVersion: 'DRAFT',
      });

      // THEN
      expect(() => agent.addGuardrail(anotherGuardrail)).toThrow(
        'Cannot add Guardrail yib23y5g23b2wf. Guardrail oygh3o8g7rtl has already been specified for this agent.',
      );
    });
  });

  /*******************************************************
   *              KNOWLEDGE BASES in Agents				 *
   *******************************************************/
  describe('w/ Knowledge Bases', () => {
    let myKnowledgeBase: bedrock.IVectorKnowledgeBase;

    beforeEach(() => {
      myKnowledgeBase = bedrock.VectorKnowledgeBase.fromKnowledgeBaseAttributes(stack, 'myKnowledgeBase', {
        knowledgeBaseId: 'ABCDEFG1234',
        executionRoleArn: 'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBase_12345678',
        instruction: 'This is a sample KB with info about unicorns.',
        vectorStoreType: bedrock.VectorStoreType.OPENSEARCH_SERVERLESS,
      });
    });

    test('Knowledge Bases - Props', () => {
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        knowledgeBases: [myKnowledgeBase],
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        KnowledgeBases: [
          {
            Description: 'This is a sample KB with info about unicorns.',
            KnowledgeBaseId: 'ABCDEFG1234',
            KnowledgeBaseState: 'ENABLED',
          },
        ],
      });

      expect(agent.knowledgeBases).toHaveLength(1);
    });

    test('Knowledge Bases - Method', () => {
      // WHEN
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });
      agent.addKnowledgeBase(myKnowledgeBase);

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        KnowledgeBases: [
          {
            Description: 'This is a sample KB with info about unicorns.',
            KnowledgeBaseId: 'ABCDEFG1234',
            KnowledgeBaseState: 'ENABLED',
          },
        ],
      });

      expect(agent.knowledgeBases).toHaveLength(1);
    });

    test('Knowledge Bases - Validation', () => {
      const invalidKb = (myKnowledgeBase = bedrock.VectorKnowledgeBase.fromKnowledgeBaseAttributes(
        stack,
        'otherKnowledgeBase',
        {
          knowledgeBaseId: 'ABCDEFG1234',
          executionRoleArn: 'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBase_12345678',
          vectorStoreType: bedrock.VectorStoreType.OPENSEARCH_SERVERLESS,
        },
      ));

      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });

      expect(() => agent.addKnowledgeBase(invalidKb)).toThrow(
        'If instructionForAgents is not provided, the description property of the KnowledgeBase ABCDEFG1234 must be provided.',
      );
    });
  });
  /*******************************************************
   *              MEMORY CONFIGURATION in Agents		 *
   *******************************************************/
  describe('w/ Memory Configuration', () => {
    test('default memory configuration is set correctly', () => {
      // WHEN
      new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        memory: Memory.SESSION_SUMMARY,
      });

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        MemoryConfiguration: {
          EnabledMemoryTypes: ['SESSION_SUMMARY'],
          StorageDays: 30,
          SessionSummaryConfiguration: {
            MaxRecentSessions: 20,
          },
        },
      });
    });

    test('custom memory configuration is set correctly', () => {
      // WHEN
      new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        memory: Memory.sessionSummary({
          memoryDurationDays: 60,
          maxRecentSessions: 30,
        }),
      });

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        MemoryConfiguration: {
          EnabledMemoryTypes: ['SESSION_SUMMARY'],
          StorageDays: 60,
          SessionSummaryConfiguration: {
            MaxRecentSessions: 30,
          },
        },
      });
    });

    test('memory duration days must be between 1 and 365', () => {
      // THEN
      expect(
        () =>
          new bedrock.Agent(stack, 'TestAgent', {
            name: 'TestAgent',
            foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
            instruction: 'This is a test instruction',
            memory: Memory.sessionSummary({
              memoryDurationDays: 366,
            }),
          }),
      ).toThrow(/memoryDurationDays must be between 1 and 365/);

      expect(
        () =>
          new bedrock.Agent(stack, 'TestAgent2', {
            name: 'TestAgent2',
            foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
            instruction: 'This is a test instruction',
            memory: Memory.sessionSummary({
              memoryDurationDays: 0,
            }),
          }),
      ).toThrow(/memoryDurationDays must be between 1 and 365/);
    });

    test('max recent sessions must be at least 1', () => {
      // THEN
      expect(
        () =>
          new bedrock.Agent(stack, 'TestAgent', {
            name: 'TestAgent',
            foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
            instruction: 'This is a test instruction',
            memory: Memory.sessionSummary({
              maxRecentSessions: 0,
            }),
          }),
      ).toThrow(/maxRecentSessions must be greater than 0/);
    });

    test('memory configuration can be disabled', () => {
      // WHEN
      new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        memory: undefined,
      });

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
      });

      const template = Template.fromStack(stack);
      template.hasResourceProperties(
        'AWS::Bedrock::Agent',
        Match.not({
          MemoryConfiguration: Match.anyValue(),
        }),
      );
    });
  });
});
