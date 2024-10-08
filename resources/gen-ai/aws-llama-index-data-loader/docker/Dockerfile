ARG PYTHON_TAG="latest"
# RedundantTargetPlatform check violation
# https://docs.docker.com/reference/build-checks/redundant-target-platform/
FROM --platform=${BUILDPLATFORM} public.ecr.aws/docker/library/python:${PYTHON_TAG} AS build

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get -y install dnsutils
ENV PYTHONUNBUFFERED=1
# TODO: set verbosity by argument rather than hardcoded.
ENV PYTHONVERBOSE=0 
# 3

# matches the current machine. (e.g. linux/amd64)
RUN echo "BUILDPLATFORM - matches the current machine ${BUILDPLATFORM}"
RUN echo ${BUILDOS}
RUN echo ${BUILDARCH}
RUN echo ${BUILDVARIANT}
RUN echo "TARGETPLATFORM — The value set with --platform flag on build ${TARGETPLATFORM}"
RUN echo ${TARGETOS}
RUN echo ${TARGETARCH}
RUN echo ${TARGETVARIANT}

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir --requirement requirements.txt

COPY . .

RUN chmod a+x runner.sh
RUN chmod a+x healthcheck.sh

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "/usr/src/app/healthcheck.sh" ]

ENTRYPOINT [ "/usr/src/app/runner.sh", "/usr/src/app/sqs_consumer.py" ]