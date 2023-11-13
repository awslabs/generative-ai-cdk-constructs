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
import * as fs from 'fs';
import * as path from 'path';
import { GenerateUtils } from './generate-utils';
import { JumpStartConstants } from '../private/jumpstart-constants';

interface JumpStartModelManifest {
  model_id: string;
  version: string;
  spec_key: string;
}

interface JumpStartModelSpec {
  deprecated: boolean;
  hosting_ecr_specs: {
    framework: string;
  };
  default_inference_instance_type: string;
  supported_inference_instance_types: string[];
  hosting_model_package_arns?: { [region: string]: string };
  hosting_use_script_uri: string;
  hosting_artifact_key?: string;
  hosting_script_key?: string;
  hosting_prepacked_artifact_key?: string;
  inference_environment_variables: {
    name: string;
    type: string;
    default: string;
    scope: string;
    required_for_model_class: boolean;
  }[];
  hosting_instance_type_variants?: {
    regional_aliases?: { [region: string]: { [key: string]: string } };
    variants: {
      [key: string]: {
        regional_properties?: {
          image_uri: string;
        };
        properties?: {
          environment_variables: {
            [key: string]: string;
          };
        };
      };
    };
  };
}

interface ModelsData {
  [modelId: string]: {
    [version: string]: JumpStartModelSpec;
  };
}

const JUMPSTART_CACHE_PATH = path.join(__dirname, './.cache/jumpstart-models-cache.json');

const JUMPSTART_MODEL_PATH = path.join(__dirname, '../jumpstart-model.ts');

const ALLOWED_FRAMEWORKS = [
  'huggingface',
  'huggingface-llm',
  'djl-deepspeed',
  'djl-fastertransformer',
  'stabilityai',
];

export async function generateJumpStartModels() {
  console.log('Getting JumpStart models data');

  await download_data();
  generateCode();
}

export async function download_data() {
  console.log('Downloading JumpStart models data');

  const regions = JumpStartConstants.JUMPSTART_LAUNCHED_REGIONS;
  const regionNames = Object.keys(regions).filter((c) => c === 'us-east-1');
  const models: ModelsData = {};
  const frameworks = new Set<string>();

  for (const regionName of regionNames) {
    console.log(`Processing region ${regionName}`);
    const regionData = regions[regionName];
    const manifestS3Key = JumpStartConstants.JUMPSTART_DEFAULT_MANIFEST_FILE_S3_KEY;
    const url = `https://${regionData.contentBucket}.s3.${regionName}.amazonaws.com/${manifestS3Key}`;
    const [manifest]: [JumpStartModelManifest[]] = await GenerateUtils.downloadJSON(url);

    for (const model of manifest) {
      const specUrl = `https://${regionData.contentBucket}.s3.${regionName}.amazonaws.com/${model.spec_key}`;
      const [modelSpec]: [JumpStartModelSpec] = await GenerateUtils.downloadJSON(specUrl);

      const {
        deprecated,
        hosting_ecr_specs,
        default_inference_instance_type,
        supported_inference_instance_types,
        hosting_model_package_arns,
        hosting_use_script_uri,
        hosting_script_key,
        hosting_artifact_key,
        hosting_prepacked_artifact_key,
        inference_environment_variables,
        hosting_instance_type_variants,
      } = modelSpec;

      const allowedFramework = ALLOWED_FRAMEWORKS.includes(hosting_ecr_specs.framework);

      console.log(
        `${deprecated ? '[DEPRECATED] ' : ''}${
          !allowedFramework ? '[SKIP:' + hosting_ecr_specs.framework + '] ' : ''
        }${model.model_id}/${model.version}`,
      );

      frameworks.add(hosting_ecr_specs.framework);
      if (deprecated) continue;
      if (!ALLOWED_FRAMEWORKS.includes(hosting_ecr_specs.framework)) continue;
      if (
        hosting_use_script_uri ||
        (!hosting_prepacked_artifact_key && !hosting_model_package_arns && !hosting_artifact_key)
      ) {
        throw new Error('No model data');
      }

      models[model.model_id] = models[model.model_id] ?? {};
      models[model.model_id][model.version] = models[model.model_id][model.version] ?? {};

      models[model.model_id][model.version] = {
        deprecated,
        hosting_ecr_specs,
        default_inference_instance_type,
        supported_inference_instance_types,
        hosting_model_package_arns,
        hosting_use_script_uri,
        hosting_artifact_key,
        hosting_script_key,
        hosting_prepacked_artifact_key,
        inference_environment_variables,
        hosting_instance_type_variants,
      };
    }
  }

  GenerateUtils.writeFileSyncWithDirs(JUMPSTART_CACHE_PATH, JSON.stringify(models));

  console.log('Frameworks', Array.from(frameworks));
}

function generateCode() {
  console.log('Generating JumpStart models data');

  const data = JSON.parse(fs.readFileSync(JUMPSTART_CACHE_PATH, 'utf8'));

  let modelsStr = '';
  for (const modelId of Object.keys(data)) {
    for (const version of Object.keys(data[modelId])) {
      const modelName = `${GenerateUtils.replaceAll(modelId, '-', '_')}_${GenerateUtils.replaceAll(
        version,
        '\\.',
        '_',
      )}`.toUpperCase();

      const specSource = data[modelId][version];
      const environment: { [key: string]: string | number | boolean } = {};
      for (const env of specSource.inference_environment_variables) {
        environment[env.name] = env.default;
      }

      const spec = {
        modelId,
        version,
        defaultInstanceType: specSource.default_inference_instance_type,
        instanceTypes: specSource.supported_inference_instance_types,
        modelPackageArns: specSource.hosting_model_package_arns,
        prepackedArtifactKey: specSource.hosting_prepacked_artifact_key,
        artifactKey: specSource.hosting_artifact_key,
        environment,
        instanceAliases: specSource.hosting_instance_type_variants?.regional_aliases,
        instanceVariants: specSource.hosting_instance_type_variants?.variants,
      };

      if (spec.modelPackageArns) {
        delete spec.artifactKey;
        delete spec.prepackedArtifactKey;
      }

      modelsStr += `\tpublic static readonly ${modelName} = this.of(${JSON.stringify(spec)});\n`;
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

export interface IJumpStartModelSpec {
  modelId: string;
  version: string;
  defaultInstanceType: string;
  instanceTypes: string[];
  modelPackageArns?: { [region: string]: string };
  prepackedArtifactKey?: string;
  artifactKey?: string;
  environment: { [key: string]: string | number | boolean  },
  instanceAliases?:  { [region: string]: { [key: string]: string } },
  instanceVariants?: {
    [key: string]: {
      regional_properties?: {
        image_uri: string;
      };
      properties?: {
        environment_variables: {
          [key: string]: string;
        };
      };
    };
  };
}

export class JumpStartModel {
${modelsStr}

  constructor(private readonly spec: IJumpStartModelSpec) {}

  public static of(
    spec: IJumpStartModelSpec
  ): JumpStartModel {
    return new JumpStartModel(spec);
  }

  public bind(): IJumpStartModelSpec {
    return this.spec;
  }
}`;

  GenerateUtils.writeFileSyncWithDirs(JUMPSTART_MODEL_PATH, fileStr);
}
