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
import * as kendra from 'aws-cdk-lib/aws-kendra';
import { Construct } from 'constructs';
import { addCfnSuppressRules } from './utils';

export interface KendraConstructProps {

  // Name of the Kendra Index
  readonly IndexName: string;

  // Kendra Edition
  readonly Edition: string;

  // S3 Bucket which contains Documents to be Ingested
  readonly kendraDataSyncInputBucketName: string;

  readonly CognitoUserPoolId: string;
}

export class KendraConstruct extends Construct {
  private props: KendraConstructProps;
  private kendraIndex: kendra.CfnIndex;
  private kendraDataSource: kendra.CfnDataSource;

  constructor(parent: Construct, name: string, props: KendraConstructProps) {
    super(parent, name);
    this.props = props;
    const awsAccountId = cdk.Stack.of(this).account;
    const awsRegion = cdk.Stack.of(this).region;

    const indexRole = new cdk.aws_iam.Role(
      this,
      'kendraIndexRole',
      {
        description: 'Role that Kendra uses to push logging and metrics to Amazon Cloudwatch',
        assumedBy: new cdk.aws_iam.ServicePrincipal('kendra.amazonaws.com'),
      },
    );

    indexRole.addToPolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ['cloudwatch:PutMetricData'],
        resources: ['*'],
        conditions: {
          StringEquals: {
            'cloudwatch:namespace': 'Kendra',
          },
        },
      }),
    );

    indexRole.addToPolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ['logs:DescribeLogGroups'],
        resources: ['*'],
      }),
    );
    indexRole.addToPolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ['logs:CreateLogGroup'],
        resources: [`arn:aws:logs:${awsRegion}:${awsAccountId}:log-group:/aws/kendra/*`],
      }),
    );
    indexRole.addToPolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: [
          'logs:DescribeLogStreams',
          'logs:CreateLogStream',
          'logs:PutLogEvents',
        ],
        resources: [`arn:aws:logs:${awsRegion}:${awsAccountId}:log-group:/aws/kendra/*:log-stream:*`],
      }),
    );

    const cfnIndex = new kendra.CfnIndex(this, 'llmdemoIndex', {
      edition: props.Edition,
      name: props.IndexName,
      roleArn: indexRole.roleArn,
      userContextPolicy: 'USER_TOKEN',
      userTokenConfigurations: [{
        jwtTokenTypeConfiguration: {
          keyLocation: 'URL',
          url: `https://cognito-idp.${awsRegion}.amazonaws.com/${props.CognitoUserPoolId}/.well-known/jwks.json`,
          groupAttributeField: 'cognito:groups',
          userNameAttributeField: 'cognito:username',
        },
      }],
    });
    this.kendraIndex = cfnIndex;

    ////////////////// Kendra //////////////////////////////////////
    const kendraS3AccessRole = new cdk.aws_iam.Role(
      this,
      'kendraS3AccessRole',
      {
        description: 'Role that Kendra uses to access documents in S3 bucket',
        assumedBy: new cdk.aws_iam.ServicePrincipal('kendra.amazonaws.com'),
      },
    );
    kendraS3AccessRole.addToPolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [`arn:aws:s3:::${props.kendraDataSyncInputBucketName}/*`],
      }),
    );
    kendraS3AccessRole.addToPolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ['s3:ListBucket'],
        resources: [`arn:aws:s3:::${props.kendraDataSyncInputBucketName}`],
      }),
    );
    kendraS3AccessRole.addToPolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: [
          'kendra:BatchPutDocument',
          'kendra:BatchDeleteDocument',
        ],
        resources: [`arn:aws:kendra:${awsRegion}:${awsAccountId}:index/${cfnIndex.attrId}`],
      }),
    );


    this.kendraDataSource = new kendra.CfnDataSource(this, 'llmdemoIndexDataSource', {
      indexId: cfnIndex.attrId,
      name: 'llmdemoIndexDataSource',
      type: 'S3',
      roleArn: kendraS3AccessRole.roleArn,
      dataSourceConfiguration: {
        s3Configuration: {
          bucketName: props.kendraDataSyncInputBucketName,
          accessControlListConfiguration: {
            keyPath: `s3://${props.kendraDataSyncInputBucketName}/kendra_acl.json`,
          },
        },
      },
    });

    // https://github.com/awslabs/aws-solutions-constructs/blob/1598893b57f99aa6c5a3a8c1ea18e734ff619f0a/source/patterns/%40aws-solutions-constructs/core/lib/kendra-helper.ts#L60
    addCfnSuppressRules(this.kendraIndex, [{
      id: 'W80',
      reason: 'We consulted the Kendra TFC and they confirmed the default encryption is sufficient for general use cases',
    }]);
  }


  public get KendraIndexId() : string {
    return this.kendraIndex.attrId;
  }

  public get KendraDataSourceIndexId() : string {
    return this.kendraDataSource.attrId;
  }

}
