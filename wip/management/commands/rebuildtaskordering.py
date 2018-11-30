from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from wip.models import Task


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        tasks = Task.objects.all().order_by('job_id', 'status_id', 'order')
        job_id = None
        status_id = None
        order = 0

        with transaction.atomic():
            for task in tasks:

                # increment the order or reset on a status change
                if task.status_id != status_id or task.job_id != job_id:
                    order = 16384
                else:
                    order += 16384

                # set the status and job
                status_id = task.status_id
                job_id = task.job_id

                # set order and save
                task.order = order
                task.save()

        self.stdout.write(self.style.SUCCESS('Successfully reset order on %s tasks' % len(tasks)))
