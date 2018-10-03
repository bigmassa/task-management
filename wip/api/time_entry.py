from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from authentication.models import User
from wip.models import TimeEntry
from wip.serializers import TimeEntrySerializer


class TimeEntryFilter(FilterSet):
    started_at = filters.DateTimeFromToRangeFilter()
    ended_at = filters.DateTimeFromToRangeFilter()
    user = filters.ModelChoiceFilter(queryset=User.objects.all())


class TimeEntryViewSet(viewsets.ModelViewSet):
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer
    filter_class = TimeEntryFilter
