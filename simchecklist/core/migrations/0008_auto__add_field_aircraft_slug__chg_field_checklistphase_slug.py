# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Aircraft.slug'
        db.add_column(u'core_aircraft', 'slug',
                      self.gf('autoslug.fields.AutoSlugField')(default='test-slug', unique_with=(), max_length=50, populate_from='name'),
                      keep_default=False)


        # Changing field 'ChecklistPhase.slug'
        db.alter_column(u'core_checklistphase', 'slug', self.gf('autoslug.fields.AutoSlugField')(default='test-phase-slug', unique_with=('aircraft',), max_length=50, populate_from='name'))

    def backwards(self, orm):
        # Deleting field 'Aircraft.slug'
        db.delete_column(u'core_aircraft', 'slug')


        # Changing field 'ChecklistPhase.slug'
        db.alter_column(u'core_checklistphase', 'slug', self.gf('django.db.models.fields.SlugField')(max_length=200, null=True))

    models = {
        u'core.aircraft': {
            'Meta': {'object_name': 'Aircraft'},
            'class_name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'slug': ('autoslug.fields.AutoSlugField', [], {'unique_with': '()', 'max_length': '50', 'populate_from': "'name'"})
        },
        u'core.checklistphase': {
            'Meta': {'ordering': "('order',)", 'object_name': 'ChecklistPhase'},
            'aircraft': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'phases'", 'to': u"orm['core.Aircraft']"}),
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