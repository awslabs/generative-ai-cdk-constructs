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
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cr from 'aws-cdk-lib/custom-resources';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as esbuild from 'esbuild';

export interface CRProviderProps {
  /**
   * A globally unique name for the Custom Resource provider.
   *
   * @default - None.
   */
  readonly providerName: string;

  /**
   * Path to custom resource provider Lambda code. The package will be built using lambda.Code.fromDockerBuild().
   *
   * @default - None.
   */
  readonly codePath: string;

  /**
   * The name of the Lambda handler function.
   *
   * @default - None.
   */
  readonly handler: string;

  /**
   * The runtime of the Lambda function.
   *
   * @default - None.
   */
  readonly runtime: lambda.Runtime;

  /**
   * The list of layers to attach to the Lambda function.
   *
   * @default - None.
   */
  readonly layers?: lambda.ILayerVersion[];

  /**
   * The VPC to deploy Lambda function into.
   *
   * @default - None.
   */
  readonly vpc?: ec2.IVpc;

  /**
   * The security group for Lambda function.
   *
   * @default - None.
   */
  readonly securityGroup?: ec2.SecurityGroup;
}

/**
 * The ICR provider
 */
export interface ICRProvider {
  role: iam.Role;
  provider: cr.Provider;
  serviceToken: string;
}
/**
 * Get the ICRProvider
 */
export interface ICRProviderClass {
  getProvider(scope: Construct): ICRProvider;
}


export function buildCustomResourceProvider(props: CRProviderProps): ICRProviderClass {
  const { providerName, codePath, handler, runtime, layers, vpc, securityGroup } = props;

  class CRProvider extends Construct {
    static getProvider(scope: Construct): CRProvider {
      const stack = cdk.Stack.of(scope);
      const existing = stack.node.tryFindChild(providerName);
      if (existing) {
        return existing as CRProvider;
      }
      return new CRProvider(cdk.Stack.of(scope), providerName);
    }

    public readonly role: iam.Role;
    public readonly provider: cr.Provider;
    public readonly serviceToken: string;

    constructor(scope: cdk.Stack, id: string) {
      super(scope, id);

      this.role = new iam.Role(this, 'CRRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        ],
      });

      let customResourceFunction;

      if (runtime.family === lambda.RuntimeFamily.NODEJS) {

        const lambdaDir = path.resolve(codePath);
        const outputDir = path.join(lambdaDir, 'dist');
        const outputFile = path.join(outputDir, 'index.js');

        esbuild.buildSync({
          entryPoints: [path.join(lambdaDir, 'index.ts')],
          bundle: true,
          minify: true,
          platform: 'node',
          target: 'node18',
          sourcemap: true,
          outfile: outputFile,
          external: ['aws-sdk'],
        });

        customResourceFunction = new lambda.Function(this, 'CustomResourcesFunction', {
          code: lambda.Code.fromAsset(outputDir),
          // code: lambda.Code.fromAsset(codePath),
          handler,
          runtime,
          role: this.role,
          timeout: cdk.Duration.minutes(15),
          memorySize: 128,
          vpc,
          vpcSubnets: vpc ? { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS } : undefined,
          securityGroups: vpc && securityGroup ? [securityGroup] : undefined,
          logRetention: logs.RetentionDays.ONE_WEEK,
          description: 'Custom Resource Provider',
        });

      } else {
        customResourceFunction = new lambda.Function(this, 'CustomResourcesFunction', {
          code: lambda.Code.fromDockerBuild(codePath),
          handler,
          runtime,
          layers,
          role: this.role,
          timeout: cdk.Duration.minutes(15),
          memorySize: 128,
          vpc,
          vpcSubnets: vpc ? { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS } : undefined,
          securityGroups: vpc && securityGroup ? [securityGroup] : undefined,
          logRetention: logs.RetentionDays.ONE_WEEK,
          description: 'Custom Resource Provider',
        });
      }

      const providerRole = new iam.Role(this, 'ProviderRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        ],
      });

      this.provider = new cr.Provider(this, 'Provider', {
        onEventHandler: customResourceFunction,
        logRetention: logs.RetentionDays.ONE_WEEK,
        role: providerRole,
      });

      this.serviceToken = this.provider.serviceToken;

      NagSuppressions.addResourceSuppressionsByPath(
        cdk.Stack.of(this),
        `${this.provider.node.path}/framework-onEvent/Resource`,
        [
          {
            id: 'AwsSolutions-L1',
            reason: 'Lambda runtime version is managed upstream by CDK.',
          },
        ],
      );

      for (let role of [this.role, providerRole]) {
        NagSuppressions.addResourceSuppressions(
          role,
          [
            {
              id: 'AwsSolutions-IAM4',
              reason: 'CDK CustomResource Lambda uses the AWSLambdaBasicExecutionRole AWS Managed Policy.',
            },
          ],
        );
      }

      NagSuppressions.addResourceSuppressions(
        providerRole,
        [
          {
            id: 'AwsSolutions-IAM5',
            reason: 'CDK CustomResource Provider has a wildcard to invoke any version of the specific Custom Resource function.',
            appliesTo: [{ regex: `/^Resource::<${id}${customResourceFunction.node.id}[A-Z0-9]+\\.Arn>:\\*$/g` }],
          },
        ],
        true,
      );

      NagSuppressions.addResourceSuppressions(
        customResourceFunction,
        [
          {
            id: 'AwsSolutions-L1',
            reason: 'Lambda runtime version is managed upstream by CDK',
          },
        ],
        true,
      );
    }
  }

  return CRProvider;
}
