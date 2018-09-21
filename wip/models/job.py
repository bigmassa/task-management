from django.conf import settings
from django.db import models
from django.urls import reverse_lazy

from wip.fields import ColorField


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
    colour = ColorField(
        null=True,
        blank=True
    )
    status = models.ForeignKey(
        'wip.JobStatus',
        on_delete=models.PROTECT,
        related_name='jobs'
    )
    billed_to = models.DateField(
        null=True,
        blank=True
    )

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse_lazy('wip:job-detail', kwargs={'pk': self.pk})

    def get_update_url(self):
        return reverse_lazy('wip:job-update', kwargs={'pk': self.pk})
