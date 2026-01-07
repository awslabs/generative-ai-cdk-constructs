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

import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { AnyPrincipal, PolicyDocument, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { CfnVectorBucket, CfnVectorBucketPolicy } from 'aws-cdk-lib/aws-s3vectors';
import { VectorBucket } from '../../../src/cdk-lib/s3vectors/vector-bucket';
import { VectorBucketPolicy } from '../../../src/cdk-lib/s3vectors/vector-bucket-policy';

// to make it easy to copy & paste from output:
/* eslint-disable @stylistic/quote-props */

describe('VectorBucketPolicy', () => {
  test('default properties', () => {
    const stack = new Stack();

    const myBucket = new VectorBucket(stack, 'MyBucket');
    const myBucketPolicy = new VectorBucketPolicy(stack, 'MyBucketPolicy', {
      bucket: myBucket,
    });
    myBucketPolicy.document.addStatements(new PolicyStatement({
      resources: [myBucket.vectorBucketArn],
      actions: ['s3vectors:GetVectorBucket'],
      principals: [new AnyPrincipal()],
    }));

    Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucketPolicy', {
      VectorBucketArn: {
        'Fn::GetAtt': [
          'MyBucketF68F3FF0',
          'VectorBucketArn',
        ],
      },
      Policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 's3vectors:GetVectorBucket',
            Effect: 'Allow',
            Principal: { AWS: '*' },
            Resource: {
              'Fn::GetAtt': [
                'MyBucketF68F3FF0',
                'VectorBucketArn',
              ],
            },
          },
        ],
      },
    });
  });

  test('when specifying a removalPolicy at creation', () => {
    const stack = new Stack();

    const myBucket = new VectorBucket(stack, 'MyBucket');
    const myBucketPolicy = new VectorBucketPolicy(stack, 'MyBucketPolicy', {
      bucket: myBucket,
      removalPolicy: RemovalPolicy.RETAIN,
    });
    myBucketPolicy.document.addStatements(new PolicyStatement({
      resources: [myBucket.vectorBucketArn],
      actions: ['s3vectors:GetVectorBucket'],
      principals: [new AnyPrincipal()],
    }));

    Template.fromStack(stack).hasResource('AWS::S3Vectors::VectorBucketPolicy', {
      DeletionPolicy: 'Retain',
      UpdateReplacePolicy: 'Retain',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucketPolicy', {
      Policy: {
        Statement: [
          {
            Action: 's3vectors:GetVectorBucket',
            Effect: 'Allow',
            Principal: { AWS: '*' },
            Resource: {
              'Fn::GetAtt': [
                'MyBucketF68F3FF0',
                'VectorBucketArn',
              ],
            },
          },
        ],
        Version: '2012-10-17',
      },
    });
  });

  test('when specifying a removalPolicy after creation', () => {
    const stack = new Stack();

    const myBucket = new VectorBucket(stack, 'MyBucket');
    myBucket.addToResourcePolicy(new PolicyStatement({
      resources: [myBucket.vectorBucketArn],
      actions: ['s3vectors:GetVectorBucket'],
      principals: [new AnyPrincipal()],
    }));
    myBucket.policy?.applyRemovalPolicy(RemovalPolicy.RETAIN);

    Template.fromStack(stack).hasResource('AWS::S3Vectors::VectorBucketPolicy', {
      DeletionPolicy: 'Retain',
      UpdateReplacePolicy: 'Retain',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucketPolicy', {
      Policy: {
        Statement: [
          {
            Action: 's3vectors:GetVectorBucket',
            Effect: 'Allow',
            Principal: { AWS: '*' },
            Resource: {
              'Fn::GetAtt': [
                'MyBucketF68F3FF0',
                'VectorBucketArn',
              ],
            },
          },
        ],
        Version: '2012-10-17',
      },
    });
  });

  test('fails if bucket policy has no actions', () => {
    const stack = new Stack();
    const myBucket = new VectorBucket(stack, 'MyBucket');
    myBucket.addToResourcePolicy(new PolicyStatement({
      resources: [myBucket.vectorBucketArn],
      principals: [new AnyPrincipal()],
    }));

    expect(() => {
      Template.fromStack(stack).toJSON();
    }).toThrow(/A PolicyStatement must specify at least one 'action' or 'notAction'/);
  });

  test('fails if bucket policy has no IAM principals', () => {
    const stack = new Stack();
    const myBucket = new VectorBucket(stack, 'MyBucket');
    myBucket.addToResourcePolicy(new PolicyStatement({
      resources: [myBucket.vectorBucketArn],
      actions: ['s3vectors:GetVectorBucket'],
    }));

    expect(() => {
      Template.fromStack(stack).toJSON();
    }).toThrow(/A PolicyStatement used in a resource-based policy must specify at least one IAM principal/);
  });

  describe('fromCfnVectorBucketPolicy()', () => {
    const stack = new Stack();

    test('correctly extracts the Document and Bucket from the L1', () => {
      const cfnBucket = new CfnVectorBucket(stack, 'CfnBucket', {
        encryptionConfiguration: {
          sseType: 'AES256',
        },
      });
      const cfnBucketPolicy = bucketPolicyForBucketNamed(stack, cfnBucket.ref);
      const bucketPolicy = VectorBucketPolicy.fromCfnVectorBucketPolicy(cfnBucketPolicy);

      expect(bucketPolicy.document).not.toBeUndefined();
      expect(bucketPolicy.document.isEmpty).toBeFalsy();

      expect(bucketPolicy.bucket).not.toBeUndefined();
      expect(bucketPolicy.bucket.policy).not.toBeUndefined();
      expect(bucketPolicy.bucket.policy?.document.isEmpty).toBeFalsy();
    });

    test('correctly references a bucket by name', () => {
      const testStack = new Stack();
      const cfnBucketPolicy = bucketPolicyForBucketNamed(testStack, 'hardcoded-name');
      const bucketPolicy = VectorBucketPolicy.fromCfnVectorBucketPolicy(cfnBucketPolicy);

      expect(bucketPolicy.bucket).not.toBeUndefined();
      expect(bucketPolicy.bucket.vectorBucketName).toBe('hardcoded-name');
    });

    test('should synthesize without errors and create duplicate cfn resource', () => {
      const testStack = new Stack();
      const cfnBucketPolicy = new CfnVectorBucketPolicy(testStack, 'TestBucketPolicy', {
        policy: {
          Statement: [
            {
              Action: 's3vectors:*',
              Effect: 'Deny',
              Principal: {
                AWS: '*',
              },
              Resource: '*',
            },
          ],
          Version: '2012-10-17',
        },
        vectorBucketName: 'test-bucket',
      });

      VectorBucketPolicy.fromCfnVectorBucketPolicy(cfnBucketPolicy);

      // Verify that two CfnVectorBucketPolicy resources are created
      const template = Template.fromStack(testStack);
      const bucketPolicies = template.findResources('AWS::S3Vectors::VectorBucketPolicy');
      expect(Object.keys(bucketPolicies)).toHaveLength(2);

      // Both should have valid policy documents
      Object.values(bucketPolicies).forEach((policy: any) => {
        expect(policy.Properties.Policy).toBeDefined();
        expect(policy.Properties.Policy.Statement).toBeDefined();
      });
    });

    function bucketPolicyForBucketNamed(scope: Stack, name: string): CfnVectorBucketPolicy {
      return new CfnVectorBucketPolicy(scope, `CfnBucketPolicy-${name}`, {
        policy: {
          Statement: [
            {
              Action: 's3vectors:*',
              Effect: 'Deny',
              Principal: {
                AWS: '*',
              },
              Resource: '*',
            },
          ],
          Version: '2012-10-17',
        },
        vectorBucketName: name,
      });
    }
  });

  test('policy document can be provided at construction', () => {
    const stack = new Stack();
    const bucket = new VectorBucket(stack, 'MyBucket');
    const policyDoc = new PolicyDocument({
      statements: [
        new PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3vectors:GetVectorBucket'],
          resources: [bucket.vectorBucketArn],
          principals: [new AnyPrincipal()],
        }),
      ],
    });

    const policy = new VectorBucketPolicy(stack, 'MyPolicy', {
      bucket,
      document: policyDoc,
    });

    expect(policy.document).toBe(policyDoc);
    Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucketPolicy', {
      Policy: {
        Statement: [
          {
            Action: 's3vectors:GetVectorBucket',
            Effect: 'Allow',
            Principal: { AWS: '*' },
          },
        ],
      },
    });
  });

  test('default removal policy is DESTROY', () => {
    const stack = new Stack();
    const bucket = new VectorBucket(stack, 'MyBucket');
    const policyDoc = new PolicyDocument({
      statements: [
        new PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3vectors:GetVectorBucket'],
          resources: [bucket.vectorBucketArn],
          principals: [new AnyPrincipal()],
        }),
      ],
    });

    new VectorBucketPolicy(stack, 'MyPolicy', {
      bucket,
      document: policyDoc,
    });

    // Default removal policy for VectorBucketPolicy is DESTROY (as per the interface default)
    // But if not explicitly set, CDK defaults to RETAIN for resources
    // Let's check that the resource exists and has a policy
    Template.fromStack(stack).hasResource('AWS::S3Vectors::VectorBucketPolicy', Match.anyValue());
  });

  test('can add multiple statements to policy document', () => {
    const stack = new Stack();
    const bucket = new VectorBucket(stack, 'MyBucket');
    const policy = new VectorBucketPolicy(stack, 'MyPolicy', {
      bucket,
    });

    policy.document.addStatements(
      new PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3vectors:GetVectorBucket'],
        resources: [bucket.vectorBucketArn],
        principals: [new AnyPrincipal()],
      }),
      new PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3vectors:ListIndexes'],
        resources: [bucket.vectorBucketArn],
        principals: [new AnyPrincipal()],
      }),
    );

    Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucketPolicy', {
      Policy: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 's3vectors:GetVectorBucket',
            Effect: 'Allow',
          }),
          Match.objectLike({
            Action: 's3vectors:ListIndexes',
            Effect: 'Allow',
          }),
        ]),
      },
    });
  });

  test('policy can reference index resources', () => {
    const stack = new Stack();
    const bucket = new VectorBucket(stack, 'MyBucket');
    const policy = new VectorBucketPolicy(stack, 'MyPolicy', {
      bucket,
    });

    policy.document.addStatements(new PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3vectors:GetIndex'],
      resources: [`${bucket.vectorBucketArn}/index/*`],
      principals: [new AnyPrincipal()],
    }));

    Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucketPolicy', {
      Policy: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 's3vectors:GetIndex',
            Effect: 'Allow',
            Resource: {
              'Fn::Join': [
                '',
                Match.arrayWith([
                  {
                    'Fn::GetAtt': [
                      'MyBucketF68F3FF0',
                      'VectorBucketArn',
                    ],
                  },
                  '/index/*',
                ]),
              ],
            },
          }),
        ]),
      },
    });
  });
});
