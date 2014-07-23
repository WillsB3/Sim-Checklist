from django.forms import widgets
from rest_framework import serializers

from . import models

class AircraftSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Aircraft
        fields = ('id', 'name')


class ChecklistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Checklist
        fields = ('id', 'aircraft')


class ChecklistPhaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.ChecklistPhase
        fields = ('id', 'checklist', 'name')


class ChecklistStepSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.ChecklistStep
        fields = ('checklist_phase', 'item', 'action')
