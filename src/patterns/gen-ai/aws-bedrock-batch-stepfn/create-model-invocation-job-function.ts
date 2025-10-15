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

import { aws_iam as iam, aws_lambda as lambda, Duration, Stack } from 'aws-cdk-lib';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { BedrockBatchSfnLambdaCode } from './bedrock-batch-sfn-lambda-code';

/**
 * Properties for creating a CreateModelInvocationJobFunction
 */
export interface CreateModelInvocationJobFunctionProps {
  /**
   * IAM Policy used for Bedrock batch processing
   */
  readonly bedrockBatchPolicy: iam.IManagedPolicy;
}

/**
 * Lambda function that creates Bedrock model invocation jobs for a Step Functions wait for callback task
 */
export class CreateModelInvocationJobFunction extends lambda.Function {
  constructor(
    scope: Construct,
    id: string,
    props: CreateModelInvocationJobFunctionProps,
  ) {
    super(scope, id, {
      code: BedrockBatchSfnLambdaCode.getOrCreate(),
      handler:
        'aws_bedrock_batch_sfn.bedrock_create_model_invocation_job.handler',
      runtime: lambda.Runtime.PYTHON_3_13,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 128,
      timeout: Duration.seconds(30),
    });

    this.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['bedrock:CreateModelInvocationJob', 'bedrock:TagResource'],
        resources: [
          Stack.of(this).formatArn({
            service: 'bedrock',
            resource: 'model-invocation-job',
            resourceName: '*',
          }),
        ],
      }),
    );

    this.role?.addManagedPolicy(props.bedrockBatchPolicy);

    NagSuppressions.addResourceSuppressions(
      this,
      [
        {
          id: 'AwsSolutions-IAM4',
          reason: 'Allow the use of AWS Managed Policies for Lambda execution.',
          appliesTo: [
            'Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
          ],
        },
        {
          id: 'AwsSolutions-IAM5',
          reason: 'Wildcards allow create of Bedrock model invocation jobs.',
        },
      ],
      true,
    );
  }
}

