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
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { buildCustomResourceProvider } from '../../common/helpers/custom-resource-provider-helper';
import { generatePhysicalNameV2 } from '../../common/helpers/utils';
import { buildVpc, DefaultVpcProps } from '../../common/helpers/vpc-helper';


export interface AmazonAuroraDefaultVectorStoreProps {
  /**
   * The embeddings model vector dimension for the knowledge base.
   * Must be identical as in the KnowledgeBase construct.
   * This is due to the factor that the embeddings models
   * have different vector dimensions and this construct
   * needs to know the vector dimensions to create the vector
   * index of appropriate dimensions in the Aurora database.
   */
  readonly embeddingsModelVectorDimension: number;

  /**
   * The VPC where the Aurora Vector Store will be deployed in.
   * The provided VPC must have at least one subnet of type
   * `ec2.SubnetType.PUBLIC` and at least one subnet of type
   * `ec2.SubnetType.PRIVATE_WITH_EGRESS`. If no subnets of these
   * types are available, the deployment will fail.
   * If not provided, a new VPC with the required subnet
   * configuration will be created automatically.
   * @default - "A new VPC will be created."
   */
  readonly vpc?: ec2.IVpc;
}

/**
  * Creates default AmazonAuroraVectorStore.
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
export class AmazonAuroraDefaultVectorStore extends cdk.Resource {
  /**
   * The ARN of your Amazon Aurora DB cluster.
   */
  public readonly resourceArn: string;

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
   * Cluster identifier of your Amazon Aurora DB cluster.
   */
  public readonly clusterIdentifier: string;

  /**
   * Model used for embeddings.
   */
  public readonly embeddingsModelVectorDimension: number;

  /**
   * The VPC where the Aurora DB Cluster is deployed.
   */
  public readonly vpc: ec2.IVpc;

  /**
   * The Security Group attached to the Aurora DB Instances in the Cluster.
   */
  public readonly auroraSecurityGroup: ec2.ISecurityGroup;

  /**
   * An IAM policy that allows Data API access to Aurora.
   * @private
   */
  private auroraPgCRPolicy: iam.ManagedPolicy;

  constructor(
    scope: Construct,
    id: string,
    props: AmazonAuroraDefaultVectorStoreProps,
  ) {
    super(scope, id);

    this.databaseName = 'bedrock_vector_db';
    this.tableName = 'bedrock_integration.bedrock_kb';
    this.primaryKeyField = 'id';
    this.clusterIdentifier = 'aurora-serverless-vector-cluster';
    this.embeddingsModelVectorDimension = props.embeddingsModelVectorDimension;

    this.vpc = buildVpc(this, {
      defaultVpcProps: DefaultVpcProps(),
      existingVpc: props.vpc,
    });
    this.vpc.addFlowLog('VpcFlowLog', {
      destination: ec2.FlowLogDestination.toCloudWatchLogs(),
    });

    this.auroraSecurityGroup = new ec2.SecurityGroup(this, 'AuroraSecurityGroup', {
      vpc: this.vpc,
      securityGroupName: 'aurora-security-group',
      description: 'Security group for access to Aurora from Lambda',
    });

    const lambdaSecurityGroup = new ec2.SecurityGroup(this, 'LambdaSecurityGroup', {
      vpc: this.vpc,
      securityGroupName: 'lambda-security-group',
      description: 'Security group for Lambda access to Aurora',
    });

    const auroraCluster = new rds.DatabaseCluster(this, 'AuroraCluster', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_15_5,
      }),
      credentials: rds.Credentials.fromGeneratedSecret('postgres'),
      clusterIdentifier: this.clusterIdentifier,
      defaultDatabaseName: this.databaseName,
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      securityGroups: [this.auroraSecurityGroup],
      iamAuthentication: true,
      storageEncrypted: true,
      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: 4,
      writer: rds.ClusterInstance.serverlessV2('AuroraServerlessWriter'),
      readers: [rds.ClusterInstance.serverlessV2('AuroraServerlessReader',
        { scaleWithWriter: true })],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    this.credentialsSecretArn = auroraCluster.secret?.secretArn || '';
    this.resourceArn = cdk.Stack.of(this).formatArn({
      service: 'rds',
      resource: 'cluster',
      resourceName: auroraCluster.clusterIdentifier,
      arnFormat: cdk.ArnFormat.COLON_RESOURCE_NAME,
    });

    auroraCluster.addRotationSingleUser();

    this.auroraSecurityGroup.addIngressRule(
      lambdaSecurityGroup,
      ec2.Port.tcp(5432),
      'Allow PostgreSQL access from Lambda security group',
    );

    // Add Data API access to the Aurora cluster
    const cfnDbCluster = auroraCluster.node.defaultChild as rds.CfnDBCluster;
    cfnDbCluster.addOverride('Properties.EnableHttpEndpoint', true);

    this.auroraPgCRPolicy = new iam.ManagedPolicy(this, 'AuroraPgPolicy', {
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
            'rds-data:BatchExecuteStatement',
            'rds-data:BeginTransaction',
            'rds-data:CommitTransaction',
            'rds-data:ExecuteStatement',
            'rds-data:RollbackTransaction',
          ],
          resources: [
            cdk.Stack.of(this).formatArn({
              service: 'rds',
              resource: 'cluster',
              resourceName: `${auroraCluster.clusterIdentifier}`,
            }),
          ],
        }),
      ],
    });

    NagSuppressions.addResourceSuppressions(
      this.auroraPgCRPolicy,
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

    const customResource = buildCustomResourceProvider({
      providerName: 'AmazonAuroraPgVectorCRProvider',
      vpc: this.vpc,
      securityGroup: lambdaSecurityGroup,
      codePath: path.join(
        __dirname, '../../../lambda/amazon-aurora-pgvector-custom-resources'),
      handler: 'custom_resources.on_event',
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
    });

    const crProvider = customResource.getProvider(this);
    crProvider.role.addManagedPolicy(this.auroraPgCRPolicy);
    auroraCluster.secret?.grantRead(crProvider.role);

    const auroraPgVector = new cdk.CustomResource(this, 'AuroraPgVector', {
      resourceType: 'Custom::AmazonAuroraPgVector',
      serviceToken: crProvider.serviceToken,
      properties: {
        DatabaseName: this.databaseName,
        SecretName: auroraCluster.secret?.secretName || '',
        VectorDimensions: props.embeddingsModelVectorDimension!,
      },
    });

    auroraPgVector.node.addDependency(this.auroraPgCRPolicy);
    this.auroraPgCRPolicy.node.addDependency(auroraCluster);
  }
}
