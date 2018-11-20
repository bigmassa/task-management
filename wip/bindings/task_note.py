from app.bindings import BaseModelBinding
from wip.serializers import TaskNoteSerializer
from wip.models import TaskNote


class TaskNoteBinding(BaseModelBinding):
    model = TaskNote
    serializer = TaskNoteSerializer
