// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import type { RemovalPolicy } from 'aws-cdk-lib';

/**
 * LangchainProps
 */
export interface LangchainProps {
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
  /**
   * The description the this Lambda Layer.
   * @default - No description.
   * @stability stable
   */
  readonly description?: string;
}
