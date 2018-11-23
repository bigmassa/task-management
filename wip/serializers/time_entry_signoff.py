from rest_framework import serializers

from .fields import UserChoiceField
from wip.models import TimeEntry


class TimeEntrySignoffSerializer(serializers.Serializer):
    date = serializers.DateField()
    user = UserChoiceField()

    def create(self, validated_data):
        pass  # just stub out

    def update(self, instance, validated_data):
        pass  # just stub out
