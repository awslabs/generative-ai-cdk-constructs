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
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { BaseClass } from '../../../common/base-class';

export enum BlueprintStage {
  DEVELOPMENT = 'DEVELOPMENT',
  LIVE = 'LIVE'
}

export enum ResourceType {
  DOCUMENT = 'DOCUMENT',
  IMAGE = 'IMAGE'
}


/**
   * Properties for CustomBlueprint
   */
export interface BedrockDataAutomationProps {
  /**
       * Optional. Name of the bucket for uploading blueprint schema file
       */
  readonly inputBucketName?: string;

  readonly isCustomBDABlueprintRequired?: boolean;

  readonly isBDAProjectRequired?: boolean;

  readonly isBDAInvocationRequired?: boolean;

  readonly isStatusRequired?: boolean;

  readonly outputBucketName?: string;
  readonly outputFilename?: string;


};


export class BedrockDataAutomation extends BaseClass {

  private readonly scope: Construct;
  private readonly props: BedrockDataAutomationProps;
  private bdaInputBucket!: s3.IBucket;
  private bdaOutputBucket!: s3.IBucket;
  private bdaBlueprintLambdaFunction!: lambda.Function;
  private bdaProjectFunction!: lambda.Function;
  private bdaInvocationFunction!: lambda.Function;
  private bdaResultStatusFunction!: lambda.Function;

  private powertoolsLayer: lambda.ILayerVersion;
  private boto3Layer: lambda.LayerVersion;


  public get inputBucket(): s3.IBucket {
    return this.bdaInputBucket;
  }

  public get outputBucket(): s3.IBucket {
    return this.bdaOutputBucket;
  }

  public get blueprintLambdaFunction(): lambda.Function {
    return this.bdaBlueprintLambdaFunction;
  }

  public get bdaProjectLambdaFunction(): lambda.Function {
    return this.bdaProjectFunction;
  }

  public get bdaInvocationLambdaFunction(): lambda.Function {
    return this.bdaInvocationFunction;
  }

  public get bdaResultStatuLambdaFunction(): lambda.Function {
    return this.bdaResultStatusFunction;
  }


