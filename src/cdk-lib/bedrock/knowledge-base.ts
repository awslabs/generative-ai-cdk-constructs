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
import { BedrockCRProvider } from './custom-resources';
import { BedrockFoundationModel } from './models';
import { OpenSearchVectorCollection, OpenSearchVectorIndex } from '../../common/helpers/aoss-vector';
import { generatePhysicalName } from '../../common/helpers/utils';

/**
 * Bedrock foundation embeddings models supported by Bedrock Knowledge Bases.
 *
 * If you need to use a model name that doesn't exist as a static member, you
 * can instantiate a `BedrockKBEmbeddingsModel` object, e.g: `new BedrockKBEmbeddingsModel('my-model')`.
 */
export class BedrockKBEmbeddingsModel extends BedrockFoundationModel {
  public static TITAN_EMBED_TEXT_V1 = BedrockFoundationModel.TITAN_EMBED_TEXT_V1;
  public static COHERE_EMBED_ENGLISH_V3 = BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3;
  public static COHERE_EMBED_MULTILINGUAL_V3 = BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3;
}


// export interface KnowledgeBaseProps {
//   embeddingsModel: BedrockKBEmbeddingsModel;
//   description?: string;
//   indexName?: string;
//   vectorField?: string;
// }

/**
 * Properties for a knowledge base
 */
export interface KnowledgeBaseProps {
  /**
   * The embeddings model for the knowledge base
   */
  embeddingsModel: BedrockKBEmbeddingsModel;

  /**
   * A narrative description of the knowledge base.
   *
   * A Bedrock Agent can use this description to determine if it should
   * query this Knowledge Base.
   *
   * @default - No description provided.
   */
  description?: string;

  /**
   * The name of the vector index.
   *
   * @default - 'bedrock-knowledge-base-default-index'
   */
  indexName?: string;

  /**
   * The name of the field in the vector index.
   *
   * @default - 'bedrock-knowledge-base-default-vector'
   */
  vectorField?: string;
}

/**
 * Deploys a Bedrock Knowledge Base and configures a backend vector store.
 *
 * At the moment, only OpenSearch Serverless is supported as a vector store.
 * This construct creates the collection and index.
 */
export class KnowledgeBase extends Construct {
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
  public readonly vectorStore: OpenSearchVectorCollection;

  /**
   * The custom resource that provisions the knowledge base.
   */
  public readonly knowledgeBase: cdk.CustomResource;

  /**
   * A narrative description of the knowledge base.
   */
  public readonly description: string;

  /**
   * The ARN of the knowledge base.
   */
  public readonly kbArn: string;

  /**
   * The ID of the knowledge base.
   */
  public readonly kbId: string;

  constructor(scope: Construct, id: string, props: KnowledgeBaseProps) {
    super(scope, id);
    const embeddingsModel = props.embeddingsModel;
    const description = props.description ?? '';
    const indexName = props.indexName ?? 'bedrock-knowledge-base-default-index';
    const vectorField = props.vectorField ?? 'bedrock-knowledge-base-default-vector';

    this.name = generatePhysicalName('kb', [], 32, false, this);
    const roleName = generatePhysicalName(
      'AmazonBedrockExecutionRoleForKnowledgeBase',
      [],
      64,
      false,
      this,
    );
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

    this.vectorStore = new OpenSearchVectorCollection(this, 'KBVectors');
    this.vectorStore.grantDataAccess(this.role);

    const vectorIndex = new OpenSearchVectorIndex(this, 'KBIndex', {
      collection: this.vectorStore,
      indexName,
      vectorField,
      vectorDimensions: 1536,
      mappings: [
        {
          MappingField: 'AMAZON_BEDROCK_TEXT_CHUNK',
          DataType: 'text',
          Filterable: true,
        },
        {
          MappingField: 'AMAZON_BEDROCK_METADATA',
          DataType: 'text',
          Filterable: false,
        },
      ],
    });

    vectorIndex.vectorIndex.node.addDependency(this.vectorStore.collection);
    vectorIndex.vectorIndex.node.addDependency(this.vectorStore.dataAccessPolicy);
    vectorIndex.vectorIndex.node.addDependency(this.vectorStore.manageIndexPolicy);

    const crProvider = BedrockCRProvider.getProvider(this);
    this.knowledgeBase = new cdk.CustomResource(this, 'KB', {
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
            ],
            resources: ['*'],
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

    this.knowledgeBase.node.addDependency(this.role);
    this.knowledgeBase.node.addDependency(kbCRPolicy);
    this.knowledgeBase.node.addDependency(vectorIndex.vectorIndex);

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
    this.kbArn = this.knowledgeBase.getAttString('knowledgeBaseArn');
    this.kbId = this.knowledgeBase.getAttString('knowledgeBaseId');
  }
}
