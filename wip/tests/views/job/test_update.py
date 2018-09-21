from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import Job


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.object = Job.objects.first()
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

    def test_can_create(self):
        self.client.force_login(self.user)

        data = {
            'title': "New Job Title",
            'client': 1,
            'type': 1,
            'estimated_hours': 0,
            'colour': "#000000",
            'status': 1
        }
        response = self.client.post(self.url, data)

        # test exists
        self.object.refresh_from_db()
        self.assertEqual(self.object.title, data['title'])
        self.assertEqual(self.object.client_id, data['client'])
        self.assertEqual(self.object.type_id, data['type'])
        self.assertEqual(self.object.estimated_hours, data['estimated_hours'])
        self.assertEqual(self.object.colour, data['colour'])
        self.assertEqual(self.object.status_id, data['status'])

        # test redirected after
        self.assertRedirects(response, self.object.get_absolute_url(), 302, 200)
