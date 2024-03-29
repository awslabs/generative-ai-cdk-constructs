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
import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { SecurityGroup, SecurityGroupProps } from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kendra from 'aws-cdk-lib/aws-kendra';
import { DockerImageFunction } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { DefinitionBody, StateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { Stack } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { addRolePolicies, createIAMRoleWithBasicExecutionPolicy } from './iam-roles-helper';
import { consolidateProps, getStepFnLambdaInvoke, overrideProps } from './kendra-utils';
import { addCfnSuppressRules, generatePhysicalName } from './utils';
import { SecurityGroupRuleDefinition } from '../../patterns/gen-ai/aws-rag-appsync-stepfn-kendra/types';

export function createS3DataSource(
  scope: Construct,
  targetIndex: kendra.CfnIndex,
  id: string,
  clientProps: Partial<kendra.CfnDataSourceProps>): kendra.CfnDataSource {

  // We go through some hoops here to extract the various inputs, because we need to narrow
  // the type to remove the union with IResolvable
  const dataSourceConfig = clientProps.dataSourceConfiguration as kendra.CfnDataSource.DataSourceConfigurationProperty;
  if (!dataSourceConfig) {
    throw new Error('Error - an S3 Kendra DataSource requires an DataSourceConfiguration prop');
  }

  const s3DataSourceConfig = dataSourceConfig.s3Configuration as kendra.CfnDataSource.S3DataSourceConfigurationProperty;

  if (!s3DataSourceConfig) {
    throw new Error('Error - an S3 Kendra DataSource requires an DataSourceConfiguration.S3Configuration prop');
  }

  // No Bucket name is an error
  if (!s3DataSourceConfig.bucketName) {
    throw new Error('Error - an S3 Kendra DataSource requires the DataSourceConfiguration.S3Configuration.bucketName prop');
  }

  // If there's no role, make a role and put it into defaultProps
  // Put bucket name in default props
  let defaultProps: kendra.CfnDataSourceProps = {
    indexId: targetIndex.ref,
    name: generatePhysicalName('', ['s3-datasource', id], 1000),
    type: 'S3',
  };

  // Return consolidated default and user props
  if (!clientProps.roleArn) {
    const s3CrawlPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: [
            's3:GetObject',
          ],
          resources: [
            `arn:aws:s3:::${s3DataSourceConfig.bucketName}/*`,
          ],
          effect: iam.Effect.ALLOW,
        }),
        new iam.PolicyStatement({
          actions: [
            's3:ListBucket',
          ],
          resources: [
            `arn:aws:s3:::${s3DataSourceConfig.bucketName}`,
          ],
          effect: iam.Effect.ALLOW,
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'kendra:BatchPutDocument',
            'kendra:BatchDeleteDocument',
          ],
          resources: [
            targetIndex.attrArn,
          ],
        }),
      ],
    });

    const dataSourceRole: iam.Role = new iam.Role(scope, `data-source-role-${id}`, {
      assumedBy: new iam.ServicePrincipal('kendra.amazonaws.com'),
      description: 'Policy for Kendra S3 Data Source',
      inlinePolicies: {
        s3CrawlPolicy,
      },
    });
    defaultProps = overrideProps(defaultProps, { roleArn: dataSourceRole.roleArn });
  }

  const consolidatedProps: kendra.CfnDataSourceProps = consolidateProps(defaultProps, clientProps);

  return new kendra.CfnDataSource(scope, `data-source-${id}`, consolidatedProps);
}

