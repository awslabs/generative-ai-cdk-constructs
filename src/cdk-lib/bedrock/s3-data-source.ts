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

import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';

import { BedrockCRProvider } from './custom-resources';
import { KnowledgeBase } from './knowledge-base';

const CHUNKING_OVERLAP = 20;
const CHUNKING_MAX_TOKENS = 300;

/**
 * Knowledge base can split your source data into chunks. A chunk refers to an
 * excerpt from a data source that is returned when the knowledge base that it
 * belongs to is queried. You have the following options for chunking your
 * data. If you opt for NONE, then you may want to pre-process your files by
 * splitting them up such that each file corresponds to a chunk.
 */
export enum ChunkingStrategy {
  /**
   * Amazon Bedrock splits your source data into chunks of the approximate size
   * that you set in the `fixedSizeChunkingConfiguration`.
   */
  FIXED_SIZE = 'FIXED_SIZE',
  /**
   * `FIXED_SIZE` with the default chunk size of 300 tokens and 20% overlap.
   */
  DEFAULT = 'DEFAULT',
  /**
   * Amazon Bedrock treats each file as one chunk. If you choose this option,
   * you may want to pre-process your documents by splitting them into separate
   * files.
   */
  NONE = 'NONE',
}

/**
 * Properties for an S3 Data Source.
 */
export interface S3DataSourceProps {
  /**
   * The knowledge base that this data source belongs to.
   */
  readonly knowledgeBase: KnowledgeBase;
  /**
   * The name of the data source.
   */
  readonly dataSourceName: string;
  /**
   * The bucket that contains the data source.
   */
  readonly bucket: s3.IBucket;
  /**
   * The prefixes of the objects in the bucket that should be included in the data source.
   *
   * @default - All objects in the bucket.
   */
  readonly inclusionPrefixes?: string[];
  /**
   * The chunking strategy to use.
   *
   * @default ChunkingStrategy.DEFAULT
   */
  readonly chunkingStrategy?: ChunkingStrategy;
  /**
   * The maximum number of tokens to use in a chunk.
   *
   * @default 300
   */
  readonly maxTokens?: number;
  /**
   * The percentage of overlap to use in a chunk.
   *
   * @default 20
   */
  readonly overlapPercentage?: number;
  /**
   * The KMS key to use to encrypt the data source.
   *
   * @default Amazon Bedrock encrypts your data with a key that AWS owns and manages
   */
  readonly kmsKey?: kms.IKey;
}

/**
 * Sets up a data source to be added to a knowledge base.
 */
export class S3DataSource extends Construct {
  /**
   * The Data Source cfn resource.
   */
  public readonly dataSource: cdk.CustomResource;
  /**
   * The unique identifier of the data source.
   */
  public readonly dataSourceId: string;

  constructor(scope: Construct, id: string, props: S3DataSourceProps) {
    super(scope, id);
    const knowledgeBase = props.knowledgeBase;
    const dataSourceName = props.dataSourceName;
    const bucket = props.bucket;
    const inclusionPrefixes = props.inclusionPrefixes;
    const chunkingStrategy = props.chunkingStrategy ?? ChunkingStrategy.DEFAULT;
    const maxTokens = props.maxTokens ?? CHUNKING_MAX_TOKENS;
    const overlapPercentage = props.overlapPercentage ?? CHUNKING_OVERLAP;
    const kmsKey = props.kmsKey;


    bucket.grantRead(knowledgeBase.role);
    NagSuppressions.addResourceSuppressions(
      knowledgeBase.role,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'The KB role needs read only access to all objects in the data source bucket.',
        },
      ],
      true,
    );

    const crProvider = BedrockCRProvider.getProvider(this);
    this.dataSource = new cdk.CustomResource(this, 'DataSource', {
      serviceToken: crProvider.serviceToken,
      resourceType: 'Custom::Bedrock-DataSource',
      properties: {
        knowledgeBaseId: knowledgeBase.knowledgeBaseId,
        name: dataSourceName,
        dataSourceConfiguration: {
          type: 'S3',
          s3Configuration: {
            bucketArn: bucket.bucketArn,
            inclusionPrefixes: inclusionPrefixes,
          },
        },
        vectorIngestionConfiguration: vectorIngestionConfiguration(
          chunkingStrategy, maxTokens, overlapPercentage,
        ),
        serverSideEncryptionConfiguration: kmsKey ? {
          kmsKeyArn: kmsKey.keyArn,
        } : undefined,
      },
    });

    this.dataSourceId = this.dataSource.getAtt('dataSourceId').toString();

    const dataSourceCRPolicy = new iam.Policy(this, 'DataSourceCRPolicy', {
      roles: [crProvider.role],
      statements: [
        new iam.PolicyStatement({
          actions: [
            'bedrock:CreateDataSource',
            'bedrock:DeleteDataSource',
            'bedrock:UpdateDataSource',
          ],
          resources: [
            /** A weird race condition makes CreateDataSource fail due to permissions on the first attempt.
             * A wildcard allows CFN to deploy this policy earlier and avoid the race. */
            cdk.Stack.of(this).formatArn({
              service: 'bedrock',
              resource: 'knowledge-base',
              resourceName: '*',
              arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
            }),
            // knowledgeBase.knowledgeBaseArn,
          ],
        }),
        new iam.PolicyStatement({
          actions: ['s3:GetObject', 's3:ListBucket'],
          resources: [bucket.bucketArn, `${bucket.bucketArn}/*`],
        }),
      ],
    });

    this.dataSource.node.addDependency(dataSourceCRPolicy);

    NagSuppressions.addResourceSuppressions(
      dataSourceCRPolicy,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'Bedrock CreateDataSource uses wildcards to access any object in the specified bucket. ' +
                  'A weird race condition makes CreateDataSource fail due to permissions on the first attempt. ' +
                  'Permitting CreateDataSource on all KnowledgeBases allows CFN to deploy this policy earlier and '+
                  'avoid the race.',
        },
      ],
      true,
    );

    // ToDo: scheduled ingestion jobs
  }
}

interface FixedSizeChunkingConfig {
  maxTokens: number;
  overlapPercentage: number;
}

interface ChunkingConfig {
  chunkingStrategy: ChunkingStrategy;
  fixedSizeChunkingConfiguration?: FixedSizeChunkingConfig;
}

interface VectorIngestionConfig {
  chunkingConfiguration?: ChunkingConfig;
}

function vectorIngestionConfiguration(
  chunkingStrategy: ChunkingStrategy,
  maxTokens: number = CHUNKING_MAX_TOKENS,
  overlapPercentage: number = CHUNKING_OVERLAP,
): VectorIngestionConfig {

  if (chunkingStrategy === ChunkingStrategy.FIXED_SIZE) {
    if (maxTokens <= 20 || maxTokens >= 8000) {
      throw new Error(`maxTokens must be between 20 and 8000, got ${maxTokens}`);
    }

    if (overlapPercentage < 0 || overlapPercentage > 100) {
      throw new Error(`overlapPercentage must be between 0 and 100, got ${overlapPercentage}`);
    }

    return {
      chunkingConfiguration: {
        chunkingStrategy: chunkingStrategy,
        fixedSizeChunkingConfiguration: {
          maxTokens,
          overlapPercentage,
        },
      },
    };

  } else if (chunkingStrategy === ChunkingStrategy.NONE) {

    return {
      chunkingConfiguration: {
        chunkingStrategy,
      },
    };

  } else {
    return {};
  }

}