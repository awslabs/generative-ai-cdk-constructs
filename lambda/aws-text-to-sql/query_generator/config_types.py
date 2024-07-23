from enum import StrEnum
    
class FewShotsStrategy(StrEnum):
    STATIC = 'static',
    DYNAMIC = 'dynamic',

class WorkflowStrategy(StrEnum):
    AUTO = 'auto',
    HUMAN_LOOP = 'human',
    DISABLED = 'disabled'