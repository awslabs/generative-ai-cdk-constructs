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
import { PathLike } from 'fs';
import { tmpdir } from 'os';
import * as path from 'path';

export interface Configuration {
  targetsTableName: string;
  jobsTableName: string;
  dataBucketName: string;
  snsTopicArn: string;
  targetUrl: string;
  jobId: string;
  skip_crawl: boolean;
  skip_parse: boolean;
  skip_download: boolean;
  outputPath: string;
  jobDate: Date;
  file_names: {
    pages: string;
    files: string;
    errors: string;
    sitemaps: string;
  };
  file_paths: {
    pages: PathLike;
    files: PathLike;
    errors: PathLike;
    sitemaps: PathLike;
  };
}

export class ConfigManager {
  public config: Configuration;

  constructor() {
    const outputPath = tmpdir();
    const file_names = {
      pages: 'crawl_data.jsonl',
      files: 'crawl_files.jsonl',
      errors: 'crawl_errors.jsonl',
      sitemaps: 'crawl_sitemaps.jsonl',
    };

    const file_paths = {
      pages: path.join(outputPath, file_names.pages),
      files: path.join(outputPath, file_names.files),
      errors: path.join(outputPath, file_names.errors),
      sitemaps: path.join(outputPath, file_names.sitemaps),
    };

    this.config = {
      jobDate: new Date(),
      targetsTableName: process.env.TARGETS_TABLE_NAME ?? '',
      jobsTableName: process.env.JOBS_TABLE_NAME ?? '',
      dataBucketName: process.env.DATA_BUCKET_NAME ?? '',
      snsTopicArn: process.env.SNS_TOPIC_ARN ?? '',
      targetUrl: process.env.TARGET_URL ?? '',
      jobId: process.env.JOB_ID ?? '',
      skip_crawl: process.env.SKIP_CRAWL === 'true',
      skip_parse: process.env.SKIP_PARSE === 'true',
      skip_download: process.env.SKIP_DOWNLOAD === 'true',
      outputPath,
      file_names,
      file_paths,
    };
  }

  setJobId(jobId: string | undefined | null) {
    this.config.jobId = jobId ?? '';
  }
}
