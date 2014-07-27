(function () {

	'use strict';

	// checklist detail page
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

				.state('checklist-detail', {
					url: '/aircraft/:aircraftId/checklist/:checklistId',
					templateUrl: 'static/src/checklist/checklist.html',
					controller: 'ChecklistDetailCtrl',
					resolve: {
						checklistData: function($stateParams, ChecklistService) {
							console.info('fetching checklist data...');
							return ChecklistService.get({ id: $stateParams.checklistId }).$promise;
						},
						runData: function($stateParams, $q, checklistData, ChecklistRunService) {
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
		.controller('ChecklistDetailCtrl', function ($scope, $state, $stateParams, checklistData, runData, ChecklistRunService, STATES, STATE_ORDER, slugify) {

			console.info('ChecklistDetailCtrl');
			// Scope properties
			// =============================
			$scope.checklist = checklistData;
			$scope.run = runData;

			// Scope watchers
			// =============================
			$scope.$watch('run', onRunDataModified, true);

			// Go to the first phase by default
			$state.go('checklist-phase', {
				phaseName: slugify(checklistData.phases[0].name)
			}, {
				location: 'replace'
			});

			// Controller functions
			// =============================
			function onRunDataModified (newValue, oldValue) {
				if (newValue) {
					ChecklistRunService.saveRun(newValue);
				}
			}

			function toggleStepState (stateObject) {
				var stateKey = _.findKey(STATES, function (value, key) { return value === stateObject.state; });
				var currentIndex = STATE_ORDER.indexOf(stateKey);
				var nextIndex = currentIndex + 1;

				nextIndex = nextIndex % STATE_ORDER.length;
				stateObject.state = STATES[STATE_ORDER[nextIndex]];
			}

			// Publish selected controller
			// functions to scope API.
			// =============================
			$scope.toggleState = toggleStepState;
		})

		.service('ChecklistRunService', function checklistRunService(localStorageService, STATES) {

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

			service.saveRun = function (runData) {
				return localStorageService.set('checklist-run:' + runData.checklistId, angular.toJson(runData));
			};

			return service;
		});

}());
