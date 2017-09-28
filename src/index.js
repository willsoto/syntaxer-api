const express = require('express');
const morgan = require('morgan');
const { GrammarRegistry, ScopeSelector } = require('first-mate');
const _ = require('lodash');

const app = express();

app.use(morgan('dev'));

app.get('/api/tokens', function(req, res) {
  const registry = new GrammarRegistry();
  const grammar = registry.loadGrammarSync(require.resolve('language-javascript/grammars/javascript.cson'));

  const tokenized = grammar.tokenizeLines(`
    import foo from 'bar';

    const bar = () => {};
  `);

  res.json({
    tokenized: tokenized.map(line => {
      return line.map(token => {
        return {
          ...token,
          selectors: token.scopes.map(scope => {
            const syntaxSelector = new ScopeSelector(scope).toCssSyntaxSelector().split('.');

            return _(syntaxSelector)
              .uniq()
              .compact()
              .head();
          })
        };
      });
    })
  });
});

app.listen(3000, function() {
  console.log('Listening on :3000');
});
