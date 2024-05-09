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
import log from '@apify/log';
import Parser from 'rss-parser';
import { TargetDataItem } from './types.js';

export class FeedParser {
  public links: string[] = [];

  constructor(private readonly targetDataItem: TargetDataItem) {}

  async parseFeed() {
    const parser = new Parser();
    const feed = await parser.parseURL(this.targetDataItem.target_url);
    log.info(`Found ${feed.items.length} items in the feed`);

    const lastFinishedJobDate = new Date(this.targetDataItem.last_finished_job_date ?? 0);

    const links = feed.items
      .filter((item) => !item.isoDate || new Date(item.isoDate) > lastFinishedJobDate)
      .map((c) => c.link)
      .filter((c): c is string => c !== null && typeof c !== 'undefined');

    log.info(`Items to be processed: ${links.length}`);

    this.links = links;
  }
}
