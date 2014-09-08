/* global module */
module.exports = function(grunt) {
	'use strict';

	require('load-grunt-config')(grunt, {
		init: true,
		data: {
			src: {
				root: 'static/src',
				assets: 'static/src/assets',
				bower: 'static/src/bower_components',
				js: 'static/src/js',
				scss: 'static/src/scss',
				templates: 'simchecklist/core/templates'
			},
			build: {
				root: 'static/build',
				assets: 'static/build/assets',
				css: 'static/build/css',
				js: 'static/build/js',
				templates: 'simchecklist/core/templates'
			},
			local: {
				root: 'static/local',
				assets: 'static/local/assets',
				css: 'static/local/css',
				js: 'static/local/js'
			},
			tmp: {
				root: 'static/tmp',
				assets: 'static/tmp/assets',
				bower: 'static/tmp/bower_components',
				css: 'static/tmp/css',
				js: 'static/tmp/js'
			}
		},
		loadGruntTasks: {
			pattern: 'grunt-*',
			config: require('./package.json'),
			scope: 'devDependencies'
		}
	});

	grunt.loadNpmTasks('grunt-debug-task');
};
