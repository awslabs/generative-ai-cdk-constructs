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

## Properties

### instanceTypeIdentifier

• `Private` `Readonly` **instanceTypeIdentifier**: `string`

___

### ML\_C4\_2XLARGE

▪ `Static` `Readonly` **ML\_C4\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c4.2xlarge

___

### ML\_C4\_4XLARGE

▪ `Static` `Readonly` **ML\_C4\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c4.4xlarge

___

### ML\_C4\_8XLARGE

▪ `Static` `Readonly` **ML\_C4\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c4.8xlarge

___

### ML\_C4\_LARGE

▪ `Static` `Readonly` **ML\_C4\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c4.large

___

### ML\_C4\_XLARGE

▪ `Static` `Readonly` **ML\_C4\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c4.xlarge

___

### ML\_C5D\_18XLARGE

▪ `Static` `Readonly` **ML\_C5D\_18XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.18xlarge

___

### ML\_C5D\_2XLARGE

▪ `Static` `Readonly` **ML\_C5D\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.2xlarge

___

### ML\_C5D\_4XLARGE

▪ `Static` `Readonly` **ML\_C5D\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.4xlarge

___

### ML\_C5D\_9XLARGE

▪ `Static` `Readonly` **ML\_C5D\_9XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.9xlarge

___

### ML\_C5D\_LARGE

▪ `Static` `Readonly` **ML\_C5D\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.large

___

### ML\_C5D\_XLARGE

▪ `Static` `Readonly` **ML\_C5D\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5d.xlarge

___

### ML\_C5\_18XLARGE

▪ `Static` `Readonly` **ML\_C5\_18XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.18xlarge

___

### ML\_C5\_2XLARGE

▪ `Static` `Readonly` **ML\_C5\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.2xlarge

___

### ML\_C5\_4XLARGE

▪ `Static` `Readonly` **ML\_C5\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.4xlarge

___

### ML\_C5\_9XLARGE

▪ `Static` `Readonly` **ML\_C5\_9XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.9xlarge

___

### ML\_C5\_LARGE

▪ `Static` `Readonly` **ML\_C5\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.large

___

### ML\_C5\_XLARGE

▪ `Static` `Readonly` **ML\_C5\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c5.xlarge

___

### ML\_C6I\_12XLARGE

▪ `Static` `Readonly` **ML\_C6I\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.12xlarge

___

### ML\_C6I\_16XLARGE

▪ `Static` `Readonly` **ML\_C6I\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.16xlarge

___

### ML\_C6I\_24XLARGE

▪ `Static` `Readonly` **ML\_C6I\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.24xlarge

___

### ML\_C6I\_2XLARGE

▪ `Static` `Readonly` **ML\_C6I\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.2xlarge

___

### ML\_C6I\_32XLARGE

▪ `Static` `Readonly` **ML\_C6I\_32XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.32xlarge

___

### ML\_C6I\_4XLARGE

▪ `Static` `Readonly` **ML\_C6I\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.4xlarge

___

### ML\_C6I\_8XLARGE

▪ `Static` `Readonly` **ML\_C6I\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.8xlarge

___

### ML\_C6I\_LARGE

▪ `Static` `Readonly` **ML\_C6I\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.large

___

### ML\_C6I\_XLARGE

▪ `Static` `Readonly` **ML\_C6I\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.c6i.xlarge

___

### ML\_G4DN\_12XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.12xlarge

___

### ML\_G4DN\_16XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.16xlarge

___

### ML\_G4DN\_2XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.2xlarge

___

### ML\_G4DN\_4XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.4xlarge

___

### ML\_G4DN\_8XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.8xlarge

___

### ML\_G4DN\_XLARGE

▪ `Static` `Readonly` **ML\_G4DN\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g4dn.xlarge

___

### ML\_G5\_12XLARGE

▪ `Static` `Readonly` **ML\_G5\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.12xlarge

___

### ML\_G5\_16XLARGE

▪ `Static` `Readonly` **ML\_G5\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.16xlarge

___

### ML\_G5\_24XLARGE

▪ `Static` `Readonly` **ML\_G5\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.24xlarge

___

### ML\_G5\_2XLARGE

▪ `Static` `Readonly` **ML\_G5\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.2xlarge

___

### ML\_G5\_48XLARGE

▪ `Static` `Readonly` **ML\_G5\_48XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.48xlarge

___

### ML\_G5\_4XLARGE

▪ `Static` `Readonly` **ML\_G5\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.4xlarge

___

### ML\_G5\_8XLARGE

▪ `Static` `Readonly` **ML\_G5\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.8xlarge

___

### ML\_G5\_XLARGE

▪ `Static` `Readonly` **ML\_G5\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.g5.xlarge

___

### ML\_INF1\_24XLARGE

▪ `Static` `Readonly` **ML\_INF1\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf1.24xlarge

___

### ML\_INF1\_2XLARGE

▪ `Static` `Readonly` **ML\_INF1\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf1.2xlarge

___

### ML\_INF1\_6XLARGE

▪ `Static` `Readonly` **ML\_INF1\_6XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf1.6xlarge

___

### ML\_INF1\_XLARGE

▪ `Static` `Readonly` **ML\_INF1\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf1.xlarge

___

### ML\_INF2\_24XLARGE

▪ `Static` `Readonly` **ML\_INF2\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf2.24xlarge

___

### ML\_INF2\_48XLARGE

