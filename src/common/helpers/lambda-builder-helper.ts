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

import * as lambda from 'aws-cdk-lib/aws-lambda';
import { DockerImageFunctionProps } from 'aws-cdk-lib/aws-lambda/lib/image-function';
import { Construct } from 'constructs';
import { DockerLambdaCustomProps } from '../props/DockerLambdaCustomProps';

export function buildDockerLambdaFunction(scope: Construct,
  id: string, constructprops: DockerImageFunctionProps,
  userprops: DockerLambdaCustomProps | undefined) {
  if (userprops) { // user provided his own custom lambda function, merge his props with the construct ones
    return new lambda.DockerImageFunction(
      scope,
      id,
      {
        // we force some values to be used from the construct
        functionName: constructprops.functionName,
        description: constructprops.description,
        vpc: constructprops.vpc,
        tracing: constructprops.tracing,
        vpcSubnets: constructprops.vpcSubnets,
        securityGroups: constructprops.securityGroups,
        role: constructprops.role,
        memorySize: constructprops.memorySize,
        timeout: constructprops.timeout,
        // add user props
        ...userprops,
        // merge construct env variables with the ones from the construct
        environment: { ...constructprops.environment, ...userprops.environment },
      },
    );
  } else { // use values provided by the construct
    return new lambda.DockerImageFunction(
      scope,
      id,
      constructprops,
    );
  }
}
