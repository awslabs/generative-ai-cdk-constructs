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
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import {Aws, RemovalPolicy} from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import {PolicyStatement} from 'aws-cdk-lib/aws-iam';
import * as kendra from 'aws-cdk-lib/aws-kendra';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {CfnLogGroup} from 'aws-cdk-lib/aws-logs';
import * as logs from 'aws-cdk-lib/aws-logs';
import {Bucket, BucketAccessControl, HttpMethods} from 'aws-cdk-lib/aws-s3';
import {AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId} from 'aws-cdk-lib/custom-resources';
import {Construct} from 'constructs';
import * as deepmerge from 'deepmerge';
import {
    BuildKendraIndexProps,
    BuildVpcProps,
    CfnNagSuppressRule,
    EndpointDefinition,
    EndpointTypes,
    SecurityGroupRuleDefinition,
} from './types';
import {createS3DataSource} from '../../../common/helpers/kendra-helper';
import {generatePhysicalName} from '../../../common/helpers/utils';
import {DefinitionBody, StateMachine} from "aws-cdk-lib/aws-stepfunctions";
import {Table} from "aws-cdk-lib/aws-dynamodb";

/**
 * Adds CFN NAG suppress rules to the CDK resource.
 * @param resource The CDK resource
 * @param rules The CFN NAG suppress rules
 */
function addCfnSuppressRules(resource: cdk.Resource | cdk.CfnResource, rules: CfnNagSuppressRule[]) {
    if (resource instanceof cdk.Resource) {
        resource = resource.node.defaultChild as cdk.CfnResource;
    }

    if (resource.cfnOptions.metadata?.cfn_nag?.rules_to_suppress) {
        resource.cfnOptions.metadata?.cfn_nag.rules_to_suppress.push(...rules);
    } else {
        resource.addMetadata('cfn_nag', {
            rules_to_suppress: rules,
        });
    }
}

/**
 * Creates the props to be used to instantiate a CDK L2 construct within a Solutions Construct
 *
 * @param defaultProps The default props to be used by the construct
 * @param clientProps Optional properties passed in from the client in the props object
 * @param constructProps Optional properties required by the construct for the construct to work (override any other values)
 * @returns The properties to use - all values prioritized:
 *  1) constructProps value
 *  2) clientProps value
 *  3) defaultProps value
 */
export function consolidateProps(defaultProps: object, clientProps?: object, constructProps?: object, concatArray: boolean = false): any {
    let result: object = defaultProps;

    if (clientProps) {
        result = overrideProps(result, clientProps, concatArray);
    }

    if (constructProps) {
        result = overrideProps(result, constructProps, concatArray);
    }

    return result;
}


function isObject(val: object) {
    return val != null && typeof val === 'object'
        && Object.prototype.toString.call(val) === '[object Object]';
}

function isPlainObject(o: object) {
    if (Array.isArray(o) === true) {
        return true;
    }

    if (isObject(o) === false) {
        return false;
    }

    // If has modified constructor
    const ctor = o.constructor;
    if (typeof ctor !== 'function') {
        return false;
    }

    // If has modified prototype
    const prot = ctor.prototype;
    if (isObject(prot) === false) {
        return false;
    }

    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }

    // Most likely a plain Object
    return true;
}

export function overrideProps(DefaultProps: object, userProps: object, concatArray: boolean = false): any {
    // Override the sensible defaults with user provided props
    if (concatArray) {
        return deepmerge(DefaultProps, userProps, {
            arrayMerge: (destinationArray, sourceArray) => destinationArray.concat(sourceArray),
            isMergeableObject: isPlainObject,
        });
    } else {
        return deepmerge(DefaultProps, userProps, {
            arrayMerge: (_destinationArray, sourceArray) => sourceArray, // underscore allows arg to be ignored
            isMergeableObject: isPlainObject,
        });
    }
}

function buildVpc(scope: Construct, props: BuildVpcProps): ec2.IVpc {
    if (props?.existingVpc) {
        return props?.existingVpc;
    }

    let cumulativeProps: ec2.VpcProps = props?.defaultVpcProps;

    cumulativeProps = consolidateProps(cumulativeProps, props?.userVpcProps, props?.constructVpcProps);

    const vpc = new ec2.Vpc(scope, 'Vpc', cumulativeProps);

    // Add VPC FlowLogs with the default setting of trafficType:ALL and destination: CloudWatch Logs
    const flowLog: ec2.FlowLog = vpc.addFlowLog('FlowLog');

    SuppressMapPublicIpWarnings(vpc);
    SuppressEncryptedLogWarnings(flowLog);

    return vpc;
}

