from app.bindings import BaseModelBinding
from tests.test_case import AppTestCase
from wip.bindings import JobRecurringCostBinding
from wip.models import JobRecurringCost
from wip.serializers import JobRecurringCostSerializer


class TestBinding(AppTestCase):

    def test_inheritance(self):
        self.assertTrue(issubclass(JobRecurringCostBinding, BaseModelBinding))

    def test_model(self):
        self.assertEqual(JobRecurringCostBinding.model, JobRecurringCost)

    def test_serializer(self):
        self.assertEqual(JobRecurringCostBinding.serializer, JobRecurringCostSerializer)
