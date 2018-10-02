import datetime

from rest_framework import serializers

from tests.test_case import AppTestCase
from wip.models import TimeDailySignoff
from wip.serializers import TimeDailySignoffSerializer


class TestSerializer(AppTestCase):

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
