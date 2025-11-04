/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import { JsonPatch, awscdk, ReleasableCommits } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';
import { buildUpgradeMainPRCustomJob } from './projenrc/github-jobs';
import {
  buildMeritBadgerWorkflow,
  buildMonthlyIssuesMetricsWorkflow,
  buildAutoApproveWorkflow,
  buildOrtToolkitWorkflow,
  // runSemGrepWorkflow,
  runBanditWorkflow,
  runCommitLintWorkflow,
  buildCodeGenerationWorkflow,
} from './projenrc/github-workflows';

// Constants
const GITHUB_USER = 'awslabs';
const PUBLICATION_NAMESPACE = 'cdklabs';
const PROJECT_NAME = 'generative-ai-cdk-constructs';
const CDK_VERSION: string = '2.221.1';

function camelCaseIt(input: string): string {
  // Hypens and dashes to spaces and then CamelCase...
  return input
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, _) {
      if (+match === 0) return '';
      return match.toUpperCase();
    });
}

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services - Prototyping and Cloud Engineering',
  authorAddress: 'https://aws.amazon.com',
  authorOrganization: true,
  description:
    'AWS Generative AI CDK Constructs is a library for well-architected generative AI patterns.',
  cdkVersion: CDK_VERSION,
  projenVersion: '~0.98.4',
  constructsVersion: '10.3.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.9.0',
  name: '@' + PUBLICATION_NAMESPACE + '/' + PROJECT_NAME,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/' + GITHUB_USER + '/' + PROJECT_NAME,

  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  keywords: ['constructs', 'aws-cdk', 'generative-ai', 'emerging-tech'],
  devDeps: [
    '@commitlint/config-conventional',
    'commitlint',
    'eslint-plugin-license-header',
    'husky',
    'pinst',
    '@mrgrain/jsii-struct-builder',
    'typedoc',
    'typedoc-plugin-markdown',
    'aws-sdk-mock',
    '@aws-cdk/assert',
    `@aws-cdk/integ-tests-alpha@${CDK_VERSION}-alpha.0`,
    '@cdklabs/eslint-plugin',
    'eslint-plugin-jsdoc',
    'eslint-plugin-jest',
  ],
  deps: ['cdk-nag'],
  bundledDeps: ['deepmerge', `@aws-cdk/aws-lambda-python-alpha@${CDK_VERSION}-alpha.0`],
  // Keep synchronized with https://github.com/nodejs/release#release-schedule
  minNodeVersion: '20.x', // 'MAINTENANCE' (first LTS)
  maxNodeVersion: '24.x', // 'CURRENT'
  workflowNodeVersion: '22.x', // 'ACTIVE'

  npmTokenSecret: 'NPM_TOKEN',
  npmAccess: NpmAccess.PUBLIC,

  publishToPypi: {
    distName: PUBLICATION_NAMESPACE + '.' + PROJECT_NAME,
    module: PUBLICATION_NAMESPACE.replace(/-/g, '_') + '.' + PROJECT_NAME.replace(/-/g, '_'), // PEP 8, convert hypens
    // twineRegistryUrl: '${{ secrets.TWINE_REGISTRY_URL }}',
  },

  publishToNuget: {
    dotNetNamespace: camelCaseIt(PUBLICATION_NAMESPACE) + '.' + camelCaseIt(PROJECT_NAME),
    packageId: camelCaseIt(PUBLICATION_NAMESPACE) + '.' + camelCaseIt(PROJECT_NAME),
  },

  // TODO: JumpStartModel.java is over 64K skipping building Java distribution until resolved.
  // publishToMaven: {
  //   javaPackage: `io.github.${PUBLICATION_NAMESPACE.replace(/-/g, '_')}.${PROJECT_NAME.replace(/-/g, '_')}`,
  //   mavenGroupId: `io.github.${PUBLICATION_NAMESPACE}`,
  //   mavenArtifactId: PROJECT_NAME,
  //   mavenEndpoint: 'https://s01.oss.sonatype.org',
  // },

  publishToGo: {
    moduleName: `github.com/${PUBLICATION_NAMESPACE}/${PROJECT_NAME}-go`,
    packageName: PROJECT_NAME,
  },
  codeCov: true,
  codeCovTokenSecret: 'CODECOV_TOKEN',

  githubOptions: {
    pullRequestLintOptions: {
      contributorStatement:
        'By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of the project license.',
      contributorStatementOptions: {
        exemptUsers: [
          'amazon-auto',
          'dependabot[bot]',
          'emerging-tech-cdk-constructs-bot',
          'generative-ai-cdk-constructs-bot',
          'github-actions',
        ],
      },
    },
  },
  integrationTestAutoDiscover: true,
  docgen: false,
  licensed: true,
  license: 'Apache-2.0',
  copyrightPeriod: '2023',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  gitignore: [
    '*.DS_STORE',
    '!.node-version',
    '*.pyc',
    '__pycache__/',
    '!.ort.yml',
    '.idea',
    '.vscode',
    '.jsii.tabl.json',
  ],
  stability: 'experimental',
  sampleCode: false,
  stale: true,
  // To reduce the release frequency we only release features and fixes
  // This is important because PyPI has limits on the total storage amount used, and extensions need to be manually requested
  releasableCommits: ReleasableCommits.featuresAndFixes(),
  // If the release workflow fails for one of the package managers, we open a new GitHub issue
  releaseFailureIssue: true,
  releaseFailureIssueLabel: 'gh-workflow-failing',
});

