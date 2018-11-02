from decimal import Decimal

from django.db import models
from django.db.models.manager import BaseManager
from django.utils import timezone

from taggit.managers import TaggableManager

from wip.utils import duration_to_decimal_hrs
from .task_assignee import TaskAssignee


class TaskQueryset(models.QuerySet):
    """ Custom queryset """

    def with_allocated(self):
        """ Add sum of allocated hours to the queryset """

        query = (
            TaskAssignee.objects
            .filter(task_id=models.OuterRef('pk'))
            .values('task_id')
            .annotate(total=models.Sum('allocated_hours'))
            .order_by('task_id')
            .values('total')
        )

        return self.annotate(
            qs_allocated_hours=models.Subquery(query)
        )

    def with_time_spent(self):
        """ Add sum of time entry duration to the queryset """

        return self.annotate(
            qs_time_spent=models.Sum(
                models.ExpressionWrapper(
                    models.F('time_entries__ended_at') - models.F('time_entries__started_at'),
                    output_field=models.fields.DurationField()
                )
            )
        )

    def open(self):
        return self.filter(closed=False)

    def closed(self):
        return self.filter(closed=True)


class TaskManager(BaseManager.from_queryset(TaskQueryset)):
    """ Custom manager from queryset """

    pass


class Task(models.Model):
    title = models.CharField(
        max_length=255
    )
    description = models.TextField(
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    job = models.ForeignKey(
        'wip.Job',
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    status = models.ForeignKey(
        'wip.TaskStatus',
        on_delete=models.PROTECT,
        related_name='tasks'
    )
    target_date = models.DateField(
        null=True,
        blank=True
    )
    closed = models.BooleanField(
        default=False
    )
    not_chargeable = models.BooleanField(
        default=False
    )
    order = models.PositiveIntegerField(
        default=0
    )

    objects = TaskManager()
    tags = TaggableManager(blank=True)

    class Meta:
        base_manager_name = 'objects'
        ordering = ['order']

    def __str__(self):
        return self.title

    @property
    def allocated_hours(self):
        """ returns the sum of the allocated hours for all assignees """

        value = getattr(self, 'qs_allocated_hours', None)
        return value or Decimal('0.00')

    @property
    def time_spent_hours(self):
        """ returns the sum of the total time entries on the task """

        value = getattr(self, 'qs_time_spent', None)
        return duration_to_decimal_hrs(value)

    @property
    def is_overdue(self):
        """ if the task is not closed, flag if the target date has past """

        if self.target_date and not self.closed:
            return self.target_date < timezone.now().date()
        return False
