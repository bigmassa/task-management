from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import Client, ClientContact


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.client_obj = Client.objects.first()
        self.url = reverse('wip:clientcontact-create', kwargs={'pk': self.client_obj.pk})
        self.user = self.create_user()

    def test_login_required(self):
        response = self.client.get(self.url)
        expected_url = '{}?next={}'.format(reverse('login'), self.url)
        self.assertRedirects(response, expected_url, 302, 200)

    def test_logged_in_grants_access(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_can_create(self):
        self.client.force_login(self.user)

        data = {
            'first_name': "Some",
            'last_name': "One"
        }
        response = self.client.post(self.url, data)

        # test exist
        contact = ClientContact.objects.get(client=self.client_obj, **data)

        # test redirected after
        self.assertRedirects(response, contact.client.get_absolute_url(), 302, 200)

    def test_success_message_in_response(self):
        self.client.force_login(self.user)

        data = {
            'first_name': "Some",
            'last_name': "One"
        }
        content = self.client.post(self.url, data, follow=True).content

        self.assertIn('toastr["success"]("Created successfully", "Success");', str(content))
