from rest_framework import serializers

from tests.test_case import AppTestCase
from wip.models import Client
from wip.serializers import ClientSerializer


class TestSerializer(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def test_subclass(self):
        self.assertTrue(issubclass(ClientSerializer, serializers.ModelSerializer))

    def test_model(self):
        self.assertEqual(ClientSerializer.Meta.model, Client)

    def test_fields(self):
        self.assertEqual(
            ClientSerializer.Meta.fields,
            [
                'id',
                'name',
                'colour',
                'phone_number',
                'email_address',
                'website',
                'address',
                'notes'
            ]
        )

    def test_serialized_data(self):
        instance = Client.objects.first()
        serializer = ClientSerializer(instance=instance)
        self.assertEqual(
            serializer.data,
            {
                'id': instance.pk,
                'name': instance.name,
                'colour': instance.colour,
                'phone_number': instance.phone_number,
                'email_address': instance.email_address,
                'website': instance.website,
                'address': instance.address,
                'notes': instance.notes
            }
        )
