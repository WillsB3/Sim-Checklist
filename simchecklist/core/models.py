import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

class Aircraft(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = 'Aircraft'

    def __unicode__(self):
        return self.name


class Checklist(models.Model):
    aircraft = models.ForeignKey(Aircraft, related_name='checklists')

    def __unicode__(self):
        return "Checklist for %s" % self.aircraft.name


class ChecklistPhase(models.Model):
    checklist = models.ForeignKey(Checklist, related_name='phases')
    name = models.CharField(max_length=200)

    def __unicode__(self):
        return self.name


class ChecklistStep(models.Model):
    checklist_phase = models.ForeignKey(ChecklistPhase, related_name='steps')
    item = models.CharField(max_length=200)
    action = models.CharField(max_length=200)


# class User(AbstractUser):
#     aircraft = models.ManyToManyField(Aircraft)
#     objects = UserManager()
