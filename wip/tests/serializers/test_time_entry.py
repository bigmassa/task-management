from django.utils import timezone
from rest_framework import serializers

from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import Job, TimeEntry
from wip.serializers import TimeEntrySerializer


class TestSerializer(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def test_subclass(self):
        self.assertTrue(issubclass(TimeEntrySerializer, serializers.ModelSerializer))

    def test_model(self):
        self.assertEqual(TimeEntrySerializer.Meta.model, TimeEntry)

    def test_fields(self):
        self.assertEqual(
            TimeEntrySerializer.Meta.fields,
            [
                'id',
                'started_at',
                'ended_at',
                'comments',
                'task',
                'user',
                'title',
                'colour',
                'duration'
            ]
        )

    def test_serialized_data(self):
        user = User.objects.first()
        job = Job.objects.first()
        instance = TimeEntry.objects.create(
            task=job.tasks.first(),
            started_at=timezone.datetime(2018, 1, 1, 9, 0, 0),
            ended_at=timezone.datetime(2018, 1, 1, 9, 15, 0),
            user=user
        )
        serializer = TimeEntrySerializer(instance=instance)
        self.assertEqual(
            serializer.data,
            {
                'id': instance.pk,
                'started_at': instance.started_at.isoformat() + 'Z',
                'ended_at': instance.ended_at.isoformat() + 'Z',
                'comments': instance.comments,
                'task': instance.task.pk,
                'user': instance.user.pk,
                'title': '%s - %s' % (instance.task.job, instance.task),
                'colour': instance.task.job.colour,
                'duration': '00:15:00'
            }
        )

    # validation

    def test_time_span_multiple_days(self):
        user = User.objects.first()
        job = Job.objects.first()
        data = {
            'task': job.tasks.first().pk,
            'started_at': timezone.datetime(2018, 1, 1, 9, 0, 0),
            'ended_at': timezone.datetime(2018, 1, 2, 0, 0, 0),
            'user': user.pk
        }
        serializer = TimeEntrySerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors, {'non_field_errors': ['Time entry cannot span multiple days']})

    def test_ended_at_before_started_at(self):
        user = User.objects.first()
        job = Job.objects.first()
        data = {
            'task': job.tasks.first().pk,
            'started_at': timezone.datetime(2018, 1, 1, 9, 0, 0),
            'ended_at': timezone.datetime(2018, 1, 1, 9, 0, 0),
            'user': user.pk
        }
        serializer = TimeEntrySerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors, {'ended_at': ['Must be after Started at']})
