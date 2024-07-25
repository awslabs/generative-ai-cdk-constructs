class LLMNotLoadedException(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[501] The LLM {message} was not loaded correctly"
        
class QueryExecutionException(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[502] Failed to run query {message} against DB"
        
   
class FileNotFound(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[404] File not found, {message}"