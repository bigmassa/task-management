from django.db import models
from django.db.models.manager import BaseManager
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone


class TaskTimingQueryset(models.QuerySet):
    """ Custom queryset """

    def with_calculated(self):
        """ Add caclulations to the queryset """

        from wip.models import TaskAssignee

        allocated_query = (
            TaskAssignee.objects
            .filter(task_id=models.OuterRef('task_id'))
            .values('task_id')
            .annotate(total=models.Sum('allocated_hours'))
            .order_by('task_id')
            .values('total')
        )

        time_spent_query = models.Sum(
            models.ExpressionWrapper(
                models.F('task__time_entries__ended_at') - models.F('task__time_entries__started_at'),
                output_field=models.fields.DurationField()
            )
        )

        return self.annotate(
            qs_allocated_hours=models.Subquery(allocated_query),
            qs_time_spent=time_spent_query
        )


class TaskTimingManager(BaseManager.from_queryset(TaskTimingQueryset)):
    """ Custom manager from queryset """

    pass


class TaskTiming(models.Model):
    task = models.OneToOneField(
        'wip.Task',
        on_delete=models.CASCADE,
        related_name='timing'
    )
    allocated_hours = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        default='0.00',
        editable=False
    )
    time_spent_hours = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        default='0.00',
        editable=False
    )

    objects = TaskTimingManager()
