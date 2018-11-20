from app.bindings import BaseModelBinding
from wip.serializers import TaskAssigneeSerializer
from wip.models import TaskAssignee


class TaskAssigneeBinding(BaseModelBinding):
    model = TaskAssignee
    serializer = TaskAssigneeSerializer
