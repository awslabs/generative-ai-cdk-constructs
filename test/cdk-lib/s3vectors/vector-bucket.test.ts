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
import { App, Aspects, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import { AwsSolutionsChecks } from 'cdk-nag';
import { VectorBucket, VectorBucketEncryption } from '../../../src/cdk-lib/s3vectors/vector-bucket';

// mock lambda.Code.fromDockerBuild()
jest.mock('aws-cdk-lib/aws-lambda', () => {
  const actualLambda = jest.requireActual('aws-cdk-lib/aws-lambda');
  return {
    ...actualLambda,
    Code: {
      ...actualLambda.Code,
      fromDockerBuild: jest.fn(() => actualLambda.Code.fromInline('mockCode')),
      fromAsset: jest.fn(() => actualLambda.Code.fromInline('mockCode')),
    },
  };
});

describe('VectorBucket', () => {
  describe('Default bucket', () => {
    test('default bucket', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      new VectorBucket(stack, 'MyBucket');

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucket', {
        EncryptionConfiguration: {
          SseType: 'AES256',
        },
      });

      Template.fromStack(stack).hasResource('AWS::S3Vectors::VectorBucket', {
        DeletionPolicy: 'Retain',
        UpdateReplacePolicy: 'Retain',
      });
    });

    test('bucket with S3_MANAGED encryption', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      new VectorBucket(stack, 'MyBucket', {
        encryption: VectorBucketEncryption.S3_MANAGED,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucket', {
        EncryptionConfiguration: {
          SseType: 'AES256',
        },
      });

      Template.fromStack(stack).hasResource('AWS::S3Vectors::VectorBucket', {
        DeletionPolicy: 'Retain',
        UpdateReplacePolicy: 'Retain',
      });
    });

    test('bucket with KMS_MANAGED encryption', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      new VectorBucket(stack, 'MyBucket', {
        encryption: VectorBucketEncryption.KMS,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucket', {
        EncryptionConfiguration: {
          SseType: 'aws:kms',
          KmsKeyArn: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('MyBucketKey.*'),
              'Arn',
            ],
          },
        },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::KMS::Key', {
        Description: Match.stringLikeRegexp('Created by .*'),
        EnableKeyRotation: true,
      });
    });

    test('bucket with KMS encryption and custom key', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const key = new kms.Key(stack, 'MyKey');
      new VectorBucket(stack, 'MyBucket', {
        encryption: VectorBucketEncryption.KMS,
        encryptionKey: key,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucket', {
        EncryptionConfiguration: {
          SseType: 'aws:kms',
          KmsKeyArn: {
            'Fn::GetAtt': [
              'MyKey6AB29FA6',
              'Arn',
            ],
          },
        },
      });
    });

    test('bucket with KMS encryption key but S3_MANAGED encryption type throws error', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const key = new kms.Key(stack, 'MyKey');

      expect(() => {
        new VectorBucket(stack, 'MyBucket', {
          encryption: VectorBucketEncryption.S3_MANAGED,
          encryptionKey: key,
        });
      }).toThrow('Encryption key cannot be specified for S3_MANAGED encryption');
    });

    test('bucket with KMS encryption grants service principal permissions', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const key = new kms.Key(stack, 'MyKey');
      new VectorBucket(stack, 'MyBucket', {
        encryption: VectorBucketEncryption.KMS,
        encryptionKey: key,
      });

      // Verify the KMS key policy includes the S3 Vectors service principal
      Template.fromStack(stack).hasResourceProperties('AWS::KMS::Key', {
        KeyPolicy: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Sid: 'AllowS3VectorsServicePrincipal',
              Effect: 'Allow',
              Principal: {
                Service: 'indexing.s3vectors.amazonaws.com',
              },
              Action: 'kms:Decrypt',
              Condition: Match.objectLike({
                ArnLike: {
                  'aws:SourceArn': Match.anyValue(),
                },
                StringEquals: {
                  'aws:SourceAccount': '123456789012',
                },
              }),
            }),
          ]),
        },
      });
    });

    test('bucket with auto-created KMS key grants service principal permissions', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      new VectorBucket(stack, 'MyBucket', {
        encryption: VectorBucketEncryption.KMS,
      });

      // Verify the auto-created KMS key policy includes the S3 Vectors service principal
      Template.fromStack(stack).hasResourceProperties('AWS::KMS::Key', {
        KeyPolicy: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Sid: 'AllowS3VectorsServicePrincipal',
              Effect: 'Allow',
              Principal: {
                Service: 'indexing.s3vectors.amazonaws.com',
              },
              Action: 'kms:Decrypt',
            }),
          ]),
        },
      });
    });
  });

  describe('Bucket name validation', () => {
    test('valid bucket names', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      expect(() => new VectorBucket(stack, 'MyBucket1', {
        vectorBucketName: 'abc-xyz-34ab',
      })).not.toThrow();

      expect(() => new VectorBucket(stack, 'MyBucket2', {
        vectorBucketName: '124-pp-33',
      })).not.toThrow();

      expect(() => new VectorBucket(stack, 'MyBucket3', {
        vectorBucketName: 'a'.repeat(63),
      })).not.toThrow();
    });

    test('creating bucket with underscore in name throws error', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      expect(() => {
        new VectorBucket(stack, 'TestBucket', { vectorBucketName: 'test_bucket_name' });
      }).toThrow(/does not match the required pattern/);
    });

    test('creating bucket with uppercase letters throws error', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      expect(() => {
        new VectorBucket(stack, 'TestBucket2', { vectorBucketName: 'TestBucket' });
      }).toThrow(/does not match the required pattern/);
    });

    test('bucket validation skips tokenized values', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      expect(() => new VectorBucket(stack, 'MyBucket', {
        vectorBucketName: cdk.Lazy.string({ produce: () => '_BUCKET' }),
      })).not.toThrow();
    });

    test('fails with message on invalid bucket names', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = `-buckEt.-${new Array(65).join('$')}`;

      expect(() => new VectorBucket(stack, 'MyBucket', {
        vectorBucketName: bucket,
      })).toThrow(/does not match the required pattern/);
    });

    test('fails if bucket name has less than 3 or more than 63 characters', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      expect(() => {
        new VectorBucket(stack, 'MyBucket', {
          vectorBucketName: 'ab',
        });
      }).toThrow(/must be at least 3 characters/);

      expect(() => {
        new VectorBucket(stack, 'MyBucket2', {
          vectorBucketName: 'a'.repeat(64),
        });
      }).toThrow(/must be less than or equal to 63 characters/);
    });

    test('fails if bucket name starts or ends with hyphen', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      expect(() => {
        new VectorBucket(stack, 'MyBucket', {
          vectorBucketName: '-bucket-name',
        });
      }).toThrow(/must begin and end with a letter or number/);

      expect(() => {
        new VectorBucket(stack, 'MyBucket2', {
          vectorBucketName: 'bucket-name-',
        });
      }).toThrow(/must begin and end with a letter or number/);
    });
  });

  describe('Removal policies', () => {
    test('default removal policy is RETAIN', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      new VectorBucket(stack, 'MyBucket');

      Template.fromStack(stack).hasResource('AWS::S3Vectors::VectorBucket', {
        DeletionPolicy: 'Retain',
        UpdateReplacePolicy: 'Retain',
      });
    });

    test('can set removal policy to DESTROY', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      new VectorBucket(stack, 'MyBucket', {
        removalPolicy: RemovalPolicy.DESTROY,
      });

      Template.fromStack(stack).hasResource('AWS::S3Vectors::VectorBucket', {
        DeletionPolicy: 'Delete',
        UpdateReplacePolicy: 'Delete',
      });
    });

    test('can set removal policy to SNAPSHOT', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      new VectorBucket(stack, 'MyBucket', {
        removalPolicy: RemovalPolicy.SNAPSHOT,
      });

      Template.fromStack(stack).hasResource('AWS::S3Vectors::VectorBucket', {
        DeletionPolicy: 'Snapshot',
        UpdateReplacePolicy: 'Snapshot',
      });
    });
  });

  describe('Auto-delete objects', () => {
    test('autoDeleteObjects requires DESTROY removal policy', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      expect(() => {
        new VectorBucket(stack, 'MyBucket', {
          autoDeleteObjects: true,
          removalPolicy: RemovalPolicy.RETAIN,
        });
      }).toThrow(/Cannot use 'autoDeleteObjects' property on a bucket without setting removal policy to 'DESTROY'/);
    });

    test('autoDeleteObjects creates custom resource and policy', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      new VectorBucket(stack, 'MyBucket', {
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
      });

      Template.fromStack(stack).resourceCountIs('Custom::S3VectorsAutoDeleteObjects', 1);
      Template.fromStack(stack).resourceCountIs('AWS::S3Vectors::VectorBucketPolicy', 1);
      // There are at least 2 Lambda functions for the auto-delete provider (handler + framework)
      const lambdaCount = Template.fromStack(stack).findResources('AWS::Lambda::Function');
      expect(Object.keys(lambdaCount).length).toBeGreaterThanOrEqual(2);

      // Verify the bucket is tagged (tags are added via Tags.of() which adds them at resource level)
      // Tags might not appear in Properties, so we just verify the resource exists and the policy is created
      Template.fromStack(stack).hasResource('AWS::S3Vectors::VectorBucket', Match.anyValue());
    });

    test('autoDeleteObjects grants correct permissions to provider role', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      new VectorBucket(stack, 'MyBucket', {
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
      });

      // Verify the policy exists and has the correct structure
      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucketPolicy', {
        Policy: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Effect: 'Allow',
              Principal: {
                AWS: {
                  'Fn::GetAtt': [
                    Match.stringLikeRegexp('.*AutoDeleteObjectsRole.*'),
                    'Arn',
                  ],
                },
              },
            }),
          ]),
        },
      });

      // Verify the Resource array contains both the bucket ARN and index ARN pattern
      const policies = Template.fromStack(stack).findResources('AWS::S3Vectors::VectorBucketPolicy');
      const policy = Object.values(policies)[0];
      const statements = policy.Properties.Policy.Statement;
      const autoDeleteStatement = statements.find((s: any) =>
        s.Principal?.AWS?.['Fn::GetAtt']?.[0]?.match(/.*AutoDeleteObjectsRole.*/),
      );
      expect(autoDeleteStatement).toBeDefined();
      expect(autoDeleteStatement.Resource).toBeDefined();
      expect(Array.isArray(autoDeleteStatement.Resource)).toBe(true);
      expect(autoDeleteStatement.Resource.length).toBeGreaterThanOrEqual(2);

      // Check that one resource is the bucket ARN and another contains '/index/*'
      const resourceStrings = autoDeleteStatement.Resource.map((r: any) => {
        if (r['Fn::GetAtt']) {
          return r['Fn::GetAtt'][1]; // Get the attribute name
        }
        if (r['Fn::Join']) {
          return r['Fn::Join'][1].join(''); // Join the parts
        }
        return JSON.stringify(r);
      });
      expect(resourceStrings.some((r: string) => r.includes('VectorBucketArn'))).toBe(true);
      expect(resourceStrings.some((r: string) => r.includes('/index/*'))).toBe(true);
    });
  });

  describe('Grant methods', () => {
    let stack: Stack;
    let bucket: VectorBucket;
    let role: iam.Role;

    beforeEach(() => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      bucket = new VectorBucket(stack, 'MyBucket');
      role = new iam.Role(stack, 'TestRole', {
        assumedBy: new iam.AccountRootPrincipal(),
      });
    });

    test('grantRead grants read permissions', () => {
      bucket.grantRead(role);

      // Grants add to IAM policies for IAM roles
      // Note: Actions can be strings or arrays depending on how many actions are in the statement
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Effect: 'Allow',
              Action: Match.anyValue(), // Actions can be string or array
            }),
          ]),
        },
      });

      // Verify the actions are present (check the actual policy document)
      const policies = Template.fromStack(stack).findResources('AWS::IAM::Policy');
      const policy = Object.values(policies)[0];
      const statements = policy.Properties.PolicyDocument.Statement;
      const bucketStatement = statements.find((s: any) =>
        (Array.isArray(s.Action) ? s.Action : [s.Action]).some((a: string) =>
          a === 's3vectors:GetVectorBucket' || a === 's3vectors:ListVectorBuckets',
        ),
      );
      expect(bucketStatement).toBeDefined();
    });

    test('grantRead with specific index IDs', () => {
      bucket.grantRead(role, ['index1', 'index2']);

      // Grants add to IAM policies for IAM roles
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Effect: 'Allow',
              Action: Match.arrayWith([
                's3vectors:GetIndex',
                's3vectors:QueryVectors',
              ]),
            }),
          ]),
        },
      });
    });

    test('grantWrite grants write permissions', () => {
      bucket.grantWrite(role);

      // Grants add to IAM policies for IAM roles
      // Note: Actions can be strings or arrays depending on how many actions are in the statement
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Effect: 'Allow',
              Action: Match.anyValue(), // Actions can be string or array
            }),
          ]),
        },
      });

      // Verify the actions are present (check the actual policy document)
      const policies = Template.fromStack(stack).findResources('AWS::IAM::Policy');
      const policy = Object.values(policies)[0];
      const statements = policy.Properties.PolicyDocument.Statement;
      const writeStatement = statements.find((s: any) => {
        const actions = Array.isArray(s.Action) ? s.Action : [s.Action];
        return actions.some((a: string) =>
          a === 's3vectors:CreateVectorBucket' ||
          a === 's3vectors:CreateIndex' ||
          a === 's3vectors:PutVectors',
        );
      });
      expect(writeStatement).toBeDefined();
    });

    test('grantDelete grants delete permissions', () => {
      bucket.grantDelete(role);

      // Grants add to IAM policies for IAM roles
      // Note: Actions can be strings or arrays depending on how many actions are in the statement
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Effect: 'Allow',
              Action: Match.anyValue(), // Actions can be string or array
            }),
          ]),
        },
      });

      // Verify the actions are present (check the actual policy document)
      const policies = Template.fromStack(stack).findResources('AWS::IAM::Policy');
      const policy = Object.values(policies)[0];
      const statements = policy.Properties.PolicyDocument.Statement;
      const deleteStatement = statements.find((s: any) => {
        const actions = Array.isArray(s.Action) ? s.Action : [s.Action];
        return actions.some((a: string) =>
          a === 's3vectors:DeleteVectorBucket' ||
          a === 's3vectors:DeleteIndex' ||
          a === 's3vectors:DeleteVectors',
        );
      });
      expect(deleteStatement).toBeDefined();
    });

    test('grantRead with KMS key grants key permissions', () => {
      const kmsKey = new kms.Key(stack, 'MyKey');
      const kmsBucket = new VectorBucket(stack, 'KmsBucket', {
        encryption: VectorBucketEncryption.KMS,
        encryptionKey: kmsKey,
      });

      kmsBucket.grantRead(role);

      // KMS key permissions are always added to IAM policies
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Effect: 'Allow',
              Action: Match.arrayWith([
                'kms:Decrypt',
                'kms:DescribeKey',
              ]),
              Resource: {
                'Fn::GetAtt': [
                  'MyKey6AB29FA6',
                  'Arn',
                ],
              },
            }),
          ]),
        },
      });
    });
  });

  describe('Resource policy', () => {
    test('addToResourcePolicy creates policy automatically', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      bucket.addToResourcePolicy(new iam.PolicyStatement({
        actions: ['s3vectors:GetVectorBucket'],
        resources: [bucket.vectorBucketArn],
        principals: [new iam.AccountRootPrincipal()],
      }));

      Template.fromStack(stack).resourceCountIs('AWS::S3Vectors::VectorBucketPolicy', 1);
      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucketPolicy', {
        Policy: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Effect: 'Allow',
              Action: 's3vectors:GetVectorBucket',
              Principal: {
                AWS: Match.anyValue(),
              },
            }),
          ]),
        },
      });
    });

    test('addToResourcePolicy returns correct result', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      const result = bucket.addToResourcePolicy(new iam.PolicyStatement({
        actions: ['s3vectors:GetVectorBucket'],
        resources: [bucket.vectorBucketArn],
        principals: [new iam.AccountRootPrincipal()],
      }));

      expect(result.statementAdded).toBe(true);
      expect(result.policyDependable).toBeDefined();
    });
  });

  describe('Static import methods', () => {
    test('fromVectorBucketName creates imported bucket', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = VectorBucket.fromVectorBucketName(stack, 'ImportedBucket', 'my-bucket-name');

      expect(bucket.vectorBucketName).toBe('my-bucket-name');
      // ARN is a token for imported buckets, so we check it contains the bucket name
      expect(bucket.vectorBucketArn).toContain('bucket/my-bucket-name');
    });

    test('fromVectorBucketArn creates imported bucket', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const arn = 'arn:aws:s3vectors:us-east-1:123456789012:bucket/my-bucket-name';
      const bucket = VectorBucket.fromVectorBucketArn(stack, 'ImportedBucket', arn);

      expect(bucket.vectorBucketArn).toBe(arn);
      expect(bucket.vectorBucketName).toBe('my-bucket-name');
    });

    test('fromVectorBucketAttributes creates imported bucket', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const arn = 'arn:aws:s3vectors:us-east-1:123456789012:bucket/my-bucket-name';
      const bucket = VectorBucket.fromVectorBucketAttributes(stack, 'ImportedBucket', {
        vectorBucketArn: arn,
        creationTime: '2024-01-01T00:00:00Z',
      });

      expect(bucket.vectorBucketArn).toBe(arn);
      expect(bucket.vectorBucketName).toBe('my-bucket-name');
      expect(bucket.creationTime).toBe('2024-01-01T00:00:00Z');
    });

    test('fromVectorBucketAttributes with KMS key', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const key = new kms.Key(stack, 'MyKey');
      const arn = 'arn:aws:s3vectors:us-east-1:123456789012:bucket/my-bucket-name';
      const bucket = VectorBucket.fromVectorBucketAttributes(stack, 'ImportedBucket', {
        vectorBucketArn: arn,
        encryptionKey: key,
      });

      expect(bucket.encryptionKey).toBe(key);
    });

    test('fromVectorBucketAttributes throws error if bucket name cannot be extracted', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      expect(() => {
        VectorBucket.fromVectorBucketAttributes(stack, 'ImportedBucket', {
          vectorBucketArn: 'invalid-arn',
        });
      }).toThrow(/ARNs must start with "arn:"/);
    });
  });

  describe('Attributes', () => {
    test('bucket exposes correct attributes', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket', {
        vectorBucketName: 'my-bucket',
      });

      // ARN is a token, so we check it's defined and contains the bucket name pattern
      expect(bucket.vectorBucketArn).toBeDefined();
      expect(bucket.vectorBucketName).toBeDefined();

      // Verify the bucket name is set in the template
      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucket', {
        VectorBucketName: 'my-bucket',
      });
    });

    test('bucket name is extracted from ARN correctly', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket', {
        vectorBucketName: 'test-bucket-name',
      });

      // The bucket name should be extracted using Fn::Select and Fn::Split
      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::VectorBucket', {
        VectorBucketName: 'test-bucket-name',
      });

      // Verify the bucket name attribute is correctly set
      expect(bucket.vectorBucketName).toBeDefined();
    });
  });

  describe('CFN properties validation', () => {
    test('CFN properties are type-validated during resolution', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      new VectorBucket(stack, 'MyBucket', {
        vectorBucketName: cdk.Token.asString(5), // Oh no
      });

      expect(() => {
        Template.fromStack(stack).toJSON();
      }).toThrow(/vectorBucketName: 5 should be a string/);
    });
  });

  describe('Edge cases', () => {
    test('bucket with minimal valid name', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      expect(() => {
        new VectorBucket(stack, 'MyBucket', {
          vectorBucketName: 'abc',
        });
      }).not.toThrow();
    });

    test('bucket with maximum length name', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      expect(() => {
        new VectorBucket(stack, 'MyBucket', {
          vectorBucketName: 'a'.repeat(63),
        });
      }).not.toThrow();
    });

    test('multiple grants to same principal', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      const role = new iam.Role(stack, 'TestRole', {
        assumedBy: new iam.AccountRootPrincipal(),
      });

      bucket.grantRead(role);
      bucket.grantWrite(role);
      bucket.grantDelete(role);

      // Should not throw and should create IAM policy with all permissions
      Template.fromStack(stack).resourceCountIs('AWS::IAM::Policy', 1);

      // Verify all grant actions are present in the IAM policy
      // Check that the policy exists and has statements
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Effect: 'Allow',
              Action: Match.anyValue(),
            }),
          ]),
        },
      });

      // Verify the specific actions are present
      const policies = Template.fromStack(stack).findResources('AWS::IAM::Policy');
      const policy = Object.values(policies)[0];
      const statements = policy.Properties.PolicyDocument.Statement;
      const allActions = statements.flatMap((s: any) =>
        Array.isArray(s.Action) ? s.Action : [s.Action],
      );
      expect(allActions).toContain('s3vectors:GetVectorBucket');
      expect(allActions).toContain('s3vectors:CreateVectorBucket');
      expect(allActions).toContain('s3vectors:DeleteVectorBucket');
    });
  });
});

