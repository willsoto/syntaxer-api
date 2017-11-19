const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const expressWinston = require('express-winston');
const epimetheus = require('epimetheus');

const pkg = require('../package.json');

const logger = require('./logger');

const app = express();

app.use(cors());
// Enable pre-flight OPTIONS
app.options('*', cors());

// Prometheus metrics
epimetheus.instrument(app);

const serverOpts = {
  port: process.env.PORT || 8080
};

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

app.use('/health-check', function(req, res) {
  return res.json({
    status: 'healthy',
    version: pkg.version
  });
});

app.listen(serverOpts.port, function() {
  logger.log({
    level: 'info',
    message: `Server started at http://localhost:${serverOpts.port}`
  });
});
