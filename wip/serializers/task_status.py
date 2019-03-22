from rest_framework import serializers

from wip.models import TaskStatus


class TaskStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskStatus
        fields = [
            'id',
            'title',
            'icon',
            'colour',
            'order',
            'show_on_job_dashboard'
        ]
