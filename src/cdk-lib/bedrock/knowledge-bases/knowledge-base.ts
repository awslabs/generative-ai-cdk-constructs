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

import { IResource, Resource } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/******************************************************************************
 *                              ENUMS
 *****************************************************************************/
/**
 * Types of possible knowledge bases supported by Amazon Bedrock Knowledge Bases.
 */
export enum KnowledgeBaseType {
  /** Vector database with emebeddings vectors*/
  VECTOR = 'VECTOR',
  /** Kendra GenAI Index  */
  KENDRA = 'KENDRA',
  /** Structured data store (e.g. REDSHIFT) */
  SQL = 'SQL',
}

/******************************************************************************
 *                             COMMON INTERFACE
 *****************************************************************************/
/**
 * Represents a Knowledge Base, either created with CDK or imported, of any type.
 */
export interface IKnowledgeBase extends IResource {
  /**
   * The ARN of the knowledge base.
   * @example "arn:aws:bedrock:us-east-1:123456789012:knowledge-base/KB12345678"
   */
  readonly knowledgeBaseArn: string;

  /**
   * The ID of the knowledge base.
   * @example "KB12345678"
   */
  readonly knowledgeBaseId: string;

  /**
   * The role associated with the knowledge base.
   */
  readonly role: iam.IRole;

  /**
   * The type of knowledge base.
   */
  readonly type: KnowledgeBaseType;

  /**
   * A narrative instruction of the knowledge base.
   * A Bedrock Agent can use this instruction to determine if it should
   * query this Knowledge Base.
   */
  readonly instruction?: string;
}

export interface CommonKnowledgeBaseProps {
  /**
   * The name of the knowledge base.
   */
  readonly name?: string;

  /**
   * The description of the knowledge base.
   *
   * @default - No description provided.
   */
  readonly description?: string;

  /**
   * Existing IAM role with a policy statement
   * granting permission to invoke the specific embeddings model.
   * Any entity (e.g., an AWS service or application) that assumes
   * this role will be able to invoke or use the
   * specified embeddings model within the Bedrock service.
   */
  readonly existingRole?: iam.IRole;

  /**
   * A narrative description of the knowledge base.
   *
   * A Bedrock Agent can use this instruction to determine if it should
   * query this Knowledge Base.
   *
   * @default - No description provided.
   */
  readonly instruction?: string;
}
/******************************************************************************
 *                              ABSTRACT CLASS
 *****************************************************************************/
/**
 * Abstract base class for Knowledge Base.
 * Contains methods valid for KBs either created with CDK or imported.
 */
export abstract class KnowledgeBaseBase extends Resource implements IKnowledgeBase {
  public abstract readonly knowledgeBaseArn: string;
  public abstract readonly knowledgeBaseId: string;
  public abstract readonly role: iam.IRole;
  public abstract readonly type: KnowledgeBaseType;
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}
