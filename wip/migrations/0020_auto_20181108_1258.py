# Generated by Django 2.1.3 on 2018-11-08 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wip', '0019_auto_20181106_1503'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeentry',
            name='signed_off',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='timeentry',
            name='signed_off_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]