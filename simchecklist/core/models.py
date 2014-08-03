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
    first_phase_slug = models.CharField(max_length=200)

    def save(self, *args, **kwargs):

        try:
            self.first_phase_slug = ChecklistPhase.objects.get(aircraft=self.id, order=1).slug
            print('Saving %s with first_phase_slug: %s' % (self.name, self.first_phase_slug,))
        except ObjectDoesNotExist:
            first_phase = None
            print('Saving %s with first_phase_slug: None' % self.name)

        super(Aircraft, self).save(*args, **kwargs)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Aircraft'


class ChecklistPhase(OrderedModel):
    aircraft = models.ForeignKey(Aircraft, related_name='phases')
    name = models.CharField(max_length=200)
    slug = AutoSlugField(populate_from='name', unique_with='aircraft')

    def save(self, *args, **kwargs):
        ac_model = Aircraft.objects.get(id=self.aircraft)
        super(ChecklistPhase, self).save(*args, **kwargs)

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

# class User(AbstractUser):
#     aircraft = models.ManyToManyField(Aircraft)
#     objects = UserManager()
