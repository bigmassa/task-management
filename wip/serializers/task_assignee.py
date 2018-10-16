from rest_framework import serializers

from wip.models import TaskAssignee


class TaskAssigneeSerializer(serializers.ModelSerializer):
    time_spent_hours = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = TaskAssignee
        fields = [
            'id',
            'task',
            'user',
            'allocated_hours',
            'time_spent_hours',
            'order'
        ]
