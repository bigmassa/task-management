from rest_framework import serializers

from wip.models import Job, Task
from wip.serializers.fields import TaskStatusChoiceField


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'description',
            'created_at',
            'client',
            'type',
            'estimated_hours',
            'colour',
            'status',
            'billed_to'
        ]


class JobTaskSortSerializer(serializers.ModelSerializer):
    status = TaskStatusChoiceField()
    tasks = serializers.PrimaryKeyRelatedField(
        queryset=Task.objects.all(),
        allow_empty=False,
        many=True
    )

    class Meta:
        model = Job
        fields = [
            'status',
            'tasks'
        ]