// Add some useful github workflows
buildMeritBadgerWorkflow(project);
buildMonthlyIssuesMetricsWorkflow(project);
buildAutoApproveWorkflow(project);
buildOrtToolkitWorkflow(project);
// runSemGrepWorkflow(project);
runBanditWorkflow(project);
runCommitLintWorkflow(project);
buildCodeGenerationWorkflow(project);

const workflowUpgradeMain = project.github?.tryFindWorkflow('upgrade-main');
if (workflowUpgradeMain) {
  // upgrade the PR job to use the custom one adding a label
  workflowUpgradeMain.updateJob('pr', buildUpgradeMainPRCustomJob());
}

// Update Snapshots
project.upgradeWorkflow?.postUpgradeTask.spawn(project.tasks.tryFind('integ:snapshot-all')!);

// Add specific overrides https://projen.io/docs/integrations/github/#actions-versions
project.github?.actions.set(
  'actions/checkout@v3',
  'actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11',
); // https://github.com/projen/projen/issues/3529
project.github?.actions.set(
  'actions/checkout@v4',
  'actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11',
);
project.github?.actions.set(
  'actions/checkout@v5',
  'actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8',
);
project.github?.actions.set(
  'actions/download-artifact@v3',
  'actions/download-artifact@b4aefff88e83a2676a730654e1ce3dce61880379',
); // https://github.com/projen/projen/issues/3529
project.github?.actions.set(
  'actions/download-artifact@v4',
  'actions/download-artifact@b4aefff88e83a2676a730654e1ce3dce61880379',
);
project.github?.actions.set(
  'actions/download-artifact@v5',
  'actions/download-artifact@634f93cb2916e3fdff6788551b99b062d0335ce0',
);
project.github?.actions.set(
  'actions/github-script@v6',
  'actions/github-script@d7906e4ad0b1822421a7e6a35d5ca353c962f410',
);
project.github?.actions.set(
  'actions/github-script@v8',
  'actions/github-script@ed597411d8f924073f98dfc5c65a23a2325f34cd',
);
project.github?.actions.set(
  'actions/setup-dotnet@v3',
  'actions/setup-dotnet@4d6c8fcf3c8f7a60068d26b594648e99df24cee3',
);
project.github?.actions.set(
  'actions/setup-dotnet@v4',
  'actions/setup-dotnet@4d6c8fcf3c8f7a60068d26b594648e99df24cee3',
);
project.github?.actions.set(
  'actions/setup-go@v5',
  'actions/setup-go@0a12ed9d6a96ab950c8f026ed9f722fe0da7ef32',
);
project.github?.actions.set(
  'actions/setup-go@v6',
  'actions/setup-go@44694675825211faa026b3c33043df3e48a5fa00',
);
project.github?.actions.set(
  'actions/setup-node@v3',
  'actions/setup-node@60edb5dd545a775178f52524783378180af0d1f8',
); // https://github.com/projen/projen/issues/3529
project.github?.actions.set(
  'actions/setup-node@v4',
  'actions/setup-node@60edb5dd545a775178f52524783378180af0d1f8',
);
project.github?.actions.set(
  'actions/setup-node@v5',
  'actions/setup-node@a0853c24544627f65ddf259abe73b1d18a591444',
);
project.github?.actions.set(
  'actions/setup-python@v4',
  'actions/setup-python@82c7e631bb3cdc910f68e0081d67478d79c6982d',
); // https://github.com/projen/projen/issues/3529
project.github?.actions.set(
  'actions/setup-python@v5',
  'actions/setup-python@82c7e631bb3cdc910f68e0081d67478d79c6982d',
);
project.github?.actions.set(
  'actions/setup-python@v6',
  'actions/setup-python@e797f83bcb11b83ae66e0230d6156d7c80228e7c',
);
project.github?.actions.set(
  'actions/setup-java@v3',
  'actions/setup-java@99b8673ff64fbf99d8d325f52d9a5bdedb8483e9',
);
project.github?.actions.set(
  'actions/setup-java@v4',
  'actions/setup-java@99b8673ff64fbf99d8d325f52d9a5bdedb8483e9',
);
project.github?.actions.set(
  'actions/stale@v4',
  'actions/stale@a20b814fb01b71def3bd6f56e7494d667ddf28da',
);
project.github?.actions.set(
  'actions/stale@v10',
  'actions/stale@5f858e3efba33a5ca4407a664cc011ad407f2008',
);
project.github?.actions.set(
  'actions/upload-artifact@v3',
  'actions/upload-artifact@18bf333cd2249fbbbdb605fd9d9ed57efd7adf34',
); // https://github.com/projen/projen/issues/3529
project.github?.actions.set(
  'actions/upload-artifact@v4',
  'actions/upload-artifact@18bf333cd2249fbbbdb605fd9d9ed57efd7adf34',
);
project.github?.actions.set(
  'actions/upload-artifact@v4.4.0',
  'actions/upload-artifact@50769540e7f4bd5e21e526ee35c689e35e0d6874',
);
project.github?.actions.set(
  'actions/upload-artifact@v4.6.2',
  'actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02',
);
project.github?.actions.set(
  'amannn/action-semantic-pull-request@v5.0.2',
  'amannn/action-semantic-pull-request@01d5fd8a8ebb9aafe902c40c53f0f4744f7381eb',
);
project.github?.actions.set(
  'amannn/action-semantic-pull-request@v5.4.0',
  'amannn/action-semantic-pull-request@e9fabac35e210fea40ca5b14c0da95a099eff26f',
);
project.github?.actions.set(
  'amannn/action-semantic-pull-request@v6',
  'amannn/action-semantic-pull-request@04a8d177d951f6d3dff9f6fbfa336354c60a1112',
);
project.github?.actions.set(
  'aws-github-ops/github-merit-badger@main',
  'aws-github-ops/github-merit-badger@70d1c47f7051d6e324d4ddc48d676ba61ef69a3e',
);
project.github?.actions.set(
  'codecov/codecov-action@v3',
  'codecov/codecov-action@84508663e988701840491b86de86b666e8a86bed',
); // https://github.com/projen/projen/issues/3529
project.github?.actions.set(
  'codecov/codecov-action@v4',
  'codecov/codecov-action@84508663e988701840491b86de86b666e8a86bed',
);
project.github?.actions.set(
  'codecov/codecov-action@v5',
  'codecov/codecov-action@968872560f81e7bdde9272853e65f2507c0eca7c',
);
project.github?.actions.set(
  'github/issue-metrics@v2',
  'github/issue-metrics@6bc5254e72971dbb7462db077779f1643f772afd',
);
project.github?.actions.set(
  'hmarr/auto-approve-action@v4.0.0',
  'hmarr/auto-approve-action@f0939ea97e9205ef24d872e76833fa908a770363',
);
project.github?.actions.set(
  'minicli/action-contributors@v3.3',
  'minicli/action-contributors@20ec03af008cb51110a3137fbf77f59a4fd7ff5a',
);
project.github?.actions.set(
  'oss-review-toolkit/ort-ci-github-action@v1',
  'oss-review-toolkit/ort-ci-github-action@7f23c1f8d169dad430e41df223d3b8409c7a156e',
);
project.github?.actions.set(
  'peter-evans/create-issue-from-file@v4',
  'peter-evans/create-issue-from-file@433e51abf769039ee20ba1293a088ca19d573b7f',
);
project.github?.actions.set(
  'peter-evans/create-pull-request@v4',
  'peter-evans/create-pull-request@38e0b6e68b4c852a5500a94740f0e535e0d7ba54',
);
project.github?.actions.set(
  'peter-evans/create-pull-request@v5',
  'peter-evans/create-pull-request@153407881ec5c347639a548ade7d8ad1d6740e38',
);
project.github?.actions.set(
  'peter-evans/create-pull-request@v6',
  'peter-evans/create-pull-request@b1ddad2c994a25fbc81a28b3ec0e368bb2021c50',
);
project.github?.actions.set(
  'peter-evans/create-pull-request@v7',
  'peter-evans/create-pull-request@4320041ed380b20e97d388d56a7fb4f9b8c20e79',
);
project.github?.actions.set(
  'peter-evans/create-pull-request@v7.0.6',
  'peter-evans/create-pull-request@67ccf781d68cd99b580ae25a5c18a1cc84ffff1f',
);
project.github?.actions.set(
  'aws-actions/configure-aws-credentials@v4.0.2',
  'aws-actions/configure-aws-credentials@e3dd6a429d7300a6a4c196c26e071d42e0343502',
);
project.github?.actions.set(
  'imjohnbo/issue-bot@v3',
  'imjohnbo/issue-bot@3daae12aa54d38685d7ff8459fc8a2aee8cea98b',
);

