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

import { IResource, Resource, Arn, ArnFormat, RemovalPolicy, ResourceProps, ValidationError, CustomResource, Tags, Stack, Fn } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import { CfnVectorBucket, CfnVectorBucketProps } from 'aws-cdk-lib/aws-s3vectors';
import { Construct } from 'constructs';
// Internal libs
import { AutoDeleteProvider } from './auto-delete-provider';
import * as perms from './perms';
import { validateStringFieldLength, validateFieldPattern, throwIfInvalid } from './validation-helpers';
import { VectorBucketPolicy } from './vector-bucket-policy';

/***
 * Constants
 */
const AUTO_DELETE_OBJECTS_RESOURCE_TYPE = 'Custom::S3VectorsAutoDeleteObjects';
const AUTO_DELETE_OBJECTS_TAG = 'aws:cdk:auto-delete-objects';

/******************************************************************************
 *                                ENUMS
 *****************************************************************************/
/**
 * What kind of server-side encryption to apply to this bucket
 */
export enum VectorBucketEncryption {
  /**
   * Server-side encryption with a master key managed by S3.
   */
  S3_MANAGED = 'AES256',

  /**
   * Server-side encryption with a KMS key managed by the user.
   * If `encryptionKey` is specified, this key will be used, otherwise, one will be defined.
   */
  KMS = 'aws:kms',
}

/******************************************************************************
 *                                Interface
 *****************************************************************************/
/**
 * Interface for S3 vector bucket resources
 */
export interface IVectorBucket extends IResource {
  /**
   * The ARN of the vector bucket
   * @attribute
   */
  readonly vectorBucketArn: string;
  /**
   * The timestamp when the vector bucket was created, in ISO 8601 format.
   * @attribute
   */
  readonly creationTime?: string;
  /**
   * The name of the vector bucket
   *
   * @attribute
   */
  readonly vectorBucketName: string;
  /**
   * Optional KMS encryption key associated with this vector bucket.
   */
  readonly encryptionKey?: kms.IKey;
  /**
   * The resource policy associated with this bucket.
   *
   * If `autoCreatePolicy` is true, a `BucketPolicy` will be created upon the
   * first call to addToResourcePolicy(s).
   */
  policy?: VectorBucketPolicy;
  /**
   * Grants IAM actions to the IAM Principal
   * @param grantee - The IAM principal to grant permissions to
   * @param indexIds - Restrict the permission to a certain set of indexes (default '*'). Parameter type is `any` but `string[]` should be passed in.
   * @returns An IAM Grant object representing the granted permissions
   */
  grantRead(grantee: iam.IGrantable, indexIds?: any): iam.Grant;
  /**
   * Grants IAM actions to the IAM Principal
   * @param grantee - The IAM principal to grant permissions to
   * @param indexIds - Restrict the permission to a certain set of indexes (default '*'). Parameter type is `any` but `string[]` should be passed in.
   * @returns An IAM Grant object representing the granted permissions
   */
  grantWrite(grantee: iam.IGrantable, indexIds?: any): iam.Grant;
  /**
   * Grants IAM actions to the IAM Principal to delete the vector bucket and indexes
   * @param grantee - The IAM principal to grant permissions to
   * @param indexIds - Restrict the permission to a certain set of indexes (default '*'). Parameter type is `any` but `string[]` should be passed in.
   * @returns An IAM Grant object representing the granted permissions
   */
  grantDelete(grantee: iam.IGrantable, indexIds?: any): iam.Grant;
  /**
   * Adds a statement to the resource policy for a principal (i.e.
   * account/role/service) to perform actions on this bucket and/or its
   * contents. Use `bucketArn` to obtain ARNs for
   * this bucket.
   *
   * Note that the policy statement may or may not be added to the policy.
   * For example, when an `IBucket` is created from an existing bucket,
   * it's not possible to tell whether the bucket already has a policy
   * attached, let alone to re-use that policy to add more statements to it.
   * So it's safest to do nothing in these cases.
   *
   * @param permission the policy statement to be added to the bucket's
   * policy.
   * @returns metadata about the execution of this method. If the policy
   * was not added, the value of `statementAdded` will be `false`. You
   * should always check this value to make sure that the operation was
   * actually carried out. Otherwise, synthesis and deploy will terminate
   * silently, which may be confusing.
   */
  addToResourcePolicy(permission: iam.PolicyStatement): iam.AddToResourcePolicyResult;
}

