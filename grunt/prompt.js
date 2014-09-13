module.exports = function(grunt, options) {

	'use strict';

	var semver = require('semver');
	var chalk = require('chalk');

	return {
		bump: {
			options: {
				questions: [
					{
						config:  'bump.increment',
						type:    'list',
						message: 'Bump version from ' + chalk.cyan('<%= package.version %>') + ' to:',
						choices: [
							{
								value: 'build',
								name:  chalk.yellow('Build: <%= pkg.version %>-?') +
									' Unstable, betas, and release candidates.'
							},
							{
								value: 'patch',
								name:  chalk.yellow('Patch:  ' + semver.inc(grunt.config('pkg.version'), 'patch')) +
									'   Backwards-compatible bug fixes.'
							},
							{
								value: 'minor',
								name:  chalk.yellow('Minor:  ' + semver.inc(grunt.config('pkg.version'), 'minor')) +
									'   Add functionality in a backwards-compatible manner.'
							},
							{
								value: 'major',
								name:  chalk.yellow('Major:  ' + semver.inc(grunt.config('pkg.version'), 'major')) +
									'   Incompatible API changes.'
							},
							{
								value: 'custom',
								name:  chalk.yellow('Custom: ?.?.?') +
									'   Specify version...'
							}
						]
					},
					{
						config:   'bump.version',
						type:     'input',
						message:  'What specific version would you like',
						when: function (answers) {
							return answers['bump.increment'] === 'custom';
						},
						validate: function (value) {
							var valid = semver.valid(value) && true;
							return valid || 'Must be a valid semver, such as 1.2.3-rc1. See ' +
								chalk.underline.blue('http://semver.org/') + ' for more details.';
						}
					},
					{
						config:  'bump.files',
						type:    'checkbox',
						message: 'What should get the new version:',
						choices: [
							{
								value:   'package',
								name:    'package.json' +
									(!grunt.file.isFile('package.json') ? chalk.grey(' file not found, will create one') : ''),
								checked: grunt.file.isFile('package.json')
							},
							{
								value:   'bower',
								name:    'bower.json' +
									(!grunt.file.isFile('bower.json') ? chalk.grey(' file not found, will create one') : ''),
								checked: grunt.file.isFile('bower.json')
							},
							{
								value:   'git',
								name:    'git tag',
								checked: grunt.file.isDir('.git')
							}
						]
					}
				]
			}
		}
	};
};
