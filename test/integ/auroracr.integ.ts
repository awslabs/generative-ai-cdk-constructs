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

import * as integ from "@aws-cdk/integ-tests-alpha";
import * as cdk from "aws-cdk-lib";
import * as genai from "../../src";
import * as s3 from "aws-cdk-lib/aws-s3";

class TestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const embeddingsModel = genai.bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024;

    const auroraDb = new genai.amazonaurora.AmazonAuroraVectorStore(
      this,
      "AuroraDefaultVectorStore",
      {
        embeddingsModelVectorDimension: embeddingsModel.vectorDimensions!,
      }
    );

    const kb = new genai.bedrock.VectorKnowledgeBase(this, "KnowledgeBase", {
      embeddingsModel: embeddingsModel,
      vectorStore: auroraDb,
    });

    const docBucket = new s3.Bucket(this, "DocBucket");

    new genai.bedrock.S3DataSource(this, "DataSource", {
      bucket: docBucket,
      chunkingStrategy: genai.bedrock.ChunkingStrategy.FIXED_SIZE,
      dataSourceName: "texts",
      knowledgeBase: kb,
    });
  }
}

// Integration test
const app = new cdk.App();
const stack = new TestStack(app, "AuroraVectorDB", {
  env: {
    region: "us-east-2",
  },
});

new integ.IntegTest(app, "AuroraVectorDB-Integ", {
  testCases: [stack],
  cdkCommandOptions: {
    deploy: {
      args: {
        rollback: false,
      },
    },
  },
});

app.synth();
