# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Checklist'
        db.create_table(u'core_checklist', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('aircraft', self.gf('django.db.models.fields.related.ForeignKey')(related_name='checklist', to=orm['core.Aircraft'])),
            ('first_phase_slug', self.gf('django.db.models.fields.CharField')(max_length=200)),
        ))
        db.send_create_signal(u'core', ['Checklist'])

        # Deleting field 'Aircraft.first_phase_slug'
        db.delete_column(u'core_aircraft', 'first_phase_slug')

        # Deleting field 'ChecklistPhase.aircraft'
        db.delete_column(u'core_checklistphase', 'aircraft_id')

        # Adding field 'ChecklistPhase.checklist'
        db.add_column(u'core_checklistphase', 'checklist',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, related_name='phases', to=orm['core.Checklist']),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting model 'Checklist'
        db.delete_table(u'core_checklist')

        # Adding field 'Aircraft.first_phase_slug'
        db.add_column(u'core_aircraft', 'first_phase_slug',
                      self.gf('django.db.models.fields.CharField')(default='aircraft-slug', max_length=200),
                      keep_default=False)

        # Adding field 'ChecklistPhase.aircraft'
        db.add_column(u'core_checklistphase', 'aircraft',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, related_name='phases', to=orm['core.Aircraft']),
                      keep_default=False)

        # Deleting field 'ChecklistPhase.checklist'
        db.delete_column(u'core_checklistphase', 'checklist_id')


    models = {
        u'core.aircraft': {
            'Meta': {'object_name': 'Aircraft'},
            'class_name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'slug': ('autoslug.fields.AutoSlugField', [], {'unique_with': '()', 'max_length': '50', 'populate_from': "'name'"})
        },
        u'core.checklist': {
            'Meta': {'object_name': 'Checklist'},
            'aircraft': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'checklist'", 'to': u"orm['core.Aircraft']"}),
            'first_phase_slug': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'core.checklistphase': {
            'Meta': {'ordering': "('order',)", 'object_name': 'ChecklistPhase'},
            'checklist': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'phases'", 'to': u"orm['core.Checklist']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'order': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'}),
            'slug': ('autoslug.fields.AutoSlugField', [], {'unique_with': "('aircraft',)", 'max_length': '50', 'populate_from': "'name'"})
        },
        u'core.checkliststep': {
            'Meta': {'ordering': "('order',)", 'object_name': 'ChecklistStep'},
            'action': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'checklist_phase': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'steps'", 'to': u"orm['core.ChecklistPhase']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'item': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'order': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'})
        }
    }

    complete_apps = ['core']