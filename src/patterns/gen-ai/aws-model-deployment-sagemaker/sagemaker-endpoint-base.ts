import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export abstract class SageMakerEndpointBase extends Construct {
  public readonly grantPrincipal: iam.IPrincipal;

  protected createSageMakerRole(): iam.Role {
    const role = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('sagemaker.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess'),
      ],
    });

    return role;
  }
}
