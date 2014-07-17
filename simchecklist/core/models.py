from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

class Aircraft(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = 'Aircraft'

    def __unicode__(self):
        return self.name

class Checklist(models.Model):
    aircraft = models.OneToOneField(Aircraft)

class ChecklistPhase(models.Model):
    name = models.CharField(max_length=200)

    def __unicode__(self):
        return self.name

class ChecklistStep(models.Model):
    item = models.CharField(max_length=200)
    action = models.CharField(max_length=200)
    # steps = models.OneToManyField(ChecklistStep)

class User(AbstractUser):
    aircraft = models.ManyToManyField(Aircraft)
    objects = UserManager()