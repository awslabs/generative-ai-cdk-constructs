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
import { Duration } from 'aws-cdk-lib';
import {
  Metric,
  Dashboard,
  GraphWidget,
  SingleValueWidget,
  Row,
  Stats,
  TextWidget,
  Column,
} from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';

/**
 * The properties for the ModelMonitoringProps class.
 */
export interface ModelMonitoringProps {
  /*
    * Optional - The period over which the specified statistic is applied.
    * @default - 1 hour
    */
  readonly period?: Duration;
}

/**
 * The properties for the BedrockCwDashboardProps class.
 */
export interface BedrockCwDashboardProps {

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
export class BedrockCwDashboard extends Construct {

  /**
   * Returns the instance of CloudWatch dashboard used by the construct
   */
  public readonly dashboard: Dashboard;

  /**
   * Constructs a new instance of the BedrockCwDashboard class.
   * @param {cdk.App} scope - represents the scope for all the resources.
   * @param {string} id - this is a a scope-unique id.
   * @param {BedrockCwDashboardProps} props - user provided props for the construct.
   * @since 0.0.0
   * @public
   */
  constructor(scope: Construct, id: string, props: BedrockCwDashboardProps) {
    super(scope, id);

    this.dashboard = props.existingDashboard ?? new Dashboard(this, 'BedrockMetricsDashboard', {
      dashboardName: props.dashboardName ?? 'BedrockMetricsDashboard',
    });
  }

  /* Provide metrics for a specific model id in Bedrock
   * @param {string} modelName - Model name as it will appear in the dashboard row widget.
   * @param {string} modelId - Bedrock model id as defined in https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html
   * @param {ModelMonitoringProps} props - user provided props for the monitoring.
  */
  public addModelMonitoring(modelName: string, modelId: string, props: ModelMonitoringProps) {

    const period = props.period ?? Duration.hours(1);

    const modelInputTokensMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InputTokenCount',
      dimensionsMap: {
        ModelId: modelId,
      },
      statistic: Stats.SUM,
      period: period,
    });

    const modelOutputTokensMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'OutputTokenCount',
      dimensionsMap: {
        ModelId: modelId,
      },
      statistic: Stats.SUM,
      period: period,
    });

    const modelLatencyAvgMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationLatency',
      dimensionsMap: {
        ModelId: modelId,
      },
      statistic: Stats.AVERAGE,
      period: period,
    });

    const modelLatencyMinMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationLatency',
      dimensionsMap: {
        ModelId: modelId,
      },
      statistic: Stats.MINIMUM,
      period: period,
    });

    const modelLatencyMaxMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationLatency',
      dimensionsMap: {
        ModelId: modelId,
      },
      statistic: Stats.MAXIMUM,
      period: period,
    });

    const modelInvocationsCountMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'Invocations',
      dimensionsMap: {
        ModelId: modelId,
      },
      statistic: Stats.SAMPLE_COUNT,
      period: period,
    });

    const modelInvocationsClientErrorsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationClientErrors',
      dimensionsMap: {
        ModelId: modelId,
      },
      statistic: Stats.SAMPLE_COUNT,
      period: period,
    });

    this.dashboard.addWidgets(
      new Row(
        new TextWidget({
          markdown: `# ${modelName}`,
          width: 24,
        }),
      ),
    );

    this.dashboard.addWidgets(
      new Row(
        new SingleValueWidget({
          title: 'Average Latency',
          metrics: [modelLatencyAvgMetric],
          width: 8,
        }),
        new SingleValueWidget({
          title: 'Min Latency',
          metrics: [modelLatencyMinMetric],
          width: 8,
        }),
        new SingleValueWidget({
          title: 'Max Latency',
          metrics: [modelLatencyMaxMetric],
          width: 8,
        }),
      ),
    );

    this.dashboard.addWidgets(
      new Row(
        new GraphWidget({
          title: 'Input and Output Token Counts',
          left: [modelInputTokensMetric],
          right: [modelOutputTokensMetric],
          period: period,
          width: 12,
          height: 10,
        }),
      ),
    );

    this.dashboard.addWidgets(
      new Row(
        new SingleValueWidget({
          title: 'Invocations',
          metrics: [modelInvocationsCountMetric],
          width: 12,
        }),
        new SingleValueWidget({
          title: 'Client Errors',
          metrics: [modelInvocationsClientErrorsMetric],
          width: 12,
        }),
      ),
    );
  }

  /* Add a new row to the dashboard providing metrics across all model ids in Bedrock
  * @param {ModelMonitoringProps} props - user provided props for the monitoring.
  */
  public addAllModelsMonitoring(props: ModelMonitoringProps) {

    const period = props.period ?? Duration.hours(1);

    // Metrics across all Model Ids
    const inputTokensAllModelsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InputTokenCount',
      statistic: Stats.SUM,
      period: period,
    });

    const outputTokensAllModelsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'OutputTokenCount',
      statistic: Stats.SUM,
      period: period,
    });

    const latencyAvgAllModelsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationLatency',
      statistic: Stats.AVERAGE,
      period: period,
    });

    const latencyMinAllModelsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationLatency',
      statistic: Stats.MINIMUM,
      period: period,
    });

    const latencyMaxAllModelsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationLatency',
      statistic: Stats.MAXIMUM,
      period: period,
    });

    const invocationsCountAllModelsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'Invocations',
      statistic: Stats.SAMPLE_COUNT,
      period: period,
    });

    const invocationsClientErrorsAllModelsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationClientErrors',
      statistic: Stats.SAMPLE_COUNT,
      period: period,
    });

    this.dashboard.addWidgets(
      new Row(
        new TextWidget({
          markdown: '# Metrics Across All Models',
          width: 24,
        }),
      ),
    );
    this.dashboard.addWidgets(
      new Row(
        new SingleValueWidget({
          title: 'Average Latency (All Models)',
          metrics: [latencyAvgAllModelsMetric],
          width: 8,
        }),
        new SingleValueWidget({
          title: 'Min Latency (All Models)',
          metrics: [latencyMinAllModelsMetric],
          width: 8,
        }),
        new SingleValueWidget({
          title: 'Max Latency (All Models)',
          metrics: [latencyMaxAllModelsMetric],
          width: 8,
        }),
      ),
    );
    this.dashboard.addWidgets(
      new Row(
        new Column(
          new GraphWidget({
            title: 'Input and Output Tokens (All Models)',
            left: [inputTokensAllModelsMetric],
            right: [outputTokensAllModelsMetric],
            period: period,
            width: 12,
          }),
        ),
        new Column(
          new Row(
            new SingleValueWidget({
              title: 'Invocations (All Models)',
              metrics: [invocationsCountAllModelsMetric],
              width: 12,
            }),
          ),
          new Row(
            new SingleValueWidget({
              title: 'Client Errors (All Models)',
              metrics: [invocationsClientErrorsAllModelsMetric],
              width: 12,
            }),
          ),
        ),
      ),
    );
  }
}

