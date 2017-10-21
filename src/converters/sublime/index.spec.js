const fs = require('fs');
const path = require('path');

const { expect } = require('chai');

const SublimeConverter = require('./');

const theme = fs.readFileSync(path.resolve(__dirname, 'index.mock.tmTheme'), 'utf8');

describe('SublimeConverter', function() {
  describe('scopes', function() {
    const converter = new SublimeConverter(theme);
    const result = converter.convert();

    result.scopes.forEach(scope => {
      it('contains a name', function() {
        expect(scope).to.have.property('name');
        expect(scope.name).to.not.be.empty;
      });

      it('contains a scope', function() {
        expect(scope).to.have.property('scope');
        expect(scope.scope).to.not.be.empty;
      });

      it('contains styles', function() {
        expect(scope).to.have.property('styles');
        expect(scope.styles).to.be.an('object');
      });
    });
  });
});
