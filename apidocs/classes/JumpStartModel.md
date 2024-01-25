[@cdklabs/generative-ai-cdk-constructs](../README.md) / JumpStartModel

# Class: JumpStartModel

## Table of contents

### Constructors

- [constructor](JumpStartModel.md#constructor)

### Properties

- [name](JumpStartModel.md#name)
- [HUGGINGFACE\_ASR\_WHISPER\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_asr_whisper_base_1_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_BASE\_1\_0\_1](JumpStartModel.md#huggingface_asr_whisper_base_1_0_1)
- [HUGGINGFACE\_ASR\_WHISPER\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_asr_whisper_base_2_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_LARGE\_1\_0\_0](JumpStartModel.md#huggingface_asr_whisper_large_1_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_LARGE\_1\_0\_1](JumpStartModel.md#huggingface_asr_whisper_large_1_0_1)
- [HUGGINGFACE\_ASR\_WHISPER\_LARGE\_2\_0\_0](JumpStartModel.md#huggingface_asr_whisper_large_2_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_LARGE\_V2\_1\_0\_0](JumpStartModel.md#huggingface_asr_whisper_large_v2_1_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_LARGE\_V2\_1\_0\_1](JumpStartModel.md#huggingface_asr_whisper_large_v2_1_0_1)
- [HUGGINGFACE\_ASR\_WHISPER\_LARGE\_V2\_2\_0\_0](JumpStartModel.md#huggingface_asr_whisper_large_v2_2_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_MEDIUM\_1\_0\_0](JumpStartModel.md#huggingface_asr_whisper_medium_1_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_MEDIUM\_1\_0\_1](JumpStartModel.md#huggingface_asr_whisper_medium_1_0_1)
- [HUGGINGFACE\_ASR\_WHISPER\_MEDIUM\_2\_0\_0](JumpStartModel.md#huggingface_asr_whisper_medium_2_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_SMALL\_1\_0\_0](JumpStartModel.md#huggingface_asr_whisper_small_1_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_SMALL\_1\_0\_1](JumpStartModel.md#huggingface_asr_whisper_small_1_0_1)
- [HUGGINGFACE\_ASR\_WHISPER\_SMALL\_2\_0\_0](JumpStartModel.md#huggingface_asr_whisper_small_2_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_TINY\_1\_0\_0](JumpStartModel.md#huggingface_asr_whisper_tiny_1_0_0)
- [HUGGINGFACE\_ASR\_WHISPER\_TINY\_1\_0\_1](JumpStartModel.md#huggingface_asr_whisper_tiny_1_0_1)
- [HUGGINGFACE\_ASR\_WHISPER\_TINY\_2\_0\_0](JumpStartModel.md#huggingface_asr_whisper_tiny_2_0_0)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_eqa_bert_base_cased_1_0_0)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_1\_0\_1](JumpStartModel.md#huggingface_eqa_bert_base_cased_1_0_1)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_1\_0\_2](JumpStartModel.md#huggingface_eqa_bert_base_cased_1_0_2)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_eqa_bert_base_cased_2_0_0)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_eqa_bert_base_multilingual_cased_1_0_0)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1](JumpStartModel.md#huggingface_eqa_bert_base_multilingual_cased_1_0_1)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2](JumpStartModel.md#huggingface_eqa_bert_base_multilingual_cased_1_0_2)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_eqa_bert_base_multilingual_cased_2_0_0)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_eqa_bert_base_multilingual_uncased_1_0_0)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_1](JumpStartModel.md#huggingface_eqa_bert_base_multilingual_uncased_1_0_1)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_2](JumpStartModel.md#huggingface_eqa_bert_base_multilingual_uncased_1_0_2)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_eqa_bert_base_multilingual_uncased_2_0_0)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_eqa_bert_base_uncased_1_0_0)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_1\_0\_1](JumpStartModel.md#huggingface_eqa_bert_base_uncased_1_0_1)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_1\_0\_2](JumpStartModel.md#huggingface_eqa_bert_base_uncased_1_0_2)
- [HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_eqa_bert_base_uncased_2_0_0)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_eqa_bert_large_cased_1_0_0)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_1\_0\_1](JumpStartModel.md#huggingface_eqa_bert_large_cased_1_0_1)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_1\_0\_2](JumpStartModel.md#huggingface_eqa_bert_large_cased_1_0_2)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_eqa_bert_large_cased_2_0_0)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_0](JumpStartModel.md#huggingface_eqa_bert_large_cased_whole_word_masking_1_0_0)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_1](JumpStartModel.md#huggingface_eqa_bert_large_cased_whole_word_masking_1_0_1)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_2](JumpStartModel.md#huggingface_eqa_bert_large_cased_whole_word_masking_1_0_2)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_2\_0\_0](JumpStartModel.md#huggingface_eqa_bert_large_cased_whole_word_masking_2_0_0)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_eqa_bert_large_uncased_1_0_0)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_1\_0\_1](JumpStartModel.md#huggingface_eqa_bert_large_uncased_1_0_1)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_1\_0\_2](JumpStartModel.md#huggingface_eqa_bert_large_uncased_1_0_2)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_eqa_bert_large_uncased_2_0_0)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_0](JumpStartModel.md#huggingface_eqa_bert_large_uncased_whole_word_masking_1_0_0)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_1](JumpStartModel.md#huggingface_eqa_bert_large_uncased_whole_word_masking_1_0_1)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_2](JumpStartModel.md#huggingface_eqa_bert_large_uncased_whole_word_masking_1_0_2)
- [HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_2\_0\_0](JumpStartModel.md#huggingface_eqa_bert_large_uncased_whole_word_masking_2_0_0)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_eqa_distilbert_base_cased_1_0_0)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_1\_0\_1](JumpStartModel.md#huggingface_eqa_distilbert_base_cased_1_0_1)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_1\_0\_2](JumpStartModel.md#huggingface_eqa_distilbert_base_cased_1_0_2)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_eqa_distilbert_base_cased_2_0_0)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_eqa_distilbert_base_multilingual_cased_1_0_0)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1](JumpStartModel.md#huggingface_eqa_distilbert_base_multilingual_cased_1_0_1)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2](JumpStartModel.md#huggingface_eqa_distilbert_base_multilingual_cased_1_0_2)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_eqa_distilbert_base_multilingual_cased_2_0_0)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_eqa_distilbert_base_uncased_1_0_0)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_1\_0\_1](JumpStartModel.md#huggingface_eqa_distilbert_base_uncased_1_0_1)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_1\_0\_2](JumpStartModel.md#huggingface_eqa_distilbert_base_uncased_1_0_2)
- [HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_eqa_distilbert_base_uncased_2_0_0)
- [HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_eqa_distilroberta_base_1_0_0)
- [HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_1\_0\_1](JumpStartModel.md#huggingface_eqa_distilroberta_base_1_0_1)
- [HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_1\_0\_2](JumpStartModel.md#huggingface_eqa_distilroberta_base_1_0_2)
- [HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_eqa_distilroberta_base_2_0_0)
- [HUGGINGFACE\_EQA\_ROBERTA\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_eqa_roberta_base_1_0_0)
- [HUGGINGFACE\_EQA\_ROBERTA\_BASE\_1\_0\_1](JumpStartModel.md#huggingface_eqa_roberta_base_1_0_1)
- [HUGGINGFACE\_EQA\_ROBERTA\_BASE\_1\_0\_2](JumpStartModel.md#huggingface_eqa_roberta_base_1_0_2)
- [HUGGINGFACE\_EQA\_ROBERTA\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_eqa_roberta_base_2_0_0)
- [HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_0](JumpStartModel.md#huggingface_eqa_roberta_base_openai_detector_1_0_0)
- [HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_1](JumpStartModel.md#huggingface_eqa_roberta_base_openai_detector_1_0_1)
- [HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_2](JumpStartModel.md#huggingface_eqa_roberta_base_openai_detector_1_0_2)
- [HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_2\_0\_0](JumpStartModel.md#huggingface_eqa_roberta_base_openai_detector_2_0_0)
- [HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_1\_0\_0](JumpStartModel.md#huggingface_eqa_roberta_large_1_0_0)
- [HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_1\_0\_1](JumpStartModel.md#huggingface_eqa_roberta_large_1_0_1)
- [HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_1\_0\_2](JumpStartModel.md#huggingface_eqa_roberta_large_1_0_2)
- [HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_2\_0\_0](JumpStartModel.md#huggingface_eqa_roberta_large_2_0_0)
- [HUGGINGFACE\_FILLMASK\_BERT\_BASE\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_fillmask_bert_base_uncased_1_0_0)
- [HUGGINGFACE\_FILLMASK\_BERT\_BASE\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_fillmask_bert_base_uncased_2_0_0)
- [HUGGINGFACE\_LLM\_BILINGUAL\_RINNA\_4B\_INSTRUCTION\_PPO\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_llm_bilingual_rinna_4b_instruction_ppo_bf16_1_0_0)
- [HUGGINGFACE\_LLM\_BILINGUAL\_RINNA\_4B\_INSTRUCTION\_PPO\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_llm_bilingual_rinna_4b_instruction_ppo_bf16_1_1_0)
- [HUGGINGFACE\_LLM\_BILINGUAL\_RINNA\_4B\_INSTRUCTION\_PPO\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_llm_bilingual_rinna_4b_instruction_ppo_bf16_2_0_0)
- [HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_llm_falcon_180b_bf16_1_0_0)
- [HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_llm_falcon_180b_bf16_1_1_0)
- [HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_2\_0](JumpStartModel.md#huggingface_llm_falcon_180b_bf16_1_2_0)
- [HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_3\_0](JumpStartModel.md#huggingface_llm_falcon_180b_bf16_1_3_0)
- [HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_4\_0](JumpStartModel.md#huggingface_llm_falcon_180b_bf16_1_4_0)
- [HUGGINGFACE\_LLM\_FALCON\_180B\_CHAT\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_llm_falcon_180b_chat_bf16_1_0_0)
- [HUGGINGFACE\_LLM\_FALCON\_180B\_CHAT\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_llm_falcon_180b_chat_bf16_1_1_0)
- [HUGGINGFACE\_LLM\_FALCON\_180B\_CHAT\_BF16\_1\_2\_0](JumpStartModel.md#huggingface_llm_falcon_180b_chat_bf16_1_2_0)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_llm_falcon_40b_bf16_1_0_0)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_llm_falcon_40b_bf16_1_1_0)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_2\_0](JumpStartModel.md#huggingface_llm_falcon_40b_bf16_1_2_0)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_0](JumpStartModel.md#huggingface_llm_falcon_40b_bf16_1_3_0)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_1](JumpStartModel.md#huggingface_llm_falcon_40b_bf16_1_3_1)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_2](JumpStartModel.md#huggingface_llm_falcon_40b_bf16_1_3_2)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_3](JumpStartModel.md#huggingface_llm_falcon_40b_bf16_1_3_3)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_llm_falcon_40b_bf16_2_0_0)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_llm_falcon_40b_instruct_bf16_1_0_0)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_llm_falcon_40b_instruct_bf16_1_1_0)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_2\_0](JumpStartModel.md#huggingface_llm_falcon_40b_instruct_bf16_1_2_0)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_0](JumpStartModel.md#huggingface_llm_falcon_40b_instruct_bf16_1_3_0)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_1](JumpStartModel.md#huggingface_llm_falcon_40b_instruct_bf16_1_3_1)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_2](JumpStartModel.md#huggingface_llm_falcon_40b_instruct_bf16_1_3_2)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_3](JumpStartModel.md#huggingface_llm_falcon_40b_instruct_bf16_1_3_3)
- [HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_llm_falcon_40b_instruct_bf16_2_0_0)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_llm_falcon_7b_bf16_1_0_0)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_llm_falcon_7b_bf16_1_1_0)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_1\_1](JumpStartModel.md#huggingface_llm_falcon_7b_bf16_1_1_1)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_2\_0](JumpStartModel.md#huggingface_llm_falcon_7b_bf16_1_2_0)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_2\_1](JumpStartModel.md#huggingface_llm_falcon_7b_bf16_1_2_1)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_3\_0](JumpStartModel.md#huggingface_llm_falcon_7b_bf16_1_3_0)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_3\_1](JumpStartModel.md#huggingface_llm_falcon_7b_bf16_1_3_1)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_3\_2](JumpStartModel.md#huggingface_llm_falcon_7b_bf16_1_3_2)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_llm_falcon_7b_bf16_2_0_0)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_llm_falcon_7b_instruct_bf16_1_0_0)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_llm_falcon_7b_instruct_bf16_1_1_0)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_1\_1](JumpStartModel.md#huggingface_llm_falcon_7b_instruct_bf16_1_1_1)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_2\_0](JumpStartModel.md#huggingface_llm_falcon_7b_instruct_bf16_1_2_0)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_2\_1](JumpStartModel.md#huggingface_llm_falcon_7b_instruct_bf16_1_2_1)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_3\_0](JumpStartModel.md#huggingface_llm_falcon_7b_instruct_bf16_1_3_0)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_3\_1](JumpStartModel.md#huggingface_llm_falcon_7b_instruct_bf16_1_3_1)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_3\_2](JumpStartModel.md#huggingface_llm_falcon_7b_instruct_bf16_1_3_2)
- [HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_llm_falcon_7b_instruct_bf16_2_0_0)
- [HUGGINGFACE\_LLM\_MISTRAL\_7B\_1\_0\_0](JumpStartModel.md#huggingface_llm_mistral_7b_1_0_0)
- [HUGGINGFACE\_LLM\_MISTRAL\_7B\_1\_1\_0](JumpStartModel.md#huggingface_llm_mistral_7b_1_1_0)
- [HUGGINGFACE\_LLM\_MISTRAL\_7B\_2\_0\_0](JumpStartModel.md#huggingface_llm_mistral_7b_2_0_0)
- [HUGGINGFACE\_LLM\_MISTRAL\_7B\_INSTRUCT\_1\_0\_0](JumpStartModel.md#huggingface_llm_mistral_7b_instruct_1_0_0)
- [HUGGINGFACE\_LLM\_MISTRAL\_7B\_INSTRUCT\_2\_0\_0](JumpStartModel.md#huggingface_llm_mistral_7b_instruct_2_0_0)
- [HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_1\_0\_0](JumpStartModel.md#huggingface_llm_mixtral_8x7b_1_0_0)
- [HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_1\_0\_1](JumpStartModel.md#huggingface_llm_mixtral_8x7b_1_0_1)
- [HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_INSTRUCT\_1\_0\_0](JumpStartModel.md#huggingface_llm_mixtral_8x7b_instruct_1_0_0)
- [HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_INSTRUCT\_1\_0\_1](JumpStartModel.md#huggingface_llm_mixtral_8x7b_instruct_1_0_1)
- [HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_llm_rinna_3_6b_instruction_ppo_bf16_1_0_0)
- [HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_llm_rinna_3_6b_instruction_ppo_bf16_1_1_0)
- [HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_1\_1](JumpStartModel.md#huggingface_llm_rinna_3_6b_instruction_ppo_bf16_1_1_1)
- [HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_2\_0](JumpStartModel.md#huggingface_llm_rinna_3_6b_instruction_ppo_bf16_1_2_0)
- [HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_3\_0](JumpStartModel.md#huggingface_llm_rinna_3_6b_instruction_ppo_bf16_1_3_0)
- [HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_llm_rinna_3_6b_instruction_ppo_bf16_2_0_0)
- [HUGGINGFACE\_NER\_DISTILBERT\_BASE\_CASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_0\_0](JumpStartModel.md#huggingface_ner_distilbert_base_cased_finetuned_conll03_english_1_0_0)
- [HUGGINGFACE\_NER\_DISTILBERT\_BASE\_CASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_1\_0](JumpStartModel.md#huggingface_ner_distilbert_base_cased_finetuned_conll03_english_1_1_0)
- [HUGGINGFACE\_NER\_DISTILBERT\_BASE\_CASED\_FINETUNED\_CONLL03\_ENGLISH\_2\_0\_0](JumpStartModel.md#huggingface_ner_distilbert_base_cased_finetuned_conll03_english_2_0_0)
- [HUGGINGFACE\_NER\_DISTILBERT\_BASE\_UNCASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_0\_0](JumpStartModel.md#huggingface_ner_distilbert_base_uncased_finetuned_conll03_english_1_0_0)
- [HUGGINGFACE\_NER\_DISTILBERT\_BASE\_UNCASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_1\_0](JumpStartModel.md#huggingface_ner_distilbert_base_uncased_finetuned_conll03_english_1_1_0)
- [HUGGINGFACE\_NER\_DISTILBERT\_BASE\_UNCASED\_FINETUNED\_CONLL03\_ENGLISH\_2\_0\_0](JumpStartModel.md#huggingface_ner_distilbert_base_uncased_finetuned_conll03_english_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_all_minilm_l6_v2_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_1\_1\_0](JumpStartModel.md#huggingface_sentencesimilarity_all_minilm_l6_v2_1_1_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_1\_1\_1](JumpStartModel.md#huggingface_sentencesimilarity_all_minilm_l6_v2_1_1_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_all_minilm_l6_v2_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_BASE\_EN\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_bge_base_en_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_BASE\_EN\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_bge_base_en_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_BASE\_EN\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_bge_base_en_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_LARGE\_EN\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_bge_large_en_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_LARGE\_EN\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_bge_large_en_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_LARGE\_EN\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_bge_large_en_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_SMALL\_EN\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_bge_small_en_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_SMALL\_EN\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_bge_small_en_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_SMALL\_EN\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_bge_small_en_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_e5_base_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_e5_base_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_e5_base_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_V2\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_e5_base_v2_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_V2\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_e5_base_v2_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_V2\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_e5_base_v2_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_e5_large_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_e5_large_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_e5_large_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_V2\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_e5_large_v2_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_V2\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_e5_large_v2_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_V2\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_e5_large_v2_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_SMALL\_V2\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_e5_small_v2_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_SMALL\_V2\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_e5_small_v2_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_E5\_SMALL\_V2\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_e5_small_v2_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_gte_base_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_BASE\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_gte_base_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_gte_base_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_LARGE\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_gte_large_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_LARGE\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_gte_large_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_LARGE\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_gte_large_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_SMALL\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_gte_small_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_SMALL\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_gte_small_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_SMALL\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_gte_small_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_multilingual_e5_base_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_BASE\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_multilingual_e5_base_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_multilingual_e5_base_2_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_LARGE\_1\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_multilingual_e5_large_1_0_0)
- [HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_LARGE\_1\_0\_1](JumpStartModel.md#huggingface_sentencesimilarity_multilingual_e5_large_1_0_1)
- [HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_LARGE\_2\_0\_0](JumpStartModel.md#huggingface_sentencesimilarity_multilingual_e5_large_2_0_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_spc_bert_base_cased_1_0_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_1\_0](JumpStartModel.md#huggingface_spc_bert_base_cased_1_1_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_0](JumpStartModel.md#huggingface_spc_bert_base_cased_1_2_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_1](JumpStartModel.md#huggingface_spc_bert_base_cased_1_2_1)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_2](JumpStartModel.md#huggingface_spc_bert_base_cased_1_2_2)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_3](JumpStartModel.md#huggingface_spc_bert_base_cased_1_2_3)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_spc_bert_base_cased_2_0_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_spc_bert_base_multilingual_cased_1_0_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_1\_0](JumpStartModel.md#huggingface_spc_bert_base_multilingual_cased_1_1_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_0](JumpStartModel.md#huggingface_spc_bert_base_multilingual_cased_1_2_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_1](JumpStartModel.md#huggingface_spc_bert_base_multilingual_cased_1_2_1)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_2](JumpStartModel.md#huggingface_spc_bert_base_multilingual_cased_1_2_2)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_3](JumpStartModel.md#huggingface_spc_bert_base_multilingual_cased_1_2_3)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_spc_bert_base_multilingual_cased_2_0_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_spc_bert_base_multilingual_uncased_1_0_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_1\_0](JumpStartModel.md#huggingface_spc_bert_base_multilingual_uncased_1_1_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_0](JumpStartModel.md#huggingface_spc_bert_base_multilingual_uncased_1_2_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_1](JumpStartModel.md#huggingface_spc_bert_base_multilingual_uncased_1_2_1)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_2](JumpStartModel.md#huggingface_spc_bert_base_multilingual_uncased_1_2_2)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_3](JumpStartModel.md#huggingface_spc_bert_base_multilingual_uncased_1_2_3)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_spc_bert_base_multilingual_uncased_2_0_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_spc_bert_base_uncased_1_0_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_1\_0](JumpStartModel.md#huggingface_spc_bert_base_uncased_1_1_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_0](JumpStartModel.md#huggingface_spc_bert_base_uncased_1_2_0)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_1](JumpStartModel.md#huggingface_spc_bert_base_uncased_1_2_1)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_2](JumpStartModel.md#huggingface_spc_bert_base_uncased_1_2_2)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_3](JumpStartModel.md#huggingface_spc_bert_base_uncased_1_2_3)
- [HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_spc_bert_base_uncased_2_0_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_spc_bert_large_cased_1_0_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_1\_0](JumpStartModel.md#huggingface_spc_bert_large_cased_1_1_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_0](JumpStartModel.md#huggingface_spc_bert_large_cased_1_2_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_1](JumpStartModel.md#huggingface_spc_bert_large_cased_1_2_1)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_2](JumpStartModel.md#huggingface_spc_bert_large_cased_1_2_2)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_3](JumpStartModel.md#huggingface_spc_bert_large_cased_1_2_3)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_spc_bert_large_cased_2_0_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_0](JumpStartModel.md#huggingface_spc_bert_large_cased_whole_word_masking_1_0_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_1\_0](JumpStartModel.md#huggingface_spc_bert_large_cased_whole_word_masking_1_1_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_0](JumpStartModel.md#huggingface_spc_bert_large_cased_whole_word_masking_1_2_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_1](JumpStartModel.md#huggingface_spc_bert_large_cased_whole_word_masking_1_2_1)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_2](JumpStartModel.md#huggingface_spc_bert_large_cased_whole_word_masking_1_2_2)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_3](JumpStartModel.md#huggingface_spc_bert_large_cased_whole_word_masking_1_2_3)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_2\_0\_0](JumpStartModel.md#huggingface_spc_bert_large_cased_whole_word_masking_2_0_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_spc_bert_large_uncased_1_0_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_1\_0](JumpStartModel.md#huggingface_spc_bert_large_uncased_1_1_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_0](JumpStartModel.md#huggingface_spc_bert_large_uncased_1_2_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_1](JumpStartModel.md#huggingface_spc_bert_large_uncased_1_2_1)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_2](JumpStartModel.md#huggingface_spc_bert_large_uncased_1_2_2)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_3](JumpStartModel.md#huggingface_spc_bert_large_uncased_1_2_3)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_spc_bert_large_uncased_2_0_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_0](JumpStartModel.md#huggingface_spc_bert_large_uncased_whole_word_masking_1_0_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_1\_0](JumpStartModel.md#huggingface_spc_bert_large_uncased_whole_word_masking_1_1_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_0](JumpStartModel.md#huggingface_spc_bert_large_uncased_whole_word_masking_1_2_0)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_1](JumpStartModel.md#huggingface_spc_bert_large_uncased_whole_word_masking_1_2_1)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_2](JumpStartModel.md#huggingface_spc_bert_large_uncased_whole_word_masking_1_2_2)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_3](JumpStartModel.md#huggingface_spc_bert_large_uncased_whole_word_masking_1_2_3)
- [HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_2\_0\_0](JumpStartModel.md#huggingface_spc_bert_large_uncased_whole_word_masking_2_0_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_spc_distilbert_base_cased_1_0_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_1\_0](JumpStartModel.md#huggingface_spc_distilbert_base_cased_1_1_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_0](JumpStartModel.md#huggingface_spc_distilbert_base_cased_1_2_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_1](JumpStartModel.md#huggingface_spc_distilbert_base_cased_1_2_1)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_2](JumpStartModel.md#huggingface_spc_distilbert_base_cased_1_2_2)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_3](JumpStartModel.md#huggingface_spc_distilbert_base_cased_1_2_3)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_spc_distilbert_base_cased_2_0_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_spc_distilbert_base_multilingual_cased_1_0_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_1\_0](JumpStartModel.md#huggingface_spc_distilbert_base_multilingual_cased_1_1_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_0](JumpStartModel.md#huggingface_spc_distilbert_base_multilingual_cased_1_2_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_1](JumpStartModel.md#huggingface_spc_distilbert_base_multilingual_cased_1_2_1)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_2](JumpStartModel.md#huggingface_spc_distilbert_base_multilingual_cased_1_2_2)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_3](JumpStartModel.md#huggingface_spc_distilbert_base_multilingual_cased_1_2_3)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_spc_distilbert_base_multilingual_cased_2_0_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_spc_distilbert_base_uncased_1_0_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_1\_0](JumpStartModel.md#huggingface_spc_distilbert_base_uncased_1_1_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_0](JumpStartModel.md#huggingface_spc_distilbert_base_uncased_1_2_0)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_1](JumpStartModel.md#huggingface_spc_distilbert_base_uncased_1_2_1)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_2](JumpStartModel.md#huggingface_spc_distilbert_base_uncased_1_2_2)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_3](JumpStartModel.md#huggingface_spc_distilbert_base_uncased_1_2_3)
- [HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_spc_distilbert_base_uncased_2_0_0)
- [HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_spc_distilroberta_base_1_0_0)
- [HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_1\_0](JumpStartModel.md#huggingface_spc_distilroberta_base_1_1_0)
- [HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_0](JumpStartModel.md#huggingface_spc_distilroberta_base_1_2_0)
- [HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_1](JumpStartModel.md#huggingface_spc_distilroberta_base_1_2_1)
- [HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_2](JumpStartModel.md#huggingface_spc_distilroberta_base_1_2_2)
- [HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_3](JumpStartModel.md#huggingface_spc_distilroberta_base_1_2_3)
- [HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_spc_distilroberta_base_2_0_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_spc_roberta_base_1_0_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_1\_0](JumpStartModel.md#huggingface_spc_roberta_base_1_1_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_0](JumpStartModel.md#huggingface_spc_roberta_base_1_2_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_1](JumpStartModel.md#huggingface_spc_roberta_base_1_2_1)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_2](JumpStartModel.md#huggingface_spc_roberta_base_1_2_2)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_3](JumpStartModel.md#huggingface_spc_roberta_base_1_2_3)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_spc_roberta_base_2_0_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_0](JumpStartModel.md#huggingface_spc_roberta_base_openai_detector_1_0_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_1\_0](JumpStartModel.md#huggingface_spc_roberta_base_openai_detector_1_1_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_0](JumpStartModel.md#huggingface_spc_roberta_base_openai_detector_1_2_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_1](JumpStartModel.md#huggingface_spc_roberta_base_openai_detector_1_2_1)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_2](JumpStartModel.md#huggingface_spc_roberta_base_openai_detector_1_2_2)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_3](JumpStartModel.md#huggingface_spc_roberta_base_openai_detector_1_2_3)
- [HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_2\_0\_0](JumpStartModel.md#huggingface_spc_roberta_base_openai_detector_2_0_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_0\_0](JumpStartModel.md#huggingface_spc_roberta_large_1_0_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_1\_0](JumpStartModel.md#huggingface_spc_roberta_large_1_1_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_0](JumpStartModel.md#huggingface_spc_roberta_large_1_2_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_1](JumpStartModel.md#huggingface_spc_roberta_large_1_2_1)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_2](JumpStartModel.md#huggingface_spc_roberta_large_1_2_2)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_3](JumpStartModel.md#huggingface_spc_roberta_large_1_2_3)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_2\_0\_0](JumpStartModel.md#huggingface_spc_roberta_large_2_0_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_0](JumpStartModel.md#huggingface_spc_roberta_large_openai_detector_1_0_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_1\_0](JumpStartModel.md#huggingface_spc_roberta_large_openai_detector_1_1_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_0](JumpStartModel.md#huggingface_spc_roberta_large_openai_detector_1_2_0)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_1](JumpStartModel.md#huggingface_spc_roberta_large_openai_detector_1_2_1)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_2](JumpStartModel.md#huggingface_spc_roberta_large_openai_detector_1_2_2)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_3](JumpStartModel.md#huggingface_spc_roberta_large_openai_detector_1_2_3)
- [HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_2\_0\_0](JumpStartModel.md#huggingface_spc_roberta_large_openai_detector_2_0_0)
- [HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_0\_0](JumpStartModel.md#huggingface_spc_xlm_clm_ende_1024_1_0_0)
- [HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_1\_0](JumpStartModel.md#huggingface_spc_xlm_clm_ende_1024_1_1_0)
- [HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_0](JumpStartModel.md#huggingface_spc_xlm_clm_ende_1024_1_2_0)
- [HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_1](JumpStartModel.md#huggingface_spc_xlm_clm_ende_1024_1_2_1)
- [HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_2](JumpStartModel.md#huggingface_spc_xlm_clm_ende_1024_1_2_2)
- [HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_3](JumpStartModel.md#huggingface_spc_xlm_clm_ende_1024_1_2_3)
- [HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_2\_0\_0](JumpStartModel.md#huggingface_spc_xlm_clm_ende_1024_2_0_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_0\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_ende_1024_1_0_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_1\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_ende_1024_1_1_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_ende_1024_1_2_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_1](JumpStartModel.md#huggingface_spc_xlm_mlm_ende_1024_1_2_1)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_2](JumpStartModel.md#huggingface_spc_xlm_mlm_ende_1024_1_2_2)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_3](JumpStartModel.md#huggingface_spc_xlm_mlm_ende_1024_1_2_3)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_2\_0\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_ende_1024_2_0_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_0\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_enro_1024_1_0_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_1\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_enro_1024_1_1_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_enro_1024_1_2_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_1](JumpStartModel.md#huggingface_spc_xlm_mlm_enro_1024_1_2_1)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_2](JumpStartModel.md#huggingface_spc_xlm_mlm_enro_1024_1_2_2)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_3](JumpStartModel.md#huggingface_spc_xlm_mlm_enro_1024_1_2_3)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_2\_0\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_enro_1024_2_0_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_tlm_xnli15_1024_1_0_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_1\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_tlm_xnli15_1024_1_1_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_tlm_xnli15_1024_1_2_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_1](JumpStartModel.md#huggingface_spc_xlm_mlm_tlm_xnli15_1024_1_2_1)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_2](JumpStartModel.md#huggingface_spc_xlm_mlm_tlm_xnli15_1024_1_2_2)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_3](JumpStartModel.md#huggingface_spc_xlm_mlm_tlm_xnli15_1024_1_2_3)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_2\_0\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_tlm_xnli15_1024_2_0_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_0\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_xnli15_1024_1_0_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_1\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_xnli15_1024_1_1_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_xnli15_1024_1_2_0)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_1](JumpStartModel.md#huggingface_spc_xlm_mlm_xnli15_1024_1_2_1)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_2](JumpStartModel.md#huggingface_spc_xlm_mlm_xnli15_1024_1_2_2)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_3](JumpStartModel.md#huggingface_spc_xlm_mlm_xnli15_1024_1_2_3)
- [HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_2\_0\_0](JumpStartModel.md#huggingface_spc_xlm_mlm_xnli15_1024_2_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_1\_0\_0](JumpStartModel.md#huggingface_summarization_bart_large_cnn_samsum_1_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_1\_1\_0](JumpStartModel.md#huggingface_summarization_bart_large_cnn_samsum_1_1_0)
- [HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_1\_2\_0](JumpStartModel.md#huggingface_summarization_bart_large_cnn_samsum_1_2_0)
- [HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_2\_0\_0](JumpStartModel.md#huggingface_summarization_bart_large_cnn_samsum_2_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_1\_0\_0](JumpStartModel.md#huggingface_summarization_bert_small2bert_small_finetuned_cnn_daily_mail_summarization_1_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_1\_1\_0](JumpStartModel.md#huggingface_summarization_bert_small2bert_small_finetuned_cnn_daily_mail_summarization_1_1_0)
- [HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_1\_2\_0](JumpStartModel.md#huggingface_summarization_bert_small2bert_small_finetuned_cnn_daily_mail_summarization_1_2_0)
- [HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_2\_0\_0](JumpStartModel.md#huggingface_summarization_bert_small2bert_small_finetuned_cnn_daily_mail_summarization_2_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_1\_0\_0](JumpStartModel.md#huggingface_summarization_bigbird_pegasus_large_arxiv_1_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_1\_1\_0](JumpStartModel.md#huggingface_summarization_bigbird_pegasus_large_arxiv_1_1_0)
- [HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_1\_2\_0](JumpStartModel.md#huggingface_summarization_bigbird_pegasus_large_arxiv_1_2_0)
- [HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_2\_0\_0](JumpStartModel.md#huggingface_summarization_bigbird_pegasus_large_arxiv_2_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_1\_0\_0](JumpStartModel.md#huggingface_summarization_bigbird_pegasus_large_pubmed_1_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_1\_1\_0](JumpStartModel.md#huggingface_summarization_bigbird_pegasus_large_pubmed_1_1_0)
- [HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_1\_2\_0](JumpStartModel.md#huggingface_summarization_bigbird_pegasus_large_pubmed_1_2_0)
- [HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_2\_0\_0](JumpStartModel.md#huggingface_summarization_bigbird_pegasus_large_pubmed_2_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_1\_0\_0](JumpStartModel.md#huggingface_summarization_distilbart_cnn_12_6_1_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_1\_1\_0](JumpStartModel.md#huggingface_summarization_distilbart_cnn_12_6_1_1_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_1\_2\_0](JumpStartModel.md#huggingface_summarization_distilbart_cnn_12_6_1_2_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_2\_0\_0](JumpStartModel.md#huggingface_summarization_distilbart_cnn_12_6_2_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_1\_0\_0](JumpStartModel.md#huggingface_summarization_distilbart_cnn_6_6_1_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_1\_1\_0](JumpStartModel.md#huggingface_summarization_distilbart_cnn_6_6_1_1_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_1\_2\_0](JumpStartModel.md#huggingface_summarization_distilbart_cnn_6_6_1_2_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_2\_0\_0](JumpStartModel.md#huggingface_summarization_distilbart_cnn_6_6_2_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_1\_0\_0](JumpStartModel.md#huggingface_summarization_distilbart_xsum_12_3_1_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_1\_1\_0](JumpStartModel.md#huggingface_summarization_distilbart_xsum_12_3_1_1_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_1\_2\_0](JumpStartModel.md#huggingface_summarization_distilbart_xsum_12_3_1_2_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_2\_0\_0](JumpStartModel.md#huggingface_summarization_distilbart_xsum_12_3_2_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_1\_0\_0](JumpStartModel.md#huggingface_summarization_distilbart_xsum_1_1_1_0_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_1\_1\_0](JumpStartModel.md#huggingface_summarization_distilbart_xsum_1_1_1_1_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_1\_2\_0](JumpStartModel.md#huggingface_summarization_distilbart_xsum_1_1_1_2_0)
- [HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_2\_0\_0](JumpStartModel.md#huggingface_summarization_distilbart_xsum_1_1_2_0_0)
- [HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_tc_bert_base_cased_1_0_0)
- [HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_1\_0\_1](JumpStartModel.md#huggingface_tc_bert_base_cased_1_0_1)
- [HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_1\_0\_2](JumpStartModel.md#huggingface_tc_bert_base_cased_1_0_2)
- [HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_tc_bert_base_cased_2_0_0)
- [HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_tc_bert_base_multilingual_cased_1_0_0)
- [HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1](JumpStartModel.md#huggingface_tc_bert_base_multilingual_cased_1_0_1)
- [HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2](JumpStartModel.md#huggingface_tc_bert_base_multilingual_cased_1_0_2)
- [HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_tc_bert_base_multilingual_cased_2_0_0)
- [HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_tc_bert_base_multilingual_uncased_1_0_0)
- [HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_1](JumpStartModel.md#huggingface_tc_bert_base_multilingual_uncased_1_0_1)
- [HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_2](JumpStartModel.md#huggingface_tc_bert_base_multilingual_uncased_1_0_2)
- [HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_tc_bert_base_multilingual_uncased_2_0_0)
- [HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_tc_bert_base_uncased_1_0_0)
- [HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_1\_0\_1](JumpStartModel.md#huggingface_tc_bert_base_uncased_1_0_1)
- [HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_1\_0\_2](JumpStartModel.md#huggingface_tc_bert_base_uncased_1_0_2)
- [HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_tc_bert_base_uncased_2_0_0)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_tc_bert_large_cased_1_0_0)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_1\_0\_1](JumpStartModel.md#huggingface_tc_bert_large_cased_1_0_1)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_1\_0\_2](JumpStartModel.md#huggingface_tc_bert_large_cased_1_0_2)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_tc_bert_large_cased_2_0_0)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_0](JumpStartModel.md#huggingface_tc_bert_large_cased_whole_word_masking_1_0_0)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_1](JumpStartModel.md#huggingface_tc_bert_large_cased_whole_word_masking_1_0_1)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_2](JumpStartModel.md#huggingface_tc_bert_large_cased_whole_word_masking_1_0_2)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_2\_0\_0](JumpStartModel.md#huggingface_tc_bert_large_cased_whole_word_masking_2_0_0)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_tc_bert_large_uncased_1_0_0)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_1\_0\_1](JumpStartModel.md#huggingface_tc_bert_large_uncased_1_0_1)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_1\_0\_2](JumpStartModel.md#huggingface_tc_bert_large_uncased_1_0_2)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_tc_bert_large_uncased_2_0_0)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_0](JumpStartModel.md#huggingface_tc_bert_large_uncased_whole_word_masking_1_0_0)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_1](JumpStartModel.md#huggingface_tc_bert_large_uncased_whole_word_masking_1_0_1)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_2](JumpStartModel.md#huggingface_tc_bert_large_uncased_whole_word_masking_1_0_2)
- [HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_2\_0\_0](JumpStartModel.md#huggingface_tc_bert_large_uncased_whole_word_masking_2_0_0)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_tc_distilbert_base_cased_1_0_0)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_1\_0\_1](JumpStartModel.md#huggingface_tc_distilbert_base_cased_1_0_1)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_1\_0\_2](JumpStartModel.md#huggingface_tc_distilbert_base_cased_1_0_2)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_tc_distilbert_base_cased_2_0_0)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0](JumpStartModel.md#huggingface_tc_distilbert_base_multilingual_cased_1_0_0)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1](JumpStartModel.md#huggingface_tc_distilbert_base_multilingual_cased_1_0_1)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2](JumpStartModel.md#huggingface_tc_distilbert_base_multilingual_cased_1_0_2)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0](JumpStartModel.md#huggingface_tc_distilbert_base_multilingual_cased_2_0_0)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_0](JumpStartModel.md#huggingface_tc_distilbert_base_uncased_1_0_0)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_1](JumpStartModel.md#huggingface_tc_distilbert_base_uncased_1_0_1)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_2](JumpStartModel.md#huggingface_tc_distilbert_base_uncased_1_0_2)
- [HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_2\_0\_0](JumpStartModel.md#huggingface_tc_distilbert_base_uncased_2_0_0)
- [HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_tc_distilroberta_base_1_0_0)
- [HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_1\_0\_1](JumpStartModel.md#huggingface_tc_distilroberta_base_1_0_1)
- [HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_1\_0\_2](JumpStartModel.md#huggingface_tc_distilroberta_base_1_0_2)
- [HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_tc_distilroberta_base_2_0_0)
- [HUGGINGFACE\_TC\_MODELS\_1\_0\_0](JumpStartModel.md#huggingface_tc_models_1_0_0)
- [HUGGINGFACE\_TC\_MODELS\_1\_0\_1](JumpStartModel.md#huggingface_tc_models_1_0_1)
- [HUGGINGFACE\_TC\_MODELS\_1\_0\_2](JumpStartModel.md#huggingface_tc_models_1_0_2)
- [HUGGINGFACE\_TC\_MODELS\_2\_0\_0](JumpStartModel.md#huggingface_tc_models_2_0_0)
- [HUGGINGFACE\_TC\_ROBERTA\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_tc_roberta_base_1_0_0)
- [HUGGINGFACE\_TC\_ROBERTA\_BASE\_1\_0\_1](JumpStartModel.md#huggingface_tc_roberta_base_1_0_1)
- [HUGGINGFACE\_TC\_ROBERTA\_BASE\_1\_0\_2](JumpStartModel.md#huggingface_tc_roberta_base_1_0_2)
- [HUGGINGFACE\_TC\_ROBERTA\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_tc_roberta_base_2_0_0)
- [HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_0](JumpStartModel.md#huggingface_tc_roberta_base_openai_detector_1_0_0)
- [HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_1](JumpStartModel.md#huggingface_tc_roberta_base_openai_detector_1_0_1)
- [HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_2](JumpStartModel.md#huggingface_tc_roberta_base_openai_detector_1_0_2)
- [HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_2\_0\_0](JumpStartModel.md#huggingface_tc_roberta_base_openai_detector_2_0_0)
- [HUGGINGFACE\_TC\_ROBERTA\_LARGE\_1\_0\_0](JumpStartModel.md#huggingface_tc_roberta_large_1_0_0)
- [HUGGINGFACE\_TC\_ROBERTA\_LARGE\_1\_0\_1](JumpStartModel.md#huggingface_tc_roberta_large_1_0_1)
- [HUGGINGFACE\_TC\_ROBERTA\_LARGE\_1\_0\_2](JumpStartModel.md#huggingface_tc_roberta_large_1_0_2)
- [HUGGINGFACE\_TC\_ROBERTA\_LARGE\_2\_0\_0](JumpStartModel.md#huggingface_tc_roberta_large_2_0_0)
- [HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_0](JumpStartModel.md#huggingface_tc_roberta_large_openai_detector_1_0_0)
- [HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_1](JumpStartModel.md#huggingface_tc_roberta_large_openai_detector_1_0_1)
- [HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_2](JumpStartModel.md#huggingface_tc_roberta_large_openai_detector_1_0_2)
- [HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_2\_0\_0](JumpStartModel.md#huggingface_tc_roberta_large_openai_detector_2_0_0)
- [HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_1\_0\_0](JumpStartModel.md#huggingface_tc_xlm_clm_ende_1024_1_0_0)
- [HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_1\_0\_1](JumpStartModel.md#huggingface_tc_xlm_clm_ende_1024_1_0_1)
- [HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_1\_0\_2](JumpStartModel.md#huggingface_tc_xlm_clm_ende_1024_1_0_2)
- [HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_2\_0\_0](JumpStartModel.md#huggingface_tc_xlm_clm_ende_1024_2_0_0)
- [HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_1\_0\_0](JumpStartModel.md#huggingface_tc_xlm_mlm_ende_1024_1_0_0)
- [HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_1\_0\_1](JumpStartModel.md#huggingface_tc_xlm_mlm_ende_1024_1_0_1)
- [HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_1\_0\_2](JumpStartModel.md#huggingface_tc_xlm_mlm_ende_1024_1_0_2)
- [HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_2\_0\_0](JumpStartModel.md#huggingface_tc_xlm_mlm_ende_1024_2_0_0)
- [HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_1\_0\_0](JumpStartModel.md#huggingface_tc_xlm_mlm_enro_1024_1_0_0)
- [HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_1\_0\_1](JumpStartModel.md#huggingface_tc_xlm_mlm_enro_1024_1_0_1)
- [HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_1\_0\_2](JumpStartModel.md#huggingface_tc_xlm_mlm_enro_1024_1_0_2)
- [HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_2\_0\_0](JumpStartModel.md#huggingface_tc_xlm_mlm_enro_1024_2_0_0)
- [HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_0](JumpStartModel.md#huggingface_tc_xlm_mlm_tlm_xnli15_1024_1_0_0)
- [HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_1](JumpStartModel.md#huggingface_tc_xlm_mlm_tlm_xnli15_1024_1_0_1)
- [HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_2](JumpStartModel.md#huggingface_tc_xlm_mlm_tlm_xnli15_1024_1_0_2)
- [HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_2\_0\_0](JumpStartModel.md#huggingface_tc_xlm_mlm_tlm_xnli15_1024_2_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_0](JumpStartModel.md#huggingface_text2text_bart4csc_base_chinese_1_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_1](JumpStartModel.md#huggingface_text2text_bart4csc_base_chinese_1_0_1)
- [HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_2](JumpStartModel.md#huggingface_text2text_bart4csc_base_chinese_1_0_2)
- [HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_3](JumpStartModel.md#huggingface_text2text_bart4csc_base_chinese_1_0_3)
- [HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_1\_0](JumpStartModel.md#huggingface_text2text_bart4csc_base_chinese_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_1\_1](JumpStartModel.md#huggingface_text2text_bart4csc_base_chinese_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_2\_0](JumpStartModel.md#huggingface_text2text_bart4csc_base_chinese_1_2_0)
- [HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_2\_1](JumpStartModel.md#huggingface_text2text_bart4csc_base_chinese_1_2_1)
- [HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_2\_2](JumpStartModel.md#huggingface_text2text_bart4csc_base_chinese_1_2_2)
- [HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_1\_1\_0](JumpStartModel.md#huggingface_text2text_bigscience_t0pp_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_1\_1\_1](JumpStartModel.md#huggingface_text2text_bigscience_t0pp_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_1\_1\_2](JumpStartModel.md#huggingface_text2text_bigscience_t0pp_1_1_2)
- [HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_2\_0\_0](JumpStartModel.md#huggingface_text2text_bigscience_t0pp_2_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_BNB\_INT8\_1\_1\_0](JumpStartModel.md#huggingface_text2text_bigscience_t0pp_bnb_int8_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_BNB\_INT8\_1\_1\_1](JumpStartModel.md#huggingface_text2text_bigscience_t0pp_bnb_int8_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_BNB\_INT8\_1\_1\_2](JumpStartModel.md#huggingface_text2text_bigscience_t0pp_bnb_int8_1_1_2)
- [HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_text2text_bigscience_t0pp_fp16_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_FP16\_1\_1\_1](JumpStartModel.md#huggingface_text2text_bigscience_t0pp_fp16_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_FP16\_1\_1\_2](JumpStartModel.md#huggingface_text2text_bigscience_t0pp_fp16_1_1_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_1](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_0_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_2](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_0_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_3](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_0_3)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_1\_0](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_0](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_2_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_1](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_2_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_2](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_2_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_3](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_2_3)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_4](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_2_4)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_5](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_2_5)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_3\_0](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_3_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_3\_1](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_3_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_3\_2](JumpStartModel.md#huggingface_text2text_flan_t5_base_1_3_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_base_2_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_base_samsum_1_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_1](JumpStartModel.md#huggingface_text2text_flan_t5_base_samsum_1_0_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_2](JumpStartModel.md#huggingface_text2text_flan_t5_base_samsum_1_0_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_3](JumpStartModel.md#huggingface_text2text_flan_t5_base_samsum_1_0_3)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_1\_0](JumpStartModel.md#huggingface_text2text_flan_t5_base_samsum_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_1\_1](JumpStartModel.md#huggingface_text2text_flan_t5_base_samsum_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_2\_0](JumpStartModel.md#huggingface_text2text_flan_t5_base_samsum_1_2_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_2\_1](JumpStartModel.md#huggingface_text2text_flan_t5_base_samsum_1_2_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_2\_2](JumpStartModel.md#huggingface_text2text_flan_t5_base_samsum_1_2_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_2\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_base_samsum_2_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_1](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_0_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_2](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_0_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_3](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_0_3)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_0](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_1](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_2](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_1_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_3](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_1_3)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_4](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_1_4)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_5](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_1_5)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_6](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_1_6)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_2\_0](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_2_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_2\_1](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_2_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_2\_2](JumpStartModel.md#huggingface_text2text_flan_t5_large_1_2_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_2\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_large_2_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_1](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_0_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_2](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_0_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_3](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_0_3)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_1\_0](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_0](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_2_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_1](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_2_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_2](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_2_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_3](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_2_3)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_4](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_2_4)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_5](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_2_5)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_3\_0](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_3_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_3\_1](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_3_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_3\_2](JumpStartModel.md#huggingface_text2text_flan_t5_small_1_3_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_2\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_small_2_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_1](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_0_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_2](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_0_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_3](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_0_3)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_0](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_1](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_2](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_1_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_3](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_1_3)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_4](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_1_4)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_5](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_1_5)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_6](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_1_6)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_2\_0](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_2_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_2\_1](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_2_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_2\_2](JumpStartModel.md#huggingface_text2text_flan_t5_xl_1_2_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_2\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_xl_2_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_1\_1\_0](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_1\_1\_1](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_1\_1\_2](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_1_1_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_2\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_2_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_0\_0](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_bnb_int8_1_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_2\_0](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_bnb_int8_1_2_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_2\_1](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_bnb_int8_1_2_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_2\_2](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_bnb_int8_1_2_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_fp16_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_FP16\_1\_1\_1](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_fp16_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_FP16\_1\_1\_2](JumpStartModel.md#huggingface_text2text_flan_t5_xxl_fp16_1_1_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_text2text_flan_ul2_bf16_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_1\_1\_1](JumpStartModel.md#huggingface_text2text_flan_ul2_bf16_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_1\_1\_2](JumpStartModel.md#huggingface_text2text_flan_ul2_bf16_1_1_2)
- [HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_text2text_flan_ul2_bf16_2_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_0](JumpStartModel.md#huggingface_text2text_pegasus_paraphrase_1_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_1](JumpStartModel.md#huggingface_text2text_pegasus_paraphrase_1_0_1)
- [HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_2](JumpStartModel.md#huggingface_text2text_pegasus_paraphrase_1_0_2)
- [HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_3](JumpStartModel.md#huggingface_text2text_pegasus_paraphrase_1_0_3)
- [HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_1\_0](JumpStartModel.md#huggingface_text2text_pegasus_paraphrase_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_1\_1](JumpStartModel.md#huggingface_text2text_pegasus_paraphrase_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_2\_0](JumpStartModel.md#huggingface_text2text_pegasus_paraphrase_1_2_0)
- [HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_2\_1](JumpStartModel.md#huggingface_text2text_pegasus_paraphrase_1_2_1)
- [HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_2\_2](JumpStartModel.md#huggingface_text2text_pegasus_paraphrase_1_2_2)
- [HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_0](JumpStartModel.md#huggingface_text2text_qcpg_sentences_1_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_1](JumpStartModel.md#huggingface_text2text_qcpg_sentences_1_0_1)
- [HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_2](JumpStartModel.md#huggingface_text2text_qcpg_sentences_1_0_2)
- [HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_3](JumpStartModel.md#huggingface_text2text_qcpg_sentences_1_0_3)
- [HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_1\_0](JumpStartModel.md#huggingface_text2text_qcpg_sentences_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_1\_1](JumpStartModel.md#huggingface_text2text_qcpg_sentences_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_2\_0](JumpStartModel.md#huggingface_text2text_qcpg_sentences_1_2_0)
- [HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_2\_1](JumpStartModel.md#huggingface_text2text_qcpg_sentences_1_2_1)
- [HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_2\_2](JumpStartModel.md#huggingface_text2text_qcpg_sentences_1_2_2)
- [HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_2\_0\_0](JumpStartModel.md#huggingface_text2text_qcpg_sentences_2_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_0](JumpStartModel.md#huggingface_text2text_t5_one_line_summary_1_0_0)
- [HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_1](JumpStartModel.md#huggingface_text2text_t5_one_line_summary_1_0_1)
- [HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_2](JumpStartModel.md#huggingface_text2text_t5_one_line_summary_1_0_2)
- [HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_3](JumpStartModel.md#huggingface_text2text_t5_one_line_summary_1_0_3)
- [HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_1\_0](JumpStartModel.md#huggingface_text2text_t5_one_line_summary_1_1_0)
- [HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_1\_1](JumpStartModel.md#huggingface_text2text_t5_one_line_summary_1_1_1)
- [HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_2\_0](JumpStartModel.md#huggingface_text2text_t5_one_line_summary_1_2_0)
- [HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_2\_1](JumpStartModel.md#huggingface_text2text_t5_one_line_summary_1_2_1)
- [HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_2\_2](JumpStartModel.md#huggingface_text2text_t5_one_line_summary_1_2_2)
- [HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_2\_0\_0](JumpStartModel.md#huggingface_text2text_t5_one_line_summary_2_0_0)
- [HUGGINGFACE\_TEXTEMBEDDING\_ALL\_MINILM\_L6\_V2\_1\_0\_0](JumpStartModel.md#huggingface_textembedding_all_minilm_l6_v2_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_176B\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_176b_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_176B\_FP16\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration1_bloomz_176b_fp16_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_176B\_FP16\_1\_0\_2](JumpStartModel.md#huggingface_textgeneration1_bloomz_176b_fp16_1_0_2)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_3b_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_3b_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_3b_fp16_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_bloomz_3b_fp16_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_bloomz_3b_fp16_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_3b_fp16_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_3b_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_7b1_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_7b1_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_7b1_fp16_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_bloomz_7b1_fp16_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_bloomz_7b1_fp16_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_7b1_fp16_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloomz_7b1_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_176B\_INT8\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_176b_int8_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_176B\_INT8\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration1_bloom_176b_int8_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_176B\_INT8\_1\_0\_2](JumpStartModel.md#huggingface_textgeneration1_bloom_176b_int8_1_0_2)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_fp16_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_fp16_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_fp16_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_fp16_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_3b_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_fp16_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_fp16_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_fp16_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_fp16_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_bloom_7b1_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_fp16_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_fp16_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_fp16_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_fp16_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_2_xl_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_1\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_1_1_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_3](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_1_2_3)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_4](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_1_2_4)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_1\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_fp16_1_1_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_fp16_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_fp16_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_fp16_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_3](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_fp16_1_2_3)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_4](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_fp16_1_2_4)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_fp16_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_j_6b_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_fp16_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_fp16_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_fp16_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_fp16_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_125m_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_fp16_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_fp16_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_fp16_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_fp16_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_1_3b_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_fp16_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_fp16_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_fp16_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_fp16_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_gpt_neo_2_7b_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_LIGHTGPT\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_lightgpt_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_LIGHTGPT\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_lightgpt_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_LIGHTGPT\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_lightgpt_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_mpt_7b_bf16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_mpt_7b_bf16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_INSTRUCT\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_mpt_7b_instruct_bf16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_INSTRUCT\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_mpt_7b_instruct_bf16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_STORYWRITER\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_mpt_7b_storywriter_bf16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_STORYWRITER\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_mpt_7b_storywriter_bf16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_base_3b_v1_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_base_3b_v1_fp16_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_base_3b_v1_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_base_3b_v1_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_base_7b_v1_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_base_7b_v1_fp16_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_base_7b_v1_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_base_7b_v1_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_chat_3b_v1_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_chat_3b_v1_fp16_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_chat_3b_v1_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_chat_3b_v1_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_chat_7b_v1_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_chat_7b_v1_fp16_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_chat_7b_v1_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_chat_7b_v1_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_instruct_3b_v1_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_instruct_3b_v1_fp16_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_instruct_3b_v1_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_instruct_3b_v1_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_instruct_7b_v1_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_instruct_7b_v1_fp16_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_instruct_7b_v1_fp16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration1_redpajama_incite_instruct_7b_v1_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration2_gpt_neoxt_chat_base_20b_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration2_gpt_neoxt_chat_base_20b_fp16_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration2_gpt_neoxt_chat_base_20b_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_3\_0\_0](JumpStartModel.md#huggingface_textgeneration2_gpt_neoxt_chat_base_20b_fp16_3_0_0)
- [HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration2_gpt_neox_20b_fp16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration2_gpt_neox_20b_fp16_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration2_gpt_neox_20b_fp16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_3\_0\_0](JumpStartModel.md#huggingface_textgeneration2_gpt_neox_20b_fp16_3_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_1b1_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_1b1_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_1\_1](JumpStartModel.md#huggingface_textgeneration_bloomz_1b1_1_1_1)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_1b1_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_1b1_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_1b7_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_1b7_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_1\_1](JumpStartModel.md#huggingface_textgeneration_bloomz_1b7_1_1_1)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_1b7_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_1b7_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_560m_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_560m_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_1\_1](JumpStartModel.md#huggingface_textgeneration_bloomz_560m_1_1_1)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_560m_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloomz_560m_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloom_1b1_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration_bloom_1b1_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_2](JumpStartModel.md#huggingface_textgeneration_bloom_1b1_1_0_2)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_3](JumpStartModel.md#huggingface_textgeneration_bloom_1b1_1_0_3)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_bloom_1b1_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration_bloom_1b1_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration_bloom_1b1_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration_bloom_1b1_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloom_1b1_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloom_1b7_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration_bloom_1b7_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_2](JumpStartModel.md#huggingface_textgeneration_bloom_1b7_1_0_2)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_3](JumpStartModel.md#huggingface_textgeneration_bloom_1b7_1_0_3)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_bloom_1b7_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration_bloom_1b7_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration_bloom_1b7_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration_bloom_1b7_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloom_1b7_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloom_560m_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration_bloom_560m_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_2](JumpStartModel.md#huggingface_textgeneration_bloom_560m_1_0_2)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_3](JumpStartModel.md#huggingface_textgeneration_bloom_560m_1_0_3)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_bloom_560m_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration_bloom_560m_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration_bloom_560m_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration_bloom_560m_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_bloom_560m_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_distilgpt2_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_distilgpt2_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration_distilgpt2_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration_distilgpt2_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration_distilgpt2_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_3](JumpStartModel.md#huggingface_textgeneration_distilgpt2_1_2_3)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration_distilgpt2_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_4\_0](JumpStartModel.md#huggingface_textgeneration_distilgpt2_1_4_0)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_4\_1](JumpStartModel.md#huggingface_textgeneration_distilgpt2_1_4_1)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_5\_0](JumpStartModel.md#huggingface_textgeneration_distilgpt2_1_5_0)
- [HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_distilgpt2_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_12B\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_dolly_v2_12b_bf16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_12B\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_dolly_v2_12b_bf16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_12B\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_dolly_v2_12b_bf16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_3B\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_dolly_v2_3b_bf16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_3B\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_dolly_v2_3b_bf16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_3B\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_dolly_v2_3b_bf16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_7B\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_dolly_v2_7b_bf16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_7B\_BF16\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_dolly_v2_7b_bf16_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_7B\_BF16\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_dolly_v2_7b_bf16_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_FALCON\_40B\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_falcon_40b_bf16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_FALCON\_40B\_INSTRUCT\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_falcon_40b_instruct_bf16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_FALCON\_7B\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_falcon_7b_bf16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_FALCON\_7B\_INSTRUCT\_BF16\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_falcon_7b_instruct_bf16_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_gpt2_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_gpt2_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration_gpt2_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration_gpt2_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_2](JumpStartModel.md#huggingface_textgeneration_gpt2_1_2_2)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_3](JumpStartModel.md#huggingface_textgeneration_gpt2_1_2_3)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration_gpt2_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_4\_0](JumpStartModel.md#huggingface_textgeneration_gpt2_1_4_0)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_4\_1](JumpStartModel.md#huggingface_textgeneration_gpt2_1_4_1)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_5\_0](JumpStartModel.md#huggingface_textgeneration_gpt2_1_5_0)
- [HUGGINGFACE\_TEXTGENERATION\_GPT2\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_gpt2_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_models_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_0\_1](JumpStartModel.md#huggingface_textgeneration_models_1_0_1)
- [HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_0\_2](JumpStartModel.md#huggingface_textgeneration_models_1_0_2)
- [HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_models_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration_models_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_2\_1](JumpStartModel.md#huggingface_textgeneration_models_1_2_1)
- [HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_3\_0](JumpStartModel.md#huggingface_textgeneration_models_1_3_0)
- [HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_0\_0](JumpStartModel.md#huggingface_textgeneration_open_llama_1_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_1\_0](JumpStartModel.md#huggingface_textgeneration_open_llama_1_1_0)
- [HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_1\_1](JumpStartModel.md#huggingface_textgeneration_open_llama_1_1_1)
- [HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_2\_0](JumpStartModel.md#huggingface_textgeneration_open_llama_1_2_0)
- [HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_2\_0\_0](JumpStartModel.md#huggingface_textgeneration_open_llama_2_0_0)
- [HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_3\_0\_0](JumpStartModel.md#huggingface_textgeneration_open_llama_3_0_0)
- [HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_ES\_1\_0\_0](JumpStartModel.md#huggingface_translation_opus_mt_en_es_1_0_0)
- [HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_ES\_1\_1\_0](JumpStartModel.md#huggingface_translation_opus_mt_en_es_1_1_0)
- [HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_ES\_2\_0\_0](JumpStartModel.md#huggingface_translation_opus_mt_en_es_2_0_0)
- [HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_VI\_1\_0\_0](JumpStartModel.md#huggingface_translation_opus_mt_en_vi_1_0_0)
- [HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_VI\_1\_1\_0](JumpStartModel.md#huggingface_translation_opus_mt_en_vi_1_1_0)
- [HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_VI\_2\_0\_0](JumpStartModel.md#huggingface_translation_opus_mt_en_vi_2_0_0)
- [HUGGINGFACE\_TRANSLATION\_T5\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_translation_t5_base_1_0_0)
- [HUGGINGFACE\_TRANSLATION\_T5\_BASE\_1\_1\_0](JumpStartModel.md#huggingface_translation_t5_base_1_1_0)
- [HUGGINGFACE\_TRANSLATION\_T5\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_translation_t5_base_2_0_0)
- [HUGGINGFACE\_TRANSLATION\_T5\_LARGE\_1\_0\_0](JumpStartModel.md#huggingface_translation_t5_large_1_0_0)
- [HUGGINGFACE\_TRANSLATION\_T5\_LARGE\_1\_1\_0](JumpStartModel.md#huggingface_translation_t5_large_1_1_0)
- [HUGGINGFACE\_TRANSLATION\_T5\_LARGE\_2\_0\_0](JumpStartModel.md#huggingface_translation_t5_large_2_0_0)
- [HUGGINGFACE\_TRANSLATION\_T5\_SMALL\_1\_0\_0](JumpStartModel.md#huggingface_translation_t5_small_1_0_0)
- [HUGGINGFACE\_TRANSLATION\_T5\_SMALL\_1\_1\_0](JumpStartModel.md#huggingface_translation_t5_small_1_1_0)
- [HUGGINGFACE\_TRANSLATION\_T5\_SMALL\_2\_0\_0](JumpStartModel.md#huggingface_translation_t5_small_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_22H\_VINTEDOIS\_DIFFUSION\_V0\_1\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_22h_vintedois_diffusion_v0_1_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_22H\_VINTEDOIS\_DIFFUSION\_V0\_1\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_22h_vintedois_diffusion_v0_1_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_22H\_VINTEDOIS\_DIFFUSION\_V0\_1\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_22h_vintedois_diffusion_v0_1_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_AKIKAGURA\_MKGEN\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_akikagura_mkgen_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_AKIKAGURA\_MKGEN\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_akikagura_mkgen_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_AKIKAGURA\_MKGEN\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_akikagura_mkgen_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES9000\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_alxdfy_noggles9000_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES9000\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_alxdfy_noggles9000_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES9000\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_alxdfy_noggles9000_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES\_FASTDB\_4800\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_alxdfy_noggles_fastdb_4800_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES\_FASTDB\_4800\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_alxdfy_noggles_fastdb_4800_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES\_FASTDB\_4800\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_alxdfy_noggles_fastdb_4800_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_ANDITE\_ANYTHING\_V4\_0\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_andite_anything_v4_0_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_ANDITE\_ANYTHING\_V4\_0\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_andite_anything_v4_0_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_ANDITE\_ANYTHING\_V4\_0\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_andite_anything_v4_0_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_ASTRALITEHEART\_PONY\_DIFFUSION\_V2\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_astraliteheart_pony_diffusion_v2_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_ASTRALITEHEART\_PONY\_DIFFUSION\_V2\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_astraliteheart_pony_diffusion_v2_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_ASTRALITEHEART\_PONY\_DIFFUSION\_V2\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_astraliteheart_pony_diffusion_v2_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_AVRIK\_ABSTRACT\_ANIM\_SPRITESHEETS\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_avrik_abstract_anim_spritesheets_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_AVRIK\_ABSTRACT\_ANIM\_SPRITESHEETS\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_avrik_abstract_anim_spritesheets_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_AVRIK\_ABSTRACT\_ANIM\_SPRITESHEETS\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_avrik_abstract_anim_spritesheets_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_AYBEECEEDEE\_KNOLLINGCASE\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_aybeeceedee_knollingcase_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_AYBEECEEDEE\_KNOLLINGCASE\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_aybeeceedee_knollingcase_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_AYBEECEEDEE\_KNOLLINGCASE\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_aybeeceedee_knollingcase_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_KOREAN\_STABLE\_DIFFUSION\_V1\_5\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_bingsu_my_korean_stable_diffusion_v1_5_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_KOREAN\_STABLE\_DIFFUSION\_V1\_5\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_bingsu_my_korean_stable_diffusion_v1_5_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_KOREAN\_STABLE\_DIFFUSION\_V1\_5\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_bingsu_my_korean_stable_diffusion_v1_5_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_K\_ANYTHING\_V3\_0\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_bingsu_my_k_anything_v3_0_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_K\_ANYTHING\_V3\_0\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_bingsu_my_k_anything_v3_0_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_K\_ANYTHING\_V3\_0\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_bingsu_my_k_anything_v3_0_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_BUNTOPSIH\_NOVGORANSTEFANOVSKI\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_buntopsih_novgoranstefanovski_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_BUNTOPSIH\_NOVGORANSTEFANOVSKI\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_buntopsih_novgoranstefanovski_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_BUNTOPSIH\_NOVGORANSTEFANOVSKI\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_buntopsih_novgoranstefanovski_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_CLAUDFUEN\_PHOTOREALISTIC\_FUEN\_V1\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_claudfuen_photorealistic_fuen_v1_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_CLAUDFUEN\_PHOTOREALISTIC\_FUEN\_V1\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_claudfuen_photorealistic_fuen_v1_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_CLAUDFUEN\_PHOTOREALISTIC\_FUEN\_V1\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_claudfuen_photorealistic_fuen_v1_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_CODER119\_VECTORARTZ\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_coder119_vectorartz_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_CODER119\_VECTORARTZ\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_coder119_vectorartz_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_CODER119\_VECTORARTZ\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_coder119_vectorartz_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_CONFLICTX\_COMPLEX\_LINEART\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_conflictx_complex_lineart_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_CONFLICTX\_COMPLEX\_LINEART\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_conflictx_complex_lineart_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_CONFLICTX\_COMPLEX\_LINEART\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_conflictx_complex_lineart_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_CATS\_MUSICAL\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_cats_musical_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_CATS\_MUSICAL\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_cats_musical_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_CATS\_MUSICAL\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_cats_musical_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_JWST\_DEEP\_SPACE\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_jwst_deep_space_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_JWST\_DEEP\_SPACE\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_jwst_deep_space_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_JWST\_DEEP\_SPACE\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_jwst_deep_space_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_TRON\_LEGACY\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_tron_legacy_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_TRON\_LEGACY\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_tron_legacy_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_TRON\_LEGACY\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_tron_legacy_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_VAN\_GOGH\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_van_gogh_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_VAN\_GOGH\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_van_gogh_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_VAN\_GOGH\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_dallinmackay_van_gogh_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_DGSPITZER\_CYBERPUNK\_ANIME\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_dgspitzer_cyberpunk_anime_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_DGSPITZER\_CYBERPUNK\_ANIME\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_dgspitzer_cyberpunk_anime_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_DGSPITZER\_CYBERPUNK\_ANIME\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_dgspitzer_cyberpunk_anime_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_DREAMLIKE\_ART\_DREAMLIKE\_DIFFUSION\_1\_0\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_dreamlike_art_dreamlike_diffusion_1_0_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_DREAMLIKE\_ART\_DREAMLIKE\_DIFFUSION\_1\_0\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_dreamlike_art_dreamlike_diffusion_1_0_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_DREAMLIKE\_ART\_DREAMLIKE\_DIFFUSION\_1\_0\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_dreamlike_art_dreamlike_diffusion_1_0_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_EIMISS\_EIMISANIMEDIFFUSION\_1\_0V\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_eimiss_eimisanimediffusion_1_0v_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_EIMISS\_EIMISANIMEDIFFUSION\_1\_0V\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_eimiss_eimisanimediffusion_1_0v_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_EIMISS\_EIMISANIMEDIFFUSION\_1\_0V\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_eimiss_eimisanimediffusion_1_0v_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_ENVVI\_INKPUNK\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_envvi_inkpunk_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_ENVVI\_INKPUNK\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_envvi_inkpunk_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_ENVVI\_INKPUNK\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_envvi_inkpunk_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_EVEL\_YOSHIN\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_evel_yoshin_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_EVEL\_YOSHIN\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_evel_yoshin_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_EVEL\_YOSHIN\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_evel_yoshin_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_EXTRAPHY\_MUSTAFA\_KEMAL\_ATATURK\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_extraphy_mustafa_kemal_ataturk_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_EXTRAPHY\_MUSTAFA\_KEMAL\_ATATURK\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_extraphy_mustafa_kemal_ataturk_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_EXTRAPHY\_MUSTAFA\_KEMAL\_ATATURK\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_extraphy_mustafa_kemal_ataturk_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_FFFILONI\_MR\_MEN\_AND\_LITTLE\_MISSES\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_fffiloni_mr_men_and_little_misses_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_FFFILONI\_MR\_MEN\_AND\_LITTLE\_MISSES\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_fffiloni_mr_men_and_little_misses_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_FFFILONI\_MR\_MEN\_AND\_LITTLE\_MISSES\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_fffiloni_mr_men_and_little_misses_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_ELRISITAS\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_elrisitas_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_ELRISITAS\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_elrisitas_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_ELRISITAS\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_elrisitas_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_BALLOONART\_MODEL\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_balloonart_model_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_BALLOONART\_MODEL\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_balloonart_model_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_BALLOONART\_MODEL\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_balloonart_model_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_MICROSCOPIC\_MODEL\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_microscopic_model_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_MICROSCOPIC\_MODEL\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_microscopic_model_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_MICROSCOPIC\_MODEL\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_microscopic_model_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_PAPERCUT\_MODEL\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_papercut_model_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_PAPERCUT\_MODEL\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_papercut_model_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_PAPERCUT\_MODEL\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_papercut_model_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_VOXELART\_MODEL\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_voxelart_model_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_VOXELART\_MODEL\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_voxelart_model_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_VOXELART\_MODEL\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_fictiverse_stable_diffusion_voxelart_model_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_HAOR\_EVT\_V3\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_haor_evt_v3_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_HAOR\_EVT\_V3\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_haor_evt_v3_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_HAOR\_EVT\_V3\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_haor_evt_v3_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_HASSANBLEND\_HASSANBLEND1\_4\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_hassanblend_hassanblend1_4_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_HASSANBLEND\_HASSANBLEND1\_4\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_hassanblend_hassanblend1_4_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_HASSANBLEND\_HASSANBLEND1\_4\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_hassanblend_hassanblend1_4_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_EN\_V0\_1\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_idea_ccnl_taiyi_stable_diffusion_1b_chinese_en_v0_1_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_EN\_V0\_1\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_idea_ccnl_taiyi_stable_diffusion_1b_chinese_en_v0_1_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_EN\_V0\_1\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_idea_ccnl_taiyi_stable_diffusion_1b_chinese_en_v0_1_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_V0\_1\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_idea_ccnl_taiyi_stable_diffusion_1b_chinese_v0_1_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_V0\_1\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_idea_ccnl_taiyi_stable_diffusion_1b_chinese_v0_1_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_V0\_1\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_idea_ccnl_taiyi_stable_diffusion_1b_chinese_v0_1_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_IFANSNEK\_JOHNDIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_ifansnek_johndiffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_IFANSNEK\_JOHNDIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_ifansnek_johndiffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_IFANSNEK\_JOHNDIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_ifansnek_johndiffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_JERSONM89\_AVATAR\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_jersonm89_avatar_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_JERSONM89\_AVATAR\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_jersonm89_avatar_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_JERSONM89\_AVATAR\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_jersonm89_avatar_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_JVKAPE\_ICONSMI\_APPICONSMODELFORSD\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_jvkape_iconsmi_appiconsmodelforsd_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_JVKAPE\_ICONSMI\_APPICONSMODELFORSD\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_jvkape_iconsmi_appiconsmodelforsd_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_JVKAPE\_ICONSMI\_APPICONSMODELFORSD\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_jvkape_iconsmi_appiconsmodelforsd_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_KATAKANA\_2D\_MIX\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_katakana_2d_mix_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_KATAKANA\_2D\_MIX\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_katakana_2d_mix_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_KATAKANA\_2D\_MIX\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_katakana_2d_mix_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_LACAMBRE\_VULVINE\_LOOK\_V02\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_lacambre_vulvine_look_v02_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_LACAMBRE\_VULVINE\_LOOK\_V02\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_lacambre_vulvine_look_v02_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_LACAMBRE\_VULVINE\_LOOK\_V02\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_lacambre_vulvine_look_v02_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_LANGBOAT\_GUOHUA\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_langboat_guohua_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_LANGBOAT\_GUOHUA\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_langboat_guohua_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_LANGBOAT\_GUOHUA\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_langboat_guohua_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_LINAQRUF\_ANYTHING\_V3\_0\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_linaqruf_anything_v3_0_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_LINAQRUF\_ANYTHING\_V3\_0\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_linaqruf_anything_v3_0_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_LINAQRUF\_ANYTHING\_V3\_0\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_linaqruf_anything_v3_0_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_MIKESMODELS\_WALTZ\_WITH\_BASHIR\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_mikesmodels_waltz_with_bashir_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_MIKESMODELS\_WALTZ\_WITH\_BASHIR\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_mikesmodels_waltz_with_bashir_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_MIKESMODELS\_WALTZ\_WITH\_BASHIR\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_mikesmodels_waltz_with_bashir_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_MITCHTECH\_KLINGON\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_mitchtech_klingon_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_MITCHTECH\_KLINGON\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_mitchtech_klingon_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_MITCHTECH\_KLINGON\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_mitchtech_klingon_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_MITCHTECH\_VULCAN\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_mitchtech_vulcan_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_MITCHTECH\_VULCAN\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_mitchtech_vulcan_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_MITCHTECH\_VULCAN\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_mitchtech_vulcan_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_MITSUA\_MITSUA\_DIFFUSION\_CC0\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_mitsua_mitsua_diffusion_cc0_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_MITSUA\_MITSUA\_DIFFUSION\_CC0\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_mitsua_mitsua_diffusion_cc0_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_MITSUA\_MITSUA\_DIFFUSION\_CC0\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_mitsua_mitsua_diffusion_cc0_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NACLBIT\_TRINART\_STABLE\_DIFFUSION\_V2\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_naclbit_trinart_stable_diffusion_v2_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NACLBIT\_TRINART\_STABLE\_DIFFUSION\_V2\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_naclbit_trinart_stable_diffusion_v2_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NACLBIT\_TRINART\_STABLE\_DIFFUSION\_V2\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_naclbit_trinart_stable_diffusion_v2_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCANE\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_arcane_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCANE\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_arcane_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCANE\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_arcane_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCHER\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_archer_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCHER\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_archer_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCHER\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_archer_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_CLASSIC\_ANIM\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_classic_anim_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_CLASSIC\_ANIM\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_classic_anim_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_CLASSIC\_ANIM\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_classic_anim_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ELDEN\_RING\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_elden_ring_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ELDEN\_RING\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_elden_ring_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ELDEN\_RING\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_elden_ring_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_FUTURE\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_future_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_FUTURE\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_future_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_FUTURE\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_future_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_GHIBLI\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_ghibli_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_GHIBLI\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_ghibli_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_GHIBLI\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_ghibli_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_MO\_DI\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_mo_di_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_MO\_DI\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_mo_di_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_MO\_DI\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_mo_di_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_NITRO\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_nitro_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_NITRO\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_nitro_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_NITRO\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_nitro_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_REDSHIFT\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_redshift_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_REDSHIFT\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_redshift_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_REDSHIFT\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_redshift_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_SPIDER\_VERSE\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_spider_verse_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_SPIDER\_VERSE\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_spider_verse_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_SPIDER\_VERSE\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nitrosocke_spider_verse_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_NOUSR\_ROBO\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_nousr_robo_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_NOUSR\_ROBO\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_nousr_robo_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_NOUSR\_ROBO\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_nousr_robo_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_OGKALU\_COMIC\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_ogkalu_comic_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_OGKALU\_COMIC\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_ogkalu_comic_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_OGKALU\_COMIC\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_ogkalu_comic_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_OPENJOURNEY\_OPENJOURNEY\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_openjourney_openjourney_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_OPENJOURNEY\_OPENJOURNEY\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_openjourney_openjourney_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_OPENJOURNEY\_OPENJOURNEY\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_openjourney_openjourney_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_PIESPOSITO\_OPENPOTIONBOTTLE\_V2\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_piesposito_openpotionbottle_v2_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_PIESPOSITO\_OPENPOTIONBOTTLE\_V2\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_piesposito_openpotionbottle_v2_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_PIESPOSITO\_OPENPOTIONBOTTLE\_V2\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_piesposito_openpotionbottle_v2_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_PLASMO\_VOXEL\_ISH\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_plasmo_voxel_ish_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_PLASMO\_VOXEL\_ISH\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_plasmo_voxel_ish_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_PLASMO\_VOXEL\_ISH\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_plasmo_voxel_ish_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_PLASMO\_WOOLITIZE\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_plasmo_woolitize_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_PLASMO\_WOOLITIZE\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_plasmo_woolitize_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_PLASMO\_WOOLITIZE\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_plasmo_woolitize_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_PROGAMERGOV\_MIN\_ILLUST\_BACKGROUND\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_progamergov_min_illust_background_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_PROGAMERGOV\_MIN\_ILLUST\_BACKGROUND\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_progamergov_min_illust_background_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_PROGAMERGOV\_MIN\_ILLUST\_BACKGROUND\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_progamergov_min_illust_background_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_LINKEDIN\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_prompthero_linkedin_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_LINKEDIN\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_prompthero_linkedin_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_LINKEDIN\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_prompthero_linkedin_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_OPENJOURNEY\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_prompthero_openjourney_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_OPENJOURNEY\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_prompthero_openjourney_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_OPENJOURNEY\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_prompthero_openjourney_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_QILEX\_MAGIC\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_qilex_magic_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_QILEX\_MAGIC\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_qilex_magic_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_QILEX\_MAGIC\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_qilex_magic_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_RABIDGREMLIN\_SD\_DB\_EPIC\_SPACE\_MACHINE\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_rabidgremlin_sd_db_epic_space_machine_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_RABIDGREMLIN\_SD\_DB\_EPIC\_SPACE\_MACHINE\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_rabidgremlin_sd_db_epic_space_machine_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_RABIDGREMLIN\_SD\_DB\_EPIC\_SPACE\_MACHINE\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_rabidgremlin_sd_db_epic_space_machine_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_RAYHELL\_POPUPBOOK\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_rayhell_popupbook_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_RAYHELL\_POPUPBOOK\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_rayhell_popupbook_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_RAYHELL\_POPUPBOOK\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_rayhell_popupbook_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_RUNWAYML\_STABLE\_DIFFUSION\_V1\_5\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_runwayml_stable_diffusion_v1_5_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_RUNWAYML\_STABLE\_DIFFUSION\_V1\_5\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_runwayml_stable_diffusion_v1_5_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_RUNWAYML\_STABLE\_DIFFUSION\_V1\_5\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_runwayml_stable_diffusion_v1_5_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_S3NH\_BEKSINSKI\_STYLE\_STABLE\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_s3nh_beksinski_style_stable_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_S3NH\_BEKSINSKI\_STYLE\_STABLE\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_s3nh_beksinski_style_stable_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_S3NH\_BEKSINSKI\_STYLE\_STABLE\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_s3nh_beksinski_style_stable_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_ORIGINAL\_CHARACTER\_CYCLPS\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_sd_dreambooth_library_original_character_cyclps_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_ORIGINAL\_CHARACTER\_CYCLPS\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_sd_dreambooth_library_original_character_cyclps_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_ORIGINAL\_CHARACTER\_CYCLPS\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_sd_dreambooth_library_original_character_cyclps_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_PERSONA\_5\_SHIGENORI\_STYLE\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_sd_dreambooth_library_persona_5_shigenori_style_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_PERSONA\_5\_SHIGENORI\_STYLE\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_sd_dreambooth_library_persona_5_shigenori_style_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_PERSONA\_5\_SHIGENORI\_STYLE\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_sd_dreambooth_library_persona_5_shigenori_style_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_SERAPHM\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_sd_dreambooth_library_seraphm_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_SERAPHM\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_sd_dreambooth_library_seraphm_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_SERAPHM\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_sd_dreambooth_library_seraphm_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_SHIRAYU\_SD\_TOHOKU\_V1\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_shirayu_sd_tohoku_v1_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_SHIRAYU\_SD\_TOHOKU\_V1\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_shirayu_sd_tohoku_v1_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_SHIRAYU\_SD\_TOHOKU\_V1\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_shirayu_sd_tohoku_v1_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_THELASTBEN\_HRRZG\_STYLE\_768PX\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_thelastben_hrrzg_style_768px_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_THELASTBEN\_HRRZG\_STYLE\_768PX\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_thelastben_hrrzg_style_768px_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_THELASTBEN\_HRRZG\_STYLE\_768PX\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_thelastben_hrrzg_style_768px_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_TIMOTHEPEARCE\_GINA\_THE\_CAT\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_timothepearce_gina_the_cat_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_TIMOTHEPEARCE\_GINA\_THE\_CAT\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_timothepearce_gina_the_cat_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_TIMOTHEPEARCE\_GINA\_THE\_CAT\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_timothepearce_gina_the_cat_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_TRYSTAR\_CLONEDIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_trystar_clonediffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_TRYSTAR\_CLONEDIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_trystar_clonediffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_TRYSTAR\_CLONEDIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_trystar_clonediffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_TUWONGA\_DBLUTH\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_tuwonga_dbluth_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_TUWONGA\_DBLUTH\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_tuwonga_dbluth_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_TUWONGA\_DBLUTH\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_tuwonga_dbluth_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_TUWONGA\_ROTOSCOPEE\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_tuwonga_rotoscopee_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_TUWONGA\_ROTOSCOPEE\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_tuwonga_rotoscopee_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_TUWONGA\_ROTOSCOPEE\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_tuwonga_rotoscopee_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_VOLRATH50\_FANTASY\_CARD\_DIFFUSION\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_volrath50_fantasy_card_diffusion_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_VOLRATH50\_FANTASY\_CARD\_DIFFUSION\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_volrath50_fantasy_card_diffusion_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_VOLRATH50\_FANTASY\_CARD\_DIFFUSION\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_volrath50_fantasy_card_diffusion_2_0_0)
- [HUGGINGFACE\_TXT2IMG\_YAYAB\_SD\_ONEPIECE\_DIFFUSERS4\_1\_0\_0](JumpStartModel.md#huggingface_txt2img_yayab_sd_onepiece_diffusers4_1_0_0)
- [HUGGINGFACE\_TXT2IMG\_YAYAB\_SD\_ONEPIECE\_DIFFUSERS4\_1\_1\_0](JumpStartModel.md#huggingface_txt2img_yayab_sd_onepiece_diffusers4_1_1_0)
- [HUGGINGFACE\_TXT2IMG\_YAYAB\_SD\_ONEPIECE\_DIFFUSERS4\_2\_0\_0](JumpStartModel.md#huggingface_txt2img_yayab_sd_onepiece_diffusers4_2_0_0)
- [HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DEBERTA\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_zstc_cross_encoder_nli_deberta_base_1_0_0)
- [HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DEBERTA\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_zstc_cross_encoder_nli_deberta_base_2_0_0)
- [HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DISTILROBERTA\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_zstc_cross_encoder_nli_distilroberta_base_1_0_0)
- [HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DISTILROBERTA\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_zstc_cross_encoder_nli_distilroberta_base_2_0_0)
- [HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_MINILM2\_L6\_H768\_1\_0\_0](JumpStartModel.md#huggingface_zstc_cross_encoder_nli_minilm2_l6_h768_1_0_0)
- [HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_MINILM2\_L6\_H768\_2\_0\_0](JumpStartModel.md#huggingface_zstc_cross_encoder_nli_minilm2_l6_h768_2_0_0)
- [HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_ROBERTA\_BASE\_1\_0\_0](JumpStartModel.md#huggingface_zstc_cross_encoder_nli_roberta_base_1_0_0)
- [HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_ROBERTA\_BASE\_2\_0\_0](JumpStartModel.md#huggingface_zstc_cross_encoder_nli_roberta_base_2_0_0)
- [HUGGINGFACE\_ZSTC\_DIGITALEPIDEMIOLOGYLAB\_COVID\_TWITTER\_BERT\_V2\_MNLI\_1\_0\_0](JumpStartModel.md#huggingface_zstc_digitalepidemiologylab_covid_twitter_bert_v2_mnli_1_0_0)
- [HUGGINGFACE\_ZSTC\_DIGITALEPIDEMIOLOGYLAB\_COVID\_TWITTER\_BERT\_V2\_MNLI\_2\_0\_0](JumpStartModel.md#huggingface_zstc_digitalepidemiologylab_covid_twitter_bert_v2_mnli_2_0_0)
- [HUGGINGFACE\_ZSTC\_ELELDAR\_THEME\_CLASSIFICATION\_1\_0\_0](JumpStartModel.md#huggingface_zstc_eleldar_theme_classification_1_0_0)
- [HUGGINGFACE\_ZSTC\_ELELDAR\_THEME\_CLASSIFICATION\_2\_0\_0](JumpStartModel.md#huggingface_zstc_eleldar_theme_classification_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_ALLNLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_multilingual_cased_allnli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_ALLNLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_multilingual_cased_allnli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_MULTINLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_multilingual_cased_multinli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_MULTINLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_multilingual_cased_multinli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_SNLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_multilingual_cased_snli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_SNLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_multilingual_cased_snli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_turkish_cased_allnli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_turkish_cased_allnli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_turkish_cased_multinli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_turkish_cased_multinli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_turkish_cased_snli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_bert_base_turkish_cased_snli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_ALLNLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_convbert_base_turkish_mc4_cased_allnli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_ALLNLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_convbert_base_turkish_mc4_cased_allnli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_MULTINLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_convbert_base_turkish_mc4_cased_multinli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_MULTINLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_convbert_base_turkish_mc4_cased_multinli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_SNLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_convbert_base_turkish_mc4_cased_snli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_SNLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_convbert_base_turkish_mc4_cased_snli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_distilbert_base_turkish_cased_allnli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_distilbert_base_turkish_cased_allnli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_distilbert_base_turkish_cased_multinli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_distilbert_base_turkish_cased_multinli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_1\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_distilbert_base_turkish_cased_snli_tr_1_0_0)
- [HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_2\_0\_0](JumpStartModel.md#huggingface_zstc_emrecan_distilbert_base_turkish_cased_snli_tr_2_0_0)
- [HUGGINGFACE\_ZSTC\_FACEBOOK\_BART\_LARGE\_MNLI\_1\_0\_0](JumpStartModel.md#huggingface_zstc_facebook_bart_large_mnli_1_0_0)
- [HUGGINGFACE\_ZSTC\_FACEBOOK\_BART\_LARGE\_MNLI\_2\_0\_0](JumpStartModel.md#huggingface_zstc_facebook_bart_large_mnli_2_0_0)
- [HUGGINGFACE\_ZSTC\_JIVA\_XLM\_ROBERTA\_LARGE\_IT\_MNLI\_1\_0\_0](JumpStartModel.md#huggingface_zstc_jiva_xlm_roberta_large_it_mnli_1_0_0)
- [HUGGINGFACE\_ZSTC\_JIVA\_XLM\_ROBERTA\_LARGE\_IT\_MNLI\_2\_0\_0](JumpStartModel.md#huggingface_zstc_jiva_xlm_roberta_large_it_mnli_2_0_0)
- [HUGGINGFACE\_ZSTC\_LIGHTETERNAL\_NLI\_XLM\_R\_GREEK\_1\_0\_0](JumpStartModel.md#huggingface_zstc_lighteternal_nli_xlm_r_greek_1_0_0)
- [HUGGINGFACE\_ZSTC\_LIGHTETERNAL\_NLI\_XLM\_R\_GREEK\_2\_0\_0](JumpStartModel.md#huggingface_zstc_lighteternal_nli_xlm_r_greek_2_0_0)
- [HUGGINGFACE\_ZSTC\_MORITZLAURER\_DEBERTA\_V3\_LARGE\_MNLI\_FEVER\_ANLI\_LING\_WANLI\_1\_0\_0](JumpStartModel.md#huggingface_zstc_moritzlaurer_deberta_v3_large_mnli_fever_anli_ling_wanli_1_0_0)
- [HUGGINGFACE\_ZSTC\_MORITZLAURER\_DEBERTA\_V3\_LARGE\_MNLI\_FEVER\_ANLI\_LING\_WANLI\_2\_0\_0](JumpStartModel.md#huggingface_zstc_moritzlaurer_deberta_v3_large_mnli_fever_anli_ling_wanli_2_0_0)
- [HUGGINGFACE\_ZSTC\_MORITZLAURER\_MDEBERTA\_V3\_BASE\_XNLI\_MULTILINGUAL\_NLI\_2MIL7\_1\_0\_0](JumpStartModel.md#huggingface_zstc_moritzlaurer_mdeberta_v3_base_xnli_multilingual_nli_2mil7_1_0_0)
- [HUGGINGFACE\_ZSTC\_MORITZLAURER\_MDEBERTA\_V3\_BASE\_XNLI\_MULTILINGUAL\_NLI\_2MIL7\_2\_0\_0](JumpStartModel.md#huggingface_zstc_moritzlaurer_mdeberta_v3_base_xnli_multilingual_nli_2mil7_2_0_0)
- [HUGGINGFACE\_ZSTC\_NARSIL\_BART\_LARGE\_MNLI\_OPTI\_1\_0\_0](JumpStartModel.md#huggingface_zstc_narsil_bart_large_mnli_opti_1_0_0)
- [HUGGINGFACE\_ZSTC\_NARSIL\_BART\_LARGE\_MNLI\_OPTI\_2\_0\_0](JumpStartModel.md#huggingface_zstc_narsil_bart_large_mnli_opti_2_0_0)
- [HUGGINGFACE\_ZSTC\_NARSIL\_DEBERTA\_LARGE\_MNLI\_ZERO\_CLS\_1\_0\_0](JumpStartModel.md#huggingface_zstc_narsil_deberta_large_mnli_zero_cls_1_0_0)
- [HUGGINGFACE\_ZSTC\_NARSIL\_DEBERTA\_LARGE\_MNLI\_ZERO\_CLS\_2\_0\_0](JumpStartModel.md#huggingface_zstc_narsil_deberta_large_mnli_zero_cls_2_0_0)
- [HUGGINGFACE\_ZSTC\_NAVTECA\_BART\_LARGE\_MNLI\_1\_0\_0](JumpStartModel.md#huggingface_zstc_navteca_bart_large_mnli_1_0_0)
- [HUGGINGFACE\_ZSTC\_NAVTECA\_BART\_LARGE\_MNLI\_2\_0\_0](JumpStartModel.md#huggingface_zstc_navteca_bart_large_mnli_2_0_0)
- [HUGGINGFACE\_ZSTC\_RECOGNAI\_BERT\_BASE\_SPANISH\_WWM\_CASED\_XNLI\_1\_0\_0](JumpStartModel.md#huggingface_zstc_recognai_bert_base_spanish_wwm_cased_xnli_1_0_0)
- [HUGGINGFACE\_ZSTC\_RECOGNAI\_BERT\_BASE\_SPANISH\_WWM\_CASED\_XNLI\_2\_0\_0](JumpStartModel.md#huggingface_zstc_recognai_bert_base_spanish_wwm_cased_xnli_2_0_0)
- [HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_MEDIUM\_1\_0\_0](JumpStartModel.md#huggingface_zstc_recognai_zeroshot_selectra_medium_1_0_0)
- [HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_MEDIUM\_2\_0\_0](JumpStartModel.md#huggingface_zstc_recognai_zeroshot_selectra_medium_2_0_0)
- [HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_SMALL\_1\_0\_0](JumpStartModel.md#huggingface_zstc_recognai_zeroshot_selectra_small_1_0_0)
- [HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_SMALL\_2\_0\_0](JumpStartModel.md#huggingface_zstc_recognai_zeroshot_selectra_small_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_13b_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_0](JumpStartModel.md#meta_textgeneration_llama_2_13b_2_1_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_1](JumpStartModel.md#meta_textgeneration_llama_2_13b_2_1_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_2](JumpStartModel.md#meta_textgeneration_llama_2_13b_2_1_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_3](JumpStartModel.md#meta_textgeneration_llama_2_13b_2_1_3)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_4](JumpStartModel.md#meta_textgeneration_llama_2_13b_2_1_4)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_5](JumpStartModel.md#meta_textgeneration_llama_2_13b_2_1_5)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_6](JumpStartModel.md#meta_textgeneration_llama_2_13b_2_1_6)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_7](JumpStartModel.md#meta_textgeneration_llama_2_13b_2_1_7)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_8](JumpStartModel.md#meta_textgeneration_llama_2_13b_2_1_8)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_3\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_13b_3_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_3\_0\_1](JumpStartModel.md#meta_textgeneration_llama_2_13b_3_0_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_3\_0\_2](JumpStartModel.md#meta_textgeneration_llama_2_13b_3_0_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_1\_1\_0](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_1_1_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_1\_2\_0](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_1_2_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_1\_2\_1](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_1_2_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_1](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_2_0_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_2](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_2_0_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_3](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_2_0_3)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_4](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_2_0_4)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_3\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_3_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_3\_0\_1](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_3_0_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_3\_0\_2](JumpStartModel.md#meta_textgeneration_llama_2_13b_f_3_0_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_1\_1\_0](JumpStartModel.md#meta_textgeneration_llama_2_70b_1_1_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_1\_2\_0](JumpStartModel.md#meta_textgeneration_llama_2_70b_1_2_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_70b_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_1](JumpStartModel.md#meta_textgeneration_llama_2_70b_2_0_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_2](JumpStartModel.md#meta_textgeneration_llama_2_70b_2_0_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_3](JumpStartModel.md#meta_textgeneration_llama_2_70b_2_0_3)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_4](JumpStartModel.md#meta_textgeneration_llama_2_70b_2_0_4)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_5](JumpStartModel.md#meta_textgeneration_llama_2_70b_2_0_5)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_6](JumpStartModel.md#meta_textgeneration_llama_2_70b_2_0_6)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_7](JumpStartModel.md#meta_textgeneration_llama_2_70b_2_0_7)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_3\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_70b_3_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_3\_0\_1](JumpStartModel.md#meta_textgeneration_llama_2_70b_3_0_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_3\_0\_2](JumpStartModel.md#meta_textgeneration_llama_2_70b_3_0_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_1\_1\_0](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_1_1_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_1\_2\_0](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_1_2_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_1\_2\_1](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_1_2_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_1](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_2_0_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_2](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_2_0_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_3](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_2_0_3)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_4](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_2_0_4)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_3\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_3_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_3\_0\_1](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_3_0_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_3\_0\_2](JumpStartModel.md#meta_textgeneration_llama_2_70b_f_3_0_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_7b_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_0](JumpStartModel.md#meta_textgeneration_llama_2_7b_2_1_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_1](JumpStartModel.md#meta_textgeneration_llama_2_7b_2_1_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_2](JumpStartModel.md#meta_textgeneration_llama_2_7b_2_1_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_3](JumpStartModel.md#meta_textgeneration_llama_2_7b_2_1_3)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_4](JumpStartModel.md#meta_textgeneration_llama_2_7b_2_1_4)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_5](JumpStartModel.md#meta_textgeneration_llama_2_7b_2_1_5)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_6](JumpStartModel.md#meta_textgeneration_llama_2_7b_2_1_6)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_7](JumpStartModel.md#meta_textgeneration_llama_2_7b_2_1_7)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_8](JumpStartModel.md#meta_textgeneration_llama_2_7b_2_1_8)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_3\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_7b_3_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_3\_0\_1](JumpStartModel.md#meta_textgeneration_llama_2_7b_3_0_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_3\_0\_2](JumpStartModel.md#meta_textgeneration_llama_2_7b_3_0_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_1\_1\_0](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_1_1_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_1\_2\_0](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_1_2_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_1\_2\_1](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_1_2_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_1](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_2_0_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_2](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_2_0_2)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_3](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_2_0_3)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_4](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_2_0_4)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_3\_0\_0](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_3_0_0)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_3\_0\_1](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_3_0_1)
- [META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_3\_0\_2](JumpStartModel.md#meta_textgeneration_llama_2_7b_f_3_0_2)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_1\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_1_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_1\_0\_1](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_1_0_1)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_1\_0\_2](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_1_0_2)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_1\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_instruct_1_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_1\_0\_1](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_instruct_1_0_1)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_1\_0\_2](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_instruct_1_0_2)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_instruct_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_1\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_python_1_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_1\_0\_1](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_python_1_0_1)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_1\_0\_2](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_python_1_0_2)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_13b_python_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_1\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_1_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_1\_0\_1](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_1_0_1)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_1\_0\_2](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_1_0_2)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_1\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_instruct_1_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_1\_0\_1](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_instruct_1_0_1)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_1\_0\_2](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_instruct_1_0_2)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_instruct_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_1\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_python_1_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_1\_0\_1](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_python_1_0_1)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_1\_0\_2](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_python_1_0_2)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_34b_python_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_1\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_1_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_1\_0\_1](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_1_0_1)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_1\_0\_2](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_1_0_2)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_1\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_instruct_1_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_1\_0\_1](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_instruct_1_0_1)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_1\_0\_2](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_instruct_1_0_2)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_instruct_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_1\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_python_1_0_0)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_1\_0\_1](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_python_1_0_1)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_1\_0\_2](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_python_1_0_2)
- [META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_2\_0\_0](JumpStartModel.md#meta_textgeneration_llama_codellama_7b_python_2_0_0)
- [META\_TEXTGENERATION\_LLAMA\_GUARD\_7B\_1\_0\_0](JumpStartModel.md#meta_textgeneration_llama_guard_7b_1_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_2\_DEPTH\_FP16\_1\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_2_depth_fp16_1_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_2\_DEPTH\_FP16\_2\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_2_depth_fp16_2_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_1\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v1_5_controlnet_1_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_2\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v1_5_controlnet_2_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_FP16\_1\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v1_5_controlnet_fp16_1_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_FP16\_2\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v1_5_controlnet_fp16_2_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_1\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v1_5_controlnet_v1_1_1_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_2\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v1_5_controlnet_v1_1_2_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_FP16\_1\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v1_5_controlnet_v1_1_fp16_1_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_FP16\_2\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v1_5_controlnet_v1_1_fp16_2_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_1\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v2_1_controlnet_1_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_2\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v2_1_controlnet_2_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_FP16\_1\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v2_1_controlnet_fp16_1_0_0)
- [MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_FP16\_2\_0\_0](JumpStartModel.md#model_depth2img_stable_diffusion_v2_1_controlnet_fp16_2_0_0)
- [MODEL\_IMAGEGENERATION\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_0\_0](JumpStartModel.md#model_imagegeneration_stabilityai_stable_diffusion_v2_1_1_0_0)
- [MODEL\_IMAGEGENERATION\_STABILITYAI\_STABLE\_DIFFUSION\_XL\_BASE\_1\_0\_1\_0\_0](JumpStartModel.md#model_imagegeneration_stabilityai_stable_diffusion_xl_base_1_0_1_0_0)
- [MODEL\_IMAGEGENERATION\_STABILITYAI\_STABLE\_DIFFUSION\_XL\_BASE\_1\_0\_1\_0\_1](JumpStartModel.md#model_imagegeneration_stabilityai_stable_diffusion_xl_base_1_0_1_0_1)
- [MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_1\_0\_0](JumpStartModel.md#model_inpainting_runwayml_stable_diffusion_inpainting_1_0_0)
- [MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_1\_1\_0](JumpStartModel.md#model_inpainting_runwayml_stable_diffusion_inpainting_1_1_0)
- [MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_2\_0\_0](JumpStartModel.md#model_inpainting_runwayml_stable_diffusion_inpainting_2_0_0)
- [MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_FP16\_1\_0\_0](JumpStartModel.md#model_inpainting_runwayml_stable_diffusion_inpainting_fp16_1_0_0)
- [MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_FP16\_1\_1\_0](JumpStartModel.md#model_inpainting_runwayml_stable_diffusion_inpainting_fp16_1_1_0)
- [MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_FP16\_2\_0\_0](JumpStartModel.md#model_inpainting_runwayml_stable_diffusion_inpainting_fp16_2_0_0)
- [MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_1\_0\_0](JumpStartModel.md#model_inpainting_stabilityai_stable_diffusion_2_inpainting_1_0_0)
- [MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_1\_1\_0](JumpStartModel.md#model_inpainting_stabilityai_stable_diffusion_2_inpainting_1_1_0)
- [MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_2\_0\_0](JumpStartModel.md#model_inpainting_stabilityai_stable_diffusion_2_inpainting_2_0_0)
- [MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_FP16\_1\_0\_0](JumpStartModel.md#model_inpainting_stabilityai_stable_diffusion_2_inpainting_fp16_1_0_0)
- [MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_FP16\_1\_1\_0](JumpStartModel.md#model_inpainting_stabilityai_stable_diffusion_2_inpainting_fp16_1_1_0)
- [MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_FP16\_2\_0\_0](JumpStartModel.md#model_inpainting_stabilityai_stable_diffusion_2_inpainting_fp16_2_0_0)
- [MODEL\_TEXTGENERATIONJP\_JAPANESE\_STABLELM\_INSTRUCT\_ALPHA\_7B\_V2\_1\_0\_0](JumpStartModel.md#model_textgenerationjp_japanese_stablelm_instruct_alpha_7b_v2_1_0_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_0\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_1_0_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_1\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_1_1_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_1_2_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_1](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_1_2_1)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_2](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_1_2_2)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_3](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_1_2_3)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_3\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_1_3_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_2\_0\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_2_0_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_fp16_1_0_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_1](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_fp16_1_0_1)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_2](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_fp16_1_0_2)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_3](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_fp16_1_0_3)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_1\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_fp16_1_1_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_2\_0\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v1_4_fp16_2_0_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_0\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_0_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_1_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_1](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_1_1)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_2](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_1_2)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_3](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_1_3)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_2\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_2_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_base_1_0_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_1](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_base_1_0_1)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_2](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_base_1_0_2)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_3](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_base_1_0_3)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_4](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_base_1_0_4)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_base_1_1_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_1](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_base_1_1_1)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_2](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_base_1_1_2)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_3](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_base_1_1_3)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_2\_0\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_1_base_2_0_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_2\_0\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_2_0_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_fp16_1_0_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_1](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_fp16_1_0_1)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_2](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_fp16_1_0_2)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_3](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_fp16_1_0_3)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_1\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_fp16_1_1_0)
- [MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_2\_0\_0](JumpStartModel.md#model_txt2img_stabilityai_stable_diffusion_v2_fp16_2_0_0)
- [MODEL\_UPSCALING\_STABILITYAI\_STABLE\_DIFFUSION\_X4\_UPSCALER\_FP16\_1\_0\_0](JumpStartModel.md#model_upscaling_stabilityai_stable_diffusion_x4_upscaler_fp16_1_0_0)
- [MODEL\_UPSCALING\_STABILITYAI\_STABLE\_DIFFUSION\_X4\_UPSCALER\_FP16\_1\_1\_0](JumpStartModel.md#model_upscaling_stabilityai_stable_diffusion_x4_upscaler_fp16_1_1_0)
- [MODEL\_UPSCALING\_STABILITYAI\_STABLE\_DIFFUSION\_X4\_UPSCALER\_FP16\_2\_0\_0](JumpStartModel.md#model_upscaling_stabilityai_stable_diffusion_x4_upscaler_fp16_2_0_0)

### Methods

- [bind](JumpStartModel.md#bind)
- [of](JumpStartModel.md#of)

## Constructors

### constructor

• **new JumpStartModel**(`name`): [`JumpStartModel`](JumpStartModel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1383](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1383)

## Properties

### name

• `Private` `Readonly` **name**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1383](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1383)

___

### HUGGINGFACE\_ASR\_WHISPER\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:43](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L43)

___

### HUGGINGFACE\_ASR\_WHISPER\_BASE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_BASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:42](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L42)

___

### HUGGINGFACE\_ASR\_WHISPER\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:41](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L41)

___

### HUGGINGFACE\_ASR\_WHISPER\_LARGE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_LARGE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:46](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L46)

___

### HUGGINGFACE\_ASR\_WHISPER\_LARGE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_LARGE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:45](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L45)

___

### HUGGINGFACE\_ASR\_WHISPER\_LARGE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_LARGE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:44](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L44)

___

### HUGGINGFACE\_ASR\_WHISPER\_LARGE\_V2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_LARGE\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:49](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L49)

___

### HUGGINGFACE\_ASR\_WHISPER\_LARGE\_V2\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_LARGE\_V2\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:48](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L48)

___

### HUGGINGFACE\_ASR\_WHISPER\_LARGE\_V2\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_LARGE\_V2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:47](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L47)

___

### HUGGINGFACE\_ASR\_WHISPER\_MEDIUM\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_MEDIUM\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:52](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L52)

___

### HUGGINGFACE\_ASR\_WHISPER\_MEDIUM\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_MEDIUM\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:51](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L51)

___

### HUGGINGFACE\_ASR\_WHISPER\_MEDIUM\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_MEDIUM\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:50](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L50)

___

### HUGGINGFACE\_ASR\_WHISPER\_SMALL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_SMALL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:55](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L55)

___

### HUGGINGFACE\_ASR\_WHISPER\_SMALL\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_SMALL\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:54](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L54)

___

### HUGGINGFACE\_ASR\_WHISPER\_SMALL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_SMALL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:53](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L53)

___

### HUGGINGFACE\_ASR\_WHISPER\_TINY\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_TINY\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:58](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L58)

___

### HUGGINGFACE\_ASR\_WHISPER\_TINY\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_TINY\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:57](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L57)

___

### HUGGINGFACE\_ASR\_WHISPER\_TINY\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ASR\_WHISPER\_TINY\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:56](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L56)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:62](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L62)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:61](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L61)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:60](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L60)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:59](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L59)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:66](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L66)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:65](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L65)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:64](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L64)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:63](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L63)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:70](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L70)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:69](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L69)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:68](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L68)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:67](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L67)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:74](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L74)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:73](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L73)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:72](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L72)

___

### HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_BASE\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:71](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L71)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:78](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L78)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:77](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L77)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:76](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L76)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:75](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L75)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:82](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L82)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:81](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L81)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:80](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L80)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:79](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L79)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:86](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L86)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:85](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L85)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:84](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L84)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:83](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L83)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:90](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L90)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:89](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L89)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:88](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L88)

___

### HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:87](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L87)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:94](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L94)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:93](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L93)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:92](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L92)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:91](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L91)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:98](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L98)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:97](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L97)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:96](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L96)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:95](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L95)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:102](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L102)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:101](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L101)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:100](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L100)

___

### HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILBERT\_BASE\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:99](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L99)

___

### HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:106](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L106)

___

### HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:105](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L105)

___

### HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:104](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L104)

___

### HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_DISTILROBERTA\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:103](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L103)

___

### HUGGINGFACE\_EQA\_ROBERTA\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:110](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L110)

___

### HUGGINGFACE\_EQA\_ROBERTA\_BASE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_BASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:109](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L109)

___

### HUGGINGFACE\_EQA\_ROBERTA\_BASE\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_BASE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:108](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L108)

___

### HUGGINGFACE\_EQA\_ROBERTA\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:107](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L107)

___

### HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:114](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L114)

___

### HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:113](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L113)

___

### HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:112](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L112)

___

### HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:111](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L111)

___

### HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:118](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L118)

___

### HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:117](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L117)

___

### HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:116](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L116)

___

### HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_EQA\_ROBERTA\_LARGE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:115](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L115)

___

### HUGGINGFACE\_FILLMASK\_BERT\_BASE\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_FILLMASK\_BERT\_BASE\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:120](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L120)

___

### HUGGINGFACE\_FILLMASK\_BERT\_BASE\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_FILLMASK\_BERT\_BASE\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:119](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L119)

___

### HUGGINGFACE\_LLM\_BILINGUAL\_RINNA\_4B\_INSTRUCTION\_PPO\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_BILINGUAL\_RINNA\_4B\_INSTRUCTION\_PPO\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:123](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L123)

___

### HUGGINGFACE\_LLM\_BILINGUAL\_RINNA\_4B\_INSTRUCTION\_PPO\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_BILINGUAL\_RINNA\_4B\_INSTRUCTION\_PPO\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:122](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L122)

___

### HUGGINGFACE\_LLM\_BILINGUAL\_RINNA\_4B\_INSTRUCTION\_PPO\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_BILINGUAL\_RINNA\_4B\_INSTRUCTION\_PPO\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:121](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L121)

___

### HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:128](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L128)

___

### HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:127](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L127)

___

### HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:126](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L126)

___

### HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:125](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L125)

___

### HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_4\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_180B\_BF16\_1\_4\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:124](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L124)

___

### HUGGINGFACE\_LLM\_FALCON\_180B\_CHAT\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_180B\_CHAT\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:131](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L131)

___

### HUGGINGFACE\_LLM\_FALCON\_180B\_CHAT\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_180B\_CHAT\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:130](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L130)

___

### HUGGINGFACE\_LLM\_FALCON\_180B\_CHAT\_BF16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_180B\_CHAT\_BF16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:129](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L129)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:139](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L139)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:138](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L138)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:137](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L137)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:136](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L136)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:135](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L135)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_2

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:134](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L134)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_3

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_1\_3\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:133](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L133)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:132](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L132)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:147](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L147)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:146](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L146)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:145](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L145)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:144](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L144)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:143](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L143)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_2

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:142](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L142)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_3

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_1\_3\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:141](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L141)

___

### HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_40B\_INSTRUCT\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:140](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L140)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:156](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L156)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:155](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L155)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:154](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L154)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:153](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L153)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:152](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L152)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:151](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L151)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_3\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_3\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:150](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L150)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_3\_2

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_1\_3\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:149](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L149)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:148](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L148)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:165](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L165)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:164](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L164)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:163](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L163)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:162](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L162)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:161](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L161)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:160](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L160)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_3\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_3\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:159](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L159)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_3\_2

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_1\_3\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:158](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L158)

___

### HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_FALCON\_7B\_INSTRUCT\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:157](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L157)

___

### HUGGINGFACE\_LLM\_MISTRAL\_7B\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_MISTRAL\_7B\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:168](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L168)

___

### HUGGINGFACE\_LLM\_MISTRAL\_7B\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_MISTRAL\_7B\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:167](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L167)

___

### HUGGINGFACE\_LLM\_MISTRAL\_7B\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_MISTRAL\_7B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:166](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L166)

___

### HUGGINGFACE\_LLM\_MISTRAL\_7B\_INSTRUCT\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_MISTRAL\_7B\_INSTRUCT\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:170](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L170)

___

### HUGGINGFACE\_LLM\_MISTRAL\_7B\_INSTRUCT\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_MISTRAL\_7B\_INSTRUCT\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:169](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L169)

___

### HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:172](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L172)

___

### HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:171](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L171)

___

### HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_INSTRUCT\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_INSTRUCT\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:174](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L174)

___

### HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_INSTRUCT\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_MIXTRAL\_8X7B\_INSTRUCT\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:173](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L173)

___

### HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:180](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L180)

___

### HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:179](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L179)

___

### HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:178](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L178)

___

### HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:177](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L177)

___

### HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:176](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L176)

___

### HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_LLM\_RINNA\_3\_6B\_INSTRUCTION\_PPO\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:175](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L175)

___

### HUGGINGFACE\_NER\_DISTILBERT\_BASE\_CASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_NER\_DISTILBERT\_BASE\_CASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:183](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L183)

___

### HUGGINGFACE\_NER\_DISTILBERT\_BASE\_CASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_NER\_DISTILBERT\_BASE\_CASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:182](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L182)

___

### HUGGINGFACE\_NER\_DISTILBERT\_BASE\_CASED\_FINETUNED\_CONLL03\_ENGLISH\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_NER\_DISTILBERT\_BASE\_CASED\_FINETUNED\_CONLL03\_ENGLISH\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:181](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L181)

___

### HUGGINGFACE\_NER\_DISTILBERT\_BASE\_UNCASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_NER\_DISTILBERT\_BASE\_UNCASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:186](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L186)

___

### HUGGINGFACE\_NER\_DISTILBERT\_BASE\_UNCASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_NER\_DISTILBERT\_BASE\_UNCASED\_FINETUNED\_CONLL03\_ENGLISH\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:185](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L185)

___

### HUGGINGFACE\_NER\_DISTILBERT\_BASE\_UNCASED\_FINETUNED\_CONLL03\_ENGLISH\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_NER\_DISTILBERT\_BASE\_UNCASED\_FINETUNED\_CONLL03\_ENGLISH\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:184](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L184)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:190](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L190)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:189](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L189)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:188](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L188)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_ALL\_MINILM\_L6\_V2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:187](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L187)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_BASE\_EN\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_BASE\_EN\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:193](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L193)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_BASE\_EN\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_BASE\_EN\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:192](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L192)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_BASE\_EN\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_BASE\_EN\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:191](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L191)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_LARGE\_EN\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_LARGE\_EN\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:196](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L196)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_LARGE\_EN\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_LARGE\_EN\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:195](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L195)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_LARGE\_EN\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_LARGE\_EN\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:194](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L194)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_SMALL\_EN\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_SMALL\_EN\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:199](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L199)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_SMALL\_EN\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_SMALL\_EN\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:198](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L198)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_SMALL\_EN\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_BGE\_SMALL\_EN\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:197](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L197)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:202](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L202)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:201](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L201)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:200](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L200)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_V2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:205](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L205)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_V2\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_V2\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:204](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L204)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_V2\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_BASE\_V2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:203](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L203)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:208](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L208)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:207](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L207)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:206](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L206)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_V2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:211](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L211)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_V2\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_V2\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:210](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L210)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_V2\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_LARGE\_V2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:209](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L209)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_SMALL\_V2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_SMALL\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:214](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L214)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_SMALL\_V2\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_SMALL\_V2\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:213](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L213)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_E5\_SMALL\_V2\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_E5\_SMALL\_V2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:212](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L212)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:217](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L217)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_BASE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_BASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:216](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L216)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:215](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L215)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_LARGE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_LARGE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:220](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L220)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_LARGE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_LARGE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:219](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L219)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_LARGE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_LARGE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:218](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L218)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_SMALL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_SMALL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:223](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L223)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_SMALL\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_SMALL\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:222](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L222)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_SMALL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_GTE\_SMALL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:221](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L221)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:226](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L226)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_BASE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_BASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:225](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L225)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:224](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L224)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_LARGE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_LARGE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:229](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L229)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_LARGE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_LARGE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:228](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L228)

___

### HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_LARGE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SENTENCESIMILARITY\_MULTILINGUAL\_E5\_LARGE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:227](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L227)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:236](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L236)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:235](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L235)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:234](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L234)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:233](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L233)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:232](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L232)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:231](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L231)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:230](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L230)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:243](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L243)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:242](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L242)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:241](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L241)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:240](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L240)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:239](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L239)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:238](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L238)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:237](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L237)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:250](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L250)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:249](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L249)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:248](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L248)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:247](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L247)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:246](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L246)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:245](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L245)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:244](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L244)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:257](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L257)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:256](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L256)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:255](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L255)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:254](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L254)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:253](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L253)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:252](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L252)

___

### HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_BASE\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:251](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L251)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:264](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L264)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:263](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L263)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:262](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L262)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:261](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L261)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:260](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L260)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:259](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L259)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:258](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L258)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:271](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L271)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:270](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L270)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:269](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L269)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:268](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L268)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:267](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L267)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:266](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L266)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:265](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L265)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:278](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L278)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:277](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L277)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:276](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L276)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:275](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L275)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:274](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L274)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:273](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L273)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:272](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L272)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:285](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L285)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:284](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L284)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:283](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L283)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:282](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L282)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:281](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L281)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:280](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L280)

___

### HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:279](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L279)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:292](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L292)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:291](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L291)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:290](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L290)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:289](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L289)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:288](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L288)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:287](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L287)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:286](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L286)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:299](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L299)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:298](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L298)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:297](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L297)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:296](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L296)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:295](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L295)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:294](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L294)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:293](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L293)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:306](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L306)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:305](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L305)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:304](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L304)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:303](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L303)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:302](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L302)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:301](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L301)

___

### HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILBERT\_BASE\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:300](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L300)

___

### HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:313](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L313)

___

### HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:312](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L312)

___

### HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:311](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L311)

___

### HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:310](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L310)

___

### HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:309](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L309)

___

### HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:308](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L308)

___

### HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_DISTILROBERTA\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:307](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L307)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:320](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L320)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:319](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L319)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:318](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L318)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:317](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L317)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:316](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L316)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:315](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L315)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:314](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L314)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:327](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L327)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:326](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L326)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:325](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L325)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:324](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L324)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:323](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L323)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:322](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L322)

___

### HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:321](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L321)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:334](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L334)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:333](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L333)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:332](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L332)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:331](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L331)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:330](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L330)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:329](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L329)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:328](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L328)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:341](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L341)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:340](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L340)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:339](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L339)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:338](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L338)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:337](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L337)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:336](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L336)

___

### HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:335](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L335)

___

### HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:348](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L348)

___

### HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:347](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L347)

___

### HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:346](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L346)

___

### HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:345](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L345)

___

### HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:344](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L344)

___

### HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:343](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L343)

___

### HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_CLM\_ENDE\_1024\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:342](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L342)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:355](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L355)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:354](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L354)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:353](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L353)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:352](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L352)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:351](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L351)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:350](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L350)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENDE\_1024\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:349](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L349)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:362](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L362)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:361](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L361)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:360](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L360)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:359](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L359)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:358](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L358)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:357](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L357)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_ENRO\_1024\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:356](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L356)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:369](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L369)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:368](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L368)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:367](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L367)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:366](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L366)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:365](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L365)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:364](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L364)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_TLM\_XNLI15\_1024\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:363](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L363)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:376](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L376)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:375](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L375)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:374](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L374)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:373](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L373)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:372](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L372)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:371](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L371)

___

### HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SPC\_XLM\_MLM\_XNLI15\_1024\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:370](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L370)

___

### HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:380](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L380)

___

### HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:379](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L379)

___

### HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:378](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L378)

___

### HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BART\_LARGE\_CNN\_SAMSUM\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:377](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L377)

___

### HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:384](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L384)

___

### HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:383](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L383)

___

### HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:382](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L382)

___

### HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BERT\_SMALL2BERT\_SMALL\_FINETUNED\_CNN\_DAILY\_MAIL\_SUMMARIZATION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:381](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L381)

___

### HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:388](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L388)

___

### HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:387](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L387)

___

### HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:386](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L386)

___

### HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_ARXIV\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:385](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L385)

___

### HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:392](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L392)

___

### HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:391](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L391)

___

### HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:390](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L390)

___

### HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_BIGBIRD\_PEGASUS\_LARGE\_PUBMED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:389](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L389)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:396](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L396)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:395](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L395)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:394](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L394)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_12\_6\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:393](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L393)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:400](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L400)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:399](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L399)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:398](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L398)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_CNN\_6\_6\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:397](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L397)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:408](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L408)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:407](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L407)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:406](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L406)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_12\_3\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:405](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L405)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:404](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L404)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:403](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L403)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:402](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L402)

___

### HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_SUMMARIZATION\_DISTILBART\_XSUM\_1\_1\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:401](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L401)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:412](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L412)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:411](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L411)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:410](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L410)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:409](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L409)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:416](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L416)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:415](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L415)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:414](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L414)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:413](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L413)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:420](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L420)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:419](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L419)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:418](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L418)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_MULTILINGUAL\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:417](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L417)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:424](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L424)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:423](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L423)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:422](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L422)

___

### HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_BASE\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:421](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L421)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:428](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L428)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:427](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L427)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:426](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L426)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:425](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L425)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:432](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L432)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:431](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L431)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:430](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L430)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_CASED\_WHOLE\_WORD\_MASKING\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:429](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L429)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:436](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L436)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:435](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L435)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:434](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L434)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:433](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L433)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:440](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L440)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:439](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L439)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:438](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L438)

___

### HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_BERT\_LARGE\_UNCASED\_WHOLE\_WORD\_MASKING\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:437](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L437)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:444](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L444)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:443](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L443)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:442](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L442)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:441](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L441)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:448](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L448)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:447](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L447)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:446](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L446)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_MULTILINGUAL\_CASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:445](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L445)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:452](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L452)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:451](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L451)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:450](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L450)

___

### HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILBERT\_BASE\_UNCASED\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:449](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L449)

___

### HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:456](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L456)

___

### HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:455](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L455)

___

### HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:454](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L454)

___

### HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_DISTILROBERTA\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:453](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L453)

___

### HUGGINGFACE\_TC\_MODELS\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_MODELS\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:460](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L460)

___

### HUGGINGFACE\_TC\_MODELS\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_MODELS\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:459](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L459)

___

### HUGGINGFACE\_TC\_MODELS\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_MODELS\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:458](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L458)

___

### HUGGINGFACE\_TC\_MODELS\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_MODELS\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:457](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L457)

___

### HUGGINGFACE\_TC\_ROBERTA\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:464](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L464)

___

### HUGGINGFACE\_TC\_ROBERTA\_BASE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_BASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:463](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L463)

___

### HUGGINGFACE\_TC\_ROBERTA\_BASE\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_BASE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:462](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L462)

___

### HUGGINGFACE\_TC\_ROBERTA\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:461](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L461)

___

### HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:468](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L468)

___

### HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:467](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L467)

___

### HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:466](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L466)

___

### HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_BASE\_OPENAI\_DETECTOR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:465](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L465)

___

### HUGGINGFACE\_TC\_ROBERTA\_LARGE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_LARGE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:472](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L472)

___

### HUGGINGFACE\_TC\_ROBERTA\_LARGE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_LARGE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:471](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L471)

___

### HUGGINGFACE\_TC\_ROBERTA\_LARGE\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_LARGE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:470](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L470)

___

### HUGGINGFACE\_TC\_ROBERTA\_LARGE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_LARGE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:469](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L469)

___

### HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:476](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L476)

___

### HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:475](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L475)

___

### HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:474](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L474)

___

### HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_ROBERTA\_LARGE\_OPENAI\_DETECTOR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:473](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L473)

___

### HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:480](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L480)

___

### HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:479](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L479)

___

### HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:478](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L478)

___

### HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_CLM\_ENDE\_1024\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:477](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L477)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:484](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L484)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:483](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L483)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:482](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L482)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_ENDE\_1024\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:481](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L481)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:488](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L488)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:487](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L487)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:486](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L486)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_ENRO\_1024\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:485](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L485)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:492](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L492)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:491](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L491)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:490](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L490)

___

### HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TC\_XLM\_MLM\_TLM\_XNLI15\_1024\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:489](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L489)

___

### HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:501](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L501)

___

### HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:500](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L500)

___

### HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:499](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L499)

___

### HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:498](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L498)

___

### HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:497](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L497)

___

### HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:496](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L496)

___

### HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:495](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L495)

___

### HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:494](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L494)

___

### HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BART4CSC\_BASE\_CHINESE\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:493](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L493)

___

### HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:505](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L505)

___

### HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:504](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L504)

___

### HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_1\_1\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_1\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:503](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L503)

___

### HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:502](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L502)

___

### HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_BNB\_INT8\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_BNB\_INT8\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:508](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L508)

___

### HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_BNB\_INT8\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_BNB\_INT8\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:507](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L507)

___

### HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_BNB\_INT8\_1\_1\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_BNB\_INT8\_1\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:506](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L506)

___

### HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:511](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L511)

___

### HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_FP16\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_FP16\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:510](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L510)

___

### HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_FP16\_1\_1\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_BIGSCIENCE\_T0PP\_FP16\_1\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:509](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L509)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:526](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L526)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:525](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L525)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:524](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L524)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:523](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L523)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:522](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L522)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:521](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L521)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:520](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L520)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:519](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L519)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:518](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L518)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_4

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:517](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L517)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_5

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_2\_5**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:516](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L516)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:515](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L515)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_3\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_3\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:514](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L514)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_3\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_1\_3\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:513](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L513)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:512](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L512)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:536](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L536)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:535](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L535)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:534](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L534)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:533](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L533)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:532](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L532)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:531](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L531)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:530](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L530)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:529](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L529)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:528](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L528)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_BASE\_SAMSUM\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:527](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L527)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:551](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L551)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:550](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L550)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:549](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L549)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:548](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L548)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:547](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L547)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:546](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L546)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:545](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L545)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:544](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L544)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_4

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:543](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L543)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_5

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_5**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:542](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L542)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_6

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_1\_6**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:541](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L541)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:540](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L540)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:539](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L539)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:538](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L538)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_LARGE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:537](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L537)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:566](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L566)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:565](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L565)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:564](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L564)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:563](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L563)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:562](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L562)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:561](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L561)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:560](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L560)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:559](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L559)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:558](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L558)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_4

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:557](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L557)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_5

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_2\_5**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:556](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L556)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:555](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L555)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_3\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_3\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:554](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L554)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_3\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_1\_3\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:553](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L553)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_SMALL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:552](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L552)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:581](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L581)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:580](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L580)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:579](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L579)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:578](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L578)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:577](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L577)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:576](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L576)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:575](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L575)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:574](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L574)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_4

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:573](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L573)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_5

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_5**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:572](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L572)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_6

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_1\_6**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:571](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L571)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:570](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L570)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:569](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L569)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:568](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L568)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:567](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L567)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:585](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L585)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:584](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L584)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_1\_1\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_1\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:583](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L583)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:582](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L582)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:589](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L589)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:588](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L588)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:587](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L587)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_BNB\_INT8\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:586](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L586)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:592](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L592)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_FP16\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_FP16\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:591](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L591)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_FP16\_1\_1\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_T5\_XXL\_FP16\_1\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:590](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L590)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:596](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L596)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:595](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L595)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_1\_1\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_1\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:594](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L594)

___

### HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_FLAN\_UL2\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:593](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L593)

___

### HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:605](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L605)

___

### HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:604](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L604)

___

### HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:603](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L603)

___

### HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:602](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L602)

___

### HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:601](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L601)

___

### HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:600](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L600)

___

### HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:599](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L599)

___

### HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:598](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L598)

___

### HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_PEGASUS\_PARAPHRASE\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:597](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L597)

___

### HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:615](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L615)

___

### HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:614](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L614)

___

### HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:613](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L613)

___

### HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:612](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L612)

___

### HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:611](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L611)

___

### HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:610](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L610)

___

### HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:609](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L609)

___

### HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:608](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L608)

___

### HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:607](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L607)

___

### HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_QCPG\_SENTENCES\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:606](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L606)

___

### HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:625](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L625)

___

### HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:624](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L624)

___

### HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:623](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L623)

___

### HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:622](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L622)

___

### HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:621](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L621)

___

### HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:620](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L620)

___

### HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:619](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L619)

___

### HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:618](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L618)

___

### HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:617](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L617)

___

### HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXT2TEXT\_T5\_ONE\_LINE\_SUMMARY\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:616](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L616)

___

### HUGGINGFACE\_TEXTEMBEDDING\_ALL\_MINILM\_L6\_V2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTEMBEDDING\_ALL\_MINILM\_L6\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:626](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L626)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_176B\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_176B\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:750](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L750)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_176B\_FP16\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_176B\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:749](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L749)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_176B\_FP16\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_176B\_FP16\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:748](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L748)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:757](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L757)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:756](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L756)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:755](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L755)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:754](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L754)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:753](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L753)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:752](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L752)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_3B\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:751](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L751)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:764](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L764)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:763](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L763)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:762](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L762)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:761](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L761)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:760](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L760)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:759](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L759)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOMZ\_7B1\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:758](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L758)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_176B\_INT8\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_176B\_INT8\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:719](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L719)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_176B\_INT8\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_176B\_INT8\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:718](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L718)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_176B\_INT8\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_176B\_INT8\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:717](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L717)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:726](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L726)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:725](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L725)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:724](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L724)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:723](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L723)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:722](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L722)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:721](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L721)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:720](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L720)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:733](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L733)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:732](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L732)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:731](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L731)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:730](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L730)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:729](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L729)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:728](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L728)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_3B\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:727](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L727)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:740](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L740)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:739](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L739)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:738](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L738)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:737](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L737)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:736](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L736)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:735](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L735)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:734](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L734)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:747](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L747)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:746](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L746)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:745](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L745)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:744](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L744)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:743](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L743)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:742](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L742)

___

### HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_BLOOM\_7B1\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:741](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L741)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:771](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L771)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:770](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L770)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:769](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L769)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:768](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L768)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:767](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L767)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:766](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L766)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:765](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L765)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:778](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L778)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:777](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L777)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:776](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L776)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:775](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L775)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:774](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L774)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:773](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L773)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_2\_XL\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:772](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L772)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:788](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L788)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:787](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L787)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:786](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L786)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:785](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L785)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:784](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L784)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:783](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L783)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:782](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L782)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_4

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_2\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:781](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L781)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:780](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L780)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:779](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L779)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:798](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L798)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:797](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L797)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:796](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L796)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:795](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L795)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:794](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L794)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:793](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L793)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:792](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L792)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_4

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_2\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:791](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L791)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:790](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L790)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_J\_6B\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:789](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L789)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:819](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L819)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:818](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L818)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:817](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L817)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:816](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L816)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:815](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L815)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:814](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L814)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:813](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L813)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:826](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L826)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:825](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L825)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:824](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L824)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:823](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L823)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:822](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L822)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:821](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L821)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_125M\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:820](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L820)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:805](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L805)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:804](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L804)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:803](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L803)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:802](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L802)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:801](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L801)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:800](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L800)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:799](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L799)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:812](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L812)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:811](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L811)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:810](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L810)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:809](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L809)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:808](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L808)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:807](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L807)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_1\_3B\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:806](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L806)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:833](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L833)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:832](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L832)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:831](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L831)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:830](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L830)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:829](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L829)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:828](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L828)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:827](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L827)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:840](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L840)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:839](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L839)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:838](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L838)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:837](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L837)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:836](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L836)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:835](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L835)

___

### HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_GPT\_NEO\_2\_7B\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:834](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L834)

___

### HUGGINGFACE\_TEXTGENERATION1\_LIGHTGPT\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_LIGHTGPT\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:843](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L843)

___

### HUGGINGFACE\_TEXTGENERATION1\_LIGHTGPT\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_LIGHTGPT\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:842](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L842)

___

### HUGGINGFACE\_TEXTGENERATION1\_LIGHTGPT\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_LIGHTGPT\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:841](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L841)

___

### HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:845](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L845)

___

### HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:844](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L844)

___

### HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_INSTRUCT\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_INSTRUCT\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:847](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L847)

___

### HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_INSTRUCT\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_INSTRUCT\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:846](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L846)

___

### HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_STORYWRITER\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_STORYWRITER\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:849](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L849)

___

### HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_STORYWRITER\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_MPT\_7B\_STORYWRITER\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:848](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L848)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:853](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L853)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:852](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L852)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:851](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L851)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_3B\_V1\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:850](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L850)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:857](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L857)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:856](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L856)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:855](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L855)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_BASE\_7B\_V1\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:854](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L854)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:861](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L861)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:860](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L860)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:859](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L859)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_3B\_V1\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:858](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L858)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:865](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L865)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:864](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L864)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:863](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L863)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_CHAT\_7B\_V1\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:862](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L862)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:869](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L869)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:868](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L868)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:867](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L867)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_3B\_V1\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:866](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L866)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:873](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L873)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:872](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L872)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:871](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L871)

___

### HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION1\_REDPAJAMA\_INCITE\_INSTRUCT\_7B\_V1\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:870](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L870)

___

### HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:881](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L881)

___

### HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:880](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L880)

___

### HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:879](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L879)

___

### HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_3\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOXT\_CHAT\_BASE\_20B\_FP16\_3\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:878](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L878)

___

### HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:877](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L877)

___

### HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:876](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L876)

___

### HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:875](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L875)

___

### HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_3\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION2\_GPT\_NEOX\_20B\_FP16\_3\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:874](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L874)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:658](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L658)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:657](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L657)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:656](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L656)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:655](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L655)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B1\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:654](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L654)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:663](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L663)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:662](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L662)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:661](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L661)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:660](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L660)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_1B7\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:659](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L659)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:668](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L668)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:667](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L667)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:666](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L666)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:665](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L665)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOMZ\_560M\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:664](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L664)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:635](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L635)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:634](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L634)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:633](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L633)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:632](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L632)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:631](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L631)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:630](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L630)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:629](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L629)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:628](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L628)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B1\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:627](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L627)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:644](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L644)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:643](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L643)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:642](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L642)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:641](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L641)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:640](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L640)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:639](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L639)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:638](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L638)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:637](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L637)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_1B7\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:636](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L636)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:653](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L653)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:652](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L652)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:651](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L651)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:650](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L650)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:649](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L649)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:648](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L648)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:647](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L647)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:646](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L646)

___

### HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_BLOOM\_560M\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:645](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L645)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:679](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L679)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:678](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L678)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:677](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L677)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:676](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L676)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:675](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L675)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:674](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L674)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:673](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L673)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_4\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_4\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:672](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L672)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_4\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_4\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:671](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L671)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_5\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_1\_5\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:670](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L670)

___

### HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DISTILGPT2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:669](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L669)

___

### HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_12B\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_12B\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:682](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L682)

___

### HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_12B\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_12B\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:681](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L681)

___

### HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_12B\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_12B\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:680](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L680)

___

### HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_3B\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_3B\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:685](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L685)

___

### HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_3B\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_3B\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:684](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L684)

___

### HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_3B\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_3B\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:683](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L683)

___

### HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_7B\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_7B\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:688](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L688)

___

### HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_7B\_BF16\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_7B\_BF16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:687](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L687)

___

### HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_7B\_BF16\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_DOLLY\_V2\_7B\_BF16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:686](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L686)

___

### HUGGINGFACE\_TEXTGENERATION\_FALCON\_40B\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_FALCON\_40B\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:689](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L689)

___

### HUGGINGFACE\_TEXTGENERATION\_FALCON\_40B\_INSTRUCT\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_FALCON\_40B\_INSTRUCT\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:690](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L690)

___

### HUGGINGFACE\_TEXTGENERATION\_FALCON\_7B\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_FALCON\_7B\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:691](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L691)

___

### HUGGINGFACE\_TEXTGENERATION\_FALCON\_7B\_INSTRUCT\_BF16\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_FALCON\_7B\_INSTRUCT\_BF16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:692](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L692)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:703](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L703)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:702](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L702)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:701](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L701)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:700](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L700)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:699](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L699)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_3

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:698](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L698)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:697](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L697)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_4\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_4\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:696](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L696)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_4\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_4\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:695](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L695)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_5\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_1\_5\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:694](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L694)

___

### HUGGINGFACE\_TEXTGENERATION\_GPT2\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_GPT2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:693](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L693)

___

### HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:710](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L710)

___

### HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_0\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:709](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L709)

___

### HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_0\_2

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:708](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L708)

___

### HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:707](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L707)

___

### HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:706](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L706)

___

### HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_2\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:705](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L705)

___

### HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_3\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_MODELS\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:704](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L704)

___

### HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:716](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L716)

___

### HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:715](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L715)

___

### HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_1\_1

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:714](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L714)

___

### HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_2\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:713](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L713)

___

### HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:712](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L712)

___

### HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_3\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TEXTGENERATION\_OPEN\_LLAMA\_3\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:711](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L711)

___

### HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_ES\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_ES\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:884](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L884)

___

### HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_ES\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_ES\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:883](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L883)

___

### HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_ES\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_ES\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:882](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L882)

___

### HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_VI\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_VI\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:887](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L887)

___

### HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_VI\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_VI\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:886](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L886)

___

### HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_VI\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_OPUS\_MT\_EN\_VI\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:885](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L885)

___

### HUGGINGFACE\_TRANSLATION\_T5\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_T5\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:890](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L890)

___

### HUGGINGFACE\_TRANSLATION\_T5\_BASE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_T5\_BASE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:889](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L889)

___

### HUGGINGFACE\_TRANSLATION\_T5\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_T5\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:888](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L888)

___

### HUGGINGFACE\_TRANSLATION\_T5\_LARGE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_T5\_LARGE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:893](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L893)

___

### HUGGINGFACE\_TRANSLATION\_T5\_LARGE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_T5\_LARGE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:892](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L892)

___

### HUGGINGFACE\_TRANSLATION\_T5\_LARGE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_T5\_LARGE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:891](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L891)

___

### HUGGINGFACE\_TRANSLATION\_T5\_SMALL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_T5\_SMALL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:896](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L896)

___

### HUGGINGFACE\_TRANSLATION\_T5\_SMALL\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_T5\_SMALL\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:895](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L895)

___

### HUGGINGFACE\_TRANSLATION\_T5\_SMALL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TRANSLATION\_T5\_SMALL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:894](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L894)

___

### HUGGINGFACE\_TXT2IMG\_22H\_VINTEDOIS\_DIFFUSION\_V0\_1\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_22H\_VINTEDOIS\_DIFFUSION\_V0\_1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:899](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L899)

___

### HUGGINGFACE\_TXT2IMG\_22H\_VINTEDOIS\_DIFFUSION\_V0\_1\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_22H\_VINTEDOIS\_DIFFUSION\_V0\_1\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:898](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L898)

___

### HUGGINGFACE\_TXT2IMG\_22H\_VINTEDOIS\_DIFFUSION\_V0\_1\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_22H\_VINTEDOIS\_DIFFUSION\_V0\_1\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:897](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L897)

___

### HUGGINGFACE\_TXT2IMG\_AKIKAGURA\_MKGEN\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_AKIKAGURA\_MKGEN\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:902](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L902)

___

### HUGGINGFACE\_TXT2IMG\_AKIKAGURA\_MKGEN\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_AKIKAGURA\_MKGEN\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:901](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L901)

___

### HUGGINGFACE\_TXT2IMG\_AKIKAGURA\_MKGEN\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_AKIKAGURA\_MKGEN\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:900](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L900)

___

### HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES9000\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES9000\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:908](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L908)

___

### HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES9000\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES9000\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:907](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L907)

___

### HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES9000\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES9000\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:906](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L906)

___

### HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES\_FASTDB\_4800\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES\_FASTDB\_4800\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:905](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L905)

___

### HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES\_FASTDB\_4800\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES\_FASTDB\_4800\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:904](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L904)

___

### HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES\_FASTDB\_4800\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ALXDFY\_NOGGLES\_FASTDB\_4800\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:903](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L903)

___

### HUGGINGFACE\_TXT2IMG\_ANDITE\_ANYTHING\_V4\_0\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ANDITE\_ANYTHING\_V4\_0\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:911](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L911)

___

### HUGGINGFACE\_TXT2IMG\_ANDITE\_ANYTHING\_V4\_0\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ANDITE\_ANYTHING\_V4\_0\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:910](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L910)

___

### HUGGINGFACE\_TXT2IMG\_ANDITE\_ANYTHING\_V4\_0\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ANDITE\_ANYTHING\_V4\_0\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:909](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L909)

___

### HUGGINGFACE\_TXT2IMG\_ASTRALITEHEART\_PONY\_DIFFUSION\_V2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ASTRALITEHEART\_PONY\_DIFFUSION\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:914](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L914)

___

### HUGGINGFACE\_TXT2IMG\_ASTRALITEHEART\_PONY\_DIFFUSION\_V2\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ASTRALITEHEART\_PONY\_DIFFUSION\_V2\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:913](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L913)

___

### HUGGINGFACE\_TXT2IMG\_ASTRALITEHEART\_PONY\_DIFFUSION\_V2\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ASTRALITEHEART\_PONY\_DIFFUSION\_V2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:912](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L912)

___

### HUGGINGFACE\_TXT2IMG\_AVRIK\_ABSTRACT\_ANIM\_SPRITESHEETS\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_AVRIK\_ABSTRACT\_ANIM\_SPRITESHEETS\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:917](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L917)

___

### HUGGINGFACE\_TXT2IMG\_AVRIK\_ABSTRACT\_ANIM\_SPRITESHEETS\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_AVRIK\_ABSTRACT\_ANIM\_SPRITESHEETS\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:916](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L916)

___

### HUGGINGFACE\_TXT2IMG\_AVRIK\_ABSTRACT\_ANIM\_SPRITESHEETS\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_AVRIK\_ABSTRACT\_ANIM\_SPRITESHEETS\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:915](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L915)

___

### HUGGINGFACE\_TXT2IMG\_AYBEECEEDEE\_KNOLLINGCASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_AYBEECEEDEE\_KNOLLINGCASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:920](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L920)

___

### HUGGINGFACE\_TXT2IMG\_AYBEECEEDEE\_KNOLLINGCASE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_AYBEECEEDEE\_KNOLLINGCASE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:919](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L919)

___

### HUGGINGFACE\_TXT2IMG\_AYBEECEEDEE\_KNOLLINGCASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_AYBEECEEDEE\_KNOLLINGCASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:918](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L918)

___

### HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_KOREAN\_STABLE\_DIFFUSION\_V1\_5\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_KOREAN\_STABLE\_DIFFUSION\_V1\_5\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:926](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L926)

___

### HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_KOREAN\_STABLE\_DIFFUSION\_V1\_5\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_KOREAN\_STABLE\_DIFFUSION\_V1\_5\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:925](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L925)

___

### HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_KOREAN\_STABLE\_DIFFUSION\_V1\_5\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_KOREAN\_STABLE\_DIFFUSION\_V1\_5\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:924](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L924)

___

### HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_K\_ANYTHING\_V3\_0\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_K\_ANYTHING\_V3\_0\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:923](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L923)

___

### HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_K\_ANYTHING\_V3\_0\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_K\_ANYTHING\_V3\_0\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:922](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L922)

___

### HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_K\_ANYTHING\_V3\_0\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_BINGSU\_MY\_K\_ANYTHING\_V3\_0\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:921](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L921)

___

### HUGGINGFACE\_TXT2IMG\_BUNTOPSIH\_NOVGORANSTEFANOVSKI\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_BUNTOPSIH\_NOVGORANSTEFANOVSKI\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:929](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L929)

___

### HUGGINGFACE\_TXT2IMG\_BUNTOPSIH\_NOVGORANSTEFANOVSKI\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_BUNTOPSIH\_NOVGORANSTEFANOVSKI\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:928](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L928)

___

### HUGGINGFACE\_TXT2IMG\_BUNTOPSIH\_NOVGORANSTEFANOVSKI\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_BUNTOPSIH\_NOVGORANSTEFANOVSKI\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:927](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L927)

___

### HUGGINGFACE\_TXT2IMG\_CLAUDFUEN\_PHOTOREALISTIC\_FUEN\_V1\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_CLAUDFUEN\_PHOTOREALISTIC\_FUEN\_V1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:932](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L932)

___

### HUGGINGFACE\_TXT2IMG\_CLAUDFUEN\_PHOTOREALISTIC\_FUEN\_V1\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_CLAUDFUEN\_PHOTOREALISTIC\_FUEN\_V1\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:931](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L931)

___

### HUGGINGFACE\_TXT2IMG\_CLAUDFUEN\_PHOTOREALISTIC\_FUEN\_V1\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_CLAUDFUEN\_PHOTOREALISTIC\_FUEN\_V1\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:930](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L930)

___

### HUGGINGFACE\_TXT2IMG\_CODER119\_VECTORARTZ\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_CODER119\_VECTORARTZ\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:935](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L935)

___

### HUGGINGFACE\_TXT2IMG\_CODER119\_VECTORARTZ\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_CODER119\_VECTORARTZ\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:934](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L934)

___

### HUGGINGFACE\_TXT2IMG\_CODER119\_VECTORARTZ\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_CODER119\_VECTORARTZ\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:933](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L933)

___

### HUGGINGFACE\_TXT2IMG\_CONFLICTX\_COMPLEX\_LINEART\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_CONFLICTX\_COMPLEX\_LINEART\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:938](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L938)

___

### HUGGINGFACE\_TXT2IMG\_CONFLICTX\_COMPLEX\_LINEART\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_CONFLICTX\_COMPLEX\_LINEART\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:937](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L937)

___

### HUGGINGFACE\_TXT2IMG\_CONFLICTX\_COMPLEX\_LINEART\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_CONFLICTX\_COMPLEX\_LINEART\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:936](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L936)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_CATS\_MUSICAL\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_CATS\_MUSICAL\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:941](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L941)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_CATS\_MUSICAL\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_CATS\_MUSICAL\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:940](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L940)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_CATS\_MUSICAL\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_CATS\_MUSICAL\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:939](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L939)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_JWST\_DEEP\_SPACE\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_JWST\_DEEP\_SPACE\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:944](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L944)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_JWST\_DEEP\_SPACE\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_JWST\_DEEP\_SPACE\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:943](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L943)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_JWST\_DEEP\_SPACE\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_JWST\_DEEP\_SPACE\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:942](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L942)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_TRON\_LEGACY\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_TRON\_LEGACY\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:947](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L947)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_TRON\_LEGACY\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_TRON\_LEGACY\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:946](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L946)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_TRON\_LEGACY\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_TRON\_LEGACY\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:945](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L945)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_VAN\_GOGH\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_VAN\_GOGH\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:950](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L950)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_VAN\_GOGH\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_VAN\_GOGH\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:949](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L949)

___

### HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_VAN\_GOGH\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DALLINMACKAY\_VAN\_GOGH\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:948](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L948)

___

### HUGGINGFACE\_TXT2IMG\_DGSPITZER\_CYBERPUNK\_ANIME\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DGSPITZER\_CYBERPUNK\_ANIME\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:953](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L953)

___

### HUGGINGFACE\_TXT2IMG\_DGSPITZER\_CYBERPUNK\_ANIME\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DGSPITZER\_CYBERPUNK\_ANIME\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:952](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L952)

___

### HUGGINGFACE\_TXT2IMG\_DGSPITZER\_CYBERPUNK\_ANIME\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DGSPITZER\_CYBERPUNK\_ANIME\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:951](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L951)

___

### HUGGINGFACE\_TXT2IMG\_DREAMLIKE\_ART\_DREAMLIKE\_DIFFUSION\_1\_0\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DREAMLIKE\_ART\_DREAMLIKE\_DIFFUSION\_1\_0\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:956](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L956)

___

### HUGGINGFACE\_TXT2IMG\_DREAMLIKE\_ART\_DREAMLIKE\_DIFFUSION\_1\_0\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DREAMLIKE\_ART\_DREAMLIKE\_DIFFUSION\_1\_0\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:955](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L955)

___

### HUGGINGFACE\_TXT2IMG\_DREAMLIKE\_ART\_DREAMLIKE\_DIFFUSION\_1\_0\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_DREAMLIKE\_ART\_DREAMLIKE\_DIFFUSION\_1\_0\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:954](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L954)

___

### HUGGINGFACE\_TXT2IMG\_EIMISS\_EIMISANIMEDIFFUSION\_1\_0V\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_EIMISS\_EIMISANIMEDIFFUSION\_1\_0V\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:959](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L959)

___

### HUGGINGFACE\_TXT2IMG\_EIMISS\_EIMISANIMEDIFFUSION\_1\_0V\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_EIMISS\_EIMISANIMEDIFFUSION\_1\_0V\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:958](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L958)

___

### HUGGINGFACE\_TXT2IMG\_EIMISS\_EIMISANIMEDIFFUSION\_1\_0V\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_EIMISS\_EIMISANIMEDIFFUSION\_1\_0V\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:957](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L957)

___

### HUGGINGFACE\_TXT2IMG\_ENVVI\_INKPUNK\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ENVVI\_INKPUNK\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:962](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L962)

___

### HUGGINGFACE\_TXT2IMG\_ENVVI\_INKPUNK\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ENVVI\_INKPUNK\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:961](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L961)

___

### HUGGINGFACE\_TXT2IMG\_ENVVI\_INKPUNK\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_ENVVI\_INKPUNK\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:960](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L960)

___

### HUGGINGFACE\_TXT2IMG\_EVEL\_YOSHIN\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_EVEL\_YOSHIN\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:965](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L965)

___

### HUGGINGFACE\_TXT2IMG\_EVEL\_YOSHIN\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_EVEL\_YOSHIN\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:964](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L964)

___

### HUGGINGFACE\_TXT2IMG\_EVEL\_YOSHIN\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_EVEL\_YOSHIN\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:963](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L963)

___

### HUGGINGFACE\_TXT2IMG\_EXTRAPHY\_MUSTAFA\_KEMAL\_ATATURK\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_EXTRAPHY\_MUSTAFA\_KEMAL\_ATATURK\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:968](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L968)

___

### HUGGINGFACE\_TXT2IMG\_EXTRAPHY\_MUSTAFA\_KEMAL\_ATATURK\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_EXTRAPHY\_MUSTAFA\_KEMAL\_ATATURK\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:967](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L967)

___

### HUGGINGFACE\_TXT2IMG\_EXTRAPHY\_MUSTAFA\_KEMAL\_ATATURK\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_EXTRAPHY\_MUSTAFA\_KEMAL\_ATATURK\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:966](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L966)

___

### HUGGINGFACE\_TXT2IMG\_FFFILONI\_MR\_MEN\_AND\_LITTLE\_MISSES\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FFFILONI\_MR\_MEN\_AND\_LITTLE\_MISSES\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:971](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L971)

___

### HUGGINGFACE\_TXT2IMG\_FFFILONI\_MR\_MEN\_AND\_LITTLE\_MISSES\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FFFILONI\_MR\_MEN\_AND\_LITTLE\_MISSES\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:970](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L970)

___

### HUGGINGFACE\_TXT2IMG\_FFFILONI\_MR\_MEN\_AND\_LITTLE\_MISSES\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FFFILONI\_MR\_MEN\_AND\_LITTLE\_MISSES\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:969](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L969)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_ELRISITAS\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_ELRISITAS\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:974](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L974)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_ELRISITAS\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_ELRISITAS\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:973](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L973)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_ELRISITAS\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_ELRISITAS\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:972](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L972)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_BALLOONART\_MODEL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_BALLOONART\_MODEL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:977](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L977)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_BALLOONART\_MODEL\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_BALLOONART\_MODEL\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:976](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L976)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_BALLOONART\_MODEL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_BALLOONART\_MODEL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:975](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L975)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_MICROSCOPIC\_MODEL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_MICROSCOPIC\_MODEL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:980](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L980)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_MICROSCOPIC\_MODEL\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_MICROSCOPIC\_MODEL\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:979](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L979)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_MICROSCOPIC\_MODEL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_MICROSCOPIC\_MODEL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:978](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L978)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_PAPERCUT\_MODEL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_PAPERCUT\_MODEL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:983](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L983)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_PAPERCUT\_MODEL\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_PAPERCUT\_MODEL\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:982](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L982)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_PAPERCUT\_MODEL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_PAPERCUT\_MODEL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:981](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L981)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_VOXELART\_MODEL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_VOXELART\_MODEL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:986](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L986)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_VOXELART\_MODEL\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_VOXELART\_MODEL\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:985](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L985)

___

### HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_VOXELART\_MODEL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_FICTIVERSE\_STABLE\_DIFFUSION\_VOXELART\_MODEL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:984](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L984)

___

### HUGGINGFACE\_TXT2IMG\_HAOR\_EVT\_V3\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_HAOR\_EVT\_V3\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:989](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L989)

___

### HUGGINGFACE\_TXT2IMG\_HAOR\_EVT\_V3\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_HAOR\_EVT\_V3\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:988](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L988)

___

### HUGGINGFACE\_TXT2IMG\_HAOR\_EVT\_V3\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_HAOR\_EVT\_V3\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:987](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L987)

___

### HUGGINGFACE\_TXT2IMG\_HASSANBLEND\_HASSANBLEND1\_4\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_HASSANBLEND\_HASSANBLEND1\_4\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:992](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L992)

___

### HUGGINGFACE\_TXT2IMG\_HASSANBLEND\_HASSANBLEND1\_4\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_HASSANBLEND\_HASSANBLEND1\_4\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:991](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L991)

___

### HUGGINGFACE\_TXT2IMG\_HASSANBLEND\_HASSANBLEND1\_4\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_HASSANBLEND\_HASSANBLEND1\_4\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:990](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L990)

___

### HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_EN\_V0\_1\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_EN\_V0\_1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:995](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L995)

___

### HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_EN\_V0\_1\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_EN\_V0\_1\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:994](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L994)

___

### HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_EN\_V0\_1\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_EN\_V0\_1\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:993](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L993)

___

### HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_V0\_1\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_V0\_1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:998](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L998)

___

### HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_V0\_1\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_V0\_1\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:997](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L997)

___

### HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_V0\_1\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_IDEA\_CCNL\_TAIYI\_STABLE\_DIFFUSION\_1B\_CHINESE\_V0\_1\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:996](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L996)

___

### HUGGINGFACE\_TXT2IMG\_IFANSNEK\_JOHNDIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_IFANSNEK\_JOHNDIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1001](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1001)

___

### HUGGINGFACE\_TXT2IMG\_IFANSNEK\_JOHNDIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_IFANSNEK\_JOHNDIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1000](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1000)

___

### HUGGINGFACE\_TXT2IMG\_IFANSNEK\_JOHNDIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_IFANSNEK\_JOHNDIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:999](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L999)

___

### HUGGINGFACE\_TXT2IMG\_JERSONM89\_AVATAR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_JERSONM89\_AVATAR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1004](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1004)

___

### HUGGINGFACE\_TXT2IMG\_JERSONM89\_AVATAR\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_JERSONM89\_AVATAR\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1003](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1003)

___

### HUGGINGFACE\_TXT2IMG\_JERSONM89\_AVATAR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_JERSONM89\_AVATAR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1002](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1002)

___

### HUGGINGFACE\_TXT2IMG\_JVKAPE\_ICONSMI\_APPICONSMODELFORSD\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_JVKAPE\_ICONSMI\_APPICONSMODELFORSD\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1007](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1007)

___

### HUGGINGFACE\_TXT2IMG\_JVKAPE\_ICONSMI\_APPICONSMODELFORSD\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_JVKAPE\_ICONSMI\_APPICONSMODELFORSD\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1006](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1006)

___

### HUGGINGFACE\_TXT2IMG\_JVKAPE\_ICONSMI\_APPICONSMODELFORSD\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_JVKAPE\_ICONSMI\_APPICONSMODELFORSD\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1005](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1005)

___

### HUGGINGFACE\_TXT2IMG\_KATAKANA\_2D\_MIX\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_KATAKANA\_2D\_MIX\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1010](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1010)

___

### HUGGINGFACE\_TXT2IMG\_KATAKANA\_2D\_MIX\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_KATAKANA\_2D\_MIX\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1009](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1009)

___

### HUGGINGFACE\_TXT2IMG\_KATAKANA\_2D\_MIX\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_KATAKANA\_2D\_MIX\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1008](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1008)

___

### HUGGINGFACE\_TXT2IMG\_LACAMBRE\_VULVINE\_LOOK\_V02\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_LACAMBRE\_VULVINE\_LOOK\_V02\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1013](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1013)

___

### HUGGINGFACE\_TXT2IMG\_LACAMBRE\_VULVINE\_LOOK\_V02\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_LACAMBRE\_VULVINE\_LOOK\_V02\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1012](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1012)

___

### HUGGINGFACE\_TXT2IMG\_LACAMBRE\_VULVINE\_LOOK\_V02\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_LACAMBRE\_VULVINE\_LOOK\_V02\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1011](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1011)

___

### HUGGINGFACE\_TXT2IMG\_LANGBOAT\_GUOHUA\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_LANGBOAT\_GUOHUA\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1016](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1016)

___

### HUGGINGFACE\_TXT2IMG\_LANGBOAT\_GUOHUA\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_LANGBOAT\_GUOHUA\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1015](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1015)

___

### HUGGINGFACE\_TXT2IMG\_LANGBOAT\_GUOHUA\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_LANGBOAT\_GUOHUA\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1014](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1014)

___

### HUGGINGFACE\_TXT2IMG\_LINAQRUF\_ANYTHING\_V3\_0\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_LINAQRUF\_ANYTHING\_V3\_0\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1019](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1019)

___

### HUGGINGFACE\_TXT2IMG\_LINAQRUF\_ANYTHING\_V3\_0\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_LINAQRUF\_ANYTHING\_V3\_0\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1018](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1018)

___

### HUGGINGFACE\_TXT2IMG\_LINAQRUF\_ANYTHING\_V3\_0\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_LINAQRUF\_ANYTHING\_V3\_0\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1017](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1017)

___

### HUGGINGFACE\_TXT2IMG\_MIKESMODELS\_WALTZ\_WITH\_BASHIR\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MIKESMODELS\_WALTZ\_WITH\_BASHIR\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1022](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1022)

___

### HUGGINGFACE\_TXT2IMG\_MIKESMODELS\_WALTZ\_WITH\_BASHIR\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MIKESMODELS\_WALTZ\_WITH\_BASHIR\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1021](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1021)

___

### HUGGINGFACE\_TXT2IMG\_MIKESMODELS\_WALTZ\_WITH\_BASHIR\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MIKESMODELS\_WALTZ\_WITH\_BASHIR\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1020](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1020)

___

### HUGGINGFACE\_TXT2IMG\_MITCHTECH\_KLINGON\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MITCHTECH\_KLINGON\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1025](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1025)

___

### HUGGINGFACE\_TXT2IMG\_MITCHTECH\_KLINGON\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MITCHTECH\_KLINGON\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1024](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1024)

___

### HUGGINGFACE\_TXT2IMG\_MITCHTECH\_KLINGON\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MITCHTECH\_KLINGON\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1023](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1023)

___

### HUGGINGFACE\_TXT2IMG\_MITCHTECH\_VULCAN\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MITCHTECH\_VULCAN\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1028](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1028)

___

### HUGGINGFACE\_TXT2IMG\_MITCHTECH\_VULCAN\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MITCHTECH\_VULCAN\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1027](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1027)

___

### HUGGINGFACE\_TXT2IMG\_MITCHTECH\_VULCAN\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MITCHTECH\_VULCAN\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1026](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1026)

___

### HUGGINGFACE\_TXT2IMG\_MITSUA\_MITSUA\_DIFFUSION\_CC0\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MITSUA\_MITSUA\_DIFFUSION\_CC0\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1031](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1031)

___

### HUGGINGFACE\_TXT2IMG\_MITSUA\_MITSUA\_DIFFUSION\_CC0\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MITSUA\_MITSUA\_DIFFUSION\_CC0\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1030](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1030)

___

### HUGGINGFACE\_TXT2IMG\_MITSUA\_MITSUA\_DIFFUSION\_CC0\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_MITSUA\_MITSUA\_DIFFUSION\_CC0\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1029](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1029)

___

### HUGGINGFACE\_TXT2IMG\_NACLBIT\_TRINART\_STABLE\_DIFFUSION\_V2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NACLBIT\_TRINART\_STABLE\_DIFFUSION\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1034](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1034)

___

### HUGGINGFACE\_TXT2IMG\_NACLBIT\_TRINART\_STABLE\_DIFFUSION\_V2\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NACLBIT\_TRINART\_STABLE\_DIFFUSION\_V2\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1033](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1033)

___

### HUGGINGFACE\_TXT2IMG\_NACLBIT\_TRINART\_STABLE\_DIFFUSION\_V2\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NACLBIT\_TRINART\_STABLE\_DIFFUSION\_V2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1032](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1032)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCANE\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCANE\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1037](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1037)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCANE\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCANE\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1036](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1036)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCANE\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCANE\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1035](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1035)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCHER\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCHER\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1040](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1040)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCHER\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCHER\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1039](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1039)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCHER\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ARCHER\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1038](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1038)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_CLASSIC\_ANIM\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_CLASSIC\_ANIM\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1043](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1043)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_CLASSIC\_ANIM\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_CLASSIC\_ANIM\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1042](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1042)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_CLASSIC\_ANIM\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_CLASSIC\_ANIM\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1041](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1041)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ELDEN\_RING\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ELDEN\_RING\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1046](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1046)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ELDEN\_RING\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ELDEN\_RING\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1045](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1045)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ELDEN\_RING\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_ELDEN\_RING\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1044](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1044)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_FUTURE\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_FUTURE\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1049](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1049)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_FUTURE\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_FUTURE\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1048](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1048)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_FUTURE\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_FUTURE\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1047](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1047)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_GHIBLI\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_GHIBLI\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1052](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1052)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_GHIBLI\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_GHIBLI\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1051](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1051)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_GHIBLI\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_GHIBLI\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1050](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1050)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_MO\_DI\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_MO\_DI\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1055](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1055)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_MO\_DI\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_MO\_DI\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1054](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1054)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_MO\_DI\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_MO\_DI\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1053](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1053)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_NITRO\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_NITRO\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1058](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1058)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_NITRO\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_NITRO\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1057](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1057)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_NITRO\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_NITRO\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1056](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1056)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_REDSHIFT\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_REDSHIFT\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1061](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1061)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_REDSHIFT\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_REDSHIFT\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1060](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1060)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_REDSHIFT\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_REDSHIFT\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1059](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1059)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_SPIDER\_VERSE\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_SPIDER\_VERSE\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1064](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1064)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_SPIDER\_VERSE\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_SPIDER\_VERSE\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1063](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1063)

___

### HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_SPIDER\_VERSE\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NITROSOCKE\_SPIDER\_VERSE\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1062](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1062)

___

### HUGGINGFACE\_TXT2IMG\_NOUSR\_ROBO\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NOUSR\_ROBO\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1067](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1067)

___

### HUGGINGFACE\_TXT2IMG\_NOUSR\_ROBO\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NOUSR\_ROBO\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1066](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1066)

___

### HUGGINGFACE\_TXT2IMG\_NOUSR\_ROBO\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_NOUSR\_ROBO\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1065](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1065)

___

### HUGGINGFACE\_TXT2IMG\_OGKALU\_COMIC\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_OGKALU\_COMIC\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1070](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1070)

___

### HUGGINGFACE\_TXT2IMG\_OGKALU\_COMIC\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_OGKALU\_COMIC\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1069](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1069)

___

### HUGGINGFACE\_TXT2IMG\_OGKALU\_COMIC\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_OGKALU\_COMIC\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1068](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1068)

___

### HUGGINGFACE\_TXT2IMG\_OPENJOURNEY\_OPENJOURNEY\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_OPENJOURNEY\_OPENJOURNEY\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1073](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1073)

___

### HUGGINGFACE\_TXT2IMG\_OPENJOURNEY\_OPENJOURNEY\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_OPENJOURNEY\_OPENJOURNEY\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1072](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1072)

___

### HUGGINGFACE\_TXT2IMG\_OPENJOURNEY\_OPENJOURNEY\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_OPENJOURNEY\_OPENJOURNEY\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1071](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1071)

___

### HUGGINGFACE\_TXT2IMG\_PIESPOSITO\_OPENPOTIONBOTTLE\_V2\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PIESPOSITO\_OPENPOTIONBOTTLE\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1076](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1076)

___

### HUGGINGFACE\_TXT2IMG\_PIESPOSITO\_OPENPOTIONBOTTLE\_V2\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PIESPOSITO\_OPENPOTIONBOTTLE\_V2\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1075](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1075)

___

### HUGGINGFACE\_TXT2IMG\_PIESPOSITO\_OPENPOTIONBOTTLE\_V2\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PIESPOSITO\_OPENPOTIONBOTTLE\_V2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1074](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1074)

___

### HUGGINGFACE\_TXT2IMG\_PLASMO\_VOXEL\_ISH\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PLASMO\_VOXEL\_ISH\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1079](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1079)

___

### HUGGINGFACE\_TXT2IMG\_PLASMO\_VOXEL\_ISH\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PLASMO\_VOXEL\_ISH\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1078](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1078)

___

### HUGGINGFACE\_TXT2IMG\_PLASMO\_VOXEL\_ISH\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PLASMO\_VOXEL\_ISH\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1077](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1077)

___

### HUGGINGFACE\_TXT2IMG\_PLASMO\_WOOLITIZE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PLASMO\_WOOLITIZE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1082](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1082)

___

### HUGGINGFACE\_TXT2IMG\_PLASMO\_WOOLITIZE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PLASMO\_WOOLITIZE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1081](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1081)

___

### HUGGINGFACE\_TXT2IMG\_PLASMO\_WOOLITIZE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PLASMO\_WOOLITIZE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1080](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1080)

___

### HUGGINGFACE\_TXT2IMG\_PROGAMERGOV\_MIN\_ILLUST\_BACKGROUND\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PROGAMERGOV\_MIN\_ILLUST\_BACKGROUND\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1085](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1085)

___

### HUGGINGFACE\_TXT2IMG\_PROGAMERGOV\_MIN\_ILLUST\_BACKGROUND\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PROGAMERGOV\_MIN\_ILLUST\_BACKGROUND\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1084](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1084)

___

### HUGGINGFACE\_TXT2IMG\_PROGAMERGOV\_MIN\_ILLUST\_BACKGROUND\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PROGAMERGOV\_MIN\_ILLUST\_BACKGROUND\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1083](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1083)

___

### HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_LINKEDIN\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_LINKEDIN\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1088](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1088)

___

### HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_LINKEDIN\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_LINKEDIN\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1087](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1087)

___

### HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_LINKEDIN\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_LINKEDIN\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1086](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1086)

___

### HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_OPENJOURNEY\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_OPENJOURNEY\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1091](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1091)

___

### HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_OPENJOURNEY\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_OPENJOURNEY\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1090](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1090)

___

### HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_OPENJOURNEY\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_PROMPTHERO\_OPENJOURNEY\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1089](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1089)

___

### HUGGINGFACE\_TXT2IMG\_QILEX\_MAGIC\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_QILEX\_MAGIC\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1094](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1094)

___

### HUGGINGFACE\_TXT2IMG\_QILEX\_MAGIC\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_QILEX\_MAGIC\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1093](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1093)

___

### HUGGINGFACE\_TXT2IMG\_QILEX\_MAGIC\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_QILEX\_MAGIC\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1092](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1092)

___

### HUGGINGFACE\_TXT2IMG\_RABIDGREMLIN\_SD\_DB\_EPIC\_SPACE\_MACHINE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_RABIDGREMLIN\_SD\_DB\_EPIC\_SPACE\_MACHINE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1097](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1097)

___

### HUGGINGFACE\_TXT2IMG\_RABIDGREMLIN\_SD\_DB\_EPIC\_SPACE\_MACHINE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_RABIDGREMLIN\_SD\_DB\_EPIC\_SPACE\_MACHINE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1096](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1096)

___

### HUGGINGFACE\_TXT2IMG\_RABIDGREMLIN\_SD\_DB\_EPIC\_SPACE\_MACHINE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_RABIDGREMLIN\_SD\_DB\_EPIC\_SPACE\_MACHINE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1095](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1095)

___

### HUGGINGFACE\_TXT2IMG\_RAYHELL\_POPUPBOOK\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_RAYHELL\_POPUPBOOK\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1100](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1100)

___

### HUGGINGFACE\_TXT2IMG\_RAYHELL\_POPUPBOOK\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_RAYHELL\_POPUPBOOK\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1099](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1099)

___

### HUGGINGFACE\_TXT2IMG\_RAYHELL\_POPUPBOOK\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_RAYHELL\_POPUPBOOK\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1098](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1098)

___

### HUGGINGFACE\_TXT2IMG\_RUNWAYML\_STABLE\_DIFFUSION\_V1\_5\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_RUNWAYML\_STABLE\_DIFFUSION\_V1\_5\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1103](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1103)

___

### HUGGINGFACE\_TXT2IMG\_RUNWAYML\_STABLE\_DIFFUSION\_V1\_5\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_RUNWAYML\_STABLE\_DIFFUSION\_V1\_5\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1102](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1102)

___

### HUGGINGFACE\_TXT2IMG\_RUNWAYML\_STABLE\_DIFFUSION\_V1\_5\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_RUNWAYML\_STABLE\_DIFFUSION\_V1\_5\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1101](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1101)

___

### HUGGINGFACE\_TXT2IMG\_S3NH\_BEKSINSKI\_STYLE\_STABLE\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_S3NH\_BEKSINSKI\_STYLE\_STABLE\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1106](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1106)

___

### HUGGINGFACE\_TXT2IMG\_S3NH\_BEKSINSKI\_STYLE\_STABLE\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_S3NH\_BEKSINSKI\_STYLE\_STABLE\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1105](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1105)

___

### HUGGINGFACE\_TXT2IMG\_S3NH\_BEKSINSKI\_STYLE\_STABLE\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_S3NH\_BEKSINSKI\_STYLE\_STABLE\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1104](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1104)

___

### HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_ORIGINAL\_CHARACTER\_CYCLPS\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_ORIGINAL\_CHARACTER\_CYCLPS\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1109](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1109)

___

### HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_ORIGINAL\_CHARACTER\_CYCLPS\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_ORIGINAL\_CHARACTER\_CYCLPS\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1108](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1108)

___

### HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_ORIGINAL\_CHARACTER\_CYCLPS\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_ORIGINAL\_CHARACTER\_CYCLPS\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1107](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1107)

___

### HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_PERSONA\_5\_SHIGENORI\_STYLE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_PERSONA\_5\_SHIGENORI\_STYLE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1112](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1112)

___

### HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_PERSONA\_5\_SHIGENORI\_STYLE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_PERSONA\_5\_SHIGENORI\_STYLE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1111](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1111)

___

### HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_PERSONA\_5\_SHIGENORI\_STYLE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_PERSONA\_5\_SHIGENORI\_STYLE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1110](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1110)

___

### HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_SERAPHM\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_SERAPHM\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1115](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1115)

___

### HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_SERAPHM\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_SERAPHM\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1114](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1114)

___

### HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_SERAPHM\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SD\_DREAMBOOTH\_LIBRARY\_SERAPHM\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1113](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1113)

___

### HUGGINGFACE\_TXT2IMG\_SHIRAYU\_SD\_TOHOKU\_V1\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SHIRAYU\_SD\_TOHOKU\_V1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1118](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1118)

___

### HUGGINGFACE\_TXT2IMG\_SHIRAYU\_SD\_TOHOKU\_V1\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SHIRAYU\_SD\_TOHOKU\_V1\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1117](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1117)

___

### HUGGINGFACE\_TXT2IMG\_SHIRAYU\_SD\_TOHOKU\_V1\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_SHIRAYU\_SD\_TOHOKU\_V1\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1116](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1116)

___

### HUGGINGFACE\_TXT2IMG\_THELASTBEN\_HRRZG\_STYLE\_768PX\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_THELASTBEN\_HRRZG\_STYLE\_768PX\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1121](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1121)

___

### HUGGINGFACE\_TXT2IMG\_THELASTBEN\_HRRZG\_STYLE\_768PX\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_THELASTBEN\_HRRZG\_STYLE\_768PX\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1120](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1120)

___

### HUGGINGFACE\_TXT2IMG\_THELASTBEN\_HRRZG\_STYLE\_768PX\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_THELASTBEN\_HRRZG\_STYLE\_768PX\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1119](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1119)

___

### HUGGINGFACE\_TXT2IMG\_TIMOTHEPEARCE\_GINA\_THE\_CAT\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TIMOTHEPEARCE\_GINA\_THE\_CAT\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1124](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1124)

___

### HUGGINGFACE\_TXT2IMG\_TIMOTHEPEARCE\_GINA\_THE\_CAT\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TIMOTHEPEARCE\_GINA\_THE\_CAT\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1123](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1123)

___

### HUGGINGFACE\_TXT2IMG\_TIMOTHEPEARCE\_GINA\_THE\_CAT\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TIMOTHEPEARCE\_GINA\_THE\_CAT\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1122](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1122)

___

### HUGGINGFACE\_TXT2IMG\_TRYSTAR\_CLONEDIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TRYSTAR\_CLONEDIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1127](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1127)

___

### HUGGINGFACE\_TXT2IMG\_TRYSTAR\_CLONEDIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TRYSTAR\_CLONEDIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1126](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1126)

___

### HUGGINGFACE\_TXT2IMG\_TRYSTAR\_CLONEDIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TRYSTAR\_CLONEDIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1125](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1125)

___

### HUGGINGFACE\_TXT2IMG\_TUWONGA\_DBLUTH\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TUWONGA\_DBLUTH\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1130](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1130)

___

### HUGGINGFACE\_TXT2IMG\_TUWONGA\_DBLUTH\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TUWONGA\_DBLUTH\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1129](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1129)

___

### HUGGINGFACE\_TXT2IMG\_TUWONGA\_DBLUTH\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TUWONGA\_DBLUTH\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1128](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1128)

___

### HUGGINGFACE\_TXT2IMG\_TUWONGA\_ROTOSCOPEE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TUWONGA\_ROTOSCOPEE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1133](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1133)

___

### HUGGINGFACE\_TXT2IMG\_TUWONGA\_ROTOSCOPEE\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TUWONGA\_ROTOSCOPEE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1132](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1132)

___

### HUGGINGFACE\_TXT2IMG\_TUWONGA\_ROTOSCOPEE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_TUWONGA\_ROTOSCOPEE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1131](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1131)

___

### HUGGINGFACE\_TXT2IMG\_VOLRATH50\_FANTASY\_CARD\_DIFFUSION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_VOLRATH50\_FANTASY\_CARD\_DIFFUSION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1136](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1136)

___

### HUGGINGFACE\_TXT2IMG\_VOLRATH50\_FANTASY\_CARD\_DIFFUSION\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_VOLRATH50\_FANTASY\_CARD\_DIFFUSION\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1135](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1135)

___

### HUGGINGFACE\_TXT2IMG\_VOLRATH50\_FANTASY\_CARD\_DIFFUSION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_VOLRATH50\_FANTASY\_CARD\_DIFFUSION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1134](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1134)

___

### HUGGINGFACE\_TXT2IMG\_YAYAB\_SD\_ONEPIECE\_DIFFUSERS4\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_YAYAB\_SD\_ONEPIECE\_DIFFUSERS4\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1139](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1139)

___

### HUGGINGFACE\_TXT2IMG\_YAYAB\_SD\_ONEPIECE\_DIFFUSERS4\_1\_1\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_YAYAB\_SD\_ONEPIECE\_DIFFUSERS4\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1138](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1138)

___

### HUGGINGFACE\_TXT2IMG\_YAYAB\_SD\_ONEPIECE\_DIFFUSERS4\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_TXT2IMG\_YAYAB\_SD\_ONEPIECE\_DIFFUSERS4\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1137](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1137)

___

### HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DEBERTA\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DEBERTA\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1141](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1141)

___

### HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DEBERTA\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DEBERTA\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1140](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1140)

___

### HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DISTILROBERTA\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DISTILROBERTA\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1143](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1143)

___

### HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DISTILROBERTA\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_DISTILROBERTA\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1142](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1142)

___

### HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_MINILM2\_L6\_H768\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_MINILM2\_L6\_H768\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1145](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1145)

___

### HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_MINILM2\_L6\_H768\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_MINILM2\_L6\_H768\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1144](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1144)

___

### HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_ROBERTA\_BASE\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_ROBERTA\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1147](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1147)

___

### HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_ROBERTA\_BASE\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_CROSS\_ENCODER\_NLI\_ROBERTA\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1146](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1146)

___

### HUGGINGFACE\_ZSTC\_DIGITALEPIDEMIOLOGYLAB\_COVID\_TWITTER\_BERT\_V2\_MNLI\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_DIGITALEPIDEMIOLOGYLAB\_COVID\_TWITTER\_BERT\_V2\_MNLI\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1149](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1149)

___

### HUGGINGFACE\_ZSTC\_DIGITALEPIDEMIOLOGYLAB\_COVID\_TWITTER\_BERT\_V2\_MNLI\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_DIGITALEPIDEMIOLOGYLAB\_COVID\_TWITTER\_BERT\_V2\_MNLI\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1148](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1148)

___

### HUGGINGFACE\_ZSTC\_ELELDAR\_THEME\_CLASSIFICATION\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_ELELDAR\_THEME\_CLASSIFICATION\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1151](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1151)

___

### HUGGINGFACE\_ZSTC\_ELELDAR\_THEME\_CLASSIFICATION\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_ELELDAR\_THEME\_CLASSIFICATION\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1150](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1150)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_ALLNLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_ALLNLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1153](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1153)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_ALLNLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_ALLNLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1152](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1152)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_MULTINLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_MULTINLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1155](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1155)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_MULTINLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_MULTINLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1154](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1154)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_SNLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_SNLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1157](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1157)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_SNLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_MULTILINGUAL\_CASED\_SNLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1156](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1156)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1159](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1159)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1158](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1158)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1161](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1161)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1160](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1160)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1163](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1163)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_BERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1162](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1162)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_ALLNLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_ALLNLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1165](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1165)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_ALLNLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_ALLNLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1164](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1164)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_MULTINLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_MULTINLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1167](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1167)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_MULTINLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_MULTINLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1166](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1166)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_SNLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_SNLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1169](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1169)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_SNLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_CONVBERT\_BASE\_TURKISH\_MC4\_CASED\_SNLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1168](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1168)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1171](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1171)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_ALLNLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1170](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1170)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1173](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1173)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_MULTINLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1172](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1172)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1175](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1175)

___

### HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_EMRECAN\_DISTILBERT\_BASE\_TURKISH\_CASED\_SNLI\_TR\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1174](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1174)

___

### HUGGINGFACE\_ZSTC\_FACEBOOK\_BART\_LARGE\_MNLI\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_FACEBOOK\_BART\_LARGE\_MNLI\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1177](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1177)

___

### HUGGINGFACE\_ZSTC\_FACEBOOK\_BART\_LARGE\_MNLI\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_FACEBOOK\_BART\_LARGE\_MNLI\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1176](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1176)

___

### HUGGINGFACE\_ZSTC\_JIVA\_XLM\_ROBERTA\_LARGE\_IT\_MNLI\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_JIVA\_XLM\_ROBERTA\_LARGE\_IT\_MNLI\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1179](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1179)

___

### HUGGINGFACE\_ZSTC\_JIVA\_XLM\_ROBERTA\_LARGE\_IT\_MNLI\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_JIVA\_XLM\_ROBERTA\_LARGE\_IT\_MNLI\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1178](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1178)

___

### HUGGINGFACE\_ZSTC\_LIGHTETERNAL\_NLI\_XLM\_R\_GREEK\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_LIGHTETERNAL\_NLI\_XLM\_R\_GREEK\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1181](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1181)

___

### HUGGINGFACE\_ZSTC\_LIGHTETERNAL\_NLI\_XLM\_R\_GREEK\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_LIGHTETERNAL\_NLI\_XLM\_R\_GREEK\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1180](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1180)

___

### HUGGINGFACE\_ZSTC\_MORITZLAURER\_DEBERTA\_V3\_LARGE\_MNLI\_FEVER\_ANLI\_LING\_WANLI\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_MORITZLAURER\_DEBERTA\_V3\_LARGE\_MNLI\_FEVER\_ANLI\_LING\_WANLI\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1183](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1183)

___

### HUGGINGFACE\_ZSTC\_MORITZLAURER\_DEBERTA\_V3\_LARGE\_MNLI\_FEVER\_ANLI\_LING\_WANLI\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_MORITZLAURER\_DEBERTA\_V3\_LARGE\_MNLI\_FEVER\_ANLI\_LING\_WANLI\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1182](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1182)

___

### HUGGINGFACE\_ZSTC\_MORITZLAURER\_MDEBERTA\_V3\_BASE\_XNLI\_MULTILINGUAL\_NLI\_2MIL7\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_MORITZLAURER\_MDEBERTA\_V3\_BASE\_XNLI\_MULTILINGUAL\_NLI\_2MIL7\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1185](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1185)

___

### HUGGINGFACE\_ZSTC\_MORITZLAURER\_MDEBERTA\_V3\_BASE\_XNLI\_MULTILINGUAL\_NLI\_2MIL7\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_MORITZLAURER\_MDEBERTA\_V3\_BASE\_XNLI\_MULTILINGUAL\_NLI\_2MIL7\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1184](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1184)

___

### HUGGINGFACE\_ZSTC\_NARSIL\_BART\_LARGE\_MNLI\_OPTI\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_NARSIL\_BART\_LARGE\_MNLI\_OPTI\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1187](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1187)

___

### HUGGINGFACE\_ZSTC\_NARSIL\_BART\_LARGE\_MNLI\_OPTI\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_NARSIL\_BART\_LARGE\_MNLI\_OPTI\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1186](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1186)

___

### HUGGINGFACE\_ZSTC\_NARSIL\_DEBERTA\_LARGE\_MNLI\_ZERO\_CLS\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_NARSIL\_DEBERTA\_LARGE\_MNLI\_ZERO\_CLS\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1189](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1189)

___

### HUGGINGFACE\_ZSTC\_NARSIL\_DEBERTA\_LARGE\_MNLI\_ZERO\_CLS\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_NARSIL\_DEBERTA\_LARGE\_MNLI\_ZERO\_CLS\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1188](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1188)

___

### HUGGINGFACE\_ZSTC\_NAVTECA\_BART\_LARGE\_MNLI\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_NAVTECA\_BART\_LARGE\_MNLI\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1191](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1191)

___

### HUGGINGFACE\_ZSTC\_NAVTECA\_BART\_LARGE\_MNLI\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_NAVTECA\_BART\_LARGE\_MNLI\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1190](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1190)

___

### HUGGINGFACE\_ZSTC\_RECOGNAI\_BERT\_BASE\_SPANISH\_WWM\_CASED\_XNLI\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_RECOGNAI\_BERT\_BASE\_SPANISH\_WWM\_CASED\_XNLI\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1193](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1193)

___

### HUGGINGFACE\_ZSTC\_RECOGNAI\_BERT\_BASE\_SPANISH\_WWM\_CASED\_XNLI\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_RECOGNAI\_BERT\_BASE\_SPANISH\_WWM\_CASED\_XNLI\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1192](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1192)

___

### HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_MEDIUM\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_MEDIUM\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1195](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1195)

___

### HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_MEDIUM\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_MEDIUM\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1194](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1194)

___

### HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_SMALL\_1\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_SMALL\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1197](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1197)

___

### HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_SMALL\_2\_0\_0

▪ `Static` `Readonly` **HUGGINGFACE\_ZSTC\_RECOGNAI\_ZEROSHOT\_SELECTRA\_SMALL\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1196](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1196)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1210](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1210)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1209](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1209)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1208](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1208)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1207](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1207)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_3

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1206](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1206)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_4

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1205](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1205)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_5

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_5**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1204](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1204)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_6

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_6**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1203](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1203)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_7

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_7**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1202](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1202)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_8

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_2\_1\_8**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1201](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1201)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_3\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_3\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1200](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1200)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_3\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_3\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1199](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1199)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_3\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_3\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1198](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1198)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_1\_1\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1221](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1221)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_1\_2\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1220](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1220)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_1\_2\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1219](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1219)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1218](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1218)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1217](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1217)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1216](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1216)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_3

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1215](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1215)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_4

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_2\_0\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1214](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1214)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_3\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_3\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1213](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1213)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_3\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_3\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1212](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1212)

___

### META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_3\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_13B\_F\_3\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1211](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1211)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_1\_1\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1234](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1234)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_1\_2\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1233](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1233)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1232](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1232)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1231](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1231)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1230](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1230)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_3

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1229](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1229)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_4

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1228](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1228)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_5

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_5**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1227](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1227)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_6

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_6**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1226](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1226)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_7

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_2\_0\_7**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1225](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1225)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_3\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_3\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1224](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1224)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_3\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_3\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1223](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1223)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_3\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_3\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1222](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1222)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_1\_1\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1245](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1245)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_1\_2\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1244](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1244)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_1\_2\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1243](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1243)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1242](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1242)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1241](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1241)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1240](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1240)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_3

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1239](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1239)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_4

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_2\_0\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1238](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1238)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_3\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_3\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1237](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1237)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_3\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_3\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1236](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1236)

___

### META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_3\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_70B\_F\_3\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1235](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1235)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1258](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1258)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1257](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1257)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1256](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1256)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1255](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1255)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_3

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1254](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1254)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_4

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1253](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1253)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_5

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_5**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1252](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1252)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_6

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_6**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1251](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1251)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_7

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_7**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1250](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1250)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_8

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_2\_1\_8**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1249](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1249)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_3\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_3\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1248](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1248)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_3\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_3\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1247](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1247)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_3\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_3\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1246](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1246)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_1\_1\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1269](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1269)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_1\_2\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1268](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1268)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_1\_2\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1267](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1267)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1266](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1266)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1265](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1265)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1264](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1264)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_3

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1263](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1263)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_4

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_2\_0\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1262](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1262)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_3\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_3\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1261](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1261)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_3\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_3\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1260](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1260)

___

### META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_3\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_2\_7B\_F\_3\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1259](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1259)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_1\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1273](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1273)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_1\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1272](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1272)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_1\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1271](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1271)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1270](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1270)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_1\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1277](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1277)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_1\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1276](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1276)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_1\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1275](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1275)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_INSTRUCT\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1274](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1274)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_1\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1281](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1281)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_1\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1280](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1280)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_1\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1279](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1279)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_13B\_PYTHON\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1278](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1278)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_1\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1285](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1285)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_1\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1284](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1284)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_1\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1283](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1283)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1282](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1282)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_1\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1289](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1289)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_1\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1288](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1288)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_1\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1287](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1287)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_INSTRUCT\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1286](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1286)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_1\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1293](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1293)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_1\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1292](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1292)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_1\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1291](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1291)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_34B\_PYTHON\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1290](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1290)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_1\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1297](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1297)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_1\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1296](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1296)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_1\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1295](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1295)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1294](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1294)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_1\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1301](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1301)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_1\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1300](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1300)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_1\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1299](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1299)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_INSTRUCT\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1298](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1298)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_1\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1305](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1305)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_1\_0\_1

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1304](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1304)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_1\_0\_2

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1303](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1303)

___

### META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_2\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_CODELLAMA\_7B\_PYTHON\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1302](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1302)

___

### META\_TEXTGENERATION\_LLAMA\_GUARD\_7B\_1\_0\_0

▪ `Static` `Readonly` **META\_TEXTGENERATION\_LLAMA\_GUARD\_7B\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1306](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1306)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_2\_DEPTH\_FP16\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_2\_DEPTH\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1308](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1308)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_2\_DEPTH\_FP16\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_2\_DEPTH\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1307](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1307)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1310](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1310)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1309](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1309)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_FP16\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1312](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1312)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_FP16\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1311](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1311)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1314](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1314)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1313](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1313)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_FP16\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1316](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1316)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_FP16\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V1\_5\_CONTROLNET\_V1\_1\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1315](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1315)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1318](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1318)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1317](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1317)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_FP16\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1320](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1320)

