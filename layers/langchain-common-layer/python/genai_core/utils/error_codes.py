
class PredictionException(Exception):
    """Exception raised for errors while running prediction.

    Attributes:
        llm_name -- llm used for prediction
        message -- explanation of the error
    """

    def __init__(self, llm_name, message="Exception during prediction"):
        self.message = "601 -> "+llm_name+" -> "+message
        super(PredictionException, self).__init__(message)
        #super().__init__(self.message)