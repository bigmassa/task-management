from rest_framework import serializers

from tests.test_case import AppTestCase
from wip.models import JobTiming
from wip.serializers import JobTimingSerializer


class TestSerializer(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def test_subclass(self):
        self.assertTrue(issubclass(JobTimingSerializer, serializers.ModelSerializer))

    def test_model(self):
        self.assertEqual(JobTimingSerializer.Meta.model, JobTiming)

    def test_fields(self):
        self.assertEqual(
            JobTimingSerializer.Meta.fields,
            [
                'id',
                'job',
                'allocated_hours',
                'time_spent_hours',
                'is_over_allocated_hours'
            ]
        )

    def test_serialized_data(self):
        instance = JobTiming.objects.first()
        serializer = JobTimingSerializer(instance=instance)
        self.assertEqual(
            serializer.data,
            {
                'id': instance.pk,
                'job': instance.job_id,
                'allocated_hours': str(instance.allocated_hours),
                'time_spent_hours': str(instance.time_spent_hours),
                'is_over_allocated_hours': instance.is_over_allocated_hours
            }
        )
