(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist.detail', ['ui.router'])
		
		// configuring our routes 
		// =============================================================================
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

				// url will be /map
				.state('detail', {
					url: "/detail",
					templateUrl: "static/src/checklist/checklist.html",
					controller: 'ChecklistDetailCtrl'
				});

			$urlRouterProvider.otherwise("/detail");
		})

		// application run block
		// =============================================================================
		.run(function () {
			console.log('checklist.detail module running...');
		})

		// our controller for the map
		// =============================================================================
		.controller('ChecklistDetailCtrl', ['$scope', '$http', function ($scope, $http) {
			var phasesPromises;

			phasesPromises = $http
				.get('/static/dummy_data/aircraft/4/checklists/airline2sim-checklist.json')
				.success(function (phases) {
					$scope.phases = phases;
				});

			console.log($scope.phases);
		}]);

}());
