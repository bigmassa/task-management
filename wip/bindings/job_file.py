from app.bindings import BaseModelBinding
from wip.serializers import JobFileSerializer
from wip.models import JobFile


class JobFileBinding(BaseModelBinding):
    model = JobFile
    serializer = JobFileSerializer
