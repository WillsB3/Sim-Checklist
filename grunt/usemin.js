module.exports = function(grunt, options) {

	'use strict';

	return {
		html: '<%= build.templates %>/base.html',
		options: {
			assetsDirs: '<%= build.root %>',
			blockReplacements: {
				css: function (block) {
					var media = block.media ? ' media="' + block.media + '"' : '';
					return '<link rel="stylesheet" href="/static/' + block.dest + '"' + media + '>';
				},
				js: function(block) {
					var defer = block.defer ? 'defer ' : '';
					var async = block.async ? 'async ' : '';
					return '<script ' + defer + async + 'src="/static/' + block.dest + '"><\/script>';
				}
			}
		}
	};
};
