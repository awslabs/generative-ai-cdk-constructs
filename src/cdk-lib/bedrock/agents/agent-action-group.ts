import * as s3 from "aws-cdk-lib/aws-s3";
import * as bedrock from "aws-cdk-lib/aws-bedrock";
import { Construct } from "constructs";
import * as fs from "fs";
import { Function } from "aws-cdk-lib/aws-lambda";

/******************************************************************************
 *                              API Schema
 *****************************************************************************/
/**
 * Bedrock Agents Action Group API Schema definition.
 * @see https://docs.aws.amazon.com/bedrock/latest/userguide/agents-api-schema.html
 */
export abstract class ApiSchema {
  /**
   * Inline code for API Schema
   * @return `InlineApiSchema` with inline schema
   * @param schema The actual Open API schema
   */
  public static fromInline(schema: string): bedrock.CfnAgent.APISchemaProperty {
    return {
      payload: schema,
    };
  }

  /**
   * Loads the API Schema from a local disk path.
   */
  public static fromLocalFile(path: string): bedrock.CfnAgent.APISchemaProperty {
    return {
      payload: fs.readFileSync(path, "utf8"),
    };
  }

  /**
   * API Schema as an S3 object.
   */
  public static fromS3File(s3object: s3.Location): bedrock.CfnAgent.APISchemaProperty {
    return {
      s3: {
        s3BucketName: s3object.bucketName,
        s3ObjectKey: s3object.objectKey,
      },
    };
  }
}

/******************************************************************************
 *                              Action Group
 *****************************************************************************/

export class ActionGroupExecutor {
  public static lambdaFunction(lambdaFunction: Function): bedrock.CfnAgent.ActionGroupExecutorProperty {
    return {
      lambda: lambdaFunction.functionArn,
    };
  }

  public static returnControl(): bedrock.CfnAgent.ActionGroupExecutorProperty {
    return {
      customControl: "RETURN_CONTROL",
    };
  }
}
