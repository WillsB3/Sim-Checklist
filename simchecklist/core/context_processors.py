from django.config import settings


def debug(request):
    return {
        'DEBUG': settings.DEBUG
    }
