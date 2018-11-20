from app.bindings import BaseModelBinding
from wip.serializers import TimeEntrySerializer
from wip.models import TimeEntry


class TimeEntryBinding(BaseModelBinding):
    model = TimeEntry
    serializer = TimeEntrySerializer
