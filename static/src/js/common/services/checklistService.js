(function () {

	'use strict';

	angular.module('checklist.common.services')

	.factory('ChecklistService', function ($resource) {
		return $resource('/api/checklist/:id', {}, {
			query: { method: "GET", isArray: false }
		});
	});

}());
