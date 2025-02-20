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
export interface BdaBlueprintLambdaProps {
  /**
   * The S3 bucket
   * for input data used by the Bedrock Data Automation process.
   * If not provided, a new bucket will be created.
   */
  readonly inputBucket: s3.IBucket;
  /**
   * The layers to apply to this lambda function.
   */
  readonly lambdaLayers: lambda.ILayerVersion[];
}

/**
 * Lambda function that manages BDA blueprint creation
 */
export class BdaBlueprintLambda extends lambda.Function {

  constructor(scope: Construct, id: string, props: BdaBlueprintLambdaProps) {

    const role = new iam.Role(
      scope,
      `${id}createBlueprint`,
      {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      },
    );

    super(scope, id, {

      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-bedrock-data-automation/create-blueprint')),
      layers: props.lambdaLayers,
      environment: {
        INPUT_BUCKET: props.inputBucket.bucketName,
        POWERTOOLS_SERVICE_NAME: 'BEDROCK_BLUEPRINT',
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

    role.attachInlinePolicy(cloudwatchLogsPolicy);

    // Permissions for BDA
    const bedrockLGUDBDAPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'bedrock:ListBlueprints',
        'bedrock:DeleteBlueprint',
        'bedrock:InvokeBlueprint',
        'bedrock:ListBlueprintInvocations',
        'bedrock:GetBlueprintInvocation',
      ],
      resources: [
        `arn:aws:bedrock:${Aws.REGION}:${Aws.ACCOUNT_ID}:blueprint/*`,
      ],
    });

    role.addToPolicy(bedrockLGUDBDAPolicy);

    const bedrockCPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'bedrock:CreateBlueprint',
        'bedrock:CreateBlueprintVersion',
      ],
      resources: [
        '*',
      ],
    });

    role.addToPolicy(bedrockCPolicy);

    // Give Lambda access to the bucket
    if (this.role) {
      props.inputBucket.grantRead(this.role);
    }
  }
}