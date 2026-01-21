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

// We need to export each construct as a named export to avoid name collisions
// But also so each construct becomes a separate module in the final package.
// Otherwise, jsii-rosetta doesn't see them as separate modules

// ===================================
// Patterns
// ===================================
export * as sagemaker_deployment from './patterns/gen-ai/aws-model-deployment-sagemaker';
export * as bedrockcwdashboard from './patterns/gen-ai/aws-bedrock-cw-dashboard';
export * as aosscwdashboard from './patterns/gen-ai/aws-aoss-cw-dashboard';
export * as bda from './patterns/gen-ai/aws-bedrock-data-automation';
export * as bedrock_batch_stepfn from './patterns/gen-ai/aws-bedrock-batch-stepfn';

// ===================================
// CDK Libraries
// ===================================
export * as kendra from './cdk-lib/kendra';
export * as bedrock from './cdk-lib/bedrock';
export * as amazonaurora from './cdk-lib/amazonaurora';
export * as neptune from './cdk-lib/neptune';
export * as pinecone from './cdk-lib/pinecone';
export * as mongodbAtlas from './cdk-lib/mongodb-atlas';
export * as opensearchserverless from './cdk-lib/opensearchserverless';
export * as opensearch_vectorindex from './cdk-lib/opensearch-vectorindex';
export * as opensearchmanagedcluster from './cdk-lib/opensearchmanagedcluster';
export * as auroraDsql from './cdk-lib/aurora-dsql';
export * as s3vectors from './cdk-lib/s3vectors';

// ===================================
// Common
// ===================================
export { version } from './common/helpers/utils';
export * from './common/base-class/base-class';
export * from './common/base-class/construct-name-enum';
