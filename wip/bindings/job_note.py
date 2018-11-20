from app.bindings import BaseModelBinding
from wip.serializers import JobNoteSerializer
from wip.models import JobNote


class JobNoteBinding(BaseModelBinding):
    model = JobNote
    serializer = JobNoteSerializer
