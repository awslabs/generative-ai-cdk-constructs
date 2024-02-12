
from langchain.llms.sagemaker_endpoint import LLMContentHandler, SagemakerEndpoint

import json
import os

class ContentHandler(LLMContentHandler):
    content_type = "application/json"
    accepts = "application/json"

    def transform_input(self, prompt, model_kwargs) -> bytes:
        input_str = json.dumps({"inputs": prompt, "parameters": model_kwargs})
        return input_str.encode("utf-8")

    def transform_output(self, output: bytes) -> str:
        response_json = json.loads(output.read().decode("utf-8"))
        return response_json[0]["generated_text"]


content_handler = ContentHandler()

class Ideficsllm():

    parameters = {
        "do_sample": True,
        "top_p": 0.2,
        "temperature": 0.4,
        "top_k": 50,
        "max_new_tokens": 512,
        "stop": ["User:","<end_of_utterance>"]
     }


    @classmethod
    def sagemakerendpoint_llm(self,model_id):
        return SagemakerEndpoint(
        endpoint_name=model_id,
        region_name=os.environ["AWS_REGION"],
        model_kwargs=self.parameters,
        content_handler=content_handler,


   
)
