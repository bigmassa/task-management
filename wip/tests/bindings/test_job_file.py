from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import JobFileBinding
from wip.models import JobFile
from wip.serializers import JobFileSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(JobFileBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(JobFileBinding.model, JobFile)

    def test_serializer(self):
        self.assertEqual(JobFileBinding.serializer, JobFileSerializer)
