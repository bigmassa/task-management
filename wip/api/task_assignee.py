from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import TaskAssignee
from wip.serializers import TaskAssigneeSerializer


class TaskAssigneeFilter(FilterSet):
    pass


class TaskAssigneeViewSet(viewsets.ModelViewSet):
    queryset = TaskAssignee.objects.all()
    serializer_class = TaskAssigneeSerializer
    filter_class = TaskAssigneeFilter
