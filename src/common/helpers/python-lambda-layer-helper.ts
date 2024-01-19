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
import { execSync } from 'child_process';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3assets from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';

export interface LayerProps {
  runtime: lambda.Runtime;
  architecture: lambda.Architecture;
  path: string;
  description: string;
  autoUpgrade?: boolean;
  local?: 'python' | 'python3';
}

export class Layer extends Construct {
  public layer: lambda.LayerVersion;

  constructor(scope: Construct, id: string, props: LayerProps) {
    super(scope, id);

    const { runtime, architecture, path, description, autoUpgrade, local } = props;

    const args = local ? [] : ['-t /asset-output/python'];
    if (autoUpgrade) {
      args.push('--upgrade');
    }

    const layerAsset = new s3assets.Asset(this, 'LayerAsset', {
      path,
      bundling: local ? {
        // If local is true use the host to install the requirements
        image: runtime.bundlingImage,
        local: {
          tryBundle(outputDir) {
            execSync(`${local} -m venv venv`);
            execSync('source venv/bin/activate');
            execSync(`pip install -r ${path}/requirements.txt -t ${outputDir}/python ${args.join(' ')}`);
            return true;
          },
        },
      } : {
        // Default: Docker is used to install the requirements
        image: runtime.bundlingImage,
        platform: architecture.dockerPlatform,
        command: [
          'bash',
          '-c',
          `pip install -r requirements.txt ${args.join(' ')}`,
        ],
        outputType: cdk.BundlingOutput.AUTO_DISCOVER,
        securityOpt: 'no-new-privileges:true',
        network: 'host',
      },
    });

    const layer = new lambda.LayerVersion(this, 'Layer', {
      code: lambda.Code.fromBucket(layerAsset.bucket, layerAsset.s3ObjectKey),
      compatibleRuntimes: [runtime],
      compatibleArchitectures: [architecture],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      description: description,
    });

    this.layer = layer;
  }
}