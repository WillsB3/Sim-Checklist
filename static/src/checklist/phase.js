(function () {

	'use strict';

	// checklist detail page
	// =============================================================================
	angular.module('checklist.phase', [
			'ui.router',
			'checklist.common.constants',
			'checklist.common.services',
			'LocalStorageModule'
		])

		// configure routes
		// =============================================================================
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

				.state('checklist-phase', {
					parent: 'checklist-detail',
					url: '/phase/:phaseSlug',
					templateUrl: 'static/src/checklist/phase.html',
					controller: 'ChecklistPhaseCtrl as phaseCtrl',
					resolve: {
						phaseIndex: function ($stateParams, checklistData) {
							var phaseIndex = _.findIndex(checklistData.phases, function (value) {
								return value.slug === $stateParams.phaseSlug;
							});

							return phaseIndex;
						},
						phaseData: function (phaseIndex, checklistData) {
							return checklistData.phases[phaseIndex];
						},
						phaseRunData: function (runData, phaseIndex) {
							return runData.phases[phaseIndex];
						}
					}
				});
		})

		// application run block
		// =============================================================================
		.run(function () {
			console.log('checklist.phase module running...');
		})

		.controller('ChecklistPhaseCtrl', function ($scope, $state, $stateParams, checklistData, phaseIndex, phaseData, phaseRunData, STEP_STATES, STEP_STATE_ORDER, ChecklistRunService) {

			this.initialize = function () {
				$scope.$watch('run.phases[' + phaseIndex + ']', this.onRunDataModified.bind(this), true);
			};

			this.onRunDataModified = function (newValue, oldValue) {
				console.warn('phaseCtrl:onPhaseRunDataModified()', newValue, oldValue);
				$scope.phaseRun = this.getPhaseRunData($scope.run);
				this.updateProgress();
				ChecklistRunService.saveRun($scope.run);
			};

			this.getPhaseRunData = function (runData) {
				return runData.phases[phaseIndex];
			};

			this.getProgressStyles = function () {
				var styles = {};
				var prefixed = Modernizr.prefixed('transform');
				var css = prefixed.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
				styles[css] = 'translateX(' + $scope.progress.toFixed(2) + '%)';
				return styles;
			};

			this.updateProgress = function () {
				var totalSteps = $scope.phaseRun.steps.length;
				var completedSteps = _.filter($scope.phaseRun.steps, function (step) {
					return step.state !== STEP_STATES.INITIAL;
				});

				$scope.progress = completedSteps.length / totalSteps * 100;
				$scope.progressStyles = this.getProgressStyles();
			};

			this.getPrevPhaseSlug = function () {
				var currentPhaseIndex;
				var nextPhaseConfig;
				var nextPhaseIndex;
				var nextPhaseSlug;
				var numPhases = $scope.checklist.phases.length;

				currentPhaseIndex = _.findIndex($scope.checklist.phases, function (phase) {
					return phase.id === $scope.phase.id;
				});

				nextPhaseIndex = currentPhaseIndex - 1;

				if (currentPhaseIndex === 0) {
					return;
				}

				nextPhaseConfig = $scope.checklist.phases[nextPhaseIndex];

				return nextPhaseConfig.slug;
			};

			this.getNextPhaseSlug = function () {
				var currentPhaseIndex;
				var nextPhaseConfig;
				var nextPhaseIndex;
				var nextPhaseSlug;
				var numPhases = $scope.checklist.phases.length;

				currentPhaseIndex = _.findIndex($scope.checklist.phases, function (phase) {
					return phase.id === $scope.phase.id;
				});

				nextPhaseIndex = currentPhaseIndex + 1;

				if (currentPhaseIndex === numPhases - 1) {
					return;
				}

				nextPhaseConfig = $scope.checklist.phases[nextPhaseIndex];

				return nextPhaseConfig.slug;
			};

			this.toggleStepState = function (stateObject, direction) {
				var stateKey = _.findKey(STEP_STATES, function (value, key) { return value === stateObject.state; });
				var currentIndex = STEP_STATE_ORDER.indexOf(stateKey);
				var newIndex;

				if (direction === 'next') {
					newIndex = currentIndex + 1;
					newIndex = newIndex % STEP_STATE_ORDER.length;
				} else {
					newIndex = currentIndex - 1;
					if (newIndex === -1) {
						newIndex = STEP_STATE_ORDER.length - 1;
					}
				}

				stateObject.state = STEP_STATES[STEP_STATE_ORDER[newIndex]];

				this.updateProgress();
			};

			/////////////
			// Scope API
			/////////////

			$scope.phase = phaseData;
			$scope.phaseRun = phaseRunData;
			$scope.phaseIndex = phaseIndex;
			$scope.progress = 0;

			this.initialize();
		});

}());
