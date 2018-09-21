from django.db import models
from django.urls import reverse_lazy


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

    def get_absolute_url(self):
        return reverse_lazy('wip:client-detail', kwargs={'pk': self.pk})

    def get_update_url(self):
        return reverse_lazy('wip:client-update', kwargs={'pk': self.pk})
