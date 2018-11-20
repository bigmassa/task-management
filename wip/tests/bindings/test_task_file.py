from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import TaskFileBinding
from wip.models import TaskFile
from wip.serializers import TaskFileSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(TaskFileBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(TaskFileBinding.model, TaskFile)

    def test_serializer(self):
        self.assertEqual(TaskFileBinding.serializer, TaskFileSerializer)
