(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist', ['checklist.aircraft', 'checklist.detail', 'angular-loading-bar', 'ngAnimate', 'ui.router'])

		// configure routes
		// =============================================================================
		.config(function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise("/aircraft");
		})

		// application run block
		// =============================================================================
		.run(function () {
			console.log('simchecklist application module running...');
		});

}());
