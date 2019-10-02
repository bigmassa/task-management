from django.db import models

from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import Task, TaskAssignee


class ModelTests(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    # fields

    def test_task(self):
        field = TaskAssignee._meta.get_field('task')
        self.assertModelPKField(field, Task, on_delete=models.CASCADE, related_name='assignees')

    def test_user(self):
        field = TaskAssignee._meta.get_field('user')
        self.assertModelPKField(field, User, on_delete=models.CASCADE)

    def test_allocated_hours(self):
        field = TaskAssignee._meta.get_field('allocated_hours')
        self.assertModelField(field, models.DecimalField)
        self.assertEqual(field.max_digits, 10)
        self.assertEqual(field.decimal_places, 2)

    def test_board_order(self):
        field = TaskAssignee._meta.get_field('board_order')
        self.assertModelField(field, models.FloatField)
        self.assertEqual(field.default, 16384)
        self.assertEqual(field.help_text, 'Task order for this assignee on the personal task board')

    # meta

    def test_ordering(self):
        self.assertEqual(TaskAssignee._meta.ordering, ['user'])
