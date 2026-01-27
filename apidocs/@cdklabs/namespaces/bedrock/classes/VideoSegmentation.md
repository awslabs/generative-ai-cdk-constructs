[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / VideoSegmentation

# Class: VideoSegmentation

Configuration for video segmentation in multimodal knowledge bases.

## Methods

### \_render()

> **\_render**(): `VideoSegmentationConfigurationProperty`

**`Internal`**

#### Returns

`VideoSegmentationConfigurationProperty`

***

### ~~fromFixedLengthDuration()~~

> `static` **fromFixedLengthDuration**(`durationSeconds`): `VideoSegmentation`

#### Parameters

##### durationSeconds

`number`

#### Returns

`VideoSegmentation`

#### Deprecated

Use VideoSegmentation.seconds() instead

***

### seconds()

> `static` **seconds**(`durationSeconds`): `VideoSegmentation`

Creates a video segmentation configuration with fixed-length duration in seconds.

#### Parameters

##### durationSeconds

`number`

The duration of each video segment in seconds (1-30)

#### Returns

`VideoSegmentation`
