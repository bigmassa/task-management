from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import TimeEntry
from wip.serializers import TimeEntrySerializer


class TimeEntryFilter(FilterSet):
    date_from = filters.DateTimeFilter(field_name='started_at__date', lookup_expr='gte')


class TimeEntryViewSet(viewsets.ModelViewSet):
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer
    filter_class = TimeEntryFilter
