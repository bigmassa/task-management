# Generated by Django 2.2.4 on 2019-08-11 16:25

from django.db import migrations, models


def set_default_assignee_order(apps, schema_editor):
    TaskAssignee = apps.get_model('wip', 'TaskAssignee')

    db_alias = schema_editor.connection.alias

    for assignee in TaskAssignee.objects.using(db_alias).all():
        assignee.board_order = assignee.task.order
        assignee.save()


class Migration(migrations.Migration):

    dependencies = [
        ('wip', '0032_auto_20190328_1637'),
    ]

    operations = [
        migrations.AddField(
            model_name='taskassignee',
            name='board_order',
            field=models.FloatField(default=16384, help_text='Task order for this assignee on the personal task board'),
        ),
        migrations.RunPython(set_default_assignee_order)
    ]