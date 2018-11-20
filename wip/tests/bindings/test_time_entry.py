from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import TimeEntryBinding
from wip.models import TimeEntry
from wip.serializers import TimeEntrySerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(TimeEntryBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(TimeEntryBinding.model, TimeEntry)

    def test_serializer(self):
        self.assertEqual(TimeEntryBinding.serializer, TimeEntrySerializer)
