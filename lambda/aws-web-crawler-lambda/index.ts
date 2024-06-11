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
import 'jquery';
import { Crawler } from './crawler';
import { CrawlerRequestTest } from './types';

export async function handler(event: any) {
  console.log('Event', event);

  const crawler = new Crawler();

  if (CrawlerRequestTest.isAgentRequest(event)) {
    const response = await crawler.process_agent(event);
    console.log('Response', response);

    return response;
  } else {
    const response = await crawler.process(event);
    console.log('Response', response);

    return response;
  }
}
