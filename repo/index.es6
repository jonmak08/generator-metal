'use strict';

var _      = require('lodash');
var chalk  = require('chalk');
var path   = require('path');
var yosay  = require('yosay');
var Base   = require('yeoman-generator').generators.Base;

class RepoGenerator extends Base {
	initializing() {
		this.log(yosay(`Welcome, let's generate a ${chalk.green('Metal')} project!`));
		this.sourceRoot(path.join(__dirname, '../templates'));
	}

	prompting() {
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
			this.capitalizeName = _.capitalize(props.componentName);
			this.lowercaseName = props.componentName.toLowerCase();

			this.repoName = props.repoName;
			this.repoOwner = props.repoOwner;
			this.repoDescription = props.repoDescription;

			done();
		}.bind(this));
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('examples/_index.html'),
			this.destinationPath('examples/index.html'),
			{
				capitalizeName: this.capitalizeName,
				lowercaseName: this.lowercaseName
			}
		);

		this.fs.copy(
			this.templatePath('src/jshintrc'),
			this.destinationPath('src/.jshintrc')
		);

		this.fs.copyTpl(
			this.templatePath('src/_Boilerplate.js'),
			path.join(this.destinationRoot(), 'src', this.capitalizeName + '.js'),
			{
				capitalizeName: this.capitalizeName,
				lowercaseName: this.lowercaseName
			}
		);

		this.fs.copyTpl(
			this.templatePath('src/_Boilerplate.soy'),
			path.join(this.destinationRoot(), 'src', this.capitalizeName + '.soy'),
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
	}

	install() {
		var self = this;

		if (!this.options['skip-install']) {
			this.installDependencies({
				skipInstall: true,
				callback: function() {
					self.spawnCommand('gulp', ['build']);
				}
			});
		}
	}
}

module.exports = RepoGenerator;
