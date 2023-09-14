import { awscdk } from 'projen';
import { PrettierOptions, ArrowParens } from 'projen/lib/javascript';

// Constants
const CDK_VERSION: string = '2.93.0';
const DEFAULT_RELEASE_BRANCH: string = 'main';
const AUTHOR_EMAIL: string = 'pace@amazon.com';
const AUTHOR_NAME: string = 'Amazon Web Services';
//const NODE_VERSION: string = '20.5.1';

// Prettier settings
const prettierConf: PrettierOptions = {
  settings: {
    singleQuote: true,
    printWidth: 120,
    arrowParens: ArrowParens.AVOID,
  },
};

const project = new awscdk.AwsCdkConstructLibrary({
  projenrcTs: true,
  prettier: true,
  prettierOptions: prettierConf,
  author: AUTHOR_NAME,
  authorAddress: AUTHOR_EMAIL,
  cdkVersion: CDK_VERSION,
  //minNodeVersion: NODE_VERSION,
  defaultReleaseBranch: DEFAULT_RELEASE_BRANCH,
  jsiiVersion: '~5.0.0',
  name: 'emerging-tech-cdk-constructs',
  repositoryUrl: 'https://github.com/aws-samples/emerging-tech-cdk-constructs.git',
  bundledDeps: ['@aws-cdk/aws-lambda-python-alpha@' + CDK_VERSION + '-alpha.0'],
  publishToPypi: {
    distName: 'emerging_tech_cdk_construct',
    module: 'emerging_tech_cdk_construct',
  },
  keywords: ['aws-cdk', 'genai'],
  license: 'MIT-0',
  stability: 'experimental',
  docgen: false,
  copyrightPeriod: '2023-',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  gitignore: ['*.DS_STORE'],

});
project.synth();