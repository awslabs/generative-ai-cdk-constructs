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
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kendra from 'aws-cdk-lib/aws-kendra';
import { Construct } from 'constructs';
import { generatePhysicalName } from './utils';
import { consolidateProps, overrideProps } from '../../patterns/gen-ai/aws-rag-appsync-stepfn-kendra';

export function CreateS3DataSource(scope: Construct,
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
