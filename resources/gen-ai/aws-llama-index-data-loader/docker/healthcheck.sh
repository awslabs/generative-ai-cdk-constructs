#!/bin/sh
set -e

WORKING_DIRECTORY="/usr/src/app";

# Look for the process
pgrep --full "/bin/sh ${WORKING_DIRECTORY}/runner.sh ${WORKING_DIRECTORY}/sqs_consumer.py" 2> /dev/null > /dev/null;
exit ${?};