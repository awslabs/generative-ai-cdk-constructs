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
import { ProjenStruct, Struct } from '@mrgrain/jsii-struct-builder';
import { JsonPatch, awscdk } from 'projen';
import { DependabotScheduleInterval, VersioningStrategy } from 'projen/lib/github';
import { NpmAccess } from 'projen/lib/javascript';
import { buildUpgradeMainPRCustomJob } from './projenrc/github-jobs';
import {
  buildMeritBadgerWorkflow,
  buildMonthlyIssuesMetricsWorkflow,
  buildAutoApproveWorkflow,
  buildOrtToolkitWorkflow,
  runSemGrepWorkflow,
  runBanditWorkflow,
  runCommitLintWorkflow,
  buildCodeGenerationWorkflow,
} from './projenrc/github-workflows';

// Constants
const GITHUB_USER = 'awslabs';
const PUBLICATION_NAMESPACE = 'cdklabs';
const PROJECT_NAME = 'generative-ai-cdk-constructs';
const CDK_VERSION: string = '2.149.0';

function camelCaseIt(input: string): string {
  // Hypens and dashes to spaces and then CamelCase...
  return input.replace(/-/g, ' ').replace(/_/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, _) { if (+match === 0) return ''; return match.toUpperCase(); });
}

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services - Prototyping and Cloud Engineering',
  authorAddress: 'https://aws.amazon.com',
  authorOrganization: true,
  description: 'AWS Generative AI CDK Constructs is a library for well-architected generative AI patterns.',
  cdkVersion: CDK_VERSION,
  projenVersion: '~0.84.5',
  constructsVersion: '10.3.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.4.0',
  name: '@' + PUBLICATION_NAMESPACE + '/' + PROJECT_NAME,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/' + GITHUB_USER + '/' + PROJECT_NAME,

  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  keywords: ['constructs', 'aws-cdk', 'generative-ai', 'emerging-tech'],
  devDeps: [
    '@commitlint/config-conventional',
    'commitlint',
    'eslint-plugin-header',
    'husky',
    'pinst',
    '@mrgrain/jsii-struct-builder',
    'typedoc',
    'typedoc-plugin-markdown',
    'aws-sdk-mock',
    '@aws-cdk/assert',
    'esbuild',
  ],
  deps: [
    'cdk-nag',
  ],
  bundledDeps: [
    'deepmerge',
  ],
  // Keep synchronized with https://github.com/nodejs/release#release-schedule
  minNodeVersion: '18.12.0', // 'MAINTENANCE' (first LTS)
  maxNodeVersion: '20.x', // 'CURRENT'
  workflowNodeVersion: '20.x', // 'ACTIVE'

  npmTokenSecret: 'NPM_TOKEN',
  npmAccess: NpmAccess.PUBLIC,

  publishToPypi: {
    distName: PUBLICATION_NAMESPACE+'.'+PROJECT_NAME,
    module: (PUBLICATION_NAMESPACE.replace(/-/g, '_'))+'.'+(PROJECT_NAME.replace(/-/g, '_')), // PEP 8, convert hypens
    // twineRegistryUrl: '${{ secrets.TWINE_REGISTRY_URL }}',
  },

  publishToNuget: {
    dotNetNamespace: camelCaseIt(PUBLICATION_NAMESPACE)+'.'+camelCaseIt(PROJECT_NAME),
    packageId: camelCaseIt(PUBLICATION_NAMESPACE)+'.'+camelCaseIt(PROJECT_NAME),
  },

  publishToGo: {
    moduleName: `github.com/${PUBLICATION_NAMESPACE}/${PROJECT_NAME}-go`,
    packageName: PROJECT_NAME,
  },

  codeCov: true,
  codeCovTokenSecret: 'CODECOV_TOKEN',

  githubOptions: {
    pullRequestLintOptions: {
      contributorStatement: 'By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of the project license.',
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
  docgen: false,
  licensed: true,
  license: 'Apache-2.0',
  copyrightPeriod: '2023-',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  gitignore: [
    '*.DS_STORE',
    '!.node-version',
    '*.pyc',
    '__pycache__/',
    '!.ort.yml',
    '.idea',
    '.vscode',
  ],
  stability: 'experimental',
  sampleCode: false,
  stale: true,
});

