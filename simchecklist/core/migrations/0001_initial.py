# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Aircraft'
        db.create_table(u'core_aircraft', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
        ))
        db.send_create_signal(u'core', ['Aircraft'])

        # Adding model 'Checklist'
        db.create_table(u'core_checklist', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('aircraft', self.gf('django.db.models.fields.related.ForeignKey')(related_name='checklists', to=orm['core.Aircraft'])),
        ))
        db.send_create_signal(u'core', ['Checklist'])

        # Adding model 'ChecklistPhase'
        db.create_table(u'core_checklistphase', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('checklist', self.gf('django.db.models.fields.related.ForeignKey')(related_name='phases', to=orm['core.Checklist'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
        ))
        db.send_create_signal(u'core', ['ChecklistPhase'])

        # Adding model 'ChecklistStep'
        db.create_table(u'core_checkliststep', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('checklist_phase', self.gf('django.db.models.fields.related.ForeignKey')(related_name='steps', to=orm['core.ChecklistPhase'])),
            ('item', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('action', self.gf('django.db.models.fields.CharField')(max_length=200)),
        ))
        db.send_create_signal(u'core', ['ChecklistStep'])


    def backwards(self, orm):
        # Deleting model 'Aircraft'
        db.delete_table(u'core_aircraft')

        # Deleting model 'Checklist'
        db.delete_table(u'core_checklist')

        # Deleting model 'ChecklistPhase'
        db.delete_table(u'core_checklistphase')

        # Deleting model 'ChecklistStep'
        db.delete_table(u'core_checkliststep')


    models = {
        u'core.aircraft': {
            'Meta': {'object_name': 'Aircraft'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        u'core.checklist': {
            'Meta': {'object_name': 'Checklist'},
            'aircraft': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'checklists'", 'to': u"orm['core.Aircraft']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'core.checklistphase': {
            'Meta': {'object_name': 'ChecklistPhase'},
            'checklist': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'phases'", 'to': u"orm['core.Checklist']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        u'core.checkliststep': {
            'Meta': {'object_name': 'ChecklistStep'},
            'action': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'checklist_phase': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'steps'", 'to': u"orm['core.ChecklistPhase']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'item': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        }
    }

    complete_apps = ['core']