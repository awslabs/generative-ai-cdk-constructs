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

import { Arn, ArnFormat, IResource, Resource, Stack, ValidationError, Fn } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3vectors from 'aws-cdk-lib/aws-s3vectors';
import { Construct } from 'constructs';
import { throwIfInvalid, validateFieldPattern, validateStringFieldLength } from './validation-helpers';
import { IVectorBucket } from './vector-bucket';

/******************************************************************************
 *                                ENUMS
 *****************************************************************************/
/**
 * The data type of the vectors to be inserted into the vector index.
 */
export enum VectorIndexDataType {
  /**
   * 32-bit floating-point numbers
   */
  FLOAT_32 = 'float32',
}

/**
 * The distance metric to be used for similarity search
 */
export enum VectorIndexDistanceMetric {
  /**
   * Measures the straight-line distance between two points in multi-dimensional space.
   * Lower values indicate greater similarity.
   */
  EUCLIDEAN = 'euclidean',
  /**
   * Measures the cosine of the angle between two vectors.
   */
  COSINE = 'cosine',
}

/**
 * What kind of encryption to apply to this index.
 * By default, if you don't specify, all new vectors in Amazon S3 vector indexes
 * use server-side encryption with Amazon S3 managed keys (SSE-S3), specifically AES256.
 */
export enum VectorIndexEncryption {
  /**
   * Encryption with a master key managed by S3.
   */
  S3_MANAGED = 'AES256',
  /**
   * Encryption with a KMS key managed by the user.
   */
  KMS = 'aws:kms',
}

/******************************************************************************
 *                                Interface
 *****************************************************************************/
/**
 * Interface for S3 vector bucket resources
 */
export interface IVectorIndex extends IResource {
  /**
   * The ARN of the vector index
   * @attribute
   */
  readonly vectorIndexArn: string;
  /**
   * The name of the vector index
   * @attribute
   */
  readonly vectorIndexName: string;
  /**
   * The timestamp when the vector index was created, in ISO 8601 format.
   * @attribute
   */
  readonly creationTime?: string;
  /**
   * Optional KMS encryption key associated with this vector index.
   */
  readonly encryptionKey?: kms.IKey;
  /**
   * Grants IAM actions to the IAM Principal
   */
  grant(grantee: iam.IGrantable, ...actions: string[]): iam.Grant;
}

/******************************************************************************
 *                        ABSTRACT BASE CLASS
 *****************************************************************************/
/**
 * Abstract base class for a S3 vector index.
 * Contains methods and attributes valid for S3 vector indexes either created with CDK or imported.
 */
