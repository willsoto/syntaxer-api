const winston = require('winston');

const { NODE_ENV } = process.env;

const logger = new winston.createLogger();

if (NODE_ENV === 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.json()
    })
  );
}

module.exports = logger;
