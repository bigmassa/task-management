FROM        accent/python-mssql:3.6

# Build args
ARG         REQUIREMENTS_FILE=/build/requirements/base.txt

# Copy in your requirements folder
ADD         requirements /build/requirements/

# Install dependencies
RUN         set -ex \
            && apt-get update \
            && apt-get install -y \
                gcc \
                libjpeg62 \
                libjpeg62-turbo-dev \
                libpq-dev \
                postgresql-client \
                supervisor \
            --no-install-recommends \
            && apt-get clean \
            && pip install --no-cache-dir -r $REQUIREMENTS_FILE

# Copy your application code to the container
RUN         mkdir /code/
WORKDIR     /code/
ADD         . /code/

# Add any custom, static environment variables needed by Django:
ENV         PYTHONUNBUFFERED=1 \
            DJANGO_SETTINGS_MODULE=app.settings \
            SECRET_KEY='***** change me *****' \
            ALLOWED_HOSTS=* \
            RDS_HOSTNAME=db \
            RDS_PORT=5432 \
            RDS_DB_NAME=postgres \
            RDS_USERNAME=postgres \
            RDS_PASSWORD=password \
            EMAIL_HOST=mail \
            EMAIL_PORT=1025 \
            EMAIL_HOST_USER=user \
            EMAIL_HOST_PASSWORD=password

# Docker entrypoint:
ENV         DJANGO_MANAGEPY_MIGRATE=on \
            DJANGO_MANAGEPY_COLLECTSTATIC=on

ENTRYPOINT  ["/code/docker-entrypoint.sh"]

# Start uWSGI:
CMD         ["supervisord", "-c", "/code/supervisord.conf"]
