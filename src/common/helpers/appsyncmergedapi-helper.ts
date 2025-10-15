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

import { Aws } from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface AppsyncMergedApiProps {

  /**
   * Optional, existing merge api
   * schema for multiple source api.
   * @default None
   */
  readonly existingMergeApi?: appsync.CfnGraphQLApi;

  /**
   * Optional user provided appsync props
   * @default - authentication type - AMAZON_COGNITO_USER_POOL
   * @default - api type -MERGED
   * @default - name - appsyncmergeAPI
   *
   */
  readonly cfnGraphQLApiProps?: appsync.CfnGraphQLApiProps;

  /**
   * OPTIONAL cognito user pool id for appsync auth
   * @default None
   */
  readonly userPoolId?: string;

  /**
   * Required appsync service principle role
   * @default - appsync.amazonaws.com
   */
  readonly appsyncServicePrincipleRole: string;

  /**
   * Optional Field log level
   * @default None
   */
  readonly fieldLogLevel?: string;

  /**
   * Optional log verbose content
   * @default false
   */
  readonly excludeVerboseContent?: boolean;

  /**
   * Optional x ray enablement for app sync
   * @default false
   */
  readonly xRayEnabled?: boolean;

  /**
   * Required mergedApiRole for app sync
   * @default
   */
  readonly mergedApiRole: iam.Role;

}
/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 *
 * build app sync merge api with source api associations
 *
 * @param AppsyncMergedApiProps The  props to be used by the construct
 * @param  apiType - MERGED, GRAPHQL
 * @returns App sync merge api
 */
export function buildMergedAPI(scope: Construct, id: string, props: AppsyncMergedApiProps) {
  if (props.existingMergeApi) {
    return props.existingMergeApi;
  } else {
    const mergeAPIname = props.cfnGraphQLApiProps?.name || 'appsyncmergeAPI';
    const apiType = props.cfnGraphQLApiProps?.apiType || 'MERGED';
    const fieldLogLevel = props?.fieldLogLevel || appsync.FieldLogLevel.NONE;
    const excludeVerboseContent = props?.excludeVerboseContent || false;
    const xRayEnabled = props?.xRayEnabled || false;

    let mergedApi = new appsync.CfnGraphQLApi(scope, id, {
      apiType: apiType,
      name: mergeAPIname,
      authenticationType: props.cfnGraphQLApiProps!.authenticationType,
      userPoolConfig: props.cfnGraphQLApiProps?.userPoolConfig,
      additionalAuthenticationProviders: [{
        authenticationType: 'AWS_IAM',
      }],
      logConfig: {
        cloudWatchLogsRoleArn: setAppsyncCloudWatchlogsRole(scope, props).roleArn,
        fieldLogLevel: fieldLogLevel,
        excludeVerboseContent: excludeVerboseContent,
      },
      xrayEnabled: xRayEnabled,
      mergedApiExecutionRoleArn: props.mergedApiRole.roleArn,
      ownerContact: props?.cfnGraphQLApiProps!.ownerContact,
    });

    return mergedApi;
  }
}

export function checkAppsyncMergedApiProps(propsObject: AppsyncMergedApiProps | any) {
  let errorMessages = '';
  let errorFound = false;

  if (propsObject.existingMergeApi && propsObject.cfnGraphQLApiProps) {
    errorMessages += 'Error - Either provide existingMergeApi or cfnGraphQLApiProps, but not both.\n';
    errorFound = true;
  }
  if (!propsObject.existingMergeApi && !propsObject.cfnGraphQLApiProps) {
    errorMessages += 'Error - Atleast one is required either existingMergeApi or cfnGraphQLApiProps.\n';
    errorFound = true;
  }

  if (errorFound) {
    throw new Error(errorMessages);
  }
}

/**
 * @internal This is an internal core function and should not be called directly
 * by Solutions Constructs clients.
 * set the merge api role to access source api associations
 *
 * @param AppsyncMergedApiProps The  props to be used by the construct
 * @param mergedAPI app sync graphql api
 * @param mergedApiRole iam role
 * @returns App sync merge api role
 */
export function setMergedApiRole(mergedApiID: String, sourceApiId: String, mergedApiRole: iam.Role ) {
  mergedApiRole.addToPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['appsync:SourceGraphQL',
        'appsync:StartSchemaMerge'],
      resources: [
        'arn:' + Aws.PARTITION + ':appsync:' + Aws.REGION + ':' + Aws.ACCOUNT_ID
           + ':apis/' + sourceApiId + '/*',
        'arn:' + Aws.PARTITION + ':appsync:' + Aws.REGION + ':' + Aws.ACCOUNT_ID + ':apis/' + mergedApiID + '/sourceApiAssociations/*',
        'arn:' + Aws.PARTITION + ':appsync:' + Aws.REGION + ':' + Aws.ACCOUNT_ID + ':apis/' + sourceApiId + '/sourceApiAssociations/*',
      ],
    }),
  );

  return mergedApiRole;
}

function setAppsyncCloudWatchlogsRole(scope: Construct, props: AppsyncMergedApiProps) {
  const appsyncServicePrincipleRole = props.appsyncServicePrincipleRole || 'appsync.amazonaws.com';
  let appsynccloudWatchlogsRole = new iam.Role(scope, 'appsynccloudWatchlogsRole', {
    assumedBy: new iam.ServicePrincipal(appsyncServicePrincipleRole),
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
