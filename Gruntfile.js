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
				scss: 'static/src/scss'
			},
			build: {
				root: 'static/build',
				assets: 'static/build/assets',
				css: 'static/build/css',
				js: 'static/build/js'
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
				css: 'static/tmp/css'
			}
		},
		loadGruntTasks: {
			pattern: 'grunt-*',
			config: require('./package.json'),
			scope: 'devDependencies'
		}
	});
};
