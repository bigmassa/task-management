from rest_framework import serializers

from wip.models import Job


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
