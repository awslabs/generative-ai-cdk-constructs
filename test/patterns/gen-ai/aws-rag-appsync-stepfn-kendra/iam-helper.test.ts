import {Stack} from 'aws-cdk-lib';
import {addRolePolicies, createIAMRoleWithBasicExecutionPolicy} from "../../../../src/common/helpers/iam-roles-helper";
import {Match, Template} from "aws-cdk-lib/assertions";

describe('iam-roles-helper', () => {
    describe('createIAMRoleWithBasicExecutionPolicy', () => {
        it('creates an IAM role with a basic execution policy', () => {
            const stack = new Stack();
            const roleId = 'TestRole';
            const roleDescription = 'Test Description';

            createIAMRoleWithBasicExecutionPolicy(stack, roleId, roleDescription);

            const template = Template.fromStack(stack);

            template.hasResourceProperties('AWS::IAM::Role', {
                Description: roleDescription,
                AssumeRolePolicyDocument: Match.objectLike({
                    Statement: [
                        {
                            Action: 'sts:AssumeRole',
                            Effect: 'Allow',
                            Principal: {Service: 'lambda.amazonaws.com'},
                        },
                    ],
                }),
            });

        });
    });
    describe('addRolePolicies', () => {
        it('adds policy statements to the IAM role', () => {
            const stack = new Stack();
            const role = createIAMRoleWithBasicExecutionPolicy(stack, 'TestRole', 'Test Description');

            addRolePolicies(role, [{
                actions: ['s3:GetObject'],
                resources: ['arn:aws:s3:::example-bucket/*'],
            }]);

            const template = Template.fromStack(stack);

            template.hasResourceProperties('AWS::IAM::Policy', {
                PolicyDocument: Match.objectLike({
                    Statement: [
                        {
                            Action: 's3:GetObject',
                            Effect: 'Allow',
                            Resource: 'arn:aws:s3:::example-bucket/*',
                        },
                    ],
                }),
            });
        });
    });
});