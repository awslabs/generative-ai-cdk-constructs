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

import * as iam from "aws-cdk-lib/aws-iam";
import * as neptunegraph from "aws-cdk-lib/aws-neptunegraph";
import { Construct } from "constructs";
import { ArnFormat, IResource, Resource, Stack } from "aws-cdk-lib";
import { Metric, MetricOptions, MetricProps } from "aws-cdk-lib/aws-cloudwatch";
import { generatePhysicalNameV2 } from "../../common/helpers/utils";
import { NeptuneGraphNotebook, NeptuneGraphNotebookProps } from "./notebook";

/******************************************************************************
 *                              COMMON
 *****************************************************************************/
/**
 * Interface representing a Neptune Graph database.
 */
export interface INeptuneGraph extends IResource {
  /**
   * The Neptune Graph Identifier.
   * @example 'g-12a3bcdef4'
   */
  readonly graphId: string;

  /**
   * The Neptune Graph ARN.
   * @example 'arn:aws:neptune-graph:us-east-1:111122223333:graph/g-12a3bcdef4'
   */
  readonly graphArn: string;

  /**
   * The Neptune Graph endpoint.
   * @example 'g-12a3bcdef4.us-east-1.neptune-graph.amazonaws.com'
   */
  readonly graphEndpoint: string;

  /**
   * Grant the given principal identity permissions to perform actions on this agent alias.
   */
  grant(grantee: iam.IGrantable, actions: string[]): iam.Grant;

  /**
   * Grant the given identity full access to the Graph.
   */
  grantFullAccess(grantee: iam.IGrantable): iam.Grant;

  /**
   * Grant the given identity the permissions to query the Graph.
   */
  grantQuery(grantee: iam.IGrantable): iam.Grant;

  /**
   * Grant the given identity the permissions to read the Graph.
   */
  grantReadOnly(grantee: iam.IGrantable): iam.Grant;

  /**
   * Grant the given identity the permissions to export the graph into columnar structured .csv and .parquet files.
   */
  grantExportTask(grantee: iam.IGrantable): iam.Grant;

  /**
   * Return the given named metric for this guardrail.
   */
  metric(metricName: string, props?: MetricOptions): Metric;

  /**
   * Returns metric for number of queued requests per second
   */
  metricNumQueuedRequestsPerSec(props?: MetricOptions): Metric;

  /**
   * Returns metric for number of OpenCypher requests per second
   */
  metricNumOpenCypherRequestsPerSec(props?: MetricOptions): Metric;

  /**
   * Returns metric for number of OpenCypher client errors per second
   */
  metricNumOpenCypherClientErrorsPerSec(props?: MetricOptions): Metric;

  /**
   * Returns metric for number of OpenCypher server errors per second
   */
  metricNumOpenCypherServerErrorsPerSec(props?: MetricOptions): Metric;

  /**
   * Returns metric for number of edge properties
   */
  metricNumEdgeProperties(props?: MetricOptions): Metric;

  /**
   * Returns metric for number of edges
   */
  metricNumEdges(props?: MetricOptions): Metric;

  /**
   * Returns metric for CPU utilization
   */
  metricCPUUtilization(props?: MetricOptions): Metric;

  /**
   * Returns metric for number of vectors
   */
  metricNumVectors(props?: MetricOptions): Metric;

  /**
   * Returns metric for number of vertex properties
   */
  metricNumVertexProperties(props?: MetricOptions): Metric;

  /**
   * Returns metric for graph size in bytes
   */
  metricGraphSizeBytes(props?: MetricOptions): Metric;

  /**
   * Returns metric for graph storage usage percentage
   */
  metricGraphStorageUsagePercent(props?: MetricOptions): Metric;

  /**
   * Creates a Neptune Graph Notebook for the graph. Defaults to a ml.t3.medium instance type.
   * **Note: Creating a notebook will incur additional AWS costs for the notebook instance.**
   */
  createNotebook(params?: NeptuneGraphNotebookProps): NeptuneGraphNotebook;
}

/******************************************************************************
 *                        PROPS FOR NEW CONSTRUCT
 *****************************************************************************/
/**
 * Properties for creating a new Neptune Graph database
 */
export interface NeptuneGraphProps {
  /**
   * The Dimension used to save vectors.
   */
  readonly vectorSearchDimension?: number;

  /**
   * The amount of memory (in Neptune Capacity Units m-NCUs) to use for the graph.
   * @default 16
   */
  readonly provisionedMemoryNCUs?: number;

