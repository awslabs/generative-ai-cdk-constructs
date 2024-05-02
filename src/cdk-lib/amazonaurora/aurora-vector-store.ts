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

import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { buildCustomResourceProvider } from '../../common/helpers/custom-resource-provider-helper';
import { generatePhysicalNameV2 } from '../../common/helpers/utils';
import { buildVpc, DefaultVpcProps } from '../../common/helpers/vpc-helper';
import { BedrockFoundationModel } from '../foundationmodels';


/**
 * List of supported versions of PostgreSQL for Aurora cluster.
 */
export const SupportedPostgreSQLVersions = {
  AURORA_POSTGRESQL_V12_16: rds.AuroraPostgresEngineVersion.VER_12_16,
  AURORA_POSTGRESQL_V13_12: rds.AuroraPostgresEngineVersion.VER_13_12,
  AURORA_POSTGRESQL_V14_9: rds.AuroraPostgresEngineVersion.VER_14_9,
  AURORA_POSTGRESQL_V15_4: rds.AuroraPostgresEngineVersion.VER_15_4,
  AURORA_POSTGRESQL_V15_5: rds.AuroraPostgresEngineVersion.VER_15_5,
} as const;

export type SupportedPostgreSQLVersions = typeof SupportedPostgreSQLVersions[
  keyof typeof SupportedPostgreSQLVersions
];

/**
 * Base properties for an Aurora Vector Store.
 */
export interface BaseAuroraVectorStoreProps {
  /**
   * The schema name for the Aurora Vector Store.
   */
  readonly schemaName?: string;

  /**
   * The field name for the vector column in the Aurora Vector Store.
   */
  readonly vectorField?: string;

  /**
   * The field name for the text column in the Aurora Vector Store.
   */
  readonly textField?: string;

  /**
   * The field name for the metadata column in the Aurora Vector Store.
   */
  readonly metadataField?: string;

  /**
   * The name of the table for the Aurora Vector Store.
   */
  readonly tableName?: string;

  /**
   * The primary key field for the Aurora Vector Store table.
   */
  readonly primaryKeyField?: string;

  /**
   * The embeddings model used for the Aurora Vector Store.
   * The vector dimensions of the model must match the dimensions
   * used in the KnowledgeBase construct.
   */
  readonly embeddingsModel: BedrockFoundationModel;
}

/**
 * Properties for configuring an Amazon Aurora Vector Store.
 */
export interface AmazonAuroraVectorStoreProps extends BaseAuroraVectorStoreProps {
  /**
   * The name of the database for the Aurora Vector Store.
   */
  readonly databaseName?: string;

  /**
   * The version of PostgreSQL to use for the Aurora Vector Store.
   * By default, the latest supported version will be used.
   */
  readonly postgreSQLVersion?: SupportedPostgreSQLVersions;
}

/**
 * Properties for an existing Aurora Vector Store.
 * You database must have TCP/IP port that the
 * database will use for application connections
 * set up for `5432`.
 */
export interface ExistingAmazonAuroraVectorStoreProps extends BaseAuroraVectorStoreProps {
  /**
   * The name of the database for the Aurora Vector Store.
   */
  readonly databaseName: string;

  /**
   * The unique cluster identifier of your Aurora RDS cluster.
   */
  readonly clusterIdentifier: string;

  /**
   * The VPC in which the existing Aurora Vector Store is located.
   */
  readonly vpc: ec2.IVpc;

  /**
   * The secret containing the database credentials.
   * The secret must contain `host`, `port`, `username`,
   * `password` and `dbname` values.
   */
  readonly secret: secretsmanager.ISecret;

  /**
   * The id of the security group associated with the RDS Aurora instance.
   * This security group allows access to the Aurora Vector Store from Lambda's
   * custom resource running pgVector SQL commands.
   */
  readonly auroraSecurityGroupId: string;
}

/**
 * Interface representing the resources required for a database cluster.
 */
interface DatabaseClusterResources {

  /**
   * The Amazon Aurora RDS cluster.
   */
  readonly auroraCluster: rds.DatabaseCluster;

  /**
   * The ARN of your existing Amazon Aurora DB cluster.
   */
  readonly resourceArn: string;

