from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import ClientContact


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.object = ClientContact.objects.first()
        self.url = reverse('wip:clientcontact-delete', kwargs={'pk': self.object.pk})
        self.user = self.create_user()

    def test_login_required(self):
        response = self.client.get(self.url)
        expected_url = '{}?next={}'.format(reverse('login'), self.url)
        self.assertRedirects(response, expected_url, 302, 200)

    def test_logged_in_grants_access(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_can_delete(self):
        self.client.force_login(self.user)

        response = self.client.post(self.url, {})

        # test redirected after
        self.assertRedirects(response, self.object.client.get_absolute_url(), 302, 200)

        # test updated
        with self.assertRaises(ObjectDoesNotExist):
            self.object.refresh_from_db()
