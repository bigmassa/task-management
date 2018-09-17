from django.db import models


class Client(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True
    )
    phone_number = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )
    email_address = models.EmailField(
        null=True,
        blank=True
    )
    website = models.URLField(
        null=True,
        blank=True
    )
    notes = models.TextField(
        null=True,
        blank=True
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