function SuppressMapPublicIpWarnings(vpc: ec2.Vpc) {
    // Add Cfn Nag suppression for PUBLIC subnets to suppress WARN W33: EC2 Subnet should not have MapPublicIpOnLaunch set to true
    vpc.publicSubnets.forEach((subnet) => {
        const cfnSubnet = subnet.node.defaultChild as ec2.CfnSubnet;
        addCfnSuppressRules(cfnSubnet, [
            {
                id: 'W33',
                reason: 'Allow Public Subnets to have MapPublicIpOnLaunch set to true',
            },
        ]);
    });
}

function SuppressEncryptedLogWarnings(flowLog: ec2.FlowLog) {
    // Add Cfn Nag suppression for CloudWatchLogs LogGroups data is encrypted
    const cfnLogGroup: CfnLogGroup = flowLog.logGroup?.node.defaultChild as CfnLogGroup;
    addCfnSuppressRules(cfnLogGroup, [
        {
            id: 'W84',
            reason: 'By default CloudWatchLogs LogGroups data is encrypted using the CloudWatch server-side encryption keys (AWS Managed Keys)',
        },
    ]);
}

export function DefaultIsolatedVpcProps(): ec2.VpcProps {
    return {
        natGateways: 0,
        subnetConfiguration: [
            {
                cidrMask: 18,
                name: 'isolated',
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            },
        ],
    } as ec2.VpcProps;
}

export enum ServiceEndpointTypes {
    DYNAMODB = 'DDB',
    SNS = 'SNS',
    SQS = 'SQS',
    S3 = 'S3',
    STEP_FUNCTIONS = 'STEP_FUNCTIONS',
    SAGEMAKER_RUNTIME = 'SAGEMAKER_RUNTIME',
    SECRETS_MANAGER = 'SECRETS_MANAGER',
    SSM = 'SSM',
    ECR_API = 'ECR_API',
    ECR_DKR = 'ECR_DKR',
    EVENTS = 'CLOUDWATCH_EVENTS',
    KINESIS_FIREHOSE = 'KINESIS_FIREHOSE',
    KINESIS_STREAMS = 'KINESIS_STREAMS',
    KENDRA = 'KENDRA'
}

function AddGatewayEndpoint(vpc: ec2.IVpc, service: EndpointDefinition, interfaceTag: ServiceEndpointTypes) {
    vpc.addGatewayEndpoint(interfaceTag, {
        service: service.endpointGatewayService as ec2.GatewayVpcEndpointAwsService,
    });
}

function CheckIfEndpointAlreadyExists(vpc: ec2.IVpc, interfaceTag: ServiceEndpointTypes): boolean {
    return vpc.node.children.some((child) => child.node.id === interfaceTag);
}

const endpointSettings: EndpointDefinition[] = [
    {
        endpointName: ServiceEndpointTypes.DYNAMODB,
        endpointType: EndpointTypes.GATEWAY,
        endpointGatewayService: ec2.GatewayVpcEndpointAwsService.DYNAMODB,
    },
    {
        endpointName: ServiceEndpointTypes.S3,
        endpointType: EndpointTypes.GATEWAY,
        endpointGatewayService: ec2.GatewayVpcEndpointAwsService.S3,
    },
    {
        endpointName: ServiceEndpointTypes.STEP_FUNCTIONS,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.STEP_FUNCTIONS,
    },
    {
        endpointName: ServiceEndpointTypes.SNS,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.SNS,
    },
    {
        endpointName: ServiceEndpointTypes.SQS,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.SQS,
    },
    {
        endpointName: ServiceEndpointTypes.SAGEMAKER_RUNTIME,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.SAGEMAKER_RUNTIME,
    },
    {
        endpointName: ServiceEndpointTypes.SECRETS_MANAGER,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
    },
    {
        endpointName: ServiceEndpointTypes.SSM,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.SSM,
    },
    {
        endpointName: ServiceEndpointTypes.ECR_API,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.ECR,
    },
    {
        endpointName: ServiceEndpointTypes.ECR_DKR,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.ECR_DOCKER,
    },
    {
        endpointName: ServiceEndpointTypes.EVENTS,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_EVENTS,
    },
    {
        endpointName: ServiceEndpointTypes.KINESIS_FIREHOSE,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.KINESIS_FIREHOSE,
    },
    {
        endpointName: ServiceEndpointTypes.KINESIS_STREAMS,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.KINESIS_STREAMS,
    },
    {
        endpointName: ServiceEndpointTypes.KENDRA,
        endpointType: EndpointTypes.INTERFACE,
        endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.KENDRA,
    },
];


