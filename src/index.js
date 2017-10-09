const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use('/api/languages', require('./languages'));
app.use('/api/syntax-themes', require('./syntax-themes'));

app.listen(3000, function() {
  // eslint-disable-next-line no-console
  console.log('Listening on :3000');
});
