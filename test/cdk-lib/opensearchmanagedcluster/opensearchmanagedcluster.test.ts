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
import { AwsSolutionsChecks } from 'cdk-nag';
import { OpenSearchManagedClusterVectorStore } from '../../../src/cdk-lib/opensearchmanagedcluster';

describe('OpenSearch Managed Cluster Vector Store', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'TestStack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
  });

  describe('Default OpenSearch Managed Cluster Vector Store', () => {
    let opensearchManagedClusterVectorStore: OpenSearchManagedClusterVectorStore;

    beforeAll(() => {
      opensearchManagedClusterVectorStore = new OpenSearchManagedClusterVectorStore({
        domainArn: 'test-domain-arn',
        domainEndpoint: 'test-domain-endpoint',
        vectorIndexName: 'test-vector-index',
        fieldMapping: {
          metadataField: 'test-metadata-field',
          textField: 'test-text-field',
          vectorField: 'test-vector-field',
        },
      });

      app.synth();
      Template.fromStack(stack);
    });

    test('Should have correct properties', () => {
      expect(opensearchManagedClusterVectorStore.domainArn).toEqual('test-domain-arn');
      expect(opensearchManagedClusterVectorStore.domainEndpoint).toEqual('test-domain-endpoint');
      expect(opensearchManagedClusterVectorStore.vectorIndexName).toEqual('test-vector-index');
      expect(opensearchManagedClusterVectorStore.fieldMapping).toEqual({
        metadataField: 'test-metadata-field',
        textField: 'test-text-field',
        vectorField: 'test-vector-field',
      });
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });
});
