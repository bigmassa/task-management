from django.db import models


class JobRelationship(models.Model):
    job = models.ForeignKey(
        'wip.Job',
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        'authentication.User',
        on_delete=models.CASCADE
    )
    relationship = models.ForeignKey(
        'wip.Relationship',
        on_delete=models.PROTECT
    )
