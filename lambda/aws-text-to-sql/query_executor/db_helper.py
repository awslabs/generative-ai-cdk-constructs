import os
import boto3
import json
import pymysql
from langchain_community.utilities import SQLDatabase
from config_types import Database_supported
from aws_lambda_powertools import Logger, Tracer, Metrics
from sqlalchemy import create_engine
from sqlalchemy.engine import URL

logger = Logger(service="QUERY_EXECUTOR")
tracer = Tracer(service="QUERY_EXECUTOR")
metrics = Metrics(namespace="textToSql_pipeline", service="QUERY_EXECUTOR")

secret_arn = os.environ['SECRET_ARN']


def get_db_connection(db_name):
    try:
        match db_name:
            case Database_supported.SQLITE:
                # SQLDatabase is an SQLAlchemy wrapper around a database, which provides a SQL Toolkit on top of databases.
                # sample db - https://www.sqlitetutorial.net/wp-content/uploads/2018/03/sqlite-sample-database-diagram.pdf
                db = SQLDatabase.from_uri("sqlite:///:memory:", sample_rows_in_table_info=3)
                print(db.get_usable_table_names())
                return db
            case Database_supported.POSTGRESQL:
                print("Retrieve db schema from postgresql")
                # update connection url
            case Database_supported.MYSQL:
                print("Retrieve db schema from mysql")
                credentials = get_secret()
                db_user = credentials['username']
                db_password = credentials['password']
                db_host = credentials['host']
                db_name = credentials['dbname']
                db_uri = f"mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}"
                
                print(f"db_uri :: {db_uri}")
                return SQLDatabase.from_uri(db_uri, sample_rows_in_table_info=3)


            case _:
                print(f"Error: {db_name} database is not supported.")
    except Exception as exp:
        logger.error(f'response :: {exp}')


def get_secret():
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=session.region_name
    )

    print(f"secret_arn :: {secret_arn}")
    get_secret_value_response = client.get_secret_value(
        SecretId=secret_arn
    )
    
    print(f"get_secret_value_response :: {get_secret_value_response}")

    if 'SecretString' in get_secret_value_response:
        secret = get_secret_value_response['SecretString']
    else:
        logger.error("Error: Unable to retrieve texttosqldbsecret value")
    
    logger.info(f'secret :: {secret}')  
    return json.loads(secret)
