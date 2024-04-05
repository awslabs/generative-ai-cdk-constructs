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
 * Properties for a PineconeVectorStore
 */
export interface PineconeVectorStoreProps {
  /**
   * Connection string for your Pinecone index management page.
   */
  readonly connectionString: string;
  /**
   * ARN of the secret containing the API Key to use
   * when connecting to the Pinecone database.
   * Learn more in the link below.
   * @see https://www.pinecone.io/blog/amazon-bedrock-integration/
   */
  readonly credentialsSecretArn: string;
  /**
   * If you encrypted your secret, provide the KMS key here so that Bedrock
   * can decrypt it.
   */
  readonly kmsKey?: string;
  /**
   * Name space that will be used for writing new data to your Pinecone database.
   */
  readonly namespace?: string;
}

/**
 * Class to define a PineconeVectorStore.
 */
export class PineconeVectorStore {
  readonly connectionString: string;
  readonly credentialsSecretArn: string;
  readonly kmsKey?: string;
  readonly namespace?: string;

  constructor(props: PineconeVectorStoreProps) {
    this.connectionString = props.connectionString;
    this.credentialsSecretArn = props.credentialsSecretArn;
    this.kmsKey = props.kmsKey;
    this.namespace = props.namespace;
  }
}

