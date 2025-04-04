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
import { Annotations, Match, Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { AwsSolutionsChecks } from 'cdk-nag';
import { AlgorithmNameType, EngineType, OpensearchFieldType, SpaceType, VectorIndex } from '../../../src/cdk-lib/opensearch-vectorindex';
import { VectorCollection } from '../../../src/cdk-lib/opensearchserverless';

describe('OpenSearch Serverless Vector Index', () => {
  let template: Template;
  let app: cdk.App;
  let stack: cdk.Stack;
  let aossVector: VectorCollection;
  let aossVectorIndex: VectorIndex;
  let testRole: iam.Role;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });

    aossVector = new VectorCollection(stack, 'test-aoss-vector');

    aossVectorIndex = new VectorIndex(stack, 'test-aoss-vector-index', {
      collection: aossVector,
      indexName: 'test-index',
      settings: {
        knn: true,
      },
      mappings: {
        properties: {
          vectorField: {
            type: OpensearchFieldType.KNN_VECTOR,
            dimension: 1536,
            //data_type: props.vectorType === VectorType.BINARY ? 'Binary' : 'float', <- This is missing in L1 CfnIndex props
            method: {
              engine: EngineType.FAISS,
              spaceType: SpaceType.L2,
              name: AlgorithmNameType.HNSW,
              parameters: {},
            },
          },
          AMAZON_BEDROCK_TEXT_CHUNK: {
            type: OpensearchFieldType.TEXT,
            index: true,
          },
        },
      },
    });

    aossVectorIndex.node.addDependency(aossVector.dataAccessPolicy);

    testRole = new iam.Role(stack, 'TestRole', {
      assumedBy: new iam.AccountRootPrincipal(),
    });

    aossVector.grantDataAccess(testRole);

    app.synth();
    template = Template.fromStack(stack);
  });


  test('Should have the correct resources', () => {
    template.resourceCountIs('AWS::OpenSearchServerless::Collection', 1);
    template.resourceCountIs('AWS::OpenSearchServerless::Index', 1);
    template.resourceCountIs('AWS::OpenSearchServerless::AccessPolicy', 2);
  });

  test('No unsuppressed Errors', () => {
    const errors = Annotations.fromStack(stack).findError(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    expect(errors).toHaveLength(0);
  });
});
