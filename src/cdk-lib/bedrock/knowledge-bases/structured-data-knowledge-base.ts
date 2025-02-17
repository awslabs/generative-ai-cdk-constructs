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

import { ArnFormat, Stack } from 'aws-cdk-lib';
import * as bedrock from 'aws-cdk-lib/aws-bedrock';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { CommonKnowledgeBaseAttributes, CommonKnowledgeBaseProps, IKnowledgeBase, KnowledgeBaseBase, KnowledgeBaseType } from './knowledge-base';
import { generatePhysicalNameV2 } from '../../../common/helpers/utils';

/**
 * The type of SQL database to connect to the knowledge base.
 */
export enum SqlDatabaseType {
  REDSHIFT = 'REDSHIFT'
}

/**
 * The type of query engine.
 */
export enum RedshiftQueryEngineType {
  SERVERLESS = 'SERVERLESS',
  PROVISIONED = 'PROVISIONED'
}

/**
 * The type of data storage service.
 */
export enum RedshiftQueryEngineStorageType {
  REDSHIFT = 'REDSHIFT',
  AWS_DATA_CATALOG = 'AWS_DATA_CATALOG'
}

export enum RedshiftAuthenticationType {
  IAM = 'IAM',
  USERNAME_PASSWORD = 'USERNAME_PASSWORD',
  USERNAME = 'USERNAME'
}

/**
 * Represents a Knowledge Base, either created with CDK or imported.
 */
export interface ISqlKnowledgeBase extends IKnowledgeBase {

  /**
   * Grant the given identity permissions to retrieve content from the knowledge base.
   */
  grantRetrieve(grantee: iam.IGrantable): iam.Grant;

  /**
   * Grant the given identity permissions to retrieve content from the knowledge base and generate.
   */
  grantRetrieveAndGenerate(grantee: iam.IGrantable): iam.Grant;
}

/******************************************************************************
 *                              ABSTRACT CLASS
 *****************************************************************************/
/**
 * Abstract base class for Sql Knowledge Base.
 * Contains methods valid for KBs either created with CDK or imported.
 */
abstract class SqlKnowledgeBaseBase extends KnowledgeBaseBase implements ISqlKnowledgeBase {
  public abstract readonly knowledgeBaseArn: string;
  public abstract readonly knowledgeBaseId: string;
  public abstract readonly role: iam.IRole;
  public abstract readonly description?: string;
  public readonly instruction?: string;
  public readonly type: KnowledgeBaseType = KnowledgeBaseType.SQL;

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for a Sql knowledge base.
 */
export interface SqlKnowledgeBaseProps extends CommonKnowledgeBaseProps {

  /**
   * @default - Amazon Redshift is the only and default query engine for Sql KB for now.
   */
  readonly sqlDatabaseType?: SqlDatabaseType;

  /**
   * The type of query engine, which can be of `SERVERLESS` or `PROVISIONED` types.
   */
  readonly redshiftQueryEngineType: RedshiftQueryEngineType;

  /**
     * The Amazon Redshift provisioned configuration.
     * If redshiftQueryEngineType is not of type `PROVISIONED`,
     * do not include this property as it will throw error.
     */
  readonly redshiftProvisionedConfiguration?: bedrock.CfnKnowledgeBase.RedshiftProvisionedConfigurationProperty;

  /**
   * The Amazon Redshift serverless configuration.
   * If redshiftQueryEngineType is not of type `SERVERLESS`,
   * do not include this property as it will throw error.
   */
  readonly redshiftServerlessConfiguration?: bedrock.CfnKnowledgeBase.RedshiftServerlessConfigurationProperty;

  /**
   * The storage configuration for AWS Glue Data Catalog.
   * If redshiftQueryEngineStorageType is not of type `AWS_DATA_CATALOG`,
   * do not include this property as it will throw error.
   */
  readonly redshiftQueryEngineAwsDataCatalogStorageConfiguration?: bedrock.CfnKnowledgeBase
    .RedshiftQueryEngineAwsDataCatalogStorageConfigurationProperty;