// We don't want to package certain things
project.npmignore?.addPatterns(
  '/docs/',
  'header.js',
  '.gitattributes',
  '.eslintrc.json',
  '.gitattributes',
  '.github',
  '.gitignore',
  '.mergify.yml',
  '.node-version',
  '.npmignore',
  '.projen',
  '.projenrc.ts',
  'projenrc',
  'tsconfig.dev.json',
  'yarn.lock',
  '/apidocs/',
  'repolinter.json',
  'commitlint.config.js',
  '.ort.yml',
  '.husky',
);

project.eslint?.addPlugins('license-header', '@cdklabs/eslint-plugin', 'jsdoc', 'jest');
project.eslint?.addRules({
  'license-header/header': ['error', 'header.js'],
  '@cdklabs/no-core-construct': ['error'],
  '@cdklabs/invalid-cfn-imports': ['error'],
  '@cdklabs/no-literal-partition': ['error'],
  '@cdklabs/no-invalid-path': ['error'],
  '@cdklabs/promiseall-no-unbounded-parallelism': ['error'],

  // Error handling
  'no-throw-literal': ['error'],

  '@stylistic/indent': ['error', 2],

  // Style
  'quotes': ['error', 'single', { avoidEscape: true }],
  '@stylistic/member-delimiter-style': ['error'], // require semicolon delimiter
  '@stylistic/comma-dangle': ['error', 'always-multiline'], // ensures clean diffs, see https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8
  '@stylistic/no-extra-semi': ['error'], // no extra semicolons
  'comma-spacing': ['error', { before: false, after: true }], // space after, no space before
  'no-multi-spaces': ['error', { ignoreEOLComments: false }], // no multi spaces
  'array-bracket-spacing': ['error', 'never'], // [1, 2, 3]
  'array-bracket-newline': ['error', 'consistent'], // enforce consistent line breaks between brackets
  'object-curly-spacing': ['error', 'always'], // { key: 'value' }
  'object-curly-newline': ['error', { multiline: true, consistent: true }], // enforce consistent line breaks between braces
  'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }], // enforce "same line" or "multiple line" on object properties
  'keyword-spacing': ['error'], // require a space before & after keywords
  'brace-style': ['error', '1tbs', { allowSingleLine: true }], // enforce one true brace style
  'space-before-blocks': 'error', // require space before blocks
  'curly': ['error', 'multi-line', 'consistent'], // require curly braces for multiline control statements
  'eol-last': ['error', 'always'], // require a newline a the end of files
  '@stylistic/spaced-comment': ['error', 'always', { exceptions: ['/', '*'], markers: ['/'] }], // require a whitespace at the beginninng of each comment
  '@stylistic/padded-blocks': ['error', { classes: 'never', blocks: 'never', switches: 'never' }],
  // JSDoc
  'jsdoc/require-param-description': ['error'],
  'jsdoc/require-property-description': ['error'],
  'jsdoc/require-returns-description': ['error'],
  'jsdoc/check-alignment': ['error'],
  // Require all imported libraries actually resolve (!!required for import/no-extraneous-dependencies to work!!)
  'import/no-unresolved': ['error'],
  // Require an ordering on all imports
  'import/order': ['error', {
    groups: ['builtin', 'external'],
    alphabetize: { order: 'asc', caseInsensitive: true },
  }],
  // Cannot import from the same module twice
  'no-duplicate-imports': ['error'],

  // Cannot shadow names
  'no-shadow': ['off'],
  // Required spacing in property declarations (copied from TSLint, defaults are good)
  'key-spacing': ['error'],

  // Require semicolons
  'semi': ['error', 'always'],

  // Don't unnecessarily quote properties
  'quote-props': ['error', 'consistent-as-needed'],

  // No multiple empty lines
  'no-multiple-empty-lines': ['error', { max: 1 }],
  // Max line lengths
  'max-len': ['error', {
    code: 150,
    ignoreUrls: true, // Most common reason to disable it
    ignoreStrings: true, // These are not fantastic but necessary for error messages
    ignoreTemplateLiterals: true,
    ignoreComments: true,
    ignoreRegExpLiterals: true,
  }],
  // One of the easiest mistakes to make
  '@typescript-eslint/no-floating-promises': ['error'],

  // Make sure that inside try/catch blocks, promises are 'return await'ed
  // (must disable the base rule as it can report incorrect errors)
  'no-return-await': 'off',
  '@typescript-eslint/return-await': 'error',
  // Don't leave log statements littering the premises!
  'no-console': ['error'],

  // Useless diff results
  'no-trailing-spaces': ['error'],

  // Must use foo.bar instead of foo['bar'] if possible
  'dot-notation': ['error'],
  // Are you sure | is not a typo for || ?
  'no-bitwise': ['error'],
  // No more md5, will break in FIPS environments
  'no-restricted-syntax': [
    'error',
    {
      // Both qualified and unqualified calls
      selector: "CallExpression:matches([callee.name='createHash'], [callee.property.name='createHash']) Literal[value='md5']",
      message: 'Use the md5hash() function from the core library if you want md5',
    },
  ],
  // Member ordering
  '@typescript-eslint/member-ordering': ['error', {
    default: [
      'public-static-field',
      'public-static-method',
      'protected-static-field',
      'protected-static-method',
      'private-static-field',
      'private-static-method',

      'field',

      // Constructors
      'constructor', // = ["public-constructor", "protected-constructor", "private-constructor"]

      // Methods
      'method',
    ],
  }],
  // Too easy to make mistakes
  '@typescript-eslint/unbound-method': 'error',
  // Overrides for plugin:jest/recommended
  'jest/expect-expect': 'off',
  'jest/no-conditional-expect': 'off',
  'jest/no-done-callback': 'off', // Far too many of these in the codebase.
  'jest/no-standalone-expect': 'off', // nodeunitShim confuses this check.
  'jest/valid-expect': 'off', // expect from '@aws-cdk/assert' can take a second argument
  'jest/valid-title': 'off', // A little over-zealous with test('test foo') being an error.
  'jest/no-identical-title': 'off', // TEMPORARY - Disabling this until https://github.com/jest-community/eslint-plugin-jest/issues/836 is resolved
  'jest/no-disabled-tests': 'error', // Skipped tests are easily missed in PR reviews
  'jest/no-focused-tests': 'error', // Focused tests are easily missed in PR reviews
});

