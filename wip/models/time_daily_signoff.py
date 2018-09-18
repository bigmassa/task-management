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
        ordering = ['date']
