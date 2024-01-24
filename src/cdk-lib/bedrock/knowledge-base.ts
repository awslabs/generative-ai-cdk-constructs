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
import { BedrockFoundationModel } from './models';
import { generatePhysicalNameV2 } from '../../common/helpers/utils';
import { VectorIndex } from '../opensearch-vectorindex';
import { VectorCollection } from '../opensearchserverless';

/**
 * Properties for a knowledge base
 */
export interface KnowledgeBaseProps {
  /**
   * The embeddings model for the knowledge base
   */
  readonly embeddingsModel: BedrockFoundationModel;

  /**
   * A narrative description of the knowledge base.
   *
   * A Bedrock Agent can use this description to determine if it should
   * query this Knowledge Base.
   *
   * @default - No description provided.
   */
  readonly description?: string;

  /**
   * The name of the vector index.
   *
   * @default - 'bedrock-knowledge-base-default-index'
   */
  readonly indexName?: string;

  /**
   * The name of the field in the vector index.
   *
   * @default - 'bedrock-knowledge-base-default-vector'
   */
  readonly vectorField?: string;
}

/**
 * Deploys a Bedrock Knowledge Base and configures a backend vector store.
 *
 * At the moment, only OpenSearch Serverless is supported as a vector store.
 * This construct creates the collection and index.
 */
export class KnowledgeBase extends Construct implements cdk.ITaggableV2 {
  /**
   * The name of the knowledge base.
   */
  public readonly name: string;

  /**
   * The role the Knowledge Base uses to access the vector store and data source.
   */
  public readonly role: iam.Role;

  /**
   * The vector store for the knowledge base.
   */
  public readonly vectorStore: VectorCollection;

  /**
   * A narrative description of the knowledge base.
   */
  public readonly description: string;

  /**
   * The ARN of the knowledge base.
   */
  public readonly knowledgeBaseArn: string;

  /**
   * The ID of the knowledge base.
   */
  public readonly knowledgeBaseId: string;

  /**
   * TagManager facilitates a common implementation of tagging for Constructs
   */
  public readonly cdkTagManager =
    new cdk.TagManager(cdk.TagType.MAP, 'Custom::Bedrock-KnowledgeBase');

  constructor(scope: Construct, id: string, props: KnowledgeBaseProps) {
    super(scope, id);
    const embeddingsModel = props.embeddingsModel;
    const description = props.description ?? '';
    const indexName = props.indexName ?? 'bedrock-knowledge-base-default-index';
    const vectorField = props.vectorField ?? 'bedrock-knowledge-base-default-vector';

    validateModel(embeddingsModel);

    this.name = generatePhysicalNameV2(
      this,
      'KB',
      { maxLength: 32 });
    const roleName = generatePhysicalNameV2(
      this,
      'AmazonBedrockExecutionRoleForKnowledgeBase',
      { maxLength: 64 });
    this.role = new iam.Role(this, 'Role', {
      roleName: roleName,
      assumedBy: new iam.ServicePrincipal('bedrock.amazonaws.com'),
    });
    this.role.assumeRolePolicy!.addStatements(
      new iam.PolicyStatement({
        actions: ['sts:AssumeRole'],
        principals: [new iam.ServicePrincipal('bedrock.amazonaws.com')],
        conditions: {
          StringEquals: {
            'aws:SourceAccount': cdk.Stack.of(this).account,
          },
          ArnLike: {
            'aws:SourceArn': cdk.Stack.of(this).formatArn({
              service: 'bedrock',
              resource: 'knowledge-base',
              resourceName: '*',
              arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
            }),
          },
        },
      }),
    );

    this.role.addToPolicy(new iam.PolicyStatement({
      actions: ['bedrock:InvokeModel'],
      resources: [embeddingsModel.asArn(this)],
    }));

    this.vectorStore = new VectorCollection(this, 'KBVectors');
    this.vectorStore.grantDataAccess(this.role);

    const vectorIndex = new VectorIndex(this, 'KBIndex', {
      collection: this.vectorStore,
      indexName,
      vectorField,
      vectorDimensions: 1536,
      mappings: [
        {
          mappingField: 'AMAZON_BEDROCK_TEXT_CHUNK',
          dataType: 'text',
          filterable: true,
        },
        {
          mappingField: 'AMAZON_BEDROCK_METADATA',
          dataType: 'text',
          filterable: false,
        },
      ],
    });

    vectorIndex.node.addDependency(this.vectorStore.dataAccessPolicy);

    const crProvider = BedrockCRProvider.getProvider(this);
    const knowledgeBase = new cdk.CustomResource(this, 'KB', {
      serviceToken: crProvider.serviceToken,
      resourceType: 'Custom::Bedrock-KnowledgeBase',
      properties: {
        knowledgeBaseConfiguration: {
          type: 'VECTOR',
          vectorKnowledgeBaseConfiguration: {
            embeddingModelArn: embeddingsModel.asArn(this),
          },
        },
        roleArn: this.role.roleArn,
        name: this.name,
        description: description,
        storageConfiguration: {
          type: 'OPENSEARCH_SERVERLESS',
          opensearchServerlessConfiguration: {
            collectionArn: this.vectorStore.collectionArn,
            vectorIndexName: indexName,
            fieldMapping: {
              vectorField: vectorField,
              textField: 'AMAZON_BEDROCK_TEXT_CHUNK',
              metadataField: 'AMAZON_BEDROCK_METADATA',
            },
          },
        },
        tags: this.cdkTagManager.renderedTags,
      },
    });

    const kbCRPolicy = new iam.Policy(this, 'KBCRPolicy', {
      roles: [crProvider.role],
      statements: [
        new iam.PolicyStatement({
          actions: ['bedrock:CreateKnowledgeBase'],
          resources: ['*'],
        }),
        new iam.PolicyStatement(
          {
            actions: [
              'bedrock:UpdateKnowledgeBase',
              'bedrock:DeleteKnowledgeBase',
              'bedrock:TagResource',
            ],
            resources: [
              cdk.Stack.of(this).formatArn({
                service: 'bedrock',
                resource: 'knowledge-base',
                resourceName: '*',
                arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
              }),
            ],
          },
        ),
        new iam.PolicyStatement(
          {
            actions: ['iam:PassRole'],
            resources: [this.role.roleArn],
          },
        ),
      ],
    });

    knowledgeBase.node.addDependency(this.role);
    knowledgeBase.node.addDependency(kbCRPolicy);
    knowledgeBase.node.addDependency(vectorIndex);

    NagSuppressions.addResourceSuppressions(
      kbCRPolicy,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: "Bedrock CreateKnowledgeBase can't be restricted by resource.",
        },
      ],
      true,
    );

    this.description = description;
    this.knowledgeBaseArn = knowledgeBase.getAttString('knowledgeBaseArn');
    this.knowledgeBaseId = knowledgeBase.getAttString('knowledgeBaseId');
  }
}

/**
 * Validate that Bedrock Knowledge Base can use the selected model.
 *
 * @internal This is an internal core function and should not be called directly.
 */
function validateModel(foundationModel: BedrockFoundationModel) {
  if (!foundationModel.supportsKnowledgeBase) {
    throw new Error(`The model ${foundationModel} is not supported by Bedrock Knowledge Base.`);
  }
}
