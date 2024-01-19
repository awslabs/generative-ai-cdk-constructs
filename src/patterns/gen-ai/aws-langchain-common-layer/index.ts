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
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { Layer } from '../../../common/helpers/python-lambda-layer-helper';

/**
 * The properties for the LangchainLayerProps class.
 */
export interface LangchainLayerProps {
  /**
   * Required. Lambda function runtime compatible with this Layer.
   *
   * @default - none
   */
  readonly runtime: lambda.Runtime;
  /**
   * Required. Lambda function architecture compatible with this Layer.
   *
   * @default - none
   */
  readonly architecture: lambda.Architecture;
  /**
   * Optional: Add '--upgrade' to pip install requirements.txt
   *
   * @default - none
   */
  readonly autoUpgrade?: boolean;
}

/**
   * @summary The LangchainDepsLayer class.
   */
export class LangchainDepsLayer extends Construct {
  /**
   * Returns the instance of lambda.LayerVersion created by the construct
   */
  public readonly layer: lambda.LayerVersion;

  /**
     * @summary This construct creates a lambda layer loaded with relevant libraries to run genai applications. Libraries include boto3, botocore, requests, requests-aws4auth, langchain, opensearch-py and openai.
     * @param {cdk.App} scope - represents the scope for all the resources.
     * @param {string} id - this is a a scope-unique id.
     * @param {LangchainLayerProps} props - user provided props for the construct.
     * @since 0.0.0
     * @access public
     */
  constructor(scope: Construct, id: string, props: LangchainLayerProps) {
    super(scope, id);

    const layer = new Layer(this, 'Langchain Dep Layer', {
      runtime: props.runtime,
      architecture: props.architecture,
      path: path.join(__dirname, '../../../../layers/langchain-common-deps'),
      autoUpgrade: props.autoUpgrade,
      description: 'Dependencies to build gen ai applications with the langchain client',
    });

    this.layer = layer.layer;
  }
}

/**
   * @summary The ModelAdapterLayer class.
   */
export class ModelAdapterLayer extends Construct {
  /**
   * Returns the instance of lambda.LayerVersion created by the construct
   */
  public readonly layer: lambda.LayerVersion;

  /**
     * @summary This construct allows developers to instantiate a llm client adapter on bedrock, sagemaker or openai following best practise.
     * @param {cdk.App} scope - represents the scope for all the resources.
     * @param {string} id - this is a a scope-unique id.
     * @param {ModelAdapterProps} props - user provided props for the construct.
     * @since 0.0.0
     * @access public
     */
  constructor(scope: Construct, id: string, props: LangchainLayerProps) {
    super(scope, id);

    const layer = new lambda.LayerVersion(this, 'Model Adapter Layer', {
      compatibleRuntimes: [props.runtime],
      compatibleArchitectures: [props.architecture],
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../layers/langchain-common-layer')),
      description: 'Utilities to build gen ai applications with the langchain client',
    });

    this.layer = layer;
  }
}

