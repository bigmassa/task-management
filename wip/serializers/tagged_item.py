from rest_framework import serializers
from taggit.models import TaggedItem


class TaggedItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaggedItem
        fields = [
            'id',
            'object_id',
            'tag'
        ]
