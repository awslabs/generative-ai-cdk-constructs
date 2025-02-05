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
  aws_iam as iam,
  aws_s3 as s3,
  aws_stepfunctions as sfn,
  aws_stepfunctions_tasks as tasks,
  Duration,
  Stack,
} from 'aws-cdk-lib';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { BedrockInferenceJobEventHandler } from './bedrock-inference-job-event-handler';
import { CreateModelInvocationJobFunction } from './create-model-invocation-job-function';


export interface BedrockBatchSfnProps {
  /**
   * The S3 bucket where the Bedrock Batch Inference Job gets the input manifests.
   */
  readonly bedrockBatchInputBucket: s3.IBucket;
  /**
   * The S3 bucket where the Bedrock Batch Inference Job stores the output.
   */
  readonly bedrockBatchOutputBucket: s3.IBucket;
  /**
   * IAM policy used for Bedrock batch processing
   *
   * The policy must have the following permissions for the models and inference profiles you plan to use:
   * - bedrock:InvokeModel
   * - bedrock:CreateModelInvocationJob
   *
   * @default
   * const bedrockBatchPolicy = new iam.ManagedPolicy(this, 'BedrockBatchPolicy', {
   *         statements: [
   *           new iam.PolicyStatement({
   *             sid: 'Inference',
   *             actions: ['bedrock:InvokeModel', 'bedrock:CreateModelInvocationJob'],
   *             resources: [
   *               'arn:aws:bedrock:*::foundation-model/*',
   *               Stack.of(this).formatArn({
   *                 service: 'bedrock',
   *                 resource: 'inference-profile',
   *                 resourceName: '*',
   *               }),
   *             ],
   *           }),
   *         ],
   *       });
   */
  readonly bedrockBatchPolicy?: iam.IManagedPolicy;
  /**
   * The timeout duration for the batch inference job.
   * Must be between 24 hours and 1 week (168 hours).
   *
   * @default Duration.hours(48)
   */
  readonly timeout?: Duration;
  /**
   * JSONPath expression to select part of the state to be the input to this state.
   * May also be the special value JsonPath. DISCARD, which will cause the effective input to be the empty object {}.
   *
   * Input schema:
   * ```
   * {
   *   "job_name": string,        // Required. Name of the batch inference job
   *   "manifest_keys": string[],    // Required. List of S3 keys of the input manifest files
   *   "model_id": string        // Required. Model ID to use.
   * }
   * ```
   *
   * @default The entire task input (JSON path '$')
   */
  readonly inputPath?: string;
  /**
   * JSONPath expression to indicate where to inject the state's output
   * May also be the special value JsonPath. DISCARD, which will cause the state's input to become its output.
   *
   * Output schema:
   * ```
   * {
   *   "status": string,        // Required. Status of the batch job. One of: "Completed" or "PartiallyCompleted"
   *   "bucket": string,        // Required. S3 bucket where the output is stored
   *   "keys": string[]         // Required. Array of S3 keys for the output files
   * }
   * ```
   *
   * @default Replaces the entire input with the result (JSON path '$')
   */
  readonly resultPath?: string;
}

/**
 * A state machine fragment that creates a Bedrock Batch Inference Job and waits for its completion.
 *
 * Input schema:
 * ```
 * {
 *   "job_name": string,        // Required. Name of the batch inference job
 *   "manifest_keys": string[],    // Required. List of S3 keys of the input manifest files
 *   "model_id": string        // Required. Model ID to use.
 * }
 * ```
 *
 * Output schema:
 * ```
 * {
 *   "status": string,        // Required. Status of the batch job. One of: "Completed" or "PartiallyCompleted"
 *   "bucket": string,        // Required. S3 bucket where the output is stored
 *   "keys": string[]         // Required. Array of S3 keys for the output files
 * }
 * ```
 *
 * Error schema:
 * ```
 * {
 *   "status": string,        // Required. Status will be one of: "Failed", "Stopped", or "Expired"
 *   "error": string,         // Required. Error code
 *   "cause": string          // Required. Error message
 * }
 * ```
 */
export class BedrockBatchSfn extends sfn.StateMachineFragment {
  readonly endStates: sfn.INextable[];
  readonly startState: sfn.State;

