[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [opensearch\_vectorindex](../README.md) / Method

# Interface: Method

Configuration for k-NN search method.

## Properties

### engine

> `readonly` **engine**: [`EngineType`](../enumerations/EngineType.md)

The k-NN search engine to use.

***

### name

> `readonly` **name**: [`AlgorithmNameType`](../enumerations/AlgorithmNameType.md)

The algorithm name for k-NN search.

***

### parameters?

> `readonly` `optional` **parameters**: [`MethodParameters`](MethodParameters.md)

Additional parameters for the k-NN algorithm.

***

### spaceType?

> `readonly` `optional` **spaceType**: [`SpaceType`](../enumerations/SpaceType.md)

The distance function used for k-NN search.
