# Generated by Django 2.1.3 on 2018-11-05 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wip', '0017_taskfile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timeentry',
            name='started_at',
            field=models.DateTimeField(db_index=True),
        ),
    ]