  /**
   * The graph name. The name must contain from 1 to 63 letters, numbers, or hyphens, and its first character must be a letter.
   * It cannot end with a hyphen or contain two consecutive hyphens.
   * @default - A unique graph name is generated for you using the prefix `graph-for-${StackName}-${UUID}`.
   */
  readonly graphName?: string;

  /**
   * Specifies whether or not the graph can be reachable over the internet. All access to graphs is IAM authenticated.
   * When the graph is publicly available, its domain name system (DNS) endpoint resolves to the public IP address from the internet.
   * When the graph isn't publicly available, you need to create a PrivateGraphEndpoint in a given VPC to ensure the DNS name
   * resolves to a private IP address that is reachable from the VPC.
   * @default true
   */
  readonly publicConnectivity?: boolean;

  /**
   * The number of replicas in other AZs.
   * Replicas are typically only needed for production critical workloads with strict availability requirements.
   * **Note: Each replica incurs additional cost as it maintains a full copy of the graph data.**
   * @default 0
   */
  readonly replicaCount?: number;

  /**
   * Indicates whether the Graph should have deletion protection enabled.
   * @default false
   */
  readonly deletionProtection?: boolean;
}

/******************************************************************************
 *                            BASE CLASS
 *****************************************************************************/
/**
 * Abstract base class for a Neptune Graph.
 * Contains methods and attributes valid for Graphs either created with CDK or imported.
 */
export abstract class NeptuneGraphBase extends Resource implements INeptuneGraph {
  // inherited
  public abstract readonly graphId: string;
  public abstract readonly graphArn: string;
  public abstract readonly graphEndpoint: string;

  /**
   * Grant the given principal identity permissions to perform actions on this agent alias.
   */
  public grant(grantee: iam.IGrantable, actions: string[]): iam.Grant {
    return iam.Grant.addToPrincipal({
      grantee,
      actions,
      resourceArns: [this.graphArn],
      scope: this,
    });
  }

  /**
   * Grant the given identity full access to the Graph.
   */
  public grantFullAccess(grantee: iam.IGrantable): iam.Grant {
    return this.grant(grantee, ["neptune-graph:*"]);
  }

  /**
   * Grant the given identity the permissions to query the Graph.
   */
  public grantQuery(grantee: iam.IGrantable): iam.Grant {
    return this.grant(grantee, [
      "neptune-graph:GetGraph",
      "neptune-graph:ReadDataViaQuery",
      "neptune-graph:WriteDataViaQuery",
      "neptune-graph:DeleteDataViaQuery",
      "neptune-graph:GetQueryStatus",
      "neptune-graph:CancelQuery",
    ]);
  }

  /**
   * Grant the given identity the permissions to read the Graph.
   */
  public grantReadOnly(grantee: iam.IGrantable): iam.Grant {
    return this.grant(grantee, [
      "neptune-graph:Get*",
      "neptune-graph:List*",
      "neptune-graph:Read*",
    ]);
  }

  /**
   * Grant the given identity the permissions to export the graph into columnar structured .csv and .parquet files.
   */
  public grantExportTask(grantee: iam.IGrantable): iam.Grant {
    return this.grant(grantee, [
      "neptune-graph:GetExportTask",
      "neptune-graph:ListExportTasks",
      "neptune-graph:StartExportTask",
      "neptune-graph:CancelExportTask",
    ]);
  }

  /**
   * Return the given named metric for this graph.
   *
   * By default, the metric will be calculated as a sum over a period of 5 minutes.
   * You can customize this by using the `statistic` and `period` properties.
   */
  public metric(metricName: string, props?: MetricOptions): Metric {
    const metricProps: MetricProps = {
      namespace: "AWS/Neptune",
      metricName,
      dimensionsMap: { GraphIdentifier: this.graphId },
      ...props,
    };
    return this.configureMetric(metricProps);
  }

  /**
   * Returns metric for number of queued requests per second
   */
  public metricNumQueuedRequestsPerSec(props?: MetricOptions): Metric {
    return this.metric("NumQueuedRequestsPerSec", props);
  }

  /**
   * Returns metric for number of OpenCypher requests per second
   */
  public metricNumOpenCypherRequestsPerSec(props?: MetricOptions): Metric {
    return this.metric("NumOpenCypherRequestsPerSec", props);
  }

  /**
   * Returns metric for number of OpenCypher client errors per second
   */
  public metricNumOpenCypherClientErrorsPerSec(props?: MetricOptions): Metric {
    return this.metric("NumOpenCypherClientErrorsPerSec", props);
  }

  /**
   * Returns metric for number of OpenCypher server errors per second
   */
  public metricNumOpenCypherServerErrorsPerSec(props?: MetricOptions): Metric {
    return this.metric("NumOpenCypherServerErrorsPerSec", props);
  }

