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

import { App, Aspects, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import { AwsSolutionsChecks } from 'cdk-nag';
import { VectorBucket } from '../../../src/cdk-lib/s3vectors/vector-bucket';
import {
  VectorIndex,
  VectorIndexDataType,
  VectorIndexDistanceMetric,
  VectorIndexEncryption,
} from '../../../src/cdk-lib/s3vectors/vector-index';

describe('VectorIndex', () => {
  describe('Default index', () => {
    test('creates index with minimal required properties', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      const index = new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
      });

      expect(index).toBeDefined();
      expect(index.vectorIndexArn).toBeDefined();
      expect(index.vectorIndexName).toBeDefined();
      expect(index.dimension).toBe(128);
      expect(index.dataType).toBe(VectorIndexDataType.FLOAT_32);
      expect(index.distanceMetric).toBe(VectorIndexDistanceMetric.COSINE);

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        Dimension: 128,
        DataType: 'float32',
        DistanceMetric: 'cosine',
        VectorBucketArn: {
          'Fn::GetAtt': [
            'MyBucketF68F3FF0',
            'VectorBucketArn',
          ],
        },
      });
    });

    test('creates index with all properties specified', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        vectorIndexName: 'my-index',
        dimension: 256,
        dataType: VectorIndexDataType.FLOAT_32,
        distanceMetric: VectorIndexDistanceMetric.EUCLIDEAN,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        IndexName: 'my-index',
        Dimension: 256,
        DataType: 'float32',
        DistanceMetric: 'euclidean',
      });
    });
  });

  describe('Encryption', () => {
    test('index with S3_MANAGED encryption', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
        encryption: VectorIndexEncryption.S3_MANAGED,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        EncryptionConfiguration: {
          SseType: 'AES256',
        },
      });
    });

    test('index with KMS encryption and auto-created key', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
        encryption: VectorIndexEncryption.KMS,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        EncryptionConfiguration: {
          SseType: 'aws:kms',
          KmsKeyArn: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('MyIndexKey.*'),
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

    test('index with KMS encryption and provided key', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      const key = new kms.Key(stack, 'MyKey');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
        encryption: VectorIndexEncryption.KMS,
        encryptionKey: key,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
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

    test('fails if encryption key is provided with S3_MANAGED encryption', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      const key = new kms.Key(stack, 'MyKey');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          dimension: 128,
          encryption: VectorIndexEncryption.S3_MANAGED,
          encryptionKey: key,
        });
      }).toThrow(/Encryption key cannot be specified for S3_MANAGED encryption/);
    });

    test('index with KMS encryption grants service principal permissions', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      const key = new kms.Key(stack, 'MyKey');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
        encryption: VectorIndexEncryption.KMS,
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

    test('index with auto-created KMS key grants service principal permissions', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
        encryption: VectorIndexEncryption.KMS,
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

  describe('Index name validation', () => {
    test('fails if index name is too short', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          vectorIndexName: 'ab',
          dimension: 128,
        });
      }).toThrow(/must be at least 3 characters/);
    });

    test('fails if index name is too long', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          vectorIndexName: 'a'.repeat(64),
          dimension: 128,
        });
      }).toThrow(/must be less than or equal to 63 characters/);
    });

    test('fails if index name contains invalid characters', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          vectorIndexName: 'my_index',
          dimension: 128,
        });
      }).toThrow(/Vector index name.*does not match the required pattern/);
    });

    test('fails if index name starts with invalid character', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          vectorIndexName: '-my-index',
          dimension: 128,
        });
      }).toThrow(/Vector index name must begin and end with a letter or number/);
    });

    test('fails if index name ends with invalid character', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          vectorIndexName: 'my-index-',
          dimension: 128,
        });
      }).toThrow(/Vector index name must begin and end with a letter or number/);
    });

    test('accepts valid index names', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      const validNames = ['my-index', 'my.index', 'my-index-123', 'abc123', 'a'.repeat(63)];

      validNames.forEach((name, index) => {
        expect(() => {
          new VectorIndex(stack, `MyIndex${index}`, {
            vectorBucket: bucket,
            vectorIndexName: name,
            dimension: 128,
          });
        }).not.toThrow();
      });
    });
  });

  describe('Dimension validation', () => {
    test('fails if dimension is less than 1', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          dimension: 0,
        });
      }).toThrow(/Vector index dimension must be between 1 and 4096/);
    });

    test('fails if dimension is greater than 4096', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          dimension: 4097,
        });
      }).toThrow(/Vector index dimension must be between 1 and 4096/);
    });

    test('accepts valid dimensions', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      const validDimensions = [1, 128, 1024, 4096];

      validDimensions.forEach((dimension, index) => {
        expect(() => {
          new VectorIndex(stack, `MyIndex${index}`, {
            vectorBucket: bucket,
            dimension,
          });
        }).not.toThrow();
      });
    });
  });

  describe('Metadata configuration validation', () => {
    test('fails if metadata configuration has no keys', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          dimension: 128,
          nonFilterableMetadataKeys: [],
        });
      }).toThrow(/Metadata configuration must contain at least 1 key/);
    });

    test('fails if metadata configuration has more than 10 keys', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          dimension: 128,
          nonFilterableMetadataKeys: Array(11).fill('key'),
        });
      }).toThrow(/Metadata configuration must contain at most 10 keys/);
    });

    test('fails if metadata key is too long', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');

      expect(() => {
        new VectorIndex(stack, 'MyIndex', {
          vectorBucket: bucket,
          dimension: 128,
          nonFilterableMetadataKeys: ['a'.repeat(64)],
        });
      }).toThrow(/must be less than or equal to 63 characters/);
    });

    test('accepts valid metadata configuration', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
        nonFilterableMetadataKeys: ['key1', 'key2', 'key3'],
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        MetadataConfiguration: {
          NonFilterableMetadataKeys: ['key1', 'key2', 'key3'],
        },
      });
    });

    test('accepts metadata configuration with 10 keys', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      const keys = Array.from({ length: 10 }, (_, i) => `key${i + 1}`);
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
        nonFilterableMetadataKeys: keys,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        MetadataConfiguration: {
          NonFilterableMetadataKeys: keys,
        },
      });
    });
  });

  describe('Grant methods', () => {
    test('grant grants permissions to IAM role', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      const index = new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
      });
      const role = new iam.Role(stack, 'MyRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      index.grant(role, 's3vectors:GetIndex', 's3vectors:QueryVectors');

      // Verify the policy exists and has the correct structure
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

      // Verify the actions are present (check the actual policy document)
      const policies = Template.fromStack(stack).findResources('AWS::IAM::Policy');
      const policy = Object.values(policies)[0];
      const statements = policy.Properties.PolicyDocument.Statement;
      const indexStatement = statements.find((s: any) => {
        const actions = Array.isArray(s.Action) ? s.Action : [s.Action];
        return actions.some((a: string) => a === 's3vectors:GetIndex' || a === 's3vectors:QueryVectors');
      });
      expect(indexStatement).toBeDefined();
      expect(indexStatement.Resource).toBeDefined();
    });

    test('grant can be called multiple times', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      const index = new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
      });
      const role = new iam.Role(stack, 'MyRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      index.grant(role, 's3vectors:GetIndex');
      index.grant(role, 's3vectors:QueryVectors');

      // Both grants should be in the policy
      const policies = Template.fromStack(stack).findResources('AWS::IAM::Policy');
      const policy = Object.values(policies)[0];
      const statements = policy.Properties.PolicyDocument.Statement;
      const actions = statements.flatMap((s: any) => Array.isArray(s.Action) ? s.Action : [s.Action]);
      expect(actions).toContain('s3vectors:GetIndex');
      expect(actions).toContain('s3vectors:QueryVectors');
    });
  });

  describe('Static import methods', () => {
    test('fromVectorIndexArn creates imported index', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      // Use a concrete ARN for testing (the validation requires concrete values, not tokens)
      const indexArn = 'arn:aws:s3vectors:us-east-1:123456789012:bucket/my-bucket/index/my-index';
      const index = VectorIndex.fromVectorIndexArn(stack, 'MyIndex', indexArn);

      expect(index.vectorIndexArn).toBe(indexArn);
      expect(index.vectorIndexName).toBe('my-index');
    });

    test('fromVectorIndexName creates imported index', () => {
      // Create a stack with concrete region and account to avoid token issues
      const stack = new Stack(undefined, 'TestStack', {
        env: { account: '123456789012', region: 'us-east-1' },
      });
      const index = VectorIndex.fromVectorIndexName(stack, 'MyIndex', 'my-bucket', 'my-index');

      expect(index.vectorIndexName).toBe('my-index');
      // ARN will be concrete since we provided concrete env
      expect(index.vectorIndexArn).toContain('my-bucket');
      expect(index.vectorIndexArn).toContain('my-index');
    });

    test('fromVectorIndexAttributes creates imported index', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      // Use a concrete ARN for testing (the validation requires concrete values, not tokens)
      const indexArn = 'arn:aws:s3vectors:us-east-1:123456789012:bucket/my-bucket/index/my-index';
      const index = VectorIndex.fromVectorIndexAttributes(stack, 'MyIndex', {
        vectorIndexArn: indexArn,
        creationTime: '2024-01-01T00:00:00Z',
      });

      expect(index.vectorIndexArn).toBe(indexArn);
      expect(index.vectorIndexName).toBe('my-index');
      expect(index.creationTime).toBe('2024-01-01T00:00:00Z');
    });

    test('fromVectorIndexAttributes with encryption key', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const key = new kms.Key(stack, 'MyKey');
      // Use a concrete ARN for testing (the validation requires concrete values, not tokens)
      const indexArn = 'arn:aws:s3vectors:us-east-1:123456789012:bucket/my-bucket/index/my-index';
      const index = VectorIndex.fromVectorIndexAttributes(stack, 'MyIndex', {
        vectorIndexArn: indexArn,
        encryptionKey: key,
      });

      expect(index.encryptionKey).toBe(key);
    });

    test('fromVectorIndexAttributes throws error if ARN format is invalid', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      expect(() => {
        VectorIndex.fromVectorIndexAttributes(stack, 'MyIndex', {
          vectorIndexArn: 'invalid-arn',
        });
      }).toThrow(/ARNs must start with "arn:"/);
    });

    test('fromVectorIndexAttributes throws error if ARN resource part is missing', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });

      expect(() => {
        VectorIndex.fromVectorIndexAttributes(stack, 'MyIndex', {
          vectorIndexArn: 'arn:aws:s3vectors:us-east-1:123456789012:',
        });
      }).toThrow(/The `resource` component/);
    });
  });

  describe('Attributes', () => {
    test('index exposes correct attributes', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      const index = new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
      });

      expect(index.vectorIndexArn).toBeDefined();
      expect(index.vectorIndexName).toBeDefined();
      // Creation time is only available after deployment, so it may be undefined at synth time
      expect(index.creationTime).toBeDefined();
    });

    test('index name is set when provided', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        vectorIndexName: 'my-custom-index',
        dimension: 128,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        IndexName: 'my-custom-index',
      });
    });
  });

  describe('Data type and distance metric', () => {
    test('default data type is FLOAT_32', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
      });
      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        DataType: 'float32',
      });
    });

    test('default distance metric is COSINE', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
      });
      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        DistanceMetric: 'cosine',
      });
    });

    test('can specify EUCLIDEAN distance metric', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
        distanceMetric: VectorIndexDistanceMetric.EUCLIDEAN,
      });
      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        DistanceMetric: 'euclidean',
      });
    });
  });

  describe('Edge cases', () => {
    test('multiple indexes in same bucket', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      const index1 = new VectorIndex(stack, 'Index1', {
        vectorBucket: bucket,
        dimension: 128,
      });
      const index2 = new VectorIndex(stack, 'Index2', {
        vectorBucket: bucket,
        dimension: 256,
      });

      expect(index1.vectorBucket).toBe(bucket);
      expect(index2.vectorBucket).toBe(bucket);
      Template.fromStack(stack).resourceCountIs('AWS::S3Vectors::Index', 2);
    });

    test('index can reference bucket ARN correctly', () => {
      const app = new App();
      Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new Stack(app, 'TestStack', {
        env: {
          account: '123456789012',
          region: 'us-east-1',
        },
      });
      const bucket = new VectorBucket(stack, 'MyBucket');
      new VectorIndex(stack, 'MyIndex', {
        vectorBucket: bucket,
        dimension: 128,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3Vectors::Index', {
        VectorBucketArn: {
          'Fn::GetAtt': [
            'MyBucketF68F3FF0',
            'VectorBucketArn',
          ],
        },
      });
    });
  });
});
