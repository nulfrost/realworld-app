FROM node:alpine3.14 as BASE

WORKDIR /src/app

COPY package*.json /src/app/

RUN yarn