export function AddAwsServiceEndpoint(
    scope: Construct,
    vpc: ec2.IVpc,
    interfaceTag: ServiceEndpointTypes,
) {
    if (CheckIfEndpointAlreadyExists(vpc, interfaceTag)) {
        return;
    }

    const service = endpointSettings.find(
        (endpoint) => endpoint.endpointName === interfaceTag,
    );

    if (!service) {
        throw new Error('Unsupported Service sent to AddServiceEndpoint');
    }

    if (service.endpointType === EndpointTypes.GATEWAY) {
        AddGatewayEndpoint(vpc, service, interfaceTag);
    }
    if (service.endpointType === EndpointTypes.INTERFACE) {
        AddInterfaceEndpoint(scope, vpc, service, interfaceTag);
    }

    // ESLint requires this return statement, so disabling SonarQube warning
    return; // NOSONAR
}

function AddInterfaceEndpoint(scope: Construct, vpc: ec2.IVpc, service: EndpointDefinition, interfaceTag: ServiceEndpointTypes) {
    const endpointDefaultSecurityGroup = buildSecurityGroup(
        scope,
        `${scope.node.id}-${service.endpointName}`,
        {
            vpc,
            allowAllOutbound: true,
        },
        [{peer: ec2.Peer.ipv4(vpc.vpcCidrBlock), connection: ec2.Port.tcp(443)}],
        [],
    );

    vpc.addInterfaceEndpoint(interfaceTag, {
        service: service.endpointInterfaceService as ec2.InterfaceVpcEndpointAwsService,
        securityGroups: [endpointDefaultSecurityGroup],
    });
}

export function buildSecurityGroup(
    scope: Construct,
    name: string,
    props: ec2.SecurityGroupProps,
    ingressRules: SecurityGroupRuleDefinition[],
    egressRules: SecurityGroupRuleDefinition[],
): ec2.SecurityGroup {
    const newSecurityGroup = new ec2.SecurityGroup(scope, `${name}-security-group`, props);

    ingressRules.forEach(rule => {
        newSecurityGroup.addIngressRule(rule.peer, rule.connection, rule.description, rule.remoteRule);
    });

    egressRules.forEach(rule => {
        newSecurityGroup.addEgressRule(rule.peer, rule.connection, rule.description, rule.remoteRule);
    });

    addCfnSuppressRules(newSecurityGroup, [
        {
            id: 'W5',
            reason:
                'Egress of 0.0.0.0/0 is default and generally considered OK',
        },
        {
            id: 'W40',
            reason:
                'Egress IPProtocol of -1 is default and generally considered OK',
        },
    ]);

    return newSecurityGroup;
}

function defaultKendraIndexProps(id: string, roleArn?: string): kendra.CfnIndexProps {
    return {
        name: generatePhysicalName('', ['KendraIndex', id], 1000),
        roleArn,
        edition: 'DEVELOPER_EDITION',
    } as kendra.CfnIndexProps;
}

function buildKendraIndex(scope: Construct, id: string, props: BuildKendraIndexProps): kendra.CfnIndex {
    // Conditional lambda function creation
    if (props.existingIndexObj) {
        // The client provided an Index, so we'll do nothing and return it to them
        return props.existingIndexObj;
    } else {
        let indexRoleArn: string = '';

        // If the client provided a role, then don't bother creating a new one that we don't need
        if (!props.kendraIndexProps?.roleArn) {
            indexRoleArn = CreateKendraIndexLoggingRole(scope, id);
        }
        const defaultIndexProperties = defaultKendraIndexProps(id, indexRoleArn);

        const consolidatedIndexProperties = consolidateProps(defaultIndexProperties, props.kendraIndexProps);
        const newIndex = new kendra.CfnIndex(
            scope,
            `kendra-index-${id}`,
            consolidatedIndexProperties,
        );
        addCfnSuppressRules(newIndex, [{
            id: 'W80',
            reason: 'We consulted the Kendra TFC and they confirmed the default encryption is sufficient for general use cases',
        }]);

        return newIndex;
    }
}

