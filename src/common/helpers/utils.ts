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
import { IConstruct } from 'constructs';
import { CfnNagSuppressRule } from '../../patterns/gen-ai/aws-rag-appsync-stepfn-kendra/types';

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
 * @param {string} prefix - the prefix for the name
 * @param {string[]} parts - the various string components of the name (eg - stackName, solutions construct ID, L2 construct ID)
 * @param {number} maxLength - the longest string that can be returned
 * @returns {string} - a string with concatenated parts (truncated if necessary) + a hash of the full concatenated parts
 *
 * @deprecated This function is deprecated and will be removed in a future major version.
 * Please use the new function generatePhysicalNameV2 instead.
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

  if (prefix.length + allParts.length + stackIdGuidLength + 1 /* hyphen */ > maxLength) {
    throw new Error(`The generated name is longer than the maximum length of ${maxLength}`);
  }

  return prefix.toLowerCase() + allParts + '-' + uniqueStackIdPart;
}


export interface GeneratePhysicalNameV2Options extends cdk.UniqueResourceNameOptions {
  /**
   * Whether to convert the name to lower case.
   *
   * @default false
   */
  lower?: boolean;
}
/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 *
 * @summary Creates a physical resource name in the style of the CDK (string+hash) - this value incorporates
 * the Stack Name and node ID, so it will remain static in multiple updates of a single stack, but will be
 * different in a separate stack instance.
 *
 * This new version allows for names shorter than 36 characters with control over casing.
 *
 * The minimum length is the length of the prefix and separator plus 10.
 */
export function generatePhysicalNameV2(
  /**
   * The CDK scope of the resource.
   */
  scope: IConstruct,
  /**
   * The prefix for the name.
   */
  prefix: string,
  /**
   * Options for generating the name.
   */
  options?: GeneratePhysicalNameV2Options,
): string {
  const {
    maxLength = 256,
    lower= false,
    separator= '',
    allowedSpecialCharacters=undefined,
  } = options ?? {};
  if (maxLength < (prefix + separator).length) {
    throw new Error('The prefix is longer than the maximum length.');
  }
  const uniqueName = cdk.Names.uniqueResourceName(
    scope,
    { maxLength: maxLength - (prefix + separator).length, separator, allowedSpecialCharacters },
  );
  const name = `${prefix}${separator}${uniqueName}`;
  if (name.length > maxLength) {
    throw new Error(`The generated name is longer than the maximum length of ${maxLength}`);
  }
  return lower ? name.toLowerCase() : name;
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

/**
 * Adds CFN NAG suppress rules to the CDK resource.
 * @param resource The CDK resource
 * @param rules The CFN NAG suppress rules
 */
export function addCfnSuppressRules(resource: cdk.Resource | cdk.CfnResource, rules: CfnNagSuppressRule[]) {
  if (resource instanceof cdk.Resource) {
    resource = resource.node.defaultChild as cdk.CfnResource;
  }

  if (resource.cfnOptions.metadata?.cfn_nag?.rules_to_suppress) {
    resource.cfnOptions.metadata?.cfn_nag.rules_to_suppress.push(...rules);
  } else {
    resource.addMetadata('cfn_nag', {
      rules_to_suppress: rules,
    });
  }
}

function isObject(val: object) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

export function isPlainObject(o: object) {
  if (!isObject(o)) return false;

  if (Object.getPrototypeOf(o) === null) return true;

  let proto = o;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(o) === proto;
}
