from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import ClientContact


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.object = ClientContact.objects.first()
        self.url = self.object.get_update_url()
        self.user = self.create_user()

    def test_login_required(self):
        response = self.client.get(self.url)
        expected_url = '{}?next={}'.format(reverse('login'), self.url)
        self.assertRedirects(response, expected_url, 302, 200)

    def test_logged_in_grants_access(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_can_update(self):
        self.client.force_login(self.user)

        data = {
            'first_name': "Some",
            'last_name': "One"
        }
        response = self.client.post(self.url, data)

        # test exists
        self.object.refresh_from_db()
        self.assertEqual(self.object.first_name, data['first_name'])
        self.assertEqual(self.object.last_name, data['last_name'])

        # test redirected after
        self.assertRedirects(response, self.object.client.get_absolute_url(), 302, 200)
