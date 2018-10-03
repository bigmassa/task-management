from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import Job
from wip.serializers import JobSerializer


class JobFilter(FilterSet):
    for_clock = filters.BooleanFilter(field_name='status__allow_new_clock_entries')


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filter_class = JobFilter
