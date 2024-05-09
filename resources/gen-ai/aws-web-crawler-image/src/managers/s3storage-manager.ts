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
import { createReadStream } from 'fs';
import log from '@apify/log';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Configuration } from './config-manager.js';

export class S3StorageManager {
  constructor(private readonly config: Configuration, private readonly client: S3Client) {}

  async uploadData(jobId: string, targetS3Key: string) {
    const bucketName = this.config.dataBucketName;
    const prefix = `${targetS3Key}/jobs/${jobId}`;

    const pagesKey = `${prefix}/${this.config.file_names.pages}`;
    const filesKey = `${prefix}/${this.config.file_names.files}`;
    const errorsKey = `${prefix}/${this.config.file_names.errors}`;
    const sitemapsKey = `${prefix}/${this.config.file_names.sitemaps}`;

    await this.uploadFile(bucketName, pagesKey, this.config.file_paths.pages.toString());
    await this.uploadFile(bucketName, filesKey, this.config.file_paths.files.toString());
    await this.uploadFile(bucketName, errorsKey, this.config.file_paths.errors.toString());
    await this.uploadFile(bucketName, sitemapsKey, this.config.file_paths.sitemaps.toString());
  }

  async uploadFile(bucketName: string, fileKey: string, filePath: string) {
    try {
      const fileStream = createReadStream(filePath);

      const upload = new Upload({
        client: this.client,
        params: {
          Bucket: bucketName,
          Key: fileKey,
          Body: fileStream,
        },
      });

      upload.on('httpUploadProgress', (progress) => {
        log.info(`Upload progress ${fileKey}: ${progress.loaded} of ${progress.total} bytes`);
      });

      await upload.done();
      log.info(`File "${fileKey}" uploaded successfully.`);
    } catch (error: any) {
      log.error('Error uploading file:', error);
    }
  }
}