▪ `Static` `Readonly` **ML\_INF2\_48XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf2.48xlarge

___

### ML\_INF2\_8XLARGE

▪ `Static` `Readonly` **ML\_INF2\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf2.8xlarge

___

### ML\_INF2\_XLARGE

▪ `Static` `Readonly` **ML\_INF2\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.inf2.xlarge

___

### ML\_M4\_10XLARGE

▪ `Static` `Readonly` **ML\_M4\_10XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m4.10xlarge

___

### ML\_M4\_16XLARGE

▪ `Static` `Readonly` **ML\_M4\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m4.16xlarge

___

### ML\_M4\_2XLARGE

▪ `Static` `Readonly` **ML\_M4\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m4.2xlarge

___

### ML\_M4\_4XLARGE

▪ `Static` `Readonly` **ML\_M4\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m4.4xlarge

___

### ML\_M4\_XLARGE

▪ `Static` `Readonly` **ML\_M4\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m4.xlarge

___

### ML\_M5D\_12XLARGE

▪ `Static` `Readonly` **ML\_M5D\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.12xlarge

___

### ML\_M5D\_24XLARGE

▪ `Static` `Readonly` **ML\_M5D\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.24xlarge

___

### ML\_M5D\_2XLARGE

▪ `Static` `Readonly` **ML\_M5D\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.2xlarge

___

### ML\_M5D\_4XLARGE

▪ `Static` `Readonly` **ML\_M5D\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.4xlarge

___

### ML\_M5D\_LARGE

▪ `Static` `Readonly` **ML\_M5D\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.large

___

### ML\_M5D\_XLARGE

▪ `Static` `Readonly` **ML\_M5D\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5d.xlarge

___

### ML\_M5\_12XLARGE

▪ `Static` `Readonly` **ML\_M5\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.12xlarge

___

### ML\_M5\_24XLARGE

▪ `Static` `Readonly` **ML\_M5\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.24xlarge

___

### ML\_M5\_2XLARGE

▪ `Static` `Readonly` **ML\_M5\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.2xlarge

___

### ML\_M5\_4XLARGE

▪ `Static` `Readonly` **ML\_M5\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.4xlarge

___

### ML\_M5\_LARGE

▪ `Static` `Readonly` **ML\_M5\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.large

___

### ML\_M5\_XLARGE

▪ `Static` `Readonly` **ML\_M5\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.m5.xlarge

___

### ML\_P2\_16XLARGE

▪ `Static` `Readonly` **ML\_P2\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p2.16xlarge

___

### ML\_P2\_8XLARGE

▪ `Static` `Readonly` **ML\_P2\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p2.8xlarge

___

### ML\_P2\_XLARGE

▪ `Static` `Readonly` **ML\_P2\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p2.xlarge

___

### ML\_P3\_16XLARGE

▪ `Static` `Readonly` **ML\_P3\_16XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p3.16xlarge

___

### ML\_P3\_2XLARGE

▪ `Static` `Readonly` **ML\_P3\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p3.2xlarge

___

### ML\_P3\_8XLARGE

▪ `Static` `Readonly` **ML\_P3\_8XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p3.8xlarge

___

### ML\_P4D\_24XLARGE

▪ `Static` `Readonly` **ML\_P4D\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.p4d.24xlarge

___

### ML\_R5D\_12XLARGE

▪ `Static` `Readonly` **ML\_R5D\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.12xlarge

___

### ML\_R5D\_24XLARGE

▪ `Static` `Readonly` **ML\_R5D\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.24xlarge

___

### ML\_R5D\_2XLARGE

▪ `Static` `Readonly` **ML\_R5D\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.2xlarge

___

### ML\_R5D\_4XLARGE

▪ `Static` `Readonly` **ML\_R5D\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.4xlarge

___

### ML\_R5D\_LARGE

▪ `Static` `Readonly` **ML\_R5D\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.large

___

### ML\_R5D\_XLARGE

▪ `Static` `Readonly` **ML\_R5D\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5d.xlarge

___

### ML\_R5\_12XLARGE

▪ `Static` `Readonly` **ML\_R5\_12XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.12xlarge

___

### ML\_R5\_24XLARGE

▪ `Static` `Readonly` **ML\_R5\_24XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.24xlarge

___

### ML\_R5\_2XLARGE

▪ `Static` `Readonly` **ML\_R5\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.2xlarge

___

### ML\_R5\_4XLARGE

▪ `Static` `Readonly` **ML\_R5\_4XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.4xlarge

___

### ML\_R5\_LARGE

▪ `Static` `Readonly` **ML\_R5\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.large

___

### ML\_R5\_XLARGE

▪ `Static` `Readonly` **ML\_R5\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.r5.xlarge

___

### ML\_T2\_2XLARGE

▪ `Static` `Readonly` **ML\_T2\_2XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.t2.2xlarge

___

### ML\_T2\_LARGE

▪ `Static` `Readonly` **ML\_T2\_LARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.t2.large

___

### ML\_T2\_MEDIUM

▪ `Static` `Readonly` **ML\_T2\_MEDIUM**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.t2.medium

___

### ML\_T2\_XLARGE

▪ `Static` `Readonly` **ML\_T2\_XLARGE**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

ml.t2.xlarge

## Methods

### toString

▸ **toString**(): `string`

Return the instance type as a string

#### Returns

`string`

The instance type as a string

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
