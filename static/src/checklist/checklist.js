(function () {

	'use strict';

	// checklist detail page
	// =============================================================================
	angular.module('checklist.detail', [
			'ui.router',
			'checklist.common.constants',
			'checklist.common.services',
			'LocalStorageModule'
		])

		// configure routes
		// =============================================================================
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

				.state('checklist-detail', {
					url: '/aircraft/:aircraftId',
					templateUrl: 'static/src/checklist/checklist.html',
					controller: 'ChecklistDetailCtrl',
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
			$scope.$watch('run', onRunDataModified, true);

			// Controller functions
			// =============================
			function onRunDataModified (newValue, oldValue) {
				if (newValue) {
					ChecklistRunService.saveRun(newValue);
				}
			}
		})

		.service('ChecklistRunService', function checklistRunService(localStorageService, STEP_STATES) {

			var service = {};

			service.newRun = function (checklistData) {
				var run = {
					checklistId: checklistData.id,
					id: Date.now(),
					phases: []
				};

				angular.forEach(checklistData.phases, function (phaseValue, phaseKey) {
					var checklistPhaseData = phaseValue;
					var runPhaseData = {
						steps: []
					};

					angular.forEach(phaseValue.steps, function (stepValue, stepKey) {
						runPhaseData.steps.push({
							id: stepValue.id,
							state: STEP_STATES.INITIAL
						});
					});

					run.phases.push(runPhaseData);
				});

				return run;
			};

			service.getRun = function (checklistId) {
				var runString = localStorageService.get('checklist-run:' + checklistId);

				if (runString) {
					return angular.fromJson(runString);
				} else {
					return undefined;
				}
			};

			service.saveRun = function (runData) {
				return localStorageService.set('checklist-run:' + runData.checklistId, angular.toJson(runData));
			};

			return service;
		});

}());