___

### MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_FP16\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_DEPTH2IMG\_STABLE\_DIFFUSION\_V2\_1\_CONTROLNET\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1319](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1319)

___

### MODEL\_IMAGEGENERATION\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_IMAGEGENERATION\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1321](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1321)

___

### MODEL\_IMAGEGENERATION\_STABILITYAI\_STABLE\_DIFFUSION\_XL\_BASE\_1\_0\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_IMAGEGENERATION\_STABILITYAI\_STABLE\_DIFFUSION\_XL\_BASE\_1\_0\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1323](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1323)

___

### MODEL\_IMAGEGENERATION\_STABILITYAI\_STABLE\_DIFFUSION\_XL\_BASE\_1\_0\_1\_0\_1

▪ `Static` `Readonly` **MODEL\_IMAGEGENERATION\_STABILITYAI\_STABLE\_DIFFUSION\_XL\_BASE\_1\_0\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1322](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1322)

___

### MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1326](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1326)

___

### MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_1\_1\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1325](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1325)

___

### MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1324](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1324)

___

### MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_FP16\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1329](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1329)

___

### MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_FP16\_1\_1\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1328](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1328)

___

### MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_FP16\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_RUNWAYML\_STABLE\_DIFFUSION\_INPAINTING\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1327](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1327)

