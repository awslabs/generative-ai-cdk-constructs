import { awscdk } from 'projen';

const gitHubUser = 'scottschreckengaust';
const projectName = 'emerging-tech-cdk-constructs';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services - Prototyping and Cloud Engineering',
  authorAddress: projectName+'@amazon.com',
  cdkVersion: '2.96.2',
  // Fill in the below during an upgrade
  // cdkVersionPinning: true,
  // constructsVersion: '10.2.70',
  // projenVersion: '0.73.26',

  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: projectName,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/'+gitHubUser+'/'+projectName,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  packageName: '@'+gitHubUser+'/'+projectName, /* The "name" in package.json. */

  // Keep updated with https://github.com/nodejs/release#release-schedule
  minNodeVersion: '16.13.0', // 'MAINTENANCE' (first LTS)
  maxNodeVersion: '20.7.0', // 'CURRENT'
  workflowNodeVersion: '18.x', // 'ACTIVE'

  npmRegistryUrl: 'https://npm.pkg.github.com',
  npmTokenSecret: 'GITHUB_TOKEN',

  githubOptions: {
    pullRequestLintOptions: {
      contributorStatement: 'By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of the project license.',
    },
  },
});
project.synth();