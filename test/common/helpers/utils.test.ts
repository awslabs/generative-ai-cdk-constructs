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
import { generatePhysicalName } from '../../../src/common/helpers/utils';


describe('generatePhysicalName', () => {
  let testResourceA: TestResource;
  let testResourceB: TestResource;
  let testStack: cdk.Stack;

  afterAll(() => {
    console.log('Test completed');
  });

  beforeAll(() => {
    const app = new cdk.App();
    testStack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });

    testResourceA = new TestResource(testStack, 'A');
    testResourceB = new TestResource(testResourceA, 'B');
  });

  test('short physical name', () => {
    const nameA = generatePhysicalName(
      'testPrefix',
      ['Foo', 'Bar', 'Baz'],
      32,
      true,
      testResourceA,
    );
    const nameB = generatePhysicalName(
      'testPrefix',
      ['Foo', 'Bar', 'Baz'],
      32,
      true,
      testResourceB,
    );
    expect(nameA).toEqual('testprefixfoobarbaz-900740fe');
    expect(nameB).toEqual('testprefixfoobarbaz-99f0d580');
    expect(nameA).not.toEqual(nameB);
    expect(nameA.length).toBeLessThanOrEqual(32);
    expect(nameB.length).toBeLessThanOrEqual(32);
  });

  test('long physical name', () => {
    const maxLogGroupNameLength = 255;
    const logGroupPrefix = '/aws/vendedlogs/states/constructs/';
    const maxGeneratedNameLength = maxLogGroupNameLength - logGroupPrefix.length;
    const nameParts: string[] = [
      testStack.stackName, // Name of the stack
      'StateMachineLogRag', // Literal string for log group name portion
    ];
    const logGroupName = generatePhysicalName(logGroupPrefix, nameParts, maxGeneratedNameLength);
    expect(logGroupName).toMatch(new RegExp('^/aws/vendedlogs/states/constructs/TestStackStateMachineLogRag-\\$\{Token\[TOKEN\.[0-9]+\]\}$'));
    expect(logGroupName.length).toBeLessThanOrEqual(maxLogGroupNameLength);
  });

  test('lowercase long physical name', () => {
    const maxLogGroupNameLength = 255;
    const logGroupPrefix = '/aws/vendedlogs/states/constructs/';
    const maxGeneratedNameLength = maxLogGroupNameLength - logGroupPrefix.length;
    const nameParts: string[] = [
      testStack.stackName, // Name of the stack
      'StateMachineLogRag', // Literal string for log group name portion
    ];
    const logGroupName = generatePhysicalName(logGroupPrefix, nameParts, maxGeneratedNameLength, true);
    expect(logGroupName).toMatch(new RegExp('^/aws/vendedlogs/states/constructs/teststackstatemachinelograg-\\$\{Token\[TOKEN\.[0-9]+\]\}$'));
    expect(logGroupName.length).toBeLessThanOrEqual(maxLogGroupNameLength);
  });

  test('short name with no resource', () => {
    expect(() => {
      generatePhysicalName(
        'test',
        ['Foo', 'Bar', 'Baz'],
        32,
        true,
      );
    },
    ).toThrow('The resource parameter is required for short names.');
  });

  test('name too long', () => {
    expect(() => {
      generatePhysicalName(
        '/aws/vendedlogs/states/constructs/',
        ['Foo', 'Bar', 'Baz'],
        32,
        true,
        testResourceA,
      );
    }).toThrow('The generated name is longer than the maximum length of');
  });
});


class TestResource extends cdk.Resource {}