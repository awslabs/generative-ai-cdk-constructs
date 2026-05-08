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

import type { ValidationError } from 'aws-cdk-lib';

type ValidationErrorName = ConstructorParameters<typeof ValidationError>[0];

/**
 * Tagged template for stable {@link ValidationError} names, matching aws-cdk-lib `lit` (no runtime dependency on private exports).
 */
export function lit(template: TemplateStringsArray): ValidationErrorName {
  if (template.length !== 1) {
    throw new Error(`String literal may not contain any variables, got \`${template.join('${...}')}\``);
  }
  return template[0] as ValidationErrorName;
}
