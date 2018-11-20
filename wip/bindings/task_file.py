from app.bindings import BaseModelBinding
from wip.serializers import TaskFileSerializer
from wip.models import TaskFile


class TaskFileBinding(BaseModelBinding):
    model = TaskFile
    serializer = TaskFileSerializer
