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

export enum CharacterFilterType {
  ICU_NORMALIZER = 'icu_normalizer',
}

// Currently we only support Kuromoji and ICU tokenizers.
// Also see the following link for more information regarding supported plugins:
// https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-genref.html#serverless-plugins
export enum TokenizerType {
  KUROMOJI_TOKENIZER = 'kuromoji_tokenizer',
  ICU_TOKENIZER = 'icu_tokenizer',
}

export enum TokenFilterType {
  KUROMOJI_BASEFORM = 'kuromoji_baseform',
  KUROMOJI_PART_OF_SPEECH = 'kuromoji_part_of_speech',
  KUROMOJI_STEMMER = 'kuromoji_stemmer',
  CJK_WIDTH = 'cjk_width',
  JA_STOP = 'ja_stop',
  LOWERCASE = 'lowercase',
  ICU_FOLDING = 'icu_folding',
}
