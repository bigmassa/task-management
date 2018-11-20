from app.bindings import BaseModelBinding
from wip.serializers import JobRelationshipSerializer
from wip.models import JobRelationship


class JobRelationshipBinding(BaseModelBinding):
    model = JobRelationship
    serializer = JobRelationshipSerializer
