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
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as iam from 'aws-cdk-lib/aws-iam';

import { Construct } from 'constructs';


export interface AppsyncMergedApiProps {
  /**
   * name  of merged api on appsync
   * @default 'mergedApi'
   */
  readonly appsyncmergedApiName: string;
  /**
   * cognito user pool id for appsync auth
   * @default None
   */
  readonly userpoolid: string;

  /**
   * cognito authentication user pool is used as authentication Type
   */
  readonly cognitoAuthenticationUserpool: string;

  /**
   * AWS region
   */
  readonly region: string;

  /**
   * AWS account
   */
  readonly accountid: string;

  /**
   * appsync service principle role
   */
  readonly appsyncServicePrincipleRole: string;

  /**
   * owner contact for merged api appsync notification
   *  @default None
   */
  readonly appsyncMergedApiContact: string;
}

/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 *
 * build app sync merge api with source api associations
 *
 * @param AppsyncMergedApiProps The  props to be used by the construct
 * @returns App sync merge api
 */
export function buildMergedAPI(scope: Construct, props: AppsyncMergedApiProps) {

  let mergedapi = new appsync.CfnGraphQLApi(scope, props?.appsyncmergedApiName, {
    apiType: 'MERGED',
    name: props?.appsyncmergedApiName,
    authenticationType: 'API_KEY',
    additionalAuthenticationProviders: [getAdditionalAuthenticationMode(props)],
    logConfig: {
      cloudWatchLogsRoleArn: setAppsyncCloudWatchlogsRole(scope, props).roleArn,
      fieldLogLevel: 'ALL',
      excludeVerboseContent: false,
    },
    xrayEnabled: true,
    mergedApiExecutionRoleArn: getMergedAPIRole(scope, props).roleArn,
    ownerContact: props.appsyncMergedApiContact,
  });

  return mergedapi;

}

function getAdditionalAuthenticationMode(props: AppsyncMergedApiProps) {
  const additionalAuthenticationMode: appsync.CfnGraphQLApi.AdditionalAuthenticationProviderProperty = {
    authenticationType: props?.cognitoAuthenticationUserpool,
    userPoolConfig: {
      awsRegion: props?.region,
      userPoolId: props?.userpoolid,
    },
  };
  return additionalAuthenticationMode;
}

function setAppsyncCloudWatchlogsRole(scope: Construct, props: AppsyncMergedApiProps) {
  let appsynccloudWatchlogsRole = new iam.Role(scope, 'appsynccloudWatchlogsRole', {
    assumedBy: new iam.ServicePrincipal(props.appsyncServicePrincipleRole),
  });
  appsynccloudWatchlogsRole.addToPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
      resources: ['*'],
    }),
  );
  return appsynccloudWatchlogsRole;
}

function getMergedAPIRole(scope: Construct, props: AppsyncMergedApiProps) {
  return new iam.Role(scope, 'mergedapirole', {
    assumedBy: new iam.ServicePrincipal(props.appsyncServicePrincipleRole),
  });
}

/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 *
 * set the merge api role to access source api associations
 *
 * @param AppsyncMergedApiProps The  props to be used by the construct
 * @param mergedAPI app sync graphql api
 * @param mergedApiRole iam role
 * @returns App sync merge api role
 */
export function setMergedApiRole(props: AppsyncMergedApiProps, mergedAPI: appsync.CfnGraphQLApi, mergedApiRole: iam.Role ) {
  mergedApiRole.addToPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['appsync:StartSchemaMerge'],
      resources: [
        'arn:aws:appsync:' + props.region + ':' + props.accountid + ':apis/'
        + mergedAPI.attrApiId + '/sourceApiAssociations/*',
      ],
    }),
  );

  return mergedApiRole;
}