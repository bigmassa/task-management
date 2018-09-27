from rest_framework import viewsets

from wip.models import TimeEntry
from wip.serializers import TimeEntrySerializer


class TimeEntryViewSet(viewsets.ModelViewSet):
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer
