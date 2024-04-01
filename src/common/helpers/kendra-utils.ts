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
import { Construct } from 'constructs';
import { isPlainObject } from './utils';
// https://github.com/webpack/webpack/issues/6584
// eslint-disable-next-line @typescript-eslint/no-require-imports,import/no-extraneous-dependencies
const merge = require('deepmerge');

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
export function consolidateProps(defaultProps: object, clientProps?: object, constructProps?: object, concatArray: boolean = false): any {
  let result: object = defaultProps;

  if (clientProps) {
    result = overrideProps(result, clientProps, concatArray);
  }

  if (constructProps) {
    result = overrideProps(result, constructProps, concatArray);
  }

  return result;
}


export function overrideProps(DefaultProps: object, userProps: object, concatArray: boolean = false): any {
  // Override the sensible defaults with user provided props
  if (concatArray) {
    return merge(DefaultProps, userProps, {
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [...destinationArray, ...sourceArray],
    });
  } else {
    return merge(DefaultProps, userProps, {
      arrayMerge: (_destinationArray: any[], sourceArray: any[]) => sourceArray, // underscore allows arg to be ignored
      isMergeableObject: isPlainObject,
    });
  }
}

export function getStepFnLambdaInvoke(
  cdkStack: Construct,
  id: string,
  lambdaFunction: cdk.aws_lambda.IFunction,
  outputPath = '$.Payload',
): cdk.aws_stepfunctions_tasks.LambdaInvoke {
  return new cdk.aws_stepfunctions_tasks.LambdaInvoke(
    cdkStack,
    id, {
      lambdaFunction,
      // Lambda's result in a field called "status" in the response
      outputPath,
    });
}
