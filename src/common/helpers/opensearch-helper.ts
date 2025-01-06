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

import * as openSearchServerless from 'aws-cdk-lib/aws-opensearchserverless';
import * as opensearchservice from 'aws-cdk-lib/aws-opensearchservice';

export interface OpenSearchProps {
  /**
   * Optional existing Amazon OpenSearch Service domain.
   *
   * @default - None
   */
  readonly existingOpensearchDomain?: opensearchservice.IDomain;
  /**
   * Optional existing Amazon Amazon OpenSearch Serverless collection.
   *
   * @default - None.
   */
  readonly existingOpensearchServerlessCollection?: openSearchServerless.CfnCollection;
}

export function CheckOpenSearchProps(propsObject: OpenSearchProps | any) {
  let errorMessages = '';
  let errorFound = false;

  if (propsObject.existingOpenSearchDomain && propsObject.existingOpenSearchServerlessCollection) {
    errorMessages += 'Error - Either provide existingOpenSearchDomain or existingOpenSearchServerlessCollection, but not both.\n';
    errorFound = true;
  }

  if (propsObject.existingOpenSearchDomain === null && propsObject.existingOpenSearchServerlessCollection === null) {
    errorMessages += 'Error - existingOpenSearchDomain and existingOpenSearchServerlessCollection cannot both be null. Please provide one.\n';
    errorFound = true;
  }

  if (propsObject.existingOpenSearchDomain && !propsObject.existingVpc) {
    errorMessages += 'Error - When using an existing OpenSearch domain, you must also provide an existing VPC.\n';
    errorFound = true;
  }

  if (errorFound) {
    throw new Error(errorMessages);
  }
}

export function getOpenSearchApiName(propsObject: OpenSearchProps) {
  if (propsObject.existingOpensearchDomain) {
    return 'es';

  } else if (propsObject.existingOpensearchServerlessCollection) {
    return 'aoss';
  }

  throw new Error('OpenSearch resouce not defined.');
}

export function getOpenSearchEndpoint(propsObject: OpenSearchProps) {
  if (propsObject.existingOpensearchDomain) {
    return propsObject.existingOpensearchDomain.domainEndpoint;

  } else if (propsObject.existingOpensearchServerlessCollection) {
    return propsObject.existingOpensearchServerlessCollection.attrCollectionEndpoint;
  }

  throw new Error('OpenSearch resouce not defined.');
}