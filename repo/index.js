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
      default: 'my-repo',
      validate: function(input) {
        if (!input) {
          return 'You must provide a GitHub repository name.';
        }

        return true;
      }
    },
    {
      name: 'repoOwner',
      message: 'What\'s the GitHub username?',
      default: 'my-user',
      validate: function(input) {
        if (!input) {
          return 'You must provide a GitHub username.';
        }

        return true;
      }
    }];

    this.prompt(prompts, function (props) {
      this.repoName = props.repoName;
      this.repoOwner = props.repoOwner;

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
        {
          repoName: this.repoName,
          repoOwner: this.repoOwner
        });

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
