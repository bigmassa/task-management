from django.db import models


class JobStatus(models.Model):
    title = models.CharField(
        max_length=50,
        unique=True
    )

    class Meta:
        ordering = ['title']
        verbose_name_plural = 'job statuses'

    def __str__(self):
        return self.title
