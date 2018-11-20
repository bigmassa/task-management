from app.bindings import BaseModelBinding
from wip.serializers import TaskSerializer
from wip.models import Task


class TaskBinding(BaseModelBinding):
    model = Task
    serializer = TaskSerializer
