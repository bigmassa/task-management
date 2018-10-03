import datetime

from django.contrib.auth.models import Permission
from django.template import RequestContext
from django.test import RequestFactory
from rest_framework import serializers

from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import TimeDailySignoff
from wip.serializers import TimeDailySignoffSerializer


class TestSerializer(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def test_subclass(self):
        self.assertTrue(issubclass(TimeDailySignoffSerializer, serializers.ModelSerializer))

    def test_model(self):
        self.assertEqual(TimeDailySignoffSerializer.Meta.model, TimeDailySignoff)

    def test_fields(self):
        self.assertEqual(
            TimeDailySignoffSerializer.Meta.fields,
            [
                'id',
                'user',
                'date',
                'completed'
            ]
        )

    def test_serialized_data(self):
        user = self.create_user()
        instance = TimeDailySignoff.objects.create(
            date=datetime.date(2018, 1, 1),
            user=user,
            completed=True
        )
        serializer = TimeDailySignoffSerializer(instance=instance)
        self.assertEqual(
            serializer.data,
            {
                'id': instance.pk,
                'user': instance.user.pk,
                'date': instance.date.isoformat(),
                'completed': instance.completed
            }
        )

    # validation

    def test_user_without_correct_perm_cannot_save_for_another_user(self):
        request = RequestFactory().get('/')
        request.user = self.create_user()
        context_instance = RequestContext(request)

        user = User.objects.first()

        data = {
            'user': user.pk,
            'date': datetime.date(2018, 1, 1),
            'completed': True
        }
        serializer = TimeDailySignoffSerializer(data=data, context=context_instance)

        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors, {'non_field_errors': ['You cannot save this record for another user']})

    def test_user_with_correct_perm_can_save_for_another_user(self):
        request = RequestFactory().get('/')
        request.user = self.create_user()
        permission = Permission.objects.get(codename='manage_time_daily_signoff')
        request.user.user_permissions.add(permission)
        context_instance = RequestContext(request)

        user = User.objects.first()

        data = {
            'user': user.pk,
            'date': datetime.date(2018, 1, 1),
            'completed': True
        }
        serializer = TimeDailySignoffSerializer(data=data, context=context_instance)

        self.assertTrue(serializer.is_valid())

    def test_logged_in_user_can_save_their_own(self):
        request = RequestFactory().get('/')
        request.user = self.create_user()
        context_instance = RequestContext(request)

        data = {
            'user': request.user.pk,
            'date': datetime.date(2018, 1, 1),
            'completed': True
        }
        serializer = TimeDailySignoffSerializer(data=data, context=context_instance)

        self.assertTrue(serializer.is_valid())
