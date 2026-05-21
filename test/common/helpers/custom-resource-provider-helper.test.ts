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

import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { buildCustomResourceProvider } from '../../../src/common/helpers/custom-resource-provider-helper';

jest.mock('child_process', () => ({
  spawnSync: jest.fn().mockImplementation((_cmd: string, _args: string[]) => {
    // Extract outputDir from the args to write a dummy file for CDK's AssetStaging
    if (_args?.includes('--upgrade')) {
      const tIdx = _args.indexOf('-t');
      if (tIdx !== -1) {
        const outputDir = _args[tIdx + 1];
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'dummy.py'), '# bundled');
      }
    }
    return { status: 0 };
  }),
}));

const AOSSCRProvider = buildCustomResourceProvider({
  providerName: 'OpenSearchIndexCRProvider',
  codePath: path.join(
    __dirname, '../../../lambda/opensearch-serverless-custom-resources'),
  handler: 'custom_resources.on_event',
  runtime: lambda.Runtime.PYTHON_3_13,
});

describe('Custom Resource Provider', () => {
  test('Custom Resource Provider is created', () => {
    const stack = new cdk.Stack();
    AOSSCRProvider.getProvider(stack);
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'custom_resources.on_event',
      Runtime: 'python3.13',
    });
  });

  test('Local bundling calls spawnSync with poetry commands', () => {
    const stack = new cdk.Stack();
    AOSSCRProvider.getProvider(stack);
    expect(child_process.spawnSync).toHaveBeenCalledWith(
      'poetry',
      expect.arrayContaining(['install']),
      expect.objectContaining({ cwd: expect.stringContaining('opensearch-serverless-custom-resources'), shell: true }),
    );
  });

  test('Local bundling returns false when spawnSync fails', () => {
    // Mock spawnSync to simulate poetry/pip not being available
    (child_process.spawnSync as jest.Mock).mockReturnValueOnce({ status: 1 });

    const FailProvider = buildCustomResourceProvider({
      providerName: 'FailCRProvider',
      codePath: path.join(__dirname, '../../../lambda/opensearch-serverless-custom-resources'),
      handler: 'custom_resources.on_event',
      runtime: lambda.Runtime.PYTHON_3_13,
    });

    // tryBundle returns false (status !== 0), CDK falls back to Docker which fails in test env
    const stack = new cdk.Stack();
    expect(() => FailProvider.getProvider(stack)).toThrow();
    // Verify the local bundling poetry command was attempted
    expect((child_process.spawnSync as jest.Mock).mock.calls).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([
          'pip',
          expect.arrayContaining(['install', 'poetry']),
          expect.objectContaining({ cwd: expect.stringContaining('opensearch-serverless-custom-resources'), shell: true }),
        ]),
      ]),
    );
  });

  test('Local bundling returns false when spawnSync throws an exception', () => {
    // Mock spawnSync to throw (e.g. bash not found)
    (child_process.spawnSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('ENOENT: bash not found');
    });

    const ThrowProvider = buildCustomResourceProvider({
      providerName: 'ThrowCRProvider',
      codePath: path.join(__dirname, '../../../lambda/opensearch-serverless-custom-resources'),
      handler: 'custom_resources.on_event',
      runtime: lambda.Runtime.PYTHON_3_13,
    });

    // tryBundle catches the exception and returns false, CDK falls back to Docker which fails
    const stack = new cdk.Stack();
    expect(() => ThrowProvider.getProvider(stack)).toThrow();
  });
});
