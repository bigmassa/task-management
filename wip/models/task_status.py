from django.db import models


class TaskStatus(models.Model):
    title = models.CharField(
        max_length=50,
        unique=True
    )
    order = models.PositiveIntegerField(
        default=0
    )

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'task statuses'

    def __str__(self):
        return self.title
