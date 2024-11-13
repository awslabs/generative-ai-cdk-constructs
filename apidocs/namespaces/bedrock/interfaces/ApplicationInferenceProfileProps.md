[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ApplicationInferenceProfileProps

# Interface: ApplicationInferenceProfileProps

Properties for creating a ApplicationInferenceProfile.

## Properties

### description?

> `readonly` `optional` **description**: `string`

Description of the inference profile.

#### See

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-applicationinferenceprofile.html#cfn-bedrock-applicationinferenceprofile-description

***

### inferenceProfileName

> `readonly` **inferenceProfileName**: `string`

The name of the inference profile.

#### See

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-applicationinferenceprofile.html#cfn-bedrock-applicationinferenceprofile-inferenceprofilename

***

### modelSource

> `readonly` **modelSource**: `string`

To create an application inference profile for one Region, specify a foundation model.
Usage and costs for requests made to that Region with that model will be tracked.

To create an application inference profile for multiple Regions,
specify a cross region (system-defined) inference profile.
The inference profile will route requests to the Regions defined in
the cross region (system-defined) inference profile that you choose.
Usage and costs for requests made to the Regions in the inference profile will be tracked.

***

### tags?

> `readonly` `optional` **tags**: `CfnTag`[]

A list of tags associated with the inference profile.
