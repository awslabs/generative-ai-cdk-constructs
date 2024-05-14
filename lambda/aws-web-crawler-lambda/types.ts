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

export type CrawlerRequest = CrawlerAgentRequest | CrawlerSimpleRequest;

export interface CrawlerSimpleRequest {
  urls?: string[];
  include_html?: boolean;
}
export interface CrawlerAgentRequest {
  messageVersion: '1.0';
  agent: {
    name: string;
    id: string;
    alias: string;
    version: string;
  };
  inputText: string;
  sessionId: string;
  actionGroup: string;
  apiPath: string;
  httpMethod: string;
  parameters?: CrawlerRequestParameter[];
}

export interface CrawlerRequestParameter {
  name: string;
  type: string;
  value: string;
}

export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}

export abstract class CrawlerRequestTest {
  static isAgentRequest(object: CrawlerRequest): object is CrawlerAgentRequest {
    return typeof (object as CrawlerAgentRequest)['agent'] !== 'undefined';
  }
}
