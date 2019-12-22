FROM node:alpine

WORKDIR /usr/src/facerecon_api

COPY ./ ./

RUN npm install

CMD ["npm", "start"]