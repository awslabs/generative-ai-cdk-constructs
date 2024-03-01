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
import { Construct } from 'constructs';
import {  version } from '../helpers/utils';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Stack } from 'aws-cdk-lib';

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

   lambdaFunctions: lambda.DockerImageFunction[]
   constructorName: string
   constructId: string
}

export class BaseClass extends Construct {

    readonly CONSTRUCT_TRACKING_CODE = 'uksb-1tupboc45';

    //static readonly solutionId = `genai_cdk_${version}/${this.constructor.name}/${id}`;

    stage!: string;

    constructor(scope: Construct, id: string) {
        super(scope, id)    

    }

  public updateEnvSuffix(props: BaseClassProps){
      let stage = '-dev';
      if (props?.stage) {
        stage = props.stage;
      }
      this.stage = stage;
  }

  public updateConstructTrackingCode(props: BaseClassProps,scope: Construct){
      const enableOperationalMetric =
      props.enableOperationalMetric !== undefined && 
      props.enableOperationalMetric !== null ? props.enableOperationalMetric : true;

    if (enableOperationalMetric) {
    
      // iterate props.lambdaFunction array
      const solutionId = `genai_cdk_${version}/${props.constructorName}/${props.constructId}`;
      for(let lambdaFunction of props.lambdaFunctions)
      {
          lambdaFunction.addEnvironment(
              'AWS_SDK_UA_APP_ID', solutionId,
            );
      }
      // ADD unique key in CFN stack
      Stack.of(scope).templateOptions.description =solutionId

    };
  }
  
}  