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
    aircraft = models.OneToOneField(Aircraft, related_name='checklist')
    published = models.BooleanField(default=False)

    def __unicode__(self):
        return "{aircraft} checklist".format(aircraft=self.aircraft)


class ChecklistPhase(models.Model):
    checklist = models.ForeignKey(Checklist, related_name='phases')
    name = models.CharField(max_length=200)
    slug = AutoSlugField(populate_from='name', unique_with='checklist')

    order = models.PositiveIntegerField(db_index=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('order',)
        unique_together = ('checklist', 'order')


class ChecklistStep(models.Model):
    checklist_phase = models.ForeignKey(ChecklistPhase, related_name='steps')
    item = models.CharField(max_length=200)
    action = models.CharField(max_length=200)

    order = models.PositiveIntegerField(db_index=True)

    class Meta:
        ordering = ('order',)
        unique_together = ('checklist_phase', 'order')
