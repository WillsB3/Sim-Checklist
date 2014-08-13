(function () {

	'use strict';

	angular.module('checklist.common.constants')

		.constant('STEP_STATES', {
			INITIAL: 'initial',
			CHECKED: 'checked',
			SKIPPED: 'skipped',
			FAILED: 'failed'
		})

		.constant('STEP_STATE_ORDER', ['INITIAL', 'CHECKED', 'SKIPPED', 'FAILED']);

}());
