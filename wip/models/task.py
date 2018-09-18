from django.conf import settings
from django.db import models


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
        on_delete=models.PROTECT,
        related_name='tasks'
    )
    allocated_hours = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    status = models.ForeignKey(
        'wip.TaskStatus',
        on_delete=models.PROTECT,
        related_name='tasks'
    )
    assignees = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='wip.TaskAssignee',
        blank=True
    )
    target_date = models.DateField(
        null=True,
        blank=True
    )
    closed = models.BooleanField(
        default=False
    )

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title
