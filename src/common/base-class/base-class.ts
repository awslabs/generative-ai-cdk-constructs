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
import { ConstructName } from './construct-name-enum';
import { version } from '../helpers/utils';


export interface BaseClassProps {
  /**
   * Value will be appended to resources name.
   *
   * @default - _dev
   */
  readonly stage?: string;

  /**
   * name of the construct.
   *
   */
  readonly constructName: ConstructName;

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
   * Record<string, number> , maps construct name with number of deployments
   */
  protected static usageMetricMap : Record<string, number> ={
    [ConstructName.AWSRAGAPPSYNCSTEPFNOPENSEARCH]: 0,
    [ConstructName.AWSQAAPPSYNCOPENSEARCH]: 0,
    [ConstructName.AWSSUMMARIZATIONAPPSYNCSTEPFN]: 0,
    [ConstructName.AWSMODELDEPLOYMENTSAGEMAKER]: 0,
    [ConstructName.CUSTOMSAGEMAKERENDPOINT]: 0,
    [ConstructName.HUGGINGFACESAGEMAKERENDPOINT]: 0,
    [ConstructName.JUMPSTARTSAGEMAKERENDPOINT]: 0,
    [ConstructName.AWSCONTENTGENAPPSYNCLAMBDA]: 0,
  };


  /**
   * construct usage metric , added in template description
   */
  readonly constructUsageMetric = 'uksb-1tupboc45';

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
  * update template description with construct usage metric and
  * add AWS_SDK_UA_APP_ID to user agent on aws sdk.
  */
  protected updateConstructUsageMetricCode(props: BaseClassProps, scope: Construct, lambdaFunctions: lambda.DockerImageFunction[],
  ) {
    const solutionId = `genai_cdk_${version}/${props.constructName}/${props.constructId}`;

    if (lambdaFunctions
        && lambdaFunctions.length > 0) {
      for (let lambdaFunction of lambdaFunctions) {
        lambdaFunction.addEnvironment(
          'AWS_SDK_UA_APP_ID', solutionId,
        );
      }
    }

    if (props && BaseClass.usageMetricMap.hasOwnProperty(props.constructName)) {
      BaseClass.usageMetricMap[props.constructName]=BaseClass.usageMetricMap[props.constructName]+1;
    } else {
      throw Error('construct name is not present in usageMetricMap ');
    }

    const usageMetricMapSerialized = JSON.stringify(BaseClass.usageMetricMap).replace(/[{}]/g, '').replace(/"/g, '');

    // Description format :(usage id :uksb-1tupboc45)(version:0.0.0) (constructs :::{\"C1\":1,\"C2\":5,\"C3\":3,\"C4\":0,\"C5\":0,\"C6\":0,\"C7\":0,\"C8\":0}) ",
    // where C1,C2, etc are mapped with construct-name-enum and the values shows the number of time stack created/deleted.
    Stack.of(scope).templateOptions.description =
    `Description: (${this.constructUsageMetric}) (version:${version}) (tag:${ usageMetricMapSerialized}) `;

  }

  // observability
  protected addObservabilityToConstruct(props: BaseClassProps) {
    if (props.observability == false) {
      this.enablexray = false;
      this.lambdaTracing = lambda.Tracing.DISABLED;
      this.fieldLogLevel= appsync.FieldLogLevel.NONE;
      this.retention= logs.RetentionDays.TEN_YEARS;
    };
  }
}
