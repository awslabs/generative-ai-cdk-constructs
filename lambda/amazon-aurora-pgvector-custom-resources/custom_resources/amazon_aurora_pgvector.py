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

import logging
import os
import json
import boto3
import pg8000

from botocore.exceptions import ClientError

from custom_resources.cr_types import CustomResourceRequest, CustomResourceResponse

from typing import TypedDict


LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


class DatabaseProperties(TypedDict):
    Host: str
    DatabaseName: str
    TableName: str
    VectorDimensions: int
    PrimaryKeyField: str
    SchemaName: str
    VectorField: str
    TextField: str
    MetadataField: str
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
        conn = pg8000.connect(
            host=secret['host'],
            port=secret['port'],
            database=secret['dbname'],
            user=secret['username'],
            password=secret['password']
        )
        return conn
    except pg8000.OperationalError as e:
        raise Exception("Couldn't connect to the database.") from e


def execute_sql_commands(
    conn: pg8000.Connection,
    password: str,
    vector_dimensions: int,
    table_name: str,
    pk_field: str,
    schema_name: str,
    vector_field: str,
    text_field: str,
    metadata_field: str,
):
    try:
        with conn.cursor() as cur:
            cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
            cur.execute(f"CREATE SCHEMA IF NOT EXISTS {schema_name};")

            cur.execute(f"CREATE ROLE bedrock_user WITH PASSWORD '{password}' LOGIN;")
            cur.execute(f"GRANT ALL ON SCHEMA {schema_name} TO bedrock_user;")

            cur.execute(
                f"CREATE TABLE {schema_name}.{table_name} ("
                f"{pk_field} uuid PRIMARY KEY, "
                f"{vector_field} vector({vector_dimensions}), "
                f"{text_field} text, "
                f"{metadata_field} json);"
            )

            cur.execute(
                f"CREATE INDEX ON {schema_name}.{table_name} "
                f"USING hnsw ({vector_field} vector_cosine_ops);"
            )

            cur.execute(
                f"CREATE INDEX ON {schema_name}.{table_name} "
                f"USING gin (to_tsvector('simple'::regconfig, {text_field}));"
            )
        conn.commit()
    except pg8000.ProgrammingError as e:
        error_message = f"Error executing SQL commands: {e}"
        raise Exception(f"{error_message}") from e
    finally:
        conn.close()


def on_create(
    event: CustomResourceRequest[DatabaseProperties]
) -> CustomResourceResponse:
    secret_name = event["ResourceProperties"]["SecretName"]
    db_name = event["ResourceProperties"]["DatabaseName"]
    vector_dimensions = event["ResourceProperties"]["VectorDimensions"]
    table_name = event["ResourceProperties"]["TableName"]
    primary_key_field = event["ResourceProperties"]["PrimaryKeyField"]
    schema_name = event["ResourceProperties"]["SchemaName"]
    vector_field = event["ResourceProperties"]["VectorField"]
    text_field = event["ResourceProperties"]["TextField"]
    metadata_field = event["ResourceProperties"]["MetadataField"]

    secret = get_secret(secret_name)
    conn = connect_to_database(secret)
    execute_sql_commands(
        conn=conn, 
        password=secret['password'], 
        vector_dimensions=vector_dimensions,
        table_name=table_name,
        pk_field=primary_key_field,
        schema_name=schema_name,
        vector_field=vector_field,
        text_field=text_field,
        metadata_field=metadata_field,
    )

    return {
        "PhysicalResourceId": f"{secret_name}-{db_name}",
        "Data": {
            "Message": "Database setup completed successfully."
        }
    }


def on_update(
    _event: CustomResourceRequest[DatabaseProperties],
) -> CustomResourceResponse:
    raise ValueError("Update is not supported.")


def on_delete(
    _event: CustomResourceRequest[DatabaseProperties],
) -> CustomResourceResponse:
    return {
        "PhysicalResourceId": _event["PhysicalResourceId"],
        "Data": {
            "Message": "Deletion is completed."
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
