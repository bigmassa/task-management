from django.db import models

from authentication.models import User
from client.models import Client
from tests.test_case import AppTestCase
from wip.fields import ColorField
from wip.models import Job, JobStatus, JobType


class ModelTests(AppTestCase):

    # fields

    def test_title(self):
        field = Job._meta.get_field('title')
        self.assertModelField(field, models.CharField)
        self.assertEqual(field.max_length, 255)

    def test_description(self):
        field = Job._meta.get_field('description')
        self.assertModelField(field, models.TextField, null=True, blank=True)

    def test_created_at(self):
        field = Job._meta.get_field('created_at')
        self.assertModelField(field, models.DateTimeField, blank=True)
        self.assertTrue(field.auto_now_add)

    def test_client(self):
        field = Job._meta.get_field('client')
        self.assertModelPKField(field, Client, on_delete=models.PROTECT, related_name='jobs')

    def test_estimated_hours(self):
        field = Job._meta.get_field('estimated_hours')
        self.assertModelField(field, models.DecimalField, null=True, blank=True)
        self.assertEqual(field.max_digits, 10)
        self.assertEqual(field.decimal_places, 2)

    def test_colour(self):
        field = Job._meta.get_field('colour')
        self.assertModelField(field, ColorField, null=True, blank=True)

    def test_status(self):
        field = Job._meta.get_field('status')
        self.assertModelPKField(field, JobStatus, on_delete=models.PROTECT, related_name='jobs')

    def test_type(self):
        field = Job._meta.get_field('type')
        self.assertModelPKField(field, JobType, on_delete=models.PROTECT, related_name='jobs')

    def test_billed_to(self):
        field = Job._meta.get_field('billed_to')
        self.assertModelField(field, models.DateField, null=True, blank=True)

    def test_relationships(self):
        field = Job._meta.get_field('relationships')
        self.assertEqual(field.__class__, models.ManyToManyField)
        self.assertEqual(field.remote_field.model, User)
        self.assertTrue(field.blank)

    # meta

    def test_ordering(self):
        self.assertEqual(Job._meta.ordering, ['title'])

    # properties

    def test_str(self):
        self.assertEqual(str(Job(title='Foo')), 'Foo')
