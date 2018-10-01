import datetime

from django.db import models
from django.utils import timezone

from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import Task, TimeEntry


class ModelTests(AppTestCase):

    # fields

    def test_task(self):
        field = TimeEntry._meta.get_field('task')
        self.assertModelPKField(field, Task, on_delete=models.PROTECT)

    def test_started_at(self):
        field = TimeEntry._meta.get_field('started_at')
        self.assertModelField(field, models.DateTimeField)

    def test_ended_at(self):
        field = TimeEntry._meta.get_field('ended_at')
        self.assertModelField(field, models.DateTimeField)

    def test_user(self):
        field = TimeEntry._meta.get_field('user')
        self.assertModelPKField(field, User, on_delete=models.PROTECT)

    def test_comments(self):
        field = TimeEntry._meta.get_field('comments')
        self.assertModelField(field, models.TextField, null=True, blank=True)

    # meta

    def test_ordering(self):
        self.assertEqual(TimeEntry._meta.ordering, ['started_at'])

    # properties

    def test_duration(self):
        entry = TimeEntry(
            started_at=timezone.datetime(2018, 1, 1, 9, 0, 0),
            ended_at=timezone.datetime(2018, 1, 1, 9, 15, 0)
        )
        self.assertEqual(entry.duration, datetime.timedelta(0, 900))
