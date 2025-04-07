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

TypeScript

```ts
const guardrails = new bedrock.Guardrail(this, 'bedrockGuardrails', {
  name: 'my-BedrockGuardrails',
  description: 'Legal ethical guardrails.',
});

// Optional - Add Sensitive information filters
guardrails.addPIIFilter({
  type: PIIType.General.ADDRESS,
  action: GuardrailAction.ANONYMIZE,
});

guardrails.addRegexFilter({
  name: 'TestRegexFilter',
  description: 'This is a test regex filter',
  pattern: '/^[A-Z]{2}d{6}$/',
  action: bedrock.GuardrailAction.ANONYMIZE,
});

// Optional - Add contextual grounding
guardrails.addContextualGroundingFilter({
  type: ContextualGroundingFilterType.GROUNDING,
  threshold: 0.95,
});

guardrails.addContextualGroundingFilter({
  type: ContextualGroundingFilterType.RELEVANCE,
  threshold: 0.95,
});

// Optional - Add Denied topics . You can use a Topic or create your custom Topic
guardrails.addDeniedTopicFilter(Topic.FINANCIAL_ADVICE);
guardrails.addDeniedTopicFilter(
  Topic.custom({
    name: 'Legal_Advice',
    definition:
      'Offering guidance or suggestions on legal matters, legal actions, interpretation of laws, or legal rights and responsibilities.',
    examples: [
      'Can I sue someone for this?',
      'What are my legal rights in this situation?',
      'Is this action against the law?',
      'What should I do to file a legal complaint?',
      'Can you explain this law to me?',
    ],
  })
);

// Optional - Add Word filters. You can upload words from a file with addWordFilterFromFile function.
guardrails.addWordFilter('drugs');
guardrails.addManagedWordListFilter(ManagedWordFilterType.PROFANITY);
guardrails.addWordFilterFromFile('./scripts/wordsPolicy.csv');

// versioning - if you change any guardrail configuration, a new version will be created
guardrails.createVersion('testversion');

// Importing existing guardrail
const importedGuardrail = bedrock.Guardrail.fromGuardrailAttributes(stack, 'TestGuardrail', {
  guardrailArn: 'arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl',
  guardrailVersion: '1', //optional
  kmsKey: kmsKey, //optional
});

// Importing Guardrails created through the L1 CDK CfnGuardrail construct
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

Python

```python
guardrail = bedrock.Guardrail(self, 'myGuardrails',
    name='my-BedrockGuardrails',
    description= "Legal ethical guardrails.")

# Optional - Add Sensitive information filters
guardrail.add_pii_filter(
    type= bedrock.pii_type.General.ADDRESS,
    action= bedrock.GuardrailAction.ANONYMIZE,
)

guardrail.add_regex_filter(
    name= "TestRegexFilter",
    description= "This is a test regex filter",
    pattern= "/^[A-Z]{2}d{6}$/",
    action= bedrock.GuardrailAction.ANONYMIZE,
)

# Optional - Add contextual grounding
guardrail.add_contextual_grounding_filter(
    type= bedrock.ContextualGroundingFilterType.GROUNDING,
    threshold= 0.95,
)

guardrail.add_contextual_grounding_filter(
    type= bedrock.ContextualGroundingFilterType.RELEVANCE,
    threshold= 0.95,
)

# Optional - Add Denied topics . You can use default Topic or create your custom Topic with createTopic function. The default Topics can also be overwritten.
guardrail.add_denied_topic_filter(bedrock.Topic.FINANCIAL_ADVICE)

guardrail.add_denied_topic_filter(
  bedrock.Topic.custom(
    name= "Legal_Advice",
    definition=
        "Offering guidance or suggestions on legal matters, legal actions, interpretation of laws, or legal rights and responsibilities.",
    examples= [
        "Can I sue someone for this?",
        "What are my legal rights in this situation?",
        "Is this action against the law?",
        "What should I do to file a legal complaint?",
        "Can you explain this law to me?",
    ]
  )
)

# Optional - Add Word filters. You can upload words from a file with addWordFilterFromFile function.
guardrail.add_word_filter("drugs")
guardrail.add_managed_word_list_filter(bedrock.ManagedWordFilterType.PROFANITY)
guardrail.add_word_filter_from_file("./scripts/wordsPolicy.csv")

