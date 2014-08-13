(function () {

	'use strict';

	// checklist detail page
	// =============================================================================
	angular.module('checklist.detail', [
			'ui.router',
			'checklist.common.services'
		])

		// configure routes
		// =============================================================================
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

				.state('checklist-detail', {
					url: '/aircraft/:aircraftId',
					templateUrl: 'static/js/checklist/checklist.html',
					controller: 'ChecklistDetailCtrl as checklistCtrl',
					resolve: {
						checklistData: function($stateParams, ChecklistService) {
							console.info('fetching checklist data...');
							return ChecklistService.get({ id: $stateParams.aircraftId }).$promise;
						},
						runData: function(checklistData, ChecklistRunService) {
							console.info('fetching checklist run data...');

							var run = ChecklistRunService.getRun(checklistData.id);

							if (!run) {
								run = ChecklistRunService.newRun(checklistData);
							}

							return run;
						}
					}
				});

		})

		// application run block
		// =============================================================================
		.run(function () {
			console.log('checklist.detail module running...');
		})

		// our controller for the map
		// =============================================================================
		.controller('ChecklistDetailCtrl', function ($scope, $state, checklistData, runData, ChecklistRunService) {

			console.info('ChecklistDetailCtrl');

			// Scope properties
			// =============================
			$scope.checklist = checklistData;
			$scope.run = runData;

			// Scope watchers
			// =============================

			// Controller functions
			// =============================
			this.newRun = function () {
				$scope.run = ChecklistRunService.newRun($scope.checklist);
			};
		});

}());
