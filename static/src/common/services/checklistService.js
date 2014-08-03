(function () {

	'use strict';

	angular.module('checklist.common.services')

	.factory('ChecklistService', function ($resource) {
		return $resource('/api/aircraft/:id', {}, {
			query: { method: "GET", isArray: false }
		});
	});

}());
