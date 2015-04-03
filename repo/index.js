'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('You called the Metal subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    this.fs.copy(this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig'));

    this.fs.copy(this.templatePath('gitignore'),
      this.destinationPath('.gitignore'));

    this.fs.copyTpl(this.templatePath('_bower.json'),
        this.destinationPath('bower.json'));

    this.fs.copyTpl(this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'));

    this.fs.copyTpl(this.templatePath('_karma.conf.js'),
        this.destinationPath('karma.conf.js'));

    this.fs.copyTpl(this.templatePath('_package.json'),
        this.destinationPath('package.json'));

    this.fs.copyTpl(this.templatePath('_README.md'),
        this.destinationPath('README.md'));
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
