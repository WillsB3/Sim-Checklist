(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist', ['checklist.aircraft', 'checklist.detail', 'angular-loading-bar', 'ngAnimate', 'ui.router'])

		// configure routes
		// =============================================================================
		.config(['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
			cfpLoadingBarProvider.includeSpinner = false;
			$urlRouterProvider.otherwise("/aircraft");
		}])

		// application run block
		// =============================================================================
		.run(function () {
			console.log('simchecklist application module running...');
		});

}());
