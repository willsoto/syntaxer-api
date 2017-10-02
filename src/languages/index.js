const express = require('express');
const { ScopeSelector } = require('first-mate');

const router = express.Router();

const languages = {
  babel: require('./babel')
};

router.get('/:language', function(req, res) {
  const { language } = req.params;

  if (!(language in languages)) {
    res.status(404).json({
      message: 'Language not found.'
    });
  }

  const tokenized = languages[language];

  res.json({
    tokenized: tokenized.map(line => {
      return line.map(token => {
        return {
          ...token,
          selectors: token.scopes.map(scope =>
            new ScopeSelector(scope)
              .toCssSyntaxSelector()
              .split('.')
              .join(' ')
              .trim()
          )
        };
      });
    })
  });
});

module.exports = router;
