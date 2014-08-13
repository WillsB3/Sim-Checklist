(function () {

	'use strict';

	// checklists page
	// =============================================================================
	angular.module('checklist.checklists', ['ui.router', 'checklist.common.services'])

		// configure routes
		// =============================================================================
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

				.state('checklist-list', {
					url: "/aircraft/:aircraftId/checklists",
					templateUrl: "static/js/checklists/checklists.html",
					controller: 'ChecklistListCtrl'
				});

		})

		// application run block
		// =============================================================================
		.run(function () {
			console.log('checklist.checklists module running...');
		})

		// our controller for the map
		// =============================================================================
		.controller('ChecklistListCtrl', function ($scope, $stateParams, ChecklistService) {
			var aircraftId = $stateParams.aircraftId;

			$scope.checklists = null;

			console.info('Aircraft ID: ', aircraftId);

			ChecklistService.query({ 'aircraft': aircraftId }, function (data) {
				console.info('checklists for aircraft id: ', aircraftId, data);
				$scope.checklists = data.results;
			});
		});

}());
