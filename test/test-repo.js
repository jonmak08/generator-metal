'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('metal:repo', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../repo'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        repoName: 'my-repo',
        repoOwner: 'my-user'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
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