// function addMultipleKendraDataSources(scope: Construct,
//                                       id: string,
//                                       kendraIndex: kendra.CfnIndex,
//                                       clientDataSourceProps: Array<Partial<kendra.CfnDataSourceProps>>): kendra.CfnDataSource[] {
//
//     const returnDataSources: kendra.CfnDataSource[] = [];
//     clientDataSourceProps.forEach((props, index) => {
//         const dataSourceOutput = addKendraDataSource(scope, `${id}${index}`, kendraIndex, props);
//         returnDataSources.push(dataSourceOutput);
//     });
//     return returnDataSources;
// }
// function addKendraDataSource(scope: Construct,
//                              id: string,
//                              index: kendra.CfnIndex,
//                              clientDataSourceProps: kendra.CfnDataSourceProps | any): kendra.CfnDataSource {
//
//     if (clientDataSourceProps.type === 'S3') {
//         return createS3DataSource(scope, index, id, clientDataSourceProps);
//     } else {
//         if (clientDataSourceProps.indexId) {
//             throw new Error('Invalid DataSource prop specified - Construct must set the indexId prop');
//         }
//         return new kendra.CfnDataSource(scope, `kendra-data-source-${id}`, {
//             ...clientDataSourceProps,
//             indexId: index.attrId,
//         });
//     }
// }

function CreateKendraIndexLoggingRole(scope: Construct, id: string): string {
    const allowKendraToLogPolicy = new iam.PolicyDocument({
        statements: [
            new iam.PolicyStatement({
                resources: ['*'],
                actions: [
                    'cloudwatch:PutMetricData',
                ],
                effect: iam.Effect.ALLOW,
                conditions: {
                    StringEquals: {
                        'cloudwatch:namespace': 'AWS/Kendra',
                    },
                },
            }),
            new iam.PolicyStatement({
                resources: [`arn:aws:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/kendra/*`],
                actions: [
                    'logs:CreateLogGroup',
                ],
                effect: iam.Effect.ALLOW,
            }),
            new iam.PolicyStatement({
                resources: [`arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/kendra/*`],
                actions: [
                    'logs:DescribeLogGroups',
                ],
                effect: iam.Effect.ALLOW,
            }),
            new iam.PolicyStatement({
                resources: [`arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/kendra/*:log-stream:*`],
                actions: [
                    'logs:CreateLogStream',
                    'logs:PutLogEvents',
                    'logs:DescribeLogStream',
                ],
                effect: iam.Effect.ALLOW,
            }),
        ],
    });

    const indexRole: iam.Role = new iam.Role(scope, `kendra-index-role-${id}`, {
        assumedBy: new iam.ServicePrincipal('kendra.amazonaws.com'),
        description: 'Allow Kendra index to write CloudWatch Logs',
        inlinePolicies: {
            AllowLogging: allowKendraToLogPolicy,
        },
    });
    addCfnSuppressRules(indexRole, [{
        id: 'W11',
        reason: 'PutMetricData does not allow resource specification, ' +
            'scope is narrowed by the namespace condition. ' +
            'https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazoncloudwatch.html',
    }]);
    return indexRole.roleArn;
}

// @summary Confirm each entry is a correct value, uppercase each entry
export function normalizeKendraPermissions(rawPermissions: string[]): string[] {
    const validPermissions = ['READ', 'SUBMITFEEDBACK', 'WRITE'];

    return rawPermissions.map<string>((s) => {
        const upperCaseValue = s.toUpperCase();
        if (!validPermissions.includes(upperCaseValue)) {
            throw new Error('Invalid indexPermission value - valid values are "READ", "SUBMITFEEDBACK" and "WRITE"');
        }
        return upperCaseValue;
    });
}


/**
 * The properties for the RagAppsyncStepfnKendraProps class.
 */
export interface RagAppsyncStepfnKendraProps {
    /**
     * Cognito user pool used for authentication.
     *
     * @default - None
     */
    readonly cognitoUserPool: cognito.IUserPool;

