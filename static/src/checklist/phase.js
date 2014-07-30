(function () {

	'use strict';

	// checklist detail page
	// =============================================================================
	angular.module('checklist.phase', ['ui.router', 'checklist.common.services', 'LocalStorageModule'])

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
						}
					}
				});

		})

		// application run block
		// =============================================================================
		.run(function () {
			console.log('checklist.phase module running...');
		})

		// our controller for the map
		// =============================================================================
		.controller('ChecklistPhaseCtrl', function ($scope, $state, $stateParams, checklistData, phaseIndex, phaseData) {

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

			console.info('ChecklistPhaseCtrl', $stateParams.phaseSlug);

			// If this state was activated without a specific phase parameter
			// supplied we can't do anything. Automatically redirect to the
			// first phase.
			if (!phaseData) {
				// Go to the first phase by default
				$state.go('checklist-phase', {
					phaseSlug: checklistData.phases[0].slug
				}, {
					location: 'replace'
				});

				return;
			}

			$scope.phase = phaseData;
			$scope.phaseIndex = phaseIndex;
			$scope.prevPhaseSlug = getPrevPhaseSlug();
			$scope.nextPhaseSlug = getNextPhaseSlug();

		});

}());
