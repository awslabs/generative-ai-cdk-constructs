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
import { PineconeVectorStore } from '../../../src/cdk-lib/pinecone';

describe('Pinecone Vector Store', () => {
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

  describe('Default Pinecone Vector Store', () => {
    let pineconeVectorStore: PineconeVectorStore;

    beforeAll(() => {
      pineconeVectorStore = new PineconeVectorStore({
        connectionString: 'test-connection-string',
        credentialsSecretArn: 'test-secret-arn',
        namespace: 'test-namespace',
        textField: 'testextfield',
        metadataField: 'testmetadata',
      });

      app.synth();
      Template.fromStack(stack);
    });

    test('Should have correct properties', () => {
      expect(pineconeVectorStore.connectionString).toEqual('test-connection-string');
      expect(pineconeVectorStore.credentialsSecretArn).toEqual('test-secret-arn');
      expect(pineconeVectorStore.namespace).toEqual('test-namespace');
      expect(pineconeVectorStore.kmsKey).toBeUndefined();
      expect(pineconeVectorStore.textField).toEqual('testextfield');
      expect(pineconeVectorStore.metadataField).toEqual('testmetadata');
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });

  describe('Pinecone Vector Store with KMS Key', () => {
    let pineconeVectorStore: PineconeVectorStore;

    beforeAll(() => {
      pineconeVectorStore = new PineconeVectorStore({
        connectionString: 'test-connection-string',
        credentialsSecretArn: 'test-secret-arn',
        kmsKey: 'test-kms-key',
        textField: 'testextfield',
        metadataField: 'testmetadata',
      });

      app.synth();
      Template.fromStack(stack);
    });

    test('Should have correct properties', () => {
      expect(pineconeVectorStore.connectionString).toEqual('test-connection-string');
      expect(pineconeVectorStore.credentialsSecretArn).toEqual('test-secret-arn');
      expect(pineconeVectorStore.namespace).toBeUndefined();
      expect(pineconeVectorStore.kmsKey).toEqual('test-kms-key');
      expect(pineconeVectorStore.textField).toEqual('testextfield');
      expect(pineconeVectorStore.metadataField).toEqual('testmetadata');
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