export function createKendraWorkflowStepFunction(
  cdkStack: Construct,
  updateKendraJobStatusFn: cdk.aws_lambda.IFunction,
  kendraSyncLambda: cdk.aws_lambda.IFunction,
  createCheckJobsStatusLambda: cdk.aws_lambda.IFunction,
): StateMachine {
  const docProcessingLogGroup = new cdk.aws_logs.LogGroup(cdkStack, 'DocProcessingStateMachineLog', {
    removalPolicy: RemovalPolicy.DESTROY,
  });
  // TODO(miketran): Eventually make this event driven
  const waitFor30Secs = new cdk.aws_stepfunctions.Wait(cdkStack, 'Wait 30 Seconds', {
    time: cdk.aws_stepfunctions.WaitTime.duration(cdk.Duration.seconds(30)),
  });
  const getKendraJobStatus = getStepFnLambdaInvoke(cdkStack, 'Get Textract Job Status', createCheckJobsStatusLambda);

  // Step function Def
  const docProcessingDefinition = getStepFnLambdaInvoke(
    cdkStack,
    'Starts a new Kendra Data Sync Job',
    kendraSyncLambda,
  )
    .next(getKendraJobStatus)
    .next(new cdk.aws_stepfunctions.Choice(cdkStack, 'Kendra DataSync Job Complete?')
      .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'FAILED'),
        getStepFnLambdaInvoke(cdkStack, 'Update Document Status as Failure', updateKendraJobStatusFn))
      .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'ABORTED'),
        getStepFnLambdaInvoke(cdkStack, 'Update Document Status as Aborted', updateKendraJobStatusFn))
      .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'INCOMPLETE'),
        getStepFnLambdaInvoke(cdkStack, 'Update Document Status as Incomplete', updateKendraJobStatusFn))
      .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'SUCCEEDED'),
        getStepFnLambdaInvoke(cdkStack, 'Update Document Status as Completed', updateKendraJobStatusFn))
      .otherwise(waitFor30Secs.next(getKendraJobStatus)),
    );

  const definitionDocProcessingBody = DefinitionBody.fromChainable(docProcessingDefinition);

  return new cdk.aws_stepfunctions.StateMachine(
    cdkStack,
    'DocProcessingStateMachine',
    {
      definitionBody: definitionDocProcessingBody,
      tracingEnabled: true,
      logs: {
        destination: docProcessingLogGroup,
        level: cdk.aws_stepfunctions.LogLevel.ALL,
      },
    },
  );
}

export function getGeneratePresignedUrlLambdaRole(scope: Construct, bucket: Bucket) {
  const role = createIAMRoleWithBasicExecutionPolicy(
    scope,
    'generatePresignedUrlRole',
    'Role used by the Generate Pre-signed URL Lambda functio',
  );
  addRolePolicies(role, [
    {
      actions: ['s3:PutObject'],
      resources: [bucket.bucketArn],
    },
    {
      actions: [
        'ec2:DescribeInstances',
        'ec2:CreateNetworkInterface',
        'ec2:AttachNetworkInterface',
        'ec2:DescribeNetworkInterfaces',
        'autoscaling:CompleteLifecycleAction',
        'ec2:DeleteNetworkInterface',
      ],
      resources: ['*'],
    },
  ]);
  return role;
}

export function getStartKendraSyncStepFnRole(scope: Construct, stateMachine: StateMachine) {
  const role = createIAMRoleWithBasicExecutionPolicy(
    scope,
    'startKendraSyncStepFnRole',
    'Role used for starting Kendra sync state machine',
  );
  addRolePolicies(role, [
    {
      actions: ['states:StartExecution'],
      resources: [stateMachine.stateMachineArn],
    },
    {
      actions: [
        'ec2:DescribeInstances',
        'ec2:CreateNetworkInterface',
        'ec2:AttachNetworkInterface',
        'ec2:DescribeNetworkInterfaces',
        'autoscaling:CompleteLifecycleAction',
        'ec2:DeleteNetworkInterface',
      ],
      resources: ['*'],
    },
  ]);
  return role;
}

export function getKendraStartDataSyncLambdaRole(
  scope: Construct,
  table: Table,
  awsRegion: string,
  awsAccountId: string,
  kendraIndexId: string,
  kendraDataSourceIndexId: string,
) {
  const role = createIAMRoleWithBasicExecutionPolicy(scope, 'startDataSyncRole', 'Role used by the Document Status Update Lambda function');
  addRolePolicies(role, [
    {
      actions: ['dynamodb:PutItem', 'dynamodb:Query', 'dynamodb:GetItem', 'dynamodb:UpdateItem'],
      resources: [table.tableArn],
    },
    {
      actions: ['kendra:StartDataSourceSyncJob'],
      resources: [
        `arn:aws:kendra:${awsRegion}:${awsAccountId}:index/${kendraIndexId}`,
        `arn:aws:kendra:${awsRegion}:${awsAccountId}:index/${kendraIndexId}/data-source/${kendraDataSourceIndexId}`,
      ],
    },
    {
      actions: [
        'ec2:DescribeInstances',
        'ec2:CreateNetworkInterface',
        'ec2:AttachNetworkInterface',
        'ec2:DescribeNetworkInterfaces',
        'autoscaling:CompleteLifecycleAction',
        'ec2:DeleteNetworkInterface',
      ],
      resources: ['*'],
    },
  ]);
  return role;
}

export function getCheckJobStatusLambdaRole(
  scope: Construct,
  awsRegion: string,
  awsAccountId: string,
  kendraIndexId: string,
  kendraDataSourceIndexId: string,
) {
  const role = createIAMRoleWithBasicExecutionPolicy(scope, 'textTractLambdaRole', 'Role used by the Text Extract Lambda function');
  addRolePolicies(role, [
    {
      actions: ['kendra:ListDataSourceSyncJobs'],
      resources: [`arn:aws:kendra:${awsRegion}:${awsAccountId}:index/${kendraIndexId}`],
    },
    {
      actions: ['kendra:ListDataSourceSyncJobs'],
      resources: [`arn:aws:kendra:${awsRegion}:${awsAccountId}:index/${kendraIndexId}/data-source/${kendraDataSourceIndexId}`],
    },
  ]);
  return role;
}

