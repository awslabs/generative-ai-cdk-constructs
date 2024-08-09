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
import {
  OpenSearchServerlessClient,
  BatchGetCollectionCommand,
  CollectionStatus,
} from '@aws-sdk/client-opensearchserverless';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import {
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse,
} from 'aws-lambda';

interface VectorIndexProperties {
  CollectionName: string;
  Endpoint: string;
  IndexName: string;
  VectorField: string;
  VectorDimension: number;
  Engine: string;
  SpaceType: string;
  MethodName: string;
  Parameters: string;
  NumberOfShards: number;
  EfSearch: number;
  CustomSettings: string;
  MetadataManagement: Array<{
    MappingField: string;
    DataType: string;
    Filterable: boolean;
  }>;
  Analyzer?: {
    CharacterFilters: string[];
    Tokenizer: string;
    TokenFilters: string[];
  };
}

const serverlessClient = new OpenSearchServerlessClient({
  region: process.env.REGION,
});

async function waitForCollectionActive(collectionName: string): Promise<void> {
  console.log(`Waiting for collection ${collectionName} to become active`);
  let attempts = 0;
  while (true) {
    attempts++;
    try {
      const input = { names: [collectionName] };
      console.log(
        `Attempt ${attempts}: Sending BatchGetCollectionCommand with input:`,
        JSON.stringify(input),
      );

      const response = await serverlessClient.send(
        new BatchGetCollectionCommand(input),
      );
      console.log(
        `Attempt ${attempts}: Full BatchGetCollectionCommand response:`,
        JSON.stringify(response),
      );

      if (response.collectionDetails && response.collectionDetails.length > 0) {
        const collectionDetail = response.collectionDetails[0];
        console.log(
          `Attempt ${attempts}: Collection detail:`,
          JSON.stringify(collectionDetail),
        );

        if (collectionDetail.status === CollectionStatus.ACTIVE) {
          console.log(`Collection ${collectionName} is now active`);
          return;
        }
        console.log(
          `Collection ${collectionName} status: ${collectionDetail.status}`,
        );
      } else {
        console.log(`Attempt ${attempts}: Collection not found in response`);
      }
    } catch (error) {
      console.error('Error checking collection status:', error);
    }

    if (attempts >= 30) {
      throw new Error(
        `Timeout waiting for collection ${collectionName} to become active`,
      );
    }
    console.log('Waiting 10 seconds before next attempt...');
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}

async function getOpenSearchClient(collectionName: string): Promise<Client> {
  console.log(`Getting OpenSearch client for collection: ${collectionName}`);
  const input = { names: [collectionName] };
  const collectionResponse = await serverlessClient.send(
    new BatchGetCollectionCommand(input),
  );

  if (
    !collectionResponse.collectionDetails ||
    collectionResponse.collectionDetails.length === 0
  ) {
    throw new Error(`Collection ${collectionName} not found`);
  }

  const collectionEndpoint =
    collectionResponse.collectionDetails[0].collectionEndpoint;
  if (!collectionEndpoint) {
    throw new Error(`Unable to get endpoint for collection ${collectionName}`);
  }

  console.log(`Collection endpoint: ${collectionEndpoint}`);

  return new Client({
    ...AwsSigv4Signer({
      region: process.env.REGION || '',
      service: 'aoss',
      getCredentials: () => defaultProvider()(),
    }),
    node: collectionEndpoint,
  });
}

async function createOrUpdateIndex(
  props: VectorIndexProperties,
  client: Client,
): Promise<void> {
  const body: any = {
    mappings: {
      properties: {
        id: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256,
            },
          },
        },
        [props.VectorField]: {
          type: 'knn_vector',
          dimension: props.VectorDimension,
          method: {
            engine: props.Engine,
            space_type: props.SpaceType,
            name: props.MethodName,
            parameters: JSON.parse(props.Parameters),
          },
        },
      },
    },
    settings: {
      index: {
        'number_of_shards': props.NumberOfShards,
        'knn.algo_param': {
          ef_search: props.EfSearch,
        },
        'knn': true,
      },
      ...JSON.parse(props.CustomSettings),
    },
  };

  // Add metadata management fields
  props.MetadataManagement.forEach((field) => {
    body.mappings.properties[field.MappingField] = {
      type: field.DataType,
      index: field.Filterable,
    };
  });

  // Add analyzer if provided
  if (props.Analyzer) {
    body.settings.analysis = {
      analyzer: {
        custom_analyzer: {
          type: 'custom',
          tokenizer: props.Analyzer.Tokenizer,
          char_filter: props.Analyzer.CharacterFilters,
          filter: props.Analyzer.TokenFilters,
        },
      },
    };
  }

  try {
    console.log(`Creating/Updating index: ${props.IndexName}`);
    console.log('Index body:', JSON.stringify(body, null, 2));
    console.log('Client configuration:', JSON.stringify(client, null, 2));

    const indexExists = await client.indices.exists({ index: props.IndexName });
    console.log(`Index exists: ${JSON.stringify(indexExists)}`);

    if (indexExists.body) {
      console.log(`Updating existing index: ${props.IndexName}`);
      await client.indices.close({ index: props.IndexName });
      await client.indices.putMapping({
        index: props.IndexName,
        body: body.mappings,
      });
      await client.indices.putSettings({
        index: props.IndexName,
        body: { settings: body.settings },
      });
      await client.indices.open({ index: props.IndexName });
    } else {
      console.log(`Creating new index: ${props.IndexName}`);
      await client.indices.create({
        index: props.IndexName,
        body: body,
      });
    }
    console.log(`Index ${props.IndexName} created/updated successfully`);
  } catch (error: any) {
    console.error('Error creating/updating index:', error);
    if (error.meta && error.meta.body) {
      console.error('Error body:', JSON.stringify(error.meta.body, null, 2));
    }
    throw error;
  }
}

async function deleteIndex(
  props: VectorIndexProperties,
  client: Client,
): Promise<void> {
  try {
    console.log(`Deleting index: ${props.IndexName}`);
    const indexExists = await client.indices.exists({ index: props.IndexName });
    if (indexExists.body) {
      await client.indices.delete({ index: props.IndexName });
      console.log(`Index ${props.IndexName} deleted successfully`);
    } else {
      console.log(`Index ${props.IndexName} does not exist, skipping deletion`);
    }
  } catch (error) {
    console.error('Error deleting index:', error);
    throw error;
  }
}

export const handler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<CloudFormationCustomResourceResponse> => {
  console.log(`Received event: ${JSON.stringify(event)}`);

  const props: VectorIndexProperties =
    event.ResourceProperties as unknown as VectorIndexProperties;

  try {
    await waitForCollectionActive(props.CollectionName);
    const client = await getOpenSearchClient(props.CollectionName);

    switch (event.RequestType) {
      case 'Create':
      case 'Update':
        await createOrUpdateIndex(props, client);
        break;
      case 'Delete':
        await deleteIndex(props, client);
        break;
      default:
        throw new Error(`Invalid request type: ${JSON.stringify(event)}`);
    }

    return {
      PhysicalResourceId: `${props.CollectionName}/${props.IndexName}`,
      Status: 'SUCCESS',
      StackId: event.StackId,
      RequestId: event.RequestId,
      LogicalResourceId: event.LogicalResourceId,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      PhysicalResourceId: `${props.CollectionName}/${props.IndexName}`,
      Status: 'FAILED',
      Reason: error instanceof Error ? error.message : String(error),
      StackId: event.StackId,
      RequestId: event.RequestId,
      LogicalResourceId: event.LogicalResourceId,
    };
  }
};
