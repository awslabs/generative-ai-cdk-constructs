[@cdklabs/generative-ai-cdk-constructs](../README.md) / SageMakerInstanceType

# Class: SageMakerInstanceType

Supported instance types for SageMaker instance-based production variants.

## Table of contents

### Constructors

- [constructor](SageMakerInstanceType.md#constructor)

### Properties

- [instanceTypeIdentifier](SageMakerInstanceType.md#instancetypeidentifier)
- [ML\_C4\_2XLARGE](SageMakerInstanceType.md#ml_c4_2xlarge)
- [ML\_C4\_4XLARGE](SageMakerInstanceType.md#ml_c4_4xlarge)
- [ML\_C4\_8XLARGE](SageMakerInstanceType.md#ml_c4_8xlarge)
- [ML\_C4\_LARGE](SageMakerInstanceType.md#ml_c4_large)
- [ML\_C4\_XLARGE](SageMakerInstanceType.md#ml_c4_xlarge)
- [ML\_C5D\_18XLARGE](SageMakerInstanceType.md#ml_c5d_18xlarge)
- [ML\_C5D\_2XLARGE](SageMakerInstanceType.md#ml_c5d_2xlarge)
- [ML\_C5D\_4XLARGE](SageMakerInstanceType.md#ml_c5d_4xlarge)
- [ML\_C5D\_9XLARGE](SageMakerInstanceType.md#ml_c5d_9xlarge)
- [ML\_C5D\_LARGE](SageMakerInstanceType.md#ml_c5d_large)
- [ML\_C5D\_XLARGE](SageMakerInstanceType.md#ml_c5d_xlarge)
- [ML\_C5\_18XLARGE](SageMakerInstanceType.md#ml_c5_18xlarge)
- [ML\_C5\_2XLARGE](SageMakerInstanceType.md#ml_c5_2xlarge)
- [ML\_C5\_4XLARGE](SageMakerInstanceType.md#ml_c5_4xlarge)
- [ML\_C5\_9XLARGE](SageMakerInstanceType.md#ml_c5_9xlarge)
- [ML\_C5\_LARGE](SageMakerInstanceType.md#ml_c5_large)
- [ML\_C5\_XLARGE](SageMakerInstanceType.md#ml_c5_xlarge)
- [ML\_C6I\_12XLARGE](SageMakerInstanceType.md#ml_c6i_12xlarge)
- [ML\_C6I\_16XLARGE](SageMakerInstanceType.md#ml_c6i_16xlarge)
- [ML\_C6I\_24XLARGE](SageMakerInstanceType.md#ml_c6i_24xlarge)
- [ML\_C6I\_2XLARGE](SageMakerInstanceType.md#ml_c6i_2xlarge)
- [ML\_C6I\_32XLARGE](SageMakerInstanceType.md#ml_c6i_32xlarge)
- [ML\_C6I\_4XLARGE](SageMakerInstanceType.md#ml_c6i_4xlarge)
- [ML\_C6I\_8XLARGE](SageMakerInstanceType.md#ml_c6i_8xlarge)
- [ML\_C6I\_LARGE](SageMakerInstanceType.md#ml_c6i_large)
- [ML\_C6I\_XLARGE](SageMakerInstanceType.md#ml_c6i_xlarge)
- [ML\_G4DN\_12XLARGE](SageMakerInstanceType.md#ml_g4dn_12xlarge)
- [ML\_G4DN\_16XLARGE](SageMakerInstanceType.md#ml_g4dn_16xlarge)
- [ML\_G4DN\_2XLARGE](SageMakerInstanceType.md#ml_g4dn_2xlarge)
- [ML\_G4DN\_4XLARGE](SageMakerInstanceType.md#ml_g4dn_4xlarge)
- [ML\_G4DN\_8XLARGE](SageMakerInstanceType.md#ml_g4dn_8xlarge)
- [ML\_G4DN\_XLARGE](SageMakerInstanceType.md#ml_g4dn_xlarge)
- [ML\_G5\_12XLARGE](SageMakerInstanceType.md#ml_g5_12xlarge)
- [ML\_G5\_16XLARGE](SageMakerInstanceType.md#ml_g5_16xlarge)
- [ML\_G5\_24XLARGE](SageMakerInstanceType.md#ml_g5_24xlarge)
- [ML\_G5\_2XLARGE](SageMakerInstanceType.md#ml_g5_2xlarge)
- [ML\_G5\_48XLARGE](SageMakerInstanceType.md#ml_g5_48xlarge)
- [ML\_G5\_4XLARGE](SageMakerInstanceType.md#ml_g5_4xlarge)
- [ML\_G5\_8XLARGE](SageMakerInstanceType.md#ml_g5_8xlarge)
- [ML\_G5\_XLARGE](SageMakerInstanceType.md#ml_g5_xlarge)
- [ML\_INF1\_24XLARGE](SageMakerInstanceType.md#ml_inf1_24xlarge)
- [ML\_INF1\_2XLARGE](SageMakerInstanceType.md#ml_inf1_2xlarge)
- [ML\_INF1\_6XLARGE](SageMakerInstanceType.md#ml_inf1_6xlarge)
- [ML\_INF1\_XLARGE](SageMakerInstanceType.md#ml_inf1_xlarge)
- [ML\_INF2\_24XLARGE](SageMakerInstanceType.md#ml_inf2_24xlarge)
- [ML\_INF2\_48XLARGE](SageMakerInstanceType.md#ml_inf2_48xlarge)
- [ML\_INF2\_8XLARGE](SageMakerInstanceType.md#ml_inf2_8xlarge)
- [ML\_INF2\_XLARGE](SageMakerInstanceType.md#ml_inf2_xlarge)
- [ML\_M4\_10XLARGE](SageMakerInstanceType.md#ml_m4_10xlarge)
- [ML\_M4\_16XLARGE](SageMakerInstanceType.md#ml_m4_16xlarge)
- [ML\_M4\_2XLARGE](SageMakerInstanceType.md#ml_m4_2xlarge)
- [ML\_M4\_4XLARGE](SageMakerInstanceType.md#ml_m4_4xlarge)
- [ML\_M4\_XLARGE](SageMakerInstanceType.md#ml_m4_xlarge)
- [ML\_M5D\_12XLARGE](SageMakerInstanceType.md#ml_m5d_12xlarge)
- [ML\_M5D\_24XLARGE](SageMakerInstanceType.md#ml_m5d_24xlarge)
- [ML\_M5D\_2XLARGE](SageMakerInstanceType.md#ml_m5d_2xlarge)
- [ML\_M5D\_4XLARGE](SageMakerInstanceType.md#ml_m5d_4xlarge)
- [ML\_M5D\_LARGE](SageMakerInstanceType.md#ml_m5d_large)
- [ML\_M5D\_XLARGE](SageMakerInstanceType.md#ml_m5d_xlarge)
- [ML\_M5\_12XLARGE](SageMakerInstanceType.md#ml_m5_12xlarge)
- [ML\_M5\_24XLARGE](SageMakerInstanceType.md#ml_m5_24xlarge)
- [ML\_M5\_2XLARGE](SageMakerInstanceType.md#ml_m5_2xlarge)
- [ML\_M5\_4XLARGE](SageMakerInstanceType.md#ml_m5_4xlarge)
- [ML\_M5\_LARGE](SageMakerInstanceType.md#ml_m5_large)
- [ML\_M5\_XLARGE](SageMakerInstanceType.md#ml_m5_xlarge)
- [ML\_P2\_16XLARGE](SageMakerInstanceType.md#ml_p2_16xlarge)
- [ML\_P2\_8XLARGE](SageMakerInstanceType.md#ml_p2_8xlarge)
- [ML\_P2\_XLARGE](SageMakerInstanceType.md#ml_p2_xlarge)
- [ML\_P3\_16XLARGE](SageMakerInstanceType.md#ml_p3_16xlarge)
- [ML\_P3\_2XLARGE](SageMakerInstanceType.md#ml_p3_2xlarge)
- [ML\_P3\_8XLARGE](SageMakerInstanceType.md#ml_p3_8xlarge)
- [ML\_P4D\_24XLARGE](SageMakerInstanceType.md#ml_p4d_24xlarge)
- [ML\_R5D\_12XLARGE](SageMakerInstanceType.md#ml_r5d_12xlarge)
- [ML\_R5D\_24XLARGE](SageMakerInstanceType.md#ml_r5d_24xlarge)
- [ML\_R5D\_2XLARGE](SageMakerInstanceType.md#ml_r5d_2xlarge)
- [ML\_R5D\_4XLARGE](SageMakerInstanceType.md#ml_r5d_4xlarge)
- [ML\_R5D\_LARGE](SageMakerInstanceType.md#ml_r5d_large)
- [ML\_R5D\_XLARGE](SageMakerInstanceType.md#ml_r5d_xlarge)
- [ML\_R5\_12XLARGE](SageMakerInstanceType.md#ml_r5_12xlarge)
- [ML\_R5\_24XLARGE](SageMakerInstanceType.md#ml_r5_24xlarge)
- [ML\_R5\_2XLARGE](SageMakerInstanceType.md#ml_r5_2xlarge)
- [ML\_R5\_4XLARGE](SageMakerInstanceType.md#ml_r5_4xlarge)
- [ML\_R5\_LARGE](SageMakerInstanceType.md#ml_r5_large)
- [ML\_R5\_XLARGE](SageMakerInstanceType.md#ml_r5_xlarge)
- [ML\_T2\_2XLARGE](SageMakerInstanceType.md#ml_t2_2xlarge)
- [ML\_T2\_LARGE](SageMakerInstanceType.md#ml_t2_large)
- [ML\_T2\_MEDIUM](SageMakerInstanceType.md#ml_t2_medium)
- [ML\_T2\_XLARGE](SageMakerInstanceType.md#ml_t2_xlarge)

### Methods

- [toString](SageMakerInstanceType.md#tostring)
- [of](SageMakerInstanceType.md#of)

## Constructors

### constructor

• **new SageMakerInstanceType**(`instanceType`): [`SageMakerInstanceType`](SageMakerInstanceType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceType` | `string` |

#### Returns

[`SageMakerInstanceType`](SageMakerInstanceType.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:471](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L471)

## Properties

### instanceTypeIdentifier

• `Private` `Readonly` **instanceTypeIdentifier**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:469](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L469)

___

### ML\_C4\_2XLARGE

▪ `Static` `Readonly` **ML\_C4\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c4.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:23](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L23)

___

### ML\_C4\_4XLARGE

▪ `Static` `Readonly` **ML\_C4\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c4.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:28](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L28)

___

### ML\_C4\_8XLARGE

▪ `Static` `Readonly` **ML\_C4\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c4.8xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:33](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L33)

___

### ML\_C4\_LARGE

▪ `Static` `Readonly` **ML\_C4\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c4.large

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:38](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L38)

___

### ML\_C4\_XLARGE

▪ `Static` `Readonly` **ML\_C4\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c4.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:43](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L43)

___

### ML\_C5D\_18XLARGE

▪ `Static` `Readonly` **ML\_C5D\_18XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.18xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:78](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L78)

___

### ML\_C5D\_2XLARGE

▪ `Static` `Readonly` **ML\_C5D\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:83](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L83)

___

### ML\_C5D\_4XLARGE

▪ `Static` `Readonly` **ML\_C5D\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:88](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L88)

___

### ML\_C5D\_9XLARGE

▪ `Static` `Readonly` **ML\_C5D\_9XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.9xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:93](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L93)

___

### ML\_C5D\_LARGE

▪ `Static` `Readonly` **ML\_C5D\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.large

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:98](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L98)

___

### ML\_C5D\_XLARGE

▪ `Static` `Readonly` **ML\_C5D\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:103](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L103)

___

### ML\_C5\_18XLARGE

▪ `Static` `Readonly` **ML\_C5\_18XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.18xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:48](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L48)

___

### ML\_C5\_2XLARGE

▪ `Static` `Readonly` **ML\_C5\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:53](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L53)

___

### ML\_C5\_4XLARGE

▪ `Static` `Readonly` **ML\_C5\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:58](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L58)

___

### ML\_C5\_9XLARGE

▪ `Static` `Readonly` **ML\_C5\_9XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.9xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:63](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L63)

___

### ML\_C5\_LARGE

▪ `Static` `Readonly` **ML\_C5\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.large

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:68](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L68)

___

### ML\_C5\_XLARGE

▪ `Static` `Readonly` **ML\_C5\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:73](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L73)

___

### ML\_C6I\_12XLARGE

▪ `Static` `Readonly` **ML\_C6I\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.12xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:108](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L108)

___

### ML\_C6I\_16XLARGE

▪ `Static` `Readonly` **ML\_C6I\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.16xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:113](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L113)

___

### ML\_C6I\_24XLARGE

▪ `Static` `Readonly` **ML\_C6I\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.24xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:118](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L118)

___

### ML\_C6I\_2XLARGE

▪ `Static` `Readonly` **ML\_C6I\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:123](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L123)

___

### ML\_C6I\_32XLARGE

▪ `Static` `Readonly` **ML\_C6I\_32XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.32xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:128](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L128)

___

### ML\_C6I\_4XLARGE

▪ `Static` `Readonly` **ML\_C6I\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:133](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L133)

___

### ML\_C6I\_8XLARGE

▪ `Static` `Readonly` **ML\_C6I\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.8xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:138](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L138)

___

### ML\_C6I\_LARGE

▪ `Static` `Readonly` **ML\_C6I\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.large

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:143](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L143)

___

### ML\_C6I\_XLARGE

▪ `Static` `Readonly` **ML\_C6I\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:148](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L148)

___

### ML\_G4DN\_12XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.12xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:153](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L153)

___

### ML\_G4DN\_16XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.16xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:158](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L158)

___

### ML\_G4DN\_2XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:163](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L163)

___

### ML\_G4DN\_4XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:168](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L168)

___

### ML\_G4DN\_8XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.8xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:173](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L173)

___

### ML\_G4DN\_XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:178](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L178)

___

### ML\_G5\_12XLARGE

▪ `Static` `Readonly` **ML\_G5\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.12xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:183](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L183)

___

### ML\_G5\_16XLARGE

▪ `Static` `Readonly` **ML\_G5\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.16xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:188](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L188)

___

### ML\_G5\_24XLARGE

▪ `Static` `Readonly` **ML\_G5\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.24xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:193](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L193)

___

### ML\_G5\_2XLARGE

▪ `Static` `Readonly` **ML\_G5\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:198](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L198)

___

### ML\_G5\_48XLARGE

▪ `Static` `Readonly` **ML\_G5\_48XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.48xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:203](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L203)

___

### ML\_G5\_4XLARGE

▪ `Static` `Readonly` **ML\_G5\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:208](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L208)

___

### ML\_G5\_8XLARGE

▪ `Static` `Readonly` **ML\_G5\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.8xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:213](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L213)

___

### ML\_G5\_XLARGE

▪ `Static` `Readonly` **ML\_G5\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:218](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L218)

___

### ML\_INF1\_24XLARGE

▪ `Static` `Readonly` **ML\_INF1\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf1.24xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:223](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L223)

___

### ML\_INF1\_2XLARGE

▪ `Static` `Readonly` **ML\_INF1\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf1.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:228](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L228)

___

### ML\_INF1\_6XLARGE

▪ `Static` `Readonly` **ML\_INF1\_6XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf1.6xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:233](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L233)

___

### ML\_INF1\_XLARGE

▪ `Static` `Readonly` **ML\_INF1\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf1.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:238](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L238)

___

### ML\_INF2\_24XLARGE

▪ `Static` `Readonly` **ML\_INF2\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf2.24xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:253](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L253)

___

### ML\_INF2\_48XLARGE

▪ `Static` `Readonly` **ML\_INF2\_48XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf2.48xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:258](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L258)

___

### ML\_INF2\_8XLARGE

▪ `Static` `Readonly` **ML\_INF2\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf2.8xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:248](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L248)

___

### ML\_INF2\_XLARGE

▪ `Static` `Readonly` **ML\_INF2\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf2.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:243](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L243)

___

### ML\_M4\_10XLARGE

▪ `Static` `Readonly` **ML\_M4\_10XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m4.10xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:263](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L263)

___

### ML\_M4\_16XLARGE

▪ `Static` `Readonly` **ML\_M4\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m4.16xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:268](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L268)

___

### ML\_M4\_2XLARGE

▪ `Static` `Readonly` **ML\_M4\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m4.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:273](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L273)

___

### ML\_M4\_4XLARGE

▪ `Static` `Readonly` **ML\_M4\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m4.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:278](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L278)

___

### ML\_M4\_XLARGE

▪ `Static` `Readonly` **ML\_M4\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m4.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:283](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L283)

___

### ML\_M5D\_12XLARGE

▪ `Static` `Readonly` **ML\_M5D\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.12xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:318](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L318)

___

### ML\_M5D\_24XLARGE

▪ `Static` `Readonly` **ML\_M5D\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.24xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:323](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L323)

___

### ML\_M5D\_2XLARGE

▪ `Static` `Readonly` **ML\_M5D\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:328](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L328)

___

### ML\_M5D\_4XLARGE

▪ `Static` `Readonly` **ML\_M5D\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:333](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L333)

___

### ML\_M5D\_LARGE

▪ `Static` `Readonly` **ML\_M5D\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.large

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:338](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L338)

___

### ML\_M5D\_XLARGE

▪ `Static` `Readonly` **ML\_M5D\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:343](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L343)

___

### ML\_M5\_12XLARGE

▪ `Static` `Readonly` **ML\_M5\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.12xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:288](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L288)

___

### ML\_M5\_24XLARGE

▪ `Static` `Readonly` **ML\_M5\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.24xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:293](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L293)

___

### ML\_M5\_2XLARGE

▪ `Static` `Readonly` **ML\_M5\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:298](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L298)

___

### ML\_M5\_4XLARGE

▪ `Static` `Readonly` **ML\_M5\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:303](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L303)

___

### ML\_M5\_LARGE

▪ `Static` `Readonly` **ML\_M5\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.large

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:308](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L308)

___

### ML\_M5\_XLARGE

▪ `Static` `Readonly` **ML\_M5\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:313](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L313)

___

### ML\_P2\_16XLARGE

▪ `Static` `Readonly` **ML\_P2\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p2.16xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:348](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L348)

___

### ML\_P2\_8XLARGE

▪ `Static` `Readonly` **ML\_P2\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p2.8xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:353](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L353)

___

### ML\_P2\_XLARGE

▪ `Static` `Readonly` **ML\_P2\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p2.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:358](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L358)

___

### ML\_P3\_16XLARGE

▪ `Static` `Readonly` **ML\_P3\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p3.16xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:363](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L363)

___

### ML\_P3\_2XLARGE

▪ `Static` `Readonly` **ML\_P3\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p3.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:368](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L368)

___

### ML\_P3\_8XLARGE

▪ `Static` `Readonly` **ML\_P3\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p3.8xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:373](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L373)

___

### ML\_P4D\_24XLARGE

▪ `Static` `Readonly` **ML\_P4D\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p4d.24xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:378](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L378)

___

### ML\_R5D\_12XLARGE

▪ `Static` `Readonly` **ML\_R5D\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.12xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:413](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L413)

___

### ML\_R5D\_24XLARGE

▪ `Static` `Readonly` **ML\_R5D\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.24xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:418](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L418)

___

### ML\_R5D\_2XLARGE

▪ `Static` `Readonly` **ML\_R5D\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:423](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L423)

___

### ML\_R5D\_4XLARGE

▪ `Static` `Readonly` **ML\_R5D\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:428](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L428)

___

### ML\_R5D\_LARGE

▪ `Static` `Readonly` **ML\_R5D\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.large

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:433](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L433)

___

### ML\_R5D\_XLARGE

▪ `Static` `Readonly` **ML\_R5D\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:438](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L438)

___

### ML\_R5\_12XLARGE

▪ `Static` `Readonly` **ML\_R5\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.12xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:383](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L383)

___

### ML\_R5\_24XLARGE

▪ `Static` `Readonly` **ML\_R5\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.24xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:388](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L388)

___

### ML\_R5\_2XLARGE

▪ `Static` `Readonly` **ML\_R5\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:393](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L393)

___

### ML\_R5\_4XLARGE

▪ `Static` `Readonly` **ML\_R5\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.4xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:398](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L398)

___

### ML\_R5\_LARGE

▪ `Static` `Readonly` **ML\_R5\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.large

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:403](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L403)

___

### ML\_R5\_XLARGE

▪ `Static` `Readonly` **ML\_R5\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:408](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L408)

___

### ML\_T2\_2XLARGE

▪ `Static` `Readonly` **ML\_T2\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.t2.2xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:443](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L443)

___

### ML\_T2\_LARGE

▪ `Static` `Readonly` **ML\_T2\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.t2.large

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:448](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L448)

___

### ML\_T2\_MEDIUM

▪ `Static` `Readonly` **ML\_T2\_MEDIUM**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.t2.medium

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:453](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L453)

___

### ML\_T2\_XLARGE

▪ `Static` `Readonly` **ML\_T2\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.t2.xlarge

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:458](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L458)

## Methods

### toString

▸ **toString**(): `string`

Return the instance type as a string

#### Returns

`string`

The instance type as a string

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:483](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L483)

___

### of

▸ **of**(`instanceType`): [`SageMakerInstanceType`](SageMakerInstanceType.md)

Builds an InstanceType from a given string or token (such as a CfnParameter).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceType` | `string` | An instance type as string |

#### Returns

[`SageMakerInstanceType`](SageMakerInstanceType.md)

A strongly typed InstanceType

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts:465](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-instance-type.ts#L465)