/******************************************************************************
 *                        ABSTRACT BASE CLASS
 *****************************************************************************/
/**
 * Abstract base class for a S3 vector bucket.
 * Contains methods and attributes valid for S3 vector buckets either created with CDK or imported.
 */
export abstract class VectorBucketBase extends Resource implements IVectorBucket {
  /**
   * The ARN of the vector bucket
   */
  public abstract readonly vectorBucketArn: string;
  /**
   * The timestamp when the vector bucket was created, in ISO 8601 format.
   */
  public abstract readonly creationTime?: string;
  /**
   * Optional KMS encryption key associated with this vector bucket.
   */
  public abstract readonly encryptionKey?: kms.IKey;
  /**
   * The name of the vector bucket
   */
  public abstract readonly vectorBucketName: string;

  /**
   * The resource policy associated with this bucket.
   *
   * If `autoCreatePolicy` is true, a `BucketPolicy` will be created upon the
   * first call to addToResourcePolicy(s).
   */
  public abstract policy?: VectorBucketPolicy;

  /**
   * Indicates if a bucket resource policy should automatically created upon
   * the first call to `addToResourcePolicy`.
   */
  protected abstract autoCreatePolicy: boolean;

  constructor(scope: Construct, id: string, props: ResourceProps = {}) {
    super(scope, id, props);

    this.node.addValidation({ validate: () => this.policy?.document.validateForResourcePolicy() ?? [] });
  }

  /**
   * Grants IAM actions to the IAM Principal to read from the vector bucket and indexes
   * @param grantee - The IAM principal to grant permissions to
   * @param indexIds - Restrict the permission to a certain set of indexes (default '*'). Parameter type is `any` but `string[]` should be passed in.
   * @returns An IAM Grant object representing the granted permissions
   */
  public grantRead(grantee: iam.IGrantable, indexIds: any = '*'): iam.Grant {
    // Combine the read and list actions for the bucket, removing duplicates since some actions are duplicated
    const bucketActions = [...new Set([...perms.VECTOR_BUCKET_READ_ACTIONS, ...perms.VECTOR_BUCKET_LIST_ACTIONS])];
    const indexActions = [...new Set(
      [
        ...perms.VECTOR_INDEX_READ_ACTIONS,
        ...perms.VECTOR_INDEX_LIST_ACTIONS,
        ...perms.VECTOR_READ_ACTIONS,
        ...perms.VECTOR_LIST_ACTIONS,
        ...perms.VECTOR_QUERY_ACTIONS,
        ...perms.VECTOR_LIST_ACTIONS,
      ])];

    return this._internalGrant(
      grantee,
      bucketActions,
      indexActions,
      perms.KEY_READ_ACTIONS,
      indexIds,
    );
  }

  /**
   * Grants IAM actions to the IAM Principal to write to the vector bucket and indexes
   * @param grantee - The IAM principal to grant permissions to
   * @param indexIds - Restrict the permission to a certain set of indexes (default '*'). Parameter type is `any` but `string[]` should be passed in.
   * @returns An IAM Grant object representing the granted permissions
   */
  public grantWrite(grantee: iam.IGrantable, indexIds: any = '*'): iam.Grant {
    // Combine the write and create actions for the bucket, removing duplicates since some actions are duplicated
    const bucketActions = [...new Set([...perms.VECTOR_BUCKET_WRITE_ACTIONS])];
    const indexActions = [...new Set([...perms.VECTOR_INDEX_WRITE_ACTIONS, ...perms.VECTOR_WRITE_ACTIONS])];

    return this._internalGrant(
      grantee,
      bucketActions,
      indexActions,
      perms.KEY_WRITE_ACTIONS,
      indexIds,
    );
  }

