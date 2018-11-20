from app.bindings import BaseModelBinding
from wip.serializers import JobSerializer
from wip.models import Job


class JobBinding(BaseModelBinding):
    model = Job
    serializer = JobSerializer
