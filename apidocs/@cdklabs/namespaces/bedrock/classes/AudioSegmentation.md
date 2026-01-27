[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / AudioSegmentation

# Class: AudioSegmentation

Configuration for audio segmentation in multimodal knowledge bases.

## Methods

### \_render()

> **\_render**(): `AudioSegmentationConfigurationProperty`

**`Internal`**

#### Returns

`AudioSegmentationConfigurationProperty`

***

### ~~fromFixedLengthDuration()~~

> `static` **fromFixedLengthDuration**(`durationSeconds`): `AudioSegmentation`

#### Parameters

##### durationSeconds

`number`

#### Returns

`AudioSegmentation`

#### Deprecated

Use AudioSegmentation.seconds() instead

***

### seconds()

> `static` **seconds**(`durationSeconds`): `AudioSegmentation`

Creates an audio segmentation configuration with fixed-length duration in seconds.

#### Parameters

##### durationSeconds

`number`

The duration of each audio segment in seconds (1-30)

#### Returns

`AudioSegmentation`
