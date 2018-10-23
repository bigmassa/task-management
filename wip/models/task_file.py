from django.conf import settings
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver

from authentication.middleware.current_user import get_current_user


def get_upload_path(instance, filename):
    return f'tasks/{instance.task_id}/{filename}'


class TaskFile(models.Model):
    task = models.ForeignKey(
        'wip.Task',
        on_delete=models.CASCADE,
        related_name='files'
    )
    file = models.FileField(
        upload_to=get_upload_path,
    )
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        editable=False,
        default=get_current_user
    )
    uploaded_on = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ['file']

    def __str__(self):
        return self.file.name

    @property
    def size_mb(self):
        size = round(self.file.size / 1024 / 1024, 3)
        return f'{size} MB'


@receiver(post_delete, sender=TaskFile)
def file_cleanup(instance, **kwargs):
    """ On post delete of a file remove from disk """

    instance.file.delete(False)
