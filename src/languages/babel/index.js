const fs = require('fs');
const { GrammarRegistry } = require('first-mate');

const registry = new GrammarRegistry();
const pathToGrammar = require.resolve('language-babel/grammars/Babel Language.json');
const grammar = registry.loadGrammarSync(pathToGrammar);

const pathToSample = require.resolve('./sample.txt');
const sample = fs.readFileSync(pathToSample, 'utf-8');

module.exports = grammar.tokenizeLines(sample);
