class LLMNotLoadedException(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[501] The LLM {message} was not loaded correctly"
        

class StrategyNotFoundException(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[503] The selected strategy {message} doesn't exist"
                
class QueryGenerationException(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[502] Failed to generate query {message}."
        
class FileNotFound(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[404] File not found, {message}"
        
class InvalidWorkFlowJson(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[500] Invalid workflow.json file, {message}"