  /**
   * Returns metric for number of edge properties
   */
  public metricNumEdgeProperties(props?: MetricOptions): Metric {
    return this.metric("NumEdgeProperties", props);
  }

  /**
   * Returns metric for number of edges
   */
  public metricNumEdges(props?: MetricOptions): Metric {
    return this.metric("NumEdges", props);
  }

  /**
   * Returns metric for CPU utilization
   */
  public metricCPUUtilization(props?: MetricOptions): Metric {
    return this.metric("CPUUtilization", props);
  }

  /**
   * Returns metric for number of vectors
   */
  public metricNumVectors(props?: MetricOptions): Metric {
    return this.metric("NumVectors", props);
  }

  /**
   * Returns metric for number of vertex properties
   */
  public metricNumVertexProperties(props?: MetricOptions): Metric {
    return this.metric("NumVertexProperties", props);
  }

  /**
   * Returns metric for graph size in bytes
   */
  public metricGraphSizeBytes(props?: MetricOptions): Metric {
    return this.metric("GraphSizeBytes", props);
  }

  /**
   * Returns metric for graph storage usage percentage
   */
  public metricGraphStorageUsagePercent(props?: MetricOptions): Metric {
    return this.metric("GraphStorageUsagePercent", props);
  }

  private configureMetric(props: MetricProps) {
    return new Metric({
      ...props,
      region: props?.region ?? this.stack.region,
      account: props?.account ?? this.stack.account,
    });
  }

  /**
   * Creates a Neptune Graph Notebook for the graph. Defaults to a ml.t3.medium instance type.
   * **Note: Creating a notebook will incur additional AWS costs for the notebook instance.**
   */
  public createNotebook(params?: NeptuneGraphNotebookProps): NeptuneGraphNotebook {
    return new NeptuneGraphNotebook(this, "Notebook", {
      ...params,
      graph: this,
    });
  }
}

/******************************************************************************
 *                        NEW CONSTRUCT DEFINITION
 *****************************************************************************/
/**
 * Class to create an L2 Neptune Analytics Graph with CDK.
 * @cloudformationResource AWS::NeptuneGraph::Graph
 */
export class NeptuneGraph extends NeptuneGraphBase implements INeptuneGraph {
  // ------------------------------------------------------
  // Import Methods
  // ------------------------------------------------------
  public static fromGraphId(scope: Construct, id: string, graphId: string): INeptuneGraph {
    class Import extends NeptuneGraphBase {
      public readonly graphId = graphId;
      public readonly graphArn = Stack.of(scope).formatArn({
        service: "neptune-graph",
        resource: "graph",
        resourceName: graphId,
        arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
      });
      public readonly graphEndpoint = `${this.graphId}.${
        Stack.of(scope).region
      }.neptune-graph.amazonaws.com`;
    }

    return new Import(scope, id);
  } // ------------------------------------------------------
  // Attributes
  // ------------------------------------------------------
  public readonly graphId: string;
  public readonly graphArn: string;
  public readonly graphEndpoint: string;
  public readonly provisionedMemory: number;
  public readonly graphName?: string;
  public readonly publicConnectivity: boolean;
  public readonly replicaCount: number;

  private readonly _resource: neptunegraph.CfnGraph;

  constructor(scope: Construct, id: string, props: NeptuneGraphProps) {
    super(scope, id);

    // ------------------------------------------------------
    // Set properties or defaults
    // ------------------------------------------------------
    this.provisionedMemory = props.provisionedMemoryNCUs ?? 16;
    this.graphName =
      props.graphName ??
      generatePhysicalNameV2(this, "bedrock-kb-graph", {
        separator: "-",
        maxLength: 63,
        lower: true,
      });
    this.publicConnectivity = props.publicConnectivity ?? true;
    this.replicaCount = props.replicaCount ?? 0;

    // ------------------------------------------------------
    // L1 Instantiation
    // ------------------------------------------------------
    this._resource = new neptunegraph.CfnGraph(this, "Resource", {
      provisionedMemory: this.provisionedMemory,
      graphName: this.graphName,
      publicConnectivity: this.publicConnectivity,
      replicaCount: this.replicaCount,
      vectorSearchConfiguration: props.vectorSearchDimension
        ? {
            vectorSearchDimension: props.vectorSearchDimension,
          }
        : undefined,
      deletionProtection: props.deletionProtection ?? false,
    });

    this.graphArn = this._resource.attrGraphArn;
    this.graphId = this._resource.attrGraphId;
    this.graphEndpoint = this._resource.attrEndpoint;
  }
}
