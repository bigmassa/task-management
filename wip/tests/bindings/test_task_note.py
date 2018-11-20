from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import TaskNoteBinding
from wip.models import TaskNote
from wip.serializers import TaskNoteSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(TaskNoteBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(TaskNoteBinding.model, TaskNote)

    def test_serializer(self):
        self.assertEqual(TaskNoteBinding.serializer, TaskNoteSerializer)
