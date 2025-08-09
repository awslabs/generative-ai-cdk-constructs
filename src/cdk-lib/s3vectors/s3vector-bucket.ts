import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import * as cr from "aws-cdk-lib/custom-resources";
import type {
  CreateIndexInput,
  DeleteIndexCommandInput,
  CreateVectorBucketInput,
  DeleteVectorBucketCommandInput,
} from "@aws-sdk/client-s3vectors";

export enum S3VectorDataType {
  FLOAT32 = "float32",
}

export enum S3VectorDistanceMetric {
  COSINE = "cosine",
  EUCLIDEAN = "euclidean",
}

export interface S3VectorBucketProps {
  /**
   * The name of the S3 vector bucket to create.
   * If not provided, a unique name will be generated.
   */
  readonly bucketName?: string;

  /**
   * An array of vector indices to create within the bucket.
   */
  readonly indices: S3VectorBucketIndexProps[];
}

export interface S3VectorBucketIndexProps {
  /**
   * The name of the vector index.
   * If not provided, a name like 'index0', 'index1', etc. will be generated.
   */
  readonly indexName?: string;

  /**
   * The data type of the vectors in the index.
   * @default VectorDataType.FLOAT32
   */
  readonly dataType?: S3VectorDataType;

  /**
   * The dimension of the vectors in the index.
   * @default 1024
   */
  readonly dimension?: number;

  /**
   * The distance metric used for similarity search in the index.
   * @default VectorDistanceMetric.COSINE
   */
  readonly distanceMetric?: S3VectorDistanceMetric;
}

export class S3VectorBucket extends Construct {
  /**
   * The ARN of the created vector bucket.
   */
  public readonly bucketArn: string;

  /**
   * The ARNs of the created vector indices, in the order provided in the props.
   */
  public readonly indexArns: string[];

  /**
   * The name of the created vector bucket.
   */
  public readonly bucketName: string;

  /**
   * The names of the created vector indices, in the order provided in the props.
   */
  public readonly indexNames: string[];

  constructor(scope: Construct, id: string, props: S3VectorBucketProps) {
    super(scope, id);

    const effectiveBucketName =
      props.bucketName ??
      cdk.Names.uniqueResourceName(this, {
        maxLength: 63,
        separator: "-",
      }).toLowerCase();

    const bucketArn = `arn:aws:s3vectors:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:bucket/${effectiveBucketName}`;

    // Create a custom resource for the vector bucket.
    const bucketCustomResource = new cr.AwsCustomResource(
      this,
      "VectorBucket",
      {
        installLatestAwsSdk: true,
        onCreate: {
          service: "S3Vectors",
          action: "createVectorBucket",
          parameters: {
            vectorBucketName: effectiveBucketName,
          } as CreateVectorBucketInput,
          physicalResourceId: cr.PhysicalResourceId.of(bucketArn),
        },
        onDelete: {
          service: "S3Vectors",
          action: "deleteVectorBucket",
          parameters: {
            vectorBucketName: effectiveBucketName,
          } as DeleteVectorBucketCommandInput,
        },
        policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
          resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
        }),
      }
    );

    this.bucketArn = bucketArn;
    this.bucketName = effectiveBucketName;

    this.indexArns = [];
    this.indexNames = [];

    // Create a custom resource for each vector index, depending on the bucket.
    props.indices.forEach((index, i) => {
      const effectiveIndexName = index.indexName ?? `index${i}`;
      const effectiveDataType = index.dataType ?? S3VectorDataType.FLOAT32;
      const effectiveDimension = index.dimension ?? 1024;
      const effectiveDistanceMetric =
        index.distanceMetric ?? S3VectorDistanceMetric.COSINE;

      const indexArn = `arn:aws:s3vectors:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:bucket/${effectiveBucketName}/index/${effectiveIndexName}`;
      const indexCustomResource = new cr.AwsCustomResource(
        this,
        `VectorIndex${i}`,
        {
          installLatestAwsSdk: true,
          onCreate: {
            service: "S3Vectors",
            action: "createIndex",
            parameters: {
              vectorBucketName: effectiveBucketName,
              indexName: effectiveIndexName,
              dataType: effectiveDataType,
              dimension: effectiveDimension,
              distanceMetric: effectiveDistanceMetric,
            } as CreateIndexInput,
            physicalResourceId: cr.PhysicalResourceId.of(indexArn),
          },
          onDelete: {
            service: "S3Vectors",
            action: "deleteIndex",
            parameters: {
              vectorBucketName: effectiveBucketName,
              indexName: effectiveIndexName,
            } as DeleteIndexCommandInput,
          },
          policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
            resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
          }),
        }
      );

      // Ensure the index is created after the bucket and deleted before the bucket.
      indexCustomResource.node.addDependency(bucketCustomResource);

      this.indexArns.push(indexArn);
      this.indexNames.push(effectiveIndexName);
    });
  }

  public grantDataAccess(grantee: iam.IRole): void {
    for (const indexArn of this.indexArns) {
      grantee.addToPrincipalPolicy(new iam.PolicyStatement({
        actions: [
          "s3vectors:PutVectors",
          "s3vectors:GetVectors",
          "s3vectors:DeleteVectors",
          "s3vectors:QueryVectors",
          "s3vectors:GetIndex",
        ],
        resources: [indexArn],
      }));
    }
  }
}
