FROM node:9

ENV NPM_CONFIG_LOGLEVEL warn
ENV APP_DIR /app

ADD . $APP_DIR
WORKDIR $APP_DIR

RUN ["yarn", "--frozen-lockfile", "--non-interactive"]

ENV NODE_ENV production

CMD ["yarn", "start"]