export abstract class VectorIndexBase extends Resource implements IVectorIndex {
  /**
   * The ARN of the vector index
   */
  public abstract readonly vectorIndexArn: string;
  /**
   * The name of the vector index
   */
  public abstract readonly vectorIndexName: string;
  /**
   * The timestamp when the vector index was created, in ISO 8601 format.
   */
  public abstract readonly creationTime?: string;
  /**
   * Optional KMS encryption key associated with this vector index.
   */
  public abstract readonly encryptionKey?: kms.IKey;
  /**
   * Grants IAM actions to the IAM Principal
   * @param grantee - The IAM principal to grant permissions to
   * @param actions - The actions to grant
   * @returns An IAM Grant object representing the granted permissions
   */
  public grant(grantee: iam.IGrantable, ...actions: string[]): iam.Grant {
    return iam.Grant.addToPrincipal({
      grantee: grantee,
      resourceArns: [this.vectorIndexArn],
      actions: actions,
    });
  }
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a Aurora DSQL cluster resource
 */
export interface VectorIndexProps {
  /**
   * The name of the vector index
   *
   * @default - Assigned by CloudFormation (recommended).
   */
  readonly vectorIndexName?: string;
  /**
   * The vector bucket to use for the vector index
   */
  readonly vectorBucket: IVectorBucket;
  /**
   * The data type of the vectors to be inserted into the vector index
   * @default - FLOAT_32
   */
  readonly dataType?: VectorIndexDataType;
  /**
   * A dimension is the number of values in a vector. A larger dimension needs more storage.
   *
   * All vectors added to the index must have exactly this number of values.
   * Must be an integer between 1 and 4096.
   */
  readonly dimension: number;
  /**
   * The distance metric to be used for similarity search
   * @default - COSINE
   */
  readonly distanceMetric?: VectorIndexDistanceMetric;
  /**
   * The kind of server-side encryption to apply to this index.
   *
   * If you choose KMS, you can specify a KMS key via `encryptionKey`. If
   * encryption key is not specified, a key will automatically be created.
   *
   * @default - `KMS` if `encryptionKey` is specified, or `S3_MANAGED` otherwise.
   */
  readonly encryption?: VectorIndexEncryption;
  /**
   * External KMS key to use for index encryption.
   *
   * The `encryption` property must be either not specified or set to `KMS`.
   * An error will be emitted if `encryption` is set to `S3_MANAGED`.
   *
   * @default - If `encryption` is set to `KMS` and this property is undefined,
   * a new KMS key will be created and associated with this index.
   */
  readonly encryptionKey?: kms.IKey;
  /**
   * Non-filterable metadata keys allow you to enrich vectors with additional context during storage and retrieval.
   * Unlike default metadata keys, these keys can't be used as query filters.
   * Non-filterable metadata keys can be retrieved but can't be searched, queried, or filtered.
   * You can access non-filterable metadata keys of your vectors after finding the vectors.
   * @default - All metadata attached to vectors is filterable and can be used as filters in a similarity query
   */
  readonly nonFilterableMetadataKeys?: string[];
}

/******************************************************************************
 *                      ATTRS FOR IMPORTED CONSTRUCT
 *****************************************************************************/
/**
 * Attributes for specifying an imported S3 vector bucket.
 */
export interface VectorIndexAttributes {
  /**
   * The ARN of the vector index
   */
  readonly vectorIndexArn: string;
  /**
   * The timestamp when the vector index was created, in ISO 8601 format.
   * @default undefined - No creation time is provided
   */
  readonly creationTime?: string;
  /**
   * Optional KMS encryption key associated with this vector index.
   */
  readonly encryptionKey?: kms.IKey;
}
/******************************************************************************
 *                                Class
 *****************************************************************************/
/**
 * S3 vector index resource for AWS S3 vector indexes.
 * You can use this resource to create, modify, and manage vector indexes.
 * @see https://docs.aws.amazon.com/s3vectors/latest/userguide/what-is-s3vectors.html
 * @resource AWS::S3Vectors::Index
 */
export class VectorIndex extends VectorIndexBase {
  /**
   * Creates a VectorIndex construct that represents an external vector index by ARN.
   *
   * @param scope The parent creating construct (usually `this`).
   * @param id The construct's name.
   * @param vectorIndexArn The ARN of the vector index.
   * @returns A VectorIndex construct.
   */
  public static fromVectorIndexArn(scope: Construct, id: string, vectorIndexArn: string): IVectorIndex {
    return VectorIndex.fromVectorIndexAttributes(scope, id, { vectorIndexArn });
  }

  /**
   * Creates a VectorIndex construct that represents an external vector index by name.
   * Note: This method requires the bucket name because the ARN format includes both bucket and index.
   *
   * @param scope The parent creating construct (usually `this`).
   * @param id The construct's name.
   * @param vectorBucketName The name of the vector bucket containing the index.
   * @param vectorIndexName The name of the vector index.
   * @returns A VectorIndex construct.
   */
  public static fromVectorIndexName(scope: Construct, id: string, vectorBucketName: string, vectorIndexName: string): IVectorIndex {
    const stack = Stack.of(scope);
    // ARN format: arn:aws:s3vectors:region:account:bucket/{bucket-name}/index/{index-name}
    const vectorIndexArn = stack.formatArn({
      service: 's3vectors',
      resource: `bucket/${vectorBucketName}/index/${vectorIndexName}`,
      arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
    });

    return VectorIndex.fromVectorIndexAttributes(scope, id, { vectorIndexArn });
  }

  public static fromVectorIndexAttributes(scope: Construct, id: string, attrs: VectorIndexAttributes): IVectorIndex {
    // Parse ARN: format is arn:aws:s3vectors:region:account:bucket/{bucket-name}/index/{index-name}
    const arnComponents = Arn.split(attrs.vectorIndexArn, ArnFormat.SLASH_RESOURCE_NAME);
    // Combine resource and resourceName to get the full resource part: "bucket/{bucket-name}/index/{index-name}"
    const resourcePart = arnComponents.resource && arnComponents.resourceName
      ? `${arnComponents.resource}/${arnComponents.resourceName}`
      : arnComponents.resourceName;

    if (!resourcePart) {
      throw new ValidationError('Vector index ARN resource part is required', scope);
    }

    // Extract index name from resource part: "bucket/{bucket-name}/index/{index-name}"
    const indexMatch = resourcePart.match(/^bucket\/[^/]+\/index\/(.+)$/);
    if (!indexMatch || !indexMatch[1]) {
      throw new ValidationError(`Invalid vector index ARN format. Expected format: arn:Aws.PARTITION:s3vectors:region:account:bucket/{bucket-name}/index/{index-name}, got: ${attrs.vectorIndexArn}`, scope);
    }

    const vectorIndexName = indexMatch[1];

    class Import extends VectorIndexBase {
      public readonly vectorIndexArn = attrs.vectorIndexArn;
      public readonly vectorIndexName = vectorIndexName;
      public readonly creationTime = attrs.creationTime;
      public readonly encryptionKey = attrs.encryptionKey;
    }
    return new Import(scope, id);
  }

