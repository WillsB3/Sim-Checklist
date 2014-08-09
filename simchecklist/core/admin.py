from django import forms
from django.contrib import admin

from nested_inlines.admin import NestedModelAdmin, NestedStackedInline, NestedTabularInline
from ordered_model.admin import OrderedModelAdmin

from . import models


class ChecklistStepInline(NestedTabularInline):
    model = models.ChecklistStep
    extra = 1
    fk_name = 'checklist_phase'


class ChecklistPhaseInline(NestedStackedInline):
    model = models.ChecklistPhase
    extra = 1
    fk_name = 'checklist'
    inlines = [ChecklistStepInline]


class ChecklistAdmin(NestedModelAdmin):
    model = models.Checklist
    inlines = [ChecklistPhaseInline]


class ChecklistStepAdmin(OrderedModelAdmin):
    list_filter = ['checklist_phase']
    list_display = ('item', 'action', 'move_up_down_links')


admin.site.register(models.Aircraft)
admin.site.register(models.Checklist, ChecklistAdmin)
admin.site.register(models.ChecklistStep, ChecklistStepAdmin)
