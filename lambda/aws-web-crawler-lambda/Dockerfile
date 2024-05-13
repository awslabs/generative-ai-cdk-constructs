FROM public.ecr.aws/sam/build-nodejs20.x

WORKDIR /asset
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx tsc
RUN mv dist/* . && rm -rf dist 