# versioning - if you change any guardrail configuration, a new version will be created
guardrail.create_version("testversion")

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

Content filters allow you to block input prompts or model responses containing harmful content. You can adjust the filter strength for each type of harmful content.

```ts
guardrails.addContentFilter({
  type: ContentFilterType.SEXUAL,
  inputStrength: ContentFilterStrength.HIGH,
  outputStrength: ContentFilterStrength.MEDIUM,
});
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

### Denied Topics

Denied topics allow you to define a set of topics that are undesirable in the context of your application. These topics will be blocked if detected in user queries or model responses.

```ts
// Use a predefined topic
guardrails.addDeniedTopicFilter(Topic.FINANCIAL_ADVICE);

// Create a custom topic
guardrails.addDeniedTopicFilter(
  Topic.custom({
    name: 'Legal_Advice',
    definition: 'Offering guidance or suggestions on legal matters, legal actions, interpretation of laws, or legal rights and responsibilities.',
    examples: [
      'Can I sue someone for this?',
      'What are my legal rights in this situation?',
      'Is this action against the law?',
    ],
  })
);
```

Predefined topics:
- `FINANCIAL_ADVICE`: Investment advice and financial recommendations
- `POLITICAL_ADVICE`: Political guidance and recommendations
- `MEDICAL_ADVICE`: Medical advice and health recommendations
- `INAPPROPRIATE_CONTENT`: Inappropriate or offensive content
- `LEGAL_ADVICE`: Legal advice and recommendations

### Word Filters

Word filters allow you to block undesirable words, phrases, and profanity.

```ts
// Add a single word
guardrails.addWordFilter('drugs');

// Add a managed word list
guardrails.addManagedWordListFilter(ManagedWordFilterType.PROFANITY);

// Add words from a file
guardrails.addWordFilterFromFile('./scripts/wordsPolicy.csv');
```

Available managed word filter types:

- `PROFANITY`: Predefined list of profane words and phrases

### PII Filters

PII filters allow you to block or mask sensitive information such as personally identifiable information.

```ts
guardrails.addPIIFilter({
  type: PIIType.General.ADDRESS,
  action: GuardrailAction.ANONYMIZE,
});
```

Available PII types:

- General: `ADDRESS`, `AGE`, `DRIVER_ID`, `EMAIL`, `LICENSE_PLATE`, `NAME`, `PASSWORD`, `PHONE`, `USERNAME`, `VEHICLE_IDENTIFICATION_NUMBER`
- Finance: `CREDIT_DEBIT_CARD_CVV`, `CREDIT_DEBIT_CARD_EXPIRY`, `CREDIT_DEBIT_CARD_NUMBER`, `PIN`, `SWIFT_CODE`, `INTERNATIONAL_BANK_ACCOUNT_NUMBER`
- InformationTechnology: `URL`, `IP_ADDRESS`, `MAC_ADDRESS`, `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`
- USASpecific: `US_BANK_ACCOUNT_NUMBER`, `US_BANK_ROUTING_NUMBER`, `US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER`, `US_PASSPORT_NUMBER`, `US_SOCIAL_SECURITY_NUMBER`
- CanadaSpecific: `CA_HEALTH_NUMBER`, `CA_SOCIAL_INSURANCE_NUMBER`
- UKSpecific: `UK_NATIONAL_HEALTH_SERVICE_NUMBER`, `UK_NATIONAL_INSURANCE_NUMBER`, `UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER`

Available actions:

- `BLOCK`: If sensitive information is detected, the guardrail blocks all the content
- `ANONYMIZE`: If sensitive information is detected, the guardrail masks it with an identifier

### Regex Filters

Regex filters allow you to block or mask content that matches a regular expression pattern.

```ts
guardrails.addRegexFilter({
  name: 'TestRegexFilter',
  description: 'This is a test regex filter',
  pattern: '/^[A-Z]{2}d{6}$/',
  action: GuardrailAction.ANONYMIZE,
});
```

### Contextual Grounding Filters

Contextual grounding filters allow you to ensure that model responses are factually correct and relevant to the user's query.

```ts
guardrails.addContextualGroundingFilter({
  type: ContextualGroundingFilterType.GROUNDING,
  threshold: 0.95,
});

