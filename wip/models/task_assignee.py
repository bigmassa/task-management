from django.conf import settings
from django.db import models, transaction
from django.db.models.manager import BaseManager
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


class TaskAssigneeQueryset(models.QuerySet):
    """ Custom queryset """

    pass


class TaskAssigneeManager(BaseManager.from_queryset(TaskAssigneeQueryset)):
    """ Custom manager from queryset """

    pass


class TaskAssignee(models.Model):
    task = models.ForeignKey(
        'wip.Task',
        on_delete=models.CASCADE,
        related_name='assignees'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='assigned_tasks'
    )
    allocated_hours = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    objects = TaskAssigneeManager()

    class Meta:
        ordering = ['user']


@receiver(post_save, sender=TaskAssignee)
@receiver(post_delete, sender=TaskAssignee)
def update_allocated_hours(instance, **kwargs):
    task_id = instance.task_id

    def do():
        from wip.models import Task
        task = Task.objects.with_allocated().get(pk=task_id)
        task.allocated_hours = task.qs_allocated_hours
        task.save()

    transaction.on_commit(do)
