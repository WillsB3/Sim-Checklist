(function () {

	'use strict';

	// aircraft-list.js
	// create the feature module
	// =============================================================================
	angular.module('checklist.aircraft', ['ui.router', 'ngResource'])
		
		// configure routes
		// =============================================================================
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

				.state('aircraft_list', {
					url: "/aircraft",
					templateUrl: "static/src/aircraft/aircraft.html",
					controller: 'AircraftListCtrl'
				});

		})

		// module run block
		// =============================================================================
		.run(function () {
			console.log('checklist.aircraft module running...');
		})

		// our controller for the map
		// =============================================================================
		.controller('AircraftListCtrl', function ($scope, $http, AircraftService) {
			AircraftService.query(function (data) {
				console.info('aircraft data:', data);
				$scope.aircraft = data.results;
			});
		})

		.factory('AircraftService', function ($resource) {
			return $resource('/api/aircraft/:aircraftId', {}, {
				query: { method: "GET", isArray: false }
			});
		});
}());
