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
					url: "/aircraft/:aircraftId/checklist/:checklistId",
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
		.controller('ChecklistDetailCtrl', function ($scope, $stateParams, ChecklistService) {
			var phasesPromises;

			console.info('Aircraft ID: ', $stateParams.aircraftId);

			// phasesPromises = $http
			// 	.get('/static/dummy_data/aircraft/4/checklists/airline2sim-checklist.json')
			// 	.success(function (phases) {
			// 		$scope.phases = phases;
			// 	});

			ChecklistService.query(function (data) {
				console.info('checklist data:', data);
				$scope.phases = data.results;
			});

			console.log($scope.phases);
		})

		.factory('ChecklistService', function ($resource) {
			return $resource('/api/checklists', {}, {
				query: { method: "GET", isArray: false }
			});
		});

}());
