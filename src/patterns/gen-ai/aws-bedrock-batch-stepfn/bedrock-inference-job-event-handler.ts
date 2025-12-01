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

import {
  aws_events as events,
  aws_events_targets as targets,
  aws_iam as iam,
  aws_lambda as lambda,
  Duration,
  Stack,
} from 'aws-cdk-lib';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { BedrockBatchSfnLambdaCode } from './bedrock-batch-sfn-lambda-code';

/**
 * EventBridge Rule and Lambda function which handles events from Bedrock Batch Inference Job
 * and reports success or failure to Step Functions.
 */
export class BedrockInferenceJobEventHandler extends Construct implements iam.IGrantable {
  public static getOrCreate(scope: Construct): BedrockInferenceJobEventHandler {
    if (!BedrockInferenceJobEventHandler.instance) {
      const uniqueId = 'BedrockInferenceJobEventHandler330899f022e34160002006bb8b09cc5b'; // md5 sum of "BedrockInferenceJobEventHandler"
      BedrockInferenceJobEventHandler.instance = new BedrockInferenceJobEventHandler(Stack.of(scope), uniqueId);
    }
    return BedrockInferenceJobEventHandler.instance;
  }

  private static instance: BedrockInferenceJobEventHandler;

  public readonly grantPrincipal: iam.IPrincipal;

  private constructor(
    scope: Construct,
    id: string,
  ) {
    super(scope, id);
    const eventHandlerLambda = new lambda.Function(
      this,
      'BedrockEventHandler',
      {
        code: BedrockBatchSfnLambdaCode.getOrCreate(),
        handler: 'aws_bedrock_batch_sfn.bedrock_inference_job_event.handler',
        timeout: Duration.seconds(60),
        memorySize: 128,
        runtime: lambda.Runtime.PYTHON_3_13,
        architecture: lambda.Architecture.ARM_64,
      },
    );

    eventHandlerLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          'bedrock:ListTagsForResource',
          'bedrock:GetModelInvocationJob',
        ],
        resources: [
          Stack.of(this).formatArn({
            service: 'bedrock',
            resource: 'model-invocation-job',
            resourceName: '*',
          }),
        ],
      }),
    );
    eventHandlerLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['states:SendTaskSuccess', 'states:SendTaskFailure'],
        resources: ['*'],
      }),
    );
    this.grantPrincipal = eventHandlerLambda.grantPrincipal;

    NagSuppressions.addResourceSuppressions(
      eventHandlerLambda,
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
          reason: `Wildcards to read any object in the Bedrock Batch S3 bucket, get tags and details of any Bedrock
            batch inference jobs, and report success or failure of tasks to Step Functions which doesn't allow resource
            restriction.`,
        },
        {
          id: 'AwsSolutions-L1',
          reason: 'Python 3.13 is the latest stable runtime version available.',
        },
      ],
      true,
    );

    new events.Rule(this, 'BedrockInferenceJobEventHandler', {
      eventPattern: {
        source: ['aws.bedrock'],
        detailType: ['Batch Inference Job State Change'],
        detail: {
          status: ['Completed', 'PartiallyCompleted', 'Failed', 'Expired', 'Stopped'],
        },
      },
      targets: [new targets.LambdaFunction(eventHandlerLambda, {})],
    });
  }
}
