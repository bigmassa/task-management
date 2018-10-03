from django.conf import settings
from django.core.exceptions import ValidationError
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
        permissions = (
            ('manage_time_entry', 'Can manage other peoples time entries'),
        )
        ordering = ['started_at']
        verbose_name_plural = 'time entries'

    def clean(self):
        super().clean()
        if self.ended_at <= self.started_at:
            raise ValidationError('End date cannot be before Start date')

    def save(self, **kwargs):
        self.clean()
        return super().save(**kwargs)

    @property
    def duration(self):
        """ returns the duration of the time """

        return self.ended_at - self.started_at
