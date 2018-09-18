from django.conf import settings
from django.db import models


class TimeEntry(models.Model):
    task = models.ForeignKey(
        'wip.Task',
        on_delete=models.PROTECT,
        related_name='time_entries'
    )
    started_at = models.DateTimeField()
    ended_at = models.DateTimeField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='time_entries'
    )
    comments = models.TextField(
        null=True,
        blank=True
    )

    class Meta:
        ordering = ['started_at']
        verbose_name_plural = 'time entries'
