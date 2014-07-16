from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import viewsets, routers

from . import models
from . import serializers

admin.autodiscover()

# ViewSets define the view behavior.


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()

