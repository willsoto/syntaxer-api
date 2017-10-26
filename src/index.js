const express = require('express');
const morgan = require('morgan');
const expressWinston = require('express-winston');
const { register, collectDefaultMetrics } = require('prom-client');

const version = require('../package.json').version;

const logger = require('./logger');

const app = express();
collectDefaultMetrics();

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(
    expressWinston.logger({
      winstonInstance: logger,
      expressFormat: true
    })
  );
} else {
  app.use(morgan('dev'));
}

app.use('/api/languages', require('./languages'));
app.use('/api/syntax-themes', require('./syntax-themes'));

app.use('/api/health-check', function(req, res) {
  return res.json({
    status: 'healthy',
    version: version
  });
});

app.use('/api/metrics', function(req, res) {
  res.end(register.metrics());
});

app.listen(PORT, function() {
  logger.log({
    level: 'info',
    message: `Server started on ${PORT}`
  });
});
