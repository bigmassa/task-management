from copy import copy

from rest_framework import serializers, validators

from wip.models import TimeDailySignoff


class TimeDailySignoffSerializer(serializers.ModelSerializer):

    class Meta:
        model = TimeDailySignoff
        fields = [
            'id',
            'user',
            'date',
            'completed'
        ]

    def run_validators(self, value):
        # remove unique together when its new as we do a get or create
        for validator in copy(self.validators):
            if not self.instance and isinstance(validator, validators.UniqueTogetherValidator):
                self.validators.remove(validator)
        super().run_validators(value)

    def create(self, validated_data):
        entry, created = TimeDailySignoff.objects.get_or_create(
            date=validated_data['date'],
            user=validated_data['user'],
            defaults={
                'completed': validated_data['completed']
            }
        )

        if not created:
            entry.completed = validated_data['completed']
            entry.save()

        return entry
