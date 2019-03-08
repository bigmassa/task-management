from rest_framework import serializers

from tests.test_case import AppTestCase
from wip.models import Job
from wip.serializers import JobSerializer


class TestSerializer(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def test_subclass(self):
        self.assertTrue(issubclass(JobSerializer, serializers.ModelSerializer))

    def test_model(self):
        self.assertEqual(JobSerializer.Meta.model, Job)

    def test_fields(self):
        self.assertEqual(
            JobSerializer.Meta.fields,
            [
                'id',
                'title',
                'description',
                'created_at',
                'client',
                'type',
                'estimated_hours',
                'colour',
                'status',
                'billed_to',
                'slack_channel_id'
            ]
        )

    def test_serialized_data(self):
        instance = Job.objects.first()
        serializer = JobSerializer(instance=instance)
        self.assertEqual(
            serializer.data,
            {
                'id': instance.pk,
                'title': instance.title,
                'description': instance.description,
                'created_at': instance.created_at.isoformat()[:-6] + 'Z',
                'client': instance.client.pk,
                'type': instance.type.pk,
                'estimated_hours': str(instance.estimated_hours),
                'colour': instance.colour,
                'status': instance.status.pk,
                'billed_to': instance.billed_to.isoformat(),
                'slack_channel_id': instance.slack_channel_id
            }
        )
