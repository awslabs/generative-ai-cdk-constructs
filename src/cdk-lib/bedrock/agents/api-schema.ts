import { CfnAgent } from "aws-cdk-lib/aws-bedrock";
import { Location } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import * as fs from "fs";

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
  readonly s3?: CfnAgent.S3IdentifierProperty;
}

/******************************************************************************
 *                       API SCHEMA CLASS
 *****************************************************************************/
/**
 * Represents the concept of an API Schema for a Bedrock Agent Action Group.
 */
export abstract class ApiSchema {
  /**
   * Creates an API Schema from a local file.
   * @param path - the path to the local file containing the OpenAPI schema for the action group
   */
  public static fromAsset(path: string): InlineApiSchema {
    return new InlineApiSchema(fs.readFileSync(path, "utf8"));
  }

  /**
   * Creates an API Schema from an inline string.
   * @param schema - the JSON or YAML payload defining the OpenAPI schema for the action group
   */
  public static fromInline(schema: string): InlineApiSchema {
    return new InlineApiSchema(schema);
  }
  /**
   * Called when the api schema object is initialized on an action group
   */
  public abstract bind(scope: Construct): ApiSchemaConfig;
}

// ------------------------------------------------------
// Inline Definition
// ------------------------------------------------------
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

// ------------------------------------------------------
// S3 File
// ------------------------------------------------------
/**
 * Class to define an API Schema from an S3 object.
 */
export class S3ApiSchema extends ApiSchema {
  constructor(private readonly location: Location) {
    super();
  }
  public bind(_scope: Construct): ApiSchemaConfig {
    return {
      s3: {
        s3BucketName: this.location.bucketName,
        s3ObjectKey: this.location.objectKey,
      },
    };
  }
}
