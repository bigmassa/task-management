from copy import deepcopy

from django.db import transaction
from django.db.models.signals import post_delete, post_save

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


BATCH_UPDATE = 'batch_update'
CREATE = 'create'
UPDATE = 'update'
DELETE = 'delete'


class BindingMetaclass(type):
    _instances = []

    def __new__(mcs, name, bases, attrs):
        new_class = super(BindingMetaclass, mcs).__new__(mcs, name, bases, attrs)
        # if there is a model we can use it for data binding
        if new_class.model:
            mcs._instances.append(new_class)
        return new_class

    @classmethod
    def register_all(cls):
        for instance in cls._instances:
            instance.register()


class BaseModelBinding(metaclass=BindingMetaclass):
    group_name = 'data_binding'
    model = None
    serializer = None

    @classmethod
    def _get_model_label(cls):
        """ Return string in the format of 'app.model' """

        return '%s.%s' % (cls.model._meta.app_label.lower(), cls.model._meta.object_name.lower())

    @classmethod
    def register(cls):
        """ Register a models for its post save and delete signals """

        post_save.connect(cls.post_save_receiver, sender=cls.model)
        post_delete.connect(cls.post_delete_receiver, sender=cls.model)

    @classmethod
    def post_save_receiver(cls, instance, created, **kwargs):
        """ Reciever of the post_save signal, On commit call process_message. """

        method = CREATE if created else UPDATE
        transaction.on_commit(lambda: cls.process_message(instance, method))

    @classmethod
    def post_delete_receiver(cls, instance, **kwargs):
        """ Reciever of the post_delete signal, On commit call process_message. """

        # copy before on_commit hook as pk will be null on the original instance
        cached_copy = deepcopy(instance)
        transaction.on_commit(lambda: cls.process_message(cached_copy, DELETE))

    @classmethod
    def process_message(cls, instance, action):
        """ Prepare and send the msg payload to the channel layer """

        payload = cls.prepare_payload(instance, action)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(cls.group_name, payload)

    @classmethod
    def process_batch_message(cls, instances, action):
        """ Prepare and send the msg payload to the channel layer """

        payload = cls.prepare_batch_payload(instances, action)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(cls.group_name, payload)

    @classmethod
    def prepare_payload(cls, instance, action):
        """ Prepare data payload for a single object """

        return {
            'type': 'data.binding',
            'action': action,
            'pk': instance.pk,
            'model': cls._get_model_label(),
            'data': cls.serializer(instance=instance).data
        }

    @classmethod
    def prepare_batch_payload(cls, instances, action):
        """ Prepare data payload for many onjects """

        return {
            'type': 'data.binding',
            'action': action,
            'pks': [instance.pk for instance in instances],
            'model': cls._get_model_label(),
            'data': cls.serializer(instance=instances, many=True).data
        }
