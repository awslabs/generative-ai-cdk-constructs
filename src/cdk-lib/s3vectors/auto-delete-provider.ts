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
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

export interface AutoDeleteProviderProps {
  /**
   * Description for the Lambda function
   */
  readonly description?: string;
}

/**
 * Provider for auto-deleting S3 Vector bucket indexes
 */
export class AutoDeleteProvider extends Construct {
  /**
   * Get or create the singleton provider
   */
  public static getOrCreateProvider(
    scope: Construct,
    resourceType: string,
    props?: AutoDeleteProviderProps,
  ): AutoDeleteProvider {
    const stack = cdk.Stack.of(scope);
    const id = `${AutoDeleteProvider.PROVIDER_NAME}-${resourceType}`;
    const existing = stack.node.tryFindChild(id);
    if (existing) {
      return existing as AutoDeleteProvider;
    }

    return new AutoDeleteProvider(stack, id, resourceType, props);
  }

  private static readonly PROVIDER_NAME = 'S3VectorsAutoDeleteProvider';

  public readonly serviceToken: string;
  public readonly roleArn: string;
  public readonly role: iam.Role;

  private constructor(
    scope: cdk.Stack,
    id: string,
    _resourceType: string,
    props?: AutoDeleteProviderProps,
  ) {
    super(scope, id);

    // Lambda execution role
    // Note: S3 Vectors permissions are granted via bucket policy in vector-bucket.ts
    // The bucket policy grants the necessary permissions to this role's ARN
    this.role = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // Lambda function for the custom resource
    // Path is relative to the project root
    const lambdaPath = path.join(__dirname, '../../../lambda/s3vectors-auto-delete');
    const handler = new lambda.Function(this, 'Handler', {
      code: lambda.Code.fromDockerBuild(lambdaPath),
      handler: 'custom_resources.on_event',
      runtime: lambda.Runtime.PYTHON_3_12,
      role: this.role,
      timeout: cdk.Duration.minutes(15),
      memorySize: 256,
      logRetention: logs.RetentionDays.ONE_WEEK,
      description: props?.description || 'Lambda function for auto-deleting indexes in S3 vector buckets',
    });

    // Custom resource provider
    const provider = new cr.Provider(this, 'Provider', {
      onEventHandler: handler,
      logRetention: logs.RetentionDays.ONE_WEEK,
    });

    this.serviceToken = provider.serviceToken;
    this.roleArn = this.role.roleArn;
  }
}

