import { CfnAgent } from "aws-cdk-lib/aws-bedrock";
import { Location } from "aws-cdk-lib/aws-s3";
import * as fs from "fs";

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

  public readonly s3File?: Location;
  public readonly inlineSchema?: string;
  /**
   * Format as CFN properties
   *
   * @internal This is an internal core function and should not be called directly.
   */
  public abstract _render(): CfnAgent.APISchemaProperty;

  public constructor(s3File?: Location, inlineSchema?: string) {
    this.s3File = s3File;
    this.inlineSchema = inlineSchema;
  }
}

// ------------------------------------------------------
// Inline Definition
// ------------------------------------------------------
export class InlineApiSchema extends ApiSchema {
  constructor(private readonly schema: string) {
    super(undefined, schema);
  }

  public _render(): CfnAgent.APISchemaProperty {
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
    super(location, undefined);
  }
  public _render(): CfnAgent.APISchemaProperty {
    return {
      s3: {
        s3BucketName: this.location.bucketName,
        s3ObjectKey: this.location.objectKey,
      },
    };
  }
}
