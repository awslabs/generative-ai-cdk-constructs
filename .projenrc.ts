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

// Constants
const GITHUB_USER = 'aws-samples';
const PROJECT_NAME = 'emerging-tech-cdk-constructs';
const CDK_VERSION: string = '2.96.2';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services - Prototyping and Cloud Engineering',
  authorAddress: PROJECT_NAME+'@amazon.com',
  authorOrganization: true,
  cdkVersion: CDK_VERSION,
  projenVersion: '~0.73.28',
  constructsVersion: '10.0.5',
  cdkVersionPinning: true,
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: PROJECT_NAME,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/'+GITHUB_USER+'/'+PROJECT_NAME,

  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  packageName: '@'+GITHUB_USER+'/'+PROJECT_NAME, /* The "name" in package.json. */
  keywords: ['constructs', 'aws-cdk', 'generative-ai', 'emerging-tech'],
  devDeps: ['eslint-plugin-header'],
  //peerDeps: [],

  // Keep synchronized with https://github.com/nodejs/release#release-schedule
  minNodeVersion: '16.13.0', // 'MAINTENANCE' (first LTS)
  maxNodeVersion: '20.7.0', // 'CURRENT'
  workflowNodeVersion: '18.x', // 'ACTIVE'

  npmRegistryUrl: 'https://npm.pkg.github.com',
  npmTokenSecret: 'GITHUB_TOKEN',

  githubOptions: {
    pullRequestLintOptions: {
      contributorStatement: 'By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of the project license.',
      contributorStatementOptions: {
        exemptUsers: ['amazon-auto', 'dependabot[bot]', 'emerging-tech-cdk-constructs-bot', 'github-actions'],
      },
    },
  },
  docgen: false,
  licensed: true,
  license: 'Apache-2.0',
  copyrightPeriod: '2023-',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  gitignore: ['*.DS_STORE'],
  stability: 'experimental',
});

// Add License header automatically
project.eslint?.addPlugins('header');
project.eslint?.addRules({
  'header/header': [2, 'header.js'],
});

project.synth();