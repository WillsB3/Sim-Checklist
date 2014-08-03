from django.forms import widgets
from rest_framework import serializers

from . import models


class ChecklistStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChecklistStep
        fields = ('id', 'checklist_phase', 'item', 'action')


class ChecklistPhaseSerializer(serializers.ModelSerializer):
    steps = ChecklistStepSerializer(many=True)

    class Meta:
        model = models.ChecklistPhase
        fields = ('id', 'aircraft', 'name', 'slug', 'steps')


class AircraftSerializer(serializers.ModelSerializer):
    phases = ChecklistPhaseSerializer(many=True)

    class Meta:
        model = models.Aircraft
        fields = ('id', 'name', 'class_name', 'phases')
