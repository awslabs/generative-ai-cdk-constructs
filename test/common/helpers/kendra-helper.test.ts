import {
    createCheckJobsStatusFn,
    createKendraStartDataSync,
    createKendraWorkflowStepFunction, createStepFunctionsExecutionHandlerRole,
    createSyncRunTable
} from "../../../lib/common/helpers/kendra-helper";
import {Stack} from "aws-cdk-lib";
import {Function, Runtime, Code} from "aws-cdk-lib/aws-lambda";
import {AttributeType, Table} from "aws-cdk-lib/aws-dynamodb";
import {Template, Match, Capture} from 'aws-cdk-lib/assertions';
import {Pass, StateMachine} from "aws-cdk-lib/aws-stepfunctions";

// Jest Mock for AWS SDK, specifically for Lambda service
jest.mock('aws-sdk', () => {
    const invokePromiseMock = jest.fn().mockResolvedValue({
        StatusCode: 200,
        Payload: JSON.stringify({ /* Mocked response */})
    });
    return {
        Lambda: jest.fn(() => ({
            invoke: jest.fn().mockReturnValue({promise: invokePromiseMock}),
        })),
        // Mock other AWS services as needed
    };
});

// Mocking the AWS CDK Stack
const mockStack = new Stack();

// Mocking Lambda Functions
const mockLambdaFunction = (id: string) => {
    const mockFunction = new Function(mockStack, id, {
        runtime: Runtime.NODEJS_18_X, // Using Node.js runtime for the sake of example
        handler: 'index.handler',
        code: Code.fromInline('exports.handler = async () => {}'), // Inline dummy handler
    });
    return mockFunction;
};

// Mock Lambda Functions used in your construct
const mockUpdateKendraJobStatusFn = mockLambdaFunction('MockUpdateKendraJobStatusFn');
const mockKendraSyncLambda = mockLambdaFunction('MockKendraSyncLambda');
const mockCreateCheckJobsStatusLambda = mockLambdaFunction('MockCreateCheckJobsStatusLambda');

describe('createKendraWorkflowStepFunction', () => {
    it('creates a Step Function with the correct configuration', () => {

        const stateMachine = createKendraWorkflowStepFunction(
            mockStack,
            mockUpdateKendraJobStatusFn,
            mockKendraSyncLambda,
            mockCreateCheckJobsStatusLambda
        );

        // Assertions to verify the state machine structure
        expect(stateMachine).toBeDefined();
        // Here you'd add more specific assertions based on your expectations,
        // such as checking the state machine definition, the logging configuration, etc.
        // This may involve parsing the state machine definition JSON to check specific states and transitions
    });
});


describe('createSyncRunTable', () => {
    it('creates a DynamoDB table with the correct configuration', () => {
        const mockStack = new Stack();

        const table: Table = createSyncRunTable(mockStack);

        expect(table).toBeDefined();
        // @ts-ignore
        expect(table.tablePartitionKey).toEqual({name: 'Id', type: AttributeType.STRING});
        // @ts-ignore
        expect(table.tableSortKey).toEqual({name: 'CreatedOn', type: AttributeType.STRING});
        // Add more assertions as needed to validate the table configuration
    });
});

describe('createKendraStartDataSync', () => {
    it('creates a Lambda function with the correct configuration and permissions', () => {
        const app = new Stack();
        const mockTable = createSyncRunTable(app);
        createKendraStartDataSync(
            app,
            mockTable,
            'mock-region-1',
            '123456789012',
            'mockKendraIndexId',
            'mockKendraDataSourceIndexId'
        );

        const template = Template.fromStack(app);

        // Assert it creates the Lambda function with the correct properties...
        template.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'start_sync.lambda_handler',
            Runtime: 'python3.10',
            Environment: {
                Variables: {
                    KENDRA_INDEX_ID: 'mockKendraIndexId',
                    KENDRA_DATA_SOURCE_INDEX_ID: 'mockKendraDataSourceIndexId',
                    DOCUMENTS_TABLE: {
                        Ref: Match.stringLikeRegexp('SyncRunTable')
                    },
                }
            }
        });

        // Assert on the IAM Role for Lambda function
        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'dynamodb:PutItem',
                            'dynamodb:Query',
                            'dynamodb:GetItem',
                            'dynamodb:UpdateItem'
                        ],
                        Effect: 'Allow',
                        Resource: {
                            "Fn::GetAtt": Match.arrayWith([
                                Match.stringLikeRegexp('SyncRunTable'),
                                "Arn"
                            ])
                        }
                    }),
                    Match.objectLike({
                        Action: 'kendra:StartDataSourceSyncJob',
                        Effect: 'Allow',
                        Resource: [
                            `arn:aws:kendra:mock-region-1:123456789012:index/mockKendraIndexId`,
                            `arn:aws:kendra:mock-region-1:123456789012:index/mockKendraIndexId/data-source/mockKendraDataSourceIndexId`
                        ]
                    })
                ]),
                Version: "2012-10-17"
            },
            Roles: Match.arrayWith([
                Match.objectLike({
                    Ref: Match.anyValue() // This matches any reference to the role
                })
            ])
        });
        // Additional assertions can be made here if necessary
    });
});

