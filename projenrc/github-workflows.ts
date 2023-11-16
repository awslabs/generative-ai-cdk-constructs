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
        },
      },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('monthly-repo-metrics');
    if (workflow) {
      workflow.on({
        workflowDispatch: {
          schedule: {
            cron: '0 2 1 * *',
          },
        },
      });
      workflow.addJobs({ build: buildjob });
    }
  }
}

/**
 * https://github.com/aws/aws-cdk/blob/main/.github/workflows/update-contributors.yml
 * GitHub action that runs monthly to create a pull request for updating a
 * CONTRIBUTORS file with the top contributors.
 * @param project AwsCdkConstructLibrary
 */
export function buildUpdateContributorsWorkflow(project: AwsCdkConstructLibrary) {

  const updateContributors: Job = {
    permissions: {
      pullRequests: JobPermission.WRITE,
    },
    if: "github.repository == 'awslabs/generative-ai-cdk-constructs'",
    runsOn: ['ubuntu-latest'],
    steps: [
      {
        name: 'Checkout project',
        uses: 'actions/checkout@v3',
      },
      {
        uses: 'minicli/action-contributors@v3.3',
        name: 'Update a projects CONTRIBUTORS file',
        env:
        {
          CONTRIB_REPOSITORY: 'awslabs/generative-ai-cdk-constructs',
          CONTRIB_OUTPUT_FILE: 'CONTRIBUTORS.md',
          CONTRIB_IGNORE: 'emerging-tech-cdk-constructs-bot, generative-ai-cdk-constructs-bot, dependabot[bot], dependabot, amazon-auto, github-actions',
        },
      },
      {
        name: 'Create a PR',
        uses: 'peter-evans/create-pull-request@v5',
        with: {
          'branch': 'automation/update-contributors',
          'author': 'emerging-tech-cdk-constructs-bot',
          'commit-message': 'chore: update Contributors File',
          'title': 'chore: update Contributors File',
          'labels': 'auto-approve',
          'token': '${{ secrets.PROJEN_GITHUB_TOKEN }}',
        },
      },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('update-contributors');
    if (workflow) {
      workflow.on({
        workflowDispatch: {
          schedule: {
            cron: '0 0 1 * *',
          },
        },
      });
      workflow.addJobs({ main: updateContributors });
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
    if: "(github.event.pull_request.user.login == 'emerging-tech-cdk-constructs-bot' || github.event.pull_request.user.login == 'generative-ai-cdk-constructs-bot') && contains(github.event.pull_request.labels.*.name, 'auto-approve')",
    permissions: {
      pullRequests: JobPermission.WRITE,
    },
    steps: [
      {
        uses: 'hmarr/auto-approve-action@v3.2.1',
        with: {
          'github-token': '${{ secrets.PROJEN_GITHUB_TOKEN }}',
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
        uses: 'actions/checkout@v3',
      },
      {
        name: 'Run GitHub Action for ORT',
        uses: 'oss-review-toolkit/ort-ci-github-action@v1',
      },
    ],
  };

  if (project.github) {
    const workflow = project.github.addWorkflow('ort-toolkit');
    if (workflow) {
      workflow.on({
        push: {
          branches: [
            'main',
          ],
        },
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
      image: 'returntocorp/semgrep',
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
        uses: 'actions/checkout@v3',
      },
      {
        name: 'Run Semgrep CI',
        run: 'semgrep scan --verbose --json --output=semgrep.json',
      },
      {
        name: 'Store Semgrep as Artifact',
        uses: 'actions/upload-artifact@v3',
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
    //   image: 'returntocorp/semgrep',
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
        uses: 'actions/checkout@v3',
      },
      {
        name: 'Setup Python',
        uses: 'actions/setup-python@v4',
        with: {
          'python-version': '3.x',
        },
        run: 'python -m pip install bandit',
      },
      {
        name: 'Run Bandit',
        run: 'bandit --recursive --format html --output bandit-report.html .',
      },
      {
        name: 'Store Bandit as Artifact',
        uses: 'actions/upload-artifact@v3',
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
