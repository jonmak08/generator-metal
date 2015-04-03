'use strict';

var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var yosay  = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    var done = this.async();

    this.log(yosay('Welcome, let\'s generate a ' + chalk.green('Metal') + ' project!'));

    var prompts = [{
      type: 'input',
      name: 'repoName',
      message: 'What\'s the GitHub repository name?',
      validate: function(input) {
        if (!input) {
          return 'You need to provide a GitHub repository name.';
        }

        return true;
      }
    }];

    this.prompt(prompts, function (props) {
      this.repoName = props.repoName;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig'));

    this.fs.copy(this.templatePath('gitignore'),
      this.destinationPath('.gitignore'));

    this.fs.copyTpl(this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        { repoName: this.repoName });

    this.fs.copyTpl(this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'));

    this.fs.copyTpl(this.templatePath('_karma.conf.js'),
        this.destinationPath('karma.conf.js'));

    this.fs.copyTpl(this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { repoName: this.repoName });

    this.fs.copyTpl(this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        { repoName: this.repoName });
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
