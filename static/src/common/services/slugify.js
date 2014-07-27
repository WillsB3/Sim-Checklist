(function () {

	'use strict';

	angular.module('checklist.common.services')

	.factory('slugify', function () {

		function slugify(str) {
			str = str.replace(/[^\w\s-]/g, '').trim().toLowerCase();
			return str;
		}

		return slugify;

	});

}());
