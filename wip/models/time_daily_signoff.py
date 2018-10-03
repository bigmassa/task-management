from django.conf import settings
from django.db import models


class TimeDailySignoff(models.Model):
    date = models.DateField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT
    )
    completed = models.BooleanField(
        default=False
    )

    class Meta:
        permissions = (
            ('manage_time_daily_signoff', 'Can manage other peoples time daily signoffs'),
        )
        ordering = ['date']
        unique_together = ('date', 'user')
