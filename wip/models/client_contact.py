from django.core.validators import RegexValidator
from django.db import models
from django.urls import reverse_lazy
from taggit.managers import TaggableManager


class ClientContact(models.Model):
    client = models.ForeignKey(
        'wip.Client',
        on_delete=models.CASCADE,
        related_name='contacts'
    )
    first_name = models.CharField(
        max_length=255
    )
    last_name = models.CharField(
        max_length=255
    )
    phone_number = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        validators=[RegexValidator('^[0-9 ]+$')]
    )
    mobile_number = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        validators=[RegexValidator('^[0-9 ]+$')]
    )
    email_address = models.EmailField(
        null=True,
        blank=True
    )
    address = models.TextField(
        null=True,
        blank=True
    )
    position = models.ForeignKey(
        'wip.Position',
        on_delete=models.PROTECT,
        null=True,
        blank=True
    )
    notes = models.TextField(
        null=True,
        blank=True
    )

    tags = TaggableManager(blank=True)

    class Meta:
        ordering = ['first_name', 'last_name']

    def __str__(self):
        return self.get_full_name()

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_update_url(self):
        return reverse_lazy('wip:clientcontact-update', kwargs={'pk': self.pk})
