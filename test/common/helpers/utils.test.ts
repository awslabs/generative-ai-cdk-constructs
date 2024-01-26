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
import { Construct } from 'constructs';
import { generatePhysicalName, generatePhysicalNameV2, lambdaMemorySizeLimiter, maximumLambdaMemorySizeContextItem, recommendedMaximumLambdaMemorySize } from '../../../src/common/helpers/utils';

describe('lambdaMemorySizeLimiter', () => {
  let testConstruct: TestConstruct;
  let spyOnConsoleWarn: any;
  beforeAll(() => {
    spyOnConsoleWarn = jest.spyOn(console, 'warn');
  });
  afterAll(() => {
    // console.warn = consoleWarn;
    jest.restoreAllMocks();
    console.log('Test "lambdaMemorySizeLimiter" completed');
  });

  test('requested memory above default', () => {
    const app = new cdk.App({});
    const stack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });
    testConstruct = new TestConstruct(stack, 'TestConstruct');
    const requestedMemory = recommendedMaximumLambdaMemorySize + 1;
    const actualMemory = lambdaMemorySizeLimiter(testConstruct, requestedMemory);
    expect(actualMemory).toEqual(recommendedMaximumLambdaMemorySize);
    expect(spyOnConsoleWarn).toHaveBeenCalledTimes(1); // warnings: 1) memory reduced
  });
  test('requested memory equal to default', () => {
    const app = new cdk.App({});
    const stack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });
    testConstruct = new TestConstruct(stack, 'TestConstruct');
    const requestedMemory = recommendedMaximumLambdaMemorySize;
    const actualMemory = lambdaMemorySizeLimiter(testConstruct, requestedMemory);
    expect(actualMemory).toEqual(requestedMemory);
    expect(spyOnConsoleWarn).toHaveBeenCalledTimes(0);
  });
  test('requested memory below default', () => {
    const app = new cdk.App({});
    const stack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });
    testConstruct = new TestConstruct(stack, 'TestConstruct');
    const requestedMemory = recommendedMaximumLambdaMemorySize - 1;
    const actualMemory = lambdaMemorySizeLimiter(testConstruct, requestedMemory);
    expect(actualMemory).toEqual(requestedMemory);
    expect(spyOnConsoleWarn).toHaveBeenCalledTimes(0);
  });
  test('requested memory above set low context maximum', () => {
    const contextLambdaMemorySize = 3008;
    const app = new cdk.App({
      context: {
        [maximumLambdaMemorySizeContextItem]: contextLambdaMemorySize.toString(),
      },
    });
    const stack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });
    testConstruct = new TestConstruct(stack, 'TestConstruct');
    const requestedMemory = contextLambdaMemorySize + 1;
    const actualMemory = lambdaMemorySizeLimiter(testConstruct, requestedMemory);
    expect(actualMemory).toEqual(contextLambdaMemorySize);
    expect(spyOnConsoleWarn).toHaveBeenCalledTimes(2); // warnings: 1) below recommended and 2) memory reduced
  });
  test('requested memory equal to low context maximum', () => {
    const contextLambdaMemorySize = 3008;
    const app = new cdk.App({
      context: {
        [maximumLambdaMemorySizeContextItem]: contextLambdaMemorySize.toString(),
      },
    });
    const stack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });
    testConstruct = new TestConstruct(stack, 'TestConstruct');
    const requestedMemory = contextLambdaMemorySize;
    const actualMemory = lambdaMemorySizeLimiter(testConstruct, requestedMemory);
    expect(actualMemory).toEqual(requestedMemory);
    expect(spyOnConsoleWarn).toHaveBeenCalledTimes(1); // warnings: 1) below recommended
  });
  test('requested memory above set low context maximum', () => {
    const contextLambdaMemorySize = 3008;
    const app = new cdk.App({
      context: {
        [maximumLambdaMemorySizeContextItem]: contextLambdaMemorySize.toString(),
      },
    });
    const stack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });
    testConstruct = new TestConstruct(stack, 'TestConstruct');
    const requestedMemory = contextLambdaMemorySize - 1;
    const actualMemory = lambdaMemorySizeLimiter(testConstruct, requestedMemory);
    expect(actualMemory).toEqual(requestedMemory);
    expect(spyOnConsoleWarn).toHaveBeenCalledTimes(1); // warnings: 1) below recommended and 2) memory reduced
  });
  test('requested memory above set high context maximum', () => {
    const contextLambdaMemorySize = recommendedMaximumLambdaMemorySize * 2;
    const app = new cdk.App({
      context: {
        [maximumLambdaMemorySizeContextItem]: contextLambdaMemorySize.toString(),
      },
    });
    const stack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });
    testConstruct = new TestConstruct(stack, 'TestConstruct');
    const requestedMemory = contextLambdaMemorySize + 1;
    const actualMemory = lambdaMemorySizeLimiter(testConstruct, requestedMemory);
    expect(actualMemory).toEqual(contextLambdaMemorySize);
    expect(spyOnConsoleWarn).toHaveBeenCalledTimes(1); // warnings: 1) memory reduced
  });
  test('requested memory equal to set high context maximum', () => {
    const contextLambdaMemorySize = recommendedMaximumLambdaMemorySize * 2;
    const app = new cdk.App({
      context: {
        [maximumLambdaMemorySizeContextItem]: contextLambdaMemorySize.toString(),
      },
    });
    const stack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });
    testConstruct = new TestConstruct(stack, 'TestConstruct');
    const requestedMemory = contextLambdaMemorySize;
    const actualMemory = lambdaMemorySizeLimiter(testConstruct, requestedMemory);
    expect(actualMemory).toEqual(requestedMemory);
    expect(spyOnConsoleWarn).toHaveBeenCalledTimes(0);
  });
  test('requested memory below set high context maximum', () => {
    const contextLambdaMemorySize = recommendedMaximumLambdaMemorySize * 2;
    const app = new cdk.App({
      context: {
        [maximumLambdaMemorySizeContextItem]: contextLambdaMemorySize.toString(),
      },
    });
    const stack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });
    testConstruct = new TestConstruct(stack, 'TestConstruct');
    const requestedMemory = contextLambdaMemorySize - 1;
    const actualMemory = lambdaMemorySizeLimiter(testConstruct, requestedMemory);
    expect(actualMemory).toEqual(requestedMemory);
    expect(spyOnConsoleWarn).toHaveBeenCalledTimes(0);
  });
});

