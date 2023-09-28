import { awscdk } from 'projen';
// import { 
//   //Job, 
//   JobCallingReusableWorkflow,
//  } from 'projen/lib/github/workflows-model';

//import { GithubWorkflow } from 'projen/lib/github/workflows';

//import { GithubCredentials } from 'projen/lib/github';

const gitHubUser = 'aws-samples';
const projectName = 'emerging-tech-cdk-constructs';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services - Prototyping and Cloud Engineering',
  authorAddress: projectName+'@amazon.com',
  cdkVersion: '2.96.2',
  // Fill in the below during an upgrade
  // cdkVersionPinning: true,
  // constructsVersion: '10.2.70',
  // projenVersion: '0.73.28',

  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: projectName,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/'+gitHubUser+'/'+projectName,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  packageName: '@'+gitHubUser+'/'+projectName, /* The "name" in package.json. */

  // Keep synchronized with https://github.com/nodejs/release#release-schedule
  minNodeVersion: '16.13.0', // 'MAINTENANCE' (first LTS)
  maxNodeVersion: '20.7.0', // 'CURRENT'
  workflowNodeVersion: '18.x', // 'ACTIVE'

  npmRegistryUrl: 'https://npm.pkg.github.com',
  npmTokenSecret: 'GITHUB_TOKEN',

  // projenCredentials: GithubCredentials.fromPersonalAccessToken(
  //   {
  //     secret: "PROJEN_GITHUB_TOKEN",
  //   }
  // ),
  workflowGitIdentity: {
    name: "emerging-tech-cdk-constructs-bot",
    email: "emerging-tech-cdk-constructs-bot@@users.noreply.github.com",
  },

  githubOptions: {
    // projenCredentials: GithubCredentials.fromPersonalAccessToken({
    //   secret: "PROJEN_GITHUB_TOKEN_ALT",
    // }),
    pullRequestLintOptions: {
      contributorStatement: 'By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of the project license.',
      contributorStatementOptions: {
        exemptUsers: [
          'github-actions@github.org',
          'emerging-tech-cdk-constructs-bot',
        ],
      },
    },
  },
  docgen: false,
  licensed: true,
  license: 'Apache-2.0',
  gitignore: ['*.DS_STORE'],
  stability: 'experimental',
  codeCov: true,
  codeCovTokenSecret: 'CODECOV_TOKEN',
});


// //TODO: https://github.com/projen/projen/issues/2675
// (project.buildWorkflow?.["workflow"] as GithubWorkflow).file?.addOverride(
//   "jobs.build.permissions.id-token",
//   "write"
// );
// (project.buildWorkflow?.["workflow"] as GithubWorkflow).file?.addOverride(
//   `jobs.build.steps.0.with.token`,
//   "${{ secrets.PROJEN_GITHUB_TOKEN }}"
// );





//console.log(project.buildWorkflow?.["workflow"]);

//console.log((project.buildWorkflow?.["workflow"] as GithubWorkflow));

// (project.buildWorkflow?.["workflow"] as GithubWorkflow).file?.addOverride(
//   `jobs.build.steps.["Dvoyy"].with.token`,
//   "PROJEN_GITHUB_TOKEN"
// );


project.synth();


// project.github?.workflows.forEach(function(workflow) {
//   if (workflow.name == "build") {
//     console.log(workflow.file);
//     // console.log("BUILD workflow.projenCredentials.tokenRef: ", workflow.projenCredentials.tokenRef);
//     // const job = workflow.getJob("build");
//     // console.log("BUILD job: ", job);
// //    console.log("BUILD job.permissions.idToken: ", job);

//     // for the "build" workflow's "build" job the `steps: [Function: steps]`
//     /*
//     {
//         runsOn: [ 'ubuntu-latest' ],
//         container: undefined,
//         env: { CI: 'true' },
//         permissions: { contents: 'write', idToken: undefined },
//         steps: [Function: steps],
//         outputs: {
//           self_mutation_happened: { stepId: 'self_mutation', outputName: 'self_mutation_happened' }
//         }
//     }
//     */
//   }
// });

