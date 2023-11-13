import { Construct } from 'constructs';
import { md5hash } from 'aws-cdk-lib/core/lib/helpers-internal';
import * as assets from 'aws-cdk-lib/aws-ecr-assets';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';

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
  public abstract bind(
    scope: Construct,
    grantable: iam.IGrantable
  ): ContainerImageConfig;

  public static fromEcrRepository(
    repository: ecr.IRepository,
    tag: string = 'latest'
  ): ContainerImage {
    return new EcrImage(repository, tag);
  }

  public static fromAsset(
    directory: string,
    options: assets.DockerImageAssetOptions = {}
  ): ContainerImage {
    return new AssetImage(directory, options);
  }
}

class EcrImage extends ContainerImage {
  constructor(
    private readonly repository: ecr.IRepository,
    private readonly tag: string
  ) {
    super();
  }

  public bind(
    _scope: Construct,
    grantable: iam.IGrantable
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
    private readonly options: assets.DockerImageAssetOptions = {}
  ) {
    super();
  }

  public bind(
    scope: Construct,
    grantable: iam.IGrantable
  ): ContainerImageConfig {
    // Retain the first instantiation of this asset
    if (!this.asset) {
      this.asset = new assets.DockerImageAsset(
        scope,
        `ModelImage${md5hash(this.directory)}`,
        {
          directory: this.directory,
          ...this.options,
        }
      );
    }

    this.asset.repository.grantPull(grantable);

    return {
      imageName: this.asset.imageUri,
    };
  }
}