  /**
   * Grants IAM actions to the IAM Principal to delete the vector bucket and indexes
   * @param grantee - The IAM principal to grant permissions to
   * @param indexIds - Restrict the permission to a certain set of indexes (default '*'). Parameter type is `any` but `string[]` should be passed in.
   * @returns An IAM Grant object representing the granted permissions
   */
  public grantDelete(grantee: iam.IGrantable, indexIds: any = '*'): iam.Grant {
    // Combine the delete and delete actions for the indexes, removing duplicates since some actions are duplicated
    const indexActions = [...new Set([...perms.VECTOR_INDEX_DELETE_ACTIONS, ...perms.VECTOR_DELETE_ACTIONS])];

    return this._internalGrant(
      grantee,
      perms.VECTOR_BUCKET_DELETE_ACTIONS,
      indexActions,
      [],
      indexIds,
    );
  }

  /**
   * Adds a statement to the resource policy for a principal (i.e.
   * account/role/service) to perform actions on this bucket and/or its
   * contents. Use `bucketArn` to obtain ARNs for
   * this bucket or objects.
   *
   * Note that the policy statement may or may not be added to the policy.
   * For example, when an `IBucket` is created from an existing bucket,
   * it's not possible to tell whether the bucket already has a policy
   * attached, let alone to re-use that policy to add more statements to it.
   * So it's safest to do nothing in these cases.
   *
   * @param permission the policy statement to be added to the bucket's
   * policy.
   * @returns metadata about the execution of this method. If the policy
   * was not added, the value of `statementAdded` will be `false`. You
   * should always check this value to make sure that the operation was
   * actually carried out. Otherwise, synthesis and deploy will terminate
   * silently, which may be confusing.
   */
  public addToResourcePolicy(permission: iam.PolicyStatement): iam.AddToResourcePolicyResult {
    if (!this.policy && this.autoCreatePolicy) {
      this.policy = new VectorBucketPolicy(this, 'Policy', { bucket: this });
    }

    if (this.policy) {
      this.policy.document.addStatements(permission);
      return { statementAdded: true, policyDependable: this.policy };
    }

    return { statementAdded: false };
  }

