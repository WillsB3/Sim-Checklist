#!/bin/bash
heroku run python manage.py dumpdata core --indent=4 | tail -n +2 | tee prod.json
rm db.sqlite3
python manage.py syncdb --migrate
python manage.py loaddata prod.json
