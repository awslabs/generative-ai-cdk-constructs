import { Construct } from 'constructs';
import { InstanceType } from './instance-type';
import { ContainerImage } from './container-image';
import { SageMakerEndpointBase } from './sagemaker-endpoint-base';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sagemaker from 'aws-cdk-lib/aws-sagemaker';

export interface HuggingFaceSageMakerEndpointProps {
  modelId: string;
  container: ContainerImage;
  endpointName?: string;
  instanceType: InstanceType;
  instanceCount?: number;
  role?: iam.Role;
  environment?: { [key: string]: string };
  startupHealthCheckTimeoutInSeconds?: number;
}

/**
 * @summary The HuggingFaceSageMakerEndpoint class.
 */
export class HuggingFaceSageMakerEndpoint
  extends SageMakerEndpointBase
  implements iam.IGrantable
{
  public readonly grantPrincipal: iam.IPrincipal;
  public readonly endpointArn: string;
  public readonly cfnModel: sagemaker.CfnModel;
  public readonly cfnEndpoint: sagemaker.CfnEndpoint;
  public readonly cfnEndpointConfig: sagemaker.CfnEndpointConfig;

  public readonly modelId: string;
  public readonly instanceType: InstanceType;
  public readonly instanceCount: number;
  public readonly role: iam.Role;

  private readonly startupHealthCheckTimeoutInSeconds: number;
  private readonly environment?: { [key: string]: string };

  constructor(
    scope: Construct,
    id: string,
    props: HuggingFaceSageMakerEndpointProps
  ) {
    super(scope, id);

    this.modelId = props.modelId;
    this.instanceType = props.instanceType;
    this.instanceCount = Math.max(1, props.instanceCount ?? 1);
    this.role = props.role ?? this.createSageMakerRole();
    this.grantPrincipal = this.role;

    this.startupHealthCheckTimeoutInSeconds =
      props.startupHealthCheckTimeoutInSeconds ?? 600;
    this.environment = props.environment;

    const image = props.container.bind(this, this.grantPrincipal).imageName;
    const modelIdStr = this.modelId.split('/').join('-').split('.').join('-');

    const model = new sagemaker.CfnModel(scope, `${modelIdStr}-model`, {
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

    const endpointConfig = new sagemaker.CfnEndpointConfig(
      scope,
      'EndpointConfig',
      {
        productionVariants: [
          {
            instanceType: this.instanceType.toString(),
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
      `${modelIdStr}-endpoint`,
      {
        endpointName: props.endpointName,
        endpointConfigName: endpointConfig
          .getAtt('EndpointConfigName')
          .toString(),
        tags: [
          {
            key: 'modelId',
            value: this.modelId,
          },
        ],
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
}