describe('generatePhysicalName', () => {
  let testStack: cdk.Stack;

  afterAll(() => {
    console.log('Test "generatePhysicalName" completed');
  });

  beforeAll(() => {
    const app = new cdk.App();
    testStack = new cdk.Stack(app, 'TestStack', { env: { account: '012345678912', region: 'bermuda-triangle-1' } });
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

  test('name too long', () => {
    expect(() => {
      generatePhysicalName(
        'test',
        ['Foo', 'Bar', 'Baz'],
        32,
      );
    },
    ).toThrow('The generated name is longer than the maximum length of');
  });
});

describe('generatePhysicalNameV2', () => {
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

  test('long physical name', () => {
    const maxLogGroupNameLength = 255;
    const logGroupPrefix = '/aws/vendedlogs/states/constructs/';
    const logGroupName = generatePhysicalNameV2(
      testResourceB,
      logGroupPrefix,
      {
        maxLength: maxLogGroupNameLength,
        separator: '-',
      });
    expect(logGroupName).toMatch(new RegExp('^/aws/vendedlogs/states/constructs/-TestStack-A-B-[A-Z0-9]{8}'));
    expect(logGroupName.length).toBeLessThanOrEqual(maxLogGroupNameLength);
  });

  test('unique physical names', ()=> {
    const maxLogGroupNameLength = 255;
    const logGroupPrefix = '/aws/vendedlogs/states/constructs/';
    const logGroupNameA = generatePhysicalNameV2(
      testResourceA,
      logGroupPrefix,
      {
        maxLength: maxLogGroupNameLength,
        separator: '-',
      });
    const logGroupNameB = generatePhysicalNameV2(
      testResourceB,
      logGroupPrefix,
      {
        maxLength: maxLogGroupNameLength,
        separator: '-',
      });
    expect(logGroupNameA).not.toEqual(logGroupNameB);
    expect(logGroupNameA.length).toBeLessThanOrEqual(maxLogGroupNameLength);
    expect(logGroupNameB.length).toBeLessThanOrEqual(maxLogGroupNameLength);
    expect(logGroupNameA).toMatch(new RegExp('^/aws/vendedlogs/states/constructs/-TestStack-A-[A-Z0-9]{8}$'));
    expect(logGroupNameB).toMatch(new RegExp('^/aws/vendedlogs/states/constructs/-TestStack-A-B-[A-Z0-9]{8}$'));
  });

  test('lower case names', () => {
    const maxLogGroupNameLength = 255;
    const logGroupPrefix = '/aws/vendedlogs/states/constructs/';
    const logGroupName = generatePhysicalNameV2(
      testResourceB,
      logGroupPrefix,
      {
        maxLength: maxLogGroupNameLength,
        separator: '-',
        lower: true,
      });
    expect(logGroupName).toMatch(new RegExp('^/aws/vendedlogs/states/constructs/-teststack-a-b-[a-z0-9]{8}$'));
    expect(logGroupName.length).toBeLessThanOrEqual(maxLogGroupNameLength);
    expect(logGroupName).not.toMatch(new RegExp('[A-Z]'));
  });

  test('prefix too long', () => {
    expect(() => {
      generatePhysicalNameV2(
        testResourceB,
        '/aws/vendedlogs/states/constructs/',
        {
          maxLength: 32,
          separator: '-',
        });
    },
    ).toThrow('The prefix is longer than the maximum length.');
  });

  test('maxlength too short', () => {

    expect(() => {
      generatePhysicalNameV2(
        testResourceB,
        'test',
        {
          maxLength: 13,
        });
    }).toThrow(new RegExp('^The generated name is longer than the maximum length of'));
  });
});

class TestResource extends cdk.Resource {}
class TestConstruct extends Construct {}