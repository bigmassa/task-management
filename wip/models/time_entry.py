from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models, transaction
from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.utils import timezone

from wip.utils import duration_to_decimal_hrs


class TimeEntry(models.Model):
    task = models.ForeignKey(
        'wip.Task',
        on_delete=models.PROTECT,
        related_name='time_entries'
    )
    started_at = models.DateTimeField(
        db_index=True
    )
    ended_at = models.DateTimeField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='time_entries'
    )
    comments = models.TextField(
        null=True,
        blank=True
    )
    signed_off = models.BooleanField(
        default=False
    )
    signed_off_date = models.DateTimeField(
        null=True,
        blank=True,
        editable=False
    )

    class Meta:
        permissions = (
            ('manage_time_entry', 'Can manage other peoples time entries'),
        )
        ordering = ['started_at']
        verbose_name_plural = 'time entries'

    def clean(self):
        super().clean()
        if self.ended_at <= self.started_at:
            raise ValidationError('End date cannot be before Start date')

    def save(self, **kwargs):
        self.clean()
        return super().save(**kwargs)

    @property
    def duration(self):
        """ returns the duration of the time """

        return self.ended_at - self.started_at


@receiver(pre_save, sender=TimeEntry)
def update_signed_off_date(instance, **kwargs):
    if instance.signed_off and not instance.signed_off_date:
        instance.signed_off_date = timezone.now()
    elif not instance.signed_off:
        instance.signed_off_date = None


@receiver(post_save, sender=TimeEntry)
@receiver(post_delete, sender=TimeEntry)
def update_time_spent_hours(instance, **kwargs):
    def do():
        from wip.models import Task
        task = Task.objects.with_time_spent().get(pk=instance.task_id)
        time_spent = duration_to_decimal_hrs(task.qs_time_spent)
        if task.time_spent_hours != time_spent:
            task.time_spent_hours = time_spent
            task.save()

    transaction.on_commit(do)