    observability: boolean;
    stage: any;
    /**
     *
     *
     * @default - Optional user provided props to override the default props for the Kendra index. Is this required?
     */
    readonly kendraIndexProps?: kendra.CfnIndexProps;
    /**
     * A list of data sources that will provide data to the Kendra index. ?At least 1 must be specified. We will do majority of
     * processing for some data sources (S3 crawler initially), but for others the props must be complete (e.g. proper roleArn, etc.)
     *
     * @default - empty list (no data sources)
     */
    readonly kendraDataSourcesProps: Array<kendra.CfnDataSourceProps | any>;
    /**
     * Optional - index permissions to grant to the Lambda function. One or more of the following
     * may be specified: `Read`, `SubmitFeedback` and `Write`. Default is `["Read", "SubmitFeedback"]`. Read is
     * all the operations IAM defines as Read and List. SubmitFeedback is only the SubmitFeedback action. Write is all the
     * operations IAM defines as Write and Tag. This functionality may be overridden by providing a specific role arn in lambdaFunctionProps
     *
     * @default - ["Read", "SubmitFeedback"]
     */
    readonly indexPermissions?: string[];
    /**
     * Existing instance of a Kendra Index. Providing both this and kendraIndexProps will cause an error.
     *
     * @default - None
     */
    readonly existingKendraIndexObj?: kendra.CfnIndex;
    /**
     * Existing instance of Lambda Function object, providing both this and `lambdaFunctionProps` will cause an error.
     *
     * @default - None
     */
    readonly existingLambdaObj?: lambda.Function;
    /**
     * User provided props to override the default props for the Lambda function.
     *
     * @default - Default properties are used.
     */
    readonly lambdaFunctionProps?: lambda.FunctionProps;
    /**
     * An existing VPC for the construct to use (construct will NOT create a new VPC in this case)
     */
    readonly existingVpc?: ec2.IVpc;
    /**
     * Properties to override default properties if deployVpc is true
     */
    readonly vpcProps?: ec2.VpcProps;
    /**
     * Whether to deploy a new VPC
     *
     * @default - false
     */
    readonly deployVpc?: boolean;
    /**
     * Optional Name for the Lambda function environment variable set to the index id for the Kendra index.
     *
     * @default - KENDRA_INDEX_ID
     */
    readonly indexIdEnvironmentVariableName?: string;
}

/**
 * @summary The RagAppsyncStepfnKendra class.
 */
export class RagAppsyncStepfnKendra extends Construct {
    public readonly vpc?: ec2.IVpc;
    public readonly kendraIndex?: kendra.CfnIndex;
    public readonly kendraInputBucket: Bucket;

    public readonly graphqlApi: appsync.IGraphqlApi;
    private readonly kendraIndexId: string;
    private readonly awsRegion: string;
    private readonly awsAccountId: string;
    private kendraInputBucketArn: string;

    /**
     * Returns an instance of appsync.IGraphqlApi created by the construct
     */

    private docProcessingStateMachine: StateMachine;
    private stepFunctionsExecutionHandlerRole: cdk.aws_iam.Role;
    private syncRunTable: Table;
  //   TODO(miketran): Right now, we support S3, then eventually will open it up to other data sources.
    private kendraDataSourceIndexId: string;


