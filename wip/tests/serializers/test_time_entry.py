from django.contrib.auth.models import Permission
from django.template import RequestContext
from django.test import RequestFactory
from django.utils import timezone
from rest_framework import serializers
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.request import Request

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
                'duration',
                'signed_off',
                'signed_off_date'
            ]
        )

    def test_serialized_data(self):
        user = User.objects.first()
        job = Job.objects.first()
        instance = TimeEntry.objects.create(
            task=job.tasks.first(),
            started_at=timezone.datetime(2018, 1, 1, 9, 0, 0),
            ended_at=timezone.datetime(2018, 1, 1, 9, 15, 0),
            user=user,
            signed_off=True,
            signed_off_date=timezone.datetime(2018, 1, 2, 9, 0, 0)
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
                'duration': '00:15:00',
                'signed_off': instance.signed_off,
                'signed_off_date': instance.signed_off_date.isoformat() + 'Z'
            }
        )

    # validation

    def test_user_without_correct_perm_cannot_save_for_another_user(self):
        request = APIRequestFactory().get('/')
        force_authenticate(request, user=self.create_user())
        context_instance = {'request': Request(request)}

        user = User.objects.first()
        job = Job.objects.first()

        data = {
            'task': job.tasks.first().pk,
            'started_at': timezone.datetime(2018, 1, 1, 9, 0, 0),
            'ended_at': timezone.datetime(2018, 1, 1, 10, 0, 0),
            'user': user.pk
        }
        serializer = TimeEntrySerializer(data=data, context=context_instance)

        self.assertFalse(serializer.is_valid())
        self.assertEqual(
            serializer.errors,
            {'non_field_errors': ['You dont have permission to save a time entry for another user']}
        )

    def test_user_with_correct_perm_can_save_for_another_user(self):
        request = RequestFactory().get('/')
        force_authenticate(request, user=self.create_user())
        context_instance = {'request': Request(request)}

        permission = Permission.objects.get(codename='manage_time_entry')
        context_instance['request'].user.user_permissions.add(permission)

        user = User.objects.first()
        job = Job.objects.first()

        data = {
            'task': job.tasks.first().pk,
            'started_at': timezone.datetime(2018, 1, 1, 9, 0, 0),
            'ended_at': timezone.datetime(2018, 1, 1, 10, 0, 0),
            'user': user.pk
        }
        serializer = TimeEntrySerializer(data=data, context=context_instance)

        self.assertTrue(serializer.is_valid())

    def test_logged_in_user_can_save_their_own(self):
        request = RequestFactory().get('/')
        request.user = self.create_user()
        context_instance = RequestContext(request)

        job = Job.objects.first()

        data = {
            'task': job.tasks.first().pk,
            'started_at': timezone.datetime(2018, 1, 1, 9, 0, 0),
            'ended_at': timezone.datetime(2018, 1, 1, 10, 0, 0),
            'user': request.user.pk
        }
        serializer = TimeEntrySerializer(data=data, context=context_instance)

        self.assertTrue(serializer.is_valid())

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
        self.assertEqual(
            serializer.errors,
            {'non_field_errors': ['A time entry cannot span multiple days']}
        )

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
        self.assertEqual(
            serializer.errors,
            {'ended_at': ['Ended at must be after Started at']}
        )
