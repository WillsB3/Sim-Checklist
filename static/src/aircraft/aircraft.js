(function () {

	'use strict';

	// aircraft-list.js
	// create the feature module
	// =============================================================================
	angular.module('checklist.aircraft', ['ui.router'])
		
		// configure routes
		// =============================================================================
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

				// url will be /map
				.state('aircraft', {
					url: "/aircraft",
					templateUrl: "static/src/aircraft/aircraft.html",
					controller: 'AircraftListCtrl'
				});

			$urlRouterProvider.otherwise("/aircraft");
		})

		// module run block
		// =============================================================================
		.run(function () {
			console.log('checklist.aircraft module running...');
		})

		// our controller for the map
		// =============================================================================
		.controller('AircraftListCtrl', ['$scope', , function ($scope, $http) {
			$http
				.get('/static/dummy_data/aircraft/all-aircraft.json')
				.success(function (data) {
					$scope.aircraft = data.aircraft;
				});
		}]);
}());
