from rest_framework import serializers

from wip.models import TaskTiming


class TaskTimingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskTiming
        fields = [
            'id',
            'task',
            'allocated_hours',
            'time_spent_hours'
        ]
