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
import { buildCustomResourceProvider } from '../../common/helpers/custom-resource-provider-helper';

/**
 * The custom resource provider for Bedrock.
 *
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 */
export const BedrockCRProvider = buildCustomResourceProvider({
  providerName: 'BedrockCRProvider',
  codePath: path.join(
    __dirname, '../../../lambda/bedrock-custom-resources'),
  handler: 'custom_resources.on_event',
  runtime: lambda.Runtime.PYTHON_3_12,
});
