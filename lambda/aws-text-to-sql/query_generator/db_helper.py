from langchain_community.utilities import SQLDatabase


def get_db_connection(db_name):
    try:
        match db_name:
            case "sqlite":
                # SQLDatabase is an SQLAlchemy wrapper around a database, which provides a SQL Toolkit on top of databases.
                # sample db - https://www.sqlitetutorial.net/wp-content/uploads/2018/03/sqlite-sample-database-diagram.pdf
                db = SQLDatabase.from_uri("sqlite:///Chinook.db", sample_rows_in_table_info=3)
                print(db.dialect)
                return db
            case "postgresql":
                print("Retrieve db schema from postgresql")
                # update connection url
                return SQLDatabase.from_uri("postgresql://<username>:<password>@<host>:<port>/<database>", sample_rows_in_table_info=3)
            case "mysql":
                print("Retrieve db schema from mysql")
                return SQLDatabase.from_uri("mysql://<username>:<password>@<host>:<port>/<database>", sample_rows_in_table_info=3)

            case _:
                print(f"Error: {db_name} database is not supported.")
                exit(1)
    except Exception as exp:
        logger.error(f'response :: {exp}')
        exit(1)