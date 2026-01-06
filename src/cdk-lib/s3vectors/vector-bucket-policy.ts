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

import { RemovalPolicy, Resource } from 'aws-cdk-lib';
import { PolicyDocument } from 'aws-cdk-lib/aws-iam';
import { CfnVectorBucketPolicy, IVectorBucketPolicyRef, VectorBucketPolicyReference } from 'aws-cdk-lib/aws-s3vectors';
import { Construct } from 'constructs';
import { IVectorBucket, VectorBucket } from './vector-bucket';

export interface VectorBucketPolicyProps {
  /**
   * The S3 vector bucket that the policy applies to.
   */
  readonly bucket: IVectorBucket;

  /**
   * Policy to apply when the policy is removed from this stack.
   *
   * @default - RemovalPolicy.DESTROY.
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * Policy document to apply to the bucket.
   *
   * @default - A new empty PolicyDocument will be created.
   */
  readonly document?: PolicyDocument;
}

export class VectorBucketPolicy extends Resource implements IVectorBucketPolicyRef {
  /**
   * Create a mutable `VectorBucketPolicy` from a `CfnVectorBucketPolicy`.
   */
  public static fromCfnVectorBucketPolicy(cfnVectorBucketPolicy: CfnVectorBucketPolicy): VectorBucketPolicy {
    // use a "weird" id that has a higher chance of being unique
    const id = '@FromCfnVectorBucketPolicy';

    // if fromCfnBucketPolicy() was already called on this CfnBucketPolicy,
    // return the same L2
    // (as different L2s would conflict, because of the mutation of the document property of the L1 below)
    const existing = cfnVectorBucketPolicy.node.tryFindChild(id);
    if (existing) {
      return <VectorBucketPolicy>existing;
    }

    // resolve the Bucket this Policy references
    // Note: We use fromVectorBucketName as a fallback since we can't reliably
    // determine the source CfnVectorBucket without using internal CDK APIs (cfnreference).
    // This works correctly in all cases, including when the bucket name is a token.
    const bucket = VectorBucket.fromVectorBucketName(
      cfnVectorBucketPolicy,
      '@FromCfnVectorBucket',
      cfnVectorBucketPolicy.vectorBucketName!,
    );

    const ret = new VectorBucketPolicy(cfnVectorBucketPolicy, id, {
      bucket,
      document: PolicyDocument.fromJson(cfnVectorBucketPolicy.policy),
    });

    // mark the Bucket as having this Policy
    bucket.policy = ret;
    return ret;
  }

  public readonly vectorBucketPolicyRef: VectorBucketPolicyReference;

  /**
   * A policy document containing permissions to add to the specified bucket.
   * For more information, see Access Policy Language Overview in the Amazon
   * Simple Storage Service Developer Guide.
   */
  public readonly document: PolicyDocument;

  /** The Bucket this Policy applies to. */
  public readonly bucket: IVectorBucket;

  private resource: CfnVectorBucketPolicy;

  constructor(scope: Construct, id: string, props: VectorBucketPolicyProps) {
    super(scope, id);

    this.bucket = props.bucket;
    this.document = props.document ?? new PolicyDocument();

    // Note: The CloudFormation resource CfnVectorBucketPolicy requires either VectorBucketName or VectorBucketArn, not both.
    this.resource = new CfnVectorBucketPolicy(this, 'Resource', {
      vectorBucketArn: this.bucket.vectorBucketArn,
      policy: this.document,
    });
    this.vectorBucketPolicyRef = this.resource.vectorBucketPolicyRef;

    if (props.removalPolicy) {
      this.resource.applyRemovalPolicy(props.removalPolicy);
    }
  }

  /**
   * Sets the removal policy for the VectorBucketPolicy.
   * @param removalPolicy the RemovalPolicy to set.
   */
  public applyRemovalPolicy(removalPolicy: RemovalPolicy) {
    this.resource.applyRemovalPolicy(removalPolicy);
  }
}
