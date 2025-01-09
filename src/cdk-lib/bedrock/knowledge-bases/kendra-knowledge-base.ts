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
export { KnowledgeBaseBase } from './knowledge-base';
import { Construct } from 'constructs';
import { CommonKnowledgeBaseProps, KnowledgeBaseBase, KnowledgeBaseType } from './knowledge-base';
import { IKendraGenAiIndex } from '../../kendra';
import * as bedrock from 'aws-cdk-lib/aws-bedrock';
import * as iam from 'aws-cdk-lib/aws-iam';
import { generatePhysicalNameV2 } from '../../../common/helpers/utils';
import { ArnFormat, Stack } from 'aws-cdk-lib';

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a Kendra Index Knowledge Base.
 */
export interface KendraKnowledgeBaseProps extends CommonKnowledgeBaseProps {
  /**
   * The Kendra Index to use for the knowledge base.
   */
  readonly kendraIndex: IKendraGenAiIndex;
}

export class KendraKnowledgeBase extends KnowledgeBaseBase {
  /**
   * The ARN of the knowledge base.
   */
  public readonly knowledgeBaseArn: string;
  /**
   * The ID of the knowledge base.
   */
  public readonly knowledgeBaseId: string;
  /**
   * The role the Knowledge Base uses to access the Kendra Index.
   */
  public readonly role: iam.IRole;
  /**
   * The name of the knowledge base.
   */
  public readonly name: string;
  /**
   * The GenAI Kendra Index.
   */
  public readonly kendraIndex: IKendraGenAiIndex;
  /**
   * The type of Knowledge Base
   */
  public readonly type: KnowledgeBaseType = KnowledgeBaseType.KENDRA;

  private readonly _resource: bedrock.CfnKnowledgeBase;

  constructor(scope: Construct, id: string, props: KendraKnowledgeBaseProps) {
    super(scope, id);
    // ------------------------------------------------------
    // Set properties or defaults
    // ------------------------------------------------------
    this.kendraIndex = props.kendraIndex;
    this.name = props.name ?? generatePhysicalNameV2(this, 'kendra-kb', { maxLength: 32, separator: '-' });

    // ------------------------------------------------------
    // Role
    // ------------------------------------------------------
    let policyAddition: iam.AddToPrincipalPolicyResult | undefined;
    if (props.existingRole) {
      this.role = props.existingRole;
    } else {
      const roleName = generatePhysicalNameV2(this, 'AmazonBedrockExecutionRoleForKnowledgeBase', { maxLength: 64 });
      this.role = new iam.Role(this, 'Role', {
        roleName: roleName,
        assumedBy: new iam.ServicePrincipal('bedrock.amazonaws.com', {
          conditions: {
            StringEquals: { 'aws:SourceAccount': Stack.of(this).account },
            ArnLike: {
              'aws:SourceArn': Stack.of(this).formatArn({
                service: 'bedrock',
                resource: 'knowledge-base',
                resourceName: '*',
                arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
              }),
            },
          },
        }),
      });
      policyAddition = this.role.addToPrincipalPolicy(
        new iam.PolicyStatement({
          sid: 'AmazonBedrockKnowledgeBaseKendraIndexAccessStatement',
          actions: ['kendra:Retrieve', 'kendra:DescribeIndex'],
          resources: [this.kendraIndex.indexArn],
        })
      );
    }
    // ------------------------------------------------------
    // L1 Instantiation
    // ------------------------------------------------------
    this._resource = new bedrock.CfnKnowledgeBase(this, 'MyCfnKnowledgeBase', {
      name: this.name,
      roleArn: this.role.roleArn,
      description: props.description,
      knowledgeBaseConfiguration: {
        type: KnowledgeBaseType.KENDRA,
        kendraKnowledgeBaseConfiguration: {
          kendraIndexArn: props.kendraIndex.indexArn,
        },
      },
    });
    // Ensure policy statement is added before creating KnowledgeBase
    this._resource.node.addDependency(policyAddition?.policyDependable!);

    this.knowledgeBaseArn = this._resource.attrKnowledgeBaseArn;
    this.knowledgeBaseId = this._resource.attrKnowledgeBaseId;
  }
}
