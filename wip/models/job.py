from decimal import Decimal

from django.db import models
from django.db.models.manager import BaseManager
from django.urls import reverse_lazy

from wip.fields import ColorField
from wip.utils import duration_to_decimal_hrs
from .task_assignee import TaskAssignee


class JobQueryset(models.QuerySet):
    """ Custom queryset """

    def with_allocated(self):
        """ Add sum of allocated hours to the queryset """

        query = (
            TaskAssignee.objects
            .filter(task__job_id=models.OuterRef('pk'))
            .values('task__job_id')
            .annotate(total=models.Sum('allocated_hours'))
            .order_by('task__job_id')
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
                    models.F('tasks__time_entries__ended_at') - models.F('tasks__time_entries__started_at'),
                    output_field=models.fields.DurationField()
                )
            )
        )

    def open(self):
        return self.filter(status__closed=False)

    def closed(self):
        return self.filter(status__closed=True)


class JobManager(BaseManager.from_queryset(JobQueryset)):
    """ Custom manager from queryset """

    pass


class Job(models.Model):
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
    client = models.ForeignKey(
        'wip.Client',
        on_delete=models.CASCADE,
        related_name='jobs'
    )
    type = models.ForeignKey(
        'wip.JobType',
        on_delete=models.PROTECT,
        related_name='jobs'
    )
    estimated_hours = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    colour = ColorField()
    status = models.ForeignKey(
        'wip.JobStatus',
        on_delete=models.PROTECT,
        related_name='jobs'
    )
    billed_to = models.DateField(
        null=True,
        blank=True
    )

    objects = JobManager()

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse_lazy('wip:job-detail', kwargs={'pk': self.pk})

    def get_update_url(self):
        return reverse_lazy('wip:job-update', kwargs={'pk': self.pk})

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
