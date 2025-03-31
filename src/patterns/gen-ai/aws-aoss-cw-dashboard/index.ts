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

import { Duration, Aws } from 'aws-cdk-lib';
import {
  Metric,
  Dashboard,
  GraphWidget,
  GraphWidgetView,
  Stats,
  TextWidget,
} from 'aws-cdk-lib/aws-cloudwatch';
import { CfnCollection } from 'aws-cdk-lib/aws-opensearchserverless';
import { Construct } from 'constructs';


/**
 * The properties for the CollectionMonitoringProps class.
 */
export interface CollectionMonitoringProps {
  /*
    * Optional - The period over which the specified statistic is applied.
    * @default - 1 hour
    */
  readonly period?: Duration;

  /*
    * Optional - The client ID to use.
    * @default - Account ID
    */
  readonly clientId?: string;
}

/**
 * The properties for the CollectionMonitoringProps class.
 */
export interface IndexMonitoringProps {
  /*
    * Optional - The period over which the specified statistic is applied.
    * @default - 1 hour
    */
  readonly period?: Duration;
  /*
    * Optional - The client ID to use.
    * @default - Account ID
    */
  readonly clientId?: string;
}

/**
 * The properties for the BedrockCwDashboardProps class.
 */
export interface AossCwDashboardProps {

  /**
   * Optional An existing dashboard where metrics will be added to.
   * If not provided, the construct will create a new dashboard
   *
   * @default - none
   */
  readonly existingDashboard?: Dashboard;

  /**
   * Optional A name for the dashboard which will be created.
   * If existingDashboard is defined, this value will be ignored.
   * If not provided, the construct will create a new dashboard named 'BedrockMetricsDashboard'
   *
   * @default - none
   */
  readonly dashboardName?: string;
}

/**
 * The BedrockCwDashboard class.
 */
export class AossCwDashboard extends Construct {

  /**
   * Returns the instance of CloudWatch dashboard used by the construct
   */
  public readonly dashboard: Dashboard;

  /**
   * Constructs a new instance of the AossCwDashboard class.
   * @param {cdk.App} scope - represents the scope for all the resources.
   * @param {string} id - this is a a scope-unique id.
   * @param {AossCwDashboardProps} props - user provided props for the construct.
   * @since 0.0.0
   * @public
   */
  constructor(scope: Construct, id: string, props: AossCwDashboardProps) {
    super(scope, id);

    this.dashboard = props.existingDashboard ?? new Dashboard(this, 'AossMetricsDashboard', {
      dashboardName: props.dashboardName ?? 'AossMetricsDashboard',
    });
  }

