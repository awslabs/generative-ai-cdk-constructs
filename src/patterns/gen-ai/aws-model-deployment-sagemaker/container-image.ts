import { Stack } from 'aws-cdk-lib';
import { FactName } from 'aws-cdk-lib/region-info';
import { Construct } from 'constructs';
import { md5hash } from 'aws-cdk-lib/core/lib/helpers-internal';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as assets from 'aws-cdk-lib/aws-ecr-assets';

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

  public static fromDeepLearningContainerImage(
    repositoryName: string,
    tag: string,
    accountId?: string
  ): ContainerImage {
    return new DeepLearningContainerImage(repositoryName, tag, accountId);
  }

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

export class DeepLearningContainerImage extends ContainerImage {
  /*
  https://github.com/aws/sagemaker-python-sdk/blob/master/src/sagemaker/image_uri_config/huggingface.json
  */
  static readonly HF_PYTORCH_INFERENCE_REPOSITORY_NAME =
    'huggingface-pytorch-inference';
  /*
  https://github.com/aws/sagemaker-python-sdk/blob/master/src/sagemaker/image_uri_config/huggingface.json
  */
  static readonly HF_TENSORFLOW_INFERENCE_REPOSITORY_NAME =
    'huggingface-tensorflow-inference';
  /*
  https://github.com/aws/sagemaker-python-sdk/blob/master/src/sagemaker/image_uri_config/huggingface-llm.json
  */
  static readonly HF_PYTORCH_TGI_INFERENCE_REPOSITORY_NAME =
    'huggingface-pytorch-tgi-inference';
  /*
  DJL_INFERENCE_DEEPSPEED
  https://github.com/aws/sagemaker-python-sdk/blob/master/src/sagemaker/image_uri_config/djl-deepspeed.json
  */
  static readonly DJL_INFERENCE_REPOSITORY_NAME = 'djl-inference';
  //-----------------------------------------------------------
  public static readonly HF_PYTORCH_INFERENCE_CPU_TRANSFORMERS_4_28_1 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_PYTORCH_INFERENCE_REPOSITORY_NAME,
      '2.0.0-transformers4.28.1-cpu-py310-ubuntu20.04'
    );

  public static readonly HF_PYTORCH_INFERENCE_GPU_TRANSFORMERS_4_28_1 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_PYTORCH_INFERENCE_REPOSITORY_NAME,
      '2.0.0-transformers4.28.1-gpu-py310-cu118-ubuntu20.04'
    );

  public static readonly HF_PYTORCH_INFERENCE_CPU_TRANSFORMERS_4_26_1 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_PYTORCH_INFERENCE_REPOSITORY_NAME,
      '1.13.1-transformers4.26.0-cpu-py39-ubuntu20.04'
    );

  public static readonly HF_PYTORCH_INFERENCE_GPU_TRANSFORMERS_4_26_1 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_PYTORCH_INFERENCE_REPOSITORY_NAME,
      '1.13.1-transformers4.26.0-gpu-py39-cu117-ubuntu20.04'
    );
  //-----------------------------------------------------------
  public static readonly HF_TENSORFLOW_INFERENCE_CPU_TRANSFORMERS_4_26_0 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_TENSORFLOW_INFERENCE_REPOSITORY_NAME,
      '2.11.1-transformers4.26.0-cpu-py39-ubuntu20.04'
    );

  public static readonly HF_TENSORFLOW_INFERENCE_GPU_TRANSFORMERS_4_26_0 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_TENSORFLOW_INFERENCE_REPOSITORY_NAME,
      '2.11.1-transformers4.26.0-gpu-py39-cu112-ubuntu20.04'
    );
  //-----------------------------------------------------------
  public static readonly HF_PYTORCH_TGI_INFERENCE_GPU_1_1_0 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_PYTORCH_TGI_INFERENCE_REPOSITORY_NAME,
      '2.0.1-tgi1.1.0-gpu-py39-cu118-ubuntu20.04'
    );

  public static readonly HF_PYTORCH_TGI_INFERENCE_GPU_1_0_3 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_PYTORCH_TGI_INFERENCE_REPOSITORY_NAME,
      '2.0.1-tgi1.0.3-gpu-py39-cu118-ubuntu20.04'
    );

  public static readonly HF_PYTORCH_TGI_INFERENCE_GPU_0_9_3 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_PYTORCH_TGI_INFERENCE_REPOSITORY_NAME,
      '2.0.1-tgi0.9.3-gpu-py39-cu118-ubuntu20.04'
    );

  public static readonly HF_PYTORCH_TGI_INFERENCE_GPU_0_8_2 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_PYTORCH_TGI_INFERENCE_REPOSITORY_NAME,
      '2.0.0-tgi0.8.2-gpu-py39-cu118-ubuntu20.04'
    );

  public static readonly HF_PYTORCH_TGI_INFERENCE_GPU_0_6_0 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.HF_PYTORCH_TGI_INFERENCE_REPOSITORY_NAME,
      '2.0.0-tgi0.6.0-gpu-py39-cu118-ubuntu20.04'
    );
  //-----------------------------------------------------------
  public static readonly DJL_INFERENCE_GPU_FASTERTRANSFORMER_0_24_0 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.DJL_INFERENCE_REPOSITORY_NAME,
      '0.24.0-fastertransformer5.3.0-cu118'
    );

  public static readonly DJL_INFERENCE_GPU_DEEPSPEED_0_24_0 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.DJL_INFERENCE_REPOSITORY_NAME,
      '0.24.0-deepspeed0.10.0-cu118'
    );

  public static readonly DJL_INFERENCE_NEURONX_0_24_0 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.DJL_INFERENCE_REPOSITORY_NAME,
      '0.24.0-neuronx-sdk2.14.1'
    );

  public static readonly DJL_INFERENCE_GPU_FASTERTRANSFORMER_0_23_0 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.DJL_INFERENCE_REPOSITORY_NAME,
      '0.23.0-fastertransformer5.3.0-cu118'
    );

  public static readonly DJL_INFERENCE_GPU_DEEPSPEED_0_23_0 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.DJL_INFERENCE_REPOSITORY_NAME,
      '0.23.0-deepspeed0.9.5-cu118'
    );

  public static readonly DJL_INFERENCE_NEURONX_0_23_0 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.DJL_INFERENCE_REPOSITORY_NAME,
      '0.23.0-neuronx-sdk2.12.0'
    );

  public static readonly DJL_INFERENCE_GPU_FASTERTRANSFORMER_0_22_1 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.DJL_INFERENCE_REPOSITORY_NAME,
      '0.22.1-fastertransformer5.3.0-cu118'
    );

  public static readonly DJL_INFERENCE_GPU_DEEPSPEED_0_22_1 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.DJL_INFERENCE_REPOSITORY_NAME,
      '0.22.1-deepspeed0.9.2-cu118'
    );

  public static readonly DJL_INFERENCE_NEURONX_0_22_1 =
    ContainerImage.fromDeepLearningContainerImage(
      DeepLearningContainerImage.DJL_INFERENCE_REPOSITORY_NAME,
      '0.22.1-neuronx-sdk2.10.0'
    );

  constructor(
    private readonly repositoryName: string,
    private readonly tag: string,
    private readonly accountId?: string
  ) {
    super();
  }

  public bind(
    scope: Construct,
    grantable: iam.IGrantable
  ): ContainerImageConfig {
    const accountId =
      this.accountId ??
      Stack.of(scope).regionalFact(FactName.DLC_REPOSITORY_ACCOUNT);

    const repository = ecr.Repository.fromRepositoryAttributes(
      scope,
      'DeepLearningContainerRepository',
      {
        repositoryName: this.repositoryName,
        repositoryArn: ecr.Repository.arnForLocalRepository(
          this.repositoryName,
          scope,
          accountId
        ),
      }
    );

    repository.grantPull(grantable);

    return { imageName: `${repository.repositoryUri}:${this.tag}` };
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
