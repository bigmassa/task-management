from rest_framework import serializers

from authentication.models import User
from wip.models import TimeEntry


def get_users():
    choices = ()
    for user in User.objects.all():
        choices += ((user.id, str(user)),)
    return choices


class TimeEntrySignoffSerializer(serializers.Serializer):
    date = serializers.DateField()
    user = serializers.ChoiceField(choices=get_users())

    def create(self, validated_data):
        pass  # just stub out

    def update(self, instance, validated_data):
        pass  # just stub out
