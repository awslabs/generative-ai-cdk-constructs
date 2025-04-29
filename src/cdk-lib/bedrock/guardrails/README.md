# Amazon Bedrock Guardrails

Amazon Bedrock's Guardrails feature enables you to implement robust governance and control mechanisms for your generative AI applications, ensuring alignment with your specific use cases and responsible AI policies. Guardrails empowers you to create multiple tailored policy configurations, each designed to address the unique requirements and constraints of different use cases. These policy configurations can then be seamlessly applied across multiple foundation models (FMs) and Agents, ensuring a consistent user experience and standardizing safety, security, and privacy controls throughout your generative AI ecosystem.

With Guardrails, you can define and enforce granular, customizable policies to precisely govern the behavior of your generative AI applications. You can configure the following policies in a guardrail to avoid undesirable and harmful content and remove sensitive information for privacy protection.

- Content filters – Adjust filter strengths to block input prompts or model responses containing harmful content.
- Denied topics – Define a set of topics that are undesirable in the context of your application. These topics will be blocked if detected in user queries or model responses.
- Word filters – Configure filters to block undesirable words, phrases, and profanity. Such words can include offensive terms, competitor names etc.
- Sensitive information filters – Block or mask sensitive information such as personally identifiable information (PII) or custom regex in user inputs and model responses.

You can create a Guardrail with a minimum blockedInputMessaging, blockedOutputsMessaging and default content filter policy.

## Table of Contents

