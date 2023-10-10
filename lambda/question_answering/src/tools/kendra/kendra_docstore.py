# tool.py
from langchain.agents.tools import Tool
from langchain.schema import (
    HumanMessage,
    SystemMessage
)
import requests
import os
import pprint

pp = pprint.PrettyPrinter(depth=2)


from typing import Union
from langchain.docstore.base import Docstore
from langchain.docstore.document import Document
import boto3
from PyPDF2 import PdfReader
from io import BytesIO
import boto3
from langchain.agents import ZeroShotAgent, Tool, AgentExecutor ,ReActChain
from langchain import  LLMChain

class Kendra_docstore(Docstore):
    """Wrapper around Kendra API."""

    def __init__(self,kendra_index_id :str, region_name:str) -> None:
        """Check that boto3 package is installed."""
        try:
            import boto3
            self.kendra_client = boto3.client("kendra",region_name=region_name)
            self.s3_client = boto3.client("s3")
            self.kendra_index_id = kendra_index_id
            
        except ImportError:
            raise ValueError(
                "Could not import boto3 python package. "
                "Please it install it with `pip install boto3`."
            )

    def parseResponse(self,response):
        for each_loop in response['ResultItems'][0]['DocumentAttributes']:
            if (each_loop['Key']=='_excerpt_page_number'):
                pagenumber = each_loop['Value']['LongValue'] -1   
        return pagenumber
    
    def parseBucketandKey(self,SourceURI):
        return (SourceURI.split('/', 3)[2],SourceURI.split('/', 3)[3])

    def getTextFromPDF(self,pageNumber,bucket,key):
        obj = self.s3_client.get_object(Bucket=bucket, Key=key)
        reader = PdfReader(BytesIO(obj["Body"].read()))
        pageObj = reader.pages[pageNumber]
        return pageObj.extract_text()

    def search(self, query : str ) -> str:
        """Try to search for a document in Kendra Index""
        
        """
        response = self.kendra_client.query(
            QueryText=query,
            IndexId=self.kendra_index_id,
            )
        first_result_type = ''
        
        try:
            first_result_type = response['ResultItems'][0]['Type']
        except KeyError:
            return None
        print(first_result_type)
        if first_result_type=="ANSWER":
            print("Found Document Excerpt")
            document_title = response['ResultItems'][0]['DocumentTitle']['Text']
            document_excerpt_text = response['ResultItems'][0]['DocumentExcerpt']['Text']
            pageNumber = self.parseResponse(response)
            print("Page Number:",pageNumber + 1 )
            sourceURI = response['ResultItems'][0]['DocumentId']
            (bucket,key) = self.parseBucketandKey(sourceURI)
            answer_text =   self.getTextFromPDF(pageNumber,bucket,key)
            return answer_text
        
        elif first_result_type == 'DOCUMENT':
            pageNumber = self.parseResponse(response)
            print("Page Number:",pageNumber +1)
            sourceURI = response['ResultItems'][0]['DocumentId']
            (bucket,key) = self.parseBucketandKey(sourceURI)
            answer_text =   self.getTextFromPDF(pageNumber,bucket,key)    
            return answer_text        
        else:
            return f"No Results returned for query :{query}"



class Tools():
    kendra_docstore = Kendra_docstore(kendra_index_id =os.environ['KENDRA_INDEX'],region_name=boto3.Session().region_name)
    
    def __init__(self) -> None:
        self.tools = [
            Tool(
                name="Search",
                func=self.kendra_docstore.search,
                description="useful for when you need to answer"
                )

        ]

tools = Tools().tools
