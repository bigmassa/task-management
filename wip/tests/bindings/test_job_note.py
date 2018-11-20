from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import JobNoteBinding
from wip.models import JobNote
from wip.serializers import JobNoteSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(JobNoteBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(JobNoteBinding.model, JobNote)

    def test_serializer(self):
        self.assertEqual(JobNoteBinding.serializer, JobNoteSerializer)
