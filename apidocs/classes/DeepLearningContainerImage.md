[@cdklabs/generative-ai-cdk-constructs](../README.md) / DeepLearningContainerImage

# Class: DeepLearningContainerImage

https://github.com/aws/deep-learning-containers/blob/master/available_images.md

## Hierarchy

- [`ContainerImage`](ContainerImage.md)

  ↳ **`DeepLearningContainerImage`**

## Table of contents

### Constructors

- [constructor](DeepLearningContainerImage.md#constructor)

### Properties

- [accountId](DeepLearningContainerImage.md#accountid)
- [repositoryName](DeepLearningContainerImage.md#repositoryname)
- [tag](DeepLearningContainerImage.md#tag)
- [DJL\_INFERENCE\_0\_19\_0\_DEEPSPEED0\_7\_3\_CU113](DeepLearningContainerImage.md#djl_inference_0_19_0_deepspeed0_7_3_cu113)
- [DJL\_INFERENCE\_0\_20\_0\_DEEPSPEED0\_7\_5\_CU116](DeepLearningContainerImage.md#djl_inference_0_20_0_deepspeed0_7_5_cu116)
- [DJL\_INFERENCE\_0\_21\_0\_DEEPSPEED0\_8\_0\_CU117](DeepLearningContainerImage.md#djl_inference_0_21_0_deepspeed0_8_0_cu117)
- [DJL\_INFERENCE\_0\_21\_0\_DEEPSPEED0\_8\_3\_CU117](DeepLearningContainerImage.md#djl_inference_0_21_0_deepspeed0_8_3_cu117)
- [DJL\_INFERENCE\_0\_21\_0\_FASTERTRANSFORMER5\_3\_0\_CU117](DeepLearningContainerImage.md#djl_inference_0_21_0_fastertransformer5_3_0_cu117)
- [DJL\_INFERENCE\_0\_22\_1\_DEEPSPEED0\_8\_3\_CU118](DeepLearningContainerImage.md#djl_inference_0_22_1_deepspeed0_8_3_cu118)
- [DJL\_INFERENCE\_0\_22\_1\_DEEPSPEED0\_9\_2\_CU118](DeepLearningContainerImage.md#djl_inference_0_22_1_deepspeed0_9_2_cu118)
- [DJL\_INFERENCE\_0\_22\_1\_FASTERTRANSFORMER5\_3\_0\_CU118](DeepLearningContainerImage.md#djl_inference_0_22_1_fastertransformer5_3_0_cu118)
- [DJL\_INFERENCE\_0\_22\_1\_NEURONX\_SDK2\_10\_0](DeepLearningContainerImage.md#djl_inference_0_22_1_neuronx_sdk2_10_0)
- [DJL\_INFERENCE\_0\_22\_1\_NEURONX\_SDK2\_9\_0](DeepLearningContainerImage.md#djl_inference_0_22_1_neuronx_sdk2_9_0)
- [DJL\_INFERENCE\_0\_23\_0\_DEEPSPEED0\_9\_5\_CU118](DeepLearningContainerImage.md#djl_inference_0_23_0_deepspeed0_9_5_cu118)
- [DJL\_INFERENCE\_0\_23\_0\_FASTERTRANSFORMER5\_3\_0\_CU118](DeepLearningContainerImage.md#djl_inference_0_23_0_fastertransformer5_3_0_cu118)
- [DJL\_INFERENCE\_0\_23\_0\_NEURONX\_SDK2\_12\_0](DeepLearningContainerImage.md#djl_inference_0_23_0_neuronx_sdk2_12_0)
- [DJL\_INFERENCE\_0\_24\_0\_DEEPSPEED0\_10\_0\_CU118](DeepLearningContainerImage.md#djl_inference_0_24_0_deepspeed0_10_0_cu118)
- [DJL\_INFERENCE\_0\_24\_0\_FASTERTRANSFORMER5\_3\_0\_CU118](DeepLearningContainerImage.md#djl_inference_0_24_0_fastertransformer5_3_0_cu118)
- [DJL\_INFERENCE\_0\_24\_0\_NEURONX\_SDK2\_14\_1](DeepLearningContainerImage.md#djl_inference_0_24_0_neuronx_sdk2_14_1)
- [DJL\_INFERENCE\_0\_25\_0\_DEEPSPEED0\_11\_0\_CU118](DeepLearningContainerImage.md#djl_inference_0_25_0_deepspeed0_11_0_cu118)
- [DJL\_INFERENCE\_0\_25\_0\_NEURONX\_SDK2\_15\_0](DeepLearningContainerImage.md#djl_inference_0_25_0_neuronx_sdk2_15_0)
- [DJL\_INFERENCE\_0\_26\_0\_DEEPSPEED0\_12\_6\_CU121](DeepLearningContainerImage.md#djl_inference_0_26_0_deepspeed0_12_6_cu121)
- [DJL\_INFERENCE\_0\_26\_0\_NEURONX\_SDK2\_16\_0](DeepLearningContainerImage.md#djl_inference_0_26_0_neuronx_sdk2_16_0)
- [DJL\_INFERENCE\_0\_27\_0\_DEEPSPEED0\_12\_6\_CU121](DeepLearningContainerImage.md#djl_inference_0_27_0_deepspeed0_12_6_cu121)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_10\_2\_TRANSFORMERS4\_17\_0\_CPU\_PY38\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_10_2_transformers4_17_0_cpu_py38_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_10\_2\_TRANSFORMERS4\_17\_0\_GPU\_PY38\_CU113\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_10_2_transformers4_17_0_gpu_py38_cu113_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_13\_1\_TRANSFORMERS4\_26\_0\_CPU\_PY39\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_13_1_transformers4_26_0_cpu_py39_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_13\_1\_TRANSFORMERS4\_26\_0\_GPU\_PY39\_CU117\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_13_1_transformers4_26_0_gpu_py39_cu117_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_7\_1\_TRANSFORMERS4\_6\_1\_CPU\_PY36\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_7_1_transformers4_6_1_cpu_py36_ubuntu18_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_7\_1\_TRANSFORMERS4\_6\_1\_GPU\_PY36\_CU110\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_7_1_transformers4_6_1_gpu_py36_cu110_ubuntu18_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_10\_2\_CPU\_PY36\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_8_1_transformers4_10_2_cpu_py36_ubuntu18_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_10\_2\_GPU\_PY36\_CU111\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_8_1_transformers4_10_2_gpu_py36_cu111_ubuntu18_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_6\_1\_CPU\_PY36\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_8_1_transformers4_6_1_cpu_py36_ubuntu18_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_6\_1\_GPU\_PY36\_CU111\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_8_1_transformers4_6_1_gpu_py36_cu111_ubuntu18_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_10\_2\_CPU\_PY38\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_9_0_transformers4_10_2_cpu_py38_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_10\_2\_GPU\_PY38\_CU111\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_9_0_transformers4_10_2_gpu_py38_cu111_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_11\_0\_CPU\_PY38\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_9_0_transformers4_11_0_cpu_py38_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_11\_0\_GPU\_PY38\_CU111\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_9_0_transformers4_11_0_gpu_py38_cu111_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_1\_TRANSFORMERS4\_12\_3\_CPU\_PY38\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_9_1_transformers4_12_3_cpu_py38_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_1\_TRANSFORMERS4\_12\_3\_GPU\_PY38\_CU111\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_1_9_1_transformers4_12_3_gpu_py38_cu111_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_0\_0\_TRANSFORMERS4\_28\_1\_CPU\_PY310\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_2_0_0_transformers4_28_1_cpu_py310_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_0\_0\_TRANSFORMERS4\_28\_1\_GPU\_PY310\_CU118\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_2_0_0_transformers4_28_1_gpu_py310_cu118_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_1\_0\_TRANSFORMERS4\_37\_0\_CPU\_PY310\_UBUNTU22\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_2_1_0_transformers4_37_0_cpu_py310_ubuntu22_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_1\_0\_TRANSFORMERS4\_37\_0\_GPU\_PY310\_CU118\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_2_1_0_transformers4_37_0_gpu_py310_cu118_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_NEURONX\_1\_13\_0\_TRANSFORMERS4\_28\_1\_NEURONX\_PY38\_SDK2\_9\_1\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_neuronx_1_13_0_transformers4_28_1_neuronx_py38_sdk2_9_1_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_NEURONX\_1\_13\_1\_TRANSFORMERS4\_34\_1\_NEURONX\_PY310\_SDK2\_15\_0\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_neuronx_1_13_1_transformers4_34_1_neuronx_py310_sdk2_15_0_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_INFERENCE\_NEURONX\_1\_13\_1\_TRANSFORMERS4\_36\_2\_NEURONX\_PY310\_SDK2\_16\_1\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_inference_neuronx_1_13_1_transformers4_36_2_neuronx_py310_sdk2_16_1_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_0\_TGI0\_6\_0\_GPU\_PY39\_CU118\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_0_0_tgi0_6_0_gpu_py39_cu118_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_0\_TGI0\_8\_2\_GPU\_PY39\_CU118\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_0_0_tgi0_8_2_gpu_py39_cu118_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_1\_TGI0\_9\_3\_GPU\_PY39\_CU118\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_0_1_tgi0_9_3_gpu_py39_cu118_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_1\_TGI1\_0\_3\_GPU\_PY39\_CU118\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_0_1_tgi1_0_3_gpu_py39_cu118_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_1\_TGI1\_1\_0\_GPU\_PY39\_CU118\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_0_1_tgi1_1_0_gpu_py39_cu118_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_2\_0\_GPU\_PY310\_CU121\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_1_1_tgi1_2_0_gpu_py310_cu121_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_3\_1\_GPU\_PY310\_CU121\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_1_1_tgi1_3_1_gpu_py310_cu121_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_3\_3\_GPU\_PY310\_CU121\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_1_1_tgi1_3_3_gpu_py310_cu121_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_4\_0\_GPU\_PY310\_CU121\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_1_1_tgi1_4_0_gpu_py310_cu121_ubuntu20_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_4\_2\_GPU\_PY310\_CU121\_UBUNTU22\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_1_1_tgi1_4_2_gpu_py310_cu121_ubuntu22_04)
- [HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_4\_5\_GPU\_PY310\_CU121\_UBUNTU22\_04](DeepLearningContainerImage.md#huggingface_pytorch_tgi_inference_2_1_1_tgi1_4_5_gpu_py310_cu121_ubuntu22_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_0\_TRANSFORMERS4\_26\_0\_CPU\_PY39\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_11_0_transformers4_26_0_cpu_py39_ubuntu20_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_0\_TRANSFORMERS4\_26\_0\_GPU\_PY39\_CU112\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_11_0_transformers4_26_0_gpu_py39_cu112_ubuntu20_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_1\_TRANSFORMERS4\_26\_0\_CPU\_PY39\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_11_1_transformers4_26_0_cpu_py39_ubuntu20_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_1\_TRANSFORMERS4\_26\_0\_GPU\_PY39\_CU112\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_11_1_transformers4_26_0_gpu_py39_cu112_ubuntu20_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_1\_TRANSFORMERS4\_6\_1\_CPU\_PY37\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_4_1_transformers4_6_1_cpu_py37_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_1\_TRANSFORMERS4\_6\_1\_GPU\_PY37\_CU110\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_4_1_transformers4_6_1_gpu_py37_cu110_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_3\_TRANSFORMERS4\_10\_2\_CPU\_PY37\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_4_3_transformers4_10_2_cpu_py37_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_3\_TRANSFORMERS4\_10\_2\_GPU\_PY37\_CU110\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_4_3_transformers4_10_2_gpu_py37_cu110_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_10\_2\_CPU\_PY37\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_5_1_transformers4_10_2_cpu_py37_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_10\_2\_GPU\_PY37\_CU112\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_5_1_transformers4_10_2_gpu_py37_cu112_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_11\_0\_CPU\_PY37\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_5_1_transformers4_11_0_cpu_py37_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_11\_0\_GPU\_PY37\_CU112\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_5_1_transformers4_11_0_gpu_py37_cu112_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_12\_3\_CPU\_PY37\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_5_1_transformers4_12_3_cpu_py37_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_12\_3\_GPU\_PY37\_CU112\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_5_1_transformers4_12_3_gpu_py37_cu112_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_3\_TRANSFORMERS4\_12\_3\_CPU\_PY37\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_5_3_transformers4_12_3_cpu_py37_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_3\_TRANSFORMERS4\_12\_3\_GPU\_PY37\_CU112\_UBUNTU18\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_5_3_transformers4_12_3_gpu_py37_cu112_ubuntu18_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_6\_3\_TRANSFORMERS4\_17\_0\_CPU\_PY38\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_6_3_transformers4_17_0_cpu_py38_ubuntu20_04)
- [HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_6\_3\_TRANSFORMERS4\_17\_0\_GPU\_PY38\_CU112\_UBUNTU20\_04](DeepLearningContainerImage.md#huggingface_tensorflow_inference_2_6_3_transformers4_17_0_gpu_py38_cu112_ubuntu20_04)

### Methods

- [bind](DeepLearningContainerImage.md#bind)
- [fromAsset](DeepLearningContainerImage.md#fromasset)
- [fromDeepLearningContainerImage](DeepLearningContainerImage.md#fromdeeplearningcontainerimage)
- [fromEcrRepository](DeepLearningContainerImage.md#fromecrrepository)

## Constructors

### constructor

• **new DeepLearningContainerImage**(`repositoryName`, `tag`, `accountId?`): [`DeepLearningContainerImage`](DeepLearningContainerImage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `repositoryName` | `string` |
| `tag` | `string` |
| `accountId?` | `string` |

#### Returns

[`DeepLearningContainerImage`](DeepLearningContainerImage.md)

#### Overrides

[ContainerImage](ContainerImage.md).[constructor](ContainerImage.md#constructor)

## Properties

### accountId

• `Private` `Optional` `Readonly` **accountId**: `string`

___

### repositoryName

• `Private` `Readonly` **repositoryName**: `string`

___

### tag

• `Private` `Readonly` **tag**: `string`

___

### DJL\_INFERENCE\_0\_19\_0\_DEEPSPEED0\_7\_3\_CU113

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_19\_0\_DEEPSPEED0\_7\_3\_CU113**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_20\_0\_DEEPSPEED0\_7\_5\_CU116

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_20\_0\_DEEPSPEED0\_7\_5\_CU116**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_21\_0\_DEEPSPEED0\_8\_0\_CU117

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_21\_0\_DEEPSPEED0\_8\_0\_CU117**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_21\_0\_DEEPSPEED0\_8\_3\_CU117

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_21\_0\_DEEPSPEED0\_8\_3\_CU117**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_21\_0\_FASTERTRANSFORMER5\_3\_0\_CU117

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_21\_0\_FASTERTRANSFORMER5\_3\_0\_CU117**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_22\_1\_DEEPSPEED0\_8\_3\_CU118

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_22\_1\_DEEPSPEED0\_8\_3\_CU118**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_22\_1\_DEEPSPEED0\_9\_2\_CU118

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_22\_1\_DEEPSPEED0\_9\_2\_CU118**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_22\_1\_FASTERTRANSFORMER5\_3\_0\_CU118

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_22\_1\_FASTERTRANSFORMER5\_3\_0\_CU118**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_22\_1\_NEURONX\_SDK2\_10\_0

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_22\_1\_NEURONX\_SDK2\_10\_0**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_22\_1\_NEURONX\_SDK2\_9\_0

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_22\_1\_NEURONX\_SDK2\_9\_0**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_23\_0\_DEEPSPEED0\_9\_5\_CU118

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_23\_0\_DEEPSPEED0\_9\_5\_CU118**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_23\_0\_FASTERTRANSFORMER5\_3\_0\_CU118

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_23\_0\_FASTERTRANSFORMER5\_3\_0\_CU118**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_23\_0\_NEURONX\_SDK2\_12\_0

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_23\_0\_NEURONX\_SDK2\_12\_0**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_24\_0\_DEEPSPEED0\_10\_0\_CU118

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_24\_0\_DEEPSPEED0\_10\_0\_CU118**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_24\_0\_FASTERTRANSFORMER5\_3\_0\_CU118

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_24\_0\_FASTERTRANSFORMER5\_3\_0\_CU118**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_24\_0\_NEURONX\_SDK2\_14\_1

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_24\_0\_NEURONX\_SDK2\_14\_1**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_25\_0\_DEEPSPEED0\_11\_0\_CU118

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_25\_0\_DEEPSPEED0\_11\_0\_CU118**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_25\_0\_NEURONX\_SDK2\_15\_0

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_25\_0\_NEURONX\_SDK2\_15\_0**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_26\_0\_DEEPSPEED0\_12\_6\_CU121

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_26\_0\_DEEPSPEED0\_12\_6\_CU121**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_26\_0\_NEURONX\_SDK2\_16\_0

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_26\_0\_NEURONX\_SDK2\_16\_0**: [`ContainerImage`](ContainerImage.md)

___

### DJL\_INFERENCE\_0\_27\_0\_DEEPSPEED0\_12\_6\_CU121

▪ `Static` `Readonly` **DJL\_INFERENCE\_0\_27\_0\_DEEPSPEED0\_12\_6\_CU121**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_10\_2\_TRANSFORMERS4\_17\_0\_CPU\_PY38\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_10\_2\_TRANSFORMERS4\_17\_0\_CPU\_PY38\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_10\_2\_TRANSFORMERS4\_17\_0\_GPU\_PY38\_CU113\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_10\_2\_TRANSFORMERS4\_17\_0\_GPU\_PY38\_CU113\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_13\_1\_TRANSFORMERS4\_26\_0\_CPU\_PY39\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_13\_1\_TRANSFORMERS4\_26\_0\_CPU\_PY39\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_13\_1\_TRANSFORMERS4\_26\_0\_GPU\_PY39\_CU117\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_13\_1\_TRANSFORMERS4\_26\_0\_GPU\_PY39\_CU117\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_7\_1\_TRANSFORMERS4\_6\_1\_CPU\_PY36\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_7\_1\_TRANSFORMERS4\_6\_1\_CPU\_PY36\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_7\_1\_TRANSFORMERS4\_6\_1\_GPU\_PY36\_CU110\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_7\_1\_TRANSFORMERS4\_6\_1\_GPU\_PY36\_CU110\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_10\_2\_CPU\_PY36\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_10\_2\_CPU\_PY36\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_10\_2\_GPU\_PY36\_CU111\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_10\_2\_GPU\_PY36\_CU111\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_6\_1\_CPU\_PY36\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_6\_1\_CPU\_PY36\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_6\_1\_GPU\_PY36\_CU111\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_8\_1\_TRANSFORMERS4\_6\_1\_GPU\_PY36\_CU111\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_10\_2\_CPU\_PY38\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_10\_2\_CPU\_PY38\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_10\_2\_GPU\_PY38\_CU111\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_10\_2\_GPU\_PY38\_CU111\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_11\_0\_CPU\_PY38\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_11\_0\_CPU\_PY38\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_11\_0\_GPU\_PY38\_CU111\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_0\_TRANSFORMERS4\_11\_0\_GPU\_PY38\_CU111\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_1\_TRANSFORMERS4\_12\_3\_CPU\_PY38\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_1\_TRANSFORMERS4\_12\_3\_CPU\_PY38\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_1\_TRANSFORMERS4\_12\_3\_GPU\_PY38\_CU111\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_1\_9\_1\_TRANSFORMERS4\_12\_3\_GPU\_PY38\_CU111\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_0\_0\_TRANSFORMERS4\_28\_1\_CPU\_PY310\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_0\_0\_TRANSFORMERS4\_28\_1\_CPU\_PY310\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_0\_0\_TRANSFORMERS4\_28\_1\_GPU\_PY310\_CU118\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_0\_0\_TRANSFORMERS4\_28\_1\_GPU\_PY310\_CU118\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_1\_0\_TRANSFORMERS4\_37\_0\_CPU\_PY310\_UBUNTU22\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_1\_0\_TRANSFORMERS4\_37\_0\_CPU\_PY310\_UBUNTU22\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_1\_0\_TRANSFORMERS4\_37\_0\_GPU\_PY310\_CU118\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_2\_1\_0\_TRANSFORMERS4\_37\_0\_GPU\_PY310\_CU118\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_NEURONX\_1\_13\_0\_TRANSFORMERS4\_28\_1\_NEURONX\_PY38\_SDK2\_9\_1\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_NEURONX\_1\_13\_0\_TRANSFORMERS4\_28\_1\_NEURONX\_PY38\_SDK2\_9\_1\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_NEURONX\_1\_13\_1\_TRANSFORMERS4\_34\_1\_NEURONX\_PY310\_SDK2\_15\_0\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_NEURONX\_1\_13\_1\_TRANSFORMERS4\_34\_1\_NEURONX\_PY310\_SDK2\_15\_0\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_INFERENCE\_NEURONX\_1\_13\_1\_TRANSFORMERS4\_36\_2\_NEURONX\_PY310\_SDK2\_16\_1\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_INFERENCE\_NEURONX\_1\_13\_1\_TRANSFORMERS4\_36\_2\_NEURONX\_PY310\_SDK2\_16\_1\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_0\_TGI0\_6\_0\_GPU\_PY39\_CU118\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_0\_TGI0\_6\_0\_GPU\_PY39\_CU118\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_0\_TGI0\_8\_2\_GPU\_PY39\_CU118\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_0\_TGI0\_8\_2\_GPU\_PY39\_CU118\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_1\_TGI0\_9\_3\_GPU\_PY39\_CU118\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_1\_TGI0\_9\_3\_GPU\_PY39\_CU118\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_1\_TGI1\_0\_3\_GPU\_PY39\_CU118\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_1\_TGI1\_0\_3\_GPU\_PY39\_CU118\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_1\_TGI1\_1\_0\_GPU\_PY39\_CU118\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_0\_1\_TGI1\_1\_0\_GPU\_PY39\_CU118\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_2\_0\_GPU\_PY310\_CU121\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_2\_0\_GPU\_PY310\_CU121\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_3\_1\_GPU\_PY310\_CU121\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_3\_1\_GPU\_PY310\_CU121\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_3\_3\_GPU\_PY310\_CU121\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_3\_3\_GPU\_PY310\_CU121\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_4\_0\_GPU\_PY310\_CU121\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_4\_0\_GPU\_PY310\_CU121\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_4\_2\_GPU\_PY310\_CU121\_UBUNTU22\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_4\_2\_GPU\_PY310\_CU121\_UBUNTU22\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_4\_5\_GPU\_PY310\_CU121\_UBUNTU22\_04

▪ `Static` `Readonly` **HUGGINGFACE\_PYTORCH\_TGI\_INFERENCE\_2\_1\_1\_TGI1\_4\_5\_GPU\_PY310\_CU121\_UBUNTU22\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_0\_TRANSFORMERS4\_26\_0\_CPU\_PY39\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_0\_TRANSFORMERS4\_26\_0\_CPU\_PY39\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_0\_TRANSFORMERS4\_26\_0\_GPU\_PY39\_CU112\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_0\_TRANSFORMERS4\_26\_0\_GPU\_PY39\_CU112\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_1\_TRANSFORMERS4\_26\_0\_CPU\_PY39\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_1\_TRANSFORMERS4\_26\_0\_CPU\_PY39\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_1\_TRANSFORMERS4\_26\_0\_GPU\_PY39\_CU112\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_11\_1\_TRANSFORMERS4\_26\_0\_GPU\_PY39\_CU112\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_1\_TRANSFORMERS4\_6\_1\_CPU\_PY37\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_1\_TRANSFORMERS4\_6\_1\_CPU\_PY37\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_1\_TRANSFORMERS4\_6\_1\_GPU\_PY37\_CU110\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_1\_TRANSFORMERS4\_6\_1\_GPU\_PY37\_CU110\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_3\_TRANSFORMERS4\_10\_2\_CPU\_PY37\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_3\_TRANSFORMERS4\_10\_2\_CPU\_PY37\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_3\_TRANSFORMERS4\_10\_2\_GPU\_PY37\_CU110\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_4\_3\_TRANSFORMERS4\_10\_2\_GPU\_PY37\_CU110\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_10\_2\_CPU\_PY37\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_10\_2\_CPU\_PY37\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_10\_2\_GPU\_PY37\_CU112\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_10\_2\_GPU\_PY37\_CU112\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_11\_0\_CPU\_PY37\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_11\_0\_CPU\_PY37\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_11\_0\_GPU\_PY37\_CU112\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_11\_0\_GPU\_PY37\_CU112\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_12\_3\_CPU\_PY37\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_12\_3\_CPU\_PY37\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_12\_3\_GPU\_PY37\_CU112\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_1\_TRANSFORMERS4\_12\_3\_GPU\_PY37\_CU112\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_3\_TRANSFORMERS4\_12\_3\_CPU\_PY37\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_3\_TRANSFORMERS4\_12\_3\_CPU\_PY37\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_3\_TRANSFORMERS4\_12\_3\_GPU\_PY37\_CU112\_UBUNTU18\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_5\_3\_TRANSFORMERS4\_12\_3\_GPU\_PY37\_CU112\_UBUNTU18\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_6\_3\_TRANSFORMERS4\_17\_0\_CPU\_PY38\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_6\_3\_TRANSFORMERS4\_17\_0\_CPU\_PY38\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

___

### HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_6\_3\_TRANSFORMERS4\_17\_0\_GPU\_PY38\_CU112\_UBUNTU20\_04

▪ `Static` `Readonly` **HUGGINGFACE\_TENSORFLOW\_INFERENCE\_2\_6\_3\_TRANSFORMERS4\_17\_0\_GPU\_PY38\_CU112\_UBUNTU20\_04**: [`ContainerImage`](ContainerImage.md)

## Methods

### bind

▸ **bind**(`scope`, `grantable`): [`ContainerImageConfig`](../interfaces/ContainerImageConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `grantable` | `IGrantable` |

#### Returns

[`ContainerImageConfig`](../interfaces/ContainerImageConfig.md)

#### Overrides

[ContainerImage](ContainerImage.md).[bind](ContainerImage.md#bind)

___

### fromAsset

▸ **fromAsset**(`directory`, `options?`): [`ContainerImage`](ContainerImage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `directory` | `string` |
| `options` | `DockerImageAssetOptions` |

#### Returns

[`ContainerImage`](ContainerImage.md)

#### Inherited from

[ContainerImage](ContainerImage.md).[fromAsset](ContainerImage.md#fromasset)

___

### fromDeepLearningContainerImage

▸ **fromDeepLearningContainerImage**(`repositoryName`, `tag`, `accountId?`): [`ContainerImage`](ContainerImage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `repositoryName` | `string` |
| `tag` | `string` |
| `accountId?` | `string` |

#### Returns

[`ContainerImage`](ContainerImage.md)

___

### fromEcrRepository

▸ **fromEcrRepository**(`repository`, `tag?`): [`ContainerImage`](ContainerImage.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `repository` | `IRepository` | `undefined` |
| `tag` | `string` | `'latest'` |

#### Returns

[`ContainerImage`](ContainerImage.md)

#### Inherited from

[ContainerImage](ContainerImage.md).[fromEcrRepository](ContainerImage.md#fromecrrepository)
