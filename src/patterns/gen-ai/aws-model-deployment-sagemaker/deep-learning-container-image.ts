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
import { Stack } from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';
import { FactName } from 'aws-cdk-lib/region-info';
import { Construct } from 'constructs';
import { ContainerImage, ContainerImageConfig } from './container-image';

export class DeepLearningContainerImage extends ContainerImage {
  public static readonly DJL_INFERENCE_0_19_0_DEEPSPEED0_7_3_CU113 = this.fromDeepLearningContainerImage('djl-inference', '0.19.0-deepspeed0.7.3-cu113');
  public static readonly DJL_INFERENCE_0_20_0_DEEPSPEED0_7_5_CU116 = this.fromDeepLearningContainerImage('djl-inference', '0.20.0-deepspeed0.7.5-cu116');
  public static readonly DJL_INFERENCE_0_21_0_DEEPSPEED0_8_0_CU117 = this.fromDeepLearningContainerImage('djl-inference', '0.21.0-deepspeed0.8.0-cu117');
  public static readonly DJL_INFERENCE_0_21_0_DEEPSPEED0_8_3_CU117 = this.fromDeepLearningContainerImage('djl-inference', '0.21.0-deepspeed0.8.3-cu117');
  public static readonly DJL_INFERENCE_0_21_0_FASTERTRANSFORMER5_3_0_CU117 = this.fromDeepLearningContainerImage('djl-inference', '0.21.0-fastertransformer5.3.0-cu117');
  public static readonly DJL_INFERENCE_0_22_1_DEEPSPEED0_8_3_CU118 = this.fromDeepLearningContainerImage('djl-inference', '0.22.1-deepspeed0.8.3-cu118');
  public static readonly DJL_INFERENCE_0_22_1_DEEPSPEED0_9_2_CU118 = this.fromDeepLearningContainerImage('djl-inference', '0.22.1-deepspeed0.9.2-cu118');
  public static readonly DJL_INFERENCE_0_22_1_FASTERTRANSFORMER5_3_0_CU118 = this.fromDeepLearningContainerImage('djl-inference', '0.22.1-fastertransformer5.3.0-cu118');
  public static readonly DJL_INFERENCE_0_22_1_NEURONX_SDK2_10_0 = this.fromDeepLearningContainerImage('djl-inference', '0.22.1-neuronx-sdk2.10.0');
  public static readonly DJL_INFERENCE_0_22_1_NEURONX_SDK2_9_0 = this.fromDeepLearningContainerImage('djl-inference', '0.22.1-neuronx-sdk2.9.0');
  public static readonly DJL_INFERENCE_0_23_0_DEEPSPEED0_9_5_CU118 = this.fromDeepLearningContainerImage('djl-inference', '0.23.0-deepspeed0.9.5-cu118');
  public static readonly DJL_INFERENCE_0_23_0_FASTERTRANSFORMER5_3_0_CU118 = this.fromDeepLearningContainerImage('djl-inference', '0.23.0-fastertransformer5.3.0-cu118');
  public static readonly DJL_INFERENCE_0_23_0_NEURONX_SDK2_12_0 = this.fromDeepLearningContainerImage('djl-inference', '0.23.0-neuronx-sdk2.12.0');
  public static readonly DJL_INFERENCE_0_24_0_DEEPSPEED0_10_0_CU118 = this.fromDeepLearningContainerImage('djl-inference', '0.24.0-deepspeed0.10.0-cu118');
  public static readonly DJL_INFERENCE_0_24_0_FASTERTRANSFORMER5_3_0_CU118 = this.fromDeepLearningContainerImage('djl-inference', '0.24.0-fastertransformer5.3.0-cu118');
  public static readonly DJL_INFERENCE_0_24_0_NEURONX_SDK2_14_1 = this.fromDeepLearningContainerImage('djl-inference', '0.24.0-neuronx-sdk2.14.1');
  public static readonly DJL_INFERENCE_0_25_0_DEEPSPEED0_11_0_CU118 = this.fromDeepLearningContainerImage('djl-inference', '0.25.0-deepspeed0.11.0-cu118');
  public static readonly DJL_INFERENCE_0_25_0_NEURONX_SDK2_15_0 = this.fromDeepLearningContainerImage('djl-inference', '0.25.0-neuronx-sdk2.15.0');
  public static readonly DJL_INFERENCE_0_26_0_DEEPSPEED0_12_6_CU121 = this.fromDeepLearningContainerImage('djl-inference', '0.26.0-deepspeed0.12.6-cu121');
  public static readonly DJL_INFERENCE_0_26_0_NEURONX_SDK2_16_0 = this.fromDeepLearningContainerImage('djl-inference', '0.26.0-neuronx-sdk2.16.0');
  public static readonly DJL_INFERENCE_0_27_0_DEEPSPEED0_12_6_CU121 = this.fromDeepLearningContainerImage('djl-inference', '0.27.0-deepspeed0.12.6-cu121');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_10_2_TRANSFORMERS4_17_0_CPU_PY38_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.10.2-transformers4.17.0-cpu-py38-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_10_2_TRANSFORMERS4_17_0_GPU_PY38_CU113_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.10.2-transformers4.17.0-gpu-py38-cu113-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_13_1_TRANSFORMERS4_26_0_CPU_PY39_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.13.1-transformers4.26.0-cpu-py39-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_13_1_TRANSFORMERS4_26_0_GPU_PY39_CU117_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.13.1-transformers4.26.0-gpu-py39-cu117-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_7_1_TRANSFORMERS4_6_1_CPU_PY36_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.7.1-transformers4.6.1-cpu-py36-ubuntu18.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_7_1_TRANSFORMERS4_6_1_GPU_PY36_CU110_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.7.1-transformers4.6.1-gpu-py36-cu110-ubuntu18.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_8_1_TRANSFORMERS4_10_2_CPU_PY36_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.8.1-transformers4.10.2-cpu-py36-ubuntu18.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_8_1_TRANSFORMERS4_10_2_GPU_PY36_CU111_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.8.1-transformers4.10.2-gpu-py36-cu111-ubuntu18.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_8_1_TRANSFORMERS4_6_1_CPU_PY36_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.8.1-transformers4.6.1-cpu-py36-ubuntu18.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_8_1_TRANSFORMERS4_6_1_GPU_PY36_CU111_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.8.1-transformers4.6.1-gpu-py36-cu111-ubuntu18.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_9_0_TRANSFORMERS4_10_2_CPU_PY38_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.9.0-transformers4.10.2-cpu-py38-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_9_0_TRANSFORMERS4_10_2_GPU_PY38_CU111_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.9.0-transformers4.10.2-gpu-py38-cu111-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_9_0_TRANSFORMERS4_11_0_CPU_PY38_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.9.0-transformers4.11.0-cpu-py38-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_9_0_TRANSFORMERS4_11_0_GPU_PY38_CU111_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.9.0-transformers4.11.0-gpu-py38-cu111-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_9_1_TRANSFORMERS4_12_3_CPU_PY38_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.9.1-transformers4.12.3-cpu-py38-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_1_9_1_TRANSFORMERS4_12_3_GPU_PY38_CU111_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '1.9.1-transformers4.12.3-gpu-py38-cu111-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_2_0_0_TRANSFORMERS4_28_1_CPU_PY310_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '2.0.0-transformers4.28.1-cpu-py310-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_2_0_0_TRANSFORMERS4_28_1_GPU_PY310_CU118_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '2.0.0-transformers4.28.1-gpu-py310-cu118-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_2_1_0_TRANSFORMERS4_37_0_CPU_PY310_UBUNTU22_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '2.1.0-transformers4.37.0-cpu-py310-ubuntu22.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_2_1_0_TRANSFORMERS4_37_0_GPU_PY310_CU118_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference', '2.1.0-transformers4.37.0-gpu-py310-cu118-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_NEURONX_1_13_0_TRANSFORMERS4_28_1_NEURONX_PY38_SDK2_9_1_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference-neuronx', '1.13.0-transformers4.28.1-neuronx-py38-sdk2.9.1-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_NEURONX_1_13_1_TRANSFORMERS4_34_1_NEURONX_PY310_SDK2_15_0_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference-neuronx', '1.13.1-transformers4.34.1-neuronx-py310-sdk2.15.0-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_INFERENCE_NEURONX_1_13_1_TRANSFORMERS4_36_2_NEURONX_PY310_SDK2_16_1_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-inference-neuronx', '1.13.1-transformers4.36.2-neuronx-py310-sdk2.16.1-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_0_0_TGI0_6_0_GPU_PY39_CU118_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.0.0-tgi0.6.0-gpu-py39-cu118-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_0_0_TGI0_8_2_GPU_PY39_CU118_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.0.0-tgi0.8.2-gpu-py39-cu118-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_0_1_TGI0_9_3_GPU_PY39_CU118_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.0.1-tgi0.9.3-gpu-py39-cu118-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_0_1_TGI1_0_3_GPU_PY39_CU118_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.0.1-tgi1.0.3-gpu-py39-cu118-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_0_1_TGI1_1_0_GPU_PY39_CU118_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.0.1-tgi1.1.0-gpu-py39-cu118-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_1_1_TGI1_2_0_GPU_PY310_CU121_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.1.1-tgi1.2.0-gpu-py310-cu121-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_1_1_TGI1_3_1_GPU_PY310_CU121_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.1.1-tgi1.3.1-gpu-py310-cu121-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_1_1_TGI1_3_3_GPU_PY310_CU121_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.1.1-tgi1.3.3-gpu-py310-cu121-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_1_1_TGI1_4_0_GPU_PY310_CU121_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.1.1-tgi1.4.0-gpu-py310-cu121-ubuntu20.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_1_1_TGI1_4_2_GPU_PY310_CU121_UBUNTU22_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.1.1-tgi1.4.2-gpu-py310-cu121-ubuntu22.04');
  public static readonly HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_1_1_TGI1_4_5_GPU_PY310_CU121_UBUNTU22_04 = this.fromDeepLearningContainerImage('huggingface-pytorch-tgi-inference', '2.1.1-tgi1.4.5-gpu-py310-cu121-ubuntu22.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_11_0_TRANSFORMERS4_26_0_CPU_PY39_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.11.0-transformers4.26.0-cpu-py39-ubuntu20.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_11_0_TRANSFORMERS4_26_0_GPU_PY39_CU112_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.11.0-transformers4.26.0-gpu-py39-cu112-ubuntu20.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_11_1_TRANSFORMERS4_26_0_CPU_PY39_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.11.1-transformers4.26.0-cpu-py39-ubuntu20.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_11_1_TRANSFORMERS4_26_0_GPU_PY39_CU112_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.11.1-transformers4.26.0-gpu-py39-cu112-ubuntu20.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_4_1_TRANSFORMERS4_6_1_CPU_PY37_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.4.1-transformers4.6.1-cpu-py37-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_4_1_TRANSFORMERS4_6_1_GPU_PY37_CU110_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.4.1-transformers4.6.1-gpu-py37-cu110-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_4_3_TRANSFORMERS4_10_2_CPU_PY37_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.4.3-transformers4.10.2-cpu-py37-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_4_3_TRANSFORMERS4_10_2_GPU_PY37_CU110_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.4.3-transformers4.10.2-gpu-py37-cu110-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_5_1_TRANSFORMERS4_10_2_CPU_PY37_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.5.1-transformers4.10.2-cpu-py37-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_5_1_TRANSFORMERS4_10_2_GPU_PY37_CU112_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.5.1-transformers4.10.2-gpu-py37-cu112-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_5_1_TRANSFORMERS4_11_0_CPU_PY37_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.5.1-transformers4.11.0-cpu-py37-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_5_1_TRANSFORMERS4_11_0_GPU_PY37_CU112_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.5.1-transformers4.11.0-gpu-py37-cu112-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_5_1_TRANSFORMERS4_12_3_CPU_PY37_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.5.1-transformers4.12.3-cpu-py37-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_5_1_TRANSFORMERS4_12_3_GPU_PY37_CU112_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.5.1-transformers4.12.3-gpu-py37-cu112-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_5_3_TRANSFORMERS4_12_3_CPU_PY37_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.5.3-transformers4.12.3-cpu-py37-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_5_3_TRANSFORMERS4_12_3_GPU_PY37_CU112_UBUNTU18_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.5.3-transformers4.12.3-gpu-py37-cu112-ubuntu18.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_6_3_TRANSFORMERS4_17_0_CPU_PY38_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.6.3-transformers4.17.0-cpu-py38-ubuntu20.04');
  public static readonly HUGGINGFACE_TENSORFLOW_INFERENCE_2_6_3_TRANSFORMERS4_17_0_GPU_PY38_CU112_UBUNTU20_04 = this.fromDeepLearningContainerImage('huggingface-tensorflow-inference', '2.6.3-transformers4.17.0-gpu-py38-cu112-ubuntu20.04');


  public static fromDeepLearningContainerImage(
    repositoryName: string,
    tag: string,
    accountId?: string,
  ): ContainerImage {
    return new DeepLearningContainerImage(repositoryName, tag, accountId);
  }

  constructor(
    private readonly repositoryName: string,
    private readonly tag: string,
    private readonly accountId?: string,
  ) {
    super();
  }

  public bind(
    scope: Construct,
    grantable: iam.IGrantable,
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
          accountId,
        ),
      },
    );

    repository.grantPull(grantable);

    return { imageName: repository.repositoryUri + ':' + this.tag };
  }
}