  private _internalGrant(
    grantee: iam.IGrantable,
    bucketActions: string[],
    indexActions: string[],
    keyActions: string[],
    indexIds?: string[],
  ): iam.Grant {
    // If the bucket has actions, add them
    let bucketResult: iam.Grant | undefined;
    if (bucketActions.length > 0) {
      bucketResult = iam.Grant.addToPrincipalOrResource({
        actions: bucketActions,
        grantee: grantee,
        resourceArns: [this.vectorBucketArn],
        resource: this,
      });
    }

    // If indexes are provided, add the actions to the indexes
    // If indexIds is '*', add the actions to all indexes
    let indexResult: iam.Grant | undefined;
    if (indexActions.length > 0) {
      if ((typeof indexIds === 'string') && indexIds === '*') {
        const indexArn = `${this.vectorBucketArn}/index/*`;
        indexResult = iam.Grant.addToPrincipalOrResource({
          actions: indexActions,
          grantee: grantee,
          resourceArns: [indexArn],
          resource: this,
        });
      } else if (Array.isArray(indexIds)) {
        for (const indexId of indexIds) {
          const indexArn = `${this.vectorBucketArn}/index/${indexId}`;

          indexResult = iam.Grant.addToPrincipalOrResource({
            actions: indexActions,
            grantee: grantee,
            resourceArns: [indexArn],
            resource: this,
          });
        }
      } else {
        throw new ValidationError('indexIds must be a string (\'*\') or an array of strings', this);
      }
    }

    if (keyActions.length > 0 && this.encryptionKey) {
      this.encryptionKey?.grant(grantee, ...keyActions);
    }

    return bucketResult ?? indexResult ?? iam.Grant.drop(grantee, 'No actions to grant');
  }
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a Aurora DSQL cluster resource
 */
export interface VectorBucketProps {
  /**
   * The kind of server-side encryption to apply to this bucket.
   *
   * If you choose KMS, you can specify a KMS key via `encryptionKey`. If
   * encryption key is not specified, a key will automatically be created.
   *
   * @default - `KMS` if `encryptionKey` is specified, or `S3_MANAGED` otherwise.
   */
  readonly encryption?: VectorBucketEncryption;
  /**
   * External KMS key to use for bucket encryption.
   *
   * The `encryption` property must be either not specified or set to `KMS`.
   * An error will be emitted if `encryption` is set to `S3_MANAGED`.
   *
   * @default - If `encryption` is set to `KMS` and this property is undefined,
   * a new KMS key will be created and associated with this bucket.
   */
  readonly encryptionKey?: kms.IKey;
  /**
   * Physical name of this bucket.
   *
   * @default - Assigned by CloudFormation (recommended).
   */
  readonly vectorBucketName?: string;
  /**
   * Whether all objects should be automatically deleted when the bucket is
   * removed from the stack or when the stack is deleted.
   *
   * Requires the `removalPolicy` to be set to `RemovalPolicy.DESTROY`.
   *
   * Setting `autoDeleteObjects` to true on a bucket will add `s3:PutBucketPolicy` to the
   * bucket policy. This is because during bucket deletion, the custom resource provider
   * needs to update the bucket policy by adding a deny policy for `s3:PutObject` to
   * prevent race conditions with external bucket writers.
   *
   * @default false
   */
  readonly autoDeleteObjects?: boolean;
  /**
   * Policy to apply when the bucket is removed from this stack.
   *
   * @default - - The bucket will be orphaned.
   */
  readonly removalPolicy?: RemovalPolicy;
}

/******************************************************************************
 *                      ATTRS FOR IMPORTED CONSTRUCT
 *****************************************************************************/
/**
 * Attributes for specifying an imported S3 vector bucket.
 */
export interface VectorBucketAttributes {
  /**
   * The ARN of the vector bucket
   */
  readonly vectorBucketArn: string;

  /**
   * The encryption key associated with this bucket
   *
   * @default - No encryption key
   */
  readonly encryptionKey?: kms.IKey;

  /**
   * The timestamp when the cluster was created, in ISO 8601 format.
   * @default undefined - No creation time is provided
   */
  readonly creationTime?: string;

  /**
   * The account this existing bucket belongs to.
   *
   * @default - it's assumed the bucket belongs to the same account as the scope it's being imported into
   */
  readonly account?: string;

  /**
   * The region this existing bucket is in.
   * Features that require the region (e.g. `bucketWebsiteUrl`) won't fully work
   * if the region cannot be correctly inferred.
   *
   * @default - it's assumed the bucket is in the same region as the scope it's being imported into
   */
  readonly region?: string;
}

/******************************************************************************
 *                                Class
 *****************************************************************************/
/**
 * S3 vector bucket resource for AWS S3 vector buckets.
 * You can use this resource to create, modify, and manage vector buckets.
 * @see https://docs.aws.amazon.com/s3vectors/latest/userguide/what-is-s3vectors.html
 * @resource AWS::S3::VectorBucket
 */
export class VectorBucket extends VectorBucketBase {
  /**
   * Creates a VectorBucket construct that represents an external vector bucket by ARN.
   *
   * @param scope The parent creating construct (usually `this`).
   * @param id The construct's name.
   * @param vectorBucketArn The ARN of the vector bucket.
   * @returns A VectorBucket construct.
   */
  public static fromVectorBucketArn(scope: Construct, id: string, vectorBucketArn: string): IVectorBucket {
    return VectorBucket.fromVectorBucketAttributes(scope, id, { vectorBucketArn });
  }

