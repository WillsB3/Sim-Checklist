import datetime

from django.contrib.auth.models import AbstractUser, UserManager
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils.text import slugify

from ordered_model.models import OrderedModel
from autoslug import AutoSlugField

class Aircraft(models.Model):
    name = models.CharField(max_length=200)
    class_name = models.CharField(max_length=100)
    slug = AutoSlugField(populate_from='name')

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Aircraft'


class Checklist(models.Model):
    aircraft = models.ForeignKey(Aircraft, related_name='checklist')

    def __unicode__(self):
        return "{aircraft} checklist".format(aircraft=self.aircraft)


class ChecklistPhase(OrderedModel):
    checklist = models.ForeignKey(Checklist, related_name='phases')
    name = models.CharField(max_length=200)
    slug = AutoSlugField(populate_from='name', unique_with='aircraft')

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('order',)


class ChecklistStep(OrderedModel):
    checklist_phase = models.ForeignKey(ChecklistPhase, related_name='steps')
    item = models.CharField(max_length=200)
    action = models.CharField(max_length=200)

    class Meta:
        ordering = ('order',)
