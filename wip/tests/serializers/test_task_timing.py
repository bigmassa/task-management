from rest_framework import serializers

from tests.test_case import AppTestCase
from wip.models import TaskTiming
from wip.serializers import TaskTimingSerializer


class TestSerializer(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def test_subclass(self):
        self.assertTrue(issubclass(TaskTimingSerializer, serializers.ModelSerializer))

    def test_model(self):
        self.assertEqual(TaskTimingSerializer.Meta.model, TaskTiming)

    def test_fields(self):
        self.assertEqual(
            TaskTimingSerializer.Meta.fields,
            [
                'id',
                'task',
                'allocated_hours',
                'time_spent_hours'
            ]
        )

    def test_serialized_data(self):
        instance = TaskTiming.objects.first()
        serializer = TaskTimingSerializer(instance=instance)
        self.assertEqual(
            serializer.data,
            {
                'id': instance.pk,
                'task': instance.task_id,
                'allocated_hours': str(instance.allocated_hours),
                'time_spent_hours': str(instance.time_spent_hours)
            }
        )
