(function () {

	'use strict';

	angular.module('checklist.common.services', [])
		
		.factory('ChecklistService', function ($resource) {
			return $resource('/api/checklists/:id', {}, {
				query: { method: "GET", isArray: false }
			});
		});

}());
