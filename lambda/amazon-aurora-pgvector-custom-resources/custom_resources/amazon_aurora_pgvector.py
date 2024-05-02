import logging
import os
import json
import boto3
import psycopg2

from botocore.exceptions import ClientError

from custom_resources.cr_types import CustomResourceRequest, CustomResourceResponse

from typing import TypedDict

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


class DatabaseProperties(TypedDict):
    SecretName: str
    ClusterIdentifier: str
    DatabaseName: str
    TableName: str
    VectorDimensions: int
    PrimaryKeyField: str
    SchemaName: str
    VectorField: str
    TextField: str
    MetadataField: str


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
        

def get_cluster_endpoint(
    cluster_identifier: str,
    db_name: str
) -> str:
    session = boto3.session.Session()
    client = session.client(service_name='rds')
    try:
        describe_db_clusters_response = client.describe_db_clusters(
            DBClusterIdentifier=cluster_identifier
        )
    except ClientError as e:
        raise Exception(f"Couldn't retrieve the cluster endpoint: {str(e)}") from e
    else:
        for db_cluster in describe_db_clusters_response['DBClusters']:
            if db_cluster['DatabaseName'] == db_name:
                return db_cluster['Endpoint']
        raise Exception(f"No endpoint for DB cluster found with the database name {db_name}.")


def connect_to_database(
    secret: dict,
    host: str,
    db_name: str
):
    try:
        conn = psycopg2.connect(
            host=host,
            port=5432,
            dbname=db_name,
            user=secret['username'],
            password=secret['password']
        )
        return conn
    except psycopg2.OperationalError as e:
        raise Exception(f"Couldn't connect to the database: {str(e)}") from e


def execute_sql_commands(
    conn: psycopg2.extensions.connection,
    password: str,
    vector_dimensions: int,
    table_name: str,
    primary_key_field: str,
    schema_name: str,
    vector_field: str,
    text_field: str,
    metadata_field: str
):
    try:
        with conn.cursor() as cur:
            cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
            cur.execute(f"CREATE SCHEMA {schema_name};")
            cur.execute(
                "CREATE ROLE bedrock_user "
                f"WITH PASSWORD '{password}' LOGIN;"
            )
            cur.execute(
                "GRANT ALL ON SCHEMA "
                f"{schema_name} to bedrock_user;"
            )
            cur.execute(
                f"CREATE TABLE {schema_name}.{table_name} ("
                f"{primary_key_field} uuid PRIMARY KEY, "
                f"{vector_field} vector({vector_dimensions}), "
                f"{text_field} text, "
                f"{metadata_field} json);"
            )
            cur.execute(
                f"CREATE INDEX on {schema_name}.{table_name} "
                f"USING hnsw ({vector_field} vector_cosine_ops);"
            )
        conn.commit()
    except psycopg2.Error as e:
        raise Exception(f"Couldn't execute SQL commands: {str(e)}") from e
    finally:
        conn.close()


def on_create(
    event: CustomResourceRequest[DatabaseProperties]
) -> CustomResourceResponse:
    secret_name = event["ResourceProperties"]["SecretName"]
    cluster_identifier = event["ResourceProperties"]["ClusterIdentifier"]
    db_name = event["ResourceProperties"]["DatabaseName"]
    table_name = event["ResourceProperties"]["TableName"]
    vector_dimensions = event["ResourceProperties"]["VectorDimensions"]
    primary_key_field = event["ResourceProperties"]["PrimaryKeyField"]
    schema_name = event["ResourceProperties"]["SchemaName"]
    vector_field = event["ResourceProperties"]["VectorField"]
    text_field = event["ResourceProperties"]["TextField"]
    metadata_field = event["ResourceProperties"]["MetadataField"]

    secret = get_secret(secret_name)
    host = get_cluster_endpoint(
        cluster_identifier=cluster_identifier,
        db_name=db_name
    )
    conn = connect_to_database(
        secret=secret,
        host=host,
        db_name=db_name
    )
    execute_sql_commands(
        conn=conn, 
        password=secret['password'], 
        vector_dimensions=vector_dimensions,
        table_name=table_name,
        primary_key_field=primary_key_field,
        schema_name=schema_name,
        vector_field=vector_field,
        text_field=text_field,
        metadata_field=metadata_field
    )

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
