from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import Client


class TestView(AppTestCase):

    def setUp(self):
        self.object = Client.objects.create(name='Test Client')
        self.url = self.object.get_absolute_url()
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
            'name': 'Test Client - Updated'
        }
        response = self.client.post(self.url, data)

        # test redirected after
        self.assertRedirects(response, reverse('wip:client-list'), 302, 200)

        # test updated
        Client.objects.get(pk=self.object.pk, **data)
