from django.db import models

from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import TimeDailySignoff


class ModelTests(AppTestCase):

    # fields

    def test_date(self):
        field = TimeDailySignoff._meta.get_field('date')
        self.assertModelField(field, models.DateField)

    def test_user(self):
        field = TimeDailySignoff._meta.get_field('user')
        self.assertModelPKField(field, User, on_delete=models.PROTECT)

    def test_completed(self):
        field = TimeDailySignoff._meta.get_field('completed')
        self.assertModelField(field, models.BooleanField)
        self.assertFalse(field.default)

    # meta

    def test_ordering(self):
        self.assertEqual(TimeDailySignoff._meta.ordering, ['date'])
