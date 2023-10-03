import { AwsCdkConstructLibrary } from 'projen/lib/awscdk';
import { Job, JobPermission } from 'projen/lib/github/workflows-model';

/**
 * https://github.com/aws-github-ops/github-merit-badger
 * GitHub Action that can add well-known merit badges to pull requests 
 * that come in to your repository. It will gamify contributions and 
 * galvanize the open-source community to contribute more and more to your project!
 * @param project AwsCdkConstructLibrary 
 */
export function buildMeritBadgerWorkflow(project: AwsCdkConstructLibrary)
{
    const applymeritbadge: Job = { 
        runsOn: ["ubuntu-latest"], 
        permissions: { 
          pullRequests: JobPermission.WRITE, 
        },
        steps: [ 
          { 
            uses: "aws-github-ops/github-merit-badger@main", 
            id: "github-merit-badger",
            with: { 
                "github-token": "${{ secrets.PROJEN_GITHUB_TOKEN }}",
                "badges": '[beginning-contributor,repeat-contributor,valued-contributor,admired-contributor,star-contributor,distinguished-contributor]',
                "thresholds": '[0,3,6,13,25,50]',
                "ignore-usernames": '[krokoko, scottschreckengaust, hvital, dineshSajwan, BenWillettAWS, emerging-tech-cdk-constructs-bot, dependabot[bot], amazon-auto, github-actions]'
            }, 
          }, 
        ], 
      }; 
      
    if (project.github)
    {
    const workflow = project.github.addWorkflow('github-merit-badger');
    if (workflow)
    {
        workflow.on({ 
        pullRequestTarget: { 
            types: [ 
            "opened"
            ], 
        }, 
        }); 
        workflow.addJobs({ 'call-action': applymeritbadge }); 
    }
    }
      
}