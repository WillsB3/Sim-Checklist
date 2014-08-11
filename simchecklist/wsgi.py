"""
WSGI config for simchecklist project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""

import os

from fix_path import fix_paths
fix_paths()

from djangae.utils import on_production

settings_file = "production" if on_production() else "local"

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "simchecklist.settings.{}".format(settings_file))

from django.core.wsgi import get_wsgi_application

from djangae.wsgi import DjangaeApplication
application = DjangaeApplication(get_wsgi_application())
