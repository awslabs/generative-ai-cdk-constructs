# Developer Guide

Emerging Tech Constructs are built in typescript using Projen (http://projen.io/). This is to support all the associated testing, code checking and compilation for Java, Python and .NET client. At the moment, there is no dedicated development container, thus you need to configure your local development environment following the steps described below.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

### Pre-requisites

- An AWS account. We recommend to deploy this solution in a new account
- [AWS CLI](https://aws.amazon.com/cli/): configure your credentials

```
aws configure --profile [your-profile] 
AWS Access Key ID [None]: xxxxxx
AWS Secret Access Key [None]:yyyyyyyyyy
Default region name [None]: us-east-1 
Default output format [None]: json
```

- Node.js: v18.17.1
- [AWS CDK](https://github.com/aws/aws-cdk/releases/tag/v2.93.0): 2.93.0
- [Python >=3.9](https://www.python.org/downloads/)

## Preparing your Build Environment


| Action                                                                                                               |                                                                                                                                                                                                                                  |
| :--------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Open up the[aws-emerging-tech-constructs repo](https://github.com/krokoko/tmp_cdk_pace_emerging_tech_construct_lib). | As you are reading this file from the aws-emerging-tech-constructs repo, you are probably already there...                                                                                                                       |
| Using the Fork button at the upper right, Fork the repo into your github account.                                    | While we can give some advice on what github and git commands to use, we will not attempt to be a git tutorial. Some git/github expertise is assumed.                                                                            |
| Clone forked repo to your local development environment                                                              | If you wish to work off a branch in your repository, create that branch now and clone that branch. You will create a PR back to Main in aws-emerging-tech-constructs eventually, you can do that from fork/main or fork/*branch* |
| `cd tmp_cdk_pace_emerging_tech_construct_lib`                                                                        | This is the home directory of the repo, this is where you will open your text editor, run builds, etc.                                                                                                                           |
| `code .`                                                                                                             | Opens the project in VSCode. You can use the editor of your choice, just adapt this step to your specific use case.                                                                                                              |
| `npx projen`                                                                                                         | This command will generate project files (dependencies, ...) from the configuration file, and install them.                                                                                                                      |

## Working on Your Construct


| Action                                            | Explanation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :-------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (optional)<br/>`git checkout -b your-branch-name` | If you're working in a different branch than main in your forked repo and haven't changed your local branch, now is a good time to do so.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `mkdir src/<construct name> `                     | Creates a dedicated folder to work on your construct.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `cd src/<construct name>`                         | Change directory to the folder where you want to change code (this might also be`cd core`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| *Do all your code editing*                        | Open your code editor and and create the construct or perform your edits on an existing construct (or core). The Common folder                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `npx projen build`                                | This is the build command for the library. It will build, lint and run the unit and integration tests. If you make any substantive changes to the code, you will almost certainly see some or all of the tests fail. The next section will describe how testing works in AWS Emerging Tech Constructs and how to write, refresh and execute tests. In the meantime, you can at least check if your code transpiles correctly without running the tests by running`npm run build`. If you've edited any modules in /core in addition to a construct, be sure to build /core before building your construct. This command also packages locally the constructs to the /dist folder. |

## Testing

Emerging Tech Constructs use 2 flavors of testing, unit testing and integration testing. Unit testing targets specific aspects of a construct or one of the functions in the core library. It examines the results and confirms the correct resources are there. For instance, it may call the deployLambdaFunction() in the core library and then confirm that AWS_NODEJS_CONNECTION_REUSE_ENABLED environment variable was set correctly. The unit tests check that certain aspects of the results are correct. You can learn more about unit testing CDK constructs [here](https://docs.aws.amazon.com/cdk/latest/guide/testing.html) and [here](https://aws.amazon.com/blogs/developer/testing-infrastructure-with-the-aws-cloud-development-kit-cdk/).

All test files can be found in the /test directory under each construct (or core). You'll find 2 types of files in this directory:

* \*.test.ts files - these are the unit test files. All the unit tests for a construct are in a single file.
* integ.\*.ts files - these the integration test files. Each integration test gets a separate file.


| Action            | Explanation                                |
| :------------------ | :------------------------------------------- |
| `npx projen test` | This will run all tests (unit+integration) |

---

&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
