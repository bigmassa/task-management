from rest_framework import serializers

from wip.models import TimeEntry


class TimeEntrySerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    colour = serializers.SerializerMethodField()

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
            'colour'
        ]

    def get_title(self, obj):
        return '%s - %s' % (obj.task.job, obj.task)

    def get_colour(self, obj):
        return obj.task.job.colour
