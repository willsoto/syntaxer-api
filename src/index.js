const express = require('express');
const morgan = require('morgan');
const version = require('../package.json').version;

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use('/api/languages', require('./languages'));
app.use('/api/syntax-themes', require('./syntax-themes'));

app.use('/api/health-check', function(req, res) {
  return res.json({
    status: 'healthy',
    version: version
  });
});

app.listen(PORT, function() {
  // eslint-disable-next-line no-console
  console.log('Listening on :3000');
});
