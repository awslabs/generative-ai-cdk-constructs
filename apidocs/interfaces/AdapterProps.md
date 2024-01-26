[@cdklabs/generative-ai-cdk-constructs](../README.md) / AdapterProps

# Interface: AdapterProps

AdapterProps

## Table of contents

### Properties

- [compatibleArchitectures](AdapterProps.md#compatiblearchitectures)
- [compatibleRuntimes](AdapterProps.md#compatibleruntimes)
- [description](AdapterProps.md#description)
- [layerVersionName](AdapterProps.md#layerversionname)
- [license](AdapterProps.md#license)
- [removalPolicy](AdapterProps.md#removalpolicy)

## Properties

### compatibleArchitectures

• `Optional` `Readonly` **compatibleArchitectures**: `Architecture`[]

The system architectures compatible with this layer.

**`Default`**

```ts
[Architecture.X86_64]
```

**`Stability`**

stable

___

### compatibleRuntimes

• `Optional` `Readonly` **compatibleRuntimes**: `Runtime`[]

The runtimes compatible with this Layer.

**`Default`**

```ts
- All runtimes are supported.
```

**`Stability`**

stable

___

### description

• `Optional` `Readonly` **description**: `string`

The description the this Lambda Layer.

**`Default`**

```ts
- No description.
```

**`Stability`**

stable

___

### layerVersionName

• `Optional` `Readonly` **layerVersionName**: `string`

The name of the layer.

**`Default`**

```ts
- A name will be generated.
```

**`Stability`**

stable

___

### license

• `Optional` `Readonly` **license**: `string`

The SPDX licence identifier or URL to the license file for this layer.

**`Default`**

```ts
- No license information will be recorded.
```

**`Stability`**

stable

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

Whether to retain this version of the layer when a new version is added or when the stack is deleted.

**`Default`**

```ts
RemovalPolicy.DESTROY
```

**`Stability`**

stable
