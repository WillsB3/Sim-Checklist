(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist', [
			'ngAnimate',
			'ui.router',
			'ngTouch',
			'angular-loading-bar',
			'checklist.common.directives',
			'checklist.aircraft',
			'checklist.checklists',
			'checklist.detail',
			'checklist.phase'
		])

		// configure routes
		// =============================================================================
		.config(['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
			cfpLoadingBarProvider.includeSpinner = false;
			$urlRouterProvider.otherwise("/aircraft");
		}])

		// application run block
		// =============================================================================
		.run(function ($templateCache) {
			console.log('simchecklist application module running...');
		});

}());
