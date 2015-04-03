'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('metal:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompt({
        componentName: 'boilerplate'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/.jshintrc',
      'src/Boilerplate.js',
      'src/Boilerplate.soy',
      'test/.jshintrc',
      'test/Boilerplate.js'
    ]);
  });
});
