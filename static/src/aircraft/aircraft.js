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
		.controller('AircraftListCtrl', ['$scope', '$http', function ($scope, $http) {
			$http
				.get('/static/dummy_data/aircraft/all-aircraft.json')
				.success(function (data) {
					$scope.aircraft = data.aircraft;
				});
		}])

		// FIXME: WIP.
		.factory('Aircraft', ['$resource', function ($resource) {
			return $resource('/static/dummy_data/aircraft/');
		}]);
}());
