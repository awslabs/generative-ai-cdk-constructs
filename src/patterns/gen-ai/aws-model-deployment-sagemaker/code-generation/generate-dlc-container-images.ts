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
import { execSync } from 'node:child_process';
import * as path from 'path';
import { GenerateUtils } from './generate-utils';

const regionName = 'us-west-2';
const startVersionRegex = /^\d+\.\d+\.\d+-/;
const versionRegex = /-v\d+(\.\d+)*(-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2})?$/;

const repositories = [
  'huggingface-pytorch-tgi-inference',
  'huggingface-pytorch-inference',
  'huggingface-tensorflow-inference',
  'huggingface-pytorch-inference-neuronx',
  'djl-inference',
];

const DEEP_LEARNING_CONTAINER_IMAGE_PATH = path.join(
  __dirname,
  '../deep-learning-container-image.ts',
);

export async function generateDLCContainerImages() {
  console.log('Getting DLC container image data');

  const output = execSync(
    `aws ecr get-authorization-token --output text --query 'authorizationData[].authorizationToken' --region ${regionName}`,
  );

  const token = output.toString();
  const repositoryTagData: { [repositoryName: string]: string[] } = {};
  for (const repositoryName of repositories) {
    console.log(repositoryName);

    const pageSize = 1000;
    const hostname = '763104351884.dkr.ecr.us-west-2.amazonaws.com';
    let link = `/v2/${repositoryName}/tags/list?n=${pageSize}`;
    let tags: string[] = [];

    while (link) {
      const [data, response] = await GenerateUtils.downloadJSON({
        hostname,
        port: 443,
        method: 'GET',
        path: link,
        headers: {
          Authorization: `Basic ${token.trim()}`,
        },
      });

      tags.push(...data.tags);

      link = response.headers.link;
      if (link) {
        console.log(link);
        link = link.substring(1, link.indexOf('>')).split(hostname)[1];
        console.log('Link:', link);
      }
    }

    tags = tags.filter((tag: string) => startVersionRegex.test(tag));
    if (
      repositoryName == 'huggingface-tensorflow-inference' ||
      repositoryName == 'huggingface-pytorch-inference' ||
      repositoryName == 'huggingface-pytorch-inference-neuronx'
    ) {
      tags = tags.filter((tag: string) => tag.includes('-transformers'));
    } else if (repositoryName == 'huggingface-pytorch-tgi-inference') {
      tags = tags.filter((tag: string) => tag.includes('-tgi'));
    } else if (repositoryName == 'djl-inference') {
      tags = tags.filter(
        (tag: string) =>
          tag.includes('-deepspeed') ||
          tag.includes('-fastertransformer') ||
          tag.includes('-neuronx'),
      );
    }

    tags = tags.map((tag: string) => tag.replace(versionRegex, ''));
    tags = Array.from(new Set(tags)).sort();

    repositoryTagData[repositoryName] = tags;
    console.log(tags);
  }

  generateCode(repositoryTagData);
}

export async function getRepositories() {
  const repositoryNames = new Set<string>();

  const GITHUB_URL =
    'https://raw.githubusercontent.com/aws/sagemaker-python-sdk/master/src/sagemaker/image_uri_config';
  const fileNames = [
    `${GITHUB_URL}/huggingface-llm.json`,
    `${GITHUB_URL}/huggingface.json`,
    `${GITHUB_URL}/huggingface-neuronx.json`,
    `${GITHUB_URL}/djl-deepspeed.json`,
    `${GITHUB_URL}/djl-fastertransformer.json`,
    `${GITHUB_URL}/djl-neuronx.json`,
  ];

  for (const fileName of fileNames) {
    const [data] = await GenerateUtils.downloadJSON(fileName);

    console.log('Processing file:', fileName);
    const versions = data.versions || data.inference.versions;

    for (const version of Object.keys(versions)) {
      const versionData = versions[version];
      const versionAliases = versionData.version_aliases;

      const items: any[] = [];
      if (versionAliases) {
        for (const versionAlias of Object.keys(versionAliases)) {
          items.push(versionData[versionAliases[versionAlias]]);
        }
      } else {
        items.push(versionData);
      }

      for (const item of items) {
        const repositoryName = item.repository;
        repositoryNames.add(repositoryName);
      }
    }
  }

  console.log('Repositories:', new Array(...repositories));

  return repositoryNames;
}

function generateCode(repositoryTagData: {
  [repositoryName: string]: string[];
}) {
  let imagesStr = '';

  for (const repositoryName of Object.keys(repositoryTagData).sort()) {
    const tags = repositoryTagData[repositoryName].sort();
    const repositoryNameStr = GenerateUtils.replaceAll(
      repositoryName,
      '-',
      '_',
    ).toUpperCase();

    for (const tagName of tags) {
      const tagNameStr = GenerateUtils.replaceAllBatch(
        tagName,
        ['\\.', '-'],
        '_',
      ).toUpperCase();

      const name = `${repositoryNameStr}_${tagNameStr}`;

      imagesStr += `\tpublic static readonly ${name} = this.fromDeepLearningContainerImage('${repositoryName}','${tagName}');\n`;
    }
  }

  const fileStr = `/**
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
import { Stack } from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';
import { FactName } from 'aws-cdk-lib/region-info';
import { Construct } from 'constructs';
import { ContainerImage, ContainerImageConfig } from './container-image';  

export class DeepLearningContainerImage extends ContainerImage {
${imagesStr}

  public static fromDeepLearningContainerImage(
    repositoryName: string,
    tag: string,
    accountId?: string
  ): ContainerImage {
    return new DeepLearningContainerImage(repositoryName, tag, accountId);
  }

  constructor(
    private readonly repositoryName: string,
    private readonly tag: string,
    private readonly accountId?: string
  ) {
    super();
  }

  public bind(
    scope: Construct,
    grantable: iam.IGrantable
  ): ContainerImageConfig {
    const accountId =
      this.accountId ??
      Stack.of(scope).regionalFact(FactName.DLC_REPOSITORY_ACCOUNT);

    const repository = ecr.Repository.fromRepositoryAttributes(
      scope,
      'DeepLearningContainerRepository',
      {
        repositoryName: this.repositoryName,
        repositoryArn: ecr.Repository.arnForLocalRepository(
          this.repositoryName,
          scope,
          accountId
        ),
      }
    );

    repository.grantPull(grantable);

    return { imageName: repository.repositoryUri + ':' + this.tag };
  }
}
`;

  GenerateUtils.writeFileSyncWithDirs(
    DEEP_LEARNING_CONTAINER_IMAGE_PATH,
    fileStr,
  );
}
