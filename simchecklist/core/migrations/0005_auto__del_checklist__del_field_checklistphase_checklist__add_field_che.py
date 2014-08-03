# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'Checklist'
        db.delete_table(u'core_checklist')

        # Deleting field 'ChecklistPhase.checklist'
        db.delete_column(u'core_checklistphase', 'checklist_id')

        # Adding field 'ChecklistPhase.aircraft'
        db.add_column(u'core_checklistphase', 'aircraft',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, related_name='phases', to=orm['core.Aircraft']),
                      keep_default=False)


    def backwards(self, orm):
        # Adding model 'Checklist'
        db.create_table(u'core_checklist', (
            ('aircraft', self.gf('django.db.models.fields.related.ForeignKey')(related_name='checklists', to=orm['core.Aircraft'])),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
        ))
        db.send_create_signal(u'core', ['Checklist'])

        # Adding field 'ChecklistPhase.checklist'
        db.add_column(u'core_checklistphase', 'checklist',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, related_name='phases', to=orm['core.Checklist']),
                      keep_default=False)

        # Deleting field 'ChecklistPhase.aircraft'
        db.delete_column(u'core_checklistphase', 'aircraft_id')


    models = {
        u'core.aircraft': {
            'Meta': {'object_name': 'Aircraft'},
            'class_name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        u'core.checklistphase': {
            'Meta': {'object_name': 'ChecklistPhase'},
            'aircraft': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'phases'", 'to': u"orm['core.Aircraft']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'})
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