from django.db import models

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
    type = models.ForeignKey(
        'wip.JobType',
        on_delete=models.PROTECT,
        related_name='jobs'
    )
    billed_to = models.DateField(
        null=True,
        blank=True
    )
    relationships = models.ManyToManyField(
        'authentication.User',
        through='wip.JobRelationship',
        blank=True
    )

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title