// Add some useful github workflows
buildMeritBadgerWorkflow(project);
buildMonthlyIssuesMetricsWorkflow(project);
buildAutoApproveWorkflow(project);
buildOrtToolkitWorkflow(project);
runSemGrepWorkflow(project);
runBanditWorkflow(project);
runCommitLintWorkflow(project);
buildCodeGenerationWorkflow(project);

const workflowUpgradeMain = project.github?.tryFindWorkflow('upgrade-main');
if (workflowUpgradeMain) {
  // upgrade the PR job to use the custom one adding a label
  workflowUpgradeMain.updateJob('pr', buildUpgradeMainPRCustomJob());
}

// Add specific overrides https://projen.io/docs/integrations/github/#actions-versions
project.github?.actions.set('actions/checkout@v3', 'actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11'); // https://github.com/projen/projen/issues/3529
project.github?.actions.set('actions/checkout@v4', 'actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11');
project.github?.actions.set('actions/download-artifact@v3', 'actions/download-artifact@b4aefff88e83a2676a730654e1ce3dce61880379'); // https://github.com/projen/projen/issues/3529
project.github?.actions.set('actions/download-artifact@v4', 'actions/download-artifact@b4aefff88e83a2676a730654e1ce3dce61880379');
project.github?.actions.set('actions/github-script@v6', 'actions/github-script@d7906e4ad0b1822421a7e6a35d5ca353c962f410');
project.github?.actions.set('actions/setup-dotnet@v3', 'actions/setup-dotnet@4d6c8fcf3c8f7a60068d26b594648e99df24cee3');
project.github?.actions.set('actions/setup-dotnet@v4', 'actions/setup-dotnet@4d6c8fcf3c8f7a60068d26b594648e99df24cee3');
project.github?.actions.set('actions/setup-go@v5', 'actions/setup-go@0a12ed9d6a96ab950c8f026ed9f722fe0da7ef32');
project.github?.actions.set('actions/setup-node@v3', 'actions/setup-node@60edb5dd545a775178f52524783378180af0d1f8'); // https://github.com/projen/projen/issues/3529
project.github?.actions.set('actions/setup-node@v4', 'actions/setup-node@60edb5dd545a775178f52524783378180af0d1f8');
project.github?.actions.set('actions/setup-python@v4', 'actions/setup-python@82c7e631bb3cdc910f68e0081d67478d79c6982d'); // https://github.com/projen/projen/issues/3529
project.github?.actions.set('actions/setup-python@v5', 'actions/setup-python@82c7e631bb3cdc910f68e0081d67478d79c6982d');
project.github?.actions.set('actions/stale@v4', 'actions/stale@a20b814fb01b71def3bd6f56e7494d667ddf28da');
project.github?.actions.set('actions/upload-artifact@v3', 'actions/upload-artifact@18bf333cd2249fbbbdb605fd9d9ed57efd7adf34'); // https://github.com/projen/projen/issues/3529
project.github?.actions.set('actions/upload-artifact@v4', 'actions/upload-artifact@18bf333cd2249fbbbdb605fd9d9ed57efd7adf34');
project.github?.actions.set('amannn/action-semantic-pull-request@v5.0.2', 'amannn/action-semantic-pull-request@01d5fd8a8ebb9aafe902c40c53f0f4744f7381eb');
project.github?.actions.set('amannn/action-semantic-pull-request@v5.4.0', 'amannn/action-semantic-pull-request@e9fabac35e210fea40ca5b14c0da95a099eff26f');
project.github?.actions.set('aws-github-ops/github-merit-badger@main', 'aws-github-ops/github-merit-badger@70d1c47f7051d6e324d4ddc48d676ba61ef69a3e');
project.github?.actions.set('codecov/codecov-action@v3', 'codecov/codecov-action@84508663e988701840491b86de86b666e8a86bed'); // https://github.com/projen/projen/issues/3529
project.github?.actions.set('codecov/codecov-action@v4', 'codecov/codecov-action@84508663e988701840491b86de86b666e8a86bed');
project.github?.actions.set('github/issue-metrics@v2', 'github/issue-metrics@6bc5254e72971dbb7462db077779f1643f772afd');
project.github?.actions.set('hmarr/auto-approve-action@v4.0.0', 'hmarr/auto-approve-action@f0939ea97e9205ef24d872e76833fa908a770363');
project.github?.actions.set('minicli/action-contributors@v3.3', 'minicli/action-contributors@20ec03af008cb51110a3137fbf77f59a4fd7ff5a');
project.github?.actions.set('oss-review-toolkit/ort-ci-github-action@v1', 'oss-review-toolkit/ort-ci-github-action@7f23c1f8d169dad430e41df223d3b8409c7a156e');
project.github?.actions.set('peter-evans/create-issue-from-file@v4', 'peter-evans/create-issue-from-file@433e51abf769039ee20ba1293a088ca19d573b7f');
project.github?.actions.set('peter-evans/create-pull-request@v4', 'peter-evans/create-pull-request@38e0b6e68b4c852a5500a94740f0e535e0d7ba54');
project.github?.actions.set('peter-evans/create-pull-request@v5', 'peter-evans/create-pull-request@153407881ec5c347639a548ade7d8ad1d6740e38');
project.github?.actions.set('peter-evans/create-pull-request@v6', 'peter-evans/create-pull-request@b1ddad2c994a25fbc81a28b3ec0e368bb2021c50');
project.github?.actions.set('aws-actions/configure-aws-credentials@v4.0.2', 'aws-actions/configure-aws-credentials@e3dd6a429d7300a6a4c196c26e071d42e0343502');

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

