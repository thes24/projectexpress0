FROM node:14-alpine

ADD . /src
WORKDIR /src

RUN npm install -g pm2
RUN npm install

ENTRYPOINT ["pm2-runtime", "start", "ecosystem.config.js"]
