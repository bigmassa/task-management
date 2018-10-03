from django.db import models


class JobStatus(models.Model):
    title = models.CharField(
        max_length=50,
        unique=True
    )
    allow_new_clock_entries = models.BooleanField(
        default=True
    )
    order = models.PositiveIntegerField(
        default=0
    )

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'job statuses'

    def __str__(self):
        return self.title
