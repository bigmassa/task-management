from django.db.models import Q

from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import JobTiming
from wip.serializers import JobTimingSerializer


class JobTimingFilter(FilterSet):
    pass


class JobTimingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobTiming.objects.all()
    serializer_class = JobTimingSerializer
    filter_class = JobTimingFilter
