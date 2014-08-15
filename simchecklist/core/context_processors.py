from django.config import settings


def process_request(request):
    return {
        'DEBUG': settings.DEBUG
    }
