from django.core.management import call_command
from django.db.models import ProtectedError

from authentication.models import User
from tests.test_case import AppTestCase


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.user_to_be_reassigned = User.objects.first()
        self.user_to_reassign_to = self.create_user()

    def test_user_cannot_be_deleted(self):
        with self.assertRaises(ProtectedError):
            self.user_to_be_reassigned.delete()

    def test_once_reassigned_can_be_deleted(self):
        call_command('reassignuserdata', self.user_to_be_reassigned.pk, self.user_to_reassign_to.pk)
        self.user_to_be_reassigned.delete()
