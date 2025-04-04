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
import { PythonLayerVersion } from '@aws-cdk/aws-lambda-python-alpha';
import * as cdk from 'aws-cdk-lib';
import { Aws } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { md5hash } from 'aws-cdk-lib/core/lib/helpers-internal';
import { Construct } from 'constructs';
import { BdaBlueprintLambda } from './bda-blueprint-lambda';
import { BdaDataProcessingLambda } from './bda-data-processing-lambda';
import { BdaProjectLambda } from './bda-project-lambda';
import { BdaResultsambda } from './bda-results-lambda';
import { BaseClass } from '../../../common/base-class';

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a CDK BDA construct.
 */
export interface BedrockDataAutomationProps {
  /**
   * - Optional. The S3 bucket
   * for input data used by the Bedrock Data Automation process.
   * If not provided, a new bucket will be created.
   */
  readonly inputBucket?: s3.IBucket;
  /**
   * - Optional. The S3 bucket for storing
   * output files generated by the Bedrock Data Automation process.
   */
  readonly outputBucket?: s3.IBucket;
  /**
   * - Optional. Indicates whether a custom
   * Bedrock Data Automation blueprint is required. If true, the necessary resources will be created.
   *
   * @default - false
   */
  readonly isCustomBDABlueprintRequired?: boolean;
  /**
   * - Optional. Indicates whether a Bedrock Data
   * Automation project is required. If true, the necessary resources will be created.
   *
   * @default - false
   */
  readonly isBDAProjectRequired?: boolean;
  /**
   * - Optional. Indicates whether a Bedrock Data
   * Automation invocation is required. If true, the necessary resources will be created.
   *
   * @default - false
   */
  readonly isBDAInvocationRequired?: boolean;
  /**
   * - Optional. Indicates whether the status of the
   * Bedrock Data Automation process is required. If true, the necessary resources will be created.
   *
   * @default - false
   */
  readonly isStatusRequired?: boolean;
};

/******************************************************************************
 *                        NEW CONSTRUCT DEFINITION
 *****************************************************************************/
/**
 * Class to create a BDA pattern with CDK.
 */
export class BedrockDataAutomation extends BaseClass {
  // ------------------------------------------------------
  // Attributes
  // ------------------------------------------------------
  /**
   * The S3 bucket for input data used by the Bedrock Data Automation process.
   * IMPORTANT: If isCustomBDABlueprintRequired or isBDAInvocationRequired are set to false in Pattern Construct Props,
   * this property will be undefined
   */
  public readonly bdaInputBucket?: s3.IBucket;
  /**
   * The S3 bucket for output data generated by the Bedrock Data Automation process.
   * IMPORTANT: If isBDAInvocationRequired is set to false in Pattern Construct Props,
   * this property will be undefined
   */
  public readonly bdaOutputBucket?: s3.IBucket;
  /**
   * The Lambda function responsible for creating the Bedrock Data Automation blueprint.
   * IMPORTANT: If isCustomBDABlueprintRequired is set to false in Pattern Construct Props,
   * this property will be undefined
   */
  public readonly bdaBlueprintLambdaFunction?: lambda.Function;
  /**
   * The Lambda function responsible for handling the Bedrock Data Automation project.
   * IMPORTANT: If isBDAProjectRequired is set to false in Pattern Construct Props,
   * this property will be undefined
   */
  public readonly bdaProjectFunction?: lambda.Function;
  /**
   * The Lambda function responsible for invoking the Bedrock Data Automation process.
   * IMPORTANT: If isBDAInvocationRequired is set to false in Pattern Construct Props,
   * this property will be undefined
   */
  public readonly bdaInvocationFunction?: lambda.Function;
  /**
   * The Lambda function responsible for checking the status of the Bedrock Data Automation process.
   * IMPORTANT: If isStatusRequired is set to false in Pattern Construct Props,
   * this property will be undefined
   */
  public readonly bdaResultStatusFunction?: lambda.Function;
  /**
   * The AWS Lambda Powertools layer used in the Lambda functions.
   */
  public readonly powertoolsLayer: lambda.ILayerVersion;
  /**
   * The Boto3 layer used in the Lambda functions for AWS SDK interactions.
   */
  public readonly boto3Layer: lambda.LayerVersion;
  // ------------------------------------------------------
  // CONSTRUCTOR
  // ------------------------------------------------------
  constructor(scope: Construct, id: string, props: BedrockDataAutomationProps) {
    super(scope, id);

    // ------------------------------------------------------
    // Set properties and defaults
    // ------------------------------------------------------
    this.powertoolsLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'PowertoolsLayer',
      `arn:aws:lambda:${cdk.Stack.of(this).region}:017000801446:layer:AWSLambdaPowertoolsPythonV3-python313-x86_64:8`,
    );

