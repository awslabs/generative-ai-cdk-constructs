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
import { Stack } from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { version } from '../helpers/utils';


export interface BaseClassProps {
  /**
   * Value will be appended to resources name.
   *
   * @default - _dev
   */
  readonly stage?: string;


  /**
   * Optional.CDK constructs provided collects anonymous operational
   * metrics to help AWS improve the quality and features of the
   * constructs. Data collection is subject to the AWS Privacy Policy
   * (https://aws.amazon.com/privacy/). To opt out of this feature,
   * simply disable it by setting the construct property
   * "enableOperationalMetric" to false for each construct used.
   *
   * @default - true
   */
  readonly enableOperationalMetric?: boolean;

  /**
   * name of the construct.
   *
   */
  readonly constructorName: string;

  /**
   * construct id.
   *
   */
  readonly constructId: string;

  /**
   * Enable observability. Warning: associated cost with the services
   * used. Best practice to enable by default.
   *
   * @default - true
   */
  readonly observability?: boolean;
}

export class BaseClass extends Construct {

  /**
   * construct tracking code, added in template description
   */
  readonly constructTrackingCode = 'uksb-1tupboc45';

  /**
   * Value will be appended to resources name.
   *
   * @default - _dev
   */
  stage!: string;

  /**
   * enable disable lambda tracing
   *
   * @default - Active
   */
  lambdaTracing: lambda.Tracing=lambda.Tracing.ACTIVE;

  /**
   * enable disable xray tracing
   *
   * @default - True
   */
  enablexray: boolean = true;

  /**
   * Default  log config for all constructs
   */
  fieldLogLevel:appsync.FieldLogLevel=appsync.FieldLogLevel.ALL;

  /**
   * Default  log retention config for all constructs
   */
  retention: logs.RetentionDays=logs.RetentionDays.TEN_YEARS;


  constructor(scope: Construct, id: string) {
    super(scope, id);

  }

  //overwrite default env suffix
  protected updateEnvSuffix(props: BaseClassProps) {
    let stage = '-dev';
    if (props?.stage) {
      stage = props.stage;
    }
    this.stage = stage;
  }

  /*
  * If enableOperationalMetric is set to true,
  * update template description with construct tracking code and
  * add AWS_SDK_UA_APP_ID to user agent on aws sdk.
  */
  protected updateConstructTrackingCode(props: BaseClassProps, scope: Construct, lambdaFunctions: lambda.DockerImageFunction[],
  ) {
    const solutionId = `genai_cdk_${version}/${props.constructorName}/${props.constructId}`;

    const enableOperationalMetric =
      props.enableOperationalMetric !== undefined &&
      props.enableOperationalMetric !== null ? props.enableOperationalMetric : true;

    if (enableOperationalMetric) {
      if (lambdaFunctions
          && lambdaFunctions.length > 0) {
        for (let lambdaFunction of lambdaFunctions) {
          lambdaFunction.addEnvironment(
            'AWS_SDK_UA_APP_ID', solutionId,
          );
        }
      }
      // ADD unique key in template description
      // format  (tracking id:usbxxxx) (version:1.xx) (construct name:awsappsyncxxxx) (construct id:awsappsyncxxxx)
      Stack.of(scope).templateOptions.description =`(tracking id:${this.constructTrackingCode}) (version:${version}) (construct name:${props.constructorName}) (construct id:${props.constructId})`;

    };
  }

  // observability
  protected addObservabilityToConstruct(props: BaseClassProps) {
    if (props.observability == false) {
      this.enablexray = false;
      this.lambdaTracing = lambda.Tracing.DISABLED;
      this.fieldLogLevel= appsync.FieldLogLevel.NONE,
      this.retention= logs.RetentionDays.TEN_YEARS;
    };
  }
}