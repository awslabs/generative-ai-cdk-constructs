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

export interface IHuggingFaceSageMakerEndpointProps {
  modelId: string;
  container: ContainerImage;
  endpointName?: string;
  instanceType: SageMakerInstanceType;
  instanceCount?: number;
  role?: iam.Role;
  environment?: { [key: string]: string };
  startupHealthCheckTimeoutInSeconds?: number;
}

/**
 * @summary The HuggingFaceSageMakerEndpoint class.
 */
export class HuggingFaceSageMakerEndpoint extends SageMakerEndpointBase implements iam.IGrantable {
  public readonly grantPrincipal: iam.IPrincipal;
  public readonly endpointArn: string;
  public readonly cfnModel: sagemaker.CfnModel;
  public readonly cfnEndpoint: sagemaker.CfnEndpoint;
  public readonly cfnEndpointConfig: sagemaker.CfnEndpointConfig;

  public readonly modelId: string;
  public readonly instanceType: SageMakerInstanceType;
  public readonly instanceCount: number;
  public readonly role: iam.Role;

  private readonly startupHealthCheckTimeoutInSeconds: number;
  private readonly environment?: { [key: string]: string };

  constructor(scope: Construct, id: string, props: IHuggingFaceSageMakerEndpointProps) {
    super(scope, id);

    this.modelId = props.modelId;
    this.instanceType = props.instanceType;
    this.instanceCount = Math.max(1, props.instanceCount ?? 1);
    this.role = props.role ?? this.createSageMakerRole();
    this.grantPrincipal = this.role;

    this.startupHealthCheckTimeoutInSeconds = props.startupHealthCheckTimeoutInSeconds ?? 600;
    this.environment = props.environment;

    const image = props.container.bind(this, this.grantPrincipal).imageName;
    const modelIdStr = this.modelId.split('/').join('-').split('.').join('-');

    const model = new sagemaker.CfnModel(scope, `${modelIdStr}-model-${id}`, {
      executionRoleArn: this.role.roleArn,
      primaryContainer: {
        image,
        mode: 'SingleModel',
        environment: {
          SAGEMAKER_CONTAINER_LOG_LEVEL: '20',
          SAGEMAKER_REGION: cdk.Aws.REGION,
          HF_MODEL_ID: this.modelId,
          ...this.environment,
        },
      },
      tags: [
        {
          key: 'modelId',
          value: this.modelId,
        },
      ],
    });

    const endpointConfig = new sagemaker.CfnEndpointConfig(scope, `EndpointConfig-${id}`, {
      productionVariants: [
        {
          instanceType: this.instanceType.toString(),
          initialVariantWeight: 1,
          initialInstanceCount: this.instanceCount,
          variantName: 'AllTraffic',
          modelName: model.getAtt('ModelName').toString(),
          containerStartupHealthCheckTimeoutInSeconds: this.startupHealthCheckTimeoutInSeconds,
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
