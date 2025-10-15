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
import { Stack, Token } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { JumpStartModel, IJumpStartModelSpec } from './jumpstart-model';
import { JumpStartConstants } from './private/jumpstart-constants';
import { SageMakerEndpointBase } from './sagemaker-endpoint-base';
import { SageMakerInstanceType } from './sagemaker-instance-type';
import { BaseClassProps } from '../../../common/base-class/base-class';
import { ConstructName } from '../../../common/base-class/construct-name-enum';

export interface JumpStartSageMakerEndpointProps {
  readonly model: JumpStartModel;
  readonly endpointName: string;
  readonly instanceType?: SageMakerInstanceType;
  readonly instanceCount?: number;
  readonly role?: iam.Role;
  readonly vpcConfig?: sagemaker.CfnModel.VpcConfigProperty | undefined;
  readonly environment?: { [key: string]: string };
  readonly startupHealthCheckTimeoutInSeconds?: number;
  readonly acceptEula?: boolean;

}

/**
 * The JumpStartSageMakerEndpoint class.
 */
export class JumpStartSageMakerEndpoint extends SageMakerEndpointBase {
  public readonly grantPrincipal: iam.IPrincipal;
  public readonly endpointArn: string;
  public readonly cfnModel: sagemaker.CfnModel;
  public readonly cfnEndpoint: sagemaker.CfnEndpoint;
  public readonly cfnEndpointConfig: sagemaker.CfnEndpointConfig;

  public readonly model: JumpStartModel;
  public readonly instanceType?: SageMakerInstanceType;
  public readonly instanceCount: number;
  public readonly role: iam.Role;

  private readonly acceptEula: boolean;
  private readonly region: string;
  private readonly spec: IJumpStartModelSpec;
  private readonly startupHealthCheckTimeoutInSeconds: number;
  private readonly environment?: { [key: string]: string };

