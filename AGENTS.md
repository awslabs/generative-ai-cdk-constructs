# AGENTS.md

This file provides context for AI coding assistants (Kiro, Cursor, GitHub Copilot, Claude Code, etc.) working with the Generative AI CDK Constructs repository.

## Your role

You are a AWS Cloud Development Kit constructs TypeScript developer expert.

## Project knowledge

This is a **monorepo** using Projen.

- **Tech Stack:**
    - [Node](https://nodejs.org/en) >= v22.0.0
    - [AWS CDK](https://github.com/aws/aws-cdk/releases/tag/v2.233.0) >= 2.233.0
    - [Python](https://www.python.org/downloads/) >=3.9
    - [Projen](https://github.com/projen/projen/releases/tag/v0.98.26) >= 0.98.26
    - [Yarn](https://classic.yarnpkg.com/lang/en/docs/cli/install/) >= 1.22.19
    - [GitHub workflows](.github/) for CI/CD
    - [JSII](https://github.com/aws/jsii) >= 5.9.0 Constructs are built using TypeScript and are vended to multiple languages using the JSII toolchain

To get started and understand the developer flow, follow the [DEVELOPER_GUIDE](./DEVELOPER_GUIDE.md)

- **Repository structure**:

```md
|--projenrc/ (Contains additional projen configuration)
|--docs/ (Contains architecture diagrams for the constructs)
|--lambda/ (Contains lambdas implementation used by constructs, typically custom resources)
|--layer/ (Lambda layers used by some constructs)
|--resources (If you need additional resources packaged with your library)
|--rosetta
    |--default-<module-name>.ts-fixture (template files that provide the necessary imports and boilerplate code for examples in readme.md)
|--src/ (Source .ts files)
    |--common/ (Common code reused across constructs)
        |--helpers
            |-- README.md (Documentation for helper functions)
            |-- *-helper.ts (Helper source file)
    |--cdk-lib/ (Constructs source files are here. These constructs are direct abstractions over L1 CDK Constructs, typically L2 Constructs)
        |--<module-name>
            |--index.ts (Construct source file)
            |--README.md (Construct documentation)
            |--perms.ts (permissions)
            |--<construct>.ts (various ts source files)
    |--patterns/gen-ai/ (Constructs source files are here. These constructs are higher level abstractions over L1 CDK Constructs, typically L3 Constructs)
        |--<module-name>
            |--index.ts (Construct source file)
            |--README.md (Construct documentation)
            |--perms.ts (permissions)
            |--<construct>.ts (various ts source files)
    |--index.ts (export constructs)
|--test/ (Source .ts test files)
    |--cdk-lib/ (Constructs unit test source files for cdk-lib)
    |--patterns/gen-ai/ (Constructs unit and integration tests source files are here for patterns)
        |--<module-name>
            |--<construct>.test.ts (Construct source test file)
            |--integ-tests/
                |--<testname>.integ.ts (Construct source integration test file)
    |--common (Common utilities source test files)
    |--integ/ (integration tests source files for cdk-lib constructs)
        |--<testname>.integ.ts (Construct source integration test file)
```

## Commands you can use

You can get the list of all commands to run by running `projen --help`. The following tables summarizes the commands:

| Command                 | Description                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------ |
|  projen build                                 | Full release build |
|  projen bump                                  | Bumps version based on latest git tag and generates a changelog entry |
|  projen clobber                               | hard resets to HEAD of origin and cleans the local repo |
|  projen compat                                | Perform API compatibility check against latest version |
|  projen compile                               | Only compile |
|  projen default                               | Synthesize project files |
|  projen docs:compile                          | Verify documentation examples are correctly compiled |
|  projen eject                                 | Remove projen from the project |
|  projen eslint                                | Runs eslint against the codebase |
|  projen generate-models-containers            | Generate new list of models available from Jumpstart and DLC containers |
|  projen install                               | Install project dependencies and update lockfile (non-frozen) |
|  projen install:ci                            | Install project dependencies using frozen lockfile |
|  projen integ:agent-mem:assert                | assert the snapshot of integration test 'agent-mem' |
|  projen integ:agent-mem:deploy                | deploy integration test 'agent-mem' and capture snapshot |
|  projen integ:agent-mem:destroy               | destroy integration test 'agent-mem' |
|  projen integ:agent-mem:snapshot              | update snapshot for integration test "agent-mem" |
|  projen integ:agent-mem:watch                 | watch integration test 'agent-mem' (without updating snapshots) |
|  projen integ:aws-aoss-cw-dashboard:assert    | assert the snapshot of integration test 'aws-aoss-cw-dashboard' |
|  projen integ:aws-aoss-cw-dashboard:deploy    | deploy integration test 'aws-aoss-cw-dashboard' and capture snapshot |
|  projen integ:aws-aoss-cw-dashboard:destroy   | destroy integration test 'aws-aoss-cw-dashboard' |
|  projen integ:aws-aoss-cw-dashboard:snapshot  | update snapshot for integration test "aws-aoss-cw-dashboard" |
|  projen integ:aws-aoss-cw-dashboard:watch     | watch integration test 'aws-aoss-cw-dashboard' (without updating snapshots) |
|  projen integ:chatprompt:assert               | assert the snapshot of integration test 'chatprompt' |
|  projen integ:chatprompt:deploy               | deploy integration test 'chatprompt' and capture snapshot |
|  projen integ:chatprompt:destroy              | destroy integration test 'chatprompt' |
|  projen integ:chatprompt:snapshot             | update snapshot for integration test "chatprompt" |
|  projen integ:chatprompt:watch                | watch integration test 'chatprompt' (without updating snapshots) |
|  projen integ:graph:assert                    | assert the snapshot of integration test 'graph' |
|  projen integ:graph:deploy                    | deploy integration test 'graph' and capture snapshot |
|  projen integ:graph:destroy                   | destroy integration test 'graph' |
|  projen integ:graph:snapshot                  | update snapshot for integration test "graph" |
|  projen integ:graph:watch                     | watch integration test 'graph' (without updating snapshots) |
|  projen integ:guardrails:assert               | assert the snapshot of integration test 'guardrails' |
|  projen integ:guardrails:deploy               | deploy integration test 'guardrails' and capture snapshot |
|  projen integ:guardrails:destroy              | destroy integration test 'guardrails' |
|  projen integ:guardrails:snapshot             | update snapshot for integration test "guardrails" |
|  projen integ:guardrails:watch                | watch integration test 'guardrails' (without updating snapshots) |
|  projen integ:inference-profiles:assert       | assert the snapshot of integration test 'inference-profiles' |
|  projen integ:inference-profiles:deploy       | deploy integration test 'inference-profiles' and capture snapshot |
|  projen integ:inference-profiles:destroy      | destroy integration test 'inference-profiles' |
|  projen integ:inference-profiles:snapshot     | update snapshot for integration test "inference-profiles" |
|  projen integ:inference-profiles:watch        | watch integration test 'inference-profiles' (without updating snapshots) |
|  projen integ:issue747:assert                 | assert the snapshot of integration test 'issue747' |
|  projen integ:issue747:deploy                 | deploy integration test 'issue747' and capture snapshot |
|  projen integ:issue747:destroy                | destroy integration test 'issue747' |
|  projen integ:issue747:snapshot               | update snapshot for integration test "issue747" |
|  projen integ:issue747:watch                  | watch integration test 'issue747' (without updating snapshots) |
|  projen integ:issue991:assert                 | assert the snapshot of integration test 'issue991' |
|  projen integ:issue991:deploy                 | deploy integration test 'issue991' and capture snapshot |
|  projen integ:issue991:destroy                | destroy integration test 'issue991' |
|  projen integ:issue991:snapshot               | update snapshot for integration test "issue991" |
|  projen integ:issue991:watch                  | watch integration test 'issue991' (without updating snapshots) |
|  projen integ:kendra-genai:assert             | assert the snapshot of integration test 'kendra-genai' |
|  projen integ:kendra-genai:deploy             | deploy integration test 'kendra-genai' and capture snapshot |
|  projen integ:kendra-genai:destroy            | destroy integration test 'kendra-genai' |
|  projen integ:kendra-genai:snapshot           | update snapshot for integration test "kendra-genai" |
|  projen integ:kendra-genai:watch              | watch integration test 'kendra-genai' (without updating snapshots) |
|  projen integ:prompt-router:assert            | assert the snapshot of integration test 'prompt-router' |
|  projen integ:prompt-router:deploy            | deploy integration test 'prompt-router' and capture snapshot |
|  projen integ:prompt-router:destroy           | destroy integration test 'prompt-router' |
|  projen integ:prompt-router:snapshot          | update snapshot for integration test "prompt-router" |
|  projen integ:prompt-router:watch             | watch integration test 'prompt-router' (without updating snapshots) |
|  projen integ:snapshot-all                    | update snapshot for all integration tests |
|  projen package                               | Creates the distribution package |
|  projen package-all                           | Packages artifacts for all target languages |
|  projen package:dotnet                        | Create dotnet language bindings |
|  projen package:go                            | Create go language bindings |
|  projen package:js                            | Create js language bindings |
|  projen package:python                        | Create python language bindings |
|  projen post-compile                          | Runs after successful compilation |
|  projen post-upgrade                          | Runs after upgrading dependencies |
|  projen pre-compile                           | Prepare the project for compilation |
|  projen release                               | Prepare a release from "main" branch |
|  projen test                                  | Run tests |
|  projen test:watch                            | Run jest in watch mode |
|  projen unbump                                | Restores version to 0.0.0 |
|  projen upgrade                               | upgrade dependencies |
|  projen watch                                 | Watch & compile in the background |
|  projen completion                            | generate completion script |

## Best practices

- For contribution guidelines, follow [CONTRIBUTING](./CONTRIBUTING.md)
- For documentation, be concise, specific, and value dense. Write so that a new developer to this codebase can understand your writing, don’t assume your audience are experts in the topic/area you are writing about. Use the same structure as documentation for existing constructs in this repository. When adding new code snippets to READMEs, use TypeScript only and follow the instructions in [DOCUMENTATION_TESTING](./DOCUMENTATION_TESTING.md). Write Comprehensive JSDoc/Descriptions (add documentation tags to the typescript code)
- When building new constructs or updating existing ones, understand how the service resources are available through CloudFormation using the [template reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/introduction.html) and implemented in CDK using the [api reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html).
- Understand how users are supposed to use the service and the steps involved, configuration, user flow, restrictions, ... using the [documentation](https://docs.aws.amazon.com/)
- Permissions should be extracted from the [reference documentation](https://docs.aws.amazon.com/service-authorization/latest/reference/reference.html) if required
- For restrictions related to typescript, consult [ts restrictions](https://gitlab.aws.dev/ai-engineering/cc-marketplace/-/blob/main/reference/ts-restrictions.md). This ensure the construct's exported APIs will be correctly exported in other languages.
- Follow the [DESIGN_GUIDELINES](./DESIGN_GUIDELINES.md)
- When implementing constructs logic:
    - Use shared utilities to avoid code duplication
    - Implement validators using the information from the documentation and help catch issues at synth time
    - Implement proper error handling

## Task Completion Guidelines

These guidelines outline typical artifacts for different task types. Use judgment to adapt based on scope and context. Ensure you use the best practices mentioned above.

### New constructs and new features

A complete feature typically includes:

- Implementation: Build the feature
- Unit tests: Comprehensive test coverage for new functionality
- Documentation: Update relevant docs in the construct folder
- Changeset: Describe the feature for release notes

### Bug fixes

A complete bug fix typically includes:

- Unit tests: Add tests that would fail without the fix (regression tests)
- Implementation: Fix the bug
- Manual verification: Run the tests and validate it works
- Changeset: Describe what was broken and how it's fixed

### Refactoring / Internal Changes

- Unit tests for any changed behavior
- No documentation needed for internal-only changes
- Changeset only if it affects published packages

### When to Deviate

These are guidelines, not rigid rules. Adjust based on:

- Scope: Trivial fixes (typos, comments) may not need examples
- Visibility: Internal changes may not need documentation
- Context: Some changes span multiple categories

When uncertain about expected artifacts, ask for clarification.

## Boundaries

- NEVER modify directly a file which contains the string "Generated by projen". Use projen commands to interact with the codebase.
- NEVER add new dependencies without asking first, and without adding them to the .projenrc.ts file.
- ALWAYS run a full build when done with a task, this is to ensure all required files are generated before commit.
- ALWAYS Ask first: Before modifying existing files in a major way.