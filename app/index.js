'use strict';

var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var path   = require('path');
var yosay  = require('yosay');

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
      message: 'What\'s your component class name?',
      validate: function(input) {
        if (!input) {
          return 'You need to provide a component class name.';
        }

        return true;
      }
    }];

    this.prompt(prompts, function (props) {
      this.capitalizeName = this._.capitalize(props.componentName);
      this.lowercaseName = props.componentName.toLowerCase();

      done();
    }.bind(this));
  },

  writing: {
    source: function () {
      this.fs.copy(this.templatePath('src/jshintrc'),
        this.destinationPath('src/.jshintrc'));

      this.fs.copyTpl(this.templatePath('src/_Boilerplate.js'),
        path.join(this.destinationRoot(), 'src', this.capitalizeName + '.js'),
        { capitalizeName: this.capitalizeName,
          lowercaseName: this.lowercaseName
        });

      this.fs.copyTpl(this.templatePath('src/_Boilerplate.soy'),
        path.join(this.destinationRoot(), 'src', this.capitalizeName + '.soy'),
        { capitalizeName: this.capitalizeName });
    },

    test: function () {
      this.fs.copy(this.templatePath('test/jshintrc'),
        this.destinationPath('test/.jshintrc'));

      this.fs.copyTpl(this.templatePath('test/_Boilerplate.js'),
        path.join(this.destinationRoot(), 'test', this.capitalizeName + '.js'),
        { capitalizeName: this.capitalizeName });
    }
  }
});
