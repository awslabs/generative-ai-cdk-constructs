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
          'ignore-usernames': '[emerging-tech-cdk-constructs-bot, dependabot[bot], amazon-auto, github-actions]',
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
    if: "github.repository == 'aws-samples/emerging-tech-cdk-constructs'",
    runsOn: ['ubuntu-latest'],
    name: 'metrics',
    steps: [
      {
        name: 'Get dates for last month',
        run: [
          '# Calculate the first day of the previous month',
          'first_day=$(date -d "last month" +%Y-%m-01)',
          '# Calculate the last day of the previous month',
          'last_day=$(date -d $first_day +1 month -1 day +%Y-%m-%d)',
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
          SEARCH_QUERY: 'repo:aws-samples/emerging-tech-cdk-constructs is:issue created:${{ env.last_month }} -reason:"not planned"',
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
          SEARCH_QUERY: 'repo:aws-samples/emerging-tech-cdk-constructs is:pr created:${{ env.last_month }} -is:draft',
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
    if: "github.repository == 'aws-samples/emerging-tech-cdk-constructs'",
    runsOn: ['ubuntu-latest'],
    steps: [
      {
        uses: 'actions/checkout@v4',
      },
      {
        uses: 'minicli/action-contributors@v3.3',
        name: 'Update a projects CONTRIBUTORS file',
        env:
        {
          CONTRIB_REPOSITORY: 'aws-samples/emerging-tech-cdk-constructs',
          CONTRIB_OUTPUT_FILE: 'CONTRIBUTORS.md',
          CONTRIB_IGNORE: 'emerging-tech-cdk-constructs-bot, dependabot[bot], amazon-auto, github-actions',
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
    if: "(github.repository == 'aws-samples/emerging-tech-cdk-constructs') && (github.event.pull_request.user.login == 'emerging-tech-cdk-constructs-bot') && contains(github.event.pull_request.labels.*.name, 'auto-approve')",
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