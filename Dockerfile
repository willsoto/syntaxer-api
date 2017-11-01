FROM node:8

ENV NPM_CONFIG_LOGLEVEL warn
ENV APP_DIR /app
ENV NODE_ENV production
ENV PORT 8080

ADD . $APP_DIR
WORKDIR $APP_DIR

RUN ["yarn", "--frozen-lockfile", "--non-interactive"]

EXPOSE $PORT
