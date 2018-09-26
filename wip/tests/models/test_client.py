from django.db import models
from django.urls import reverse

from tests.test_case import AppTestCase
from wip.fields import ColorField
from wip.models import Client


class ModelTests(AppTestCase):

    # fields

    def test_name(self):
        field = Client._meta.get_field('name')
        self.assertModelField(field, models.CharField)
        self.assertEqual(field.max_length, 255)
        self.assertTrue(field.unique)

    def test_colour(self):
        field = Client._meta.get_field('colour')
        self.assertModelField(field, ColorField)

    def test_phone_number(self):
        field = Client._meta.get_field('phone_number')
        self.assertModelField(field, models.CharField, null=True, blank=True)
        self.assertEqual(field.max_length, 50)

    def test_email_address(self):
        field = Client._meta.get_field('email_address')
        self.assertModelField(field, models.EmailField, null=True, blank=True)

    def test_website(self):
        field = Client._meta.get_field('website')
        self.assertModelField(field, models.URLField, null=True, blank=True)

    def test_address(self):
        field = Client._meta.get_field('address')
        self.assertModelField(field, models.TextField, null=True, blank=True)

    def test_notes(self):
        field = Client._meta.get_field('notes')
        self.assertModelField(field, models.TextField, null=True, blank=True)

    # meta

    def test_ordering(self):
        self.assertEqual(Client._meta.ordering, ['name'])

    # properties

    def test_str(self):
        self.assertEqual(str(Client(name='Foo')), 'Foo')

    def test_get_absolute_url(self):
        obj = Client(pk=10)
        expected_url = reverse('wip:client-detail', kwargs={'pk': obj.pk})
        self.assertEqual(obj.get_absolute_url(), expected_url)

    def test_get_update_url(self):
        obj = Client(pk=10)
        expected_url = reverse('wip:client-update', kwargs={'pk': obj.pk})
        self.assertEqual(obj.get_update_url(), expected_url)
