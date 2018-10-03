from django.db import models

from wip.models import JobStatus
from tests.test_case import AppTestCase


class ModelTests(AppTestCase):

    # fields

    def test_title(self):
        field = JobStatus._meta.get_field('title')
        self.assertModelField(field, models.CharField)
        self.assertEqual(field.max_length, 50)
        self.assertTrue(field.unique)

    def test_allow_new_clock_entries(self):
        field = JobStatus._meta.get_field('allow_new_clock_entries')
        self.assertModelField(field, models.BooleanField)
        self.assertTrue(field.default)

    def test_order(self):
        field = JobStatus._meta.get_field('order')
        self.assertModelField(field, models.PositiveIntegerField)
        self.assertEqual(field.default, 0)

    # meta

    def test_ordering(self):
        self.assertEqual(JobStatus._meta.ordering, ['order'])

    # properties

    def test_str(self):
        self.assertEqual(str(JobStatus(title='Foo')), 'Foo')