  constructor(parent: Construct, id: string, props: BedrockBatchSfnProps) {
    super(parent, id);

    if (props.timeout && (props.timeout.toHours() < 24 || props.timeout.toHours() > 168)) {
      throw new Error('Timeout must be between 24 hours and 1 week (168 hours).');
    }

    const batchJobEventHandler = BedrockInferenceJobEventHandler.getOrCreate(this);
    props.bedrockBatchOutputBucket.grantRead(batchJobEventHandler);

    const bedrockBatchRole = new iam.Role(this, 'BedrockBatchRole', {
      assumedBy: new iam.ServicePrincipal('bedrock.amazonaws.com'),
    });

    let bedrockBatchPolicy: iam.IManagedPolicy;
    if (props.bedrockBatchPolicy) {
      bedrockBatchRole.addManagedPolicy(props.bedrockBatchPolicy);
      bedrockBatchPolicy = props.bedrockBatchPolicy;
    } else {
      bedrockBatchPolicy = new iam.ManagedPolicy(this, 'BedrockBatchPolicy', {
        statements: [
          new iam.PolicyStatement({
            sid: 'Inference',
            actions: ['bedrock:InvokeModel', 'bedrock:CreateModelInvocationJob'],
            resources: [
              'arn:aws:bedrock:*::foundation-model/*',
              Stack.of(this).formatArn({
                service: 'bedrock',
                resource: 'inference-profile',
                resourceName: '*',
              }),
            ],
          }),
        ],
      });

      if (bedrockBatchPolicy instanceof iam.ManagedPolicy) {
        NagSuppressions.addResourceSuppressions(
          bedrockBatchPolicy,
          [
            {
              id: 'AwsSolutions-IAM5',
              reason: 'Wildcards allow Bedrock inference and model invocation jobs.',
            },
          ],
          true,
        );
      }
      bedrockBatchRole.addManagedPolicy(bedrockBatchPolicy);


    }

    bedrockBatchRole.assumeRolePolicy?.addStatements(
      new iam.PolicyStatement({
        principals: [new iam.ServicePrincipal('bedrock.amazonaws.com')],
        actions: ['sts:AssumeRole'],
        conditions: {
          StringEquals: {
            'aws:SourceAccount': Stack.of(this).account,
          },
          ArnLike: {
            'aws:SourceArn': Stack.of(this).formatArn({
              service: 'bedrock',
              resource: 'model-invocation-job',
              resourceName: '*',
            }),
          },
        },
      }),
    );

    props.bedrockBatchInputBucket.grantRead(bedrockBatchRole);
    props.bedrockBatchOutputBucket.grantReadWrite(bedrockBatchRole);

    NagSuppressions.addResourceSuppressions(
      this,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason:
            'This role has wildcards so any Bedrock model invocation job can work with any bedrock foundation model ' +
            'and read and write any object in a specific S3 bucket.',
        },
      ],
      true,
    );

    const createModelInvocationJobFunction =
      new CreateModelInvocationJobFunction(
        this,
        'CreateModelInvocationJobFunction',
        {
          bedrockBatchPolicy: bedrockBatchPolicy,
        },
      );
    bedrockBatchRole.grantPassRole(createModelInvocationJobFunction.role!);

    const createModelInvocationJobTask = new tasks.LambdaInvoke(
      this,
      'CreateModelInvocationJobTask',
      {
        lambdaFunction: createModelInvocationJobFunction,
        integrationPattern: sfn.IntegrationPattern.WAIT_FOR_TASK_TOKEN,
        heartbeatTimeout: sfn.Timeout.duration(props.timeout ? props.timeout : Duration.hours(48)),
        payload: sfn.TaskInput.fromObject({
          jobName: sfn.JsonPath.format(
            '{}{}',
            sfn.JsonPath.stringAt('$.job_name'),
            sfn.JsonPath.stringAt('$.index'),
          ),
          roleArn: bedrockBatchRole.roleArn,
          modelId: sfn.JsonPath.stringAt('$.model_id'),
          inputDataConfig: {
            s3InputDataConfig: {
              s3Uri: sfn.JsonPath.format(
                's3://' + props.bedrockBatchInputBucket.bucketName + '/{}',
                sfn.JsonPath.stringAt('$.manifest_key'),
              ),
            },
          },
          outputDataConfig: {
            s3OutputDataConfig: {
              s3Uri: sfn.JsonPath.format(
                's3://' + props.bedrockBatchOutputBucket.bucketName + '/output/{}/',
                sfn.JsonPath.stringAt('$.job_name'),
              ),
            },
          },
          timeoutDurationInHours: props.timeout ? props.timeout.toHours() : 48,
          TaskToken: sfn.JsonPath.stringAt('$$.Task.Token'),
        }),
      },
    );

    const batchEvaluateMap = new sfn.Map(this, 'BatchEvaluateMap', {
      inputPath: props.inputPath,
      itemsPath: sfn.JsonPath.stringAt('$.manifest_keys'),
      itemSelector: {
        job_name: sfn.JsonPath.stringAt('$.job_name'),
        model_id: sfn.JsonPath.stringAt('$.model_id'),
        index: sfn.JsonPath.numberAt('$$.Map.Item.Index'),
        manifest_key: sfn.JsonPath.stringAt('$$.Map.Item.Value'),
      },
      resultPath: props.resultPath,
    });
    batchEvaluateMap.itemProcessor(createModelInvocationJobTask);

    this.startState = batchEvaluateMap;
    this.endStates = batchEvaluateMap.endStates;

  }
}