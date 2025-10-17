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

import { IResource, Resource, Arn, ArnFormat, Token, RemovalPolicy } from 'aws-cdk-lib';
import * as dsql from 'aws-cdk-lib/aws-dsql';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
// Internal libs
import * as perms from './perms';
import { validateStringFieldLength, validateFieldPattern, throwIfInvalid } from './validation-helpers';

/******************************************************************************
 *                              CONSTANTS
 *****************************************************************************/
/**
 * Minimum length for cluster tags
 * @internal
 */
const CLUSTER_TAG_MIN_LENGTH = 1;

/**
 * Maximum length for browser tags
 * @internal
 */
const CLUSTER_TAG_MAX_LENGTH = 256;

/******************************************************************************
 *                                Interface
 *****************************************************************************/
/**
 * Interface for Aurora DSQL cluster resources
 */
export interface ICluster extends IResource {
  /**
   * The ARN of the cluster
   * @attribute
   */
  readonly clusterArn: string;
  /**
   * The timestamp when the cluster was created, in ISO 8601 format.
   * @attribute
   */
  readonly creationTime?: string;
  /**
   * The id of the cluster.
   * @attribute
   */
  readonly clusterId: string;
  /**
   * The status of the cluster.
   * @attribute
   */
  readonly status?: string;
  /*
    * VpcEndpointServiceName of the cluster.
    * @attribute
    */
  readonly vpcEndpointServiceName: string;
  /**
   * Optional KMS encryption key associated with this bucket.
   */
  readonly encryptionKey?: kms.IKey;
  /**
   * Grants IAM actions to the IAM Principal
   */
  grant(grantee: iam.IGrantable, ...actions: string[]): iam.Grant;
  /**
   * grants connection authorization for a custom database role to the IAM Principal
   */
  grantConnect(grantee: iam.IGrantable): iam.Grant;
  /**
   * Grants connection authorization for the admin role to the IAM Principal
   */
  grantConnectAdmin(grantee: iam.IGrantable): iam.Grant;
}

/******************************************************************************
 *                        ABSTRACT BASE CLASS
 *****************************************************************************/
/**
 * Abstract base class for a Aurora DSQL cluster.
 * Contains methods and attributes valid for Aurora DSQL clusters either created with CDK or imported.
 */
export abstract class ClusterBase extends Resource implements ICluster {
  /**
   * The ARN of the cluster
   */
  public abstract readonly clusterArn: string;
  /**
   * The timestamp when the cluster was created, in ISO 8601 format.
   */
  public abstract readonly creationTime?: string;
  /**
   * The id of the cluster.
   */
  public abstract readonly clusterId: string;
  /**
   * The status of the cluster.
   */
  public abstract readonly status?: string;
  /**
   * The VpcEndpointServiceName of the cluster.
   */
  public abstract readonly vpcEndpointServiceName: string;
  /**
   * Optional KMS encryption key associated with this cluster.
   */
  public abstract readonly encryptionKey?: kms.IKey;

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /**
   * Grants IAM actions to the IAM Principal
   * @param grantee - The IAM principal to grant permissions to
   * @param actions - The actions to grant
   * @returns An IAM Grant object representing the granted permissions
   */
  public grant(grantee: iam.IGrantable, ...actions: string[]): iam.Grant {
    return iam.Grant.addToPrincipal({
      grantee: grantee,
      resourceArns: [this.clusterArn],
      actions: actions,
    });
  }

  /**
   * Grants connection authorization to the IAM Principal
   * @see https://docs.aws.amazon.com/aurora-dsql/latest/userguide/authentication-authorization.html#authentication-authorization-iam-policy
   * @param grantee - The IAM principal to grant permissions to
   * @default - Default grant configuration:
   * - actions: ['dsql:DbConnect'] on this.clusterArn
   * @returns An IAM Grant object representing the granted permissions
   */
  public grantConnect(grantee: iam.IGrantable): iam.Grant {
    return this.grant(grantee, ...perms.AURORA_DSQL_CONNECT_PERMS);
  }

  /**
   * Grants connection authorization to the IAM Principal
   * @see https://docs.aws.amazon.com/aurora-dsql/latest/userguide/authentication-authorization.html#authentication-authorization-iam-policy
   * @param grantee - The IAM principal to grant permissions to
   * @default - Default grant configuration:
   * - actions: ['dsql:DbConnectAdmin'] on this.clusterArn
   * @returns An IAM Grant object representing the granted permissions
   */
  public grantConnectAdmin(grantee: iam.IGrantable): iam.Grant {
    return this.grant(grantee, ...perms.AURORA_DSQL_CONNECT_ADMIN_PERMS);
  }
}

/**
 * Interface for multi-region cluster properties
 */
