from rest_framework import serializers

from wip.models import JobTiming


class JobTimingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobTiming
        fields = [
            'id',
            'job',
            'allocated_hours',
            'time_spent_hours',
            'is_over_allocated_hours'
        ]