    this.boto3Layer = new PythonLayerVersion(this, 'Boto3Layer', {
      entry: path.join(__dirname, '../../../../layer'),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_13],
      description: 'Latest boto3 layer for Bedrock Data Automation',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Compute hash used for bucket name
    const hash = md5hash(id + Aws.ACCOUNT_ID + Aws.REGION);

    // Manage input bucket if needed
    if (props.isCustomBDABlueprintRequired || props.isBDAInvocationRequired) {this.bdaInputBucket = this.handleS3Bucket(props.inputBucket, 'input', hash);}

    // Manage output bucket if needed
    if (props.isCustomBDABlueprintRequired || props.isBDAInvocationRequired) {this.bdaOutputBucket = this.handleS3Bucket(props.outputBucket, 'output', hash);}

    if (props.isCustomBDABlueprintRequired && this.bdaInputBucket) {
      this.bdaBlueprintLambdaFunction = new BdaBlueprintLambda(this, 'bdablueprintlambda', {
        inputBucket: this.bdaInputBucket,
        lambdaLayers: [this.powertoolsLayer, this.boto3Layer],
      });
    }
    if (props.isBDAProjectRequired && this.bdaInputBucket) {
      this.bdaProjectFunction = new BdaProjectLambda(this, 'bdaprojectlambda', {
        inputBucket: this.bdaInputBucket,
        lambdaLayers: [this.powertoolsLayer, this.boto3Layer],
      });
    }
    if (props.isBDAInvocationRequired && this.bdaInputBucket && this.bdaOutputBucket) {
      this.bdaInvocationFunction = new BdaDataProcessingLambda(this, 'bdainvocationlambda', {
        inputBucket: this.bdaInputBucket,
        outputBucket: this.bdaOutputBucket,
        lambdaLayers: [this.powertoolsLayer, this.boto3Layer],
      });
    }
    if (props.isStatusRequired && this.bdaOutputBucket) {
      this.bdaResultStatusFunction = new BdaResultsambda(this, 'bdaresultslambda', {
        lambdaLayers: [this.powertoolsLayer, this.boto3Layer],
        outputBucket: this.bdaOutputBucket,
      });
    }
  }

  /**
   * Handles the creation or retrieval of an S3 bucket.
   *
   * @param existing_bucket - An optional existing S3 bucket to use.
   * @param type - A string indicating the type of bucket (e.g., 'input' or 'output').
   * @returns The existing bucket if provided, or a newly created S3 bucket.
   */
  private handleS3Bucket(existing_bucket: s3.IBucket | undefined, type: string, hash: string): s3.IBucket {

    if (existing_bucket) {
      return existing_bucket;
    } else {
      // bucket for storing server access logging
      const serverAccessLogBucket = new s3.Bucket(
        this,
        `${hash}-${type}-serveraccesslogbucket`,
        {
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          enforceSSL: true,
          versioned: true,
          lifecycleRules: [
            {
              expiration: cdk.Duration.days(90),
            },
          ],
        },
      );

      // create the bucket
      return new s3.Bucket(this, `${hash}-${type}-bucket`, {
        encryption: s3.BucketEncryption.S3_MANAGED,
        enforceSSL: true,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        versioned: true,
        serverAccessLogsBucket: serverAccessLogBucket,
        serverAccessLogsPrefix: `${type}-bucket-logs/`,
        objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        cors: [
          {
            allowedMethods: [
              s3.HttpMethods.GET,
              s3.HttpMethods.POST,
              s3.HttpMethods.PUT,
              s3.HttpMethods.DELETE,
            ],
            allowedOrigins: ['*'],
            allowedHeaders: ['*'],
            exposedHeaders: ['x-amz-server-side-encryption',
              'x-amz-request-id',
              'x-amz-id-2',
              'ETag',
              'Content-Type',
              'Content-Disposition',
              'Access-Control-Allow-Origin'],
          },
        ],
      });
    }
  }
}
