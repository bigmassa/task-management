from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import JobRelationshipBinding
from wip.models import JobRelationship
from wip.serializers import JobRelationshipSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(JobRelationshipBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(JobRelationshipBinding.model, JobRelationship)

    def test_serializer(self):
        self.assertEqual(JobRelationshipBinding.serializer, JobRelationshipSerializer)