  constructor(scope: Construct, id: string, props: JumpStartSageMakerEndpointProps) {
    super(scope, id);

    const baseProps: BaseClassProps = {
      constructName: ConstructName.JUMPSTARTSAGEMAKERENDPOINT,
      constructId: id,
    };

    // No lambda function to use AWS SDK for service metric
    const lambdaFunctions: cdk.aws_lambda.DockerImageFunction[] = [];
    this.updateConstructUsageMetricCode( baseProps, scope, lambdaFunctions);

    this.model = props.model;
    this.instanceType = props.instanceType;
    this.instanceCount = Math.max(1, props.instanceCount ?? 1);
    this.acceptEula = props.acceptEula ?? false;

    this.role = props.role ?? this.createSageMakerRole();
    this.grantPrincipal = this.role;

    this.startupHealthCheckTimeoutInSeconds = props.startupHealthCheckTimeoutInSeconds ?? 600;
    this.environment = props.environment;
    this.spec = this.model.bind();

    if (!this.acceptEula && this.spec.requiresEula) {
      throw new Error(
        'The AcceptEula value must be explicitly defined as True in order to accept the EULA for the model ' + this.spec.modelId + '. You are responsible for reviewing and complying with any applicable license terms and making sure they are acceptable for your use case before downloading or using a model.',
      );
    }

    this.region = Stack.of(this).region;

    if (Token.isUnresolved(this.region)) {
      throw new Error(
        'Region is unresolved. You should explicitly specify the region in the environment.',
      );
    }

    const instanceType = this.verifyInstanceType();
    const instanseBaseType = instanceType.split('.')[1];

    let model: sagemaker.CfnModel;
    if (this.spec.modelPackageArns) {
      if (this.environment) {
        throw new Error('Environment variables are not supported for model packages.');
      }

      model = this.getModelFromPackage(scope, id, props.vpcConfig);
    } else {
      const environment = this.buildEnvironment(instanceType);
      model = this.getModelFromArtifact(scope, id, instanceType, instanseBaseType, environment, props.vpcConfig);
    }

    const endpointConfig = new sagemaker.CfnEndpointConfig(scope, `EndpointConfig-${id}`, {
      productionVariants: [
        {
          instanceType,
          initialVariantWeight: 1,
          initialInstanceCount: this.instanceCount,
          variantName: 'AllTraffic',
          modelName: model.getAtt('ModelName').toString(),
          containerStartupHealthCheckTimeoutInSeconds: this.startupHealthCheckTimeoutInSeconds,
        },
      ],
    });

    endpointConfig.addDependency(model);

    const endpoint = new sagemaker.CfnEndpoint(scope, `${this.spec.modelId}-endpoint-${id}`, {
      endpointConfigName: endpointConfig.getAtt('EndpointConfigName').toString(),
      endpointName: 'jumpstart-' + props.endpointName,
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

  private verifyInstanceType() {
    let instanceType = this.spec.defaultInstanceType;
    if (this.instanceType) {
      instanceType = this.instanceType.toString();
    }

    const supportedInstanceTypes = this.spec.instanceTypes;
    if (!supportedInstanceTypes.includes(instanceType)) {
      throw new Error(
        `The instance type ${instanceType} is not supported. Default instance type: ${
          this.spec.defaultInstanceType
        }. Supported instance types: ${supportedInstanceTypes.join(', ')}.`,
      );
    }

    return instanceType;
  }

  private buildEnvironment(instanceType: string) {
    const configEnvironment = this.spec.instanceVariants?.find(
      (v) => v.instanceType === instanceType,
    )?.environment;

    const environment = {
      ...(this.spec.environment ?? {}),
      ...configEnvironment,
      ...this.environment,
    };

    if (environment.SAGEMAKER_SUBMIT_DIRECTORY) {
      delete environment.SAGEMAKER_SUBMIT_DIRECTORY;
    }

    return environment;
  }

  private getModelFromArtifact(
    scope: Construct,
    id: string,
    instanceType: string,
    instanceBaseType: string,
    environment: { [key: string]: string | number | boolean },
    vpcConfig: sagemaker.CfnModel.VpcConfigProperty | undefined,
  ) {
    const key = this.spec.prepackedArtifactKey ?? this.spec.artifactKey;
    const bucket = this.spec.gatedBucket ? JumpStartConstants.JUMPSTART_LAUNCHED_REGIONS[this.region]?.gatedContentBucket :
      JumpStartConstants.JUMPSTART_LAUNCHED_REGIONS[this.region]?.contentBucket;
    if (!bucket) {
      throw new Error(`JumpStart is not available in the region ${this.region}.`);
    }

    const modelArtifactUrl = `s3://${bucket}/${key}`;
    const isArtifactCompressed = modelArtifactUrl.endsWith('.tar.gz');

    const imageUriKey = this.spec.instanceVariants
      ?.find((v) => v.instanceType === instanceBaseType)
      ?.imageUri?.replace('$', '');

    if (!imageUriKey) {
      throw new Error(`The image uri is not available for instance type ${instanceType}.`);
    }

    const image = this.spec.instanceAliases?.find((v) => v.region === this.region)?.aliases[
      imageUriKey
    ];
    if (!image) {
      throw new Error(
        `The image uri is not available for instance type ${instanceType} in region ${this.region}.`,
      );
    }

    const model = new sagemaker.CfnModel(scope, `${this.spec.modelId}-model-${id}`, {
      executionRoleArn: this.role.roleArn,
      enableNetworkIsolation: true,
      primaryContainer: isArtifactCompressed ? {
        // True: Artifact is a tarball
        image,
        modelDataUrl: modelArtifactUrl,
        environment,
      } : {
        // False: Model is uncompressed
        image,
        modelDataSource: {
          s3DataSource: {
            compressionType: 'None',
            s3DataType: 'S3Prefix',
            s3Uri: modelArtifactUrl,
            modelAccessConfig: {
              acceptEula: this.acceptEula,
            },
          },
        },
        environment,
      },
      tags: [
        {
          key: 'modelId',
          value: this.spec.modelId,
        },
        {
          key: 'modelVersion',
          value: this.spec.version,
        },
        {
          key: 'sagemaker-studio:jumpstart-model-id',
          value: this.spec.modelId,
        },
        {
          key: 'sagemaker-studio:jumpstart-model-version',
          value: this.spec.version,
        },
        {
          key: 'sagemaker-studio:jumpstart-hub-name',
          value: 'SageMakerPublicHub',
        },
      ],
      vpcConfig: vpcConfig,
    });

    return model;
  }

  private getModelFromPackage(scope: Construct, id: string, vpcConfig: sagemaker.CfnModel.VpcConfigProperty | undefined) {
    const modelPackageArns = this.spec.modelPackageArns || {};
    const supportedRegions = Object.keys(modelPackageArns);
    if (!supportedRegions.includes(this.region)) {
      throw new Error(
        `The model package is not available in the region ${
          this.region
        }. Supported regions: ${supportedRegions.join(', ')}.`,
      );
    }

    const modelPackageArn = modelPackageArns[this.region];

    const model = new sagemaker.CfnModel(scope, `${this.spec.modelId}-model-${id}`, {
      executionRoleArn: this.role.roleArn,
      enableNetworkIsolation: true,
      primaryContainer: {
        modelPackageName: modelPackageArn,
      },
      tags: [
        {
          key: 'modelId',
          value: this.spec.modelId,
        },
        {
          key: 'modelVersion',
          value: this.spec.version,
        },
      ],
      vpcConfig: vpcConfig,
    });

    return model;
  }
}
