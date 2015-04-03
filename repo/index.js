'use strict';

var chalk  = require('chalk');
var path   = require('path');
var yeoman = require('yeoman-generator');
var yosay  = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.log(yosay('Welcome, let\'s generate a ' + chalk.green('Metal') + ' project!'));
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
      type: 'input',
      name: 'repoOwner',
      message: 'What\'s the GitHub username?',
      default: 'my-user',
      validate: function(input) {
        if (!input) {
          return 'You must provide a GitHub username.';
        }

        return true;
      }
    },
    {
      type: 'input',
      name: 'repoDescription',
      message: 'How would you describe this project?',
      default: 'My awesome Metal project'
    }];

    this.prompt(prompts, function (props) {
      this.repoName = props.repoName;
      this.repoOwner = props.repoOwner;
      this.repoDescription = props.repoDescription;

      this.capitalizeName = this._.capitalize(props.componentName);
      this.lowercaseName = props.componentName.toLowerCase();

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      {
        repoName: this.repoName,
        repoDescription: this.repoDescription
      }
    );

    this.fs.copyTpl(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      { lowercaseName: this.lowercaseName }
    );

    this.fs.copyTpl(
      this.templatePath('_karma.conf.js'),
      this.destinationPath('karma.conf.js')
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        repoName: this.repoName,
        repoOwner: this.repoOwner,
        repoDescription: this.repoDescription,
      }
    );

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      { repoName: this.repoName }
    );
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
