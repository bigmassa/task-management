from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from authentication.models import User
from wip import models


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('user_id', type=int)
        parser.add_argument('reassign_to_id', type=int)

    def handle(self, *args, **options):
        try:
            from_user = User.objects.get(pk=options['user_id'])
        except User.DoesNotExist:
            raise CommandError('User "%s" does not exist' % options['user_id'])

        try:
            to_user = User.objects.get(pk=options['reassign_to_id'])
        except User.DoesNotExist:
            raise CommandError('User "%s" does not exist' % options['reassign_to_id'])

        with transaction.atomic():
            models.JobFile.objects.filter(uploaded_by=from_user).update(uploaded_by=to_user)
            models.JobNote.objects.filter(user=from_user).update(user=to_user)
            models.JobRelationship.objects.filter(user=from_user).update(user=to_user)
            models.TaskAssignee.objects.filter(user=from_user).update(user=to_user)
            models.TaskNote.objects.filter(user=from_user).update(user=to_user)
            models.TimeEntry.objects.filter(user=from_user).update(user=to_user)

        self.stdout.write(self.style.SUCCESS('Successfully reassigned data for "%s" to "%s"' % (from_user, to_user)))
