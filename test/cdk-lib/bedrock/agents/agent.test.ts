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
          'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418'
        ),
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        CustomerEncryptionKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
      });

      expect(agent.kmsKey!.keyArn).toBe(
        'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418'
      );
    });

    test('Core Creation + Custom Role', () => {
      const myRole = Role.fromRoleArn(
        stack,
        'myRole',
        'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForAgent_12345678'
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
        'Cannot add Guardrail yib23y5g23b2wf. Guardrail oygh3o8g7rtl has already been specified for this agent.'
      );
    });
  });

  /*******************************************************
   *              KNOWLEDGE BASES in Agents				 *
   *******************************************************/
  describe('w/ Knowledge Bases', () => {
    let myKnowledgeBase: bedrock.IKnowledgeBase;

    beforeEach(() => {
      myKnowledgeBase = bedrock.KnowledgeBase.fromKnowledgeBaseAttributes(stack, 'myKnowledgeBase', {
        knowledgeBaseId: 'ABCDEFG1234',
        executionRoleArn: 'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBase_12345678',
        instructionForAgents: 'This is a sample KB with info about unicorns.',
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
      //WHEN
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });
      agent.addKnowledgeBase(myKnowledgeBase);

      //THEN
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
      const invalidKb = (myKnowledgeBase = bedrock.KnowledgeBase.fromKnowledgeBaseAttributes(
        stack,
        'otherKnowledgeBase',
        {
          knowledgeBaseId: 'ABCDEFG1234',
          executionRoleArn: 'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBase_12345678',
        }
      ));

      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });

      expect(() => agent.addKnowledgeBase(invalidKb)).toThrow(
        'If instructionForAgents is not provided, the description property of the KnowledgeBase ABCDEFG1234 must be provided.'
      );
    });
  });
});
