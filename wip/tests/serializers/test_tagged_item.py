from rest_framework import serializers
from taggit.models import TaggedItem

from tests.test_case import AppTestCase
from wip.serializers import TaggedItemSerializer


class TestSerializer(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def test_subclass(self):
        self.assertTrue(issubclass(TaggedItemSerializer, serializers.ModelSerializer))

    def test_model(self):
        self.assertEqual(TaggedItemSerializer.Meta.model, TaggedItem)

    def test_fields(self):
        self.assertEqual(
            TaggedItemSerializer.Meta.fields,
            [
                'id',
                'object_id',
                'tag'
            ]
        )

    def test_serialized_data(self):
        instance = TaggedItem.objects.first()
        serializer = TaggedItemSerializer(instance=instance)
        self.assertEqual(
            serializer.data,
            {
                'id': instance.pk,
                'object_id': instance.object_id,
                'tag': instance.tag.pk
            }
        )
