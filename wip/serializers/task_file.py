from rest_framework import serializers

from wip.models import TaskFile


class TaskFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskFile
        fields = [
            'id',
            'task',
            'name',
            'file',
            'size_mb',
            'uploaded_by',
            'uploaded_on'
        ]