// Add License header automatically
project.eslint?.addPlugins('header');
project.eslint?.addRules({
  'header/header': [2, 'header.js'],
});

project.eslint?.addIgnorePattern('LangchainProps.ts');
project.eslint?.addIgnorePattern('AdapterProps.ts');
project.eslint?.addIgnorePattern('DockerLambdaCustomProps.ts');

// Shared interfaces extending pre-existing CDK interfaces
new ProjenStruct(project, { name: 'LangchainProps', filePath: 'src/common/props/LangchainProps.ts' })
  .mixin(Struct.fromFqn('aws-cdk-lib.aws_lambda.LayerVersionProps'))
  .withoutDeprecated()
  .omit('code', 'compatibleRuntimes', 'compatibleArchitectures');

new ProjenStruct(project, { name: 'DockerLambdaCustomProps', filePath: 'src/common/props/DockerLambdaCustomProps.ts' })
  .mixin(Struct.fromFqn('aws-cdk-lib.aws_lambda.DockerImageFunctionProps'))
  .withoutDeprecated()
  .omit('tracing', 'functionName', 'description', 'role', 'vpc', 'vpcSubnets', 'securityGroups', 'role', 'layers', 'allowPublicSubnet', 'allowAllOutbound');

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
      cwd: project.srcdir+'/patterns/gen-ai/aws-model-deployment-sagemaker/code-generation',
      exec: 'npm run generate',
    },
    {
      say: 'Generate the new apidocs',
      spawn: 'post-compile',
    },
  ],
});

const postCompile = project.tasks.tryFind('post-compile');
if (postCompile) {
  postCompile.exec('npx typedoc --plugin typedoc-plugin-markdown --out apidocs --readme none --categoryOrder "Namespaces,Classes,Interfaces,*" --disableSources ./src/index.ts');
}

project.github?.addDependabot({
  versioningStrategy: VersioningStrategy.LOCKFILE_ONLY,
  ignoreProjen: false,
  scheduleInterval: DependabotScheduleInterval.WEEKLY,
  groups: {
    ['dev-dependencies']: {
      patterns: ['*'],
    },
  },
  labels: ['auto-approve'],
});

project.synth();
