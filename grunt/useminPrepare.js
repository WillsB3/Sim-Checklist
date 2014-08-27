module.exports = function(grunt, options) {

	'use strict';

	return {
		html: '<%= src.templates %>/base.html',
		options: {
			dest: '<%= build.root %>',
			root: 'ROOT',
			staging: '<%= tmp.root %>'
		}
	};
};
