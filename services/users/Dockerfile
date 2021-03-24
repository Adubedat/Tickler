FROM node:14

WORKDIR /opt/app

RUN npm config set registry http://registry.npmjs.org
RUN npm install

CMD npm run start:dev