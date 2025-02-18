# Contributing Guidelines

Thank you for your interest in contributing to our project. Whether it's a bug report, new feature, correction, or additional
documentation, we greatly value feedback and contributions from our community.

Please read through this document before submitting any issues or pull requests to ensure we have all the necessary
information to effectively respond to your bug report or contribution.

## Reporting Bugs/Feature Requests

We welcome you to use the GitHub issue tracker to report bugs or suggest features.

When filing an issue, please check [existing open](https://github.com/awslabs/generative-ai-cdk-constructs/issues), or [recently closed](https://github.com/awslabs/generative-ai-cdk-constructs/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aclosed%20), issues to make sure somebody else hasn't already reported the issue. Please try to include as much information as you can. Details like these are incredibly useful:

* A reproducible test case or series of steps
* The version of our code being used
* Any modifications you've made relevant to the bug
* Anything unusual about your environment or deployment


## Contributing via Pull  Requests

### Pull Request Checklist

* [ ] Testing
  - Unit test added (prefer not to modify an existing test, otherwise, it's probably a breaking change)
  - Integration test added (if adding a new pattern or making a significant update to an existing pattern)
* [ ] Docs
  - __README__: README and/or documentation topic updated
  - __Design__: For significant features, design document added to `design` folder
* [ ] Title and Description
  - __Change type__: title prefixed with **fix**, **feat** or **chore** and module name in parenthesis, which will appear in changelog
  - __Title__: use lower-case and doesn't end with a period
  - __Breaking?__: last paragraph: "BREAKING CHANGE: <describe what changed + link for details>"
  - __Issues__: Indicate issues fixed via: "**Fixes #xxx**" or "**Closes #xxx**"

---

Projen is opinionated and mandates that all project configuration be done through the .projenrc.ts file. For instance if you directly change package.json then Projen will detect that during the release phase and will fail the release attempt. Hence, it is a good idea to do projen synth by running the projen command on the constructs/ directory where the .projenrc.ts file is before pushing the code to our repository.

### Step 1: Open Issue

If there isn't one already, open an issue describing what you intend to contribute. It's useful to communicate in advance, because sometimes, someone is already working in this space, so maybe it's worth collaborating with them instead of duplicating the efforts.

### Step 2: Design

If you are proposing a new AWS Generative AI CDK Construct, the best way to do this is create the full README.md document for the construct in advance (defining all interfaces, the minimal deployment scenario, the architecture diagram, etc.). This will give us all the information we need to provide feedback and the document will live on as documentation (saving you that effort labor). You will want to follow our [design guidelines](./DESIGN_GUIDELINES.md).

Once the design is finalized, you can re-purpose this PR for the implementation, or open a new PR to that end.

Good AWS Generative AI CDK Constructs have the following characteristics:
  1) Configurable Business Logic: AWS Generative AI CDK Constructs should be applicable to all businesses and workloads as much as possible so that they are easily reusable.
  2) Reusable across multiple use-cases: We would rather have a small library of constructs that are wildly popular with customers rather than a huge library of constructs that customers find irrelevant.
  3) Well Architected: AWS Generative AI CDK Constructs should be secure, reliable, scalable, and cost efficient.
  4) They simplify complex service configurations while maintaining security and cost controls by default.
  5) They provide clear, predictable interfaces focused on business outcomes rather than technical implementation details.
  6) They integrate seamlessly with existing AWS services and follow established deployment patterns and best practices.

### Step 3: Work your Magic

Now it's time to work your magic. Here are some guidelines:

* Coding style (abbreviated):
  * In general, follow the style of the code around you. The linter will run on every PR and modify files.
* Every change requires a unit test
* If you change APIs, make sure to update the module's README file
* Try to maintain a single feature/bugfix per pull request. It's okay to introduce a little bit of housekeeping
   changes along the way, but try to avoid conflating multiple features. Eventually all these are going to go into a
   single commit, so you can use that to frame your scope.
* If your change introduces a new construct, take a look at our [example construct](./src/cdk-lib/bedrock/) for an overview of existing code.
  Feel free to start your contribution by copy&pasting files from that project,
  and then edit and rename them as appropriate -
  it might be easier to get started that way.

#### Integration Tests

If you are working on a new feature that is using previously unused CloudFormation resource types, or involves
configuring resource types across services, you need to write integration tests that use these resource types or
features.

