angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('aircraft/aircraft.html',
    "<h1>Available Aircraft</h1>\n" +
    "\n" +
    "<ul class=\"aircraft-list m-bare-list\">\n" +
    "\t<li ng-repeat=\"aero in aircraft\" class=\"aircraft-list-item\">\n" +
    "\t\t<a ui-sref=\"checklist-phase({ aircraftId: aero.id, checklistId: aero.checklistId, phaseSlug: aero.first_phase_slug })\" class=\"aircraft-list-item__link\">\n" +
    "\t\t\t<span ng-style=\"{ 'background-image': 'url(/static/assets/images/content-images/aircraft/{{ aero.class_name }}.jpg)' }\" class=\"aircraft-list-item__bg\"></span>\n" +
    "\t\t\t<span ng-bind=\"aero.name\" class=\"aircraft-list-item__name\"></span>\n" +
    "\t\t</a>\n" +
    "\t</li>\n" +
    "</ul>\n"
  );


  $templateCache.put('checklist/checklist.html',
    "<div ui-view></div>\n"
  );


  $templateCache.put('checklist/phase.html',
    "<div class=\"phase\">\n" +
    "\t<h2 ng-bind=\"phase.name\" class=\"phase__title\"></h2>\n" +
    "\t<div ng-if=\"!phaseRun.isNew\">\n" +
    "\t\t<a ui-sref=\"checklist-phase({ phaseSlug: phaseCtrl.getPhase(0).slug })\" ng-click=\"checklistCtrl.newRun()\" class=\"btn\">Restart checklist</a>\n" +
    "\t</div>\n" +
    "\t<div class=\"checklist\">\n" +
    "\t\t<table>\n" +
    "\t\t\t<thead></thead>\n" +
    "\t\t\t<tbody>\n" +
    "\t\t\t\t<tr ng-repeat=\"step in phase.steps\" class=\"checklist__item\">\n" +
    "\t\t\t\t\t<td class=\"checklist__item-cell checklist__item-cell--number\">\n" +
    "\t\t\t\t\t\t<span ng-bind=\"$index + 1\" class=\"checklist__item-number\"></span>\n" +
    "\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t<td class=\"checklist__item-cell checklist__item-cell--name\">\n" +
    "\t\t\t\t\t\t<span ng-bind=\"step.item\" class=\"checklist__item-name\"></span>\n" +
    "\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t<td class=\"checklist__item-cell checklist__item-cell--action\">\n" +
    "\t\t\t\t\t\t<span ng-bind=\"step.action\" class=\"checklist__item-action\"></span>\n" +
    "\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t<td class=\"checklist__item-cell checklist__item-cell--buttons\">\n" +
    "\t\t\t\t\t\t<button class=\"btn-checklist-state\" ng-class=\"'btn-checklist-state--' + run.phases[phaseIndex].steps[$index].state\" ng-click=\"phaseCtrl.toggleStepState(run.phases[phaseIndex].steps[$index], 'next')\" sc-right-click=\"phaseCtrl.toggleStepState(run.phases[phaseIndex].steps[$index], 'prev')\"></button>\n" +
    "\t\t\t\t\t</td>\n" +
    "\t\t\t\t</tr>\n" +
    "\t\t\t</tbody>\n" +
    "\t\t</table>\n" +
    "\t</div>\n" +
    "\t<nav class=\"phase__navigation\">\n" +
    "\t\t<a ng-if=\"prevPhaseSlug\" ui-sref=\"checklist-phase({ phaseSlug: prevPhaseSlug })\" rel=\"prev\" sc-scroll-to-top>Previous Phase</a>\n" +
    "\t\t<a ng-if=\"nextPhaseSlug\" ui-sref=\"checklist-phase({ phaseSlug: nextPhaseSlug })\" rel=\"next\" sc-scroll-to-top>Next Phase</a>\n" +
    "\t</nav>\n" +
    "\t<div class=\"phase-progress\">\n" +
    "\t\t<div class=\"phase-progress__bar\" ng-style=\"phaseCtrl.getPhaseProgressStyles()\">\n" +
    "\t\t\t<div class=\"phase-progress__peg\"></div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('checklists/checklists.html',
    "<h1>Available Aircraft</h1>\n" +
    "\n" +
    "<ul>\n" +
    "\t<li ng-repeat=\"checklist in checklists\">\n" +
    "\t\t<a ui-sref=\"checklist-phase({ aircraftId: checklist.aircraft, checklistId: checklist.id, phaseSlug: checklist.phases[0].slug })\" ng-bind=\"checklist.name\"></a>\n" +
    "\t</li>\n" +
    "</ul>\n"
  );

}]);