  /**
   * The unique cluster identifier of the Aurora RDS cluster.
   */
  readonly clusterIdentifier: string;

  /**
   * The VPC in which the database cluster is located.
   */
  readonly vpc: ec2.IVpc;

  /**
   * The secret containing the database credentials.
   * The secret must contain `username` and `password` values.
   */
  readonly secret: secretsmanager.ISecret;

  /**
   * The security group associated with the Aurora cluster.
   */
  readonly auroraSecurityGroup: ec2.SecurityGroup;
}

/**
  * Creates AmazonAuroraVectorStore.
  *
  * It includes creation of a VPC with 3 subnets (public,
  * private with NAT Gateway, private without NAT Gateway),
  * with the Amazon Aurora Serverless V2 Cluster.
  * The cluster has 1 writer/reader of PostgreSQL version 15.5
  * instance (min capacity 0.5, max capacity 4). Lambda custom
  * resource executes required pgvector and Amazon Bedrock Knowledge
  * Base SQL queries against Aurora cluster
  * during deployment. The secret containing databases credentials is
  * being deployed and securely stored in AWS Secrets Manager.
  * You must specify the same embeddings model that you used in
  * KnowledgeBase construct.
  * @see https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html)
  */
export class AmazonAuroraVectorStore extends Construct {
  /**
   * Creates an instance of AmazonAuroraVectorStore using existing Aurora Vector Store properties.
   * You need to provide your existing Aurora Vector Store properties
   * such as `databaseName`, `clusterIdentifier`, `vpc` where database is deployed,
   * `secret` containing username and password for authentication to database,
   * and `auroraSecurityGroupId` with the value of a security group id that was
   * used for the database.
   *
   * @param scope - The scope in which to define the construct.
   * @param id - The ID of the construct.
   * @param props - The properties of the existing Aurora Vector Store.
   * @returns An instance of AmazonAuroraVectorStore.
   */
  public static fromExistingAuroraVectorStore(
    scope: Construct,
    id: string,
    props: ExistingAmazonAuroraVectorStoreProps,
  ): AmazonAuroraVectorStore {
    return new AmazonAuroraVectorStore(scope, id, props, true);
  }
  /**
   * The ARN of your Amazon Aurora DB cluster.
   */
  public readonly resourceArn: string;

  /**
   * The name of the schema in your Amazon Aurora DB cluster.
   */
  public readonly schemaName: string;

  /**
   * The name of the field that stores the vector data in your Amazon Aurora DB cluster.
   */
  public readonly vectorField: string;

  /**
   * The name of the field that stores the text data in your Amazon Aurora DB cluster.
   */
  public readonly textField: string;

  /**
   * The name of the field that stores the metadata in your Amazon Aurora DB cluster.
   */
  public readonly metadataField: string;

  /**
   * The name of your Database.
   */
  public readonly databaseName: string;

  /**
   * The Table Name of your Amazon Aurora DB cluster.
   */
  public readonly tableName: string;

  /**
   * The Secret ARN of your Amazon Aurora DB cluster.
   */
  public readonly credentialsSecretArn: string;

  /**
   * Primary key of your Amazon Aurora DB cluster.
   */
  public readonly primaryKeyField: string;

  /**
   * Model used for embeddings.
   */
  public readonly embeddingsModel: BedrockFoundationModel;

  /**
   * An IAM policy that allows Data API access to Aurora.
   * @private
   */
  private readonly auroraPgCRPolicy: iam.ManagedPolicy;

