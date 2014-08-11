from .base import *

from djangae.utils import find_project_root

########## DEBUG CONFIGURATION
DEBUG = True
TEMPLATE_DEBUG = True
########## END DEBUG CONFIGURATION

########## STATIC FILES CONFIGURATION
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(PROJECT_DIR, '..', 'static', 'local'),
)
########## END STATIC FILES CONFIGURATION
