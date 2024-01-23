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
   * In case of a LangchainCommonLayer, this parameter is not used.
   *
   * @default - false
   */
  readonly autoUpgrade?: boolean;
  /**
   * Optional: Local compute will be used when installing requirements.txt.
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
     * @summary Constructs a new instance of the LangchainCommonDepsLayer class.
     * @param {cdk.App} scope - represents the scope for all the resources.
     * @param {string} id - this is a a scope-unique id.
     * @param {LangchainLayerProps} props - user provided props for the construct.
     * @since 0.0.0
     * @access public
     */
  constructor(scope: Construct, id: string, props: LangchainLayerProps) {
    super(scope, id);

    const layer = new Layer(this, 'langchaincommonlayer', {
      runtime: props.runtime,
      architecture: props.architecture,
      path: path.join(__dirname, '../../../../layers/langchain-common-deps'),
      description: 'Dependencies to build gen ai applications with the langchain client',
      autoUpgrade: props.autoUpgrade,
      local: props.local,
    });

    this.layer = layer.layer;
  }
}

/**
   * @summary The LangchainCommonLayer class.
   */
export class LangchainCommonLayer extends Construct {
  /**
   * Returns the instance of lambda.LayerVersion created by the construct
   */
  public readonly layer: lambda.LayerVersion;

  /**
     * @summary Constructs a new instance of the LangchainCommonLayer class.
     * @param {cdk.App} scope - represents the scope for all the resources.
     * @param {string} id - this is a a scope-unique id.
     * @param {LangchainLayerProps} props - user provided props for the construct.
     * @since 0.0.0
     * @access public
     */
  constructor(scope: Construct, id: string, props: LangchainLayerProps) {
    super(scope, id);

    const layer = new lambda.LayerVersion(this, 'langchaincommonlayer', {
      compatibleRuntimes: [props.runtime],
      compatibleArchitectures: [props.architecture],
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../layers/langchain-common-layer')),
      description: 'Utilities to build gen ai applications with the langchain client',
    });

    this.layer = layer;
  }
}

