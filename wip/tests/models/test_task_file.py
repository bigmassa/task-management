from django.db import models

from authentication.middleware.current_user import get_current_user
from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import Task, TaskFile


class ModelTests(AppTestCase):

    # fields

    def test_task(self):
        field = TaskFile._meta.get_field('task')
        self.assertModelPKField(field, Task, on_delete=models.CASCADE)

    def test_uploaded_by(self):
        field = TaskFile._meta.get_field('uploaded_by')
        self.assertModelPKField(field, User, on_delete=models.PROTECT)
        self.assertFalse(field.editable)
        self.assertEqual(field.default, get_current_user)

    def test_uploaded_on(self):
        field = TaskFile._meta.get_field('uploaded_on')
        self.assertModelField(field, models.DateTimeField, blank=True)
        self.assertTrue(field.auto_now_add)

    def test_file(self):
        field = TaskFile._meta.get_field('file')
        self.assertModelField(field, models.FileField)

    # meta

    def test_ordering(self):
        self.assertEqual(TaskFile._meta.ordering, ['file'])
