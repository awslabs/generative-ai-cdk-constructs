import { Construct } from 'constructs';
import { Stack, Token } from 'aws-cdk-lib/core';
import { InstanceType } from './instance-type';
import { SageMakerEndpointBase } from './sagemaker-endpoint-base';
import { JumpStartModel, JumpStartModelSpec } from './jumpstart-model';
import { JumpStartConstants } from './private/jumpstart-constants';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sagemaker from 'aws-cdk-lib/aws-sagemaker';

export interface JumpStartSageMakerEndpointProps {
  model: JumpStartModel;
  endpointName?: string;
  instanceType?: InstanceType;
  instanceCount?: number;
  role?: iam.Role;
  environment?: { [key: string]: string };
  startupHealthCheckTimeoutInSeconds?: number;
}

/**
 * @summary The JumpStartSageMakerEndpoint class.
 */
export class JumpStartSageMakerEndpoint extends SageMakerEndpointBase {
  public readonly grantPrincipal: iam.IPrincipal;
  public readonly endpointArn: string;
  public readonly cfnModel: sagemaker.CfnModel;
  public readonly cfnEndpoint: sagemaker.CfnEndpoint;
  public readonly cfnEndpointConfig: sagemaker.CfnEndpointConfig;

  public readonly model: JumpStartModel;
  public readonly instanceType?: InstanceType;
  public readonly instanceCount: number;
  public readonly role: iam.Role;

  private readonly region: string;
  private readonly spec: JumpStartModelSpec;
  private readonly startupHealthCheckTimeoutInSeconds: number;
  private readonly environment?: { [key: string]: string };

  constructor(
    scope: Construct,
    id: string,
    props: JumpStartSageMakerEndpointProps
  ) {
    super(scope, id);

    this.model = props.model;
    this.instanceType = props.instanceType;
    this.instanceCount = Math.max(1, props.instanceCount ?? 1);
    this.role = props.role ?? this.createSageMakerRole();
    this.grantPrincipal = this.role;

    this.startupHealthCheckTimeoutInSeconds =
      props.startupHealthCheckTimeoutInSeconds ?? 600;
    this.environment = props.environment;
    this.spec = this.model.bind(this, this.role);
    this.region = Stack.of(this).region;

    if (Token.isUnresolved(this.region)) {
      throw new Error(
        'Region is unresolved. You should explicitly specify the region in the environment.'
      );
    }

    const instanceType = this.verifyInstanceType();
    const instanseBaseType = instanceType.split('.')[1];

    let model: sagemaker.CfnModel;
    if (this.spec.modelPackageArns) {
      if (this.environment) {
        throw new Error(
          'Environment variables are not supported for model packages.'
        );
      }

      model = this.getModelFromPackage(scope);
    } else {
      const environment = this.buildEnvironment(instanceType);
      model = this.getModelFromArtifact(
        scope,
        instanceType,
        instanseBaseType,
        environment
      );
    }

    const endpointConfig = new sagemaker.CfnEndpointConfig(
      scope,
      'EndpointConfig',
      {
        productionVariants: [
          {
            instanceType,
            initialVariantWeight: 1,
            initialInstanceCount: this.instanceCount,
            variantName: 'AllTraffic',
            modelName: model.getAtt('ModelName').toString(),
            containerStartupHealthCheckTimeoutInSeconds:
              this.startupHealthCheckTimeoutInSeconds,
          },
        ],
      }
    );

    endpointConfig.addDependency(model);

    const endpoint = new sagemaker.CfnEndpoint(
      scope,
      `${this.spec.modelId}-endpoint`,
      {
        endpointConfigName: endpointConfig
          .getAtt('EndpointConfigName')
          .toString(),
        endpointName: props.endpointName,
      }
    );

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
        }. Supported instance types: ${supportedInstanceTypes.join(', ')}.`
      );
    }

    return instanceType;
  }

  private buildEnvironment(instanceType: string) {
    const configEnvironment = (this.spec.instanceVariants || {})[instanceType]
      ?.properties?.environment_variables;

    const environment = {
      ...(this.spec.environment ?? {}),
      ...configEnvironment,
      ...this.environment,
    };

    return environment;
  }

  private getModelFromArtifact(
    scope: Construct,
    instanceType: string,
    instanceBaseType: string,
    environment: { [key: string]: string | number | boolean }
  ) {
    const key = this.spec.prepackedArtifactKey ?? this.spec.artifactKey;
    const bucket =
      JumpStartConstants.JUMPSTART_LAUNCHED_REGIONS[this.region]?.contentBucket;
    if (!bucket) {
      throw new Error(
        `JumpStart is not available in the region ${this.region}.`
      );
    }

    const modelDataUrl = `s3://${bucket}/${key}`;
    const imageUriKey = (this.spec.instanceVariants || {})[
      instanceBaseType
    ]?.regional_properties?.image_uri?.replace('$', '');
    if (!imageUriKey) {
      throw new Error(
        `The image uri is not available for instance type ${instanceType}.`
      );
    }
    const image = (this.spec.instanceAliases ?? {})[this.region]?.[imageUriKey];
    if (!image) {
      throw new Error(
        `The image uri is not available for instance type ${instanceType} in region ${this.region}.`
      );
    }

    const model = new sagemaker.CfnModel(scope, `${this.spec.modelId}-model`, {
      executionRoleArn: this.role.roleArn,
      enableNetworkIsolation: true,
      primaryContainer: {
        image,
        modelDataUrl,
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
      ],
    });

    return model;
  }

  private getModelFromPackage(scope: Construct) {
    const modelPackageArns = this.spec.modelPackageArns || {};
    const supportedRegions = Object.keys(modelPackageArns);
    if (!supportedRegions.includes(this.region)) {
      throw new Error(
        `The model package is not available in the region ${
          this.region
        }. Supported regions: ${supportedRegions.join(', ')}.`
      );
    }

    const modelPackageArn = modelPackageArns[this.region];

    const model = new sagemaker.CfnModel(scope, `${this.spec.modelId}-model`, {
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
    });

    return model;
  }
}
