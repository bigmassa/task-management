from django.db import models


class TaskPriority(models.Model):
    title = models.CharField(
        max_length=50,
        unique=True
    )

    class Meta:
        ordering = ['title']
        verbose_name_plural = 'task priorities'

    def __str__(self):
        return self.title
