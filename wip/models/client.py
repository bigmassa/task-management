from django.core.validators import RegexValidator
from django.db import models
from django.db.models.manager import BaseManager

from wip.fields import ColorField


class ClientQueryset(models.QuerySet):
    """ Custom queryset """

    pass


class TaskManager(BaseManager.from_queryset(ClientQueryset)):
    """ Custom manager from queryset """

    pass


class Client(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True
    )
    colour = ColorField()
    phone_number = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        validators=[RegexValidator('^[0-9 ]+$')]
    )
    email_address = models.EmailField(
        null=True,
        blank=True
    )
    website = models.URLField(
        null=True,
        blank=True
    )
    address = models.TextField(
        null=True,
        blank=True
    )
    notes = models.TextField(
        null=True,
        blank=True
    )

    objects = TaskManager()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
