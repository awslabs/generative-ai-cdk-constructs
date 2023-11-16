# Developer Guide

AWS Generative AI CDK Constructs are built in TypeScript using Projen (http://projen.io/). This is to support all the associated testing, code checking, and compilation for TypeScript and Python client. At the moment, there is no dedicated development container, thus you need to configure your local development environment following the steps described below.

### Pre-requisites

- An AWS account. We recommend you deploy this solution in a new account
- [AWS CLI](https://aws.amazon.com/cli/): configure your credentials

```
aws configure --profile [your-profile] 
AWS Access Key ID [None]: xxxxxx
AWS Secret Access Key [None]:yyyyyyyyyy
Default region name [None]: us-east-1 
Default output format [None]: json
```

- [Node](https://nodejs.org/en) >= v20.9.0
- [AWS CDK](https://github.com/aws/aws-cdk/releases/tag/v2.102.0) >= 2.103.1
- [Python](https://www.python.org/downloads/) >=3.9
- [Projen](https://github.com/projen/projen) >= 0.73.33
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/cli/install/) >= 1.22.19

You can use the command below to install the dependencies listed above
```
npm install -g npm aws-cdk yarn projen
```

## Preparing your Build Environment

| Action                                                                                                               |                                                                                                                                                                                                                                  |
| :--------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Open the [repository](https://github.com/awslabs/generative-ai-cdk-constructs). | As you are reading this file from the repo, you are probably already there.                                                                                                                       |
| Using the "fork" button in the upper right, fork the repo into your GitHub account.                                    | Some git/GitHub expertise is assumed.                                                                            |
| Clone forked repo to your local development environment.                                                              | If you wish to work off a branch in your repository, create and clone that branch. You will create a PR back to `main` in the generative-ai-cdk-constructs repository eventually, you can do that from fork/main or fork/*branch* |
| `cd generative-ai-cdk-construct`                                                                        | This is the home directory of the repo and where you will open your text editor, run builds, etc.                                                                                                                           |
| `code .`                                                                                                             | Opens the project in VSCode. You can use the editor of your choice, just adapt this step to your specific use case.                                                                                                              |
| `npx projen install`                                                                                                         | This command will generate project files (dependencies, etc.) from the configuration file and install them.                                                                                                                      |


## Working on Your Construct


| Action                                            | Explanation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :-------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (optional)<br/>`git checkout -b your-branch-name` | If you're working in a different branch than main in your forked repo and haven't changed your local branch, now is a good time to do so.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `mkdir src/patterns/<generative ai>/<construct name> `                     | Creates a dedicated folder to work on your construct.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `cd src/patterns/<generative ai>/<construct name>`                         | Change directory to the folder where you want to change code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| *Do all your code editing*                        | Open your code editor and create the construct or perform your edits on an existing construct. Your construct code must be located in the src folder. Put only the TypeScript files related to your construct in that folder. If you need to bundle additional code, add it to a separate folder in the root folder of this repo (see existing examples, like `lambda` and `resources` folders.) Use an existing construct as an example of the structure that is expected (architecture.png, README.md, index.ts). For the architecture diagram of your construct, please use the provided Draw.io project located in the /docs folder. Create a new tab with your construct name. Finally, export your construct in the src/index.ts file. An example of the expected project structure is provided at the end of this document. Common code containing helper functions to standardize and accelerate development is located in the src/common folder.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `npx projen build`                                | This is the build command for the library. It will build, lint, add license header files, and run the unit and integration tests. If you make any substantive changes to the code, you will almost certainly see some or all of the tests fail. The next section will describe how testing works in AWS Generative AI CDK Constructs and how to write, refresh, and execute tests. In the meantime, you can at least check if your code transpiles correctly without running the tests by running `npm run build`. If you've edited any modules in /core in addition to a construct, be sure to build /core before building your construct. This command also packages the constructs locally to the /dist folder. |

## Testing

AWS Generative AI CDK Constructs use two types of testing: unit testing and integration testing. Unit testing targets specific aspects of a construct or one of the functions in the core library. It examines the results and confirms the correct resources are there. For instance, it may call the deployLambdaFunction() in the core library and then confirm that AWS_NODEJS_CONNECTION_REUSE_ENABLED environment variable was set correctly. The unit tests check that certain aspects of the results are correct. You can learn more about unit testing CDK constructs [here](https://docs.aws.amazon.com/cdk/latest/guide/testing.html) and [here](https://aws.amazon.com/blogs/developer/testing-infrastructure-with-the-aws-cloud-development-kit-cdk/).

All test files can be found in the /test directory under each construct (or core). You'll find two types of files in this directory:

* \*.test.ts files - these are the unit test files. All the unit tests for a construct are in a single file.
* integ.\*.ts files - these the integration test files. Each integration test gets a separate file.


| Action            | Explanation                                |
| :------------------ | :------------------------------------------- |
| `npx projen test` | This will run all tests (unit+integration) |

---

## Project structure

```
.
|--docs/ (draw.io project containing architecture diagrams for all constructs)
|--lib/ (Build output)
|--lambda/ (Lambda functions code)
|--layers/ (Lambda layers code)
|--resources (If you need additional resources packaged with your library)
|--projenrc (Folder containing utilities for the main projenrc file)
|--src/ (Source .ts files)
    |--common/ (Common code reused accross constructs)
        |--helpers
            |-- README.md (Documentation for helper functions)
            |-- *-helper.ts (Helper source file)
    |--patterns/ (Constructs source files are here)
        |--<gen-ai>
            |--<pattern-name>
                |--index.ts (Construct source file)
                |--README.md (Construct documentation)
                |--architecture.png (Construct diagram)
    |--index.ts (Constructs need to be exported from this index.ts file)
|--test/
    |--common/ (Common code reused accross constructs)
        |--helpers
            |-- *-helper.test.ts (Helper source file)
    |--patterns/
        |--<gen-ai>
            |--<pattern-name>
                |--*.test.ts (construct test files)
|--use-cases 
    |--<use case name>
```


&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