___

### MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1332](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1332)

___

### MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_1\_1\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1331](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1331)

___

### MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1330](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1330)

___

### MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_FP16\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1335](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1335)

___

### MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_FP16\_1\_1\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1334](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1334)

___

### MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_FP16\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_INPAINTING\_STABILITYAI\_STABLE\_DIFFUSION\_2\_INPAINTING\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1333](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1333)

___

### MODEL\_TEXTGENERATIONJP\_JAPANESE\_STABLELM\_INSTRUCT\_ALPHA\_7B\_V2\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_TEXTGENERATIONJP\_JAPANESE\_STABLELM\_INSTRUCT\_ALPHA\_7B\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1336](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1336)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1344](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1344)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_1\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1343](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1343)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1342](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1342)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_1

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1341](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1341)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_2

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1340](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1340)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_3

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_2\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1339](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1339)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_3\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_1\_3\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1338](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1338)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1337](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1337)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1350](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1350)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_1

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1349](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1349)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_2

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1348](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1348)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_3

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1347](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1347)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_1\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1346](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1346)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V1\_4\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1345](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1345)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1357](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1357)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1356](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1356)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_1

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1355](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1355)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_2

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1354](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1354)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_3

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_1\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1353](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1353)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_2\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_2\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1352](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1352)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1367](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1367)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_1

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1366](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1366)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_2

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1365](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1365)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_3

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1364](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1364)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_4

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_0\_4**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1363](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1363)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1362](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1362)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_1

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1361](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1361)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_2

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1360](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1360)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_3

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_1\_1\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1359](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1359)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_1\_BASE\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1358](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1358)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1351](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1351)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1373](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1373)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_1

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_1**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1372](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1372)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_2

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_2**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1371](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1371)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_3

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_0\_3**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1370](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1370)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_1\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1369](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1369)

