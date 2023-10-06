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
   * appsync service principle role
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
    const fieldLogLevel = props?.fieldLogLevel || 'None';
    const excludeVerboseContent = props?.excludeVerboseContent || false;
    const xRayEnabled = props?.xRayEnabled || false;

    let mergedApi = new appsync.CfnGraphQLApi(scope, id, {
      apiType: apiType,
      name: mergeAPIname,
      authenticationType: props?.cfnGraphQLApiProps!.authenticationType,
      additionalAuthenticationProviders: [getAdditionalAuthenticationMode(props)],
      logConfig: {
        cloudWatchLogsRoleArn: setAppsyncCloudWatchlogsRole(scope, props).roleArn,
        fieldLogLevel: fieldLogLevel,
        excludeVerboseContent: excludeVerboseContent,
      },
      xrayEnabled: xRayEnabled,
      mergedApiExecutionRoleArn: getMergedAPIRole(scope, props).roleArn,
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

  if (errorFound) {
    throw new Error(errorMessages);
  }
}

export function checkAuthenticationTypeProps(props: AppsyncMergedApiProps | any) {

  let errorMessages = '';
  let errorFound = false;

  if (props.cfnGraphQLApiProps.authenticationType == 'AMAZON_COGNITO_USER_POOLS'
    && (!props.cfnGraphQLApiProps.userPoolConfig)) {
    errorMessages += 'Error - User pool config is required for authentication type of cognito user pools.\n';
    errorFound = true;
  } if (props.cfnGraphQLApiProps.authenticationType == 'OPENID_CONNECT'
  && (!props.cfnGraphQLApiProps.openIdConnectConfig)) {
    errorMessages += 'Error - open id config is required for authentication type of open id connect.\n';
    errorFound = true;
  } else if (props.cfnGraphQLApiProps.authenticationType == 'AWS_LAMBDA'
  && (!props.cfnGraphQLApiProps.lambdaAuthorizerConfig)) {
    errorMessages += 'Error - lambda authorizer config is required for authentication type of aws lambda.\n';
    errorFound = true;
  }

  if (errorFound) {
    throw new Error(errorMessages);
  }

}
function getAdditionalAuthenticationMode(props: AppsyncMergedApiProps) {

  if (props?.cfnGraphQLApiProps!.authenticationType == 'AWS_LAMBDA') {
    const additionalAuthenticationMode:
    appsync.CfnGraphQLApi.AdditionalAuthenticationProviderProperty = {
      authenticationType: props?.cfnGraphQLApiProps.authenticationType,
      lambdaAuthorizerConfig: props?.cfnGraphQLApiProps.lambdaAuthorizerConfig,
    };
    return additionalAuthenticationMode;
  } else if (props.cfnGraphQLApiProps!.authenticationType == 'OPENID_CONNECT') {
    const additionalAuthenticationMode:
    appsync.CfnGraphQLApi.AdditionalAuthenticationProviderProperty = {
      authenticationType: props?.cfnGraphQLApiProps!.authenticationType,
      openIdConnectConfig: props?.cfnGraphQLApiProps!.openIdConnectConfig,
    };
    return additionalAuthenticationMode;
  }
  // default authentication type
  const additionalAuthenticationMode:
  appsync.CfnGraphQLApi.AdditionalAuthenticationProviderProperty = {
    authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    userPoolConfig: {
      awsRegion: Aws.REGION,
      userPoolId: props?.userPoolId,
    },
  };
  return additionalAuthenticationMode;

}

function getMergedAPIRole(scope: Construct, props: AppsyncMergedApiProps) {
  return new iam.Role(scope, 'mergedApiRole', {
    assumedBy: new iam.ServicePrincipal(props.appsyncServicePrincipleRole),
  });
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
export function setMergedApiRole(mergedAPI: appsync.CfnGraphQLApi, mergedApiRole: iam.Role ) {
  mergedApiRole.addToPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['appsync:StartSchemaMerge'],
      resources: [
        'arn:aws:appsync:' + Aws.REGION + ':' + Aws.ACCOUNT_ID+ ':apis/'
        + mergedAPI.attrApiId + '/sourceApiAssociations/*',
      ],
    }),
  );

  return mergedApiRole;
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