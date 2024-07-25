from langchain_community.utilities import SQLDatabase
from config_types import Database_supported
from aws_lambda_powertools import Logger, Tracer, Metrics

logger = Logger(service="QUERY_EXECUTOR")
tracer = Tracer(service="QUERY_EXECUTOR")
metrics = Metrics(namespace="textToSql_pipeline", service="QUERY_EXECUTOR")


def get_db_connection(db_name):
    try:
        match db_name:
            case Database_supported.SQLITE:
                # SQLDatabase is an SQLAlchemy wrapper around a database, which provides a SQL Toolkit on top of databases.
                # sample db - https://www.sqlitetutorial.net/wp-content/uploads/2018/03/sqlite-sample-database-diagram.pdf
                print(f"fetching db schema for {db_name}")
                db = SQLDatabase.from_uri("sqlite:///:memory:", sample_rows_in_table_info=3)
                print(db.get_usable_table_names())

                # db = SQLDatabase.from_uri("sqlite:///:memory:", sample_rows_in_table_info=3)
                # print(db.get_usable_table_names())
                return db
            case Database_supported.POSTGRESQL:
                print("Retrieve db schema from postgresql")
                # update connection url
                return SQLDatabase.from_uri("postgresql://<username>:<password>@<host>:<port>/<database>", sample_rows_in_table_info=3)
            case Database_supported.MYSQL:
                print("Retrieve db schema from mysql")
                return SQLDatabase.from_uri("mysql://<username>:<password>@<host>:<port>/<database>", sample_rows_in_table_info=3)

            case _:
                print(f"Error: {db_name} database is not supported.")
    except Exception as exp:
        logger.error(f'response :: {exp}')