export function getUpdateKendraJobStatusLambdaRole(scope: Construct, table: Table) {
  const role = createIAMRoleWithBasicExecutionPolicy(scope, 'updateKendraJobStatus', 'Role used by the Document Status Update Lambda function');
  addRolePolicies(role, [
    {
      actions: ['dynamodb:PutItem', 'dynamodb:Query', 'dynamodb:GetItem', 'dynamodb:UpdateItem'],
      resources: [table.tableArn],
    },
    {
      actions: [
        'ec2:DescribeInstances',
        'ec2:CreateNetworkInterface',
        'ec2:AttachNetworkInterface',
        'ec2:DescribeNetworkInterfaces',
        'autoscaling:CompleteLifecycleAction',
        'ec2:DeleteNetworkInterface',
      ],
      resources: ['*'],
    },
  ]);
  return role;
}

export function createStepFunctionsExecutionHandlerRole(
  cdkStack: Construct,
  docProcessingStateMachine: StateMachine) {
  const stepFunctionsExecutionHandlerRole = createIAMRoleWithBasicExecutionPolicy(
    cdkStack,
    'stepFunctionsExecutionHandlerRole',
    'Role used by the stepFunctionsExecutionHandlerFn Lambda function',
  );
  stepFunctionsExecutionHandlerRole.node.addDependency(docProcessingStateMachine);
  addRolePolicies(stepFunctionsExecutionHandlerRole, [{
    actions: ['states:StartExecution'],
    resources: [
      docProcessingStateMachine.stateMachineArn,
    ],
  }]);
  return stepFunctionsExecutionHandlerRole;
}

export function buildSecurityGroup(
  scope: Construct,
  name: string,
  props: SecurityGroupProps,
  ingressRules: SecurityGroupRuleDefinition[],
  egressRules: SecurityGroupRuleDefinition[],
): SecurityGroup {
  const newSecurityGroup = new SecurityGroup(scope, `${name}-security-group`, props);

  ingressRules.forEach(rule => {
    newSecurityGroup.addIngressRule(rule.peer, rule.connection, rule.description, rule.remoteRule);
  });

  egressRules.forEach(rule => {
    newSecurityGroup.addEgressRule(rule.peer, rule.connection, rule.description, rule.remoteRule);
  });

  addCfnSuppressRules(newSecurityGroup, [
    {
      id: 'W5',
      reason: 'Egress of 0.0.0.0/0 is default and generally considered OK',
    },
    {
      id: 'W40',
      reason: 'Egress IPProtocol of -1 is default and generally considered OK',
    },
  ]);

  return newSecurityGroup;
}

export function createS3FileUploader (cdkStack: Stack, s3_bucket: Bucket, props: cdk.aws_lambda.DockerImageFunctionProps) {
  const createS3FileUploaderRole = createIAMRoleWithBasicExecutionPolicy(
    cdkStack,
    's3FileUploader',
    'Role used by the S3 file uploader Lambda function',
  );

  addRolePolicies(createS3FileUploaderRole, [{
    actions: ['s3:PutObject', 's3:PutObjectAcl', 's3:GetObject'],
    resources: [s3_bucket.bucketArn],
  }]);

  return new DockerImageFunction(
    cdkStack,
    's3FileUploaderFn',
    {
      ...props,
      role: createS3FileUploaderRole,
    },
  );
}

export function createGeneratePresignedUrlFn(
  cdkStack: Stack,
  bucket: Bucket,
  environment: {[p: string]: string},
): cdk.aws_lambda.Function {
  const generatePresignedUrlRole = createIAMRoleWithBasicExecutionPolicy(
    cdkStack,
    'generatePresignedUrlRole',
    'Role used by the Generate Pre-signed URL Lambda functio',
  );
  addRolePolicies(generatePresignedUrlRole, [
    {
      actions: ['s3:PutObject'],
      resources: [bucket.bucketArn],
    },
  ]);
  const lambdaGenerateUrlFn = new cdk.aws_lambda.Function(
    cdkStack,
    'generatePresignedUrlFN',
    {
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_10,
      handler: 'generate_presigned_url.lambda_handler',
      code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-rag-appsync-stepfn-kendra/generate_presigned_url/')),
      timeout: cdk.Duration.seconds(60),
      memorySize: 256,
      role: generatePresignedUrlRole,
      environment,
    },
  );

  return lambdaGenerateUrlFn;
}
