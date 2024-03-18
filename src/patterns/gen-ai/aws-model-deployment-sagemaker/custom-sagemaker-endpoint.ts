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
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sagemaker from 'aws-cdk-lib/aws-sagemaker';
import { Construct } from 'constructs';
import { ContainerImage } from './container-image';
import { SageMakerEndpointBase } from './sagemaker-endpoint-base';
import { SageMakerInstanceType } from './sagemaker-instance-type';
import { ConstructName } from '../../../common/base-class';
import { BaseClassProps } from '../../../common/base-class/base-class';

export interface CustomSageMakerEndpointProps {
  readonly modelId: string;
  readonly endpointName: string;
  readonly instanceType: SageMakerInstanceType;
  readonly container: ContainerImage;
  readonly instanceCount?: number;
  readonly role?: iam.Role;
  readonly environment?: { [key: string]: string };
  readonly startupHealthCheckTimeoutInSeconds?: number;
  readonly modelDataDownloadTimeoutInSeconds?: number;
  readonly volumeSizeInGb?: number | undefined;
  readonly vpcConfig?: sagemaker.CfnModel.VpcConfigProperty | undefined;
  readonly modelDataUrl: string;
  readonly enableOperationalMetric?: boolean;

}

export class CustomSageMakerEndpoint extends SageMakerEndpointBase implements iam.IGrantable {
  public readonly grantPrincipal: iam.IPrincipal;
  public readonly endpointArn: string;
  public readonly cfnModel: sagemaker.CfnModel;
  public readonly cfnEndpoint: sagemaker.CfnEndpoint;
  public readonly cfnEndpointConfig: sagemaker.CfnEndpointConfig;

  public readonly instanceType?: SageMakerInstanceType;
  public readonly instanceCount: number;
  public readonly role: iam.Role;
  public readonly modelDataUrl: string;
  public readonly modelId: string;
  public readonly modelDataDownloadTimeoutInSeconds: number;
  private readonly startupHealthCheckTimeoutInSeconds: number;
  private readonly environment?: { [key: string]: string };

  constructor(scope: Construct, id: string, props: CustomSageMakerEndpointProps) {
    super(scope, id);

    const baseProps: BaseClassProps={
      enableOperationalMetric: props.enableOperationalMetric,
      constructName: ConstructName.CUSTOMSAGEMAKERENDPOINT,
      constructId: id,
    };

    // No lambda function to use AWS SDK for service metric
    const lambdaFunctions: cdk.aws_lambda.DockerImageFunction[]=[];
    this.updateConstructUsageMetricCode( baseProps, scope, lambdaFunctions);


    this.instanceType = props.instanceType;
    this.modelId = props.modelId;
    this.instanceCount = Math.max(1, props.instanceCount ?? 1);
    this.role = props.role ?? this.createSageMakerRole();
    this.grantPrincipal = this.role;
    this.modelDataUrl = props.modelDataUrl;
    this.startupHealthCheckTimeoutInSeconds = props.startupHealthCheckTimeoutInSeconds ?? 600;
    this.environment = props.environment;
    this.modelDataDownloadTimeoutInSeconds = props.modelDataDownloadTimeoutInSeconds ?? 600;

    const image = props.container.bind(this, this.grantPrincipal).imageName;
    const modelIdStr = this.modelId.split('/').join('-').split('.').join('-');
    const isArtifactCompressed = this.modelDataUrl.endsWith('.tar.gz');

    const model = new sagemaker.CfnModel(scope, `${modelIdStr}-model-${id}`, {
      executionRoleArn: this.role.roleArn,
      primaryContainer: isArtifactCompressed ? {
        image,
        mode: 'SingleModel',
        modelDataUrl: this.modelDataUrl,
        environment: {
          SAGEMAKER_REGION: cdk.Aws.REGION,
          ...this.environment,
        },
      } : {
        image,
        mode: 'SingleModel',
        modelDataSource: {
          s3DataSource: {
            compressionType: 'None',
            s3DataType: 'S3Prefix',
            s3Uri: this.modelDataUrl,
          },
        },
        environment: {
          SAGEMAKER_REGION: cdk.Aws.REGION,
          ...this.environment,
        },
      },
      tags: [
        {
          key: 'modelId',
          value: this.modelId,
        },
      ],
      vpcConfig: props.vpcConfig,
    });

    const endpointConfig = new sagemaker.CfnEndpointConfig(scope, `EndpointConfig-${id}`, {
      productionVariants: [
        {
          instanceType: this.instanceType.toString(),
          initialVariantWeight: 1,
          initialInstanceCount: this.instanceCount,
          variantName: 'AllTraffic',
          volumeSizeInGb: props.volumeSizeInGb,
          modelName: model.getAtt('ModelName').toString(),
          containerStartupHealthCheckTimeoutInSeconds: this.startupHealthCheckTimeoutInSeconds,
          modelDataDownloadTimeoutInSeconds: this.modelDataDownloadTimeoutInSeconds,
        },
      ],
    });

    endpointConfig.addDependency(model);

    const endpoint = new sagemaker.CfnEndpoint(scope, `${modelIdStr}-endpoint-${id}`, {
      endpointName: props.endpointName,
      endpointConfigName: endpointConfig.getAtt('EndpointConfigName').toString(),
      tags: [
        {
          key: 'modelId',
          value: this.modelId,
        },
      ],
    });

    endpoint.addDependency(endpointConfig);

    this.cfnModel = model;
    this.cfnEndpoint = endpoint;
    this.cfnEndpointConfig = endpointConfig;
    this.endpointArn = endpoint.ref;
  }

  public addToRolePolicy(statement: iam.PolicyStatement) {
    if (!this.role) {
      return;
    }

    this.role.addToPolicy(statement);
  }

  public grantInvoke(grantee: iam.IGrantable): iam.Grant {
    return iam.Grant.addToPrincipal({
      grantee,
      actions: ['sagemaker:InvokeEndpoint'],
      resourceArns: [this.endpointArn],
    });
  }
}