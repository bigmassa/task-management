from decimal import Decimal

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.db import models, transaction
from django.db.models.manager import BaseManager
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from app.tasks import notify_status_change


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

    def do():
        from wip.models import TaskTiming

        try:
            # update the timings on the task
            timing = TaskTiming.objects.with_calculated().get(task_id=instance.task_id)
            if timing.allocated_hours != timing.qs_allocated_hours:
                timing.allocated_hours = timing.qs_allocated_hours or Decimal('0.00')
                timing.save()
            # notify assignee of task status as they have only now been added
            if kwargs.get('created', False):
                notify_status_change(instance.task, instance.user.email)

        except ObjectDoesNotExist:
            pass

    transaction.on_commit(do)
