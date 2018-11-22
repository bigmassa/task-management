from rest_framework import serializers

from authentication.models import User
from wip.models import TimeEntry


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


class TimeEntrySignoffSerializer(serializers.Serializer):
    date = serializers.DateField()
    user = UserChoiceField()

    def create(self, validated_data):
        pass  # just stub out

    def update(self, instance, validated_data):
        pass  # just stub out
