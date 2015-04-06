'use strict';

var path    = require('path');
var assert  = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('metal:repo', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../repo'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        componentName: 'MyComponent',
        repoName: 'my-repo',
        repoOwner: 'my-user',
        repoDescription: 'My awesome Metal project'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'examples/index.html',
      'src/.jshintrc',
      'src/MyComponent.js',
      'src/MyComponent.soy',
      'test/.jshintrc',
      'test/MyComponent.js',
      '.editorconfig',
      '.gitignore',
      'bower.json',
      'gulpfile.js',
      'karma.conf.js',
      'package.json',
      'README.md'
    ]);
  });
});
