from django.db import models


class TaskStatus(models.Model):
    title = models.CharField(
        max_length=50,
        unique=True
    )
    notify_job_relationships = models.BooleanField(
        default=False,
        help_text='Send an email to all job relationships when a task changes to this status'
    )
    notify_task_assignees = models.BooleanField(
        default=False,
        help_text='Send an email to all task assignees when a task changes to this status'
    )
    order = models.PositiveIntegerField(
        default=0
    )

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'task statuses'

    def __str__(self):
        return self.title
