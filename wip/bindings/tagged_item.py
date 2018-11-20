from app.bindings import BaseModelBinding
from wip.serializers import TaggedItemSerializer
from taggit.models import TaggedItem


class TaggedItemBinding(BaseModelBinding):
    model = TaggedItem
    serializer = TaggedItemSerializer
