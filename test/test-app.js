'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('metal:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompt({
        componentName: 'MyComponent',
        templateLang: 'Jade'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/.jshintrc',
      'src/MyComponent.js',
      'src/MyComponent.jade',
      'test/.jshintrc',
      'test/MyComponent.js'
    ]);
  });
});
