from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import TaskTimingBinding
from wip.models import TaskTiming
from wip.serializers import TaskTimingSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(TaskTimingBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(TaskTimingBinding.model, TaskTiming)

    def test_serializer(self):
        self.assertEqual(TaskTimingBinding.serializer, TaskTimingSerializer)
