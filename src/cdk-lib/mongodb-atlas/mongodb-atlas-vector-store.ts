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
 * Interface for MongoDB Atlas field mapping
 */
export interface MongoDbAtlasFieldMapping {
  /**
   * The field name for the vector field
   */
  readonly vectorField: string;

  /**
   * The field name for the text field
   */
  readonly textField: string;

  /**
   * The field name for the metadata field
   */
  readonly metadataField: string;
}

/**
 * Interface for MongoDB Atlas vector store configuration
 */
export interface MongoDBAtlasVectorStoreProps {
  /**
   * The name of the collection
   */
  readonly collectionName: string;

  /**
   * The ARN of the secret containing MongoDB Atlas credentials
   */
  readonly credentialsSecretArn: string;

  /**
   * The name of the database
   */
  readonly databaseName: string;

  /**
   * The endpoint URL for MongoDB Atlas
   */
  readonly endpoint: string;

  /**
   * The name of the endpoint service
   */
  readonly endpointServiceName?: string;

  /**
   * The field mapping for MongoDB Atlas
   */
  readonly fieldMapping: MongoDbAtlasFieldMapping;

  /**
   * The name of the vector index
   */
  readonly vectorIndexName: string;

  /**
   * The name of the text index
   */
  readonly textIndexName?: string;
}

/**
 * Construct for MongoDB Atlas vector store
 */
export class MongoDBAtlasVectorStore {
  /**
   * The name of the collection
   */
  public readonly collectionName: string;

  /**
   * The ARN of the secret containing MongoDB Atlas credentials
   */
  public readonly credentialsSecretArn: string;

  /**
   * The name of the database
   */
  public readonly databaseName: string;

  /**
   * The endpoint URL for MongoDB Atlas
   */
  public readonly endpoint: string;

  /**
   * The name of the endpoint service
   */
  public readonly endpointServiceName?: string;

  /**
   * The field mapping for MongoDB Atlas
   */
  public readonly fieldMapping: MongoDbAtlasFieldMapping;

  /**
   * The name of the vector index
   */
  public readonly vectorIndexName: string;

  /**
   * The name of the text index
   */
  public readonly textIndexName?: string;

  /**
   * Creates a new instance of the MongoDBAtlas class
   *
   * @param props - The properties for the MongoDB Atlas vector store
   */
  constructor(props: MongoDBAtlasVectorStoreProps) {
    this.collectionName = props.collectionName;
    this.credentialsSecretArn = props.credentialsSecretArn;
    this.databaseName = props.databaseName;
    this.endpoint = props.endpoint;
    this.endpointServiceName = props.endpointServiceName;
    this.fieldMapping = props.fieldMapping;
    this.vectorIndexName = props.vectorIndexName;
    this.textIndexName = props.textIndexName;
  }
}
