from rest_framework import serializers

from authentication.models import User
from wip.models import TaskStatus


class TaskStatusChoiceField(serializers.RelatedField):
    queryset = TaskStatus.objects.all()

    def to_internal_value(self, data):
        if data:
            return self.queryset.get(pk=data)
        return None

    def to_representation(self, value):
        if value:
            return value.pk
        return None


class UserChoiceField(serializers.RelatedField):
    queryset = User.objects.all()

    def to_internal_value(self, data):
        if data:
            return self.queryset.get(pk=data)
        return None

    def to_representation(self, value):
        if value:
            return value.pk
        return None
