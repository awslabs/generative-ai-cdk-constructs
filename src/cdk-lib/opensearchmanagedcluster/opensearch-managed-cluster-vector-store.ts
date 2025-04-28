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
 * Field mapping configuration for OpenSearch vector store
 */
export interface OpenSearchFieldMapping {
  /**
   * The name of the field in which Amazon Bedrock stores metadata about the vector store.
   */
  readonly metadataField: string;
  /**
   * The name of the field in which Amazon Bedrock stores the raw text in chunks from your data.
   */
  readonly textField: string;
  /**
   * The name of the field in which Amazon Bedrock stores the vector embeddings.
   */
  readonly vectorField: string;
}

/**
 * Properties for an OpenSearchManagedClusterVectorStore
 */
export interface OpenSearchManagedClusterVectorStoreProps {
  /**
   * The ARN of your OpenSearch Customer Managed Domain.
   */
  readonly domainArn: string;
  /**
   * The url of your OpenSearch Managed cluster domain.
   */
  readonly domainEndpoint: string;
  /**
   * Configuration for field mappings in the vector store. Bedrock uses these fields to store your data.
   * If you haven't configured these fields in your vector database, your Knowledge Base
   * will fail to be created.
   */
  readonly fieldMapping: OpenSearchFieldMapping;
  /**
   * The vector index name of your OpenSearch Customer Managed Domain.
   */
  readonly vectorIndexName: string;
}

/**
 * Class to define an OpenSearchManagedClusterVectorStore.
 */
export class OpenSearchManagedClusterVectorStore {
  readonly domainArn: string;
  readonly domainEndpoint: string;
  readonly fieldMapping: OpenSearchFieldMapping;
  readonly vectorIndexName: string;

  constructor(props: OpenSearchManagedClusterVectorStoreProps) {
    this.domainArn = props.domainArn;
    this.domainEndpoint = props.domainEndpoint;
    this.fieldMapping = props.fieldMapping;
    this.vectorIndexName = props.vectorIndexName;
  }
}
