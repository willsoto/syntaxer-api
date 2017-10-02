const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use('/api/languages', require('./languages'));

app.listen(3000, function() {
  console.log('Listening on :3000');
});
