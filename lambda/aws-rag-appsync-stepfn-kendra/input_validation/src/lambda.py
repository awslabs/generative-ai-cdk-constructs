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
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools import Logger

# !currently useless function!

logger = Logger(service="KENDRA_INGESTION_INPUT_VALIDATION")

def process_files(input_files):
    files_to_process = []
    valid = True
    for i in range(len(input_files)):
        filename = input_files[i]['name']
        status = "Unsupported"
        if isvalid_file_format(filename):
            status = "Supported"
            file_to_process = {
                'status': status,
                'name': filename
            }
            files_to_process.append(file_to_process)
        else:
            logger.info("file {filename} extension is currently not supported")

    if not files_to_process:
        valid = False

    response = {
        'isValid':valid,
        'files':files_to_process
    }

    return response

def isvalid_file_format(file_name: str) -> bool:
    file_format = ['.pdf','.html','xml','.xslt','.md','.csv','.xlsx','.xls','.json','.rtf','.ppt','.docx','txt']
    if file_name.endswith(tuple(file_format)):
        print(f'valid file format :: {file_format}')
        return True
    else:
        print(f'Invalid file format :: {file_format}')
        return False


def handler(event,  context: LambdaContext) -> dict:

    ingestion_input = event['detail']['ingestioninput']

    input_files = ingestion_input['files']
    response = process_files(input_files)

    logger.info({"response": response})
    return response