describe('createCheckJobsStatusFn', () => {
    it('creates a Lambda function and IAM role with correct configurations', () => {
        const app = new Stack();
        // Assuming createSyncRunTable is a function that creates and returns a DynamoDB table
        const mockTable = new Table(app, 'MockTable', {
            partitionKey: {name: 'id', type: AttributeType.STRING}
        });

        createCheckJobsStatusFn(
            app,
            'mock-region-1',
            '123456789012',
            'mockKendraIndexId',
            'mockKendraDataSourceIndexId',
            mockTable
        );

        const template = Template.fromStack(app);
        // Assert the Lambda function is created with the correct properties
        template.hasResourceProperties('AWS::Lambda::Function', {
            Runtime: 'python3.10',
            Handler: 'check_sync_status.lambda_handler',
            Timeout: 60,
            MemorySize: 256,
            Environment: {
                Variables: {
                    KENDRA_INDEX_ID: 'mockKendraIndexId',
                    KENDRA_DATA_SOURCE_INDEX_ID: 'mockKendraDataSourceIndexId',
                    DOCUMENTS_TABLE: {
                        Ref: Match.stringLikeRegexp("MockTable")
                    },
                }
            }
        });

        // Assert the IAM Role has correct policies
        template.hasResourceProperties('AWS::IAM::Role', {
            AssumeRolePolicyDocument: Match.objectLike({
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'sts:AssumeRole',
                        Effect: 'Allow',
                        Principal: {
                            Service: 'lambda.amazonaws.com'
                        }
                    })
                ])
            })
        });

        // Assert policies attached to the role for Kendra access
        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'kendra:ListDataSourceSyncJobs',
                        Effect: 'Allow',
                        // Adjust the assertion to match the string format for the Resource property
                        Resource: `arn:aws:kendra:mock-region-1:123456789012:index/mockKendraIndexId`
                    }),
                    Match.objectLike({
                        Action: 'kendra:ListDataSourceSyncJobs',
                        Effect: 'Allow',
                        // Since both statements are similar, repeat the adjustment for each statement that has a Resource property
                        Resource: `arn:aws:kendra:mock-region-1:123456789012:index/mockKendraIndexId/data-source/mockKendraDataSourceIndexId`
                    })
                ]),
                Version: "2012-10-17"
            }
        });
    });
});

describe('createStepFunctionsExecutionHandlerRole', () => {
    it('creates an IAM Role with correct configurations and permissions', () => {
        const app = new Stack();

        // Mock state machine for testing
        const mockStateMachine = new StateMachine(app, 'MockStateMachine', {
            definition: new Pass(app, 'MockState'),
        });

        createStepFunctionsExecutionHandlerRole(app, mockStateMachine);

        const template = Template.fromStack(app);
        console.log(JSON.stringify(template.toJSON(), null, 2))
        // Assert the IAM Role is created with the correct properties
        template.hasResourceProperties('AWS::IAM::Role', {
            Description: 'Role used by the stepFunctionsExecutionHandlerFn Lambda function',
            AssumeRolePolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'sts:AssumeRole',
                        Effect: 'Allow',
                        Principal: {
                            Service: 'lambda.amazonaws.com'
                        }
                    })
                ])
            },
            ManagedPolicyArns: Match.arrayWith([
                {
                    'Fn::Join': [
                        '',
                        [
                            'arn:',
                            {Ref: 'AWS::Partition'},
                            ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
                        ]
                    ]
                }
            ])
        });

// Assert for the inline policy attached to the role
        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'states:StartExecution',
                        Resource: {
                            'Ref': 'MockStateMachine53804AAC' // Adjusted to match the reference to the state machine
                        }
                    })
                ])
            }
        });
        // Capture the PolicyDocument to assert on inline policy statements
        const policyCapture = new Capture();
        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: policyCapture,
        });

        // Assert the inline policy grants 'states:StartExecution' permission on the state machine
        expect(policyCapture).toMatchObject(
            {
                "_captured":
                    [{
                        "Statement": [{
                            "Action": "states:StartExecution",
                            "Effect": "Allow",
                            "Resource": {
                                "Ref": "MockStateMachine53804AAC"
                            }
                        }], "Version": "2012-10-17"
                    }],
                "idx": 0,
                "name": "Capture",
                "pattern": undefined
            });
    });
});
