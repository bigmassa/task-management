from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import JobTimingBinding
from wip.models import JobTiming
from wip.serializers import JobTimingSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(JobTimingBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(JobTimingBinding.model, JobTiming)

    def test_serializer(self):
        self.assertEqual(JobTimingBinding.serializer, JobTimingSerializer)
