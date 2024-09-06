from enum import StrEnum
    
class FewShotsStrategy(StrEnum):
    STATIC = 'static',
    DYNAMIC = 'dynamic',

class WorkflowStrategy(StrEnum):
    AUTO = 'auto',
    HUMAN_LOOP = 'human',
    DISABLED = 'disabled'

class Database_supported(StrEnum):
    SQLITE = 'Sqlite',
    POSTGRESQL='PostgreSQL'
    MYSQL='MySQL'

class ConfigFilesName(StrEnum):
    WORKFLOW_JSON = 'config/workflow_config.json'
    KNOWLEDGE_LAYER_JSON = 'config/knowledge_layer.json'
    FEW_SHOTS_JSON = 'config/few_shots.json'
    
    
class Provider(StrEnum):
    BEDROCK = 'Bedrock'
    
    
class BedrockModel(StrEnum):
    # ANTHROPIC MODELS
    ANTHROPIC_CLAUDE_V2_1 = 'anthropic.claude-v2:1',
    ANTHROPIC_CLAUDE_V2 = 'anthropic.claude-v2',
    ANTHROPIC_CLAUDE_V3_HAIKU_V1 = 'anthropic.claude-3-haiku-20240307-v1:0',
    ANTHROPIC_CLAUDE_V3_SONNET_V1 = 'anthropic.claude-3-sonnet-20240229-v1:0',
    ANTHROPIC_CLAUDE_INSTANT_V1 = 'anthropic.claude-instant-v1'
    # AMAZON
    AMAZON_TITAN_TEXT_LITE_V1 = 'amazon.titan-text-lite-v1',
    AMAZON_TITAN_TEXT_EXPRESS_V1 = 'amazon.titan-text-express-v1',
    AMAZON_TITAN_EMBED_IMAGE_V1 = 'amazon.titan-embed-image-v1',
    AMAZON_TITAN_EMBED_TEXT_V1 = 'amazon.titan-embed-text-v1',
    AMAZON_TITAN_IMAGE_GENERATOR_V1 = 'amazon.titan-image-generator-v1',
    AMAZON_TITAN_TEXT_PREMIER_V1 = 'amazon.titan-text-premier-v1:0'

MAX_TOKENS_MAP = {
    Provider.BEDROCK+'.'+BedrockModel.ANTHROPIC_CLAUDE_V2_1 : 200000,
    Provider.BEDROCK+'.'+BedrockModel.ANTHROPIC_CLAUDE_V2 : 100000,
    Provider.BEDROCK+'.'+BedrockModel.ANTHROPIC_CLAUDE_V3_HAIKU_V1 : 200000,
    Provider.BEDROCK+'.'+BedrockModel.ANTHROPIC_CLAUDE_V3_SONNET_V1 : 200000,
    Provider.BEDROCK+'.'+BedrockModel.ANTHROPIC_CLAUDE_INSTANT_V1 : 100000,
    Provider.BEDROCK+'.'+BedrockModel.AMAZON_TITAN_TEXT_LITE_V1 : 4000,
    Provider.BEDROCK+'.'+BedrockModel.AMAZON_TITAN_TEXT_EXPRESS_V1 : 8000,
    Provider.BEDROCK+'.'+BedrockModel.AMAZON_TITAN_EMBED_TEXT_V1: 8000,
    Provider.BEDROCK+'.'+BedrockModel.AMAZON_TITAN_EMBED_IMAGE_V1: 128,
    Provider.BEDROCK+'.'+BedrockModel.AMAZON_TITAN_IMAGE_GENERATOR_V1: 77,
    Provider.BEDROCK+'.'+BedrockModel.AMAZON_TITAN_TEXT_PREMIER_V1: 32000,
}