To the extent possible, include a section (like below) in the integration test file that specifies how the successfully
deployed stack can be verified for correctness. Correctness here implies that the resources have been set up correctly.
The steps here are usually AWS CLI commands but they need not be.

```ts
/*
 * Stack verification steps:
 * * <step-1>
 * * <step-2>
 */
```

### Step 4: Commit

Create a commit with the proposed changes:

* Commit title and message (and PR title and description) must adhere to [Conventional Commits](https://www.conventionalcommits.org).
  * The title must begin with `feat(module): title`, `fix(module): title` or `chore(module): title`.
  * Title should be lowercase.
  * No period at the end of the title.

* Commit message should describe _motivation_. Think about your code reviewers and what information they need in
  order to understand what you did. If it's a big commit (hopefully not), try to provide some good entry points so
  it will be easier to follow.

* Commit message should indicate which issues are fixed: `fixes #<issue>` or `closes #<issue>`.

* Shout out to collaborators.

* If not obvious (i.e. from unit tests), describe how you verified that your change works.

* If this commit includes breaking changes, they must be listed at the end in the following format (notice how multiple breaking changes should be formatted):

```
BREAKING CHANGE: Description of what broke and how to achieve this behavior now
* **module-name:** Another breaking change
* **module-name:** Yet another breaking change
```

### Step 5: Pull Request

* Push to a GitHub fork
* Submit a Pull Requests on GitHub.
* Please follow the PR checklist written above. We trust our contributors to self-check, and this helps that process!
* Discuss review comments and iterate until you get at least one “Approve”. When iterating, push new commits to the
  same branch. Usually all these are going to be squashed when you merge to main. The commit messages should be hints
  for you when you finalize your merge commit message.
* Make sure to update the PR title/description if things change. The PR title/description are going to be used as the
  commit title/message and will appear in the CHANGELOG, so maintain them all the way throughout the process.
* Make sure your PR builds successfully (we have GitHub actions setup to automatically build all PRs)

#### Build steps

- The Build workflow - controlled by the buildWorkflow field. On a ‘pull_request’ or ‘workflow_dispatch’ the library will be built and checked for anti-tamper (ensure no manual changes to generated files).
- The Release workflow - controlled by the releaseWorkflow field. On a push to main (overridden at props.defaultReleaseBranch) the library is built, anti-tampered, version bumped with a commit, pushed back to git, and then published to the configured artifact repositories (e.g. npm, pypi).

Every commit to the default (main) branch marked as feat or fix will trigger a new version release (trunk-based development). This includes the following steps:

- Compile, lint and test the code.
- Use JSII to produce library artifacts for all target languages.
- Determine the next minor/patch version based on [Conventional Commits](https://www.conventionalcommits.org). Major versions must be explicitly bumped to protect consumers against breaking changes.
- A changelog entry is generated based on commit history.
Packages are published to all target package managers.

> **Warning**
> Projen synthesizes files that are part of your source repository. This means that when you change you projenrc file, and execute projen, other files in your repo may change as a result.
> Make sure to push those modified files as well. Otherwise, the self mutation step of the build will fail. This is to ensure that a pull request branch always represent the final state of the repository

### Step 6: Merge

* Once approved and tested, a maintainer will squash-merge to main and will use your PR title/description as the
  commit message.

Projen automatically performs semantic versioning based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

For example:

- fix: bump PATCH version (v0.0.1)
- feat: bump MINOR version (v0.1.0)

MAJOR version must be explicitly bumped by adding majorVersion: x to .projenrc.ts to protect users from critical changes.

GitHub provides additional document on [forking a repository](https://help.github.com/articles/fork-a-repo/) and
[creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## Code of Conduct
This project has adopted the [Amazon Open Source Code of Conduct](https://aws.github.io/code-of-conduct).
For more information see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq) or contact
opensource-codeofconduct@amazon.com with any additional questions or comments.


## Security issue notifications
If you discover a potential security issue in this project we ask that you notify AWS/Amazon Security via our [vulnerability reporting page](http://aws.amazon.com/security/vulnerability-reporting/). Please do **not** create a public github issue.


## Licensing

See the [LICENSE](https://github.com/awslabs/generative-ai-cdk-constructs/blob/main/LICENSE) file for our project's licensing. We will ask you to confirm the licensing of your contribution.

We may ask you to sign a [Contributor License Agreement (CLA)](http://en.wikipedia.org/wiki/Contributor_License_Agreement) for larger changes.

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