  /**
   * Creates a VectorBucket construct that represents an external vector bucket by name.
   *
   * @param scope The parent creating construct (usually `this`).
   * @param id The construct's name.
   * @param vectorBucketName The name of the vector bucket.
   * @returns A VectorBucket construct.
   */
  public static fromVectorBucketName(scope: Construct, id: string, vectorBucketName: string): IVectorBucket {
    const vectorBucketArn = Stack.of(scope).formatArn({
      service: 's3vectors',
      resource: 'bucket',
      resourceName: vectorBucketName,
      arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
    });
    return VectorBucket.fromVectorBucketAttributes(scope, id, { vectorBucketArn });
  }

  /**
   * Creates a VectorBucket construct that represents an external vector bucket.
   *
   * @param scope The parent creating construct (usually `this`).
   * @param id The construct's name.
   * @param attrs A `VectorBucketAttributes` object. Can be obtained from a call to
   * `vectorBucket.export()` or manually created.
   */
  public static fromVectorBucketAttributes(scope: Construct, id: string, attrs: VectorBucketAttributes): IVectorBucket {
    const bucketName = Arn.split(attrs.vectorBucketArn, ArnFormat.SLASH_RESOURCE_NAME).resourceName!;
    if (!bucketName) {
      throw new ValidationError('Bucket name is required', scope);
    }
    class Import extends VectorBucketBase {
      public readonly vectorBucketArn = attrs.vectorBucketArn;
      public readonly creationTime = attrs.creationTime;
      public readonly encryptionKey = attrs.encryptionKey;
      public readonly vectorBucketName = bucketName;
      public policy?: VectorBucketPolicy = undefined;
      public readonly autoCreatePolicy: boolean = false;

      public export() {
        return attrs;
      }
    }
    return new Import(scope, id, {
      account: attrs.account,
      region: attrs.region,
    });
  }

  public static fromCfnVectorBucket(cfnVectorBucket: CfnVectorBucket): IVectorBucket {
    // use a "weird" id that has a higher chance of being unique
    const id = '@FromCfnVectorBucket';

    // if fromCfnVectorBucket() was already called on this CfnVectorBucket,
    // return the same L2
    // (as different L2s would conflict, because of the mutation of the physicalName property of the L1 below)
    const existing = cfnVectorBucket.node.tryFindChild(id);
    if (existing) {
      return <VectorBucket>existing;
    }

    // handle the KMS Key if the Bucket references one
    let encryptionKey: kms.IKey | undefined;
    if (cfnVectorBucket.encryptionConfiguration) {
      const encryptionConfiguration = (cfnVectorBucket.encryptionConfiguration as CfnVectorBucket.EncryptionConfigurationProperty);
      if (encryptionConfiguration.sseType === VectorBucketEncryption.KMS && encryptionConfiguration.kmsKeyArn) {
        encryptionKey = kms.Key.fromKeyArn(cfnVectorBucket, 'EncryptionKey', encryptionConfiguration.kmsKeyArn);
      }
    }

    return new class extends VectorBucketBase {
      public readonly vectorBucketArn = cfnVectorBucket.attrVectorBucketArn;
      public readonly creationTime = cfnVectorBucket.attrCreationTime;
      public readonly encryptionKey = encryptionKey;
      public readonly vectorBucketName = cfnVectorBucket.ref;
      public policy?: VectorBucketPolicy = undefined;
      public readonly autoCreatePolicy: boolean = false;

      constructor() {
        super(cfnVectorBucket, id);

        this.node.defaultChild = cfnVectorBucket;
      }
    }();
  }

