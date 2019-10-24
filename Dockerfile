FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
COPY settings.json ./
COPY secrets secrets/

RUN npm install
COPY src src/

ENV PORT=3080

EXPOSE 3080
CMD [ "node", "./src/index.js" ]