from django.db import models

from tests.test_case import AppTestCase
from wip.models import Task, TaskTiming
from wip.models.task_timing import TaskTimingManager


class TestModel(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    # fields

    def test_task(self):
        field = TaskTiming._meta.get_field('task')
        self.assertEqual(field.__class__, models.OneToOneField)
        self.assertEqual(field.remote_field.model, Task)
        self.assertEqual(field.remote_field.on_delete, models.CASCADE)
        self.assertFalse(field.null)
        self.assertFalse(field.blank)
        self.assertEqual(field.remote_field.related_name, 'timing')

    def test_allocated_hours(self):
        field = TaskTiming._meta.get_field('allocated_hours')
        self.assertModelField(field, models.DecimalField, null=True, default='0.00')
        self.assertEqual(field.max_digits, 10)
        self.assertEqual(field.decimal_places, 2)
        self.assertFalse(field.editable)

    def test_time_spent_hours(self):
        field = TaskTiming._meta.get_field('time_spent_hours')
        self.assertModelField(field, models.DecimalField, null=True, default='0.00')
        self.assertEqual(field.max_digits, 10)
        self.assertEqual(field.decimal_places, 2)
        self.assertFalse(field.editable)

    # manager
    def test_default_manager(self):
        self.assertTrue(isinstance(TaskTiming._default_manager, TaskTimingManager))
