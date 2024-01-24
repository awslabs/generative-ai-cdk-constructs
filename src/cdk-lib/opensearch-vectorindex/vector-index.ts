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
export interface MetadataManagementFieldProps {
  /**
   * The name of the field.
   */
  readonly mappingField: string;
  /**
   * The data type of the field.
   */
  readonly dataType: string;
  /**
   * Whether the field is filterable.
   */
  readonly filterable: boolean;
}

/**
 * Metadata field definitions as the API expects them.
 *
 * @internal - JSII requires the exported interface to have camel camelCase properties,
 * but the API expect PascalCase properties
 */
type MetadataManagementField = {
  /**
   * The name of the field.
   */
  readonly MappingField: string;
  /**
   * The data type of the field.
   */
  readonly DataType: string;
  /**
   * Whether the field is filterable.
   */
  readonly Filterable: boolean;
}

/**
 * Properties for the Custom::OpenSearchIndex custom resource.
 *
 * @internal
 */
interface VectorIndexResourceProps {
  /**
   * The OpenSearch Endpoint.
   */
  readonly Endpoint: string;
  /**
   * The name of the index.
   */
  readonly IndexName: string;
  /**
   * The name of the vector field.
   */
  readonly VectorField: string;
  /**
   * The number of dimensions in the vector.
   */
  readonly Dimensions: number;
  /**
   * The metadata management fields.
   */
  readonly MetadataManagement: MetadataManagementField[];
}

/**
 * Properties for the VectorIndex.
 */
export interface VectorIndexProps {
  /**
   * The OpenSearch Vector Collection.
   */
  readonly collection: VectorCollection;
  /**
   * The name of the index.
   */
  readonly indexName: string;
  /**
   * The name of the vector field.
   */
  readonly vectorField: string;
  /**
   * The number of dimensions in the vector.
   */
  readonly vectorDimensions: number;
  /**
   * The metadata management fields.
   */
  readonly mappings: MetadataManagementFieldProps[];
}

/**
 * Deploy a vector index on the collection.
 */
export class VectorIndex extends cdk.Resource {
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


    const vectorIndex = new cdk.CustomResource(this, 'VectorIndex', {
      serviceToken: crProvider.serviceToken,
      properties: {
        Endpoint: `${props.collection.collectionId}.${cdk.Stack.of(this).region}.aoss.amazonaws.com`,
        IndexName: props.indexName,
        VectorField: props.vectorField,
        Dimensions: props.vectorDimensions,
        MetadataManagement: props.mappings.map((m) => {
          return {
            MappingField: m.mappingField,
            DataType: m.dataType,
            Filterable: m.filterable,
          };
        }),
      } as VectorIndexResourceProps,
      resourceType: 'Custom::OpenSearchIndex',
    });

    vectorIndex.node.addDependency(manageIndexPolicy);
    vectorIndex.node.addDependency(props.collection);
    vectorIndex.node.addDependency(props.collection.dataAccessPolicy);
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