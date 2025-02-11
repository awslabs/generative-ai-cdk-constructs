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

FROM public.ecr.aws/sam/build-python3.13:1.132.0-20241211194230

RUN mkdir /asset
RUN pip install uv
COPY . .
RUN rm -rf dist/*
ENV UV_PYTHON_PREFERENCE=only-system
ENV UV_LINK_MODE=copy
ENV UV_FROZEN=true
RUN --mount=type=cache,target=/root/.cache/uv uv run pytest
RUN --mount=type=cache,target=/root/.cache/uv uv build
RUN --mount=type=cache,target=/root/.cache/uv uv pip install --reinstall --compile-bytecode --target /asset dist/*.whl

CMD ["echo", "Build completed"]

#checkov:skip=CKV_DOCKER_2:This is used for build only
#checkov:skip=CKV_DOCKER_3:This is used for build only