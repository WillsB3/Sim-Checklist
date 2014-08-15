# Sim Checklist

## About

todo

## Architechture

todo

## Setting up the development environment

### Setup

The instrucitons below detail how to get up and running using virtualenvwrapper, so this assumes you already have this installed. Once you have checked out the repo, `cd` into the project folder and run the following:

1. `$ mkvirtualenv simchecklist`
2. `$ pip install -r requirements/local.txt`
3. `$ npm install`
4. `$ bower install`
5. `$ python manage.py syncdb`

With that setup out the way you should be good to get the development environment running as described next.

### Running the development environment

1. In a teminal tab: `$ python manage.py runserver`
2. In another tab: `$ grunt watch`
