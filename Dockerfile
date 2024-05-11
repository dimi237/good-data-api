FROM node:16-alpine

COPY package*.json /tmp/

RUN cd /tmp && npm install --omit=dev --unsafe-perm=true && npm i -g typescript && npm i ts-node --save-dev

COPY tsconfig.json /tmp/

COPY src /tmp/src

COPY scripts /tmp/scripts

RUN cd /tmp && tsc -p . 



FROM node:16-alpine

RUN mkdir -p /usr/src/good-data-api 

COPY --from=0 /tmp/package*.json /usr/src/good-data-api/

COPY --from=0 /tmp/node_modules /usr/src/good-data-api/node_modules

COPY --from=0 /tmp/dist /usr/src/good-data-api/

COPY src/envs /usr/src/good-data-api/src/envs

RUN mkdir -p /usr/src/good-data-api/uploads

COPY src/modules/notifications/templates /usr/src/good-data-api/src/modules/notifications/templates

WORKDIR  /usr/src/good-data-api

EXPOSE 3000

CMD ["npm", "run", "start:prod"]