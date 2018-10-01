from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from tests.test_case import AppTestCase
from wip.api import JobViewSet
from wip.api.job import JobFilter
from wip.models import Job
from wip.serializers import JobSerializer


class TestAPI(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.user = self.create_user()
        self.client = APIClient()
        self.client.force_login(self.user)
        self.base_url = reverse('wip:job-list')
        self._create_test_object()

    def _create_test_object(self):
        self.test_object = Job.objects.first()
        self.test_object_data = JobSerializer(instance=self.test_object).data
        self.test_object_url = self.base_url + str(self.test_object.pk) + '/'

    def test_filter_class(self):
        self.assertEqual(JobViewSet.filter_class, JobFilter)

    def test_list(self):
        response = self.client.get(self.base_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [self.test_object_data])

    def test_post(self):
        del self.test_object_data['id']
        del self.test_object_data['created_at']
        del self.test_object_data['allocated_hours']
        del self.test_object_data['time_spent_hours']
        self.test_object_data['title'] = 'some title'
        response = self.client.post(self.base_url, self.test_object_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.test_object_data['client_id'] = self.test_object_data.pop('client')
        self.test_object_data['type_id'] = self.test_object_data.pop('type')
        self.test_object_data['status_id'] = self.test_object_data.pop('status')
        Job.objects.get(**self.test_object_data)

    def test_detail(self):
        response = self.client.get(self.test_object_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), self.test_object_data)

    def test_put(self):
        self.test_object_data['title'] = 'some title'
        del self.test_object_data['created_at']
        del self.test_object_data['allocated_hours']
        del self.test_object_data['time_spent_hours']
        response = self.client.put(self.test_object_url, self.test_object_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.test_object_data['client_id'] = self.test_object_data.pop('client')
        self.test_object_data['type_id'] = self.test_object_data.pop('type')
        self.test_object_data['status_id'] = self.test_object_data.pop('status')
        Job.objects.get(**self.test_object_data)

    def test_delete(self):
        response = self.client.delete(self.test_object_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Job.DoesNotExist):
            Job.objects.get(pk=self.test_object.pk)
