from django.urls import reverse

from tests.test_case import AppTestCase


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.url = reverse('wip:make-call', kwargs={'telephone_number': '00000000000'})
        self.user = self.create_user()

    def test_login_required(self):
        response = self.client.get(self.url)
        expected_url = '{}?next={}'.format(reverse('login'), self.url)
        self.assertRedirects(response, expected_url, 302, 200)

    def test_login_grants_access_but_no_get(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 405)

    def test_post__missing_gradwell_details(self):
        self.client.force_login(self.user)

        response = self.client.post(self.url, {})

        self.assertEqual(response.status_code, 400)

        # ensure correct response
        response_dict = {
            'status': 'error',
            'message': 'You are missing your gradwell details'
        }

        self.assertJSONEqual(response.content, response_dict)
