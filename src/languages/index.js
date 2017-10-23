const express = require('express');

const router = express.Router();

const languages = {
  babel: require('./babel'),
  javascript: require('./javascript')
};

router.get('/:language', function(req, res) {
  const { language } = req.params;

  if (!(language in languages)) {
    res.status(404).json({
      message: 'Language not found.'
    });
  }

  const tokens = languages[language];

  res.json({
    tokens: tokens
  });
});

module.exports = router;
