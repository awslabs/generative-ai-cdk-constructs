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
export interface SiteDataItem {
  site_url: string;
  sitemaps: string[];
  max_requests: number;
  max_files: number;
  download_files: boolean;
  file_types: string[];
  ignore_robots_txt: boolean;
  last_finished_job_id: string;
  schedule_every_n_days: number;
  created_at: number;
  updated_at: number;
}

export interface JobDataItem {
  site_url: string;
  job_id: string;
  status: JobStatus;
  items_processed: number;
  created_at: number;
  updated_at: number;
}

export type DataItem = SuccessDataItem | ErrorDataItem;

export interface SuccessDataItem {
  content_type: string;
  url: string;
  base_url?: string;
  file_type?: string;
  canonical?: string;
  meta?: HtmlMetadata;
  content?: string;
}

export interface ErrorDataItem {
  url: string;
  error: string | string[];
}

export interface HtmlMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}

export enum JobStatus {
  PENDING = 'pending',
  CRAWLING = 'crawling',
  PARSING = 'parsing',
  DOWNLOADING_FILES = 'downloading_files',
  FINISHED = 'finished',
  FAILED = 'failed',
}
