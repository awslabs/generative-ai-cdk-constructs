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

import * as path from 'path';
import { aws_iam as iam, aws_lambda as lambda, Duration, Aws } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';

/**
 * Properties for creating a BdaBlueprintLambda
 */
export interface BdaDataProcessingLambdaProps {
  /**
   * The S3 bucket
   * for input data used by the Bedrock Data Automation process.
   * If not provided, a new bucket will be created.
   */
  readonly inputBucket: s3.IBucket;
  /**
   * The S3 bucket
   * for input data used by the Bedrock Data Automation process.
   * If not provided, a new bucket will be created.
   */
  readonly outputBucket: s3.IBucket;
  /**
   * The layers to apply to this lambda function.
   */
  readonly lambdaLayers: lambda.ILayerVersion[];
}

/**
 * Lambda function that manages BDA data processing
 */
export class BdaDataProcessingLambda extends lambda.Function {

  constructor(scope: Construct, id: string, props: BdaDataProcessingLambdaProps) {

    const role = new iam.Role(
      scope,
      `${id}createDataProcessing`,
      {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      },
    );

    super(scope, id, {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'lambda.handler', // Adjust this based on your actual handler
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-bedrock-data-automation/data_processing')),
      layers: props.lambdaLayers,
      environment: {
        INPUT_BUCKET: props.inputBucket.bucketName,
        OUTPUT_BUCKET: props.outputBucket.bucketName,
        OUTPUT_FILENAME: '',
        POWERTOOLS_SERVICE_NAME: 'BEDROCK_INVOKE',
      },
      memorySize: 1024,
      role: role,
      architecture: lambda.Architecture.X86_64,
      timeout: Duration.minutes(15),
    });

    // Add basic permissions for CloudWatch logs
    const cloudwatchLogsPolicy = new iam.Policy(
      scope,
      `${id}LambdaBasicExecPolicy`,
      {
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
              'logs:CreateLogGroup',
              'logs:CreateLogStream',
              'logs:PutLogEvents',
            ],
            resources: [
              `arn:aws:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/${this.functionName}`,
              `arn:aws:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/${this.functionName}:*`,
            ],
          }),
        ],
      },
    );

    NagSuppressions.addResourceSuppressions(
      cloudwatchLogsPolicy,
      [{ id: 'AwsSolutions-IAM5', reason: 'Lambda requires CloudWatch logs permissions with log group name patterns' }],
    );

    // Permissions for BDA
    const bedrockBDAPolicy = new iam.Policy(
      scope,
      `${id}BedrockBDAProcessingPolicy`,
      {
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
              'bedrock:InvokeDataAutomationAsync',
            ],
            resources: ['*'],
          }),
        ],
      },
    );

    NagSuppressions.addResourceSuppressions(
      bedrockBDAPolicy,
      [{
        id: 'AwsSolutions-IAM5',
        reason: 'Invocation Lambda needs access for data processing operations',
      }],
      true,
    );

    role.attachInlinePolicy(bedrockBDAPolicy);

    // Give Lambda access to the buckets
    if (this.role) {
      props.inputBucket.grantReadWrite(this.role);
      props.outputBucket.grantReadWrite(this.role);
    }


    NagSuppressions.addResourceSuppressions(
      role,
      [{
        id: 'AwsSolutions-IAM5',
        reason: 'Lambda needs read access to process files from the input bucket',
      }],
      true,
    );
  }
}