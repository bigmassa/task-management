from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import Task, TaskNote


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.task = Task.objects.first()
        self.url = reverse('wip:tasknote-create', kwargs={'pk': self.task.pk})
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
            'note': "Some note"
        }
        response = self.client.post(self.url, data)

        # test exists
        note = TaskNote.objects.get(note=data['note'])
        self.assertEqual(note.task, self.task)

        # test redirected after
        self.assertRedirects(response, note.task.get_absolute_url(), 302, 200)
