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
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { Configuration } from './config-manager.js';
import { SNSManager } from './sns-manager.js';
import { JobDataItem, JobStatus, SiteDataItem } from '../types.js';

import { Utils } from '../utils.js';

export class DynamoDBManager {
  constructor(
    private readonly config: Configuration,
    private readonly client: DynamoDBClient,
    private readonly snsManager: SNSManager,
  ) {}

  async getSiteDataItem(): Promise<SiteDataItem | undefined> {
    const docClient = DynamoDBDocumentClient.from(this.client);

    const params: GetCommandInput = {
      TableName: this.config.sitesTableName,
      Key: { site_id: this.config.siteId },
      ConsistentRead: true,
    };

    try {
      const data = await docClient.send(new GetCommand(params));

      return data.Item as SiteDataItem;
    } catch (error: any) {
      log.error(error);
    }

    return undefined;
  }

  async pubJobDataItem() {
    const docClient = DynamoDBDocumentClient.from(this.client);
    const jobId = Utils.generateDateTimeStringWithMilliseconds();

    const jobDataItem: JobDataItem = {
      site_id: this.config.siteId,
      job_id: jobId,
      status: JobStatus.PENDING,
      items_processed: 0,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    const params: PutCommandInput = {
      TableName: this.config.jobsTableName,
      Item: jobDataItem,
    };

    try {
      await docClient.send(new PutCommand(params));

      return jobId;
    } catch (error: any) {
      log.error(error);
    }

    return undefined;
  }

  async updateJobStatus(jobId: string, status: JobStatus) {
    const docClient = DynamoDBDocumentClient.from(this.client);

    const jobs_params: UpdateCommandInput = {
      TableName: this.config.jobsTableName,
      Key: {
        site_id: this.config.siteId,
        job_id: jobId,
      },
      UpdateExpression: 'set #status = :s, updated_at = :u',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':s': status,
        ':u': Date.now(),
      },
    };

    try {
      await docClient.send(new UpdateCommand(jobs_params));

      if (status === JobStatus.FINISHED) {
        log.info(`Updating last_finished_job_id to ${jobId}`);
        const sites_params: UpdateCommandInput = {
          TableName: this.config.sitesTableName,
          Key: {
            site_id: this.config.siteId,
          },
          UpdateExpression: 'set last_finished_job_id = :j',
          ExpressionAttributeValues: {
            ':j': jobId,
          },
        };

        await docClient.send(new UpdateCommand(sites_params));
      }
    } catch (error: any) {
      log.error(error);
    }

    await this.snsManager.notifyJobStatusChange(status);
  }

  async updateJobItemsProcessed(jobId: string, items_processed: number) {
    const docClient = DynamoDBDocumentClient.from(this.client);

    const params: UpdateCommandInput = {
      TableName: this.config.jobsTableName,
      Key: {
        site_id: this.config.siteId,
        job_id: jobId,
      },
      UpdateExpression: 'set items_processed = :p, updated_at = :u',
      ExpressionAttributeValues: {
        ':p': items_processed,
        ':u': Date.now(),
      },
    };

    try {
      await docClient.send(new UpdateCommand(params));
    } catch (error: any) {
      log.error(error);
    }
  }
}
