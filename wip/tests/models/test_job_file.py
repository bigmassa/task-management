from django.db import models
from django.urls import reverse

from authentication.middleware.current_user import get_current_user
from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import Job, JobFile


class ModelTests(AppTestCase):

    # fields

    def test_job(self):
        field = JobFile._meta.get_field('job')
        self.assertModelPKField(field, Job, on_delete=models.CASCADE)

    def test_uploaded_by(self):
        field = JobFile._meta.get_field('uploaded_by')
        self.assertModelPKField(field, User, on_delete=models.PROTECT)
        self.assertFalse(field.editable)
        self.assertEqual(field.default, get_current_user)

    def test_uploaded_on(self):
        field = JobFile._meta.get_field('uploaded_on')
        self.assertModelField(field, models.DateTimeField, blank=True)
        self.assertTrue(field.auto_now_add)

    def test_file(self):
        field = JobFile._meta.get_field('file')
        self.assertModelField(field, models.FileField)

    # meta

    def test_ordering(self):
        self.assertEqual(JobFile._meta.ordering, ['file'])
