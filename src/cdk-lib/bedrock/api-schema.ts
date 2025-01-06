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

import * as fs from 'fs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

/**
 * Result of binding `ApiSchema` into an `ActionGroup`.
 */
export interface ApiSchemaConfig {
  /**
   * The JSON or YAML-formatted payload defining the OpenAPI schema for the action group.
   * (mutually exclusive with `s3`)
   */
  readonly payload?: string;
  /**
   * Contains details about the S3 object containing the OpenAPI schema for the action group.
   * (mutually exclusive with `payload`)
   */
  readonly s3?: S3Identifier;
}

/**
 * Result of the bind when `S3ApiSchema` is used.
 */
export interface S3Identifier {
  /**
   * The name of the S3 bucket.
   */
  readonly s3BucketName: string;
  /**
   * The S3 object key containing the resource.
   */
  readonly s3ObjectKey: string;
}

/**
 * Bedrock Agents Action Group API Schema definition.
 */
export abstract class ApiSchema {
  /**
   * Inline code for API Schema
   * @return `InlineApiSchema` with inline schema
   * @param schema The actual Open API schema
   */
  public static fromInline(schema: string): InlineApiSchema {
    return new InlineApiSchema(schema);
  }

  /**
   * Loads the API Schema from a local disk path.
   * @return `InlineApiSchema` with the contents of `path`
   * @param path Path to the Open API schema file in yaml or JSON
   */
  public static fromAsset(path: string): InlineApiSchema {
    return new InlineApiSchema(fs.readFileSync(path, 'utf8'));
  }

  /**
   * API Schema as an S3 object.
   * @return `S3ApiSchema` with the S3 bucket and key.
   * @param bucket The S3 bucket
   * @param key The object key
   */
  public static fromBucket(bucket: s3.IBucket, key: string): S3ApiSchema {
    return new S3ApiSchema(bucket, key);
  }

  /**
   * Called when the action group is initialized to allow this object to bind
   * to the stack, add resources and have fun.
   *
   * @param scope The binding scope. Don't be smart about trying to down-cast or
   * assume it's initialized. You may just use it as a construct scope.
   */
  public abstract bind(scope: Construct): ApiSchemaConfig;
}

/**
 * API Schema from a string value.
 */
export class InlineApiSchema extends ApiSchema {
  constructor(private schema: string) {
    super();
  }

  bind(_scope: Construct): ApiSchemaConfig {
    return {
      payload: this.schema,
    };
  }
}

/**
 * API Schema in an S3 object.
 */
export class S3ApiSchema extends ApiSchema {
  constructor(private bucket: s3.IBucket, private key: string) {
    super();
  }

  bind(_scope: Construct): ApiSchemaConfig {
    return {
      s3: {
        s3BucketName: this.bucket.bucketName,
        s3ObjectKey: this.key,
      },
    };
  }
}
