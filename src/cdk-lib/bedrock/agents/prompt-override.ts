import { IFunction } from 'aws-cdk-lib/aws-lambda';

/**
 * The step in the agent sequence where to set a specific prompt configuration.
 */
export enum AgentStepType {
  PRE_PROCESSING = 'PRE_PROCESSING',
  ORCHESTRATION = 'ORCHESTRATION',
  POST_PROCESSING = 'POST_PROCESSING',
  KNOWLEDGE_BASE_RESPONSE_GENERATION = 'KNOWLEDGE_BASE_RESPONSE_GENERATION',
}

/**
 * LLM inference configuration
 */
export interface InferenceConfiguration {
  /**
   * The likelihood of the model selecting higher-probability options while
   * generating a response. A lower value makes the model more likely to choose
   * higher-probability options, while a higher value makes the model more
   * likely to choose lower-probability options.
   *
   * Floating point
   *
   * min 0
   * max 1
   */
  readonly temperature: number;
  /**
   * While generating a response, the model determines the probability of the
   * following token at each point of generation. The value that you set for
   * Top P determines the number of most-likely candidates from which the model
   * chooses the next token in the sequence. For example, if you set topP to
   * 80, the model only selects the next token from the top 80% of the
   * probability distribution of next tokens.
   *
   * Floating point
   *
   * min 0
   * max 1
   */
  readonly topP: number;
  /**
   * While generating a response, the model determines the probability of the
   * following token at each point of generation. The value that you set for
   * topK is the number of most-likely candidates from which the model chooses
   * the next token in the sequence. For example, if you set topK to 50, the
   * model selects the next token from among the top 50 most likely choices.
   *
   * Integer
   *
   * min 0
   * max 500
   */
  readonly topK: number;
  /**
   * A list of stop sequences. A stop sequence is a sequence of characters that
   * causes the model to stop generating the response.
   *
   * length 0-4
   */
  readonly stopSequences: string[];
  /**
   * The maximum number of tokens to generate in the response.
   *
   * Integer
   *
   * min 0
   * max 4096
   */
  readonly maximumLength: number;
}

/**
 * Contains configurations to override a prompt template in one part of an agent sequence.
 */
export interface PromptStepConfiguration {
  /**
   * The step in the agent sequence where to set a specific prompt configuration.
   */
  readonly stepType: AgentStepType;
  /**
   * Whether to enable or skip this step in the agent sequence.
   * @default - The default state for each step type is as follows.
   *
   *     PRE_PROCESSING – ENABLED
   *     ORCHESTRATION – ENABLED
   *     KNOWLEDGE_BASE_RESPONSE_GENERATION – ENABLED
   *     POST_PROCESSING – DISABLED
   */
  readonly stepEnabled?: boolean;
  /**
   * Whether to use the custom Lambda parser defined for the sequence.
   *
   * @default - false
   */
  readonly useCustomParser?: boolean;
  /**
   * The custom prompt template to be used.
   *
   * @default - The default prompt template will be used.
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-placeholders.html
   */
  readonly promptTemplate?: string;
  /**
   * The inference configuration parameters to use.
   */
  readonly inferenceConfig?: InferenceConfiguration;
}

export interface PromptConfiguration {
  /**
   * The custom Lambda parser function to use.
   *
   * @default - The default lambda parser will be used.
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/lambda-parser.html
   */
  readonly parser?: IFunction;

  /**
   * The prompt configurations to override the prompt templates in the agent sequence.
   *
   * @default - No prompt configuration will be overridden.
   */
  readonly steps?: PromptStepConfiguration[];
}
