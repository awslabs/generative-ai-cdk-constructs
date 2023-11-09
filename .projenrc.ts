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
import { awscdk } from 'projen';
import {
  buildMeritBadgerWorkflow,
  buildMonthlyIssuesMetricsWorkflow,
  buildUpdateContributorsWorkflow,
  buildAutoApproveWorkflow,
  buildOrtToolkitWorkflow,
  runSemGrepWorkflow,
} from './projenrc/github-workflows';

// Constants
const GITHUB_USER = 'awslabs';
const PUBLICATION_NAMESPACE = 'awscdk';
const PROJECT_NAME = 'generative-ai-cdk-constructs';
const CDK_VERSION: string = '2.103.1';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services - Prototyping and Cloud Engineering',
  authorAddress: PROJECT_NAME + '@amazon.com',
  authorOrganization: true,
  cdkVersion: CDK_VERSION,
  projenVersion: '~0.73.33',
  constructsVersion: '10.3.0',
  cdkVersionPinning: true,
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: PROJECT_NAME,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/' + GITHUB_USER + '/' + PROJECT_NAME,

  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  packageName: '@' + PUBLICATION_NAMESPACE + '/' + PROJECT_NAME, /* The "name" in package.json. */
  keywords: ['constructs', 'aws-cdk', 'generative-ai', 'emerging-tech'],
  devDeps: ['eslint-plugin-header'],
  //bundledDeps: ['deepmerge', '@types/deep-diff', '@types/npmlog'],

  // Keep synchronized with https://github.com/nodejs/release#release-schedule
  minNodeVersion: '18.12.0', // 'MAINTENANCE' (first LTS)
  maxNodeVersion: '20.x', // 'CURRENT'
  workflowNodeVersion: '20.x', // 'ACTIVE'

  npmRegistryUrl: 'https://npm.pkg.github.com',
  npmTokenSecret: 'GITHUB_TOKEN',

  publishToPypi: {
    distName: PROJECT_NAME,
    module: PROJECT_NAME.replace(/-/g, '_'), // PEP 8, convert hypens
    twineRegistryUrl: '${{ secrets.TWINE_REGISTRY_URL }}',
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
  gitignore: ['*.DS_STORE', '!.node-version', '*.pyc', '__pycache__/', '!.ort.yml'],
  stability: 'experimental',
  sampleCode: false,
  stale: true,
});
// Add some useful github workflows
buildMeritBadgerWorkflow(project);
buildMonthlyIssuesMetricsWorkflow(project);
buildUpdateContributorsWorkflow(project);
buildAutoApproveWorkflow(project);
buildOrtToolkitWorkflow(project);
runSemGrepWorkflow(project);

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
);

// Add License header automatically
project.eslint?.addPlugins('header');
project.eslint?.addRules({
  'header/header': [2, 'header.js'],
});


project.synth();