___

### MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_TXT2IMG\_STABILITYAI\_STABLE\_DIFFUSION\_V2\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1368](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1368)

___

### MODEL\_UPSCALING\_STABILITYAI\_STABLE\_DIFFUSION\_X4\_UPSCALER\_FP16\_1\_0\_0

▪ `Static` `Readonly` **MODEL\_UPSCALING\_STABILITYAI\_STABLE\_DIFFUSION\_X4\_UPSCALER\_FP16\_1\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1376](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1376)

___

### MODEL\_UPSCALING\_STABILITYAI\_STABLE\_DIFFUSION\_X4\_UPSCALER\_FP16\_1\_1\_0

▪ `Static` `Readonly` **MODEL\_UPSCALING\_STABILITYAI\_STABLE\_DIFFUSION\_X4\_UPSCALER\_FP16\_1\_1\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1375](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1375)

___

### MODEL\_UPSCALING\_STABILITYAI\_STABLE\_DIFFUSION\_X4\_UPSCALER\_FP16\_2\_0\_0

▪ `Static` `Readonly` **MODEL\_UPSCALING\_STABILITYAI\_STABLE\_DIFFUSION\_X4\_UPSCALER\_FP16\_2\_0\_0**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1374](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1374)

## Methods

### bind

▸ **bind**(): [`IJumpStartModelSpec`](../interfaces/IJumpStartModelSpec.md)

#### Returns

[`IJumpStartModelSpec`](../interfaces/IJumpStartModelSpec.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1385](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1385)

___

### of

▸ **of**(`name`): [`JumpStartModel`](JumpStartModel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts:1379](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-model.ts#L1379)