    /**
     * @summary Constructs a new instance of the RagAppsyncStepfnKendra class.
     * @param {cdk.App} scope - represents the scope for all the resources.
     * @param {string} id - this is a scope-unique id.
     * @param {RagAppsyncStepfnKendraProps} props - user provided props for the construct.
     * @since 0.0.0
     * @access public
     */
    constructor(scope: Construct, id: string, props: RagAppsyncStepfnKendraProps) {
        super(scope, id);
        this.awsAccountId = cdk.Stack.of(this).account;
        this.awsRegion = cdk.Stack.of(this).region;

        // Staging environment
        let stage = '-dev';
        if (props?.stage) {
            stage = props.stage;
        }

        let enableXRay = true;
        let apiLogConfig = {
            fieldLogLevel: appsync.FieldLogLevel.ALL,
            retention: logs.RetentionDays.TEN_YEARS,
        };

        if (props.observability === false) {
            enableXRay = false;
            apiLogConfig = {
                fieldLogLevel: appsync.FieldLogLevel.NONE,
                retention: logs.RetentionDays.TEN_YEARS,
            };
        }

        if (props.kendraIndexProps && props.existingKendraIndexObj) {
            throw new Error('You may not provide both kendraIndexProps and existingKendraIndexObj');
        }

        if (props.kendraIndexProps && props.kendraDataSourcesProps) {
            throw new Error('You may not provide both kendraDataSourcesProps and existingKendraIndexObj');
        }

        if (props.deployVpc || props.existingVpc) {
            this.vpc = buildVpc(scope, {
                defaultVpcProps: DefaultIsolatedVpcProps(),
                existingVpc: props.existingVpc,
                userVpcProps: props.vpcProps,
                constructVpcProps: {
                    enableDnsHostnames: true,
                    enableDnsSupport: true,
                },
            });

            AddAwsServiceEndpoint(scope, this.vpc, ServiceEndpointTypes.KENDRA);
        }

        this.kendraIndex = buildKendraIndex(this, id, {
            kendraIndexProps: props.kendraIndexProps,
            existingIndexObj: props.existingKendraIndexObj,
        });

        this.kendraIndexId = this.kendraIndex.attrId;


        // TODO(miketran): Handle multiple data sources in the future.
        // this.kendraDataSources = addMultipleKendraDataSources(this, id, this.kendraIndex, props.kendraDataSourcesProps);
        // this.kendraInputBucket = this.kendraDataSources.filter((dataSource: CfnDataSource) => {
        //   return dataSource.type === 'S3';
        // })[0];


        this.kendraInputBucket = new Bucket(this, 'kendraInputBucket', {
            accessControl: BucketAccessControl.PRIVATE,
            enforceSSL: true,
            eventBridgeEnabled: true,
        });
        this.kendraInputBucketArn = this.kendraInputBucket.bucketArn;

        this.kendraInputBucket.addCorsRule({
            allowedOrigins: ['*'],
            allowedMethods: [HttpMethods.GET, HttpMethods.PUT, HttpMethods.POST, HttpMethods.DELETE, HttpMethods.HEAD],
            allowedHeaders: ['*'],
            exposedHeaders: ['ETag'], // For Storage Put with Object size > 5MB
            maxAge: 3000,
        });

        const kendraACL = [
            {
                keyPrefix: `s3://${this.kendraInputBucket.bucketName}/public/BusinessTeam1/`,
                aclEntries: [
                    {
                        Name: 'BusinessTeam1',
                        Type: 'GROUP',
                        Access: 'ALLOW',
                    },
                    {
                        Name: 'Admin',
                        Type: 'GROUP',
                        Access: 'ALLOW',
                    },
                ],
            },
            {
                keyPrefix: `s3://${this.kendraInputBucket.bucketName}/public/BusinessTeam2/`,
                aclEntries: [
                    {
                        Name: 'BusinessTeam2',
                        Type: 'GROUP',
                        Access: 'ALLOW',
                    },
                    {
                        Name: 'Admin',
                        Type: 'GROUP',
                        Access: 'ALLOW',
                    },
                ],
            },
            {
                keyPrefix: `s3://${this.kendraInputBucket.bucketName}/public/AdminsOnly/`,
                aclEntries: [
                    {
                        Name: 'Admin',
                        Type: 'GROUP',
                        Access: 'ALLOW',
                    },
                ],
            },
        ];

        const kendraAclUploader = new AwsCustomResource(this, 'kendraAclUploader', {
            onUpdate: {
                action: 'putObject',
                parameters: {
                    Body: JSON.stringify(kendraACL),
                    Bucket: this.kendraInputBucket.bucketName,
                    CacheControl: 'max-age=0, no-cache, no-store, must-revalidate',
                    ContentType: 'application/json',
                    Key: 'kendra_acl.json',
                },
                physicalResourceId: PhysicalResourceId.of('kendra_acl'),
                service: 'S3',
            },
            policy: AwsCustomResourcePolicy.fromStatements([
                new PolicyStatement({
                    actions: ['s3:PutObject'],
                    resources: [this.kendraInputBucket.arnForObjects('kendra_acl.json')],
                }),
            ]),
        });

        this.kendraIndex.node.addDependency(kendraAclUploader);


        new cdk.CfnOutput(this, 'KendraAccessControlListUrl', {
            value: `s3://${this.kendraInputBucket.bucketName}/kendra_acl.json`,
        });

        const ingestionGraphqlApi = new appsync.GraphqlApi(
            this,
            'ingestionGraphqlApi',
            {
                name: 'ingestionGraphqlApi' + stage,
                definition: appsync.Definition.fromFile(
                    path.join(__dirname, '../../../../resources/gen-ai/aws-rag-appsync-stepfn-kendra/schema.graphql'),
                ),
                authorizationConfig: {
                    defaultAuthorization: {
                        authorizationType: appsync.AuthorizationType.USER_POOL,
                        userPoolConfig: {userPool: props.cognitoUserPool},
                    },
                    additionalAuthorizationModes: [
                        {
                            authorizationType: appsync.AuthorizationType.IAM,
                        },
                    ],
                },
                xrayEnabled: enableXRay,
                logConfig: apiLogConfig,
            },
        );
        this.graphqlApi = ingestionGraphqlApi;

        this.createKendraWorkflowStepFunction();
        this.createStepFunctionsExecutionHandlerRole();
        this.createSyncRunTable();

        // // Update Lambda function IAM policy with correct privileges to Kendra index
        // const normalizedPermissions = props.indexPermissions ? normalizeKendraPermissions(props.indexPermissions) : undefined;
        //
        // // Configure environment variables to pass to lambdas
        // const indexIdEnvironmentVariableName = props.indexIdEnvironmentVariableName || 'KENDRA_INDEX_ID';


    }

