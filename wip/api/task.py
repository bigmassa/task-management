from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import Task
from wip.serializers import TaskSerializer


class TaskFilter(FilterSet):
    pass


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_class = TaskFilter
