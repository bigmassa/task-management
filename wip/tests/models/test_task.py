from django.db import models

from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import Job, Task, TaskPriority, TaskStatus


class TestModel(AppTestCase):

    # fields

    def test_title(self):
        field = Task._meta.get_field('title')
        self.assertModelField(field, models.CharField)
        self.assertEqual(field.max_length, 255)

    def test_description(self):
        field = Task._meta.get_field('description')
        self.assertModelField(field, models.TextField, null=True, blank=True)

    def test_created_at(self):
        field = Task._meta.get_field('created_at')
        self.assertModelField(field, models.DateTimeField, blank=True)
        self.assertTrue(field.auto_now_add)

    def test_job(self):
        field = Task._meta.get_field('job')
        self.assertModelPKField(field, Job, on_delete=models.PROTECT, related_name='tasks')

    def test_allocated_hours(self):
        field = Task._meta.get_field('allocated_hours')
        self.assertModelField(field, models.DecimalField)
        self.assertEqual(field.max_digits, 10)
        self.assertEqual(field.decimal_places, 2)

    def test_status(self):
        field = Task._meta.get_field('status')
        self.assertModelPKField(field, TaskStatus, on_delete=models.PROTECT, related_name='tasks')

    def test_assignees(self):
        field = Task._meta.get_field('assignees')
        self.assertEqual(field.__class__, models.ManyToManyField)
        self.assertEqual(field.remote_field.model, User)
        self.assertTrue(field.blank)

    def test_priority(self):
        field = Task._meta.get_field('priority')
        self.assertModelPKField(field, TaskPriority, on_delete=models.PROTECT, related_name='tasks')

    # meta

    def test_ordering(self):
        self.assertEqual(Task._meta.ordering, ['title'])

    # properties

    def test_str(self):
        self.assertEqual(str(Task(title='Foo')), 'Foo')
