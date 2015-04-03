'use strict';

var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var path   = require('path');
var yosay  = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    var done = this.async();

    this.log(yosay('Welcome, let\'s generate a ' + chalk.green('Metal') + ' component!'));

    var prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'How do you want to name this component?',
      validate: function(input) {
        if (!input) {
          return 'You need to provide a component name.';
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

  writing: function() {
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

    this.fs.copy(this.templatePath('test/jshintrc'),
      this.destinationPath('test/.jshintrc'));

    this.fs.copyTpl(this.templatePath('test/_Boilerplate.js'),
      path.join(this.destinationRoot(), 'test', this.capitalizeName + '.js'),
      { capitalizeName: this.capitalizeName });
  }
});
