from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from tests.test_case import AppTestCase


class TestAPI(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.user = self.create_user()
        self.client = APIClient()
        self.client.force_login(self.user)
        self.base_url = reverse('api:protected-list')

    def test_list_empty_when_no_params_set(self):
        response = self.client.get(self.base_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_list_empty_when_invalid_app_label(self):
        params = '?app_label=invalid&model_name=taskstatus&pk=1'
        response = self.client.get(self.base_url + params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_list_empty_when_invalid_model_name(self):
        params = '?app_label=wip&model_name=invalid&pk=1'
        response = self.client.get(self.base_url + params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_list_empty_when_invalid_pk(self):
        params = '?app_label=wip&model_name=taskstatus&pk=100'
        response = self.client.get(self.base_url + params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_list_with_valid_data(self):
        params = '?app_label=wip&model_name=taskstatus&pk=1'
        response = self.client.get(self.base_url + params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.json(),
            [{'pk': 1, 'verbose_name': 'task', 'verbose_name_plural': 'tasks'}]
        )