  /**
   * The storage configuration for Amazon Redshift.
   * If redshiftQueryEngineStorageType is no of type `REDSHIFT`,
   * do not include this property as it will throw error.
   */
  readonly redshiftQueryEngineRedshiftStorageConfiguration?: bedrock.CfnKnowledgeBase.RedshiftQueryEngineRedshiftStorageConfigurationProperty;

  /**
   * The type of data storage service, which can be of `REDSHIFT`, `AWS_DATA_CATALOG` types.
   */
  readonly redshiftQueryEngineStorageType: RedshiftQueryEngineStorageType;

  /**
   * The query generation configuration.
   */
  readonly queryGenerationConfiguration?: bedrock.CfnKnowledgeBase.QueryGenerationConfigurationProperty | undefined;

}

/******************************************************************************
 *                      ATTRS FOR IMPORTED CONSTRUCT
 *****************************************************************************/
/**
 * Properties for importing a knowledge base outside of this stack
 */
export interface SqlKnowledgeBaseAttributes extends CommonKnowledgeBaseAttributes {

}

export class SqlKnowledgeBase extends SqlKnowledgeBaseBase {
  // ------------------------------------------------------
  // Import Methods
  // ------------------------------------------------------
  public static fromKnowledgeBaseAttributes(
    scope: Construct,
    id: string,
    attrs: SqlKnowledgeBaseAttributes,
  ): ISqlKnowledgeBase {
    const stack = Stack.of(scope);

    class Import extends SqlKnowledgeBaseBase {
      public readonly role = iam.Role.fromRoleArn(this, `kb-${attrs.knowledgeBaseId}-role`, attrs.executionRoleArn);
      public readonly description = attrs.description;
      public readonly instruction = attrs.instruction;
      public readonly knowledgeBaseId = attrs.knowledgeBaseId;
      public readonly knowledgeBaseArn = stack.formatArn({
        service: 'bedrock',
        resource: 'knowledge-base',
        resourceName: attrs.knowledgeBaseId,
        arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
      });
    }
    return new Import(scope, id);
  }
  // ------------------------------------------------------
  // Attributes
  // ------------------------------------------------------
  /**
   * The name of the knowledge base.
   */
  public readonly name: string;

  /**
   * Instance of knowledge base.
   */
  public readonly knowledgeBaseInstance?: bedrock.CfnKnowledgeBase;

  /**
   * The ARN of the knowledge base.
   */
  public readonly knowledgeBaseArn: string;

  /**
   * The ID of the knowledge base.
   */
  public readonly knowledgeBaseId: string;

  /**
   * The role the Knowledge Base uses to access the vector store and data source.
   */
  public readonly role: iam.IRole;

  /**
   * A description of the knowledge base.
   */
  readonly description?: string;

  /**
   * The type of the query engine.
   */
  readonly sqlDatabaseType: SqlDatabaseType;

