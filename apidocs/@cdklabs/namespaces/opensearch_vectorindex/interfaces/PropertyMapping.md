[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [opensearch\_vectorindex](../README.md) / PropertyMapping

# Interface: PropertyMapping

## Properties

### dimension?

> `readonly` `optional` **dimension**: `number`

Dimension size for vector fields, defines the number of dimensions in the vector.

***

### index?

> `readonly` `optional` **index**: `boolean`

Whether the index is indexed. Previously, this was called `filterable`.

***

### method?

> `readonly` `optional` **method**: [`Method`](Method.md)

Configuration for k-NN search method.

***

### properties?

> `readonly` `optional` **properties**: `Record`\<`string`, `PropertyMapping`\>

Defines the fields within the mapping, including their types and configurations.

***

### type

> `readonly` **type**: [`OpensearchFieldType`](../enumerations/OpensearchFieldType.md)

The field data type. Must be a valid OpenSearch field type.

***

### value?

> `readonly` `optional` **value**: `string`

Default value for the field when not specified in a document.
