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
import * as events from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

export interface eventBridgeProps {
  /**
   * Event bus to receive the request
   * @default 'eventbus'
   */
  readonly eventBusName: string;
  /**
   * event bus to receive the response
   * @default ' subscriptionEventbus'
   */
  readonly subscriptionEventBusName: string;
}

export function buildRequestEventBus(scope: Construct, props: eventBridgeProps) {

  return new events.EventBus(scope, props.eventBusName, {
    eventBusName: props.eventBusName,
  });
}

export function buildResponseEventBus(scope: Construct, props: eventBridgeProps) {
  return new events.EventBus(scope, props.subscriptionEventBusName, {
    eventBusName: props.subscriptionEventBusName,
  });
}