from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import Job, Task


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.job = Job.objects.first()
        self.url = reverse('wip:task-create', kwargs={'pk': self.job.pk})
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
            'title': "New Task",
            'status': 1
        }
        response = self.client.post(self.url, data)

        # test exists
        task = Task.objects.get(title=data['title'])
        self.assertEqual(task.job, self.job)
        self.assertEqual(task.status_id, data['status'])

        # test redirected after
        self.assertRedirects(response, task.get_absolute_url(), 302, 200)
