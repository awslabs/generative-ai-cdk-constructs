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

import { AwsCdkConstructLibrary } from 'projen/lib/awscdk';
import { Job, JobPermission } from 'projen/lib/github/workflows-model';

/**
 * https://github.com/aws-github-ops/github-merit-badger
 * GitHub Action that can add well-known merit badges to pull requests
 * that come in to your repository. It will gamify contributions and
 * galvanize the open-source community to contribute more and more to your project!
 * @param project AwsCdkConstructLibrary
 */
export function buildMeritBadgerWorkflow(project: AwsCdkConstructLibrary) {
  const applymeritbadge: Job = {
    runsOn: ['ubuntu-latest'],
    permissions: {
      pullRequests: JobPermission.WRITE,
    },
    steps: [
      {
        uses: 'aws-github-ops/github-merit-badger@main',
        id: 'github-merit-badger',
        with: {
          'github-token': '${{ secrets.PROJEN_GITHUB_TOKEN }}',
          'badges': '[beginning-contributor,repeat-contributor,valued-contributor,admired-contributor,star-contributor,distinguished-contributor]',
          'thresholds': '[0,3,6,13,25,50]',
          'ignore-usernames': '[emerging-tech-cdk-constructs-bot, generative-ai-cdk-constructs-bot, dependabot[bot], dependabot, amazon-auto, github-actions]',
        },
      },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('github-merit-badger');
    if (workflow) {
      workflow.on({
        pullRequestTarget: {
          types: [
            'opened',
          ],
        },
      });
      workflow.addJobs({ 'call-action': applymeritbadge });
    }
  }
}

/**
 * https://github.com/aws/aws-cdk/blob/main/.github/workflows/repo-metrics.yml
 * GitHub action that runs monthly to report on metrics for issues and PRs created last month.
 * @param project
 */
export function buildMonthlyIssuesMetricsWorkflow(project: AwsCdkConstructLibrary) {
  const buildjob: Job = {
    permissions: {
      issues: JobPermission.WRITE,
      pullRequests: JobPermission.READ,
    },
    if: "github.repository == 'awslabs/generative-ai-cdk-constructs'",
    runsOn: ['ubuntu-latest'],
    name: 'metrics',
    steps: [
      {
        name: 'Get dates for last month',
        run: [
          '# Calculate the first day of the previous month',
          'first_day=$(date -d "last month" +%Y-%m-01)',
          '# Calculate the last day of the previous month',
          'last_day=$(date -d "$first_day +1 month -1 day" +%Y-%m-%d)',
          '# Set an environment variable with the date range',
          'echo "$first_day..$last_day"',
          'echo "last_month=$first_day..$last_day" >> "$GITHUB_ENV"',
        ].join('\n'),
      },
      {
        name: 'Report on issues',
        uses: 'github/issue-metrics@v2',
        env:
        {
          GH_TOKEN: '${{ secrets.PROJEN_GITHUB_TOKEN }}',
          SEARCH_QUERY: 'repo:awslabs/generative-ai-cdk-constructs is:issue created:${{ env.last_month }} -reason:"not planned"',
        },
      },
      {
        name: 'Create report for issues',
        uses: 'peter-evans/create-issue-from-file@v4',
        with:
        {
          'title': 'Monthly issue metrics report',
          'token': '${{ secrets.PROJEN_GITHUB_TOKEN }}',
          'content-filepath': './issue_metrics.md',
          'assignees': 'krokoko',
          'labels': 'auto-approve',
        },
      },
      {
        name: 'Report on PRs',
        uses: 'github/issue-metrics@v2',
        env:
        {
          GH_TOKEN: '${{ secrets.PROJEN_GITHUB_TOKEN }}',
          SEARCH_QUERY: 'repo:awslabs/generative-ai-cdk-constructs is:pr created:${{ env.last_month }} -is:draft',
        },
      },
      {
        name: 'Create report for PRs',
        uses: 'peter-evans/create-issue-from-file@v4',
        with:
        {
          'title': 'Monthly issue metrics report',
          'token': '${{ secrets.PROJEN_GITHUB_TOKEN }}',
          'content-filepath': './issue_metrics.md',
          'assignees': 'krokoko',
          'labels': 'auto-approve',
        },
      },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('monthly-repo-metrics');
    if (workflow) {
      workflow.on({
        workflowDispatch: {},
        schedule: [
          { cron: '0 2 1 * *' },
        ],
      });
      workflow.addJobs({ build: buildjob });
    }
  }
}

/**
 * https://github.com/aws/aws-cdk/blob/main/.github/workflows/auto-approve.yml
 * Approves merging PRs with the auto-approve label.
 * @param project AwsCdkConstructLibrary
 */
export function buildAutoApproveWorkflow(project: AwsCdkConstructLibrary) {
  const autoapprove: Job = {
    runsOn: ['ubuntu-latest'],
    if: "contains(github.event.pull_request.labels.*.name, 'auto-approve')",
    permissions: {
      pullRequests: JobPermission.WRITE,
    },
    steps: [
      {
        uses: 'hmarr/auto-approve-action@v4.0.0',
        with: {
          'github-token': '${{ secrets.GITHUB_TOKEN }}',
          'review-message': 'Auto approved automated PR',
        },
      },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('auto-approve');
    if (workflow) {
      workflow.on({
        pullRequestTarget: {
          types: [
            'labeled', 'unlabeled', 'opened', 'synchronize', 'reopened', 'ready_for_review', 'review_requested',
          ],
        },
      });
      workflow.addJobs({ 'auto-approve': autoapprove });
    }
  }
}

/**
 * https://github.com/oss-review-toolkit/ort-ci-github-action
 * Runs ORT toolkit on the repository.
 * @param project AwsCdkConstructLibrary
 */
export function buildOrtToolkitWorkflow(project: AwsCdkConstructLibrary) {
  const orttoolkit: Job = {
    runsOn: ['ubuntu-latest'],
    permissions: {
      contents: JobPermission.WRITE,
    },
    steps: [
      {
        name: 'Checkout project',
        uses: 'actions/checkout@v4',
      },
      {
        name: 'Run GitHub Action for ORT',
        uses: 'oss-review-toolkit/ort-ci-github-action@7f23c1f8d169dad430e41df223d3b8409c7a156e',
        with: {
          'allow-dynamic-versions': 'true',
          'ort-cli-args': '-P ort.forceOverwrite=true -P ort.enableRepositoryPackageConfigurations=true -P ort.enableRepositoryPackageCurations=true --stacktrace',
        },
      },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('ort-toolkit');
    if (workflow) {
      workflow.on({
        // push: {
        //   branches: [
        //     'main',
        //   ],
        // },
        workflowDispatch: {},
      });
      workflow.addJobs({ ort: orttoolkit });
    }
  }
}

/**
 * https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file
 * Runs Semgrep on the repository.
 * @param project AwsCdkConstructLibrary
 */
export function runSemGrepWorkflow(project: AwsCdkConstructLibrary) {
  const semgrep: Job = {
    name: 'semgrep/ci',
    runsOn: ['ubuntu-latest'],
    container: {
      image: 'semgrep/semgrep',
    },
    permissions: {
      contents: JobPermission.READ,
      pullRequests: JobPermission.READ,
      securityEvents: JobPermission.WRITE,
      actions: JobPermission.READ,
    },
    if: "(github.actor != 'dependabot[bot]')",

    steps: [
      {
        name: 'Checkout project',
        uses: 'actions/checkout@v4',
      },
      {
        name: 'Run Semgrep CI',
        run: 'semgrep scan --verbose --json --output=semgrep.json',
      },
      {
        name: 'Store Semgrep as Artifact',
        uses: 'actions/upload-artifact@v4',
        with: {
          name: 'semgrep.json',
          path: 'semgrep.json',
        },
      },
      // `awslabs` has the Advanced Security disabled.
      // {
      //   name: 'Upload SARIF file for GitHub Advanced Security Dashboard',
      //   uses: 'github/codeql-action/upload-sarif@v2',
      //   with: {
      //     sarif_file: 'semgrep.sarif',
      //   },
      //   if: 'always()',
      // },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('semgrep');
    if (workflow) {
      workflow.on({
        pullRequest: {},
        workflowDispatch: {
        },
        push: {
          branches: [
            'main',
          ],
        },
        schedule: [
          { cron: '20 17 * * *' },
        ],
      });
      workflow.addJobs({
        semgrep: semgrep,
      });
    }
  }
}

/**
 * https://github.com/mdegis/bandit-action
 * Runs Bandit on the repository.
 * @param project AwsCdkConstructLibrary
 */
export function runBanditWorkflow(project: AwsCdkConstructLibrary) {
  const bandit: Job = {
    name: 'bandit/ci',
    runsOn: ['ubuntu-latest'],
    // container: {
    //   image: 'semgrep/semgrep',
    // },
    permissions: {
      contents: JobPermission.READ,
      pullRequests: JobPermission.READ,
      securityEvents: JobPermission.WRITE,
      actions: JobPermission.READ,
    },
    if: "(github.actor != 'dependabot[bot]')",

    steps: [
      {
        name: 'Checkout project',
        uses: 'actions/checkout@v4',
      },
      {
        name: 'Setup Python',
        uses: 'actions/setup-python@v5',
        with: {
          'python-version': '3.x',
        },
      },
      {
        name: 'Run Bandit',
        run: 'pip install bandit && bandit --recursive --format html --output bandit-report.html --exit-zero .',
      },
      {
        name: 'Store Bandit as Artifact',
        uses: 'actions/upload-artifact@v4',
        with: {
          name: 'bandit-report.html',
          path: 'bandit-report.html',
        },
      },
      // `awslabs` has the Advanced Security disabled.
      // {
      //   name: 'Upload SARIF file for GitHub Advanced Security Dashboard',
      //   uses: 'github/codeql-action/upload-sarif@v2',
      //   with: {
      //     sarif_file: 'semgrep.sarif',
      //   },
      //   if: 'always()',
      // },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('bandit');
    if (workflow) {
      workflow.on({
        pullRequest: {},
        workflowDispatch: {
        },
        push: {
          branches: [
            'main',
          ],
        },
        schedule: [
          { cron: '20 17 * * *' },
        ],
      });
      workflow.addJobs({
        bandit: bandit,
      });
    }
  }
}

/**
* https://commitlint.js.org/#/guides-ci-setup
 * Runs commitlint on the repository.
 * @param project AwsCdkConstructLibrary
 */
export function runCommitLintWorkflow(project: AwsCdkConstructLibrary) {
  const commitlint: Job = {
    name: 'commitlint/ci',
    runsOn: ['ubuntu-latest'],
    permissions: {
      contents: JobPermission.READ,
      pullRequests: JobPermission.READ,
      securityEvents: JobPermission.WRITE,
      actions: JobPermission.READ,
    },
    if: "(github.actor != 'dependabot[bot]')",

    steps: [
      {
        name: 'Checkout project',
        uses: 'actions/checkout@v4',
        with: {
          'fetch-depth': '0',
        },
      },
      {
        name: 'Setup Node',
        uses: 'actions/setup-node@v4',
        with: {
          'node-version': '20.x',
        },
      },
      {
        name: 'Install CommitLint',
        run: 'npm install -g @commitlint/config-conventional commitlint',
      },
      {
        name: 'Validate Current Commit',
        if: "github.event_name == 'push'",
        run: 'npx commitlint --from HEAD~1 --to HEAD --verbose',
      },
      {
        name: 'Validate PR commits with commitlint',
        if: "github.event_name == 'pull_request'",
        run: 'npx commitlint --from ${{ github.event.pull_request.head.sha }}~${{ github.event.pull_request.commits }} --to ${{ github.event.pull_request.head.sha }} --verbose',
      },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('commitlint');
    if (workflow) {
      workflow.on({
        pullRequest: {},
        workflowDispatch: {},
        push: {},
      });
      workflow.addJobs({
        commitlint: commitlint,
      });
    }
  }
}

/**
 * Runs the code generation step to update the list of available JumpStart models, and DLC images.
 * Uses https://github.com/aws-actions/configure-aws-credentials to authenticate against AWS
 * @param project AwsCdkConstructLibrary
 */
export function buildCodeGenerationWorkflow(project: AwsCdkConstructLibrary) {
  const CREATE_PATCH_STEP_ID = 'create_patch';
  const PATCH_CREATED_OUTPUT = 'patch_created';

  // First job to run the code generation step
  const generate: Job = {
    name: 'Code generation',
    runsOn: ['ubuntu-latest'],
    permissions: {
      idToken: JobPermission.WRITE, // needed to interact with GitHub's OIDC Token endpoint.
      contents: JobPermission.READ,
    },
    outputs: {
      [PATCH_CREATED_OUTPUT]: {
        stepId: CREATE_PATCH_STEP_ID,
        outputName: PATCH_CREATED_OUTPUT,
      },
    },
    steps: [
      {
        name: 'Checkout project',
        uses: 'actions/checkout@v4',
        with: {
          ref: 'main',
        },
      },
      {
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v4',
        with: {
          'node-version': '20.x',
        },
      },
      {
        name: 'Install dependencies',
        run: 'yarn install --check-files --frozen-lockfile',
      },
      {
        name: 'Setup AWS credentials',
        uses: 'aws-actions/configure-aws-credentials@v4.0.2',
        with: {
          'role-to-assume': '${{ secrets.AWS_ROLE_ARN_TO_ASSUME }}',
          'aws-region': '${{ vars.AWS_REGION }}',
          'role-duration-seconds': 7200,
          'mask-aws-account-id': true,
        },
      },
      {
        name: 'Run code generation',
        run: 'npx projen generate-models-containers',
      },
      {
        name: 'Find mutations',
        id: CREATE_PATCH_STEP_ID,
        run: [
          'git add .',
          'git diff --staged --patch --exit-code > .repo.patch || echo "patch_created=true" >> $GITHUB_OUTPUT',
        ].join('\n'),
      },
      {
        name: 'Upload patch',
        if: `steps.${CREATE_PATCH_STEP_ID}.outputs.${PATCH_CREATED_OUTPUT}`,
        uses: 'actions/upload-artifact@v4',
        with: {
          name: '.repo.patch',
          path: '.repo.patch',
        },
      },
    ],
  };

  // second job to create a PR if any changes were detected
  const pr: Job = {
    name: 'Create Pull Request',
    needs: ['generate'],
    runsOn: ['ubuntu-latest'],
    permissions: {
      contents: JobPermission.READ,
    },
    if: '${{ needs.generate.outputs.patch_created }}',
    steps: [
      {
        name: 'Checkout',
        uses: 'actions/checkout@v4',
        with: {
          ref: 'main',
        },
      },
      {
        name: 'Download patch',
        uses: 'actions/download-artifact@v4',
        with: {
          name: '.repo.patch',
          path: '${{ runner.temp }}',
        },
      },
      {
        name: 'Apply patch',
        run: '[ -s ${{ runner.temp }}/.repo.patch ] && git apply ${{ runner.temp }}/.repo.patch || echo "Empty patch. Skipping."',
      },
      {
        name: 'Set git identity',
        run: [
          'git config user.name "github-actions"',
          'git config user.email "github-actions@github.com"',
        ].join('\n'),
      },
      {
        name: 'Create Pull Request',
        id: 'create-pr',
        uses: 'peter-evans/create-pull-request@v7.0.6',
        with: {
          'token': '${{ secrets.PROJEN_GITHUB_TOKEN }}',
          'commit-message': [
            'chore(deps): upgrade list of models and DLC images',

            'Upgrade list of models and DLC images. See details in [workflow run].',

            '[Workflow Run]: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}',

            '------',

            '*Automatically created by projen via the "code-generation" workflow*',
          ].join('\n'),
          'branch': 'github-actions/code-generation',
          'title': 'chore(deps): upgrade list of models and DLC images',
          'body': [
            'Upgrade list of models and DLC images. See details in [workflow run].',
            '[Workflow Run]: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}',
            '------',

            '*Automatically created by projen via the "code-generation" workflow*',
          ].join('\n'),
          'author': 'github-actions <github-actions@github.com>',
          'committer': 'github-actions <github-actions@github.com>',
          'signoff': true,
          'labels': 'auto-approve',
        },
      },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('code-generation');
    if (workflow) {
      workflow.on({
        workflowDispatch: {},
        schedule: [
          { cron: '0 0 * * *' },
        ],
      });
      workflow.addJobs({ generate: generate, pr: pr });
    }
  }
}
