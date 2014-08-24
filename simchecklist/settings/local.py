from base import *

DEBUG = True
TEMPLATE_DEBUG = DEBUG

########## STATIC FILES CONFIGURATION
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(PROJECT_PATH, '..', 'static', 'local'),
)
########## END STATIC FILES CONFIGURATION
