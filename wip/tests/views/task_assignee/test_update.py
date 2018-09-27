from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import Task, TaskAssignee


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.object = Task.objects.first()
        self.url = reverse('wip:taskassignee-update', kwargs={'pk': self.object.pk})
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
            'assignees-TOTAL_FORMS': '1',
            'assignees-INITIAL_FORMS': '1',
            'assignees-MIN_NUM_FORMS': '0',
            'assignees-MAX_NUM_FORMS': '10',
            'assignees-0-id': 1,
            'assignees-0-task': self.object.pk,
            'assignees-0-user': self.user.pk,
            'assignees-0-allocated_hours': '100.00'
        }
        response = self.client.post(self.url, data)

        # test exists
        TaskAssignee.objects.get(
            pk=1,
            task=self.object,
            user=self.user,
            allocated_hours='100.00'
        )

        # test redirected after
        self.assertRedirects(response, self.object.get_absolute_url(), 302, 200)

    def test_success_message_in_response(self):
        self.client.force_login(self.user)
        data = {
            'assignees-TOTAL_FORMS': '1',
            'assignees-INITIAL_FORMS': '1',
            'assignees-MIN_NUM_FORMS': '0',
            'assignees-MAX_NUM_FORMS': '10',
            'assignees-0-id': 1,
            'assignees-0-task': self.object.pk,
            'assignees-0-user': self.user.pk,
            'assignees-0-allocated_hours': '100.00'
        }
        content = self.client.post(self.url, data, follow=True).content

        self.assertIn('toastr["success"]("Updated successfully", "Success");', str(content))