  constructor(scope: Construct, id: string, props: SqlKnowledgeBaseProps) {
    super(scope, id);

    // ------------------------------------------------------
    // Set properties or defaults
    // ------------------------------------------------------
    this.sqlDatabaseType = props.sqlDatabaseType ?? SqlDatabaseType.REDSHIFT;
    this.name = props.name ?? generatePhysicalNameV2(this, 'KB', { maxLength: 32 });
    this.description = props.description ?? 'CDK deployed Knowledge base';

    validateConfigs(props);

    if (props.existingRole) {
      this.role = props.existingRole;
    } else {
      const roleName = generatePhysicalNameV2(this, 'AmazonBedrockExecutionRoleForKnowledgeBase', { maxLength: 64 });
      this.role = new iam.Role(this, 'Role', {
        roleName: roleName,
        assumedBy: new iam.ServicePrincipal('bedrock.amazonaws.com', {
          conditions: {
            StringEquals: { 'aws:SourceAccount': Stack.of(this).account },
            ArnLike: {
              'aws:SourceArn': Stack.of(this).formatArn({
                service: 'bedrock',
                resource: 'knowledge-base',
                resourceName: '*',
                arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
              }),
            },
          },
        }),
      });

      this.role.addToPrincipalPolicy(
        new iam.PolicyStatement({
          actions: [
            'redshift-data:*',
            'sqlworkbench:*',
            'secretsmanager:GetSecretValue',
            'redshift-serverless:*',
            'bedrock:*',
          ],
          resources: ['*'],
        }),
      );
    }

    // ------------------------------------------------------
    // L1 Instantiation
    // ------------------------------------------------------
    const knowledgeBase = new bedrock.CfnKnowledgeBase(this, 'MyCfnKnowledgeBase', {
      knowledgeBaseConfiguration: {
        type: KnowledgeBaseType.SQL,
        sqlKnowledgeBaseConfiguration: {
          type: this.sqlDatabaseType,
          redshiftConfiguration: {
            queryEngineConfiguration: {
              provisionedConfiguration: props.redshiftProvisionedConfiguration,
              serverlessConfiguration: props.redshiftServerlessConfiguration,
              type: props.redshiftQueryEngineType,
            },
            queryGenerationConfiguration: props.queryGenerationConfiguration,
            storageConfigurations: [
              {
                awsDataCatalogConfiguration: props.redshiftQueryEngineAwsDataCatalogStorageConfiguration,
                redshiftConfiguration: props.redshiftQueryEngineRedshiftStorageConfiguration,
                type: props.redshiftQueryEngineStorageType,
              },
            ],
          },
        },
      },
      name: this.name,
      roleArn: this.role.roleArn,
      description: this.description,
    });

    this.knowledgeBaseInstance = knowledgeBase;
    this.knowledgeBaseArn = knowledgeBase.attrKnowledgeBaseArn;
    this.knowledgeBaseId = knowledgeBase.attrKnowledgeBaseId;
  }
}

/**
 * Validate that the Sql Knowledge configuration set correctly.
 * It prevents the wrong use of configurations of query engine and storage types together.
 */
function validateConfigs(props: SqlKnowledgeBaseProps) {
  if (props.sqlDatabaseType === SqlDatabaseType.REDSHIFT) {
    if (!props.redshiftProvisionedConfiguration && !props.redshiftServerlessConfiguration) {
      throw new Error('RedshiftProvisionedConfiguration or RedshiftServerlessConfiguration must be provided.');
    }
    if (props.redshiftQueryEngineType === RedshiftQueryEngineType.SERVERLESS && props.redshiftProvisionedConfiguration) {
      throw new Error('RedshiftProvisionedConfiguration is not supported for RedshiftQueryEngineType.SERVERLESS.');
    }
    if (props.redshiftQueryEngineType === RedshiftQueryEngineType.PROVISIONED && props.redshiftServerlessConfiguration) {
      throw new Error('RedshiftServerlessConfiguration is not supported for RedshiftQueryEngineType.PROVISIONED.');
    }
    if (!props.redshiftQueryEngineAwsDataCatalogStorageConfiguration && !props.redshiftQueryEngineRedshiftStorageConfiguration) {
      throw new Error('RedshiftQueryEngineAwsDataCatalogStorageConfiguration or RedshiftQueryEngineRedshiftStorageConfiguration must be provided.');
    }
    if (props.redshiftQueryEngineStorageType === RedshiftQueryEngineStorageType.AWS_DATA_CATALOG
      && props.redshiftQueryEngineRedshiftStorageConfiguration) {
      throw new Error('RedshiftQueryEngineRedshiftStorageConfiguration is not supported for RedshiftQueryEngineStorageType.AWS_DATA_CATALOG.');
    }
    if (props.redshiftQueryEngineStorageType === RedshiftQueryEngineStorageType.REDSHIFT
      && props.redshiftQueryEngineAwsDataCatalogStorageConfiguration) {
      throw new Error('RedshiftQueryEngineAwsDataCatalogStorageConfiguration is not supported for RedshiftQueryEngineStorageType.REDSHIFT.');
    }
  } else {
    throw new Error(`Only ${SqlDatabaseType.REDSHIFT} is supported.`);
  }
}