  // ------------------------------------------------------
  // Attributes
  // ------------------------------------------------------
  public readonly vectorIndexArn: string;
  public readonly vectorIndexName: string;
  public readonly vectorBucket: IVectorBucket;
  /**
   * The timestamp when the vector bucket was created, in ISO 8601 format.
   * @attribute
   */
  public readonly creationTime?: string;
  public readonly dataType: VectorIndexDataType;
  public readonly dimension: number;
  public readonly distanceMetric: VectorIndexDistanceMetric;
  public readonly encryption: VectorIndexEncryption;
  public readonly encryptionKey?: kms.IKey;

  // ------------------------------------------------------
  // Internal Only
  // ------------------------------------------------------
  private readonly __resource: s3vectors.CfnIndex;

  // ------------------------------------------------------
  // CONSTRUCTOR
  // ------------------------------------------------------
  constructor(scope: Construct, id: string, props: VectorIndexProps) {
    super(scope, id, { physicalName: props.vectorIndexName });

    // ------------------------------------------------------
    // Set properties and defaults
    // ------------------------------------------------------
    const { encryptionConfiguration, encryptionKey } = this._parseEncryption(props);
    this.encryptionKey = encryptionKey;
    this.dataType = props.dataType ?? VectorIndexDataType.FLOAT_32;
    this.dimension = props.dimension;
    this.distanceMetric = props.distanceMetric ?? VectorIndexDistanceMetric.COSINE;
    this.encryption = props.encryption ?? VectorIndexEncryption.KMS;
    this.encryptionKey = props.encryptionKey;
    this.vectorBucket = props.vectorBucket;
    const nonFilterableMetadataKeys = props.nonFilterableMetadataKeys ? { nonFilterableMetadataKeys: props.nonFilterableMetadataKeys }
      : undefined;

    // ------------------------------------------------------
    // Validation
    // ------------------------------------------------------
    throwIfInvalid((name) => this._validateVectorIndexName(name), this.physicalName);
    throwIfInvalid((dimension) => this._validateVectorIndexDimension(dimension), this.dimension);
    if (props.nonFilterableMetadataKeys) {
      throwIfInvalid((keys) => this._validateMetadataConfiguration(keys), props.nonFilterableMetadataKeys);
    }

    // ------------------------------------------------------
    // CFN Props - With Lazy support
    // ------------------------------------------------------
    const cfnProps: s3vectors.CfnIndexProps = {
      indexName: this.physicalName,
      vectorBucketArn: props.vectorBucket.vectorBucketArn,
      dataType: this.dataType,
      dimension: this.dimension,
      distanceMetric: this.distanceMetric,
      encryptionConfiguration: encryptionConfiguration,
      metadataConfiguration: nonFilterableMetadataKeys,
    };

    // ------------------------------------------------------
    // Create the resource
    // ------------------------------------------------------
    this.__resource = new s3vectors.CfnIndex(this, 'Resource', cfnProps);
    this.vectorIndexArn = this.__resource.attrIndexArn;
    // Extract index name from ARN to get the actual index name (not the ref which can be very long)
    // ARN format: arn:aws:s3vectors:region:account:bucket/bucket-name/index/index-name
    // Split by '/' and select index 3 to get the index name
    this.vectorIndexName = Fn.select(3, Fn.split('/', this.__resource.attrIndexArn));
    this.creationTime = this.__resource.attrCreationTime;
  }

