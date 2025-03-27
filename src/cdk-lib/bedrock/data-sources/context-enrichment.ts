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

import { CfnDataSource } from "aws-cdk-lib/aws-bedrock";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { BedrockFoundationModel, IInvokable } from "../models";

/**
 * Enum representing the types of context enrichment strategies available for
 * Amazon Bedrock Knowledge Bases. These strategies determine how additional context
 * and metadata is extracted from documents during ingestion.
 *
 * Currently supports:
 * - `FOUNDATION_MODEL` enrichment using Bedrock models to extract semantic information
 *   for GraphRAG capabilities that combine graph modeling with generative AI
 */
export enum ContextEnrichmentType {
  /**
   * Uses a Bedrock Foundation Model for advanced context enrichment.
   * Enables AI-powered extraction of semantic information and entities from documents.
   * Powers GraphRAG functionality by automatically identifying relationships between:
   * - Entities across documents
   * - Structural elements like section titles
   * - Related facts and concepts
   */
  FOUNDATION_MODEL = "BEDROCK_FOUNDATION_MODEL",
}

/**
 * Enum representing the available methods for foundation model context enrichment.
 * These methods specify how the foundation model processes and extracts information
 * from documents during ingestion.
 */
export enum FoundationModelContextEnrichmentMethodType {
  /**
   * Extracts named entities and key information from document chunks to enable GraphRAG.
   * Creates semantic connections between document segments by identifying:
   * - Named entities (people, places, organizations)
   * - Key concepts and topics
   * - Relationships between entities
   * - Structural elements (section titles, hierarchies)
   *
   * Benefits:
   * - Enhanced cross-document reasoning
   * - Multi-step logical connections
   * - More comprehensive and contextually relevant responses
   * - Improved accuracy and reduced hallucinations
   * - Better handling of complex queries requiring information from multiple sources
   */
  CHUNK_ENTITY_EXTRACTION = "CHUNK_ENTITY_EXTRACTION",
}

/**
 * Properties for configuring a Foundation Model context enrichment strategy.
 * Defines how AI models extract additional semantic context from documents
 * during Knowledge Base ingestion.
 */
export interface FoundationModelContextEnrichmentProps {
  /**
   * The Foundation Model to use for extracting semantic information and entities.
   * Must be a compatible Bedrock model that supports entity extraction.
   * Currently only supports Claude 3 Haiku.
   * @default BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0
   */
  readonly model?: IInvokable;

  /**
   * The method to use for context enrichment.
   * Specifies how the foundation model processes documents and extracts semantic information.
   * Controls the type of entities and relationships that are identified.
   * @default FoundationModelContextEnrichmentMethodType.CHUNK_ENTITY_EXTRACTION
   */
  readonly method?: FoundationModelContextEnrichmentMethodType;
}

/**
 * Represents an advanced parsing strategy configuration for Knowledge Base ingestion.
 * @see https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking-parsing.html#kb-advanced-parsing
 */
export abstract class ContextEnrichment {
  // ------------------------------------------------------
  // FM Parsing Strategy
  // ------------------------------------------------------
  /**
   * Creates a Foundation Model-based parsing strategy for extracting non-textual information
   * from documents such as tables and charts.
   * - Additional costs apply when using advanced parsing due to foundation model usage.
   * - There are limits on file types (PDF) and total data that can be parsed using advanced parsing.
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-ds.html#kb-ds-supported-doc-formats-limits
   */
  public static foundationModel(props: FoundationModelContextEnrichmentProps): ContextEnrichment {
    const enrichmentModel = props.model ?? BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0;
    const enrichmentMethod =
      props.method ?? FoundationModelContextEnrichmentMethodType.CHUNK_ENTITY_EXTRACTION;
    class FoundationModelTransformation extends ContextEnrichment {
      /** The CloudFormation property representation of this configuration */
      public readonly configuration: CfnDataSource.ContextEnrichmentConfigurationProperty = {
        type: ContextEnrichmentType.FOUNDATION_MODEL,
        bedrockFoundationModelConfiguration: {
          modelArn: enrichmentModel.invokableArn,
          enrichmentStrategyConfiguration: {
            method: enrichmentMethod,
          },
        },
      };

      public generatePolicyStatements(): PolicyStatement[] {
        return [
          new PolicyStatement({
            actions: ["bedrock:InvokeModel*"],
            resources: [enrichmentModel.invokableArn],
          }),
        ];
      }
    }

    return new FoundationModelTransformation();
  }
  // ------------------------------------------------------
  // Properties
  // ------------------------------------------------------
  /** The CloudFormation property representation of this configuration */
  public abstract configuration: CfnDataSource.ContextEnrichmentConfigurationProperty;

  public abstract generatePolicyStatements(): PolicyStatement[];
}
