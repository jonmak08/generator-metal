'use strict';

var chalk  = require('chalk');
var path   = require('path');
var yeoman = require('yeoman-generator');
var yosay  = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.log(yosay('Welcome, let\'s generate a ' + chalk.green('Metal') + ' component!'));
    this.sourceRoot(path.join(__dirname, '../templates'));
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'How do you want to name this component?',
      default: 'MyComponent',
      validate: function(input) {
        if (!input) {
          return 'You must provide a component name.';
        }

        return true;
      }
    },
    {
      type: 'list',
      name: 'templateLang',
      message: 'Which template language would you like to use?',
      choices: ['Soy', 'Handlebars', 'Jade'],
      default: 0
    }];

    this.prompt(prompts, function (props) {
      this.capitalizeName = this._.capitalize(props.componentName);
      this.lowercaseName = props.componentName.toLowerCase();

      this.templateLang = props.templateLang;

      done();
    }.bind(this));
  },

  writing: function() {
    var templateExt = '';

    if (this.templateLang === 'Soy') {
      templateExt = '.soy';
    } else if (this.templateLang === 'Handlebars') {
      templateExt = '.handlebars';
    } else if (this.templateLang === 'Jade') {
      templateExt = '.jade';
    }

    this.fs.copy(
      this.templatePath('src/jshintrc'),
      this.destinationPath('src/.jshintrc')
    );

    this.fs.copyTpl(
      this.templatePath('src/_Boilerplate.js'),
      path.join(this.destinationRoot(), 'src', this.capitalizeName + '.js'),
      { capitalizeName: this.capitalizeName,
        lowercaseName: this.lowercaseName
      }
    );

    this.fs.copyTpl(
      this.templatePath('src/_Boilerplate' + templateExt),
      path.join(this.destinationRoot(), 'src', this.capitalizeName + templateExt),
      { capitalizeName: this.capitalizeName }
    );

    this.fs.copy(
      this.templatePath('test/jshintrc'),
      this.destinationPath('test/.jshintrc')
    );

    this.fs.copyTpl(
      this.templatePath('test/_Boilerplate.js'),
      path.join(this.destinationRoot(), 'test', this.capitalizeName + '.js'),
      { capitalizeName: this.capitalizeName }
    );
  }
});
