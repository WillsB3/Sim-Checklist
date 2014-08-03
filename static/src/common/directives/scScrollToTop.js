(function () {

	'use strict';

	angular.module('checklist.common.directives')

	.directive('scScrollToTop', function() {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var $element = $(element);

				function doScroll () {
					var docHeight = $(document).height();
					var windowHeight = $(window).height();
					var distance = $(document).scrollTop();
					var duration = attrs.scScrollToTop || 350;

					if (docHeight <= windowHeight) {
						return;
					}

					$('html,body').animate({
						scrollTop: 0
					}, duration);
				}

				$element.on('click', doScroll);

				scope.$on('$destroy', function() {
					$element.off('click', doScroll);
				});
			}
		};
	});
}());
