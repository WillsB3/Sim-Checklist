from simchecklist.core import models

def resave():
    ac = models.Aircraft.objects.all()
    for a in ac:
        print('saving aircraft %s' % a.name)
        a.save()
        print('%s saved with slug %s' % (a.name, a.slug,)

