from aws_lambda_powertools import Logger
from langchain_aws import BedrockLLM
from langchain_aws import ChatBedrock
from config_types import BedrockModel

logger = Logger(service="TEXT2SQL")

def get_llm(config):

    try:
        model_id=config.get("model_id", BedrockModel.ANTHROPIC_CLAUDE_V3_HAIKU_V1)

        if ("claude-3" in model_id):
            llm = ChatBedrock(
                model_id=model_id
            )
        else:
            llm = BedrockLLM(
                model_id=model_id
            )
        return llm
    except Exception as exp:
        logger.error(f' response :: {exp}')
        return None