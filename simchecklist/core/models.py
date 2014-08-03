import datetime
from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import AbstractUser, UserManager

from ordered_model.models import OrderedModel

class Aircraft(models.Model):
    name = models.CharField(max_length=200)
    class_name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = 'Aircraft'

    def __unicode__(self):
        return self.name


class Checklist(models.Model):
    aircraft = models.ForeignKey(Aircraft, related_name='checklists')
    name = models.CharField(max_length=200)

    def __unicode__(self):
        return "{aircraft}: {checklist_name}".format(aircraft=self.aircraft, checklist_name=self.name)


class ChecklistPhase(models.Model):
    checklist = models.ForeignKey(Checklist, related_name='phases')
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, null=True, blank=True)

    def __unicode__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(ChecklistPhase, self).save(*args, **kwargs)


class ChecklistStep(OrderedModel):
    checklist_phase = models.ForeignKey(ChecklistPhase, related_name='steps')
    item = models.CharField(max_length=200)
    action = models.CharField(max_length=200)

    class Meta:
        ordering = ('order',)

# class User(AbstractUser):
#     aircraft = models.ManyToManyField(Aircraft)
#     objects = UserManager()
