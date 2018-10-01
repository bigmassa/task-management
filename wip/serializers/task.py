from rest_framework import serializers

from wip.models import Task


class TaskSerializer(serializers.ModelSerializer):

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
            'order'
        ]
