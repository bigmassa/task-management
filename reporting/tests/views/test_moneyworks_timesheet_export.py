import csv
import io

from django.urls import reverse
from django.utils import timezone

from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import Job, TimeEntry


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.url = reverse('reporting:report-moneyworks-timesheet-export')
        self.user = User.objects.first()
        self._create_test_object()

    def _create_test_object(self):
        job = Job.objects.first()
        TimeEntry.objects.create(
            task=job.tasks.first(),
            started_at=timezone.datetime(2018, 1, 2, 9, 0, 0),
            ended_at=timezone.datetime(2018, 1, 2, 9, 15, 0),
            user=self.user,
            comments='some comments'
        )

    def test_login_required(self):
        response = self.client.get(self.url)
        expected_url = '{}?next={}'.format(reverse('login'), self.url)
        self.assertRedirects(response, expected_url, 302, 200)

    def test_logged_in_grants_access(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_post_gets_csv(self):
        data = {
            'date_from': '01/01/2018',
            'date_to': '31/01/2018'
        }
        self.client.force_login(self.user)
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 200)

        content = response.content.decode('utf-8')
        cvs_reader = csv.reader(io.StringIO(content))
        body = list(cvs_reader)

        self.assertEqual(body, [
            [
                '1',
                '0.25',
                'UT',
                '',
                '02/01/2018',
                'AU',
                '',
                '',
                '',
                '',
                'Update some bits and bobs: some comments'
            ]
        ])
