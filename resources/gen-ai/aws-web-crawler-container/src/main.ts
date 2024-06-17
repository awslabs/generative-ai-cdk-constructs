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
import { existsSync, mkdirSync } from 'fs';
import log from '@apify/log';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';
import { SNSClient } from '@aws-sdk/client-sns';
import { ScriptRunner } from './common/script-runner.js';
import { Crawler } from './crawler.js';
import { ConfigManager } from './managers/config-manager.js';
import { DynamoDBManager } from './managers/dynamodb-manager.js';
import { S3StorageManager } from './managers/s3storage-manager.js';
import { SNSManager } from './managers/sns-manager.js';
import { JobStatus, TargetType } from './types.js';
import { Utils } from './utils.js';
import { FeedParser } from './feed-parser.js';

(async function start() {
  log.info('Initializing Web Crawler');

  const configManager = new ConfigManager();
  log.info('Config', configManager.config);

  const ddbClient = new DynamoDBClient();
  const s3Client = new S3Client();
  const snsClient = new SNSClient();

  const snsManager = new SNSManager(configManager.config, snsClient);
  const dynamoDBManager = new DynamoDBManager(configManager.config, ddbClient, snsManager);
  const s3StorageManager = new S3StorageManager(configManager.config, s3Client);

  if (!existsSync(configManager.config.outputPath)) {
    mkdirSync(configManager.config.outputPath, { recursive: true });
  }

  const targetDataItem = await dynamoDBManager.getTargetDataItem();
  if (!targetDataItem) {
    log.error('Target data not found');
    return;
  } else {
    log.info('Target Data', targetDataItem);
  }

  const activeJobs = await dynamoDBManager.findActiveJob();
  if (activeJobs.length > 0) {
    log.error('Active jobs found', activeJobs);
    return;
  }

  if (!configManager.config.jobId) {
    const jobId = await dynamoDBManager.pubJobDataItem();
    configManager.setJobId(jobId);
    if (!jobId) {
      log.error('Error creating job data item');
      return;
    }
  }

  const additionalUrls: string[] = [];
  if (targetDataItem.target_type === TargetType.RSS_FEED) {
    const feedParser = new FeedParser(targetDataItem);

    try {
      await feedParser.parseFeed();
      additionalUrls.push(...feedParser.links);
    } catch (error: any) {
      log.error('Error', error);
      await dynamoDBManager.updateJobStatus(configManager.config.jobId, JobStatus.FAILED);
      return;
    }
  }

  try {
    if (!configManager.config.skip_crawl) {
      log.info(`Job Id: ${configManager.config.jobId}`);

      const crawler = new Crawler(configManager.config, targetDataItem, dynamoDBManager, additionalUrls);

      await crawler.start();
      await s3StorageManager.uploadData(configManager.config.jobId, targetDataItem.target_s3_key);
    }

    if (!configManager.config.skip_parse) {
      await dynamoDBManager.updateJobStatus(configManager.config.jobId, JobStatus.PARSING);
      await ScriptRunner.parseHTML(configManager.config);
    }

    if (!configManager.config.skip_download && targetDataItem.download_files) {
      await dynamoDBManager.updateJobStatus(configManager.config.jobId, JobStatus.DOWNLOADING_FILES);
      await ScriptRunner.downloadFiles(configManager.config);
    }

    await dynamoDBManager.updateJobStatus(configManager.config.jobId, JobStatus.FINISHED);
  } catch (error: any) {
    log.error('Error', error);
    await dynamoDBManager.updateJobStatus(configManager.config.jobId, JobStatus.FAILED);
  }

  await Utils.wait(10 * 1000);
  process.exit(0);
})().catch((error) => {
  log.error(error);
  process.exit(1);
});
