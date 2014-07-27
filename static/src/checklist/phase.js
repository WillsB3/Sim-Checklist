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
					url: '/phases/:phaseName',
					templateUrl: 'static/src/checklist/phase.html',
					controller: 'ChecklistPhaseCtrl',
					resolve: {
						phaseData: function ($stateParams, checklistData, slugify) {
							var phaseNameSlug = slugify($stateParams.phaseName);
							var phase = _.find(checklistData.phases, function (value) {
								return slugify(value.name) === phaseNameSlug;
							});

							return phase;
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
		.controller('ChecklistPhaseCtrl', function ($scope, $state, $stateParams, checklistData, phaseData, slugify) {

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

				if (currentPhaseIndex >= numPhases) {
					return;
				}

				nextPhaseConfig = $scope.checklist.phases[nextPhaseIndex];

				return slugify(nextPhaseConfig.name);
			}

			console.info('ChecklistPhaseCtrl', $stateParams.phaseName);

			// If this state was activated without a specific phase parameter
			// supplied we can't do anything. Automatically redirect to the
			// first phase.
			if (!phaseData) {
				// Go to the first phase by default
				$state.go('checklist-phase', {
					phaseName: slugify(checklistData.phases[0].name)
				}, {
					location: 'replace'
				});

				return;
			}

			$scope.phase = phaseData;
			$scope.nextPhaseSlug = getNextPhaseSlug();

		});

}());
