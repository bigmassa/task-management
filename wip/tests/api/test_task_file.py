from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from tests.test_case import AppTestCase
from wip.api import TaskFileViewSet
from wip.api.task_file import TaskFileFilter
from wip.models import Task, TaskFile
from wip.serializers import TaskFileSerializer


class TestAPI(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.user = self.create_user()
        self.client = APIClient()
        self.client.force_login(self.user)
        self.base_url = reverse('api:taskfile-list')
        self._create_test_object()

    def _create_test_object(self):
        task = Task.objects.first()
        self.test_object = TaskFile.objects.create(
            task=task,
            file=self.get_temporary_image(),
            uploaded_by=self.user
        )
        self.test_object_data = TaskFileSerializer(instance=self.test_object).data
        self.test_object_url = self.base_url + str(self.test_object.pk) + '/'

    def test_filter_class(self):
        self.assertEqual(TaskFileViewSet.filter_class, TaskFileFilter)

    def test_list(self):
        self.test_object_data['file'] = 'http://testserver' + self.test_object_data['file']
        response = self.client.get(self.base_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [self.test_object_data])

    def test_post(self):
        del self.test_object_data['id']
        self.test_object_data['file'] = self.get_temporary_image()
        response = self.client.post(self.base_url, self.test_object_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TaskFile.objects.count(), 2)  # just test it was created, too awkward

    def test_detail(self):
        self.test_object_data['file'] = 'http://testserver' + self.test_object_data['file']
        response = self.client.get(self.test_object_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), self.test_object_data)

    def test_put(self):
        self.test_object_data['file'] = self.get_temporary_image()
        response = self.client.put(self.test_object_url, self.test_object_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(TaskFile.objects.count(), 1)  # just test it's still there, too awkward

    def test_delete(self):
        response = self.client.delete(self.test_object_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(TaskFile.DoesNotExist):
            TaskFile.objects.get(pk=self.test_object.pk)
