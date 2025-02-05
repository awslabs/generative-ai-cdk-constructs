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
import { aws_lambda as lambda } from 'aws-cdk-lib';

/**
 * Lambda code for the AWS Bedrock Batch Inference Job.
 *
 * Separated from the main code to only build once.
 */
export class BedrockBatchSfnLambdaCode {
  public static getOrCreate(): lambda.Code {
    if (!BedrockBatchSfnLambdaCode.instance) {
      const lambdaPath = path.join(__dirname, '../../../../lambda/aws-bedrock-batch-stepfn');
      BedrockBatchSfnLambdaCode.instance = lambda.Code.fromDockerBuild(lambdaPath);
    }
    return BedrockBatchSfnLambdaCode.instance;
  }

  private static instance: lambda.Code;
}