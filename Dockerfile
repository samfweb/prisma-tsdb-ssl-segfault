FROM node:18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package*.json /usr/src/app

# copy source files
RUN npm install

COPY . /usr/src/app
RUN npm run generate
