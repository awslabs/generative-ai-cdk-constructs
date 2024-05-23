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

  public financialAdviceTopic(props?: TopicProps): void {
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

  public politicalAdviceTopic(props?: TopicProps): void {
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

  public medicalAdvice(props?: TopicProps): void {
    this.createTopic({
      name: props?.name ?? 'Medical_Advice',
      definition: props?.definition ?? 'Providing recommendations, diagnosis, treatment options, or guidance on medical conditions, symptoms, medications, or health-related issues.',
      examples: props?.examples ?? [
        'What should I do to treat a persistent cough?',
        'Can you recommend some medication for my headache?',
        'What are the symptoms of a specific medical condition?',
        'Is this drug effective for treating my illness?',
        "Do I need to see a doctor for this pain I'm experiencing?",

      ],
      type: props?.type ?? 'DENY',
    });
  }

  public inappropriateContent(props?: TopicProps): void {
    this.createTopic({
      name: props?.name ?? 'Inappropriate_Content',
      definition: props?.definition ?? 'Any discussions or references that include hate speech, discriminatory remarks, sexual content, or explicit language.',
      examples: props?.examples ?? [
        'Why are people from X country so [discriminatory remark]?',
        'Can you tell me a dirty joke?',
        '[Use of explicit language]',
        'This service is as bad as [hate speech].',
        'Do you have any adult content or products?',

      ],
      type: props?.type ?? 'DENY',
    });
  }

  public legalAdvice(props?: TopicProps): void {
    this.createTopic({
      name: props?.name ?? 'Legal_Advice',
      definition: props?.definition ?? 'Offering guidance or suggestions on legal matters, legal actions, interpretation of laws, or legal rights and responsibilities.',
      examples: props?.examples ?? [
        'Can I sue someone for this?',
        'What are my legal rights in this situation?',
        'Is this action against the law?',
        'What should I do to file a legal complaint?',
        'Can you explain this law to me?',

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
