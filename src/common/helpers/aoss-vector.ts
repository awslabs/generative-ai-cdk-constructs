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
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as oss from 'aws-cdk-lib/aws-opensearchserverless';
import { Construct } from 'constructs';
import { buildCustomResourceProvider } from './custom-resource-provider-helper';
import { generatePhysicalNameV2 } from './utils';

/**
 * Deploys and OpenSearch Collection to be used as a vector store.
 *
 * It includes all policies.
 */
export class OpenSearchVectorCollection extends Construct {
  /**
   * The name of the collection.
   * @private
   */
  private collectionName: string;

  /**
   * The OpenSearch Collection.
   */
  public collection: oss.CfnCollection;

  /**
   * The ARN of the collection.
   */
  public collectionArn: string;

  /**
   * An IAM policy that allows API access to the collection.
   * @private
   */
  private aossPolicy: iam.ManagedPolicy;

  /**
   * An OpenSearch Access Policy that allows management of the index.
   */
  public manageIndexPolicy: oss.CfnAccessPolicy;

  /**
   * An OpenSearch Access Policy that allows access to the index.
   */
  public dataAccessPolicy: oss.CfnAccessPolicy;

  /**
   * An OpenSearch Access Policy document that will become `dataAccessPolicy`.
   * @private
   */
  private dataAccessPolicyDocument: any[] = [];

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.collectionName = generatePhysicalNameV2(
      this,
      'VectorStore',
      { maxLength: 32, lower: true });

    const encryptionPolicyName = generatePhysicalNameV2(this,
      'EncryptionPolicy',
      { maxLength: 32, lower: true });
    const encryptionPolicy = new oss.CfnSecurityPolicy(this, 'EncryptionPolicy', {
      name: encryptionPolicyName,
      type: 'encryption',
      policy: JSON.stringify({
        Rules: [
          {
            ResourceType: 'collection',
            Resource: [`collection/${this.collectionName}`],
          },
        ],
        AWSOwnedKey: true,
      }),
    });

    const networkPolicyName = generatePhysicalNameV2(this,
      'NetworkPolicy',
      { maxLength: 32, lower: true });
    const networkPolicy = new oss.CfnSecurityPolicy(this, 'NetworkPolicy', {
      name: networkPolicyName,
      type: 'network',
      policy: JSON.stringify([
        {
          Rules: [
            {
              ResourceType: 'collection',
              Resource: [`collection/${this.collectionName}`],
            },
            {
              ResourceType: 'dashboard',
              Resource: [`collection/${this.collectionName}`],
            },
          ],
          AllowFromPublic: true,
        },
      ]),
    });

    this.collection = new oss.CfnCollection(this, 'VectorCollection', {
      name: this.collectionName,
      type: 'VECTORSEARCH',
    });

    this.collectionArn = this.collection.attrArn;

    this.aossPolicy = new iam.ManagedPolicy(
      this,
      'AOSSApiAccessAll', {
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
              'aoss:APIAccessAll',
            ],
            resources: [this.collection.attrArn],
          }),
        ],
      },
    );

    this.collection.addDependency(encryptionPolicy);
    this.collection.addDependency(networkPolicy);

    const crProvider = AOSSCRProvider.getProvider(this);
    crProvider.role.addManagedPolicy(this.aossPolicy);

    const manageIndexPolicyName = generatePhysicalNameV2(this,
      'ManageIndexPolicy',
      { maxLength: 32, lower: true });
    this.manageIndexPolicy = new oss.CfnAccessPolicy(this, 'ManageIndexPolicy', {
      name: manageIndexPolicyName,
      type: 'data',
      policy: JSON.stringify([
        {
          Rules: [
            {
              Resource: [`index/${this.collectionName}/*`],
              Permission: [
                'aoss:DescribeIndex',
                'aoss:CreateIndex',
                'aoss:DeleteIndex',
                'aoss:UpdateIndex',
              ],
              ResourceType: 'index',
            },
            {
              Resource: [`collection/${this.collectionName}`],
              Permission: [
                'aoss:DescribeCollectionItems',
              ],
              ResourceType: 'collection',
            },
          ],
          Principal: [
            crProvider.role.roleArn,
          ],
          Description: '',
        },
      ]),
    });

    const isDataAccessPolicyNotEmpty = new cdk.CfnCondition(this, 'IsDataAccessPolicyNotEmpty', {
      expression: cdk.Fn.conditionNot(cdk.Fn.conditionEquals(0, cdk.Lazy.number({
        produce: () => this.dataAccessPolicyDocument.length,
      }))),
    });

    const dataAccessPolicyName = generatePhysicalNameV2(this,
      'DataAccessPolicy',
      { maxLength: 32, lower: true });
    this.dataAccessPolicy = new oss.CfnAccessPolicy(this, 'DataAccessPolicy', {
      name: dataAccessPolicyName,
      type: 'data',
      policy: cdk.Lazy.string({
        produce: () => JSON.stringify(this.dataAccessPolicyDocument),
      }),
    });
    this.dataAccessPolicy.cfnOptions.condition = isDataAccessPolicyNotEmpty;
  }

  /**
   * Grants the specified role access to data in the collection.
   * @param grantee The role to grant access to.
   */
  grantDataAccess(grantee: iam.IRole) {
    this.dataAccessPolicyDocument.push({
      Rules: [
        {
          Resource: [`collection/${this.collectionName}`],
          Permission: [
            'aoss:DescribeCollectionItems',
            'aoss:CreateCollectionItems',
            'aoss:UpdateCollectionItems',
          ],
          ResourceType: 'collection',
        },
        {
          Resource: [`index/${this.collectionName}/*`],
          Permission: [
            'aoss:UpdateIndex',
            'aoss:DescribeIndex',
            'aoss:ReadDocument',
            'aoss:WriteDocument',
            'aoss:CreateIndex',
          ],
          ResourceType: 'index',
        },
      ],
      Principal: [
        grantee.roleArn,
      ],
      Description: '',
    });
    grantee.addManagedPolicy(this.aossPolicy);
  }
}

