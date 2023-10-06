FROM amazon/aws-lambda-python:latest

# Installs python, removes cache file to make things smaller
RUN yum update -y && \
    yum install -y python3 python3-dev python3-pip gcc git && \
    rm -Rf /var/cache/yum

# Copies requirements.txt file into the container
COPY requirements.txt prompt.json ./
COPY nltk_data ./
# Installs dependencies found in your requirements.txt file
RUN pip install -r requirements.txt

# Be sure to copy over the function itself!
# Goes last to take advantage of Docker caching.
# COPY main.py ./
# COPY whiskeylangchainfunction ./whiskeylangchainfunction
# COPY llms ./llms
# COPY claims_agent ./claims_agent
COPY . .

# Points to the handler function of your lambda function
CMD ["index.handler"]