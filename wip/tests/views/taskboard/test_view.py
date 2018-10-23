from decimal import Decimal

from django.urls import reverse

from authentication.models import User
from tests.test_case import AppTestCase
from wip.forms.filter import UserFilterForm


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.url = reverse('wip:taskboard')
        self.user = User.objects.first()

    def test_login_required(self):
        response = self.client.get(self.url)
        expected_url = '{}?next={}'.format(reverse('login'), self.url)
        self.assertRedirects(response, expected_url, 302, 200)

    def test_logged_in_grants_access(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_context(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)

        self.assertTrue(isinstance(response.context[0]['form'], UserFilterForm))
        self.assertEqual(response.context[0]['tasks'].count(), 1)
        self.assertEqual(response.context[0]['count'], 1)
        self.assertEqual(response.context[0]['overdue'], 1)
        self.assertEqual(response.context[0]['allocated_hours'], Decimal('10.00'))
