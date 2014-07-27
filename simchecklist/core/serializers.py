from django.forms import widgets
from rest_framework import serializers

from . import models

class AircraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Aircraft
        fields = ('id', 'name', 'checklists')


class ChecklistStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChecklistStep
        fields = ('id', 'checklist_phase', 'item', 'action')


class ChecklistPhaseSerializer(serializers.ModelSerializer):
    steps = ChecklistStepSerializer(many=True)

    class Meta:
        model = models.ChecklistPhase
        fields = ('id', 'checklist', 'name', 'slug', 'steps')


class ChecklistSerializer(serializers.ModelSerializer):
    phases = ChecklistPhaseSerializer(many=True)

    class Meta:
        model = models.Checklist
        fields = ('id', 'aircraft', 'name', 'phases')
