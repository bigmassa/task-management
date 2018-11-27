from django.db.models import Q

from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import Task
from wip.serializers import TaskSerializer


class TaskFilter(FilterSet):
    live_at_date = filters.DateTimeFilter(method='live_at_filter')

    def live_at_filter(self, queryset, name, value):
        return queryset.filter(Q(closed=True, closed_date__gte=value) | Q(closed=False))


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_class = TaskFilter
