(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist.detail', ['ui.router'])
		
		// configure routes 
		// =============================================================================
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

				.state('checklist_detail', {
					url: "/aircraft/:aircraftId/checklist",
					templateUrl: "static/src/checklist/checklist.html",
					controller: 'ChecklistDetailCtrl'
				});

		})

		// application run block
		// =============================================================================
		.run(function () {
			console.log('checklist.detail module running...');
		})

		// our controller for the map
		// =============================================================================
		.controller('ChecklistDetailCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
			var phasesPromises;

			console.info('Aircraft ID: ', $stateParams.aircraftId);

			phasesPromises = $http
				.get('/static/dummy_data/aircraft/4/checklists/airline2sim-checklist.json')
				.success(function (phases) {
					$scope.phases = phases;
				});

			console.log($scope.phases);
		}])

		.factory('Checklist', ['$resource', function ($resource) {
			return $resource('/static/dummy_data/aircraft/4/checklists/airline2sim-checklist.json');
		}]);

}());