  // ------------------------------------------------------
  // Attributes
  // ------------------------------------------------------
  /**
   * The ARN of the cluster
   * @attribute
   */
  public readonly vectorBucketArn: string;
  /**
   * The timestamp when the vector bucket was created, in ISO 8601 format.
   * @attribute
   */
  public readonly creationTime?: string;
  /**
   * KMS encryption key associated with this cluster.
   * @attribute
   */
  public readonly encryptionKey?: kms.IKey;
  /**
   * The name of the vector bucket
   *
   * @attribute
   */
  public readonly vectorBucketName: string;
  /**
   * The resource policy associated with this vector bucket.
   *
   * If `autoCreatePolicy` is true, a `VectorBucketPolicy` will be created upon the
   * first call to addToResourcePolicy.
   */
  public policy?: VectorBucketPolicy;

  /**
   * Indicates if a vector bucket resource policy should automatically be created upon
   * the first call to `addToResourcePolicy`.
   */
  protected autoCreatePolicy: boolean = true;
  // ------------------------------------------------------
  // Internal Only
  // ------------------------------------------------------
  private readonly __resource: CfnVectorBucket;

  // ------------------------------------------------------
  // CONSTRUCTOR
  // ------------------------------------------------------
  constructor(scope: Construct, id: string, props: VectorBucketProps = {}) {
    super(scope, id, { physicalName: props.vectorBucketName });

    // ------------------------------------------------------
    // Set properties and defaults
    // ------------------------------------------------------
    const { bucketEncryption, encryptionKey } = this._parseEncryption(props);
    this.encryptionKey = encryptionKey;

    // ------------------------------------------------------
    // Validation
    // ------------------------------------------------------
    throwIfInvalid((name) => this._validateBucketName(name), this.physicalName);

    // ------------------------------------------------------
    // CFN Props - With Lazy support
    // ------------------------------------------------------
    const cfnProps: CfnVectorBucketProps = {
      encryptionConfiguration: bucketEncryption,
      vectorBucketName: this.physicalName,
    };

    // ------------------------------------------------------
    // Create the resource
    // ------------------------------------------------------
    this.__resource = new CfnVectorBucket(this, 'Resource', cfnProps);

    this.__resource.applyRemovalPolicy(props.removalPolicy);

    // Get attributes directly from the CloudFormation resource
    this.vectorBucketArn = this.getResourceArnAttribute(this.__resource.attrVectorBucketArn, {
      region: '',
      account: '',
      service: 's3',
      resource: this.physicalName,
    });
    this.creationTime = this.__resource.attrCreationTime;
    // Extract bucket name from ARN to get the actual bucket name (not the ref which can be very long)
    // ARN format: arn:aws:s3vectors:region:account:bucket/bucket-name
    // Split by '/' and select index 1 to get the bucket name
    this.vectorBucketName = Fn.select(1, Fn.split('/', this.vectorBucketArn));

    if (props.autoDeleteObjects) {
      if (props.removalPolicy !== RemovalPolicy.DESTROY) {
        throw new ValidationError('Cannot use \'autoDeleteObjects\' property on a bucket without setting removal policy to \'DESTROY\'.', this);
      }

      this._enableAutoDeleteObjects();
    }
  }

