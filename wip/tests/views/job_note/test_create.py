from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import Job, JobNote


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.job = Job.objects.first()
        self.url = reverse('wip:jobnote-create', kwargs={'pk': self.job.pk})
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
        note = JobNote.objects.get(note=data['note'])
        self.assertEqual(note.job, self.job)

        # test redirected after
        self.assertRedirects(response, note.job.get_absolute_url(), 302, 200)