  // ------------------------------------------------------
  // Validators
  // ------------------------------------------------------
  /**
   * Validates the vector index name
   * @param name The vector index name to validate
   * @returns An array of validation errors
   * @see https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-indexes.html?icmpid=docs_amazons3_console#s3-vectors-indexes-naming
   */
  private _validateVectorIndexName(name: string): string[] {
    let errors: string[] = [];

    // Pattern: lowercase letters, numbers, dot, hyphen allowed
    const validIndexNamePattern = /^[a-z0-9.-]+$/;
    errors.push(...validateFieldPattern(name, 'Vector index name', validIndexNamePattern));

    // Must begin and end with a letter or number
    const validEdgePattern = /^[a-z0-9].*[a-z0-9]$/;
    errors.push(...validateFieldPattern(name, 'Vector index name', validEdgePattern, 'Vector index name must begin and end with a letter or number'));

    // Validate index name length
    errors.push(...validateStringFieldLength({
      value: name,
      fieldName: 'Vector index name',
      minLength: 3,
      maxLength: 63,
    }));

    return errors;
  }

  /**
   * Validate the vector index dimension
   * @param dimension The vector index dimension to validate
   * @returns An array of validation errors
   */
  private _validateVectorIndexDimension(dimension: number): string[] {
    let errors: string[] = [];
    if (dimension < 1 || dimension > 4096) {
      errors.push('Vector index dimension must be between 1 and 4096');
    }
    return errors;
  }

  /**
   * Validates the metadata configuration (non-filterable metadata keys)
   * @param metadataConfiguration The array of metadata keys to validate
   * @returns An array of validation errors
   */
  private _validateMetadataConfiguration(metadataConfiguration: string[]): string[] {
    let errors: string[] = [];

    // Validate array length: must be between 1 and 10
    if (metadataConfiguration.length < 1) {
      errors.push('Metadata configuration must contain at least 1 key');
    }
    if (metadataConfiguration.length > 10) {
      errors.push('Metadata configuration must contain at most 10 keys');
    }

    // Validate each key: must be 1 to 63 characters long
    metadataConfiguration.forEach((key, index) => {
      errors.push(...validateStringFieldLength({
        value: key,
        fieldName: `Metadata configuration key at index ${index}`,
        minLength: 1,
        maxLength: 63,
      }));
    });

    return errors;
  }

  /**
   * Grants the S3 Vectors service principal permission to use the KMS key.
   * This is required for the service to maintain and optimize indexes in background operations.
   * @see https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-data-encryption.html
   */
  private _grantServicePrincipalKeyAccess(key: kms.IKey): void {
    const stack = Stack.of(this);
    const servicePrincipal = new iam.ServicePrincipal('indexing.s3vectors.amazonaws.com');

    // Grant the service principal kms:Decrypt permission with conditions
    key.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'AllowS3VectorsServicePrincipal',
      effect: iam.Effect.ALLOW,
      principals: [servicePrincipal],
      actions: ['kms:Decrypt'],
      resources: ['*'],
      conditions: {
        ArnLike: {
          'aws:SourceArn': stack.formatArn({
            service: 's3vectors',
            resource: 'bucket',
            resourceName: '*',
            arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
          }),
        },
        StringEquals: {
          'aws:SourceAccount': stack.account,
        },
        ForAnyValue: {
          StringEquals: {
            'kms:EncryptionContextKeys': ['aws:s3vectors:arn', 'aws:s3vectors:resource-id'],
          },
        },
      },
    }));
  }

  private _parseEncryption(props: VectorIndexProps): {
    encryptionConfiguration?: s3vectors.CfnIndex.EncryptionConfigurationProperty;
    encryptionKey?: kms.IKey;
  } {
    // Server-side encryption with Amazon S3 managed keys (SSE-S3) is used by default when encryption type is not specified.
    const encryptionType = props.encryption ?? VectorIndexEncryption.S3_MANAGED;
    let encryptionKey = props.encryptionKey;

    // KMS
    if (encryptionType === VectorIndexEncryption.KMS) {
      encryptionKey = props.encryptionKey || new kms.Key(this, 'Key', {
        description: `Created by ${this.node.path}`,
        enableKeyRotation: true,
      });

      // Grant the S3 Vectors service principal permission to use the key
      this._grantServicePrincipalKeyAccess(encryptionKey);

      return {
        encryptionConfiguration: {
          sseType: VectorIndexEncryption.KMS,
          kmsKeyArn: encryptionKey.keyArn,
        },
        encryptionKey: encryptionKey,
      };
    }

    // S3_MANAGED
    if (encryptionType === VectorIndexEncryption.S3_MANAGED) {
      if (encryptionKey) {
        throw new Error('Encryption key cannot be specified for S3_MANAGED encryption');
      }

      return {
        encryptionConfiguration: {
          sseType: VectorIndexEncryption.S3_MANAGED,
        },
      };
    }

    // Invalid encryption type
    return {
      encryptionConfiguration: undefined,
      encryptionKey: undefined,
    };
  }
}