  constructor(
    scope: Construct,
    id: string,
    props: AmazonAuroraVectorStoreProps,
    fromExisting: boolean = false,
  ) {
    super(scope, id);

    this.databaseName = props.databaseName ?? 'bedrock_vector_db';
    this.schemaName = props.schemaName ?? 'bedrock_integration';
    this.tableName = props.tableName ?? 'bedrock_kb';
    this.vectorField = props.vectorField ?? 'embedding';
    this.textField = props.textField ?? 'chunks';
    this.metadataField = props.metadataField ?? 'metadata';
    this.primaryKeyField = props.primaryKeyField ?? 'id';
    this.embeddingsModel = props.embeddingsModel;

    // Check if the props are for an existing Aurora Vector Store
    let databaseClusterResources: DatabaseClusterResources;
    if (!fromExisting) {
      const auroraVectorStoreProps = props as AmazonAuroraVectorStoreProps;
      databaseClusterResources = this.createDatabaseCluster(
        auroraVectorStoreProps.postgreSQLVersion ?? SupportedPostgreSQLVersions.AURORA_POSTGRESQL_V15_5,
      ) as DatabaseClusterResources;
    } else {
      const existingAuroraVectorStoreProps = props as ExistingAmazonAuroraVectorStoreProps;
      databaseClusterResources = {
        vpc: existingAuroraVectorStoreProps.vpc,
        secret: existingAuroraVectorStoreProps.secret,
        resourceArn: cdk.Stack.of(this).formatArn({
          service: 'rds',
          resource: 'cluster',
          resourceName: existingAuroraVectorStoreProps.clusterIdentifier,
          region: cdk.Stack.of(this).region,
          account: cdk.Stack.of(this).account,
          arnFormat: cdk.ArnFormat.COLON_RESOURCE_NAME,
        }),
        clusterIdentifier: existingAuroraVectorStoreProps.clusterIdentifier,
        auroraSecurityGroup: ec2.SecurityGroup.fromLookupById(
          this,
          'ExistingSG',
          existingAuroraVectorStoreProps.auroraSecurityGroupId,
        ),
      } as DatabaseClusterResources;
    }

    this.credentialsSecretArn = databaseClusterResources.secret.secretArn;
    this.resourceArn = databaseClusterResources.resourceArn;
    this.auroraPgCRPolicy = this.getAuroraPgCRPolicy(databaseClusterResources.clusterIdentifier);

    const lambdaSecurityGroup = new ec2.SecurityGroup(this, 'LambdaSecurityGroup', {
      vpc: databaseClusterResources.vpc,
      securityGroupName: 'lambda-security-group',
      description: 'Security group for Lambda access to Aurora',
    });

    databaseClusterResources.auroraSecurityGroup.addIngressRule(
      lambdaSecurityGroup,
      ec2.Port.tcp(5432),
      'Allow PostgreSQL access from Lambda security group',
    );

    const customResource = buildCustomResourceProvider({
      providerName: 'AmazonAuroraPgVectorCRProvider',
      vpc: databaseClusterResources.vpc,
      securityGroup: lambdaSecurityGroup,
      codePath: path.join(
        __dirname, '../../../lambda/amazon-aurora-pgvector-custom-resources'),
      handler: 'custom_resources.on_event',
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
    });

    const crProvider = customResource.getProvider(this);
    crProvider.role.addManagedPolicy(this.auroraPgCRPolicy);
    databaseClusterResources.secret.grantRead(crProvider.role);

    const auroraPgVector = new cdk.CustomResource(this, 'AuroraPgVector', {
      resourceType: 'Custom::AmazonAuroraPgVector',
      serviceToken: crProvider.serviceToken,
      properties: {
        SecretName: databaseClusterResources.secret.secretName || '',
        ClusterIdentifier: databaseClusterResources.clusterIdentifier,
        DatabaseName: this.databaseName,
        TableName: this.tableName,
        VectorDimensions: this.embeddingsModel.vectorDimensions!,
        PrimaryKeyField: this.primaryKeyField,
        SchemaName: this.schemaName,
        VectorField: this.vectorField,
        TextField: this.textField,
        MetadataField: this.metadataField,
      },
    });

    auroraPgVector.node.addDependency(this.auroraPgCRPolicy);
    if (!fromExisting) {
      auroraPgVector.node.addDependency(databaseClusterResources.auroraCluster);
    }
  }

