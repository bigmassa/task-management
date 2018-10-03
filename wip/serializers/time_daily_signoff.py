from copy import copy

from rest_framework import serializers, validators
from rest_framework.exceptions import ValidationError

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

    def _user(self):
        request = getattr(self.context, 'request', None)
        if request:
            return request.user

    def _has_manage_perm(self, attrs):
        current_user = self._user()
        user_to_save = attrs.get('user') or getattr(self.instance, 'user')
        if current_user and user_to_save:
            if current_user != user_to_save and not current_user.has_perm('wip.manage_time_daily_signoff'):
                return False
        return True

    def run_validators(self, value):
        # remove unique together when its new as we do a get or create
        for validator in copy(self.validators):
            if not self.instance and isinstance(validator, validators.UniqueTogetherValidator):
                self.validators.remove(validator)
        super().run_validators(value)

    def validate(self, attrs):
        # validate the user can save this
        if not self._has_manage_perm(attrs):
            raise ValidationError('You cannot save this record for another user')

        return super().validate(attrs)

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
