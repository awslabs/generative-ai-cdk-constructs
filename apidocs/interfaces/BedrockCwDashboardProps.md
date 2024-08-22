[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / BedrockCwDashboardProps

# Interface: BedrockCwDashboardProps

The properties for the BedrockCwDashboardProps class.

## Properties

### dashboardName?

> `readonly` `optional` **dashboardName**: `string`

Optional A name for the dashboard which will be created.
If existingDashboard is defined, this value will be ignored.
If not provided, the construct will create a new dashboard named 'BedrockMetricsDashboard'

#### Default

```ts
- none
```

***

### existingDashboard?

> `readonly` `optional` **existingDashboard**: `Dashboard`

Optional An existing dashboard where metrics will be added to.
If not provided, the construct will create a new dashboard

#### Default

```ts
- none
```
