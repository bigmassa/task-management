from django.db import models

from wip.fields import ColorField


class TaskStatus(models.Model):
    title = models.CharField(
        max_length=50,
        unique=True
    )
    icon = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text='An icon representing this status'
    )
    colour = ColorField(
        null=True,
        blank=True
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
    show_on_job_dashboard = models.BooleanField(
        default=True,
        help_text='Designates whether this status should be displayed on the job dashboard'
    )

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'task statuses'

    def __str__(self):
        return self.title