  /* Provide metrics for a specific aoss collection
   * @param {string} collectionName - Name of the aoss collection to monitor.
   * @param {string} collectionId - Id of the aoss collection to monitor.
   * @param {CollectionMonitoringProps} props - user provided props for monitoring.
  */
  public addCollectionMonitoringbyAttributes(collectionName: string, collectionId: string, props: CollectionMonitoringProps) {

    const period = props.period ?? Duration.hours(1);
    const clientId = props.clientId ?? Aws.ACCOUNT_ID;

    const dimensionMap = {
      ClientId: clientId,
      CollectionId: collectionId,
      CollectionName: collectionName,
    };

    this.dashboard.addWidgets(new TextWidget({
      markdown: '# OpenSearch Vector Database (collection level)',
      width: 24,
    }));

    // Response codes
    this.dashboard.addWidgets(
      new GraphWidget({
        title: 'OpenSearch response codes',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [
          new Metric({
            metricName: '2xx',
            namespace: 'AWS/AOSS',
            statistic: Stats.SUM,
            dimensionsMap: dimensionMap,
            period: period,
          }),
          new Metric({
            metricName: '3xx',
            namespace: 'AWS/AOSS',
            statistic: Stats.SUM,
            dimensionsMap: dimensionMap,
            period: period,
          }),
          new Metric({
            metricName: '4xx',
            namespace: 'AWS/AOSS',
            statistic: Stats.SUM,
            dimensionsMap: dimensionMap,
            period: period,
          }),
          new Metric({
            metricName: '5xx',
            namespace: 'AWS/AOSS',
            statistic: Stats.SUM,
            dimensionsMap: dimensionMap,
            period: period,
          }),
        ],
      }),
    );

    // Search
    this.dashboard.addWidgets(
      new GraphWidget({
        title: 'Search Request Latency',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'SearchRequestLatency',
          namespace: 'AWS/AOSS',
          statistic: Stats.AVERAGE,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
      new GraphWidget({
        title: 'Search Request Errors',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'SearchRequestErrors',
          namespace: 'AWS/AOSS',
          statistic: Stats.SUM,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
    );

    // Ingestion
    this.dashboard.addWidgets(
      new GraphWidget({
        title: 'Ingestion Request Successes',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'IngestionRequestSuccess',
          namespace: 'AWS/AOSS',
          statistic: Stats.SUM,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
      new GraphWidget({
        title: 'Ingestion Request Rate',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'IngestionRequestRate',
          namespace: 'AWS/AOSS',
          statistic: Stats.AVERAGE,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
    );
    this.dashboard.addWidgets(
      new GraphWidget({
        title: 'Ingestion Request Latency',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'IngestionRequestLatency',
          namespace: 'AWS/AOSS',
          statistic: Stats.AVERAGE,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
      new GraphWidget({
        title: 'Ingestion Request Errors',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'IngestionRequestErrors',
          namespace: 'AWS/AOSS',
          statistic: Stats.SUM,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
    );


  }

  /* Provide metrics for a specific aoss collection
   * @param {string} collection - CfnCollection to monitor.
   * @param {CollectionMonitoringProps} props - user provided props for monitoring.
  */
  public addCollectionMonitoringByCollection(collection: CfnCollection, props: CollectionMonitoringProps) {

    this.addCollectionMonitoringbyAttributes(collection.name, collection.attrId, props);

  }

  /* Provide metrics for a specific aoss index
   * @param {string} collectionName - Name of the aoss collection to monitor.
   * @param {string} collectionId - Id of the aoss collection to monitor.
   * @param {string} IndexName - Name of the aoss index to monitor.
   * @param {string} IndexId - Id of the aoss index to monitor.
   * @param {IndexMonitoringProps} props - user provided props for monitoring.
  */
  public addIndexMonitoringByAtributes(
    collectionName: string,
    collectionId: string,
    IndexName: string,
    IndexId: string,
    props: IndexMonitoringProps,
  ) {

    const period = props.period ?? Duration.hours(1);
    const clientId = props.clientId ?? Aws.ACCOUNT_ID;

    const dimensionMap = {
      ClientId: clientId,
      CollectionId: collectionId,
      CollectionName: collectionName,
      IndexId: IndexId,
      IndexName: IndexName,
    };

    this.dashboard.addWidgets(new TextWidget({
      markdown: '# OpenSearch Vector Database (index level)',
      width: 24,
    }));
    this.dashboard.addWidgets(
      new GraphWidget({
        title: 'Deleted documents',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'DeletedDocuments',
          namespace: 'AWS/AOSS',
          statistic: Stats.SUM,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
      new GraphWidget({
        title: 'Searchable documents',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'SearchableDocuments',
          namespace: 'AWS/AOSS',
          statistic: Stats.SUM,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
    );
    this.dashboard.addWidgets(
      new GraphWidget({
        title: 'S3 storage consumption',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'StorageUsedInS3',
          namespace: 'AWS/AOSS',
          statistic: Stats.SUM,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
      new GraphWidget({
        title: 'Document ingestion rate',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'IngestionDocumentRate',
          namespace: 'AWS/AOSS',
          statistic: Stats.SUM,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
    );
    this.dashboard.addWidgets(
      new GraphWidget({
        title: 'Ingestion errors',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'IngestionDocumentErrors',
          namespace: 'AWS/AOSS',
          statistic: Stats.SUM,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
      new GraphWidget({
        title: 'Document data rate',
        view: GraphWidgetView.TIME_SERIES,
        width: 12,
        left: [new Metric({
          metricName: 'IngestionDataRate',
          namespace: 'AWS/AOSS',
          statistic: Stats.SUM,
          dimensionsMap: dimensionMap,
          period: period,
        })],
      }),
    );

  }
}

