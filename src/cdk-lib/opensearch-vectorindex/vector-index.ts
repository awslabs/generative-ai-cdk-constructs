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
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as oss from 'aws-cdk-lib/aws-opensearchserverless';
import { Construct } from 'constructs';
import { buildCustomResourceProvider } from '../../common/helpers/custom-resource-provider-helper';
import { generatePhysicalNameV2 } from '../../common/helpers/utils';
import { VectorCollection } from '../opensearchserverless';

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
interface VectorIndexResourceProps {
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
 * Properties for the VectorIndex.
 */
export interface VectorIndexProps {
  /**
   * The OpenSearch Vector Collection.
   */
  collection: VectorCollection;
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
export class VectorIndex extends Construct {
  /**
   * The vector index resource.
   */
  public vectorIndex: cdk.CustomResource;

  constructor(
    scope: Construct,
    id: string,
    props: VectorIndexProps,
  ) {
    super(scope, id);

    const crProvider = OpenSearchIndexCRProvider.getProvider(this);
    crProvider.role.addManagedPolicy(props.collection.aossPolicy);

    const manageIndexPolicyName = generatePhysicalNameV2(this,
      'ManageIndexPolicy',
      { maxLength: 32, lower: true });
    const manageIndexPolicy = new oss.CfnAccessPolicy(this, 'ManageIndexPolicy', {
      name: manageIndexPolicyName,
      type: 'data',
      policy: JSON.stringify([
        {
          Rules: [
            {
              Resource: [`index/${props.collection.collectionName}/*`],
              Permission: [
                'aoss:DescribeIndex',
                'aoss:CreateIndex',
                'aoss:DeleteIndex',
                'aoss:UpdateIndex',
              ],
              ResourceType: 'index',
            },
            {
              Resource: [`collection/${props.collection.collectionName}`],
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


    this.vectorIndex = new cdk.CustomResource(this, 'VectorIndex', {
      serviceToken: crProvider.serviceToken,
      properties: {
        Endpoint: `${props.collection.collection.attrId}.${cdk.Stack.of(this).region}.aoss.amazonaws.com`,
        IndexName: props.indexName,
        VectorField: props.vectorField,
        Dimensions: props.vectorDimensions,
        MetadataManagement: props.mappings,
      } as VectorIndexResourceProps,
      resourceType: 'Custom::OpenSearchIndex',
    });

    this.vectorIndex.node.addDependency(manageIndexPolicy);
    this.vectorIndex.node.addDependency(props.collection.collection);
  }

}

/**
 * Custom Resource provider for OpenSearch Index operations.
 *
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 */
export const OpenSearchIndexCRProvider = buildCustomResourceProvider({
  providerName: 'OpenSearchIndexCRProvider',
  codePath: path.join(
    __dirname, '../../../lambda/opensearch-serverless-custom-resources'),
  handler: 'custom_resources.on_event',
  runtime: lambda.Runtime.PYTHON_3_12,
});