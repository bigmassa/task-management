from django.contrib.contenttypes.models import ContentType
from rest_framework import viewsets
from taggit.models import TaggedItem

from wip.models import ClientContact
from wip.serializers import TaggedItemSerializer


class ClientContactTagViewSet(viewsets.ModelViewSet):
    content_type_model = ClientContact
    serializer_class = TaggedItemSerializer

    def get_content_type(self):
        return ContentType.objects.get_for_model(self.content_type_model)

    def get_queryset(self):
        content_type = self.get_content_type()
        queryset = TaggedItem.objects.filter(content_type=content_type)
        return queryset

    def perform_create(self, serializer):
        content_type = self.get_content_type()
        serializer.save(content_type_id=content_type.id)
