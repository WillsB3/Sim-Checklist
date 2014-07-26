(function () {

	'use strict';

	// app.js
	// create our angular app and inject dependencies
	// =============================================================================
	angular.module('checklist.detail', ['ui.router', 'checklist.common.services', 'LocalStorageModule'])

		.constant('STATES', {
			INITIAL: 'initial',
			CHECKED: 'checked',
			SKIPPED: 'skipped',
			FAILED: 'failed'
		})

		.constant('STATE_ORDER', ['INITIAL', 'CHECKED', 'SKIPPED', 'FAILED'])

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
		.controller('ChecklistDetailCtrl', function ($scope, $stateParams, ChecklistService, ChecklistRunService, STATES, STATE_ORDER) {

			console.info('Aircraft ID: ', $stateParams.aircraftId);
			console.info('Checklist ID: ', $stateParams.checklistId);

			ChecklistService.get({ id: $stateParams.checklistId }, function (checklistData) {
				$scope.checklist = checklistData;
				$scope.run = ChecklistRunService.newRun(checklistData);

				console.info('checklist data:', checklistData);
				console.warn('run data:', $scope.run);
			});

			$scope.toggleState = function (stateObject) {
				var stateKey = _.findKey(STATES, function (value, key) { return value === stateObject.state; });
				var currentIndex = STATE_ORDER.indexOf(stateKey);
				var nextIndex = currentIndex + 1;

				nextIndex = nextIndex % STATE_ORDER.length;
				stateObject.state = STATES[STATE_ORDER[nextIndex]];
			};

		})

		.service('ChecklistRunService', function checklistRunService(localStorageService, STATES) {

			var service = {};

			service.newRun = function (checklistData) {
				var run = {
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
							state: STATES.INITIAL
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

			service.saveRun = function (checklistId, run) {
				return localStorageService.set('checklist-run:' + checklistId, angular.toJson(run));
			};

			return service;
		});

}());
