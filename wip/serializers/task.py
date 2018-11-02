from rest_framework import serializers
from taggit_serializer import serializers as taggit_serializers

from wip.models import Task


class TaskSerializer(taggit_serializers.TaggitSerializer, serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'created_at',
            'job',
            'status',
            'target_date',
            'closed',
            'not_chargeable',
            'is_overdue',
            'allocated_hours',
            'time_spent_hours',
            'order'
        ]
