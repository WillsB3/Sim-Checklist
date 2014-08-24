module.exports = function(grunt, options) {

	'use strict';

	// custom createConfig script for replacing Django {{STATIC_URL}} references
	// when building config for concat and cssmin
	var path = require('path');
	debugger;

	function createDjangoStaticConcatConfig(context, block) {
		debugger;
		var staticPattern = /\{\{\s*STATIC_URL\s*\}\}/;
		var cfg = {
			files: []
		};

		block.dest = block.dest.replace(staticPattern, '');
		var outfile = path.join(context.outDir, block.dest);

		// Depending whether or not we're the last of the step we're not going to output the same thing
		var files = {
			dest: outfile,
			src: []
		};

		context.inFiles.forEach(function(f) {
			files.src.push(path.join(context.inDir, f.replace(staticPattern, '')));
		});
		cfg.files.push(files);
		context.outFiles = [block.dest];

		return cfg;
	}

	return {
		html: 'simchecklist/templates/core/base.html',
		options: {
			dest: '<%= build.root %>',
			staging: '<%= tmp.root %>',
			flow: {
				steps: {
					css: [{
						name: 'preprocess_css',
						createConfig: createDjangoStaticConcatConfig
					}, 'concat', 'cssmin'],
					js: [{
						name: 'preprocess_js',
						createConfig: createDjangoStaticConcatConfig
					}, 'concat', 'uglifyjs']
				},
				post: {}
			}
		}
	};
};
