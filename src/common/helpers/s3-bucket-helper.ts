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

import * as s3 from 'aws-cdk-lib/aws-s3';


export interface S3Props {
  readonly existingBucketObj?: s3.Bucket;
  readonly existingBucketInterface?: s3.IBucket;
  readonly bucketProps?: s3.BucketProps;
  readonly existingLoggingBucketObj?: s3.IBucket;
  readonly loggingBucketProps?: s3.BucketProps;
  readonly logS3AccessLogs?: boolean;
}

export function CheckS3Props(propsObject: S3Props | any) {
  let errorMessages = '';
  let errorFound = false;

  if ((propsObject.existingBucketObj || propsObject.existingBucketInterface) && propsObject.bucketProps) {
    errorMessages += 'Error - Either provide bucketProps or existingBucketObj, but not both.\n';
    errorFound = true;
  }

  if (propsObject.existingLoggingBucketObj && propsObject.loggingBucketProps) {
    errorMessages += 'Error - Either provide existingLoggingBucketObj or loggingBucketProps, but not both.\n';
    errorFound = true;
  }

  if ((propsObject?.logS3AccessLogs === false) && (propsObject.loggingBucketProps || propsObject.existingLoggingBucketObj)) {
    errorMessages += 'Error - If logS3AccessLogs is false, supplying loggingBucketProps or existingLoggingBucketObj is invalid.\n';
    errorFound = true;
  }

  if (propsObject.existingBucketObj && (propsObject.loggingBucketProps || propsObject.logS3AccessLogs)) {
    errorMessages += 'Error - If existingBucketObj is provided, supplying loggingBucketProps or logS3AccessLogs is an error.\n';
    errorFound = true;
  }

  if (errorFound) {
    throw new Error(errorMessages);
  }
}
