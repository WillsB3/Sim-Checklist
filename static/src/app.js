(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist', ['checklist.detail'])

		// application run block
		// =============================================================================
		.run(function () {
			console.log('simchecklist application module running...');
		});

}());
