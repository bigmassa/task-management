from django.db import transaction

from app.bindings import BaseModelBinding, BATCH_UPDATE
from wip.serializers import TaskSerializer
from wip.models import Task
from wip.signals import post_bulk_update


class TaskBinding(BaseModelBinding):
    model = Task
    serializer = TaskSerializer

    @classmethod
    def register(cls):
        super().register()
        post_bulk_update.connect(cls.post_batch_update_receiver, sender=cls.model)

    @classmethod
    def post_batch_update_receiver(cls, sender, updated_pks, **kwargs):
        """ Reciever of the post_bulk_update signal, On commit call process_message. """

        instances = sender.objects.filter(pk__in=updated_pks)
        transaction.on_commit(lambda: cls.process_batch_message(instances, BATCH_UPDATE))
