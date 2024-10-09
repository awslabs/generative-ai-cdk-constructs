#!/bin/sh
set -e

echo "${$}" > pid;
echo "STARTING ${0} ${@}...";
python3 -u ${@};
echo "...ENDING ${0} ${@}";
exit 0;