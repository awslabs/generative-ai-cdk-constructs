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
import * as path from 'path';
import { Duration, Stack } from 'aws-cdk-lib';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Function, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { BaseClass, BaseClassProps, ConstructName } from '../../../../src';

describe('BaseClass', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('should instantiate with default properties', () => {
    const baseClass = new BaseClass(stack, 'BaseClassTest');

    // expect(baseClass.stage).toBe('-dev');
    expect(baseClass.lambdaTracing).toBe(lambda.Tracing.ACTIVE);
    expect(baseClass.enablexray).toBe(true);
  });

  it('should update environment suffix', () => {
    class TestClass extends BaseClass {
      constructor(scope: Construct, id: string, props: BaseClassProps) {
        super(scope, id);
        this.updateEnvSuffix(props);
      }
    }

    const testClass = new TestClass(stack, 'Test', { stage: '-prod', constructName: ConstructName.AWSRAGAPPSYNCSTEPFNOPENSEARCH, constructId: '1' });
    expect(testClass.stage).toBe('-prod');
  });

  it('should update construct usage metric code', () => {
    class TestClass extends BaseClass {
      constructor(scope: Construct, id: string, props: BaseClassProps, lambdaFunctions: lambda.DockerImageFunction[]) {
        super(scope, id);
        this.updateConstructUsageMetricCode(props, scope, lambdaFunctions);
      }
    }
    const cdkStack = new Stack();

    let startDataSyncRole = new Role(cdkStack, 'startDataSyncRole', {
      description: 'Role used by the Document Status Update Lambda function',
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });

    const lambdaFunction = new Function(cdkStack, 'kendraStartDataSync', {
      runtime: Runtime.PYTHON_3_10,
      handler: 'start_sync.lambda_handler',
      code: Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-rag-appsync-stepfn-kendra/kendra_sync/')),
      timeout: Duration.seconds(30),
      role: startDataSyncRole,
      environment: {
        KENDRA_INDEX_ID: '123',
        KENDRA_DATA_SOURCE_INDEX_ID: '123',
        DOCUMENTS_TABLE: 'tableName',
      },
    });

    new TestClass(stack, 'Test', {
      enableOperationalMetric: true,
      constructName: ConstructName.AWSRAGAPPSYNCSTEPFNOPENSEARCH,
      constructId: '1',
    },
    [lambdaFunction]);

    const expectedPattern = /Description:\s+\(uksb-1tupboc45\)\s+\(version:0\.0\.0\)\s+\(tag:(C1:1,C2:0,C3:0,C4:0,C5:0,C6:0,C7:0,C8:0)\)/;
    expect(stack.templateOptions.description).toMatch(expectedPattern);

  });

  it('should add observability to construct', () => {
    class TestClass extends BaseClass {
      constructor(scope: Construct, id: string, props: BaseClassProps) {
        super(scope, id);
        this.addObservabilityToConstruct(props);
      }
    }

    const testClass = new TestClass(stack, 'Test',
      { observability: false, constructName: ConstructName.AWSRAGAPPSYNCSTEPFNOPENSEARCH, constructId: '1' });
    expect(testClass.enablexray).toBe(false);
    expect(testClass.lambdaTracing).toBe(lambda.Tracing.DISABLED);
  });
});
