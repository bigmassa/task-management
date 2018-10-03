from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from wip.models import TimeEntry


class TimeEntrySerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    colour = serializers.SerializerMethodField()
    duration = serializers.DurationField(
        read_only=True
    )

    class Meta:
        model = TimeEntry
        fields = [
            'id',
            'started_at',
            'ended_at',
            'comments',
            'task',
            'user',
            'title',
            'colour',
            'duration'
        ]

    def _user(self):
        request = getattr(self.context, 'request', None)
        if request:
            return request.user

    def _has_manage_perm(self, attrs):
        current_user = self._user()
        user_to_save = attrs.get('user') or getattr(self.instance, 'user')
        if current_user and user_to_save:
            if current_user != user_to_save and not current_user.has_perm('wip.manage_time_entry'):
                return False
        return True

    def validate(self, attrs):
        # validate the user can save this
        if not self._has_manage_perm(attrs):
            raise ValidationError('You cannot save this record for another user')

        # validate the date range
        if attrs['ended_at'].date() > attrs['started_at'].date():
            raise ValidationError('Time entry cannot span multiple days')

        if attrs['ended_at'] <= attrs['started_at']:
            raise ValidationError({'ended_at': 'Must be after Started at'})

        return super().validate(attrs)

    def get_title(self, obj):
        return '%s - %s' % (obj.task.job, obj.task)

    def get_colour(self, obj):
        return obj.task.job.colour
