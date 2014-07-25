(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist.detail', ['ui.router', 'checklist.common.services'])
		
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

			console.info('Aircraft ID: ', $stateParams.aircraftId);
			console.info('Checklist ID: ', $stateParams.checklistId);

			ChecklistService.get({ id: $stateParams.checklistId }, function (data) {
				console.info('checklist data:', data);
				$scope.checklist = data;
			});

		});

}());
