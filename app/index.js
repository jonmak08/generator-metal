'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay('Welcome to ' + chalk.green('Metal') + ' Generator!'));

    var prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'What\'s your component name?',
      validate: function(input) {
        if (!input) {
          return 'You need to provide a component name.';
        }

        return true;
      }
    }];

    this.prompt(prompts, function (props) {
      this.componentName = props.componentName;

      done();
    }.bind(this));
  },

  writing: {
    source: function () {
      this.fs.copy(this.templatePath('src/jshintrc'),
        this.destinationPath('src/.jshintrc'));

      this.fs.copy(this.templatePath('src/_Boilerplate.js'),
        this.destinationPath('src/Boilerplate.js'));

      this.fs.copy(this.templatePath('src/_Boilerplate.soy'),
        this.destinationPath('src/Boilerplate.soy'));
    },

    test: function () {
      this.fs.copy(this.templatePath('test/jshintrc'),
        this.destinationPath('test/.jshintrc'));

      this.fs.copy(this.templatePath('test/_Boilerplate.js'),
        this.destinationPath('test/Boilerplate.js'));
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
