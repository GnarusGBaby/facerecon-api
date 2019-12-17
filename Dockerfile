FROM node:carbon

WORKDIR /usr/src/facerecon_api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]