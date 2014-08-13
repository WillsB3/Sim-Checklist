(function () {

	'use strict';

	angular.module('checklist.common.services')

	.service('ChecklistRunService', function checklistRunService(localStorageService, STEP_STATES) {
		var service = {};
		var LS_PREFIX = 'checklist-run:';

		service.newRun = function (checklistData) {
			var run = {
				checklistId: checklistData.id,
				id: Date.now(),
				phases: [],
				isNew: true
			};

			// Remove any existing run
			this.deleteRun(checklistData.id);

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

		service.deleteRun = function (checklistId) {
			localStorageService.remove(LS_PREFIX + checklistId);
		};

		service.getRun = function (checklistId) {
			var runString = localStorageService.get(LS_PREFIX + checklistId);

			if (runString) {
				return angular.fromJson(runString);
			} else {
				return undefined;
			}
		};

		service.saveRun = function (runData) {
			runData.isNew = false;
			return localStorageService.set(LS_PREFIX + runData.checklistId, angular.toJson(runData));
		};

		return service;
	});

}());
