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
import * as cdk from 'aws-cdk-lib';
/**
 * The version of this package
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
export const version = require('../../../package.json').version;
/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 *
 * @summary Creates a physical resource name in the style of the CDK (string+hash) - this value incorporates Stack ID,
 * so it will remain static in multiple updates of a single stack, but will be different in a separate stack instance
 * @param {string[]} parts - the various string components of the name (eg - stackName, solutions construct ID, L2 construct ID)
 * @param {number} maxLength - the longest string that can be returned
 * @returns {string} - a string with concatenated parts (truncated if necessary) + a hash of the full concatenated parts
 *
 */
export function generatePhysicalName(
  prefix: string,
  parts: string[],
  maxLength: number,
): string {
  // The result will consist of:
  //    -The prefix - unaltered
  //    -The parts concatenated, but reduced in size to meet the maxLength limit for the overall name
  //    -A hyphen delimiter
  //    -The GUID portion of the stack arn

  const stackIdGuidLength = 36;
  const prefixLength = prefix.length;
  const maxPartsLength = maxLength - prefixLength - 1 - stackIdGuidLength; // 1 is the hyphen

  // Extract the Stack ID Guid
  const uniqueStackIdPart = cdk.Fn.select(2, cdk.Fn.split('/', `${cdk.Aws.STACK_ID}`));

  let allParts: string = '';

  parts.forEach((part) => {
    allParts += part;
  });

  if (allParts.length > maxPartsLength) {
    const subStringLength = maxPartsLength / 2;
    allParts = allParts.substring(0, subStringLength) + allParts.substring(allParts.length - subStringLength);
  }

  const finalName = prefix.toLowerCase() + allParts + '-' + uniqueStackIdPart;
  return finalName;
}