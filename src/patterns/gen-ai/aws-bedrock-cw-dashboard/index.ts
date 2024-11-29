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
import { Duration, Aws, CfnOutput } from 'aws-cdk-lib';
import {
  Metric,
  Dashboard,
  GraphWidget,
  SingleValueWidget,
  Row,
  Stats,
  TextWidget,
  MathExpression,
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
  /*
    * Optional - Only applicable for image generation models.
    * Used for the OutputImageCount metric as follows:
    * "ModelId + ImageSize + BucketedStepSize"
    * @default - empty
    */
  readonly imageSize?: string;
  /*
    * Optional - Only applicable for image generation models.
    * Used for the OutputImageCount metric as follows:
    * "ModelId + ImageSize + BucketedStepSize"
    * @default - empty
    */
  readonly bucketedStepSize?: string;
  /*
  * Optional - Cost per 1K input tokens
  * Used Only for single model monitoring
  * Used to compute on-demand input and total tokens cost
  * for a specific model. Please refer to https://aws.amazon.com/bedrock/pricing/
  * for pricing details.
  * @default - empty
  */
  readonly inputTokenPrice?: number;
  /*
  * Optional - Cost per 1K output tokens
  * Used Only for single model monitoring
  * Used to compute on-demand input and total tokens cost
  * for a specific model. Please refer to https://aws.amazon.com/bedrock/pricing/
  * for pricing details.
  * @default - empty
  */
  readonly outputTokenPrice?: number;
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
  constructor(scope: Construct, id: string, props: BedrockCwDashboardProps = {}) {
    super(scope, id);

    this.dashboard = props.existingDashboard ?? new Dashboard(this, `BedrockMetricsDashboard${id}`, {
      dashboardName: props.dashboardName ?? 'BedrockMetricsDashboard',
    });

    const cloudwatchDashboardURL = 'https://' + Aws.REGION + '.console.aws.amazon.com/cloudwatch/home?region=' + Aws.REGION + '#dashboards:name=' + this.dashboard.dashboardName;

    new CfnOutput(this, `BedrockMetricsDashboardOutput${id}`, {
      value: cloudwatchDashboardURL,
    });
  }

  /* Provide metrics for a specific model id in Bedrock
   * @param {string} modelName - Model name as it will appear in the dashboard row widget.
   * @param {string} modelId - Bedrock model id as defined in https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html
   * @param {ModelMonitoringProps} props - user provided props for the monitoring.
  */
  public addModelMonitoring(modelName: string, modelId: string, props: ModelMonitoringProps = {}) {

    const period = props.period ?? Duration.hours(1);
    const outputImageCountDimension = modelId + props.imageSize + props.bucketedStepSize;

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

    const modelOutputImageMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'OutputImageCount',
      dimensionsMap: {
        ModelId: outputImageCountDimension,
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

    const modelInvocationsServerErrorsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationServerErrors',
      dimensionsMap: {
        ModelId: modelId,
      },
      statistic: Stats.SAMPLE_COUNT,
      period: period,
    });

    const modelInvocationsThrottlesErrorsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationThrottles',
      dimensionsMap: {
        ModelId: modelId,
      },
      statistic: Stats.SAMPLE_COUNT,
      period: period,
    });

    const modelInvocationsLegacysMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'LegacyModelInvocations',
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

    let pricingWidget;

    if (props.inputTokenPrice && props.outputTokenPrice) {
      pricingWidget =
          new GraphWidget({
            title: 'Token Cost (USD)',
            left: [
              new MathExpression({
                expression: `inputTokens / 1000 * ${props.inputTokenPrice}`,
                usingMetrics: {
                  inputTokens: modelInputTokensMetric,
                },
                label: 'Input Token Cost',
              }),
              new MathExpression({
                expression: `outputTokens / 1000 * ${props.outputTokenPrice}`,
                usingMetrics: {
                  outputTokens: modelOutputTokensMetric,
                },
                label: 'Output Token Cost',
              }),
            ],
            leftYAxis: {
              label: 'Input and Output',
              showUnits: false,
            },
            right: [
              new MathExpression({
                expression: `inputTokens / 1000 * ${props.inputTokenPrice} + outputTokens / 1000 * ${props.outputTokenPrice}`,
                usingMetrics: {
                  inputTokens: modelInputTokensMetric,
                  outputTokens: modelOutputTokensMetric,
                },
                label: 'Total Cost',
              }),
            ],
            rightYAxis: {
              label: 'Total',
              showUnits: false,
            },
            width: 12,
          });
    }

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
        ...(pricingWidget ? [pricingWidget] : []),
      ));

    this.dashboard.addWidgets(
      new SingleValueWidget({
        title: 'Invocations',
        metrics: [modelInvocationsCountMetric],
        width: 4,
      }),
      new SingleValueWidget({
        title: 'Client Errors',
        metrics: [modelInvocationsClientErrorsMetric],
        width: 4,
      }),
      new SingleValueWidget({
        title: 'Server Errors',
        metrics: [modelInvocationsServerErrorsMetric],
        width: 4,
      }),
      new SingleValueWidget({
        title: 'Throttled invocations',
        metrics: [modelInvocationsThrottlesErrorsMetric],
        width: 4,
      }),
      new SingleValueWidget({
        title: 'Legacy invocations',
        metrics: [modelInvocationsLegacysMetric],
        width: 4,
      }),
      new SingleValueWidget({
        title: 'OutputImageCount',
        metrics: [modelOutputImageMetric],
        width: 4,
      }),
    );
  }

  /* Add a new row to the dashboard providing metrics across all model ids in Bedrock
  * @param {ModelMonitoringProps} props - user provided props for the monitoring.
  */
  public addAllModelsMonitoring(props: ModelMonitoringProps = {}) {

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

    const outputImageMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'OutputImageCount',
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

    const invocationsServerErrorsAllModelsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationServerErrors',
      statistic: Stats.SAMPLE_COUNT,
      period: period,
    });

    const invocationsThrottlesErrorsMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'InvocationThrottles',
      statistic: Stats.SAMPLE_COUNT,
      period: period,
    });

    const invocationsLegacyModelMetric = new Metric({
      namespace: 'AWS/Bedrock',
      metricName: 'LegacyModelInvocations',
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
        new GraphWidget({
          title: 'Input and Output Tokens (All Models)',
          left: [inputTokensAllModelsMetric],
          right: [outputTokensAllModelsMetric],
          period: period,
          width: 12,
        }),
        new SingleValueWidget({
          title: 'Invocations (All Models)',
          metrics: [invocationsCountAllModelsMetric],
          width: 4,
        }),
        new SingleValueWidget({
          title: 'Output Image Count (All Models)',
          metrics: [outputImageMetric],
          width: 4,
        }),
        new SingleValueWidget({
          title: 'Client Errors (All Models)',
          metrics: [invocationsClientErrorsAllModelsMetric],
          width: 4,
        }),
        new SingleValueWidget({
          title: 'Server Errors (All Models)',
          metrics: [invocationsServerErrorsAllModelsMetric],
          width: 4,
        }),
        new SingleValueWidget({
          title: 'Throttling Errors (All Models)',
          metrics: [invocationsThrottlesErrorsMetric],
          width: 4,
        }),
        new SingleValueWidget({
          title: 'Legacy invocations (All Models)',
          metrics: [invocationsLegacyModelMetric],
          width: 4,
        }),
      ),
    );
  }
}

