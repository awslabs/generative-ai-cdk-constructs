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
// export { KnowledgeBaseBase } from './knowledge-base';
// import { Construct } from 'constructs';
// import {
//   CommonKnowledgeBaseAttributes,
//   CommonKnowledgeBaseProps,
//   IKnowledgeBase,
//   KnowledgeBaseBase,
//   KnowledgeBaseType,
// } from './knowledge-base';
// import { IKendraGenAiIndex } from '../../kendra';
// import * as bedrock from 'aws-cdk-lib/aws-bedrock';
// import * as iam from 'aws-cdk-lib/aws-iam';
// import { generatePhysicalNameV2 } from '../../../common/helpers/utils';
// import { ArnFormat, Stack } from 'aws-cdk-lib';

/******************************************************************************
 *                             COMMON INTERFACES
 *****************************************************************************/
/**
 * Represents an Amazon Bedrock SQL Knowledge Base, either created with CDK or imported.
 */
// export interface ISqlKnowledgeBase extends IKnowledgeBase {}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a CDK-managed Amazon Bedrock SQL Knowledge Base.
 */
// export interface SqlKnowledgeBaseProps extends CommonKnowledgeBaseProps {}

/******************************************************************************
 *                      ATTRS FOR IMPORTED CONSTRUCT
 *****************************************************************************/
/**
 * Properties for importinf an Amazon Bedrock SQL Knowledge Base created outside of this stack.
 */
// export interface SqlKnowledgeBaseAttributes extends CommonKnowledgeBaseAttributes {}

/******************************************************************************
 *                              ABSTRACT CLASS
 *****************************************************************************/
// export abstract class SqlKnowledgeBaseBase extends KnowledgeBaseBase {
//   public abstract readonly knowledgeBaseArn: string;
//   public abstract readonly knowledgeBaseId: string;
//   public abstract readonly role: iam.IRole;
//   public readonly type: KnowledgeBaseType = KnowledgeBaseType.SQL;
// }

/******************************************************************************
 *                        		  CONSTRUCT
 *****************************************************************************/
// export class SqlKnowledgeBase extends SqlKnowledgeBaseBase {
//   // ------------------------------------------------------
//   // Import Methods
//   // ------------------------------------------------------
//   public static fromKnowledgeBaseAttributes(
//     scope: Construct,
//     id: string,
//     attrs: SqlKnowledgeBaseAttributes
//   ): ISqlKnowledgeBase {
//     const stack = Stack.of(scope);

//     class Import extends SqlKnowledgeBaseBase {
//       public readonly role = iam.Role.fromRoleArn(this, `kb-${attrs.knowledgeBaseId}-role`, attrs.executionRoleArn);
//       public readonly description = attrs.description;
//       public readonly instruction = attrs.instruction;
//       public readonly knowledgeBaseId = attrs.knowledgeBaseId;
//       public readonly knowledgeBaseArn = stack.formatArn({
//         service: 'bedrock',
//         resource: 'knowledge-base',
//         resourceName: attrs.knowledgeBaseId,
//         arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
//       });
//     }
//     return new Import(scope, id);
//   }
//   // ------------------------------------------------------
//   // Attributes
//   // ------------------------------------------------------
//   // inherited
//   public readonly knowledgeBaseArn: string;
//   public readonly knowledgeBaseId: string;
//   public readonly role: iam.IRole;

//   /**
//    * The name of the knowledge base.
//    */
//   public readonly name: string;

//   private readonly _resource: bedrock.CfnKnowledgeBase;

//   constructor(scope: Construct, id: string, props: SqlKnowledgeBaseProps) {
//     super(scope, id);
//     // ------------------------------------------------------
//     // Set properties or defaults
//     // ------------------------------------------------------
//     this.name = props.name ?? generatePhysicalNameV2(this, 'kendra-kb', { maxLength: 32, separator: '-' });

//     // ------------------------------------------------------
//     // Role
//     // ------------------------------------------------------

//     // ------------------------------------------------------
//     // L1 Instantiation
//     // ------------------------------------------------------
//     this._resource = new bedrock.CfnKnowledgeBase(this, 'MyCfnKnowledgeBase', {
//       name: this.name,
//       roleArn: this.role.roleArn,
//       description: props.description,
//       knowledgeBaseConfiguration: {
//         type: KnowledgeBaseType.SQL,
//       },
//     });

//     this.knowledgeBaseArn = this._resource.attrKnowledgeBaseArn;
//     this.knowledgeBaseId = this._resource.attrKnowledgeBaseId;
//   }
// }
