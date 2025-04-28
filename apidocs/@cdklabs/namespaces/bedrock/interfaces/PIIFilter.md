[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / PIIFilter

# Interface: PIIFilter

Interface to define a PII Filter.

## Properties

### action

> `readonly` **action**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when PII is detected.

***

### inputAction?

> `readonly` `optional` **inputAction**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when PII is detected in the input.

***

### inputEnabled?

> `readonly` `optional` **inputEnabled**: `boolean`

Whether the PII filter is enabled for input.

***

### outputAction?

> `readonly` `optional` **outputAction**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when PII is detected in the output.

***

### outputEnabled?

> `readonly` `optional` **outputEnabled**: `boolean`

Whether the PII filter is enabled for output.

***

### type

> `readonly` **type**: [`General`](../namespaces/PIIType/enumerations/General.md) \| [`Finance`](../namespaces/PIIType/enumerations/Finance.md) \| [`InformationTechnology`](../namespaces/PIIType/enumerations/InformationTechnology.md) \| [`USASpecific`](../namespaces/PIIType/enumerations/USASpecific.md) \| [`CanadaSpecific`](../namespaces/PIIType/enumerations/CanadaSpecific.md) \| [`UKSpecific`](../namespaces/PIIType/enumerations/UKSpecific.md)

The type of PII to filter.