  // ------------------------------------------------------
  // Validators
  // ------------------------------------------------------
  /**
   * Validates the bucket name
   * @param name The bucket name to validate
   * @returns An array of validation errors
   * @see https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-buckets-naming.html#vector-bucket-naming-requirements
   */
  private _validateBucketName(name: string): string[] {
    let errors: string[] = [];

    // Validate bucket name pattern: only lowercase letters, numbers, and hyphens
    // Must begin and end with a letter or number
    const validKeyPattern = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
    errors.push(...validateFieldPattern(name, 'Vector bucket name', validKeyPattern));

    // Must begin and end with a letter or number
    const validEdgePattern = /^[a-z0-9].*[a-z0-9]$/;
    errors.push(...validateFieldPattern(name, 'Vector bucket name', validEdgePattern, 'Vector bucket name must begin and end with a letter or number'));

    // Validate bucket name length
    errors.push(...validateStringFieldLength({
      value: name,
      fieldName: 'Vector bucket name',
      minLength: 3,
      maxLength: 63,
    }));

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

  /**
   *
   * Set up key properties and return the Bucket encryption property from the
   * user's configuration.
   */
  private _parseEncryption(props: VectorBucketProps): {
    bucketEncryption?: CfnVectorBucket.EncryptionConfigurationProperty;
    encryptionKey?: kms.IKey;
  } {
    // Server-side encryption with Amazon S3 managed keys (SSE-S3) is used by default when encryption type is not specified.
    const encryptionType = props.encryption ?? VectorBucketEncryption.S3_MANAGED;
    let encryptionKey = props.encryptionKey;

    // KMS
    if (encryptionType === VectorBucketEncryption.KMS) {
      encryptionKey = props.encryptionKey || new kms.Key(this, 'Key', {
        description: `Created by ${this.node.path}`,
        enableKeyRotation: true,
      });

      // Grant the S3 Vectors service principal permission to use the key
      this._grantServicePrincipalKeyAccess(encryptionKey);

      return {
        bucketEncryption: {
          sseType: VectorBucketEncryption.KMS,
          kmsKeyArn: encryptionKey.keyArn,
        },
        encryptionKey: encryptionKey,
      };
    }

    // S3_MANAGED
    if (encryptionType === VectorBucketEncryption.S3_MANAGED) {
      if (encryptionKey) {
        throw new Error('Encryption key cannot be specified for S3_MANAGED encryption');
      }

      return {
        bucketEncryption: {
          sseType: VectorBucketEncryption.S3_MANAGED,
        },
      };
    }

    // Invalid encryption type
    return {
      bucketEncryption: undefined,
      encryptionKey: undefined,
    };
  }

  private _enableAutoDeleteObjects() {
    const provider = AutoDeleteProvider.getOrCreateProvider(this, AUTO_DELETE_OBJECTS_RESOURCE_TYPE, {
      description: `Lambda function for auto-deleting indexes in ${this.vectorBucketName} S3 vector bucket.`,
    });

    // Use a bucket policy to allow the custom resource to delete
    // indexes in the bucket
    this.addToResourcePolicy(new iam.PolicyStatement({
      actions: [
        // prevent further PutIndex calls
        ...perms.VECTOR_BUCKET_POLICY_ACTIONS,
        // list objects
        ...perms.VECTOR_BUCKET_LIST_ACTIONS,
        ...perms.VECTOR_BUCKET_READ_ACTIONS,
        ...perms.VECTOR_INDEX_LIST_ACTIONS,
        ...perms.VECTOR_INDEX_READ_ACTIONS,
        // and then delete them
        ...perms.VECTOR_BUCKET_DELETE_ACTIONS,
        ...perms.VECTOR_INDEX_DELETE_ACTIONS,
        ...perms.VECTOR_DELETE_ACTIONS,
      ],
      resources: [
        this.vectorBucketArn,
        `${this.vectorBucketArn}/index/*`,
      ],
      principals: [new iam.ArnPrincipal(provider.roleArn)],
    }));

    const customResource = new CustomResource(this, 'AutoDeleteObjectsCustomResource', {
      resourceType: AUTO_DELETE_OBJECTS_RESOURCE_TYPE,
      serviceToken: provider.serviceToken,
      properties: {
        BucketName: this.vectorBucketName,
      },
    });

    // Ensure bucket policy is deleted AFTER the custom resource otherwise
    // we don't have permissions to list and delete in the bucket.
    // (add a `if` to make TS happy)
    if (this.policy) {
      customResource.node.addDependency(this.policy);
    }

    // We also tag the bucket to record the fact that we want it autodeleted.
    // The custom resource will check this tag before actually doing the delete.
    // Because tagging and untagging will ALWAYS happen before the CR is deleted,
    // we can set `autoDeleteObjects: false` without the removal of the CR emptying
    // the bucket as a side effect.
    Tags.of(this.__resource).add(AUTO_DELETE_OBJECTS_TAG, 'true');
  }
}
