(function () {

	'use strict';

	angular.module('checklist.common.directives')

	.directive('scRightClick', function($parse) {
		return function(scope, element, attrs) {
			var fn = $parse(attrs.scRightClick);
			element.bind('contextmenu', function(event) {
				scope.$apply(function() {
					event.preventDefault();
					fn(scope, { $event:event });
				});
			});
		};
	});
}());
