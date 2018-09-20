from django.conf import settings
from django.db import models


class JobRelationship(models.Model):
    job = models.ForeignKey(
        'wip.Job',
        on_delete=models.CASCADE,
        related_name='relationships'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    relationship = models.ForeignKey(
        'wip.Relationship',
        on_delete=models.PROTECT
    )