  /**
   * Creates an Amazon Aurora Serverless V2 cluster.
   *
   * @param postgreSQLVersion - The version of PostgreSQL to use for the Aurora Vector Store.
   * @returns An object containing the resources required for the database cluster.
   */
  private createDatabaseCluster(
    postgreSQLVersion: SupportedPostgreSQLVersions,
  ): DatabaseClusterResources {

    const vpc = buildVpc(this, {
      defaultVpcProps: DefaultVpcProps(),
    });
    vpc.addFlowLog('VpcFlowLog', {
      destination: ec2.FlowLogDestination.toCloudWatchLogs(),
    });

    const auroraSecurityGroup = new ec2.SecurityGroup(this, 'AuroraSecurityGroup', {
      vpc: vpc,
      securityGroupName: 'aurora-security-group',
      description: 'Security group for access to Aurora from Lambda',
    });

    const auroraCluster = new rds.DatabaseCluster(this, 'AuroraCluster', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: postgreSQLVersion,
      }),
      credentials: rds.Credentials.fromGeneratedSecret('postgres'),
      clusterIdentifier: `aurora-serverless-vector-cluster-${cdk.Stack.of(this).account}`,
      defaultDatabaseName: this.databaseName,
      vpc: vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      securityGroups: [auroraSecurityGroup],
      iamAuthentication: true,
      storageEncrypted: true,
      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: 4,
      writer: rds.ClusterInstance.serverlessV2('AuroraServerlessWriter'),
      readers: [rds.ClusterInstance.serverlessV2('AuroraServerlessReader',
        { scaleWithWriter: true })],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const resourceArn = cdk.Stack.of(this).formatArn({
      service: 'rds',
      resource: 'cluster',
      resourceName: auroraCluster.clusterIdentifier,
      arnFormat: cdk.ArnFormat.COLON_RESOURCE_NAME,
    });

    auroraCluster.addRotationSingleUser();

    // Add Data API access to the Aurora cluster
    const cfnDbCluster = auroraCluster.node.defaultChild as rds.CfnDBCluster;
    cfnDbCluster.addOverride('Properties.EnableHttpEndpoint', true);

    NagSuppressions.addResourceSuppressions(
      auroraCluster,
      [
        {
          id: 'AwsSolutions-RDS10',
          reason: 'Deletion protection is disabled to make sure a customer can stop ' +
                  'incurring charges if they want to delete the construct.',
        },
      ],
      true,
    );

    return {
      vpc: vpc,
      auroraCluster: auroraCluster,
      resourceArn: resourceArn,
      secret: auroraCluster.secret!,
      auroraSecurityGroup: auroraSecurityGroup,
      clusterIdentifier: auroraCluster.clusterIdentifier,
    } as DatabaseClusterResources;
  }

  /**
   * Creates an IAM policy that allows custom resource Lambda to access Aurora.
   *
   * @param clusterIdentifier - The unique cluster identifier of the Aurora RDS cluster.
   * @returns An IAM policy that allows custom resource Lambda to access Aurora.
   */
  private getAuroraPgCRPolicy(clusterIdentifier: string): iam.ManagedPolicy {
    const crPolicy = new iam.ManagedPolicy(this, 'AuroraPgPolicy', {
      managedPolicyName: generatePhysicalNameV2(this,
        'AuroraPgPolicy',
        { maxLength: 32, lower: true }),
      statements: [
        new iam.PolicyStatement({
          actions: [
            'ec2:DescribeInstances',
            'ec2:CreateNetworkInterface',
            'ec2:AttachNetworkInterface',
            'ec2:DescribeNetworkInterfaces',
            'autoscaling:CompleteLifecycleAction',
            'ec2:DeleteNetworkInterface',
          ],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: [
            'rds:DescribeDBClusters',
          ],
          resources: [
            cdk.Stack.of(this).formatArn({
              service: 'rds',
              resource: 'cluster',
              resourceName: clusterIdentifier,
              arnFormat: cdk.ArnFormat.COLON_RESOURCE_NAME,
              account: cdk.Stack.of(this).account,
              region: cdk.Stack.of(this).region,
            }),
          ],
        }),
      ],
    });

    NagSuppressions.addResourceSuppressions(
      crPolicy,
      [
        {
          id: 'AwsSolutions-IAM4',
          reason: 'The AWSLambdaBasicExecutionRole managed policy is required for ' +
                  'the Lambda function to write logs to CloudWatch.',
        },
        {
          id: 'AwsSolutions-IAM5',
          reason: 'This policy is required to allow the custom resource to create a ' +
                  'network interface for the Aurora cluster and it has to be wildcard.',
        },
      ],
      true,
    );

    return crPolicy;
  }
}