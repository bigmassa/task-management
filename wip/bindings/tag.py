from app.bindings import BaseModelBinding
from wip.serializers import TagSerializer
from taggit.models import Tag


class TagBinding(BaseModelBinding):
    model = Tag
    serializer = TagSerializer
