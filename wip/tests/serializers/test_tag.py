from rest_framework import serializers
from taggit.models import Tag

from tests.test_case import AppTestCase
from wip.serializers import TagSerializer


class TestSerializer(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def test_subclass(self):
        self.assertTrue(issubclass(TagSerializer, serializers.ModelSerializer))

    def test_model(self):
        self.assertEqual(TagSerializer.Meta.model, Tag)

    def test_fields(self):
        self.assertEqual(
            TagSerializer.Meta.fields,
            [
                'id',
                'name',
                'slug'
            ]
        )

    def test_serialized_data(self):
        instance = Tag.objects.first()
        serializer = TagSerializer(instance=instance)
        self.assertEqual(
            serializer.data,
            {
                'id': instance.pk,
                'name': instance.name,
                'slug': instance.slug
            }
        )
