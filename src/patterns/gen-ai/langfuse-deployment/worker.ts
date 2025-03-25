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

// External Dependencies:
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';

// Local Dependencies:
import {
  ILangfuseServiceSharedProps,
  LangfuseServiceBase,
} from './service-base';

const LANGFUSE_WORKER_PORT = 3030;

interface ILangfuseWorkerServiceProps extends ILangfuseServiceSharedProps {
  /**
   * Source container image name for the worker
   *
   * @default 'langfuse/langfuse-worker'
   */
  imageName?: string;
}

/**
 * Construct for an ECS-based service to run Langfuse's asynchronous background workers
 */
export class LangfuseWorkerService extends LangfuseServiceBase {
  constructor(
    scope: Construct,
    id: string,
    props: ILangfuseWorkerServiceProps,
  ) {
    super(scope, id, {
      ...props,
      healthCheck: {
        command: [
          'CMD-SHELL',
          // >> to capture health check in task/service logs as described at:
          // https://docs.aws.amazon.com/AmazonECS/latest/developerguide/view-container-health.html
          `wget --no-verbose --tries=1 --spider http://localhost:${LANGFUSE_WORKER_PORT}/api/health >> /proc/1/fd/1 2>&1  || exit 1`,
        ],
        interval: cdk.Duration.minutes(2),
        retries: 3,
        startPeriod: cdk.Duration.minutes(4),
        timeout: cdk.Duration.seconds(60), // Worker can get busy and that's okay
      },
      imageName: props.imageName || 'langfuse/langfuse-worker',
      portMappings: [
        {
          containerPort: LANGFUSE_WORKER_PORT,
          hostPort: LANGFUSE_WORKER_PORT,
          protocol: ecs.Protocol.TCP,
        },
      ],
      serviceName: 'worker',
    });
  }
}
