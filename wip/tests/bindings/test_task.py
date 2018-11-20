from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import TaskBinding
from wip.models import Task
from wip.serializers import TaskSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(TaskBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(TaskBinding.model, Task)

    def test_serializer(self):
        self.assertEqual(TaskBinding.serializer, TaskSerializer)
