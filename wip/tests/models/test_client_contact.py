from django.core.validators import RegexValidator
from django.db import models
from taggit.managers import TaggableManager

from tests.test_case import AppTestCase
from wip.models import Client, ClientContact, Position


class ModelTests(AppTestCase):

    # fields

    def test_client(self):
        field = ClientContact._meta.get_field('client')
        self.assertModelPKField(field, Client, on_delete=models.CASCADE)

    def test_first_name(self):
        field = ClientContact._meta.get_field('first_name')
        self.assertModelField(field, models.CharField)
        self.assertEqual(field.max_length, 255)

    def test_last_name(self):
        field = ClientContact._meta.get_field('last_name')
        self.assertModelField(field, models.CharField)
        self.assertEqual(field.max_length, 255)

    def test_phone_number(self):
        field = ClientContact._meta.get_field('phone_number')
        self.assertModelField(field, models.CharField, null=True, blank=True)
        self.assertEqual(field.max_length, 50)
        self.assertIn(RegexValidator('^[0-9 ]+$'), field.validators)

    def test_mobile_number(self):
        field = ClientContact._meta.get_field('mobile_number')
        self.assertModelField(field, models.CharField, null=True, blank=True)
        self.assertEqual(field.max_length, 50)
        self.assertIn(RegexValidator('^[0-9 ]+$'), field.validators)

    def test_email_address(self):
        field = ClientContact._meta.get_field('email_address')
        self.assertModelField(field, models.EmailField, null=True, blank=True)

    def test_address(self):
        field = ClientContact._meta.get_field('address')
        self.assertModelField(field, models.TextField, null=True, blank=True)

    def test_position(self):
        field = ClientContact._meta.get_field('position')
        self.assertModelPKField(field, Position, on_delete=models.PROTECT, null=True, blank=True)

    def test_notes(self):
        field = ClientContact._meta.get_field('notes')
        self.assertModelField(field, models.TextField, null=True, blank=True)

    def test_tags(self):
        field = ClientContact._meta.get_field('tags')
        self.assertTrue(isinstance(field, TaggableManager))

    # meta

    def test_ordering(self):
        self.assertEqual(ClientContact._meta.ordering, ['first_name', 'last_name'])

    # properties

    def test_str(self):
        self.assertEqual(str(ClientContact(first_name='Foo', last_name='User')), 'Foo User')

    def test_get_full_name(self):
        contact = ClientContact(first_name='Foo', last_name='User')
        self.assertEqual(contact.get_full_name(), 'Foo User')
