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
import { DynamoDBClient, QueryCommand, QueryCommandInput } from '@aws-sdk/client-dynamodb';
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
import { JobDataItem, JobStatus, TargetDataItem } from '../types.js';

import { Utils } from '../utils.js';

export class DynamoDBManager {
  constructor(
    private readonly config: Configuration,
    private readonly client: DynamoDBClient,
    private readonly snsManager: SNSManager,
  ) {}

  async getTargetDataItem(): Promise<TargetDataItem | undefined> {
    const docClient = DynamoDBDocumentClient.from(this.client);

    const params: GetCommandInput = {
      TableName: this.config.targetsTableName,
      Key: { target_url: this.config.targetUrl },
      ConsistentRead: true,
    };

    try {
      const data = await docClient.send(new GetCommand(params));

      return data.Item as TargetDataItem;
    } catch (error: any) {
      log.error(error);
    }

    return undefined;
  }

  async findActiveJob(): Promise<any[]> {
    const ddbClient = DynamoDBDocumentClient.from(this.client);
    const currentTimestamp = Date.now();
    const hours24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const params: QueryCommandInput = {
      TableName: this.config.jobsTableName,
      KeyConditionExpression: '#pk = :pkval',
      ExpressionAttributeNames: {
        '#pk': 'target_url',
      },
      ExpressionAttributeValues: {
        ':pkval': { S: this.config.targetUrl },
      },
      ConsistentRead: true,
    };

    try {
      let allItems: any[] = [];
      let data;
      do {
        data = await ddbClient.send(new QueryCommand(params));
        allItems = allItems.concat(data.Items as any);
        params.ExclusiveStartKey = data.LastEvaluatedKey;
      } while (data.LastEvaluatedKey);

      const activeJobs = allItems.filter(
        (item) =>
          currentTimestamp - item.updated_at['N'] <= hours24 &&
          item.status['S'] !== JobStatus.FINISHED &&
          item.status['S'] !== JobStatus.FAILED,
      );

      return activeJobs;
    } catch (error: any) {
      log.error(error);
    }

    return [];
  }

  async pubJobDataItem() {
    const docClient = DynamoDBDocumentClient.from(this.client);
    const jobId = Utils.generateDateTimeStringWithMilliseconds();

    const jobDataItem: JobDataItem = {
      target_url: this.config.targetUrl,
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
        target_url: this.config.targetUrl,
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
        const targets_params: UpdateCommandInput = {
          TableName: this.config.targetsTableName,
          Key: {
            target_url: this.config.targetUrl,
          },
          UpdateExpression: 'set last_finished_job_id = :j',
          ExpressionAttributeValues: {
            ':j': jobId,
          },
        };

        await docClient.send(new UpdateCommand(targets_params));
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
        target_url: this.config.targetUrl,
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
