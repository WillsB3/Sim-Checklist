#!/bin/bash
heroku run python manage.py dumpdata --indent=4 | tail -n +2 | tee from_prod.json
rm db.sqlite3
python manage.py syncdb --migrate
python manage.py loaddata from_prod.json
