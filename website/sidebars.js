/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      label: 'Quick Start',
      id: 'quick-start'
    },
    {
      type: 'category',
      label: 'Patterns',
      items: [
        {
          type: 'doc',
          label: 'AWS Rag AppSync StepFn OpenSearch',
          id: 'patterns/aws-rag-appsync-stepfn-opensearch/README'
        },
        {
          type: 'doc',
          label: 'AWS QA AppSync OpenSearch',
          id: 'patterns/aws-qa-appsync-opensearch/README'
        },
        {
          type: 'doc',
          label: 'AWS Summarization AppSync StepFn',
          id: 'patterns/aws-summarization-appsync-stepfn/README'
        },
        {
          type: 'doc',
          label: 'AWS LangChain Common Layer',
          id: 'patterns/aws-langchain-common-layer/README'
        },
        {
          type: 'category',
          label: 'AWS SageMaker Model Deployment',
          items: [
            {
              type: 'doc',
              label: 'Jumpstart',
              id: 'patterns/aws-model-deployment-sagemaker/jumpstart'
            },
            {
              type: 'doc',
              label: 'Hugging Face',
              id: 'patterns/aws-model-deployment-sagemaker/hugging_face'
            },
            {
              type: 'doc',
              label: 'Custom',
              id: 'patterns/aws-model-deployment-sagemaker/custom'
            },
          ],
        }
      ],
    },
    {
      type: 'category',
      label: 'CDK Library',
      items: [
        {
          type: 'doc',
          label: 'Amazon Bedrock',
          id: 'cdk-lib/bedrock',
        },
        {
          type: 'doc',
          label: 'Amazon OpenSearch Serverless Vector Collection',
          id: 'cdk-lib/opensearchserverless',
        },
        {
          type: 'doc',
          label: 'Amazon OpenSearch Vector Index',
          id: 'cdk-lib/opensearch-vectorindex',
        },
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        {
          type: 'category',
          label: 'Classes',
          items: [{
            type: "autogenerated",
            dirName: 'api/classes'
          }]
        },
        {
          type: 'category',
          label: 'Enums',
          items: [{
            type: "autogenerated",
            dirName: 'api/enums'
          }]
        },
        {
          type: 'category',
          label: 'Interfaces',
          items: [{
            type: "autogenerated",
            dirName: 'api/interfaces'
          }]
        },
        {
          type: 'category',
          label: 'Modules',
          items: [{
            type: "autogenerated",
            dirName: 'api/modules'
          }]
        }
      ],
    },
  ],
};

module.exports = sidebars;
