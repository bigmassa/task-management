from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import TaskAssigneeBinding
from wip.models import TaskAssignee
from wip.serializers import TaskAssigneeSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(TaskAssigneeBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(TaskAssigneeBinding.model, TaskAssignee)

    def test_serializer(self):
        self.assertEqual(TaskAssigneeBinding.serializer, TaskAssigneeSerializer)
