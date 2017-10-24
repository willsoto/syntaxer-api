const path = require('path');

const winston = require('winston');

const { NODE_ENV } = process.env;

const logger = new winston.createLogger({
  transports: [new winston.transports.Console()]
});

if (NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({
      format: winston.format.json(),
      filename: path.join('log', 'combined.log')
    })
  );
}

module.exports = logger;
