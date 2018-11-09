from django.db import models
from django.db.models.manager import BaseManager
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone

from taggit.managers import TaggableManager

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
    closed_date = models.DateTimeField(
        null=True,
        blank=True,
        editable=False
    )
    not_chargeable = models.BooleanField(
        default=False
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
    def is_overdue(self):
        """ if the task is not closed, flag if the target date has past """

        if self.target_date and not self.closed:
            return self.target_date < timezone.now().date()
        return False


@receiver(pre_save, sender=Task)
def update_closed_date(instance, **kwargs):
    if instance.closed and not instance.closed_date:
        instance.closed_date = timezone.now()
    elif not instance.closed:
        instance.closed_date = None
