from app.bindings import BaseModelBinding
from taggit.models import TaggedItem
from tests.test_case import AppTestCase
from wip.bindings import TaggedItemBinding
from wip.serializers import TaggedItemSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(TaggedItemBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(TaggedItemBinding.model, TaggedItem)

    def test_serializer(self):
        self.assertEqual(TaggedItemBinding.serializer, TaggedItemSerializer)
