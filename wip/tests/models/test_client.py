from django.db import models

from tests.test_case import AppTestCase
from wip.models import Client


class ModelTests(AppTestCase):

    # fields

    def test_name(self):
        field = Client._meta.get_field('name')
        self.assertModelField(field, models.CharField)
        self.assertEqual(field.max_length, 255)
        self.assertTrue(field.unique)

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

    def test_notes(self):
        field = Client._meta.get_field('notes')
        self.assertModelField(field, models.TextField, null=True, blank=True)

    # meta

    def test_ordering(self):
        self.assertEqual(Client._meta.ordering, ['name'])

    # properties

    def test_str(self):
        self.assertEqual(str(Client(name='Foo')), 'Foo')
