# Documentation Guide

This guide explains how to maintain and verify documentation for the AWS Generative AI CDK Constructs library.

## Overview

This project uses [jsii-rosetta](https://github.com/aws/jsii/tree/main/packages/jsii-rosetta) to ensure that all code examples in the documentation are syntactically correct and can be compiled. This prevents common issues where documentation examples become outdated or contain errors.

## How It Works

This library uses [jsii](https://aws.github.io/jsii/) make it polyglot. jsii allows code in any language to naturally interact with JavaScript classes. It is the technology that enables the AWS Cloud Development Kit to deliver polyglot libraries from a single codebase, like this one. A class library written in TypeScript can be used in projects authored in TypeScript or Javascript (as usual), but also in Python, Java, C# (and other languages from the .NET family), ...

jsii first compiles the code written in Typescript using the standard typescript compiler (tsc) to produce the Javascript code. It then generates an [assembly file (.jsii)](https://aws.github.io/jsii/user-guides/language-support/assembly/), which is a JSON-formatted document. This file contains a lot of information about the constructs, their fields, methods and the documentation.

jsii is a toolchain with multiple tools:

- jsii-rosetta that transliterates code snippets (in docs) from TypeScript to target languages. We’ll come back to this one.
- jsii-packmack generates libraries in different programming languages.
- jsii-docgen generates the API.md file
and more. All the tools are described in the [documentation](https://aws.github.io/jsii/overview/toolchain/)

Specifically around the documentation, jsii-rosetta will use the generated assemble file (.jsii) to extract all the examples, compile them and transliterate (translate) them in all languages. If the compilation succeed, it will generate a tablet file (named .jsii.tabl.json) that will contain all the code snippets from your project in all languages.

### 1. Rosetta Fixtures

Rosetta fixtures are template files that provide the necessary imports and boilerplate code for examples. They are located in the `rosetta/` directory:

- `default.ts-fixture`: Default template for most examples

### 2. README Integration

The README.md file uses special keywords to reference example files:

```markdown
typescript fixture=default
```

You can reference any fixture located in the fixture folder.

## Adding New Examples

### Step 1: Fixture

Update the existing fixture file in the rosetta folder, or create a new one for your use case.

### Step 2: Update the README

References your fixture in the code snippet definition:

```markdown
typescript fixture=default
```

### Step 3: Test the Example

Run the documentation verification:

```bash
yarn docs:compile
```

This will:

1. Compile the TypeScript code
2. Extract and verify all examples using jsii-rosetta
3. Fail if any examples have compilation errors

This step will also run as part of the full build (projen build).

## Best Practices

### 1. Keep Examples Simple

Examples should demonstrate the most common use case for a construct. Complex scenarios can be documented separately.

### 2. Use Appropriate Fixtures

Choose the fixture that best matches your example:

- Use `default.ts-fixture` for basic examples
- Use specific fixtures (e.g., `special.ts-fixture`) for domain-specific examples

### 4. Test Examples Regularly

Run `projen docs:compile` before committing changes to ensure all examples compile correctly.

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure all necessary imports are included in your fixture file
2. **Compilation Errors**: Check that your example code is syntactically correct
3. **Missing Fixtures**: Create appropriate fixture files for new domains

### Getting Help

If you encounter issues with documentation verification:

1. Check the jsii-rosetta documentation: https://github.com/aws/jsii/tree/main/packages/jsii-rosetta
2. Review the fixture files in the `rosetta/` directory
