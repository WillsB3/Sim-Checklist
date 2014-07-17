from django import forms
from django.contrib import admin

from . import models

# Register models which use default admin classes.
admin.site.register([models.Aircraft, models.Checklist, models.ChecklistPhase, models.ChecklistStep, models.User])
