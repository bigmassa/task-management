from django.core.validators import RegexValidator
from django.db import models
from django.db.models.manager import BaseManager
from django.urls import reverse_lazy

from wip.fields import ColorField


class ClientQueryset(models.QuerySet):
    """ Custom queryset """

    def search(self, query_args=[], empty_query_args_returns_none=True):
        """ Returns a queryset for when searching """

        qs = self

        if query_args and isinstance(query_args, (list,)):
            all_filters = models.Q()
            for term in query_args:
                or_lookup = (
                    models.Q(name__icontains=term) |
                    models.Q(phone_number__icontains=term) |
                    models.Q(email_address__icontains=term) |
                    models.Q(website__icontains=term) |
                    models.Q(address__icontains=term)
                )
                all_filters = all_filters & or_lookup
            qs = qs.filter(all_filters).distinct()

        elif empty_query_args_returns_none:
            qs = qs.none()

        return qs


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

    def get_absolute_url(self):
        return reverse_lazy('wip:client-detail', kwargs={'pk': self.pk})

    def get_update_url(self):
        return reverse_lazy('wip:client-update', kwargs={'pk': self.pk})
