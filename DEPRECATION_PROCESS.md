# Deprecation process

## Path 1: Graduation to AWS CDK Core

In some cases, if an existing construct meets criteria and graduates to the AWS CDK core library, the following deprecation process is applied:

- Mark the construct as deprecated in code using annotation. For instance, in the construct constructor, add:
```
Annotations.of(scope).addWarningV2('@cdklabs/generative-ai-cdk-constructs:NAME_OF_THE_CONSTRUCT.deprecation',
      'This construct is deprecated and will not receive further support besides critical bug fixes. It will be removed on DATE. Please follow the documentation to migrate.');
```
- Update the construct's documentation with notice of graduation and link to the new CDK core construct
- Expected end-of-support date (typically 6 months)
- Create a migration guide that includes:
    - Step-by-step migration instructions
    - Code examples for both old and new implementations
    - Breaking changes and new features
    - Maintain critical bug fixes only until end-of-support date

## Path 2: Low Adoption Deprecation

For constructs with consistently low adoption:

- The core team reviews usage metrics over 3-month period
- If usage remains below threshold, mark construct as deprecated in code. For instance, in the construct constructor:
```
Annotations.of(scope).addWarningV2('@cdklabs/generative-ai-cdk-constructs:NAME_OF_THE_CONSTRUCT.deprecation',
      'This construct is deprecated and will not receive further support besides critical bug fixes. It will be removed on DATE. Please refer to the documentation for additional information.');
```
- Document rationale for deprecation
- Add sunset period: usually 3 month period
- Suggest alternative approaches or constructs

After sunset period, remove the code from the library and release a new version.

## For both paths:

- Deprecation will be announced in CHANGELOG, in the specific construct README and in the construct code
- A GitHub issue will be created for tracking
- Notification via release notes and discussions