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
import { AdapterProps } from '../../../AdapterProps';
import { Layer } from '../../../common/helpers/python-lambda-layer-helper';
import { LangchainProps } from '../../../LangchainProps';

/**
 * The properties for the LangchainLayerProps class.
 */
export interface LangchainLayerProps extends LangchainProps {
  /**
   * Required. Lambda function runtime compatible with this Layer.
   */
  readonly runtime: lambda.Runtime;
  /**
   * Required. Lambda function architecture compatible with this Layer.
   */
  readonly architecture: lambda.Architecture;
  /**
   * Optional: Add '--upgrade' to pip install requirements.txt
   * In case of a LangchainCommonLayer, this parameter is not used.
   *
   * @default - false
   */
  readonly autoUpgrade?: boolean;
  /**
   * A prop allowing additional python pip libraries to be installed with this langchain layer
   *
   * @default - none
   */
  readonly additionalPackages?: string[];
  /** Optional: Local compute will be used when installing requirements.txt.
   * By default, a docker container will be spun up to install requirements. To override this behavior, use the python alias string of `python` or `python3`
   * The string value will be the python alias used to install requirements.
   *
   * @default - none
   */
  readonly local?: 'python' | 'python3';
}

/**
   * @summary The LangchainCommonDepsLayer class.
   */
export class LangchainCommonDepsLayer extends Construct {
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

    const layer = new Layer(this, 'Langchain Layer', {
      path: path.join(__dirname, '../../../../layers/langchain-common-deps'),
      description: 'Dependencies to build gen ai applications with the langchain client',
      ...props,
    });

    this.layer = layer.layer;
  }
}

/**
   * @summary LangchainCommonLayer allows developers to instantiate a llm client adapter on bedrock, sagemaker or openai following best practise.
   *
   * @example
   * from genai_core.adapters.registry import registry
   * from genai_core.clients import get_bedrock_client
   *
   * adapter = registry.get_adapter(f"{provider}.{model_id}")
   * bedrock_client = get_bedrock_client()
   */
export class LangchainCommonLayer extends Construct {
  /**
   * Returns the instance of lambda.LayerVersion created by the construct
   */
  public readonly layer: lambda.LayerVersion;

  /**
     * @summary This construct allows developers to instantiate a llm client adapter on bedrock, sagemaker or openai following best practise.
     * @param {cdk.App} scope - represents the scope for all the resources.
     * @param {string} id - this is a a scope-unique id.
     * @param {AdapterProps} props - user provided props for the construct.
     * @since 0.0.0
     * @access public
     */
  constructor(scope: Construct, id: string, props: AdapterProps) {
    super(scope, id);

    const layer = new lambda.LayerVersion(this, 'Model Adapter Layer', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../layers/model-adapter-layer')),
      description: 'Utilities to instantiate a llm client adapter. Adapters include bedrock, sagemaker, and openai',
      ...props,
    });

    this.layer = layer;
  }
}

