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

/******************************************************************************
 *                        VECTOR BUCKET ACTIONS
 *****************************************************************************/

/**
 * List actions for vector buckets
 * Grants permission to list all vector buckets in the account and region
 * Access level: List
 */
export const VECTOR_BUCKET_LIST_ACTIONS = [
  's3vectors:ListVectorBuckets',
];

/**
 * Read actions for vector buckets
 * Grants permission to retrieve vector bucket attributes and configuration
 * Access level: Read
 */
export const VECTOR_BUCKET_READ_ACTIONS = [
  's3vectors:GetVectorBucket',
];

/**
 * Write actions for vector buckets
 * Grants permission to create a new vector bucket with specified configuration
 * Access level: Write
 */
export const VECTOR_BUCKET_WRITE_ACTIONS = [
  's3vectors:CreateVectorBucket',
];

/**
 * Delete actions for vector buckets
 * Grants permission to delete an empty vector bucket
 * Access level: Write
 */
export const VECTOR_BUCKET_DELETE_ACTIONS = [
  's3vectors:DeleteVectorBucket',
];

/**
 * Permissions management actions for vector buckets
 * Grants permission to apply, retrieve, or remove resource-based policies on a vector bucket
 * Access level: Permissions management / Read
 */
export const VECTOR_BUCKET_POLICY_ACTIONS = [
  's3vectors:PutVectorBucketPolicy',
  's3vectors:GetVectorBucketPolicy',
  's3vectors:DeleteVectorBucketPolicy',
];

/******************************************************************************
 *                        VECTOR INDEX ACTIONS
 *****************************************************************************/

/**
 * List actions for vector indexes
 * Grants permission to list all indexes within a vector bucket
 * Access level: List
 */
export const VECTOR_INDEX_LIST_ACTIONS = [
  's3vectors:ListIndexes',
];

/**
 * Read actions for vector indexes
 * Grants permission to retrieve vector index attributes and configuration
 * Access level: Read
 */
export const VECTOR_INDEX_READ_ACTIONS = [
  's3vectors:GetIndex',
];

/**
 * Write actions for vector indexes
 * Grants permission to create a new vector index with specified dimensions and metadata configuration
 * Access level: Write
 */
export const VECTOR_INDEX_WRITE_ACTIONS = [
  's3vectors:CreateIndex',
];

/**
 * Delete actions for vector indexes
 * Grants permission to delete a vector index and all its contents
 * Access level: Write
 */
export const VECTOR_INDEX_DELETE_ACTIONS = [
  's3vectors:DeleteIndex',
];

/******************************************************************************
 *                        VECTOR ACTIONS (within indexes)
 *****************************************************************************/

/**
 * Read actions for vectors
 * Grants permission to retrieve specific vectors and their metadata by vector key
 * Required conditionally with s3vectors:QueryVectors or s3vectors:ListVectors
 * when using metadata filters or requesting vector data/metadata
 * Access level: Read
 */
export const VECTOR_READ_ACTIONS = [
  's3vectors:GetVectors',
];

/**
 * Query actions for vectors
 * Grants permission to perform similarity queries against vectors in an index
 * With s3vectors:QueryVectors only: retrieve vector keys and distances (no filters, no data/metadata)
 * With both s3vectors:QueryVectors and s3vectors:GetVectors: filter by metadata and retrieve data/metadata
 * Access level: Read
 */
export const VECTOR_QUERY_ACTIONS = [
  's3vectors:QueryVectors',
];

/**
 * List actions for vectors
 * Grants permission to list vector keys in an index
 * With s3vectors:ListVectors only: list vector keys (no data/metadata)
 * With both s3vectors:ListVectors and s3vectors:GetVectors: retrieve vector keys with data and metadata
 * Access level: Read
 */
export const VECTOR_LIST_ACTIONS = [
  's3vectors:ListVectors',
];

/**
 * Write actions for vectors
 * Grants permission to add or update vectors in an index
 * Access level: Write
 */
export const VECTOR_WRITE_ACTIONS = [
  's3vectors:PutVectors',
];

/**
 * Delete actions for vectors
 * Grants permission to delete specific vectors from an index
 * Access level: Write
 */
export const VECTOR_DELETE_ACTIONS = [
  's3vectors:DeleteVectors',
];

/******************************************************************************
 *                        KMS KEY ACTIONS
 *****************************************************************************/

/**
 * Read actions for KMS keys
 * Grants permission to decrypt data and describe key attributes
 */
export const KEY_READ_ACTIONS = [
  'kms:Decrypt',
  'kms:DescribeKey',
];

/**
 * Write actions for KMS keys
 * Grants permission to encrypt, re-encrypt, generate data keys, and decrypt
 */
export const KEY_WRITE_ACTIONS = [
  'kms:Encrypt',
  'kms:ReEncrypt*',
  'kms:GenerateDataKey*',
  'kms:Decrypt',
];
