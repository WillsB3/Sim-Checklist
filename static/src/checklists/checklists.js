(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist.checklists', ['ui.router'])
		
		// configure routes 
		// =============================================================================
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

				.state('checklist_list', {
					url: "/aircraft/:aircraftId/checklists",
					templateUrl: "static/src/checklists/checklists.html",
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
		})

		.factory('ChecklistService', function ($resource) {
			return $resource('/api/checklists', {}, {
				query: { method: "GET", isArray: false }
			});
		});

}());