export interface MultiRegionProperties {
  /**
   * The set of peered clusters that form the multi-Region cluster configuration.
   *
   * Each peered cluster represents a database instance in a different Region.
   * @default - No peered clusters (single region cluster)
   * @required - No
   */
  readonly clusters?: ICluster[];
  /**
   * The Region that serves as the witness Region for a multi-Region cluster.
   *
   * The witness Region helps maintain cluster consistency and quorum.
   * The witness Region receives data written to any Read-Write Region
   * but does not have an endpoint.
   *
   * @required - Yes
   */
  readonly witnessRegion: string;
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a Aurora DSQL cluster resource
 */
export interface ClusterCustomProps {
  /**
   * The removal policy for the cluster.
   * Only RemovalPolicy.DESTROY and RemovalPolicy.RETAIN are allowed.
   * @default - RemovalPolicy.DESTROY
   * @required - No
   */
  readonly removalPolicy?: RemovalPolicy;
  /**
   * KMS key to use for the cluster.
   * @default - A new KMS key is created.
   * @required - No
   */
  readonly kmsKey?: IKey;
  /**
   * Defines the structure for multi-Region cluster configurations, containing the witness Region and peered cluster settings.
   * If not provided, the cluster will be created in the same region as the stack (single region cluster).
   * @default - No multi-Region cluster configurations.
   * @required - No
   */
  readonly multiRegionProperties?: MultiRegionProperties;
  /**
   * Tags to apply to the cluster.
   * @default - No tags.
   * @required - No
   */
  readonly tags?: Record<string, string>;
}

/******************************************************************************
 *                      ATTRS FOR IMPORTED CONSTRUCT
 *****************************************************************************/
/**
 * Attributes for specifying an imported Aurora DSQL cluster.
 */
export interface ClusterAttributes {
  /**
   * The ARN of the cluster
   * @attribute
   */
  readonly clusterArn: string;
  /**
   * The timestamp when the cluster was created, in ISO 8601 format.
   * @default undefined - No creation time is provided
   */
  readonly creationTime?: string;
  /**
   * The status of the cluster.
   * @default undefined - No status is provided
   */
  readonly status?: string;
  /**
   * VpcEndpointServiceName of the cluster.
   * @attribute
   */
  readonly vpcEndpointServiceName: string;
  /**
   * KMS encryption key associated with this cluster.
   *
   * @default - no encryption key
   */
  readonly encryptionKey?: kms.IKey;
}

/******************************************************************************
 *                                Class
 *****************************************************************************/
/**
 * Aurora DSQL cluster resource for AWS Aurora DSQL.
 * You can use this resource to create, modify, and manage clusters.
 * @see https://docs.aws.amazon.com/aurora-dsql/latest/userguide/what-is-aurora-dsql.html
 * @resource AWS::DSQL::Cluster
 */
export class Cluster extends ClusterBase {
  /**
   * Static Method for importing an existing Aurora DSQL cluster.
   */
  /**
   * Creates an Aurora DSQL cluster reference from an existing cluster's attributes.
   *
   * @param scope - The construct scope
   * @param id - Identifier of the construct
   * @param attrs - Attributes of the existing cluster
   * @returns An ICluster reference to the existing cluster
   */
  public static fromClusterAttributes(scope: Construct, id: string, attrs: ClusterAttributes): ICluster {
    class Import extends ClusterBase {
      public readonly clusterArn = attrs.clusterArn;
      public readonly clusterId = Arn.split(attrs.clusterArn, ArnFormat.SLASH_RESOURCE_NAME).resourceName!;
      public readonly creationTime = attrs.creationTime;
      public readonly status = attrs.status;
      public readonly vpcEndpointServiceName = attrs.vpcEndpointServiceName;
      public readonly encryptionKey = attrs.encryptionKey;

      constructor(s: Construct, i: string) {
        super(s, i);
      }
    }

    // Return new Cluster
    return new Import(scope, id);
  }

  // ------------------------------------------------------
  // Attributes
  // ------------------------------------------------------
  /**
   * The ARN of the cluster
   * @attribute
   */
  public readonly clusterArn: string;
  /**
   * The timestamp when the cluster was created, in ISO 8601 format.
   * @attribute
   */
  public readonly creationTime?: string;
  /**
   * The id of the cluster.
   * @attribute
   */
  public readonly clusterId: string;
  /**
   * The status of the cluster.
   * @attribute
   */
  public readonly status?: string;
  /**
   * VpcEndpointServiceName of the cluster.
   * @attribute
   */
  public readonly vpcEndpointServiceName: string;
  /**
   * KMS encryption key associated with this cluster.
   * @attribute
   */
  public readonly encryptionKey?: kms.IKey;
  /*
  * Multi-Region cluster properties.
  */
  public readonly multiRegionProperties?: MultiRegionProperties;
  /**
   * Tags applied to this cluster resource
   * A map of key-value pairs for resource tagging
   * @default - No tags applied
   */
  public readonly tags?: { [key: string]: string };
  // ------------------------------------------------------
  // Internal Only
  // ------------------------------------------------------
  private readonly __resource: dsql.CfnCluster;

