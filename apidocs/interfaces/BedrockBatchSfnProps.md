[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / BedrockBatchSfnProps

# Interface: BedrockBatchSfnProps

## Properties

### bedrockBatchInputBucket

> `readonly` **bedrockBatchInputBucket**: `IBucket`

The S3 bucket where the Bedrock Batch Inference Job gets the input manifests.

***

### bedrockBatchOutputBucket

> `readonly` **bedrockBatchOutputBucket**: `IBucket`

The S3 bucket where the Bedrock Batch Inference Job stores the output.

***

### bedrockBatchPolicy?

> `readonly` `optional` **bedrockBatchPolicy**: `IManagedPolicy`

IAM policy used for Bedrock batch processing

The policy must have the following permissions for the models and inference profiles you plan to use:
- bedrock:InvokeModel
- bedrock:CreateModelInvocationJob

#### Default

```ts
const bedrockBatchPolicy = new iam.ManagedPolicy(this, 'BedrockBatchPolicy', {
        statements: [
          new iam.PolicyStatement({
            sid: 'Inference',
            actions: ['bedrock:InvokeModel', 'bedrock:CreateModelInvocationJob'],
            resources: [
              'arn:aws:bedrock:*::foundation-model/*',
              Stack.of(this).formatArn({
                service: 'bedrock',
                resource: 'inference-profile',
                resourceName: '*',
              }),
            ],
          }),
        ],
      });
```

***

### inputPath?

> `readonly` `optional` **inputPath**: `string`

JSONPath expression to select part of the state to be the input to this state.
May also be the special value JsonPath. DISCARD, which will cause the effective input to be the empty object {}.

Input schema:
```
{
  "job_name": string,        // Required. Name of the batch inference job
  "manifest_keys": string[],    // Required. List of S3 keys of the input manifest files
  "model_id": string        // Required. Model ID to use.
}
```

#### Default

```ts
The entire task input (JSON path '$')
```

***

### resultPath?

> `readonly` `optional` **resultPath**: `string`

JSONPath expression to indicate where to inject the state's output
May also be the special value JsonPath. DISCARD, which will cause the state's input to become its output.

Output schema:
```
{
  "status": string,        // Required. Status of the batch job. One of: "Completed" or "PartiallyCompleted"
  "bucket": string,        // Required. S3 bucket where the output is stored
  "keys": string[]         // Required. Array of S3 keys for the output files
}
```

#### Default

```ts
Replaces the entire input with the result (JSON path '$')
```

***

### timeout?

> `readonly` `optional` **timeout**: `Duration`

The timeout duration for the batch inference job.
Must be between 24 hours and 1 week (168 hours).

#### Default

```ts
Duration.hours(48)
```
