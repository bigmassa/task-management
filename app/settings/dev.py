from os import environ
import sys

from .base import (
    INSTALLED_APPS,
    MIDDLEWARE
)


# Security

DEBUG = True


# debug toolbar

DEBUG_TOOLBAR_CONFIG = {
    'SHOW_COLLAPSED': True,
    'SHOW_TOOLBAR_CALLBACK': 'app.settings.helpers.show_toolbar',
}

INSTALLED_APPS += [
    'migrator',
    'debug_toolbar',
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]


# database

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': environ.get('RDS_HOSTNAME'),
        'PORT': environ.get('RDS_PORT'),
        'NAME': environ.get('RDS_DB_NAME'),
        'USER': environ.get('RDS_USERNAME'),
        'PASSWORD': environ.get('RDS_PASSWORD'),
    },
    'legacy': {
        'ENGINE': 'sql_server.pyodbc',
        'NAME': 'wip',
        'USER': 'accent_sql_main',
        'PASSWORD': '4-|7wzx66H61aB^2-C',
        'HOST': 'accent-vps-sql.cd75fdxnizaa.eu-west-1.rds.amazonaws.com',
        'PORT': '1433',
        'OPTIONS': {
            'driver': 'ODBC Driver 17 for SQL Server',
            'MARS_Connection': 'True',
        },
    }
}


# auth

AUTH_PASSWORD_VALIDATORS = []


# Email

EMAIL_USE_TLS = False

# static

STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'


# files

DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
