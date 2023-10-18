#
# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
# with the License. A copy of the License is located at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
# OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
# and limitations under the License.
#

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