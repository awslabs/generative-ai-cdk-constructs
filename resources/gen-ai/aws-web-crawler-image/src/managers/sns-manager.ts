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
import { PublishCommand, PublishCommandInput, SNSClient } from '@aws-sdk/client-sns';
import { Configuration } from './config-manager.js';
import { JobStatus } from '../types.js';

export class SNSManager {
  constructor(private readonly config: Configuration, private readonly client: SNSClient) {}

  async notifyJobStatusChange(status: JobStatus) {
    if (!this.config.snsTopicArn) {
      console.log('No SNS topic ARN provided, skipping notification');
      return;
    }

    const params: PublishCommandInput = {
      Message: JSON.stringify({
        site_id: this.config.siteId,
        job_id: this.config.jobId,
        bucket: this.config.dataBucketName,
        status,
      }),
      TopicArn: this.config.snsTopicArn,
    };

    try {
      await this.client.send(new PublishCommand(params));
    } catch (error) {
      console.error('Error', error);
    }
  }
}
