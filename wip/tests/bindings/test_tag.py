from app.bindings import BaseModelBinding
from taggit.models import Tag
from tests.test_case import AppTestCase
from wip.bindings import TagBinding
from wip.serializers import TagSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(TagBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(TagBinding.model, Tag)

    def test_serializer(self):
        self.assertEqual(TagBinding.serializer, TagSerializer)
