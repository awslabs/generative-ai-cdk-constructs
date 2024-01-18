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
import * as crypto from 'crypto';
import * as cdk from 'aws-cdk-lib';
import { IConstruct } from 'constructs';
/**
 * The version of this package
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
export const version = require('../../../package.json').version;
/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 *
 * @summary Creates a physical resource name in the style of the CDK (string+hash) - this value incorporates Stack ID or
 * the Stack Name, so it will remain static in multiple updates of a single stack, but will be different in a separate
 * stack instance.
 * @param {string} prefix - the prefix to use for the name
 * @param {string[]} parts - the various string components of the name (eg - stackName, solutions construct ID, L2 construct ID)
 * @param {number} maxLength - the longest string that can be returned
 * @param {boolean} lower - whether to return the name in lowercase or mixed case
 * @param {IConstruct} resource - the resource that is calling this function (used to extract the stack Name and Node ID)
 * @returns {string} - a string with concatenated parts (truncated if necessary) + a hash of the full concatenated parts
 *
 */
export function generatePhysicalName(
  prefix: string,
  parts: string[],
  maxLength: number,
  lower?: boolean,
  resource?: IConstruct,
): string {
  // The result will consist of:
  //    -The prefix - unaltered
  //    -The parts concatenated, but reduced in size to meet the maxLength limit for the overall name
  //    -A hyphen delimiter
  //    -The GUID portion of the stack arn

  const stackIdGuidLength = 36;
  const prefixLength = prefix.length;
  let maxPartsLength = maxLength - prefixLength - 1 - stackIdGuidLength; // 1 is the hyphen

  let uniqueStackIdPart = '';
  let uniqueStackIdPartLength = stackIdGuidLength;
  if (maxPartsLength > 2) {
    // Extract the Stack ID Guid
    uniqueStackIdPart = cdk.Fn.select(2, cdk.Fn.split('/', `${cdk.Aws.STACK_ID}`));
  } else if (resource) {
    const stack = cdk.Stack.of(resource);

    const hashLength = 8;
    const sha256 = crypto.createHash('sha256')
      .update(stack.stackName)
      .update(cdk.Names.nodeUniqueId(resource.node));
    uniqueStackIdPart = sha256.digest('hex').slice(0, hashLength);
    uniqueStackIdPartLength = hashLength;
    maxPartsLength = maxLength - prefixLength - 1 - hashLength; // 1 is the hyphen
  } else {
    throw new Error('The resource parameter is required for short names.');
  }

  let allParts: string = '';

  parts.forEach((part) => {
    allParts += part;
  });

  if (allParts.length > maxPartsLength) {
    const subStringLength = maxPartsLength / 2;
    allParts = allParts.substring(0, subStringLength) + allParts.substring(allParts.length - subStringLength);
  }

  if (prefix.length + allParts.length + uniqueStackIdPartLength + 1 /* hyphen */ > maxLength) {
    throw new Error(`The generated name is longer than the maximum length of ${maxLength}`);
  }

  const combinedName = prefix + allParts;
  return (lower ? combinedName.toLowerCase() : combinedName) + '-' + uniqueStackIdPart;
}

export const maximumLambdaMemorySizeContextItem = 'maximumLambdaMemorySize';
export const recommendedMaximumLambdaMemorySize = 7076;
export function lambdaMemorySizeLimiter(construct: IConstruct, requestedMemorySizeInMegabytes: number) {
  const maximumLambaMemorySize = construct.node.tryGetContext(maximumLambdaMemorySizeContextItem) === undefined ?
    recommendedMaximumLambdaMemorySize :
    parseInt(construct.node.tryGetContext(maximumLambdaMemorySizeContextItem));
  if (maximumLambaMemorySize < recommendedMaximumLambdaMemorySize) {
    console.warn(`Maximum Lambda memorySize, ${maximumLambaMemorySize}, is less than the recommended ${recommendedMaximumLambdaMemorySize}.`);
  }
  if (requestedMemorySizeInMegabytes > maximumLambaMemorySize) {
    console.warn(`Reducing Lambda memorySize, ${requestedMemorySizeInMegabytes} to ${maximumLambaMemorySize} for ${construct.constructor.name}`);
    return maximumLambaMemorySize;
  } else {
    return requestedMemorySizeInMegabytes;
  }
}