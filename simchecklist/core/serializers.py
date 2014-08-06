from django.forms import widgets
from rest_framework import serializers

from . import models

class AircraftSerializer(serializers.ModelSerializer):
    first_phase_slug = serializers.SerializerMethodField('get_first_phase_slug')

    class Meta:
        model = models.Aircraft
        fields = ('id', 'name', 'slug', 'class_name', 'checklist', 'first_phase_slug')

    def get_first_phase_slug(self, obj):
        return obj.checklist.model.phases.get(order='1').slug


class ChecklistStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChecklistStep
        fields = ('id', 'checklist_phase', 'item', 'action', 'order')


class ChecklistPhaseSerializer(serializers.ModelSerializer):
    steps = ChecklistStepSerializer(many=True)

    class Meta:
        model = models.ChecklistPhase
        fields = ('id', 'checklist', 'name', 'slug', 'steps', 'order')


class ChecklistSerializer(serializers.ModelSerializer):
    phases = ChecklistPhaseSerializer(many=True)

    class Meta:
        model = models.Checklist
        fields = ('id', 'aircraft', 'phases')
