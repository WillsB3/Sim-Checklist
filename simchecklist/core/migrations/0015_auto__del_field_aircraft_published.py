# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Aircraft.published'
        db.delete_column(u'core_aircraft', 'published')


    def backwards(self, orm):
        # Adding field 'Aircraft.published'
        db.add_column(u'core_aircraft', 'published',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)


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
            'aircraft': ('django.db.models.fields.related.OneToOneField', [], {'related_name': "'checklist'", 'unique': 'True', 'to': u"orm['core.Aircraft']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'published': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        },
        u'core.checklistphase': {
            'Meta': {'ordering': "('order',)", 'object_name': 'ChecklistPhase'},
            'checklist': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'phases'", 'to': u"orm['core.Checklist']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'order': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'}),
            'slug': ('autoslug.fields.AutoSlugField', [], {'unique_with': "('checklist',)", 'max_length': '50', 'populate_from': "'name'"})
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