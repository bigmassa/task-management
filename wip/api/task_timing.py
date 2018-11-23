from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import TaskTiming
from wip.serializers import TaskTimingSerializer


class TaskTimingFilter(FilterSet):
    pass


class TaskTimingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TaskTiming.objects.all()
    serializer_class = TaskTimingSerializer
    filter_class = TaskTimingFilter
