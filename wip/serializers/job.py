from rest_framework import serializers

from wip.models import Job


class JobSerializer(serializers.ModelSerializer):
    allocated_hours = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )
    time_spent_hours = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

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
            'billed_to',
            'allocated_hours',
            'time_spent_hours'
        ]
