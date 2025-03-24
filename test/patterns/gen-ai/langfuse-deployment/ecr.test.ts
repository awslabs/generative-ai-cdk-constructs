// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// External Dependencies:
import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AwsSolutionsChecks } from "cdk-nag";

// Local Dependencies:
import { ECRRepoAndDockerImage } from "../../../../src/patterns/gen-ai/langfuse-deployment/ecr";

describe("ECRRepoAndDockerImage construct", () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, "TestStack", {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });
  });

  test("applies expected default props", () => {
    new ECRRepoAndDockerImage(stack, "TestCache", {
      // Arbitrary AWS ECR Public image to test the construct works:
      dockerImageName: "public.ecr.aws/sam/build-python3.13",
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties("AWS::ECR::Repository", {
      EmptyOnDelete: true,
    });
  });
});
