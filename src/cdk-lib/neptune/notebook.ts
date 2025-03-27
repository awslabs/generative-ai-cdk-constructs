import { CfnOutput, Fn, Resource, Size, Stack } from "aws-cdk-lib";

import { Construct } from "constructs";
import * as sagemaker from "aws-cdk-lib/aws-sagemaker";
import { INeptuneGraph } from "./graph";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { generatePhysicalNameV2 } from "../../common/helpers/utils";

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a new Neptune Graph Notebook
 */
export interface NeptuneGraphNotebookProps {
  /**
   * The Neptune Analytics Graph this notebook will be connected to
   */
  readonly graph: INeptuneGraph;

  /**
   * The instance type of the notebook instance
   * @default "ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM)"
   */
  readonly instanceType?: ec2.InstanceType;

  /**
   * The size of the EBS volume
   * @default - 5 GiB
   */
  readonly volumeSize?: Size;
}

/**
 * Creates a Neptune Graph Notebook for a given graph.
 *
 * A Neptune Graph Notebook provides:
 * - Web-based interactive environment for querying and visualizing graph data
 * - Support for multiple query languages:
 *   - OpenCypher for property graph queries
 *   - Gremlin for traversal-based queries
 *   - SPARQL for RDF graph queries
 * - Built-in visualization capabilities for exploring graph relationships
 * - Sample notebooks and tutorials to help you get started
 * - Integration with popular data science libraries   *
 * This option is only supported when `publicConnectivity` is set to `true`. For private graphs,
 * you should create your own notebook deployment using the `NeptuneGraphNotebook` Construct and
 * configure the appropriate VPC and security group settings.
 *
 * **Note: Creating a notebook will incur additional AWS costs for the notebook instance.**
 *
 * @see https://docs.aws.amazon.com/neptune/latest/userguide/graph-notebooks.html
 */
export class NeptuneGraphNotebook extends Resource {
  // ------------------------------------------------------
  // Properties
  // ------------------------------------------------------

  public readonly role: iam.Role;
  public readonly lifecycleConfig: sagemaker.CfnNotebookInstanceLifecycleConfig;
  public readonly volumeSize: Size;
  public readonly instanceType: ec2.InstanceType;
  public readonly graphExplorerEndpoint: string;
  public readonly jupyterLabEndpoint: string;
  private readonly __resource: sagemaker.CfnNotebookInstance;

  // ------------------------------------------------------
  // Attributes
  // ------------------------------------------------------
  constructor(scope: Construct, id: string, props: NeptuneGraphNotebookProps) {
    super(scope, id);

    const region = Stack.of(scope).region;

    // Set properties
    this.volumeSize = props.volumeSize ?? Size.gibibytes(5);
    this.instanceType =
      props.instanceType ?? ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM);

    // Create lifecycle configuration for Neptune notebook
    this.lifecycleConfig = new sagemaker.CfnNotebookInstanceLifecycleConfig(
      this,
      "NeptuneNotebookLifecycle",
      {
        onStart: [
          {
            content: Fn.base64(
              `#!/bin/bash
sudo -u ec2-user -i <<'EOF'

echo "export GRAPH_NOTEBOOK_AUTH_MODE=IAM" >> ~/.bashrc
echo "export GRAPH_NOTEBOOK_SSL=True" >> ~/.bashrc
echo "export GRAPH_NOTEBOOK_SERVICE=neptune-graph" >> ~/.bashrc
echo "export GRAPH_NOTEBOOK_HOST=${props.graph.graphEndpoint}" >> ~/.bashrc
echo "export GRAPH_NOTEBOOK_PORT=8182" >> ~/.bashrc
echo "export NEPTUNE_LOAD_FROM_S3_ROLE_ARN=" >> ~/.bashrc
echo "export AWS_REGION=${region}" >> ~/.bashrc

aws s3 cp s3://aws-neptune-notebook-${region}/graph_notebook.tar.gz /tmp/graph_notebook.tar.gz
rm -rf /tmp/graph_notebook
tar -zxvf /tmp/graph_notebook.tar.gz -C /tmp
/tmp/graph_notebook/install.sh

EOF`
            ),
          },
        ],
      }
    );

    // Creates a role associated to the notebook instance
    this.role = new iam.Role(this, "NeptuneNotebookRole", {
      assumedBy: new iam.ServicePrincipal("sagemaker.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSageMakerFullAccess"),
        // Allows downloading the graph_notebook package
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3ReadOnlyAccess"),
      ],
    });

    // Allows the notebook to access the graph
    props.graph.grantFullAccess(this.role);

    // ------------------------------------------------------
    // Set properties or defaults
    // ------------------------------------------------------
    this.__resource = new sagemaker.CfnNotebookInstance(this, "Resource", {
      instanceType: `ml.${this.instanceType.toString()}`,
      roleArn: this.role.roleArn,
      lifecycleConfigName: this.lifecycleConfig.attrNotebookInstanceLifecycleConfigName,
      notebookInstanceName: generatePhysicalNameV2(this, "aws-neptune-notebook", {
        separator: "-",
        maxLength: 63,
        lower: true,
      }),
      volumeSizeInGb: this.volumeSize.toGibibytes(),
      platformIdentifier: "notebook-al2-v2",
      rootAccess: "Disabled",
      instanceMetadataServiceConfiguration: {
        minimumInstanceMetadataServiceVersion: "2",
      },
      directInternetAccess: "Enabled",
      tags: [
        {
          key: "aws-neptune-graph-id",
          value: props.graph.graphId,
        },
      ],
    });

    this.graphExplorerEndpoint = `https://${this.__resource.attrNotebookInstanceName}.notebook.${region}.sagemaker.aws/proxy/9250/explorer/`;
    this.jupyterLabEndpoint = `https://${this.__resource.attrNotebookInstanceName}.notebook.${region}.sagemaker.aws/lab`;

    // Output Graph Explorer Endpoint
    new CfnOutput(this, "GraphExplorerEndpoint", {
      value: this.graphExplorerEndpoint,
    });
  }
}
