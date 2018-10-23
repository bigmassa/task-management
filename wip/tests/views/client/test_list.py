from django.urls import reverse

from tests.test_case import AppTestCase


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.url = reverse('wip:client-list')
        self.user = self.create_user()

    def test_login_required(self):
        response = self.client.get(self.url)
        expected_url = '{}?next={}'.format(reverse('login'), self.url)
        self.assertRedirects(response, expected_url, 302, 200)

    def test_logged_in_grants_access(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_search(self):
        self.client.force_login(self.user)

        # should have 1 entry
        search_url = '%s?search=accent' % self.url
        response = self.client.get(search_url)
        self.assertEqual(len(response.context[0]['object_list']), 1)

        # should have 0 entries when term not found
        search_url = '%s?search=nothing' % self.url
        response = self.client.get(search_url)
        self.assertEqual(len(response.context[0]['object_list']), 0)

        # should have 0 entries with no term
        search_url = '%s?search=' % self.url
        response = self.client.get(search_url)
        self.assertEqual(len(response.context[0]['object_list']), 0)

        # should have 0 entries initial state
        response = self.client.get(self.url)
        self.assertEqual(len(response.context[0]['object_list']), 0)
