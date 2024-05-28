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

import { aws_bedrock as bedrock } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Creates a version of the guardrail.
 *
 * Use this API to create a snapshot of the guardrail when you are satisfied with 
 * a configuration, or to compare the configuration with another version.
 */
export class GuardrailVersion extends Construct {

  /**
   * Instance of guardrail version
   */
  public readonly guardrailVersionInstance: bedrock.CfnGuardrailVersion;

  constructor(scope: Construct, id: string, props: bedrock.CfnGuardrailVersionProps) {
    super(scope, id);

    this.guardrailVersionInstance = new bedrock.CfnGuardrailVersion(this, id, props);

  }

}