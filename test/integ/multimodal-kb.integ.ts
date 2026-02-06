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

import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as bedrock from '../../src/cdk-lib/bedrock';
import {
  AudioSegmentation,
  VideoSegmentation,
} from '../../src/cdk-lib/bedrock/knowledge-bases/multimodal-config';
import { SupplementalDataStorageLocation } from '../../src/cdk-lib/bedrock/knowledge-bases/supplemental-data-storage';
import { VectorKnowledgeBase } from '../../src/cdk-lib/bedrock/knowledge-bases/vector-knowledge-base';
import { VectorBucket, VectorIndex } from '../../src/cdk-lib/s3vectors';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-multimodal-kb-integ-test', {
  env: {
    region: 'us-east-1',
  },
});

const embeddingModel = bedrock.BedrockFoundationModel.AMAZON_NOVA2_MULTIMODAL_V1_1024;

// Create S3 bucket for supplemental data storage (audio/video files)
const supplementalBucket = new s3.Bucket(stack, 'SupplementalDataBucket', {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});

// Create S3 Vectors vector store
const vectorBucket = new VectorBucket(stack, 'VectorBucket', {
  vectorBucketName: 'multimodal-nova-test',
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});
const vectorIndex = new VectorIndex(stack, 'VectorIndex', {
  vectorBucket,
  dimension: embeddingModel.vectorDimensions!,
});

// Create multimodal knowledge base with custom segmentation
const kb = new VectorKnowledgeBase(stack, 'MultimodalKnowledgeBase', {
  embeddingsModel: embeddingModel,
  vectorStore: vectorIndex,
  supplementalDataStorageLocations: [
    SupplementalDataStorageLocation.s3({
      uri: `s3://${supplementalBucket.bucketName}/`,
    }),
  ],
  multimodalConfig: {
    audio: {
      segmentation: AudioSegmentation.seconds(10),
    },
    video: {
      segmentation: VideoSegmentation.seconds(15),
    },
  },
});

new cdk.CfnOutput(stack, 'KnowledgeBaseId', {
  value: kb.knowledgeBaseId,
});

new cdk.CfnOutput(stack, 'VectorBucketName', {
  value: vectorBucket.vectorBucketName,
});

new cdk.CfnOutput(stack, 'SupplementalBucketName', {
  value: supplementalBucket.bucketName,
});

new integ.IntegTest(app, 'MultimodalKBTest', {
  testCases: [stack],
  cdkCommandOptions: {
    deploy: {
      args: {
        rollback: false,
      },
    },
    destroy: {
      args: {
        force: true,
      },
    },
  },
  regions: ['us-east-1'],
});

app.synth();
