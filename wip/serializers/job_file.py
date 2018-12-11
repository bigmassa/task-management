from rest_framework import serializers

from wip.models import JobFile


class JobFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobFile
        fields = [
            'id',
            'job',
            'name',
            'file',
            'size_mb',
            'uploaded_by',
            'uploaded_on'
        ]