guardrails.addContextualGroundingFilter({
  type: ContextualGroundingFilterType.RELEVANCE,
  threshold: 0.95,
});
```

Available contextual grounding filter types:
- `GROUNDING`: Ensures that the model response is factually correct and grounded in the source
- `RELEVANCE`: Ensures that the model response is relevant to the user's query

## Guardrail Methods

The following methods are available on the `Guardrail` class:

| Method | Description |
|--------|-------------|
| `addContentFilter(filter: ContentFilter): void` | Adds a content filter to the guardrail |
| `addPIIFilter(filter: PIIFilter): void` | Adds a PII filter to the guardrail |
| `addRegexFilter(filter: RegexFilter): void` | Adds a regex filter to the guardrail |
| `addDeniedTopicFilter(filter: Topic): void` | Adds a denied topic filter to the guardrail |
| `addContextualGroundingFilter(filter: ContextualGroundingFilter): void` | Adds a contextual grounding filter to the guardrail |
| `addWordFilter(filter: string): void` | Adds a word filter to the guardrail |
| `addWordFilterFromFile(filePath: string): void` | Adds word filters from a file to the guardrail |
| `addManagedWordListFilter(filter: ManagedWordFilterType): void` | Adds a managed word list filter to the guardrail |
| `createVersion(description?: string): string` | Creates a new version of the guardrail |

## Guardrail Permissions

Guardrails provide methods to grant permissions to other resources:

```ts
import * as lambda from 'aws-cdk-lib/aws-lambda';

// Create a Lambda function that will use the guardrail
const lambdaFunction = new lambda.Function(this, 'MyFunction', {
  ...
});

// Grant the Lambda function permission to use the guardrail
guardrails.grantApply(lambdaFunction);

// Grant the Lambda function permission to perform specific actions on the guardrail
guardrails.grant(lambdaFunction, 'bedrock:GetGuardrail', 'bedrock:ListGuardrails');
```

The `grantApply` method adds the necessary IAM permissions to the resource, allowing it to use the guardrail. This includes permissions to call `bedrock:GetGuardrail` and `bedrock:ListGuardrails` actions on the guardrail resource.

## Guardrail Metrics

Guardrails provide methods to access CloudWatch metrics:

```ts
// Get the invocations metric
const invocationsMetric = guardrails.metricInvocations();

// Get the invocation latency metric
const latencyMetric = guardrails.metricInvocationLatency();

// Get the invocation client errors metric
const clientErrorsMetric = guardrails.metricInvocationClientErrors();

// Get the invocation server errors metric
const serverErrorsMetric = guardrails.metricInvocationServerErrors();

// Get the invocation throttles metric
const throttlesMetric = guardrails.metricInvocationThrottles();

// Get the text unit count metric
const textUnitCountMetric = guardrails.metricTextUnitCount();

// Get the invocations intervened metric
const invocationsIntervenedMetric = guardrails.metricInvocationsIntervened();

// Get a custom metric
const customMetric = guardrails.metric('CustomMetricName');
```

## Importing Guardrails

You can import existing guardrails using the following methods:

### From Guardrail Attributes

```ts
const importedGuardrail = bedrock.Guardrail.fromGuardrailAttributes(stack, 'TestGuardrail', {
  guardrailArn: 'arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl',
  guardrailVersion: '1', // optional
  kmsKey: kmsKey, // optional
});
```

### From CfnGuardrail

```ts
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

## Guardrail Versioning

Guardrails support versioning, allowing you to track changes to your guardrail configurations over time.

```ts
// Create a new version of the guardrail
const version = guardrails.createVersion('Initial version');

// Import an existing guardrail version
const importedVersion = bedrock.GuardrailVersion.fromGuardrailVersionAttributes(stack, 'TestVersion', {
  guardrailArn: 'arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl',
  guardrailVersion: '1',
});

// Create a new guardrail version
const newVersion = new bedrock.GuardrailVersion(stack, 'NewVersion', {
  guardrail: guardrails,
  description: 'Updated version with new filters',
});
``` 