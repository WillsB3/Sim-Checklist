(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist', ['checklist.detail', 'angular-loading-bar', 'ngAnimate'])

		// application run block
		// =============================================================================
		.run(function () {
			console.log('simchecklist application module running...');
		});

}());
