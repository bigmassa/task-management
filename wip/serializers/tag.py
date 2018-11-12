from rest_framework import serializers
from taggit.models import Tag


class TagSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = Tag
        fields = [
            'id',
            'name',
            'slug'
        ]
