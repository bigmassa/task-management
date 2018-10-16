from django.conf import settings
from django.db import models

from wip.utils import seconds_to_decimal_hrs
from .time_entry import TimeEntry


class TaskAssigneeManager(models.Manager):
    def get_queryset(self):
        """ Returns the base queryset with additional properties """

        qs = super().get_queryset()

        time_spent_subquery = (
            TimeEntry.objects
            .filter(task_id=models.OuterRef('task_id'))
            .values('task_id')
            .annotate(
                total=models.Sum(
                    models.ExpressionWrapper(
                        models.F('ended_at') - models.F('started_at'),
                        output_field=models.fields.DurationField()
                    )
                )
            )
            .order_by('task_id')
            .values('total')
        )

        qs = qs.annotate(
            qs_time_spent=models.Subquery(time_spent_subquery)
        )

        return qs


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

        seconds = 0
        if hasattr(self, 'qs_time_spent') and getattr(self, 'qs_time_spent'):
            seconds = getattr(self, 'qs_time_spent').seconds
        return seconds_to_decimal_hrs(seconds)
