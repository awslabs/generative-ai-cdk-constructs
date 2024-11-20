[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / CrossRegionInferenceProfileProps

# Interface: CrossRegionInferenceProfileProps

***************************************************************************
                       PROPS FOR NEW CONSTRUCT
***************************************************************************

## Properties

### geoRegion

> `readonly` **geoRegion**: [`CrossRegionInferenceProfileRegion`](../enumerations/CrossRegionInferenceProfileRegion.md)

The geographic region where the traffic is going to be distributed. Routing
factors in user traffic, demand and utilization of resources.

***

### model

> `readonly` **model**: [`BedrockFoundationModel`](../classes/BedrockFoundationModel.md)

A model supporting cross-region inference.

#### See

https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference-support.html
