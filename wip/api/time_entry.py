from django_filters import DateTimeFromToRangeFilter, FilterSet, ModelChoiceFilter
from rest_framework import viewsets

from authentication.models import User
from wip.models import TimeEntry
from wip.serializers import TimeEntrySerializer


class TimeEntryFilter(FilterSet):
    started_at = DateTimeFromToRangeFilter()
    ended_at = DateTimeFromToRangeFilter()
    user = ModelChoiceFilter(queryset=User.objects.all())


class TimeEntryViewSet(viewsets.ModelViewSet):
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer
    filter_class = TimeEntryFilter
