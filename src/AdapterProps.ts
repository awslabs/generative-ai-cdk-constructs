// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import type { aws_lambda, RemovalPolicy } from 'aws-cdk-lib';

/**
 * AdapterProps
 */
export interface AdapterProps {
  /**
   * The runtimes compatible with this Layer.
   * @default - All runtimes are supported.
   * @stability stable
   */
  readonly compatibleRuntimes?: Array<aws_lambda.Runtime>;
  /**
   * The system architectures compatible with this layer.
   * @default [Architecture.X86_64]
   * @stability stable
   */
  readonly compatibleArchitectures?: Array<aws_lambda.Architecture>;
  /**
   * Whether to retain this version of the layer when a new version is added or when the stack is deleted.
   * @default RemovalPolicy.DESTROY
   * @stability stable
   */
  readonly removalPolicy?: RemovalPolicy;
  /**
   * The SPDX licence identifier or URL to the license file for this layer.
   * @default - No license information will be recorded.
   * @stability stable
   */
  readonly license?: string;
  /**
   * The name of the layer.
   * @default - A name will be generated.
   * @stability stable
   */
  readonly layerVersionName?: string;
}