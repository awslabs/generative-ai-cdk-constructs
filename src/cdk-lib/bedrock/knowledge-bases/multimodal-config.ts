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

import { CfnKnowledgeBase } from 'aws-cdk-lib/aws-bedrock';

/******************************************************************************
 *                              INTERFACES
 *****************************************************************************/
/**
 * Configuration settings for processing multimodal content in knowledge bases.
 * Multimodal retrieval is currently available only for Amazon S3 data sources.
 */
export interface MultimodalConfig {
  /**
   * Configuration settings for processing audio content in multimodal knowledge bases.
   */
  readonly audio?: AudioConfig;

  /**
   * Configuration settings for processing video content in multimodal knowledge bases.
   */
  readonly video?: VideoConfig;
}

/**
 * Configuration for audio processing in multimodal knowledge bases.
 */
export interface AudioConfig {
  /**
   * Configuration for audio segmentation in multimodal knowledge bases.
   */
  readonly segmentation?: AudioSegmentation;
}

/**
 * Configuration for video processing in multimodal knowledge bases.
 */
export interface VideoConfig {
  /**
   * Configuration for video segmentation in multimodal knowledge bases.
   */
  readonly segmentation?: VideoSegmentation;
}

/******************************************************************************
 *                                 AUDIO
 *****************************************************************************/
/**
 * Configuration for audio segmentation in multimodal knowledge bases.
 */
export class AudioSegmentation {
  /**
   * Creates an audio segmentation configuration with fixed-length duration in seconds.
   *
   * @param durationSeconds The duration of each audio segment in seconds (1-30)
   */
  public static seconds(durationSeconds: number): AudioSegmentation {
    if (
      durationSeconds < AudioSegmentation.MIN_DURATION ||
      durationSeconds > AudioSegmentation.MAX_DURATION
    ) {
      throw new Error(
        `Duration must be between ${AudioSegmentation.MIN_DURATION} and ${AudioSegmentation.MAX_DURATION} seconds`,
      );
    }
    return new AudioSegmentation(durationSeconds);
  }

  /**
   * @deprecated Use AudioSegmentation.seconds() instead
   */
  public static fromFixedLengthDuration(durationSeconds: number): AudioSegmentation {
    return AudioSegmentation.seconds(durationSeconds);
  }

  private static readonly MIN_DURATION = 1;
  private static readonly MAX_DURATION = 30;

  private constructor(private readonly durationSeconds: number) {}

  /**
   * @internal
   */
  public _render(): CfnKnowledgeBase.AudioSegmentationConfigurationProperty {
    return {
      fixedLengthDuration: this.durationSeconds,
    };
  }
}

/******************************************************************************
 *                                 VIDEO
 *****************************************************************************/
/**
 * Configuration for video segmentation in multimodal knowledge bases.
 */
export class VideoSegmentation {
  /**
   * Creates a video segmentation configuration with fixed-length duration in seconds.
   *
   * @param durationSeconds The duration of each video segment in seconds (1-30)
   */
  public static seconds(durationSeconds: number): VideoSegmentation {
    if (
      durationSeconds < VideoSegmentation.MIN_DURATION ||
      durationSeconds > VideoSegmentation.MAX_DURATION
    ) {
      throw new Error(
        `Duration must be between ${VideoSegmentation.MIN_DURATION} and ${VideoSegmentation.MAX_DURATION} seconds`,
      );
    }
    return new VideoSegmentation(durationSeconds);
  }

  /**
   * @deprecated Use VideoSegmentation.seconds() instead
   */
  public static fromFixedLengthDuration(durationSeconds: number): VideoSegmentation {
    return VideoSegmentation.seconds(durationSeconds);
  }

  private static readonly MIN_DURATION = 1;
  private static readonly MAX_DURATION = 30;

  private constructor(private readonly durationSeconds: number) {}

  /**
   * @internal
   */
  public _render(): CfnKnowledgeBase.VideoSegmentationConfigurationProperty {
    return {
      fixedLengthDuration: this.durationSeconds,
    };
  }
}
