from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import Task, TaskFile
from wip.serializers import TaskFileSerializer


class TaskFileFilter(FilterSet):
    task = filters.ModelChoiceFilter(field_name='task', queryset=Task.objects.all())


class TaskFileViewSet(viewsets.ModelViewSet):
    queryset = TaskFile.objects.all()
    serializer_class = TaskFileSerializer
    filter_class = TaskFileFilter
