from django.db import models

from tests.test_case import AppTestCase
from .models import WIPSettings


class WIPSettingsTests(AppTestCase):
    def test_slack_auth_token_field(self):
        field = WIPSettings._meta.get_field('slack_authentication_token')
        self.assertModelField(field, models.CharField)
        self.assertEqual(field.max_length, 255)
        self.assertEqual(field.help_text, 'Use the OAuth Access Token found in the Slack integration.')

    def test_timesheet_check_range(self):
        field = WIPSettings._meta.get_field('timesheet_check_range')
        self.assertModelField(field, models.PositiveIntegerField)
        self.assertEqual(field.default, 7)
        self.assertEqual(
            field.help_text,
            'Specifies the number of days to check for missing past timesheet entries.'
        )
