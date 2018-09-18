from django.db import models

from authentication.middleware.current_user import get_current_user
from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import Task, TaskNote


class ModelTests(AppTestCase):

    # fields

    def test_task(self):
        field = TaskNote._meta.get_field('task')
        self.assertModelPKField(field, Task, on_delete=models.CASCADE)

    def test_user(self):
        field = TaskNote._meta.get_field('user')
        self.assertModelPKField(field, User, on_delete=models.PROTECT)
        self.assertFalse(field.editable)
        self.assertEqual(field.default, get_current_user)

    def test_created_at(self):
        field = TaskNote._meta.get_field('created_at')
        self.assertModelField(field, models.DateTimeField, blank=True)
        self.assertTrue(field.auto_now_add)

    def test_updated_at(self):
        field = TaskNote._meta.get_field('updated_at')
        self.assertModelField(field, models.DateTimeField, blank=True)
        self.assertTrue(field.auto_now)

    def test_note(self):
        field = TaskNote._meta.get_field('note')
        self.assertModelField(field, models.TextField)

    # meta

    def test_ordering(self):
        self.assertEqual(TaskNote._meta.ordering, ['-created_at'])
