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
 * Properties for a RedisEnterpriseCloudVectorStore.
 */
export interface RedisEnterpriseVectorStoreProps {
  /**
   * The endpoint URL for your Redis Enterprise Cloud database.
   */
  readonly endpoint: string;
  /**
   * ARN of the secret defining the username, password, serverCertificate,
   * clientCertificate and clientPrivateKey to use when connecting to the Redis Enterprise Cloud database.
   * Learn more in the link below.
   *  @see https://docs.redis.com/latest/rc/cloud-integrations/aws-marketplace/aws-bedrock/set-up-redis/
   */
  readonly credentialsSecretArn: string;
  /**
   * Vector index name of your Redis Enterprise Cloud.
   */
  readonly vectorIndexName: string;
}

/**
  * Class to define a RedisEnterpriseCloudVectorStore.
  */
export class RedisEnterpriseVectorStore {
  readonly endpoint: string;
  readonly credentialsSecretArn: string;
  readonly vectorIndexName: string;

  constructor(props: RedisEnterpriseVectorStoreProps) {
    this.endpoint = props.endpoint;
    this.credentialsSecretArn = props.credentialsSecretArn;
    this.vectorIndexName = props.vectorIndexName;
  }
}

