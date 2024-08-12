class LLMNotLoadedException(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[501] The LLM {message} was not loaded correctly"
        

class KnowledgeBaseIDNotFound(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[404] Error occured, Reason ::  {message}"
        
class FileNotFound(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[404] File not found, {message}"
        
class TaskTokenMissing(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[404] step function task token not found, {message}"

class UserQuestionMissing(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = f"[404] user question or question id is not found, {message}"