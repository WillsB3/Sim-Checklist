module.exports = function(grunt) {
	require('load-grunt-config')(grunt, {
		init: true,
		data: {
			js: 'static/src',
			scss: 'static/scss',
			build: 'static/build',
			bower: 'static/bower_components'
		},
		loadGruntTasks: {
			pattern: 'grunt-*',
			config: require('./package.json'),
			scope: 'devDependencies'
		}
	});

	// Register tasks
	grunt.registerTask('build', [
		'clean:build',
		'sass',
		'copy:javascript',
		'modernizr'
	]);
};