  constructor(scope: Construct, id: string, props: BedrockDataAutomationProps) {
    super(scope, id);
    this.scope = scope;
    this.props = props;
    this.powertoolsLayer = lambda.LayerVersion.fromLayerVersionArn(this.scope, 'PowertoolsLayer',
      `arn:aws:lambda:${cdk.Stack.of(this).region}:017000801446:layer:AWSLambdaPowertoolsPythonV3-python312-x86_64:8`,
    );

    this.boto3Layer = new lambda.LayerVersion(this, 'Boto3Layer', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../layer'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_12.bundlingImage,
          command: [
            'bash', '-c',
            'pip install boto3==1.36.14 botocore==1.36.14 -t /asset-output/python',
          ],
          user: 'root',
        },
      }),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_12],
      description: 'Latest boto3 layer for Bedrock Data Automation',
    });

    this.createResources(id);
  }


  private createResources(id: string) {

    if (this.props.isCustomBDABlueprintRequired === true) {
      this.createBlueprintResources(id);
    }
    if (this.props.isBDAProjectRequired === true) {
      this.createBDAProjectResources();
    }
    if (this.props.isBDAInvocationRequired === true) {
      this.createInvocationResources(id);
    }
    if (this.props.isStatusRequired === true) {
      this.createResultStatus();
    }

  }

  private createBlueprintResources(id: string) {
    // Create input bucket if not provided
    if (!this.props.inputBucketName ) {
      if ( !this.bdaInputBucket) {
        const accessLogsBucket = new s3.Bucket(this, 'bdaInputAccessLogs', {
          encryption: s3.BucketEncryption.S3_MANAGED,
          enforceSSL: true,
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          versioned: true,
          objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
          removalPolicy: cdk.RemovalPolicy.DESTROY,
          autoDeleteObjects: true,
        });

        this.bdaInputBucket = new s3.Bucket(this.scope, 'bdaInputbucket', {
          bucketName: `${id}-input-documents`,
          encryption: s3.BucketEncryption.S3_MANAGED,
          enforceSSL: true,
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          versioned: true,
          serverAccessLogsBucket: accessLogsBucket,
          serverAccessLogsPrefix: 'input-bucket-logs/',
          objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
          removalPolicy: cdk.RemovalPolicy.DESTROY,
          autoDeleteObjects: true,
        });
      }

    } else {
      this.bdaInputBucket = s3.Bucket.fromBucketName(
        this.scope,
        'ImportedInputBucket',
        this.props.inputBucketName,
      );
    }

    const blueprintFunctionRole = this.createLambdaRole('createBlueprintFunctionRole');


    this.bdaBlueprintLambdaFunction = new lambda.Function(this, 'bdaBlueprintLambdaFunction', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'lambda.handler', // Adjust this based on your actual handler
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-bedrock-data-automation/create-blueprint')),
      layers: [this.powertoolsLayer, this.boto3Layer],
      environment: {
        INPUT_BUCKET: this.inputBucket.bucketName,
        POWERTOOLS_SERVICE_NAME: 'BEDROCK_BLUEPRINT',
      },
      memorySize: 1024,
      role: blueprintFunctionRole,
      architecture: lambda.Architecture.X86_64,
      timeout: cdk.Duration.minutes(15),
    });

    this.attachPolicies(blueprintFunctionRole, this.bdaInputBucket);
  }

  // ---------------------------------------------------------------------------------
  // BDA Project
  //----------------------------------------------------------------------------------


  private createBDAProjectResources() {

    const bdaProjectLambdaFunctionRole = this.createLambdaRole('bdaProjectFunctionRole');


    this.bdaProjectFunction = new lambda.Function(this, 'bdaProjectFunction', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'lambda.handler', // Adjust this based on your actual handler
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-bedrock-data-automation/create_project')),
      layers: [this.powertoolsLayer, this.boto3Layer],
      environment: {
        INPUT_BUCKET: this.inputBucket.bucketName,
        POWERTOOLS_SERVICE_NAME: 'BEDROCK_PROJECT',
      },
      memorySize: 1024,
      role: bdaProjectLambdaFunctionRole,
      architecture: lambda.Architecture.X86_64,
      timeout: cdk.Duration.minutes(15),
    });

    this.attachPolicies(bdaProjectLambdaFunctionRole, this.inputBucket);
  }

  // ---------------------------------------------------------------------------------
  // bda invocation
  //----------------------------------------------------------------------------------


  private createInvocationResources(id: string) {

    if (!this.props.outputBucketName) {
      const accessLogsOutputBucket = new s3.Bucket(this, 'bdaOutputAccessLogs', {
        encryption: s3.BucketEncryption.S3_MANAGED,
        enforceSSL: true,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        versioned: true,
        objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      });

      this.bdaOutputBucket = new s3.Bucket(this.scope, 'bdaOutputbucket', {
        bucketName: `${id}-output-documents`,
        encryption: s3.BucketEncryption.S3_MANAGED,
        enforceSSL: true,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        versioned: true,
        serverAccessLogsBucket: accessLogsOutputBucket,
        serverAccessLogsPrefix: 'output-bucket-logs/',
        objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      });

    } else {
      this.bdaOutputBucket = s3.Bucket.fromBucketName(
        this.scope,
        'ImportedOutputBucket',
        this.props.outputBucketName,
      );
    }

    // input bucket

    // Create input bucket if not provided
    if (!this.props.inputBucketName ) {
      if ( !this.bdaInputBucket) {
        const accessLogsBucket = new s3.Bucket(this, 'bdaInputAccessLogs', {
          encryption: s3.BucketEncryption.S3_MANAGED,
          enforceSSL: true,
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          versioned: true,
          objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
          removalPolicy: cdk.RemovalPolicy.DESTROY,
          autoDeleteObjects: true,
        });

        this.bdaInputBucket = new s3.Bucket(this.scope, 'bdabucket', {
          bucketName: `${id}-input-documents`,
          encryption: s3.BucketEncryption.S3_MANAGED,
          enforceSSL: true,
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          versioned: true,
          serverAccessLogsBucket: accessLogsBucket,
          serverAccessLogsPrefix: 'input-bucket-logs/',
          objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
          removalPolicy: cdk.RemovalPolicy.DESTROY,
          autoDeleteObjects: true,
        });
      }

    } else {
      this.bdaInputBucket = s3.Bucket.fromBucketName(
        this.scope,
        'ImportedInputBucket',
        this.props.inputBucketName,
      );
    }


    const invocationRole = this.createLambdaRole('invocationRole');

    this.bdaInvocationFunction = new lambda.Function(this, 'bdaInvocationFunction', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'lambda.handler', // Adjust this based on your actual handler
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-bedrock-data-automation/data_processing')),
      layers: [this.powertoolsLayer, this.boto3Layer],
      environment: {
        INPUT_BUCKET: this.inputBucket.bucketName,
        OUTPUT_BUCKET: this.outputBucket.bucketName,
        OUTPUT_FILENAME: '',
        POWERTOOLS_SERVICE_NAME: 'BEDROCK_INVOKE',
      },
      memorySize: 1024,
      role: invocationRole,
      architecture: lambda.Architecture.X86_64,
      timeout: cdk.Duration.minutes(15),
    });


    this.attachPolicies(invocationRole, this.bdaInputBucket, this.bdaOutputBucket);
  }

  // ---------------------------------------------------------------------------------
  // BDA Result status
  //----------------------------------------------------------------------------------

  private createResultStatus() {

    const bdaResultStatusRole = this.createLambdaRole('bdaResultStatusRole');

    this.bdaResultStatusFunction = new lambda.Function(this, 'bdaResultStatusFunction', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'lambda.handler', // Adjust this based on your actual handler
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-bedrock-data-automation/data_result')),
      layers: [this.powertoolsLayer, this.boto3Layer],
      environment: {
        POWERTOOLS_SERVICE_NAME: 'BEDROCK_RESULT',
      },
      memorySize: 1024,
      role: bdaResultStatusRole,
      architecture: lambda.Architecture.X86_64,
      timeout: cdk.Duration.minutes(15),
    });

    this.attachPolicies(bdaResultStatusRole, this.outputBucket);
  }

  // ---------------------------------------------------------------------------------
  // Policies
  //----------------------------------------------------------------------------------


  private createS3Policy(role: iam.Role, inputBucket: s3.IBucket, outputBucket?: s3.IBucket) {
    const policyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        's3:GetObject',
        's3:PutObject',
        's3:ListBucket',
      ],
      resources: [
        `${inputBucket.bucketArn}/*`,
        `${inputBucket.bucketArn}:${cdk.Stack.of(this).region}:${cdk.Stack.of(this).account}:s3/*`,

      ],
    });

    if (outputBucket) {
      policyStatement.addResources(
        `${outputBucket.bucketArn}/*`,
        `${outputBucket.bucketArn}:${cdk.Stack.of(this).region}:${cdk.Stack.of(this).account}:s3/*`,
      );
    }

    role.addToPolicy(policyStatement);
  }


  private createLambdaRole(role: string) {
    return new iam.Role(this.scope, role, {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      inlinePolicies: {
        LambdaFunctionServiceRolePolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
              ],
              resources: [
                `arn:${cdk.Aws.PARTITION}:logs:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:log-group:/aws/lambda/*`,
              ],
            }),
          ],
        }),
      },
    });
  }

  private createBedrockPolicy(role: iam.Role) {
    const bedrockPolicy = new iam.PolicyStatement({
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

    role.addToPolicy(bedrockPolicy);
  }

  private attachPolicies(role: iam.Role, inputBucket: s3.IBucket, outputBucket?: s3.IBucket) {
    this.createS3Policy(role, inputBucket, outputBucket);
    this.createBedrockPolicy(role);

  }
}