const packageJson = project.tryFindObjectFile('package.json');
packageJson?.patch(JsonPatch.add('/scripts/prepare', 'husky install')); // yarn 1
packageJson?.patch(JsonPatch.add('/scripts/postinstall', 'husky install')); // yarn 2
packageJson?.patch(JsonPatch.add('/scripts/prepack', 'pinst --disable'));
packageJson?.patch(JsonPatch.add('/scripts/postpack', 'pinst --enable'));

// Add generation of new available models for constructs
project.addTask('generate-models-containers', {
  description: 'Generate new list of models available from Jumpstart and DLC containers',
  steps: [
    {
      say: 'Synthesize project files',
      spawn: 'default',
    },
    {
      say: 'Compile',
      spawn: 'compile',
    },
    {
      say: 'Generate new list of models available from Jumpstart and DLC containers',
      cwd: project.srcdir + '/patterns/gen-ai/aws-model-deployment-sagemaker/code-generation',
      exec: 'npm run generate',
    },
    {
      say: 'Generate the new apidocs',
      spawn: 'post-compile',
    },
  ],
});

// Add verification of documentation examples as a new task
project.addTask('docs:compile', {
  description: 'Verify documentation examples are correctly compiled',
  steps: [
    {
      say: 'Synthesize project files',
      spawn: 'default',
    },
    {
      say: 'Pre-compile',
      spawn: 'pre-compile',
    },
    {
      say: 'Compile',
      spawn: 'compile',
    },
    {
      say: 'Verify documentation examples are correctly compiled',
      exec: 'jsii-rosetta extract --strict',
    },
  ],
});

const postCompile = project.tasks.tryFind('post-compile');
if (postCompile) {
  postCompile.exec(
    'npx typedoc --plugin typedoc-plugin-markdown --out apidocs --readme none --categoryOrder "Namespaces,Classes,Interfaces,*" --disableSources ./src/index.ts',
  );
}

// Add verification of documentation examples to the post-compile task
// (we cannot add it to the build task since it's locked. We add it to post-compile instead which
// is not locked and executed as part of the build task)
project.tasks.tryFind('post-compile')?.insertStep(1, {
  say: 'Verify documentation examples are correctly compiled',
  exec: 'jsii-rosetta extract --strict',
});

project.synth();
