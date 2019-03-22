from django.db import models

from wip.models import TaskStatus
from tests.test_case import AppTestCase


class ModelTests(AppTestCase):

    # fields

    def test_title(self):
        field = TaskStatus._meta.get_field('title')
        self.assertModelField(field, models.CharField)
        self.assertEqual(field.max_length, 50)
        self.assertTrue(field.unique)

    def test_notify_job_relationships(self):
        field = TaskStatus._meta.get_field('notify_job_relationships')
        self.assertModelField(field, models.BooleanField)
        self.assertFalse(field.default)

    def test_notify_task_assignees(self):
        field = TaskStatus._meta.get_field('notify_task_assignees')
        self.assertModelField(field, models.BooleanField)
        self.assertFalse(field.default)

    def test_order(self):
        field = TaskStatus._meta.get_field('order')
        self.assertModelField(field, models.PositiveIntegerField)
        self.assertEqual(field.default, 0)

    def test_show_on_job_dashboard(self):
        field = TaskStatus._meta.get_field('show_on_job_dashboard')
        self.assertModelField(field, models.BooleanField)
        self.assertTrue(field.default, True)
        self.assertTrue(field.help_text, 'Designates whether this status should be displayed on the job dashboard')

    # meta

    def test_ordering(self):
        self.assertEqual(TaskStatus._meta.ordering, ['order'])

    # properties

    def test_str(self):
        self.assertEqual(str(TaskStatus(title='Foo')), 'Foo')
