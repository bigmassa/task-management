from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import ClientContactBinding
from wip.models import ClientContact
from wip.serializers import ClientContactSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(ClientContactBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(ClientContactBinding.model, ClientContact)

    def test_serializer(self):
        self.assertEqual(ClientContactBinding.serializer, ClientContactSerializer)
