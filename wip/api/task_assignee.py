from django.db.models import Q

from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import TaskAssignee
from wip.serializers import TaskAssigneeSerializer


class TaskAssigneeFilter(FilterSet):
    live_at_date = filters.DateTimeFilter(method='live_at_filter')

    def live_at_filter(self, queryset, name, value):
        return queryset.filter(Q(task__closed=True, task__closed_date__gte=value) | Q(task__closed=False))


class TaskAssigneeViewSet(viewsets.ModelViewSet):
    queryset = TaskAssignee.objects.all()
    serializer_class = TaskAssigneeSerializer
    filter_class = TaskAssigneeFilter
