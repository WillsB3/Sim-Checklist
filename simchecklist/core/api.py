from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import viewsets, routers, filters

from . import models
from . import serializers

admin.autodiscover()

# ViewSets define the view behaviour.
class AircraftViewSet(viewsets.ModelViewSet):
    model = models.Aircraft
    serializer_class = serializers.AircraftSerializer

    def get_queryset(self):
        return models.Aircraft.objects.filter(checklist__published=True)

class ChecklistPhaseViewSet(viewsets.ModelViewSet):
    model = models.ChecklistPhase
    serializer_class = serializers.ChecklistPhaseSerializer


class ChecklistStepViewSet(viewsets.ModelViewSet):
    model = models.ChecklistStep
    serializer_class = serializers.ChecklistStepSerializer


class ChecklistViewSet(viewsets.ModelViewSet):
    model = models.Checklist
    serializer_class = serializers.ChecklistSerializer
    filter_fields = ('aircraft',)

    def get_queryset(self):
        return models.Checklist.objects.filter(published=True)

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'aircraft', AircraftViewSet)
router.register(r'checklist', ChecklistViewSet)
router.register(r'checklist_phases', ChecklistPhaseViewSet)
router.register(r'checklist_steps', ChecklistStepViewSet)
