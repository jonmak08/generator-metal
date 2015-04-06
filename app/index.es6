'use strict';

var _      = require('lodash');
var chalk  = require('chalk');
var path   = require('path');
var yosay  = require('yosay');
var Base   = require('yeoman-generator').generators.Base;

class ComponentGenerator extends Base {
	initializing() {
		this.log(yosay(`Welcome, let's generate a ${chalk.green('Metal')} component!`));
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
		}];

		this.prompt(prompts, function (props) {
			this.capitalizeName = _.capitalize(props.componentName);
			this.lowercaseName = props.componentName.toLowerCase();

			done();
		}.bind(this));
	}

	writing() {
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
	}
}

module.exports = ComponentGenerator;