- [Guardrails](#guardrails)
- [Guardrail Properties](#guardrail-properties)
- [Filter Types](#filter-types)
  - [Content Filters](#content-filters)
  - [Denied Topics](#denied-topics)
  - [Word Filters](#word-filters)
  - [PII Filters](#pii-filters)
  - [Regex Filters](#regex-filters)
  - [Contextual Grounding Filters](#contextual-grounding-filters)
- [Guardrail Methods](#guardrail-methods)
- [Guardrail Permissions](#guardrail-permissions)
- [Guardrail Metrics](#guardrail-metrics)
- [Importing Guardrails](#importing-guardrails)
- [Guardrail Versioning](#guardrail-versioning)

## Guardrails

### Basic Guardrail Creation

#### TypeScript

```ts
const guardrail = new bedrock.Guardrail(this, 'bedrockGuardrails', {
  name: 'my-BedrockGuardrails',
  description: 'Legal ethical guardrails.',
});
```

#### Python

```python
guardrail = bedrock.Guardrail(self, 'myGuardrails',
    name='my-BedrockGuardrails',
    description= "Legal ethical guardrails.")
```

## Guardrail Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| name | string | Yes | The name of the guardrail |
| description | string | No | The description of the guardrail |
| blockedInputMessaging | string | No | The message to return when the guardrail blocks a prompt. Default: "Sorry, your query violates our usage policy." |
| blockedOutputsMessaging | string | No | The message to return when the guardrail blocks a model response. Default: "Sorry, I am unable to answer your question because of our usage policy." |
| kmsKey | IKey | No | A custom KMS key to use for encrypting data. Default: Your data is encrypted by default with a key that AWS owns and manages for you. |
| contentFilters | ContentFilter[] | No | The content filters to apply to the guardrail |
| deniedTopics | Topic[] | No | Up to 30 denied topics to block user inputs or model responses associated with the topic |
| wordFilters | string[] | No | The word filters to apply to the guardrail |
| managedWordListFilters | ManagedWordFilterType[] | No | The managed word filters to apply to the guardrail |
| piiFilters | PIIFilter[] | No | The PII filters to apply to the guardrail |
| regexFilters | RegexFilter[] | No | The regular expression (regex) filters to apply to the guardrail |
| contextualGroundingFilters | ContextualGroundingFilter[] | No | The contextual grounding filters to apply to the guardrail |

## Filter Types

### Content Filters

Content filters allow you to block input prompts or model responses containing harmful content. You can adjust the filter strength and configure separate actions for input and output.

#### Content Filter Configuration

##### TypeScript

```ts
guardrail.addContentFilter({
  type: ContentFilterType.SEXUAL,
  inputStrength: ContentFilterStrength.HIGH,
  outputStrength: ContentFilterStrength.MEDIUM,
  // props below are optional
  inputAction: GuardrailAction.BLOCK,
  inputEnabled: true,
  outputAction: GuardrailAction.NONE,
  outputEnabled: true,
  inputModalities: [ModalityType.TEXT, ModalityType.IMAGE],
  outputModalities: [ModalityType.TEXT],
});
```

##### Python

```python
guardrail.add_content_filter(
  type=ContentFilterType.SEXUAL,
  input_strength=ContentFilterStrength.HIGH,
  output_strength=ContentFilterStrength.MEDIUM,
  # props below are optional
  input_action=GuardrailAction.BLOCK,
  input_enabled=True,
  output_action=GuardrailAction.NONE,
  output_enabled=True,
  input_modalities=[ModalityType.TEXT, ModalityType.IMAGE],
  output_modalities=[ModalityType.TEXT],
);
```

Available content filter types:

- `SEXUAL`: Describes input prompts and model responses that indicates sexual interest, activity, or arousal
- `VIOLENCE`: Describes input prompts and model responses that includes glorification of or threats to inflict physical pain
- `HATE`: Describes input prompts and model responses that discriminate, criticize, insult, denounce, or dehumanize a person or group
- `INSULTS`: Describes input prompts and model responses that includes demeaning, humiliating, mocking, insulting, or belittling language
- `MISCONDUCT`: Describes input prompts and model responses that seeks or provides information about engaging in misconduct activity
- `PROMPT_ATTACK`: Enable to detect and block user inputs attempting to override system instructions

Available content filter strengths:

- `NONE`: No filtering
- `LOW`: Light filtering
- `MEDIUM`: Moderate filtering
- `HIGH`: Strict filtering

Available guardrail actions:

- `BLOCK`: Blocks the content from being processed
- `ANONYMIZE`: Masks the content with an identifier tag
- `NONE`: Takes no action

> Warning: the ANONYMIZE action is not available in all configurations. Please refer to the documentation of each filter to see which ones
> support 

Available modality types:

- `TEXT`: Text modality for content filters
- `IMAGE`: Image modality for content filters

### Denied Topics

Denied topics allow you to define a set of topics that are undesirable in the context of your application. These topics will be blocked if detected in user queries or model responses. You can configure separate actions for input and output.

#### Denied Topic Configuration

##### TypeScript

```ts
// Use a predefined topic
guardrail.addDeniedTopicFilter(Topic.FINANCIAL_ADVICE);

// Create a custom topic with input/output actions
guardrail.addDeniedTopicFilter(
  Topic.custom({
    name: 'Legal_Advice',
    definition: 'Offering guidance or suggestions on legal matters, legal actions, interpretation of laws, or legal rights and responsibilities.',
    examples: [
      'Can I sue someone for this?',
      'What are my legal rights in this situation?',
      'Is this action against the law?',
      'What should I do to file a legal complaint?',
      'Can you explain this law to me?',
    ],
    // props below are optional
    inputAction: GuardrailAction.BLOCK,
    inputEnabled: true,
    outputAction: GuardrailAction.NONE,
    outputEnabled: true,
  })
);
```

##### Python

```python
# Use a predefined topic
guardrail.add_denied_topic_filter(Topic.FINANCIAL_ADVICE);

# Create a custom topic with input/output actions
guardrail.add_denied_topic_filter(
  Topic.custom(
    name='Legal_Advice',
    definition='Offering guidance or suggestions on legal matters, legal actions, interpretation of laws, or legal rights and responsibilities.',
    examples=[
      'Can I sue someone for this?',
      'What are my legal rights in this situation?',
      'Is this action against the law?',
      'What should I do to file a legal complaint?',
      'Can you explain this law to me?',
    ],
    # props below are optional
    input_action=GuardrailAction.BLOCK,
    input_enabled=True,
    output_action=GuardrailAction.NONE,
    output_enabled=True,
  )
);
```

### Word Filters

Word filters allow you to block specific words, phrases, or profanity in user inputs and model responses. You can configure separate actions for input and output.

#### Word Filter Configuration

##### TypeScript

```ts
// Add managed word list with input/output actions
guardrail.addManagedWordListFilter({
  type: ManagedWordFilterType.PROFANITY,
  inputAction: GuardrailAction.BLOCK,
  inputEnabled: true,
  outputAction: GuardrailAction.NONE,
  outputEnabled: true,
});

// Add individual words
guardrail.addWordFilter({text: 'drugs'});
guardrail.addWordFilter({text: 'competitor'});

// Add words from a file
guardrail.addWordFilterFromFile('./scripts/wordsPolicy.csv');
```

##### Python

```python
# Add managed word list with input/output actions
guardrail.add_managed_word_list_filter(
  type=ManagedWordFilterType.PROFANITY,
  input_action=GuardrailAction.BLOCK,
  input_enabled=True,
  output_action=GuardrailAction.NONE,
  output_enabled=True,
);

guardrail.add_word_filter(text="drugs")
guardrail.add_word_filter(text="competitor")

guardrail.add_word_filter_from_file("./scripts/wordsPolicy.csv")
```

### PII Filters

PII filters allow you to detect and handle personally identifiable information in user inputs and model responses. You can configure separate actions for input and output.

#### PII Filter Configuration

##### TypeScript

```ts
// Add PII filter for addresses with input/output actions
guardrail.addPIIFilter({
  type: bedrock.PIIType.General.ADDRESS,
  action: bedrock.GuardrailAction.BLOCK,
  // below props are optional
  inputAction: bedrock.GuardrailAction.BLOCK,
  inputEnabled: true,
  outputAction: bedrock.GuardrailAction.ANONYMIZE,
  outputEnabled: true,
});

// Add PII filter for credit card numbers with input/output actions
guardrail.addPIIFilter({
  type: bedrock.PIIType.General.LICENSE_PLATE,
  action: bedrock.GuardrailAction.BLOCK,
  // below props are optional
  inputAction: bedrock.GuardrailAction.BLOCK,
  inputEnabled: true,
  outputAction: bedrock.GuardrailAction.ANONYMIZE,
  outputEnabled: true,
});
```

##### Python

```python
# Add PII filter for addresses with input/output actions
guardrail.add_pii_filter(
    type=bedrock.pii_type.General.ADDRESS,
    action=bedrock.GuardrailAction.BLOCK,
    # below props are optional
    input_action=bedrock.GuardrailAction.BLOCK,
    input_enabled=True,
    output_action=bedrock.GuardrailAction.ANONYMIZE,
    output_enabled=True,
)

# Add PII filter for credit card numbers with input/output actions
guardrail.add_pii_filter(
    type=bedrock.pii_type.General.CREDIT_CARD_NUMBER,
    action=bedrock.GuardrailAction.BLOCK,
    # below props are optional
    input_action=bedrock.GuardrailAction.BLOCK,
    input_enabled=True,
    output_action=bedrock.GuardrailAction.ANONYMIZE,
    output_enabled=True,
)
```

### Regex Filters

Regex filters allow you to detect and handle custom patterns in user inputs and model responses. You can configure separate actions for input and output.

#### Regex Filter Configuration

##### TypeScript

```ts
// Add regex filter with input/output actions
guardrail.addRegexFilter({
  name: 'TestRegexFilter',
  pattern: '/^[A-Z]{2}d{6}$/',
  action: bedrock.GuardrailAction.ANONYMIZE,
  // below props are optional
  description: 'This is a test regex filter',
  inputAction: GuardrailAction.BLOCK,
  inputEnabled: true,
  outputAction: GuardrailAction.ANONYMIZE,
  outputEnabled: true,
});
```

##### Python

```python
# Add regex filter with input/output actions
guardrail.add_regex_filter(
    name= "TestRegexFilter",
    pattern= "/^[A-Z]{2}d{6}$/",
    action= bedrock.GuardrailAction.ANONYMIZE,
    # below props are optional
    description= "This is a test regex filter",
    input_action=bedrock.GuardrailAction.BLOCK,
    input_enabled=True,
    output_action=bedrock.GuardrailAction.ANONYMIZE,
    output_enabled=True,
)
```

### Contextual Grounding Filters

Contextual grounding filters allow you to ensure that model responses are factually correct and relevant to the user's query. You can configure the action and enable/disable the filter.

#### Contextual Grounding Filter Configuration

##### TypeScript

```ts
// Add contextual grounding filter with action and enabled flag
guardrail.addContextualGroundingFilter({
  type: ContextualGroundingFilterType.GROUNDING,
  threshold: 0.8,
  // the properties below are optional
  action: GuardrailAction.BLOCK,
  enabled: true,
});
```

##### Python

```python
# Add contextual grounding filter with action and enabled flag
guardrail.add_contextual_grounding_filter(
    type=bedrock.ContextualGroundingFilterType.GROUNDING,
    threshold=0.8,
    # the properties below are optional
    action=bedrock.GuardrailAction.BLOCK,
    enabled=True,
)
```

## Guardrail Methods

| Method | Description |
|--------|-------------|
| `addContentFilter()` | Adds a content filter to the guardrail |
| `addDeniedTopicFilter()` | Adds a denied topic filter to the guardrail |
| `addWordFilter()` | Adds a word filter to the guardrail |
| `addManagedWordListFilter()` | Adds a managed word list filter to the guardrail |
| `addWordFilterFromFile()` | Adds word filters from a file to the guardrail |
| `addPIIFilter()` | Adds a PII filter to the guardrail |
| `addRegexFilter()` | Adds a regex filter to the guardrail |
| `addContextualGroundingFilter()` | Adds a contextual grounding filter to the guardrail |
| `createVersion()` | Creates a new version of the guardrail |


## Guardrail Permissions

Guardrails provide methods to grant permissions to other resources that need to interact with the guardrail.

### Permission Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `grant(grantee, ...actions)` | Grants the given principal identity permissions to perform actions on this guardrail | `grantee`: The principal to grant permissions to<br>`actions`: The actions to grant (e.g., `bedrock:GetGuardrail`, `bedrock:ListGuardrails`) |
| `grantApply(grantee)` | Grants the given identity permissions to apply the guardrail | `grantee`: The principal to grant permissions to |

### Permission Examples

#### TypeScript

```ts
// Grant specific permissions to a Lambda function
guardrail.grant(lambdaFunction, 'bedrock:GetGuardrail', 'bedrock:ListGuardrails');

// Grant permissions to apply the guardrail
guardrail.grantApply(lambdaFunction);
```

#### Python

```python
# Grant specific permissions to a Lambda function
guardrail.grant(lambdaFunction, 'bedrock:GetGuardrail', 'bedrock:ListGuardrails')

# Grant permissions to apply the guardrail
guardrail.grant_apply(lambdaFunction)
```

## Guardrail Metrics

Amazon Bedrock provides metrics for your guardrails, allowing you to monitor their effectiveness and usage. These metrics are available in CloudWatch and can be used to create dashboards and alarms.

### Metrics Examples

#### TypeScript

```ts
// Get a specific metric for this guardrail
const invocationsMetric = guardrails.metricInvocations({
  statistic: 'Sum',
  period: cdk.Duration.minutes(5),
});

// Create a CloudWatch alarm for high invocation latency
new cdk.aws_cloudwatch.Alarm(this, 'HighLatencyAlarm', {
  metric: guardrails.metricInvocationLatency(),
  threshold: 1000, // 1 second
  evaluationPeriods: 3,
});

// Get metrics for all guardrails
const allInvocationsMetric = bedrock.Guardrail.metricAllInvocations();
```

## Importing Guardrails

You can import existing guardrails using the `fromGuardrailAttributes` or `fromCfnGuardrail` methods.

### Import Configuration

#### TypeScript

```ts
// Import an existing guardrail by ARN
const importedGuardrail = bedrock.Guardrail.fromGuardrailAttributes(stack, 'TestGuardrail', {
  guardrailArn: 'arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl',
  guardrailVersion: '1', //optional
  kmsKey: kmsKey, //optional
});

// Import a guardrail created through the L1 CDK CfnGuardrail construct
const cfnGuardrail = new CfnGuardrail(this, 'MyCfnGuardrail', {
  blockedInputMessaging: 'blockedInputMessaging',
  blockedOutputsMessaging: 'blockedOutputsMessaging',
  name: 'namemycfnguardrails',
  wordPolicyConfig: {
    wordsConfig: [
      {
        text: 'drugs',
      },
    ],
  },
});

const importedGuardrail = bedrock.Guardrail.fromCfnGuardrail(cfnGuardrail);
```

#### Python

```python
# Importing existing guardrail
imported_guardrail = bedrock.Guardrail.from_guardrail_attributes(self, "TestGuardrail",
  guardrail_arn="arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl",
  guardrail_version="1",
  kms_key=kms_key
)

# Importing Guardrails created through the L1 CDK CfnGuardrail construct
cfn_guardrail = cfnbedrock.CfnGuardrail(self, "MyCfnGuardrail",
    blocked_input_messaging="blockedInputMessaging",
    blocked_outputs_messaging="blockedOutputsMessaging",
    name="name",
    word_policy_config=cfnbedrock.CfnGuardrail.WordPolicyConfigProperty(
        words_config=[cfnbedrock.CfnGuardrail.WordConfigProperty(
            text="drugs"
        )]
    )
)

imported_guardrail = bedrock.Guardrail.from_cfn_guardrail(cfn_guardrail)
```

## Guardrail Versioning

Guardrails support versioning, allowing you to track changes and maintain multiple versions of your guardrail configurations.

### Version Configuration

#### TypeScript

```ts
// Create a new version of the guardrail
guardrail.createVersion('testversion');
```

#### Python

```python
# Create a new version of the guardrail
guardrail.create_version("testversion")
```
