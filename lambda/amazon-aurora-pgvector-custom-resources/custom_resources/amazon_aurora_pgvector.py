import logging
import os
import sys
import json
import boto3
import psycopg2

from botocore.exceptions import ClientError

from custom_resources.cr_types import CustomResourceRequest, CustomResourceResponse

from typing import TypedDict

# Set the LD_LIBRARY_PATH to include the /opt/lib directory
# if os.environ.get('AWS_EXECUTION_ENV'):
#     os.environ['LD_LIBRARY_PATH'] = '/opt/lib'
#     try:
#         import psycopg2
#         # Your code that uses psycopg2
#     except ImportError:
#         sys.exit('Unable to import module: %s' % 'psycopg2')


LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


class DatabaseProperties(TypedDict):
    Host: str
    DatabaseName: str
    Port: int
    SecretName: str


def get_secret(secret_name: str) -> dict:
    session = boto3.session.Session()
    client = session.client(service_name='secretsmanager')
    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name)
    except ClientError as e:
        raise Exception("Couldn't retrieve the secret.") from e
    else:
        if 'SecretString' in get_secret_value_response:
            return json.loads(get_secret_value_response['SecretString'])
        else:
            raise Exception("Couldn't parse the secret.")


def connect_to_database(secret: dict):
    try:
        conn = psycopg2.connect(
            host=secret['host'],
            port=secret['port'],
            dbname=secret['dbname'],
            user=secret['username'],
            password=secret['password']
        )
        return conn
    except psycopg2.OperationalError as e:
        raise Exception("Couldn't connect to the database.") from e


def execute_sql_commands(
    conn: psycopg2.extensions.connection,
    password: str,
    vector_dimensions: int
):
    try:
        with conn.cursor() as cur:
            cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
            cur.execute("CREATE SCHEMA bedrock_integration;")
            cur.execute(
                f"CREATE ROLE bedrock_user "
                "WITH PASSWORD '{password}' LOGIN;"
            )
            cur.execute(
                "GRANT ALL ON SCHEMA "
                "bedrock_integration to bedrock_user;"
            )
            cur.execute(
                "CREATE TABLE bedrock_integration.bedrock_kb ("
                "id uuid PRIMARY KEY, "
                f"bedrock_knowledge_base_default_vector vector({vector_dimensions}), "
                "amazon_bedrock_text_chunk text, "
                "amazon_bedrock_metadata json);"
            )
            cur.execute(
                "CREATE INDEX on bedrock_integration.bedrock_kb "
                "USING hnsw (bedrock_knowledge_base_default_vector vector_cosine_ops);"
            )
        conn.commit()
    except psycopg2.Error as e:
        raise Exception("Couldn't execute SQL commands.") from e
    finally:
        conn.close()


def on_create(
    event: CustomResourceRequest[DatabaseProperties]
) -> CustomResourceResponse:
    secret_name = event["ResourceProperties"]["SecretName"]
    db_name = event["ResourceProperties"]["DatabaseName"]
    vector_dimensions = event["ResourceProperties"]["VectorDimensions"]

    secret = get_secret(secret_name)
    conn = connect_to_database(secret)
    execute_sql_commands(conn, secret['password'], vector_dimensions)

    return {
        "PhysicalResourceId": f"{secret_name}-{db_name}",
        "Data": {
            "Message": "Database setup completed successfully"
        }
    }


def on_update(
    _event: CustomResourceRequest[DatabaseProperties],
) -> CustomResourceResponse:
    raise ValueError("Update not supported")


def on_delete(
    _event: CustomResourceRequest[DatabaseProperties],
) -> CustomResourceResponse:
    return {
        "PhysicalResourceId": _event["PhysicalResourceId"],
        "Data": {
            "Message": "Deletion is not needed. Ignoring."
        }
    }


def on_event(event: CustomResourceRequest[DatabaseProperties], context):
    logger.debug(f"Received event: {event}")
    request_type = event["RequestType"]

    if "ServiceToken" in event["ResourceProperties"]:
        del event["ResourceProperties"]["ServiceToken"]

    if request_type == "Create":
        return on_create(event)
    if request_type == "Update":
        return on_update(event)
    if request_type == "Delete":
        return on_delete(event)
    raise Exception("Invalid request type: %s" % request_type)
