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
					controller: 'ChecklistPhaseCtrl',
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

		.controller('ChecklistPhaseCtrl', function ($scope, $state, $stateParams, checklistData, phaseIndex, phaseData, phaseRunData, STEP_STATES, STEP_STATE_ORDER) {

			function initialize () {
				updateProgress();
			}

			function getProgressStyles () {
				var styles = {};
				var prefixed = Modernizr.prefixed('transform');
				var css = prefixed.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
				styles[css] = 'translateX(' + $scope.progress.toFixed(2) + '%)';
				return styles;
			}

			function updateProgress () {
				console.log(STEP_STATES);
				var totalSteps = $scope.phaseRun.steps.length;
				var completedSteps = _.filter($scope.phaseRun.steps, function (step) {
					return step.state !== STEP_STATES.INITIAL;
				});
				var numRemainingSteps = $scope.phaseRun.steps.length - completedSteps.length;

				$scope.progress = completedSteps.length / numRemainingSteps * 100;
				$scope.progressStyles = getProgressStyles() + $scope.progress + '%';
			}

			function getPrevPhaseSlug() {
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
			}

			function getNextPhaseSlug() {
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
			}

			function toggleStepState (stateObject, direction) {
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

				updateProgress();
			}

			initialize();

			/////////////
			// Scope API
			/////////////
			// $scope.STEP_STATES = STEP_STATES;
			// $scope.STEP_STATE_ORDER = STEP_STATE_ORDER;

			$scope.phase = phaseData;
			$scope.phaseRun = phaseRunData;
			$scope.phaseIndex = phaseIndex;

			$scope.prevPhaseSlug = getPrevPhaseSlug();
			$scope.nextPhaseSlug = getNextPhaseSlug();

			$scope.progress = 0;
			$scope.getProgressStyles = getProgressStyles;

			$scope.toggleState = toggleStepState;
		});

}());