    private createStepFunctionsExecutionHandlerRole() {
        this.stepFunctionsExecutionHandlerRole = new cdk.aws_iam.Role(
            this,
            "stepFunctionsExecutionHandlerRole",
            {
                description: "Role used by the stepFunctionsExecutionHandlerFn Lambda function",
                assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
            }
        );
        this.stepFunctionsExecutionHandlerRole.node.addDependency(this.docProcessingStateMachine)

        this.stepFunctionsExecutionHandlerRole.addManagedPolicy(
            cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
                "service-role/AWSLambdaBasicExecutionRole"
            )
        );

        this.stepFunctionsExecutionHandlerRole.addToPolicy(
            new cdk.aws_iam.PolicyStatement({
                actions: ["states:StartExecution"],
                resources: [
                    this.docProcessingStateMachine.stateMachineArn
                ],
            })
        );
    }

    private createUpdateKendraJobStatusFn(): cdk.aws_lambda.Function {

        let updateKendraJobStatusRole = new cdk.aws_iam.Role(
            this,
            "updateKendraJobStatus",
            {
                description: "Role used by the Document Status Update Lambda function",
                assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
            }
        );

        updateKendraJobStatusRole.addManagedPolicy(
            cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
                "service-role/AWSLambdaBasicExecutionRole"
            )
        );

        updateKendraJobStatusRole.addToPolicy(
            new cdk.aws_iam.PolicyStatement({
                actions: ["dynamodb:PutItem", "dynamodb:Query", "dynamodb:GetItem", "dynamodb:UpdateItem"],
                resources: [this.syncRunTable.tableArn],
            })
        );

        return new cdk.aws_lambda.Function(
            this,
            "updateKendraJobStatusFn",
            {
                runtime: cdk.aws_lambda.Runtime.PYTHON_3_10,
                handler: "update_job_status.lambda_handler",
                code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-rag-appsync-stepfn-kendra/kendra_job_manager/')),
                timeout: cdk.Duration.seconds(30),
                role: updateKendraJobStatusRole,
                environment: {
                    DOCUMENTS_TABLE: this.syncRunTable.tableName
                },
            }
        );
    }

    private createCheckJobsStatusFn(): cdk.aws_lambda.Function {

        const checkJobStatusRole = new cdk.aws_iam.Role(
            this,
            "textTractLambdaRole",
            {
                description: "Role used by the Text Extract Lambda function",
                assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
            }
        );

        checkJobStatusRole.addManagedPolicy(
            cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
                "service-role/AWSLambdaBasicExecutionRole"
            )
        );

        checkJobStatusRole.addToPolicy(
            new cdk.aws_iam.PolicyStatement({
                actions: ["kendra:ListDataSourceSyncJobs"],
                resources: [`arn:aws:kendra:${this.awsRegion}:${this.awsAccountId}:index/${this.kendraIndexId}`],
            })
        );
        checkJobStatusRole.addToPolicy(
            new cdk.aws_iam.PolicyStatement({
                actions: ["kendra:ListDataSourceSyncJobs"],
                resources: [`arn:aws:kendra:${this.awsRegion}:${this.awsAccountId}:index/${this.kendraIndexId}/data-source/${this.kendraDataSourceIndexId}`],
            })
        );


        return new cdk.aws_lambda.Function(
            this,
            "checkJobStatusFN",
            {
                runtime: cdk.aws_lambda.Runtime.PYTHON_3_10,
                handler: 'check_sync_status.lambda_handler',
                code: cdk.aws_lambda.Code.fromAsset("../lambdas/kendra_sync_status"),
                timeout: cdk.Duration.seconds(60),
                memorySize: 256,
                role: checkJobStatusRole,
                environment: {
                    KENDRA_INDEX_ID: this.kendraIndexId,
                    KENDRA_DATA_SOURCE_INDEX_ID: this.kendraDataSourceIndexId,
                    DOCUMENTS_TABLE: this.syncRunTable.tableName
                }
            }
        );
    }

    private createSyncRunTable() {
        this.syncRunTable = new cdk.aws_dynamodb.Table(this, "SyncRunTable", {
            partitionKey: {
                name: "Id",
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: "CreatedOn",
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            encryption: cdk.aws_dynamodb.TableEncryption.AWS_MANAGED,
            billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY
        });
    }


    private createKendraStartDataSync(): cdk.aws_lambda.Function {

        let startDataSyncRole = new cdk.aws_iam.Role(
            this,
            "startDataSyncRole",
            {
                description: "Role used by the Document Status Update Lambda function",
                assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
            }
        );

        startDataSyncRole.addManagedPolicy(
            cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
                "service-role/AWSLambdaBasicExecutionRole"
            )
        );

        startDataSyncRole.addToPolicy(
            new cdk.aws_iam.PolicyStatement({
                actions: ["dynamodb:PutItem", "dynamodb:Query", "dynamodb:GetItem", "dynamodb:UpdateItem"],
                resources: [this.syncRunTable.tableArn],
            })
        );

        startDataSyncRole.addToPolicy(
            new cdk.aws_iam.PolicyStatement({
                actions: ["kendra:StartDataSourceSyncJob"],
                resources: [
                    `arn:aws:kendra:${this.awsRegion}:${this.awsAccountId}:index/${this.kendraIndexId}`,
                    `arn:aws:kendra:${this.awsRegion}:${this.awsAccountId}:index/${this.kendraIndexId}/data-source/${this.kendraDataSourceIndexId}`,
                ],
            }))

        return new cdk.aws_lambda.Function(
            this,
            "kendraStartDataSync",
            {
                runtime: cdk.aws_lambda.Runtime.PYTHON_3_10,
                handler: "start_sync.lambda_handler",
                code: cdk.aws_lambda.Code.fromAsset("../lambdas/kendra_sync"),
                timeout: cdk.Duration.seconds(30),
                role: startDataSyncRole,
                environment: {
                    KENDRA_INDEX_ID: this.kendraIndexId,
                    KENDRA_DATA_SOURCE_INDEX_ID: this.kendraDataSourceIndexId,
                    DOCUMENTS_TABLE: this.syncRunTable.tableName
                },
            }
        );
    }

    private createKendraWorkflowStepFunction() {
        const updateKendraJobStatusFn = this.createUpdateKendraJobStatusFn();
        const docProcessingLogGroup = new cdk.aws_logs.LogGroup(this, "DocProcessingStateMachineLog", {
            removalPolicy: RemovalPolicy.DESTROY,
        });
        // TODO(miketran): Eventually make this event driven
        const waitFor30Secs = new cdk.aws_stepfunctions.Wait(this, 'Wait 30 Seconds', {
            time: cdk.aws_stepfunctions.WaitTime.duration(cdk.Duration.seconds(30))
        });

        const getKendraJobStatus = new cdk.aws_stepfunctions_tasks.LambdaInvoke(this, 'Get Textract Job Status', {
            lambdaFunction: this.createCheckJobsStatusFn(),
            // Lambda's result in a field called "status" in the response
            outputPath: '$.Payload',
        });

        // Step function Def
        const docProcessingDefinition = new cdk.aws_stepfunctions_tasks.LambdaInvoke(
            this,
            "Starts a new Kendra Data Sync Job",
            {
                lambdaFunction: this.createKendraStartDataSync(),
                outputPath: "$.Payload",
            }
        )
            .next(getKendraJobStatus)
            .next(new cdk.aws_stepfunctions.Choice(this, "Kendra DataSync Job Complete?")
                .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'FAILED'),
                    new cdk.aws_stepfunctions_tasks.LambdaInvoke(
                        this,
                        "Update Document Status as Failure",
                        {
                            lambdaFunction: updateKendraJobStatusFn,
                            outputPath: "$.Payload",
                        }
                    ))
                .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'ABORTED'),
                    new cdk.aws_stepfunctions_tasks.LambdaInvoke(
                        this,
                        "Update Document Status as Aborted",
                        {

                            lambdaFunction: updateKendraJobStatusFn,
                            outputPath: "$.Payload",
                        }
                    ))
                .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'INCOMPLETE'),
                    new cdk.aws_stepfunctions_tasks.LambdaInvoke(
                        this,
                        "Update Document Status as Incomplete",
                        {
                            lambdaFunction: updateKendraJobStatusFn,
                            outputPath: "$.Payload",
                        }
                    ))
                .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'SUCCEEDED'),
                    new cdk.aws_stepfunctions_tasks.LambdaInvoke(
                        this,
                        "Update Document Status as Completed",
                        {
                            lambdaFunction: updateKendraJobStatusFn,
                            outputPath: "$.Payload",
                        }
                    )
                )
                .otherwise(waitFor30Secs.next(getKendraJobStatus))
            )

        const definitionDocProcessingBody = DefinitionBody.fromChainable(docProcessingDefinition);

        this.docProcessingStateMachine = new cdk.aws_stepfunctions.StateMachine(
            this,
            "DocProcessingStateMachine",
            {
              definitionBody: definitionDocProcessingBody,
                tracingEnabled: true,
                logs: {
                    destination: docProcessingLogGroup,
                    level: cdk.aws_stepfunctions.LogLevel.ALL,
                },
            }
        );
    }

}
}


