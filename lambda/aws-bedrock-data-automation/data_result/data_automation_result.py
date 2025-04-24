#  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
#  with the License. A copy of the License is located at
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
#  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
#  and limitations under the License.
#
import json
import boto3
import asyncio
from aws_lambda_powertools import Logger,Tracer,Metrics
from botocore.exceptions import ClientError
from typing import Dict, Any

logger = Logger()
tracer = Tracer()
metrics = Metrics(namespace="DATA_AUTOMATION_RESULT")


class DataAutomationResult:
    def __init__(self, s3_client=None, bda_client=None):
        self.s3 = boto3.client('s3')
        self.bda_client = boto3.client("bedrock-data-automation-runtime")
        self.max_retries = 60
        self.retry_delay = 10

    def _parse_s3_uri(self, s3_uri: str) -> tuple:
        parts = s3_uri.replace("s3://", "").split("/", 1)
        return parts[0], parts[1]

    def _read_s3_json(self, s3_uri: str) -> Dict:
        try:
            bucket, key = self._parse_s3_uri(s3_uri)
            response = self.s3.get_object(Bucket=bucket, Key=key)
            return json.loads(response['Body'].read().decode('utf-8'))
        except Exception as e:
            logger.error("Error reading S3 file", extra={
                "s3_uri": s3_uri,
                "error": str(e)
            })
            raise

    def get_job_status(self, invoke_arn: str) -> Dict[str, Any]:
        """Get current status of the data automation job"""
        try:
            status = self.bda_client.get_data_automation_status(
                invocationArn=invoke_arn
            )
            logger.info("Retrieved job status", extra={
                "invoke_arn": invoke_arn,
                "status": status.get("status")
            })
            return status
        except ClientError as e:
            logger.error("Error getting job status", extra={
                "invoke_arn": invoke_arn,
                "error": str(e)
            })
            raise

    async def wait_for_completion(self, invoke_arn: str) -> Dict[str, Any]:
        """
        Asynchronously wait for job completion
        """
        retries = 0
        while retries < self.max_retries:
            status = self.get_job_status(invoke_arn)
            current_status = status.get("status")
            
            if current_status == "Success":
                logger.info("Job completed successfully", extra={
                    "invoke_arn": invoke_arn
                })
                return status
            elif current_status in ["FAILED", "CANCELLED"]:
                logger.error("Job ended with status", extra={
                    "invoke_arn": invoke_arn,
                    "status": current_status,
                    "error": status.get("errorMessage")
                })
                return status
            
            logger.info("Job in progress", extra={
                "invoke_arn": invoke_arn,
                "status": current_status,
                "retry": retries
            })
            await asyncio.sleep(self.retry_delay)
            retries += 1
        
        raise TimeoutError(f"Job did not complete within {self.max_retries * self.retry_delay} seconds")

    async def get_results(self, invocation_arn: str, wait: bool = False) -> Dict[str, Any]:
        """
        Get results from completed job
        
        Args:
            invoke_arn: ARN of the invoked job
            wait: If True, wait asynchronously for job completion
            
        Returns:
            Dict[str, Any]: Job results and metadata
        """
        try:
            # Get current status or wait for completion based on wait parameter
            if wait:
                logger.info("Waiting for job completion", extra={
                    "invocation_arn": invocation_arn
                })
                status = await self.wait_for_completion(invocation_arn)
            else:
                status = self.get_job_status(invocation_arn)
                
            current_status = status.get("status")

            # Check if job is completed
            if current_status != "Success":
                logger.warning("Job not completed, returning status", extra={
                    "invoke_arn": invocation_arn,
                    "status": current_status,
                    "wait_enabled": wait
                })
                return {
                    "status": current_status,
                    "details": status
                }

            # Get output location
            output_uri = status["outputConfiguration"]["s3Uri"]
            logger.info("Fetching results", extra={
                "invoke_arn": invocation_arn,
                "output_uri": output_uri
            })

            # Read metadata
            metadata = self._read_s3_json(output_uri)
            results = []

            # Process each output
            for output in metadata["output_metadata"]:
                for segment in output["segment_metadata"]:
                    # Add custom output if there's a match
                    if segment["custom_output_status"] == "MATCH":
                        custom_result = self._read_s3_json(segment["custom_output_path"])
                        results.append(custom_result)
                        logger.debug("Added custom output", extra={
                            "path": segment["custom_output_path"]
                        })

                    # Add standard output if path exists
                    if "standard_output_path" in segment:
                        standard_result = self._read_s3_json(segment["standard_output_path"])
                        results.append(standard_result)
                        logger.debug("Added standard output", extra={
                            "path": segment["standard_output_path"]
                        })
                    else:
                        logger.warning("Missing standard_output_path in segment", extra={
                            "segment_id": segment.get("segment_id", "unknown")
                        })

            logger.info("Successfully retrieved results", extra={
                "invoke_arn": invocation_arn,
                "result_count": len(results),
                "wait_enabled": wait
            })

            return {
                "status": "Success",
                "metadata": metadata,
                "results": results
            }

        except TimeoutError as e:
            logger.error("Timeout waiting for job completion", extra={
                "invoke_arn": invocation_arn,
                "max_retries": self.max_retries,
                "retry_delay": self.retry_delay
            })
            return {
                "status": "TIMEOUT",
                "details": {
                    "error": str(e),
                    "max_wait_time": self.max_retries * self.retry_delay
                }
            }

        except Exception as e:
            logger.error("Error getting results", extra={
                "invoke_arn": invocation_arn,
                "error": str(e),
                "wait_enabled": wait
            })
            raise
