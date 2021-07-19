FROM node:lts-buster-slim

# Create app directory
WORKDIR /usr/src/app

# RUN apt-get update

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci

COPY . /usr/src/app

EXPOSE 8900

CMD [ "npm", "run", "dev" ]