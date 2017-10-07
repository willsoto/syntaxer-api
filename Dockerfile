FROM node:8

ENV NPM_CONFIG_LOGLEVEL warn
ENV APP_DIR /app
ENV NODE_ENV production

ADD . $APP_DIR
WORKDIR $APP_DIR

RUN ["npm", "install"]
