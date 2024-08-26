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

import { aws_bedrock as bedrock } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export enum FiltersConfigType {
  VIOLENCE = 'VIOLENCE',
  HATE = 'HATE',
  INSULTS = 'INSULTS',
  MISCONDUCT = 'MISCONDUCT',
  PROMPT_ATTACK = 'PROMPT_ATTACK',
  SEXUAL = 'SEXUAL'

}

export enum FiltersConfigStrength {
  NONE = 'NONE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum ContextualGroundingFilterConfigType {
  /**Grounding score represents the confidence that the model response is factually correct and grounded in the source.
   * If the model response has a lower score than the defined threshold, the response will be blocked and the configured
   * blocked message will be returned to the user. A higher threshold level blocks more responses. */
  GROUNDING = 'GROUNDING',
  /**Relevance score represents the confidence that the model response is relevant to the user's query.
   * If the model response has a lower score than the defined threshold, the response will be blocked and
   * the configured blocked message will be returned to the user. A higher threshold level blocks more responses */
  RELEVANCE = 'RELEVANCE'
}

export interface ContentPolicyConfigProps{
  readonly filtersConfigType: FiltersConfigType;
  readonly inputStrength?: FiltersConfigStrength;
  readonly outputStrength?: FiltersConfigStrength;
}

export interface ContextualGroundingPolicyConfigProps {
  /**The filter details for the guardrails contextual grounding filter.
   * GROUNDING: Validate if the model responses are grounded and factually correct based on the information provided in the reference source,
   * and block responses that are below the defined threshold of grounding.
   * RELEVANCE: Validate if the model responses are relevant to the user's query and block responses
   * that are below the defined threshold of relevance.
  */
  readonly filtersConfigType: ContextualGroundingFilterConfigType;
  /** The threshold details for the guardrails contextual grounding filter.
   * 0 blocks nothing, 0.99 blocks almost everything
  */
  readonly threshold: number;
}

export class ContentPolicyConfig extends Construct {
  readonly contentPolicyConfigList: bedrock.CfnGuardrail.ContentFilterConfigProperty[];

  constructor(scope: Construct, id: string, props?: ContentPolicyConfigProps[]) {
    super(scope, id);
    this.contentPolicyConfigList = this.createContentPolicyConfigList(props);
  }

  private createContentPolicyConfigList(
    props?: ContentPolicyConfigProps[],
  ): bedrock.CfnGuardrail.ContentFilterConfigProperty[] {
    const configList: bedrock.CfnGuardrail.ContentFilterConfigProperty[] = [];
    if (props) {
      for (const prop of props) {
        configList.push(this.createContentFilterConfig(prop));
      }
    } else {
    // set deafault content policy config
      configList.push({
        type: FiltersConfigType.HATE,
        inputStrength: FiltersConfigStrength.HIGH,
        outputStrength: FiltersConfigStrength.HIGH,
      },
      {
        type: FiltersConfigType.VIOLENCE,
        inputStrength: FiltersConfigStrength.HIGH,
        outputStrength: FiltersConfigStrength.HIGH,
      },
      {
        type: FiltersConfigType.MISCONDUCT,
        inputStrength: FiltersConfigStrength.HIGH,
        outputStrength: FiltersConfigStrength.HIGH,
      },
      {
        type: FiltersConfigType.PROMPT_ATTACK,
        inputStrength: FiltersConfigStrength.NONE,
        outputStrength: FiltersConfigStrength.NONE,
      },
      {
        type: FiltersConfigType.SEXUAL,
        inputStrength: FiltersConfigStrength.HIGH,
        outputStrength: FiltersConfigStrength.HIGH,
      },
      {
        type: FiltersConfigType.INSULTS,
        inputStrength: FiltersConfigStrength.HIGH,
        outputStrength: FiltersConfigStrength.HIGH,
      });
    }
    return configList;
  }

  private createContentFilterConfig(
    prop: ContentPolicyConfigProps,
  ): bedrock.CfnGuardrail.ContentFilterConfigProperty {
    switch (prop.filtersConfigType) {
      case FiltersConfigType.HATE:
        return {
          type: prop.filtersConfigType ?? FiltersConfigType.HATE,
          inputStrength: prop.inputStrength ?? FiltersConfigStrength.NONE,
          outputStrength: prop.outputStrength ?? FiltersConfigStrength.NONE,
        };
      case FiltersConfigType.PROMPT_ATTACK:
        return {
          type: prop.filtersConfigType ?? FiltersConfigType.PROMPT_ATTACK,
          inputStrength: prop.inputStrength ?? FiltersConfigStrength.NONE,
          outputStrength: prop.outputStrength ?? FiltersConfigStrength.NONE,
        };
      case FiltersConfigType.SEXUAL:
        return {
          type: prop.filtersConfigType ?? FiltersConfigType.SEXUAL,
          inputStrength: prop.inputStrength ?? FiltersConfigStrength.NONE,
          outputStrength: prop.outputStrength ?? FiltersConfigStrength.NONE,
        };
      case FiltersConfigType.MISCONDUCT:
        return {
          type: prop.filtersConfigType ?? FiltersConfigType.MISCONDUCT,
          inputStrength: prop.inputStrength ?? FiltersConfigStrength.NONE,
          outputStrength: prop.outputStrength ?? FiltersConfigStrength.NONE,
        };
      case FiltersConfigType.INSULTS:
        return {
          type: prop.filtersConfigType ?? FiltersConfigType.INSULTS,
          inputStrength: prop.inputStrength ?? FiltersConfigStrength.NONE,
          outputStrength: prop.outputStrength ?? FiltersConfigStrength.NONE,
        };
      case FiltersConfigType.VIOLENCE:
        return {
          type: prop.filtersConfigType ?? FiltersConfigType.VIOLENCE,
          inputStrength: prop.inputStrength ?? FiltersConfigStrength.NONE,
          outputStrength: prop.outputStrength ?? FiltersConfigStrength.NONE,
        };
      default:
        throw new Error('Invalid content ploicy config type');
    }
  }
}
