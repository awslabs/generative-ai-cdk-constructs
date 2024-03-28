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

FROM public.ecr.aws/sam/build-python3.12:1

RUN mkdir /asset
RUN pip install poetry
COPY . .
RUN rm -rf dist/*
RUN poetry install
RUN poetry build
RUN poetry run pip install --upgrade -t /asset dist/*.whl

CMD ["echo", "Build completed"]

# FROM public.ecr.aws/sam/build-python3.12:1

# # Install build dependencies
# RUN dnf -y install postgresql-devel gcc python3-devel

# RUN mkdir /opt/lib
# WORKDIR /opt/lib
# RUN pip install poetry
# COPY . .
# RUN rm -rf dist/*
   
# # Build psycopg2 from source
# RUN poetry install --no-root
# RUN poetry build
# RUN poetry run pip install --upgrade -t /asset dist/*.whl

# CMD ["echo", "Build completed"]