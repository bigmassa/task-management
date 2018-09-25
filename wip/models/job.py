from django.db import models
from django.urls import reverse_lazy

from wip.fields import ColorField
from wip.utils import seconds_to_decimal_hrs
from .time_entry import TimeEntry
from .task_assignee import TaskAssignee


class JobManager(models.Manager):
    def get_queryset(self):
        """ Returns the base queryset with additional properties """

        qs = super().get_queryset()

        allocated_hours_subquery = (
            TaskAssignee.objects
            .filter(task__job_id=models.OuterRef('pk'))
            .values('task__job_id')
            .annotate(total=models.Sum('allocated_hours'))
            .order_by('task__job_id')
            .values('total')
        )

        time_spent_subquery = (
            TimeEntry.objects
            .filter(task__job_id=models.OuterRef('pk'))
            .values('task__job_id')
            .annotate(
                total=models.Sum(
                    models.ExpressionWrapper(
                        models.F('ended_at') - models.F('started_at'),
                        output_field=models.fields.DurationField()
                    )
                )
            )
            .order_by('task__job_id')
            .values('total')
        )

        qs = qs.annotate(
            qs_allocated_hours=models.Subquery(allocated_hours_subquery),
            qs_time_spent=models.Subquery(time_spent_subquery)
        )

        return qs


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
        on_delete=models.PROTECT,
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

        if hasattr(self, 'qs_allocated_hours'):
            return getattr(self, 'qs_allocated_hours')
        return 0

    @property
    def time_spent_hours(self):
        """ returns the sum of the total time entries on the task """

        seconds = 0
        if hasattr(self, 'qs_time_spent') and getattr(self, 'qs_time_spent'):
            seconds = getattr(self, 'qs_time_spent').seconds
        return seconds_to_decimal_hrs(seconds)
