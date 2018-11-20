from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import ClientBinding
from wip.models import Client
from wip.serializers import ClientSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(ClientBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(ClientBinding.model, Client)

    def test_serializer(self):
        self.assertEqual(ClientBinding.serializer, ClientSerializer)
