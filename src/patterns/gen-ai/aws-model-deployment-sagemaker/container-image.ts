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

import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as assets from 'aws-cdk-lib/aws-ecr-assets';
import * as iam from 'aws-cdk-lib/aws-iam';
import { md5hash } from 'aws-cdk-lib/core/lib/helpers-internal';
import { Construct } from 'constructs';

export interface ContainerImageConfig {
  /**
   * The image name. Images in Amazon ECR repositories can be specified by either using the full registry/repository:tag or
   * registry/repository@digest.
   *
   * For example, `012345678910.dkr.ecr.<region-name>.amazonaws.com/<repository-name>:latest` or
   * `012345678910.dkr.ecr.<region-name>.amazonaws.com/<repository-name>@sha256:94afd1f2e64d908bc90dbca0035a5b567EXAMPLE`.
   */
  readonly imageName: string;
}

/**
 *
 * https://github.com/aws/deep-learning-containers/blob/master/available_images.md
 */
export abstract class ContainerImage {
  public static fromEcrRepository(
    repository: ecr.IRepository,
    tag: string = 'latest',
  ): ContainerImage {
    return new EcrImage(repository, tag);
  }

  public static fromAsset(
    directory: string,
    options: assets.DockerImageAssetOptions = {},
  ): ContainerImage {
    return new AssetImage(directory, options);
  }

  public abstract bind(
    scope: Construct,
    grantable: iam.IGrantable,
  ): ContainerImageConfig;
}

class EcrImage extends ContainerImage {
  constructor(
    private readonly repository: ecr.IRepository,
    private readonly tag: string,
  ) {
    super();
  }

  public bind(
    _scope: Construct,
    grantable: iam.IGrantable,
  ): ContainerImageConfig {
    this.repository.grantPull(grantable);

    return {
      imageName: this.repository.repositoryUriForTag(this.tag),
    };
  }
}

class AssetImage extends ContainerImage {
  private asset?: assets.DockerImageAsset;

  constructor(
    private readonly directory: string,
    private readonly options: assets.DockerImageAssetOptions = {},
  ) {
    super();
  }

  public bind(
    scope: Construct,
    grantable: iam.IGrantable,
  ): ContainerImageConfig {
    // Retain the first instantiation of this asset
    if (!this.asset) {
      this.asset = new assets.DockerImageAsset(
        scope,
        `ModelImage${md5hash(this.directory)}`,
        {
          directory: this.directory,
          ...this.options,
        },
      );
    }

    this.asset.repository.grantPull(grantable);

    return {
      imageName: this.asset.imageUri,
    };
  }
}
