from django.conf import settings
from django.db import models
from django.db.models.manager import BaseManager

from wip.utils import duration_to_decimal_hrs


class TaskAssigneeQueryset(models.QuerySet):
    """ Custom queryset """

    def with_time_spent(self):
        """ Add sum of time entry duration to the queryset """

        return self.annotate(
            qs_time_spent=models.Sum(
                models.ExpressionWrapper(
                    models.F('task__time_entries__ended_at') - models.F('task__time_entries__started_at'),
                    output_field=models.fields.DurationField()
                )
            )
        )


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
    order = models.PositiveIntegerField(
        default=0
    )

    objects = TaskAssigneeManager()

    class Meta:
        ordering = ['order']

    @property
    def time_spent_hours(self):
        """ returns the sum of the total time entries on the task """

        value = getattr(self, 'qs_time_spent', None)
        return duration_to_decimal_hrs(value)