/**
 * Metadata field definitions.
 */
export interface MetadataManagementField {
  /**
   * The name of the field.
   */
  MappingField: string;
  /**
   * The data type of the field.
   */
  DataType: string;
  /**
   * Whether the field is filterable.
   */
  Filterable: boolean;
}

/**
 * Properties for the Custom::OpenSearchIndex custom resource.
 */
interface VectorIndexProps {
  /**
   * The OpenSearch Endpoint.
   */
  Endpoint: string;
  /**
   * The name of the index.
   */
  IndexName: string;
  /**
   * The name of the vector field.
   */
  VectorField: string;
  /**
   * The number of dimensions in the vector.
   */
  Dimensions: number;
  /**
   * The metadata management fields.
   */
  MetadataManagement: MetadataManagementField[];
}

/**
 * Properties for the OpenSearchVectorIndex.
 */
export interface OpenSearchVectorIndexProps {
  /**
   * The OpenSearch Vector Collection.
   */
  collection: OpenSearchVectorCollection;
  /**
   * The name of the index.
   */
  indexName: string;
  /**
   * The name of the vector field.
   */
  vectorField: string;
  /**
   * The number of dimensions in the vector.
   */
  vectorDimensions: number;
  /**
   * The metadata management fields.
   */
  mappings: MetadataManagementField[];
}

/**
 * Deploy a vector index on the collection.
 */
export class OpenSearchVectorIndex extends Construct {
  /**
   * The vector index resource.
   */
  public vectorIndex: cdk.CustomResource;

  constructor(
    scope: Construct,
    id: string,
    props: OpenSearchVectorIndexProps,
  ) {
    super(scope, id);

    const crProvider = AOSSCRProvider.getProvider(this);

    this.vectorIndex = new cdk.CustomResource(this, 'VectorIndex', {
      serviceToken: crProvider.serviceToken,
      properties: {
        Endpoint: `${props.collection.collection.attrId}.${cdk.Stack.of(this).region}.aoss.amazonaws.com`,
        IndexName: props.indexName,
        VectorField: props.vectorField,
        Dimensions: props.vectorDimensions,
        MetadataManagement: props.mappings,
      } as VectorIndexProps,
      resourceType: 'Custom::OpenSearchIndex',
    });

    this.vectorIndex.node.addDependency(props.collection.manageIndexPolicy);
    this.vectorIndex.node.addDependency(props.collection.collection);
  }

}

/**
 * Custom Resource provider for OpenSearch Serverless.
 *
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 */
export const AOSSCRProvider = buildCustomResourceProvider({
  providerName: 'AOSSCRProvider',
  codePath: path.join(
    __dirname, '../../../lambda/opensearch-serverless-custom-resources'),
  handler: 'custom_resources.on_event',
  runtime: lambda.Runtime.PYTHON_3_12,
});
