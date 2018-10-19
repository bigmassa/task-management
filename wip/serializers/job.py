from rest_framework import serializers

from wip.models import Job, Task


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
    tasks = serializers.PrimaryKeyRelatedField(
        queryset=Task.objects.all(),
        allow_empty=False,
        many=True
    )

    class Meta:
        model = Job
        fields = [
            'tasks'
        ]
