# aws-model-deployment-sagemaker

```typescript
new JumpStartSageMakerEndpoint(this, 'LLAMA2', {
  model: JumpStartModel.META_TEXTGENERATION_LLAMA_2_7B_F_2_0_2,
  instanceType: InstanceType.ML_G5_2XLARGE,
});

new JumpStartSageMakerEndpoint(this, 'Falcon_7B', {
  model: JumpStartModel.HUGGINGFACE_LLM_FALCON_7B_INSTRUCT_BF16_1_3_2,
  instanceType: InstanceType.ML_G5_2XLARGE,
});

new JumpStartSageMakerEndpoint(this, 'LightGPT', {
  model: JumpStartModel.HUGGINGFACE_TEXTGENERATION1_LIGHTGPT_1_1_0,
  instanceType: InstanceType.ML_G5_12XLARGE,
});

new JumpStartSageMakerEndpoint(this, 'RedPajama', {
  model:
    JumpStartModel.HUGGINGFACE_TEXTGENERATION1_REDPAJAMA_INCITE_BASE_3B_V1_FP16_1_1_0,
  instanceType: InstanceType.ML_G5_2XLARGE,
});

new HuggingFaceSageMakerEndpoint(this, 'Mistral', {
  modelId: 'mistralai/Mistral-7B-Instruct-v0.1',
  instanceType: InstanceType.ML_G5_2XLARGE,
  environment: {
    SM_NUM_GPUS: '1',
    MAX_INPUT_LENGTH: '2048',
    MAX_TOTAL_TOKENS: '4096',
  },
});
```