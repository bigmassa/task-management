from app.bindings import BaseModelBinding
from wip.serializers import JobTimingSerializer
from wip.models import JobTiming


class JobTimingBinding(BaseModelBinding):
    model = JobTiming
    serializer = JobTimingSerializer
