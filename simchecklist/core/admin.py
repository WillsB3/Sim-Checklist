from django import forms
from django.contrib import admin
from nested_inline.admin import NestedStackedInline, NestedModelAdmin, NestedTabularInline

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


admin.site.register(models.Checklist, ChecklistAdmin)
admin.site.register(models.Aircraft)
