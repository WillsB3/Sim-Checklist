(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist', [
			'ngAnimate',
			'ui.router',
			'ngTouch',
			'checklist.common.directives',
			'checklist.aircraft',
			'checklist.checklists',
			'checklist.detail',
			'checklist.phase',
			'angular-loading-bar'
		])

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
