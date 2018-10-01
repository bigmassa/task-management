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

    def validate(self, attrs):
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
