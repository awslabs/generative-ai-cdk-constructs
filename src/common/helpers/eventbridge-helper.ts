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

export interface buildEventBridgeProps {
  /**
   * Existing instance of SNS Topic object, providing both this and `topicProps` will cause an error.
   *
   * @default - None.
   */
  readonly existingEventBusInterface?: events.IEventBus;

  /**
   * Event bus to receive the request
   * @default 'eventbus'
   */
  readonly eventBusName: string;

}

export function buildEventBus(scope: Construct, props: buildEventBridgeProps) {
  if (props.existingEventBusInterface) {
    return props.existingEventBusInterface;
  } else {
    return new events.EventBus(scope, props.eventBusName, {
      eventBusName: props.eventBusName,
    });
  }
}


export interface EventBridgeProps {
  readonly existingEventBusInterface: events.IEventBus;
  readonly eventBusProps: events.EventBusProps;
}

export function CheckEventBridgeProps(propsObject: EventBridgeProps | any) {
  let errorMessages = '';
  let errorFound = false;

  if (propsObject.existingEventBusInterface && propsObject.eventBusProps) {
    errorMessages += 'Error - Either provide existingEventBusInterface or eventBusProps, but not both.\n';
    errorFound = true;
  }

  if (errorFound) {
    throw new Error(errorMessages);
  }
}