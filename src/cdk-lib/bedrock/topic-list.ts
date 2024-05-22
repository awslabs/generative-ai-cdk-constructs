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

export interface TopicProps {
  readonly name?: string;
  readonly definition?: string;
  readonly examples?: string[];
  readonly type?: string;
}

export class Topic extends Construct {
  private readonly topicConfigList: bedrock.CfnGuardrail.TopicConfigProperty[];

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.topicConfigList = [];
  }

  public createFinancialAdviceTopic(props?: TopicProps): void {
    this.createTopic({
      name: props?.name ?? 'Financial_Advice',
      definition: props?.definition ?? 'Discussions that involve providing guidance, recommendations, or suggestions related to managing, investing, or handling finances, investments, or assets.',
      examples: props?.examples ?? [
        'Can you suggest some good stocks to invest in right now?',
        "What's the best way to save for retirement?",
        'Should I put my money in a high-risk investment?',
        'How can I maximize my returns on investments?',
        'Is it a good time to buy real estate?',
      ],
      type: props?.type ?? 'DENY',
    });
  }

  public createPoliticalAdviceTopic(props?: TopicProps): void {
    this.createTopic({
      name: props?.name ?? 'Political_Advice',
      definition: props?.definition ?? 'Conversations that express views, opinions, or endorsements related to political parties, political ideologies, elections, or political figures.',
      examples: props?.examples ?? [
        "What's your stance on the current government policies?",
        'Do you support party X or Y in the upcoming election?',
        'Can you tell me which political party is better?',
        'What do you think about the new policy introduced by the president?',
        'Should I vote for this candidate?',
      ],
      type: props?.type ?? 'DENY',
    });
  }

  public createTopic(props: TopicProps): void {
    const topicConfig: bedrock.CfnGuardrail.TopicConfigProperty = {
      definition: props.definition || '',
      name: props.name || '',
      type: props.type || '',
      examples: props.examples || [],
    };
    this.topicConfigList.push(topicConfig);
  }

  public topicConfigPropertyList(): bedrock.CfnGuardrail.TopicConfigProperty[] {
    return this.topicConfigList;
  }
}