  // ------------------------------------------------------
  // CONSTRUCTOR
  // ------------------------------------------------------
  constructor(scope: Construct, id: string, props: ClusterCustomProps) {
    super(scope, id);

    // ------------------------------------------------------
    // Set properties and defaults
    // ------------------------------------------------------
    this.tags = props.tags;
    this.multiRegionProperties = props.multiRegionProperties;
    this.encryptionKey = props.kmsKey;

    // ------------------------------------------------------
    // Validation
    // ------------------------------------------------------
    this._validateMultiRegionProperties(this.multiRegionProperties);
    throwIfInvalid(this._validateClusterTags, this.tags);
    this._validateRemovalPolicy(props.removalPolicy);

    // ------------------------------------------------------
    // CFN Props - With Lazy support
    // ------------------------------------------------------
    const cfnProps: dsql.CfnClusterProps = {
      deletionProtectionEnabled: props.removalPolicy ? props.removalPolicy === RemovalPolicy.RETAIN : false,
      kmsEncryptionKey: this.encryptionKey?.keyArn,
      multiRegionProperties: this._renderMultiRegionProperties(),
      tags: this.tags ? Object.entries(this.tags).map(([key, value]) => ({ key, value })) : undefined,
    };

    // ------------------------------------------------------
    // Create the resource
    // ------------------------------------------------------
    this.__resource = new dsql.CfnCluster(this, 'Resource', cfnProps);

    // Get attributes directly from the CloudFormation resource
    this.clusterArn = this.__resource.attrResourceArn;
    this.creationTime = this.__resource.attrCreationTime;
    this.clusterId = this.__resource.attrIdentifier;
    this.status = this.__resource.attrStatus;
    this.vpcEndpointServiceName = this.__resource.attrVpcEndpointServiceName;
  }

  /**
   * Render the multi-region properties.
   *
   * @returns MultiRegionPropertiesProperty object in CloudFormation format, or undefined if no multi-region properties are defined
   * @default - undefined if no multi-region properties are provided
   * @internal This is an internal core function and should not be called directly.
   */
  private _renderMultiRegionProperties(): dsql.CfnCluster.MultiRegionPropertiesProperty | undefined {
    return this.multiRegionProperties ? {
      clusters: this.multiRegionProperties.clusters?.map(cluster => cluster.clusterArn),
      witnessRegion: this.multiRegionProperties.witnessRegion,
    } : undefined;
  }

  // ------------------------------------------------------
  // Validators
  // ------------------------------------------------------
  /**
   * Validates the multi-region properties
   * @param props The multi-region properties to validate
   * @throws Error if the multi-region properties are invalid
   */
  private _validateMultiRegionProperties = (props: MultiRegionProperties | undefined): void => {
    if (!props) {
      return;
    }

    // The witness Region specified in multiRegionProperties.witnessRegion cannot be the same as the cluster's Region.
    if (props.witnessRegion && !Token.isUnresolved(this.stack.region)) {
      if (props.witnessRegion === this.stack.region) {
        throw new Error('Witness region cannot be the same as the cluster\'s Region');
      }
    }

    // For the provided peered clusters, they must be in different Regions.
    if (props.clusters && !Token.isUnresolved(this.stack.region)) {
      for (const cluster of props.clusters) {
        const region = Arn.split(cluster.clusterArn, ArnFormat.SLASH_RESOURCE_NAME).region;
        if (region === this.stack.region) {
          throw new Error(`Peered cluster ${cluster.clusterArn} cannot be in the same Region ${this.stack.region} as the cluster's Region`);
        }
      }
    }
  };

  /**
   * Validates the removal policy
   * @param removalPolicy The removal policy to validate
   * @throws Error if the removal policy is invalid
   */
  private _validateRemovalPolicy = (removalPolicy?: RemovalPolicy): void => {
    if (removalPolicy && removalPolicy !== RemovalPolicy.DESTROY && removalPolicy !== RemovalPolicy.RETAIN) {
      throw new Error('Invalid removal policy. Only RemovalPolicy.DESTROY and RemovalPolicy.RETAIN are allowed.');
    }
  };

  /**
   * Validates the cluster tags format
   * @param tags The tags object to validate
   * @returns Array of validation error messages, empty if valid
   */
  private _validateClusterTags = (tags?: { [key: string]: string }): string[] => {
    let errors: string[] = [];
    if (!tags) {
      return errors; // Tags are optional
    }

    // Validate each tag key and value
    for (const [key, value] of Object.entries(tags)) {
      errors.push(...validateStringFieldLength({
        value: key,
        fieldName: 'Tag key',
        minLength: CLUSTER_TAG_MIN_LENGTH,
        maxLength: CLUSTER_TAG_MAX_LENGTH,
      }));

      // Validate tag key pattern: ^[a-zA-Z0-9\s._:/=+@-]*$
      const validKeyPattern = /^[a-zA-Z0-9\s._:/=+@-]*$/;
      errors.push(...validateFieldPattern(key, 'Tag key', validKeyPattern));

      // Validate tag value
      errors.push(...validateStringFieldLength({
        value: value,
        fieldName: 'Tag value',
        minLength: CLUSTER_TAG_MIN_LENGTH,
        maxLength: CLUSTER_TAG_MAX_LENGTH,
      }));

      // Validate tag value pattern: ^[a-zA-Z0-9\s._:/=+@-]*$
      const validValuePattern = /^[a-zA-Z0-9\s._:/=+@-]*$/;
      errors.push(...validateFieldPattern(value, 'Tag value', validValuePattern));
    }

    return errors;
  };
}
