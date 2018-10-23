from rest_framework import serializers

from wip.models import TaskFile


class TaskFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskFile
        fields = [
            'id',
            'task',
            'file',
            'uploaded_by',
            'uploaded_on'
        ]
