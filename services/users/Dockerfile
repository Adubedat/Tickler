FROM node:14

WORKDIR /opt/app

ARG environment
ENV ENVIRONMENT ${environment}

RUN npm install --production

CMD bash ./scripts/run.sh