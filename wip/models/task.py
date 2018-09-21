from django.db import models

from taggit.managers import TaggableManager


class TaskManager(models.Manager):
    def get_queryset(self):
        """ Returns the base queryset with additional properties """

        qs = super().get_queryset()

        qs = qs.annotate(
            qs_allocated_hours=models.Sum('assignees__allocated_hours')
        )

        return qs


class Task(models.Model):
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
    job = models.ForeignKey(
        'wip.Job',
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    status = models.ForeignKey(
        'wip.TaskStatus',
        on_delete=models.PROTECT,
        related_name='tasks'
    )
    target_date = models.DateField(
        null=True,
        blank=True
    )
    closed = models.BooleanField(
        default=False
    )

    objects = TaskManager()
    tags = TaggableManager(blank=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

    @property
    def allocated_hours(self):
        """ returns the sum of the allocated hours for all assignees """

        if hasattr(self, 'qs_allocated_hours'):
            return getattr(self, 'qs_allocated_hours')
        return 0
