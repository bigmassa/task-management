from rest_framework import viewsets
from taggit.models import Tag

from wip.serializers import TagSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
