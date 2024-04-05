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

/**
 * Properties for a AmazonAuroraVectorStore.
 */
export interface AmazonAuroraVectorStoreProps {
  /**
   * The ARN of your Amazon Aurora DB cluster.
   */
  readonly resourceArn: string;

  /**
   * The name of your Database.
   */
  readonly databaseName: string;

  /**
   * The Table Name of your Amazon Aurora DB cluster.
   */
  readonly tableName: string;

  /**
   * The Secret ARN of your Amazon Aurora DB cluster.
   */
  readonly credentialsSecretArn: string;

  /**
   * Provide the primary key that you configured in Amazon Aurora.
   */
  readonly primaryKeyField: string;

  /**
   * Provide the vector field that you configured in Amazon Aurora.
   */
  readonly vectorField: string;

  /**
   * Provide the text field that you configured in Amazon Aurora.
   */
  readonly textField: string;

  /**
   * Provide the metadata field that you configured in Amazon Aurora.
   */
  readonly metadataField: string;
}

/**
 * Class to define a AmazonAuroraVectorStore.
 */
export class AmazonAuroraVectorStore {
  readonly resourceArn: string;
  readonly databaseName: string;
  readonly tableName: string;
  readonly credentialsSecretArn: string;
  readonly primaryKeyField: string;
  readonly vectorField: string;
  readonly textField: string;
  readonly metadataField: string;

  constructor(props: AmazonAuroraVectorStoreProps) {
    this.resourceArn = props.resourceArn;
    this.databaseName = props.databaseName;
    this.tableName = props.tableName;
    this.credentialsSecretArn = props.credentialsSecretArn;
    this.primaryKeyField = props.primaryKeyField;
    this.vectorField = props.vectorField;
    this.textField = props.textField;
    this.metadataField = props.metadataField;
  }
}

