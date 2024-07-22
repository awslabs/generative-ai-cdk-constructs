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
import { Job, JobPermission } from 'projen/lib/github/workflows-model';

/**
 * GitHub job used to replace the default one created by Projen
 * as part of the upgrade-main action workflow. This job takes
 * the same steps, and adds the auto-approve label
 */
export function buildUpgradeMainPRCustomJob() {
  const pr: Job = {
    name: 'Create Pull Request',
    needs: ['upgrade'],
    runsOn: ['ubuntu-latest'],
    permissions: {
      contents: JobPermission.READ,
    },
    if: '${{ needs.upgrade.outputs.patch_created }}',
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
        uses: 'peter-evans/create-pull-request@v6',
        with: {
          'token': '${{ secrets.PROJEN_GITHUB_TOKEN }}',
          'commit-message': [
            'chore(deps): upgrade dependencies\n',

            'Upgrades project dependencies. See details in [workflow run].\n',

            '[Workflow Run]: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}\n',

            '------\n',

            '*Automatically created by projen via the "upgrade-main" workflow*',
          ].join('\n'),
          'branch': 'github-actions/upgrade-main',
          'title': 'chore(deps): upgrade dependencies',
          'body': [
            'Upgrades project dependencies. See details in [workflow run].\n',
            '[Workflow Run]: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}\n',
            '------\n',

            '*Automatically created by projen via the "upgrade-main" workflow*',
          ].join('\n'),
          'author': 'github-actions <github-actions@github.com>',
          'committer': 'github-actions <github-actions@github.com>',
          'signoff': true,
          'labels': 'auto-approve',
        },
      },
    ],
  };

  return pr;
}