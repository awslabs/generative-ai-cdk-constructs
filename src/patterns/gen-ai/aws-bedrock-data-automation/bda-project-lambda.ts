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
import { Construct } from 'constructs';

/**
 * Properties for creating a BdaProjectLambdaProps
 */
export interface BdaProjectLambdaProps {
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
 * Lambda function that manages BDA project creation
 */
export class BdaProjectLambda extends lambda.Function {

  constructor(scope: Construct, id: string, props: BdaProjectLambdaProps) {

    const role = new iam.Role(
      scope,
      `${id}createProject`,
      {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      },
    );

    super(scope, id, {

      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-bedrock-data-automation/create_project')),
      layers: props.lambdaLayers,
      environment: {
        INPUT_BUCKET: props.inputBucket.bucketName,
        POWERTOOLS_SERVICE_NAME: 'BEDROCK_PROJECT',
      },
      memorySize: 1024,
      role: role,
      architecture: lambda.Architecture.X86_64,
      timeout: Duration.minutes(15),
    });

    // Add basic permissions for CloudWatch logs
    role.attachInlinePolicy(new iam.Policy(
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
    ));

    // Permissions for BDA
    const bedrockBDAPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'bedrock:CreateBlueprint',
        'bedrock:ListBlueprints',
        'bedrock:DeleteBlueprint',
        'bedrock:InvokeBlueprint',
        'bedrock:ListBlueprintInvocations',
        'bedrock:GetBlueprintInvocation',
        'bedrock:InvokeDataAutomationAsync',
        'bedrock:CreateDataAutomationProject',
        'bedrock:GetDataAutomationStatus',
        'bedrock:ListDataAutomationProjects',
        'bedrock:DeleteDataAutomationProject',
        'bedrock:ListDataAutomationBlueprintInvocations',
        'bedrock:GetDataAutomationBlueprintInvocation',
        'bedrock:GetDataAutomationProject',

      ],
      resources: ['*'],
    });

    role.addToPolicy(bedrockBDAPolicy);

    // Give Lambda access to the bucket
    if (this.role) {
      props.inputBucket.grantReadWrite(this.role);
    }
  }
}