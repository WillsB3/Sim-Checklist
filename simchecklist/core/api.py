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

class ChecklistPhaseViewSet(viewsets.ModelViewSet):
	model = models.ChecklistPhase
	serializer_class = serializers.ChecklistPhaseSerializer

class ChecklistStepViewSet(viewsets.ModelViewSet):
	model = models.ChecklistStep
	serializer_class = serializers.ChecklistStepSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'aircraft', AircraftViewSet)
router.register(r'checklist_phases', ChecklistPhaseViewSet)
router.register(r'checklist_steps', ChecklistStepViewSet)
