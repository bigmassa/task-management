from app.bindings import BaseModelBinding
from wip.serializers import TaskTimingSerializer
from wip.models import TaskTiming


class TaskTimingBinding(BaseModelBinding):
    model = TaskTiming
    serializer = TaskTimingSerializer
