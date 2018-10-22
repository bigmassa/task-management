from decimal import Decimal

from django.db import models
from django.utils import timezone

from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import Task, TaskAssignee, TimeEntry


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

    # meta

    def test_ordering(self):
        self.assertEqual(TaskAssignee._meta.ordering, ['user'])

    # properties

    def test_time_spent_hours(self):
        user = self.create_user()
        task = Task.objects.get(pk=1)
        TimeEntry.objects.create(
            task=task,
            started_at=timezone.datetime(2018, 1, 1, 9, 0, 0),
            ended_at=timezone.datetime(2018, 1, 1, 9, 15, 0),
            user=user
        )
        TimeEntry.objects.create(
            task=task,
            started_at=timezone.datetime(2018, 1, 2, 9, 0, 0),
            ended_at=timezone.datetime(2018, 1, 2, 9, 15, 0),
            user=user
        )

        task_assignee = TaskAssignee.objects.with_time_spent().get(pk=1)

        self.assertEqual(task_assignee.time_spent_hours, Decimal('0.50'))
